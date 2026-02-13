const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
// Check if POSTGRES_URL is set and NOT the dummy one from the example/default
const isPostgresConfigured = process.env.POSTGRES_URL &&
    !process.env.POSTGRES_URL.includes('default:password') &&
    !process.env.POSTGRES_URL.includes('ep-shiny-bar');

let pool;
let mode = 'sqlite';

if (isProduction || isPostgresConfigured) {
    console.log('Using PostgreSQL database');
    mode = 'postgres';
    pool = new Pool({
        connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false
    });

    // Initialize Database for Postgres
    const initializeDatabase = async () => {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
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
            await pool.query(`
                CREATE TABLE IF NOT EXISTS otp_store (
                    email TEXT PRIMARY KEY,
                    otp TEXT NOT NULL,
                    expires_at TIMESTAMP NOT NULL
                )
            `);
            console.log('PostgreSQL Database initialized successfully');
        } catch (error) {
            console.error('Error initializing PostgreSQL database:', error);
        }
    };
    initializeDatabase();

} else {
    console.log('Using SQLite fallback for local development (PostgreSQL not configured)');
    // We require the original db.js to handle initialization
    const sqliteDb = require('./db.js');

    // Wrapper to match pg pool interface
    pool = {
        query: (text, params) => {
            return new Promise((resolve, reject) => {
                // 1. Convert $1, $2 to ?
                let sql = text.replace(/\$\d+/g, '?');

                // 2. Handle RETURNING id (Postgres specific) -> Strip it for SQLite compatibility check
                // Newer SQLite supports RETURNING, but to be safe with all versions/drivers:
                const hasReturningId = /RETURNING\s+id/i.test(sql);
                if (hasReturningId) {
                    sql = sql.replace(/RETURNING\s+id/i, '');
                }

                // Determine query type
                const command = sql.trim().split(' ')[0].toUpperCase();

                if (command === 'SELECT') {
                    sqliteDb.all(sql, params, (err, rows) => {
                        if (err) {
                            console.error('SQLite Error:', err);
                            reject(err);
                        } else {
                            resolve({ rows });
                        }
                    });
                } else {
                    // INSERT, UPDATE, DELETE
                    sqliteDb.run(sql, params, function (err) {
                        if (err) {
                            console.error('SQLite Error:', err);
                            reject(err);
                        } else {
                            const result = {
                                rows: [],
                                rowCount: this.changes
                            };
                            // If it was an INSERT and we wanted RETURNING ID, mock it
                            if (command === 'INSERT' && hasReturningId) {
                                result.rows.push({ id: this.lastID });
                            }
                            // For login/selects that might be misclassified? No, SELECT is handled above.
                            resolve(result);
                        }
                    });
                }
            });
        }
    };
}

module.exports = pool;
