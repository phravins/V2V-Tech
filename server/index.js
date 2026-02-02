const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3001; // Running on 3001 to avoid conflict with Vite (5173/3000)

app.use(cors());
app.use(bodyParser.json());

// API STATUS
app.get('/', (req, res) => {
    res.json({ message: "V2V API is running..." });
});

// GET all messages (For Admin Dashboard)
app.get('/api/messages', (req, res) => {
    const sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// POST a new message (For Contact Form)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?,?,?)';
    const params = [name, email, message];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

// REGISTER Admin
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    // Whitelist check
    const allowedEmails = ['phravin.v2v@gmail.com', 'arun.v2v@gmail.com'];
    if (!allowedEmails.includes(email)) {
        return res.status(403).json({ "error": "Access denied. This email is not authorized for admin access." });
    }

    // In a production app, password should be hashed (e.g., bcrypt)
    // For this simple request, we store plain text as per user context constraints
    const sql = 'INSERT INTO admin_users (email, password) VALUES (?,?)';
    const params = [email, password];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

// LOGIN Admin
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin_users WHERE email = ? AND password = ?";

    db.get(sql, [email, password], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            res.json({
                "message": "success",
                "data": { id: row.id, email: row.email }
            });
        } else {
            res.status(401).json({ "error": "Invalid credentials" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
