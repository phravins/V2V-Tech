const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// PostgreSQL Connection Pool
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize Database
const initializeDatabase = async () => {
    try {
        // Create contact_messages table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create admin_users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Seed default admin users
        const defaultUsers = [
            { email: 'phravin.v2v@gmail.com', password: 'password123' },
            { email: 'arun.v2v@gmail.com', password: 'password123' }
        ];

        for (const user of defaultUsers) {
            await pool.query(
                'INSERT INTO admin_users (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
                [user.email, user.password]
            );
        }

        // Create otp_store table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS otp_store (
                email TEXT PRIMARY KEY,
                otp TEXT NOT NULL,
                expires_at TIMESTAMP NOT NULL
            )
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// Initialize on module load
initializeDatabase();

module.exports = pool;
