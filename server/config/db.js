const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

// Construct connection string for msnodesqlv8
// We confirmed ODBC Driver 17 is available.
const server = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
const database = process.env.DB_NAME || 'LexiconLoungeDB';

const config = {
    connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};Trusted_Connection=yes;`,
    driver: 'msnodesqlv8', // Can be redundant if connectionString is passed, but good for clarity
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('SQL Server Connected Successfully');
    } catch (err) {
        console.error('Database Connection Failed:', err);
        // process.exit(1); // Do not crash the server on DB connection fail. Let it run so we can debug.
    }
};

module.exports = { sql, connectDB, config };
