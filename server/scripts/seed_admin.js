const { sql, connectDB } = require('../config/db');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await connectDB();

        const email = 'admin@demo.com';
        const password = '0000';
        const role = 'Curator';

        // Check if admin exists
        const check = await sql.query(`SELECT * FROM Users WHERE email = '${email}'`);

        if (check.recordset.length > 0) {
            console.log('Admin user already exists. Updating password...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await sql.query(`UPDATE Users SET password_hash = '${hashedPassword}' WHERE email = '${email}'`);
        } else {
            console.log('Creating admin user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await sql.query(`INSERT INTO Users (email, password_hash, role, wallet_balance) VALUES ('${email}', '${hashedPassword}', '${role}', 0)`);
        }

        // Add Transactions table if missing (hotfix to schema)
        console.log('Ensuring Transactions table exists...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Transactions' AND xtype='U')
            CREATE TABLE Transactions (
                id INT IDENTITY(1,1) PRIMARY KEY,
                user_id INT FOREIGN KEY REFERENCES Users(id),
                type NVARCHAR(50) NOT NULL CHECK (type IN ('BookPurchase', 'CreditPurchase')),
                item_id NVARCHAR(50), 
                amount DECIMAL(10, 2) NOT NULL,
                created_at DATETIME DEFAULT GETDATE()
            )
        `);

        console.log('Admin seeding and schema update complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedAdmin();
