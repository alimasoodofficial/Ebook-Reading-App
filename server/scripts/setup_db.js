const { sql } = require('../config/db');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const setupDatabase = async () => {
    try {
        console.log('Starting Database Setup...');
        const dbConfig = require('../config/db').config;

        // 1. Connect to Master to check/create DB
        console.log('Checking if database exists...');
        // Create a config pointing to master
        const masterConfig = {
            ...dbConfig,
            connectionString: dbConfig.connectionString ? dbConfig.connectionString.replace(/Database=[^;]+/, 'Database=master') : undefined,
            // Fallback if connectionString isn't used
            database: 'master'
        };

        const poolMaster = new sql.ConnectionPool(masterConfig);
        await poolMaster.connect();

        const dbName = process.env.DB_NAME || 'LexiconLoungeDB';
        const checkDbQuery = `SELECT name FROM sys.databases WHERE name = '${dbName}'`;
        const result = await poolMaster.query(checkDbQuery);

        if (result.recordset.length === 0) {
            console.log(`Database ${dbName} not found. Creating...`);
            await poolMaster.query(`CREATE DATABASE ${dbName}`);
            console.log('Database created!');
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
        await poolMaster.close();

        // 2. Connect to the Target DB
        console.log('Connecting to target database...');
        await sql.connect(dbConfig);

        console.log('Reading schema.sql...');
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split by 'GO'
        const commands = schema.split(/^GO\s*$/m);

        console.log(`Found ${commands.length} batches. Executing schema...`);

        for (const command of commands) {
            if (command.trim()) {
                try {
                    await sql.query(command);
                } catch (e) {
                    // Log but don't crash on "already exists" type errors
                    console.log("Info:", e.message);
                }
            }
        }

        console.log('Database setup complete!');
        process.exit(0);

    } catch (err) {
        console.error('Setup failed:', err);
        process.exit(1);
    }
};

setupDatabase();
