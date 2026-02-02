const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database file in the server directory
const dbPath = path.resolve(__dirname, 'v2v.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create messages table
        db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            }
        });

        // Create admin_users table
        db.run(`CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating admin_users table', err.message);
            } else {
                // Seed default users if table creation check passed (or exists)
                const defaultUsers = [
                    { email: 'phravin.v2v@gmail.com', password: 'password123' },
                    { email: 'arun.v2v@gmail.com', password: 'password123' }
                ];

                const insertSql = `INSERT OR IGNORE INTO admin_users (email, password) VALUES (?, ?)`;

                defaultUsers.forEach(user => {
                    db.run(insertSql, [user.email, user.password], (err) => {
                        if (err) {
                            console.error(`Error inserting default user ${user.email}`, err.message);
                        } else {
                            // console.log(`Ensured user ${user.email} exists.`);
                        }
                    });
                });
            }
        });
    }
});

module.exports = db;
