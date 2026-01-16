const { sql } = require('../config/db');

// @desc    Get admin statistics
// @route   GET /api/stats
// @access  Private/Curator
const getStats = async (req, res) => {
    try {
        const pool = await sql.connect();

        // 1. Total Users
        const userCount = await pool.query('SELECT COUNT(*) as count FROM Users');

        // 2. Transaction Summary (Packages vs Books)
        const sales = await pool.query(`
            SELECT 
                SUM(CASE WHEN type = 'CreditPurchase' THEN amount ELSE 0 END) as total_package_sales,
                SUM(CASE WHEN type = 'BookPurchase' THEN amount ELSE 0 END) as total_book_sales,
                COUNT(*) as total_orders
            FROM Transactions
        `);

        // 3. User List
        const users = await pool.query('SELECT id, email, role, wallet_balance, created_at FROM Users ORDER BY created_at DESC');

        // 4. Recent Transactions
        const recentTransactions = await pool.query(`
            SELECT t.*, u.email 
            FROM Transactions t
            JOIN Users u ON t.user_id = u.id
            ORDER BY t.created_at DESC
        `);

        res.json({
            userCount: userCount.recordset[0].count,
            sales: sales.recordset[0],
            users: users.recordset,
            transactions: recentTransactions.recordset
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving stats' });
    }
};

// @desc    Add credits to user wallet
// @route   POST /api/stats/purchase-credits
// @access  Private
const purchaseCredits = async (req, res) => {
    try {
        const { amount, packageName } = req.body;
        const userId = req.user.id;

        const pool = await sql.connect();

        // 1. Update User Wallet
        await pool.request()
            .input('userId', sql.Int, userId)
            .input('amount', sql.Decimal, amount)
            .query('UPDATE Users SET wallet_balance = wallet_balance + @amount WHERE id = @userId');

        // 2. Record Transaction
        await pool.request()
            .input('userId', sql.Int, userId)
            .input('type', sql.NVarChar, 'CreditPurchase')
            .input('itemId', sql.NVarChar, packageName)
            .input('amount', sql.Decimal, amount)
            .query('INSERT INTO Transactions (user_id, type, item_id, amount) VALUES (@userId, @type, @itemId, @amount)');

        res.json({ message: 'Credits added successfully', newBalance: true }); // We'll fetch profile again in frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error processing purchase' });
    }
};

module.exports = {
    getStats,
    purchaseCredits
};
