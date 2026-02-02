const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db.cjs');
const nodemailer = require('nodemailer'); // Added nodemailer
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Configure Transporter with Environment Variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

// FORGOT PASSWORD - Generate OTP and Send Real Email
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;

    // Whitelist check
    const allowedEmails = ['phravin.v2v@gmail.com', 'arun.v2v@gmail.com'];
    if (!allowedEmails.includes(email)) {
        return res.status(403).json({ "error": "Access denied. Email not found." });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000).toISOString(); // 10 minutes

    // Store OTP
    const sql = `INSERT OR REPLACE INTO otp_store (email, otp, expires_at) VALUES (?, ?, ?)`;

    db.run(sql, [email, otp, expiresAt], (err) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }

        // SEND REAL EMAIL
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'V2V Admin Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}\n\nThis OTP expires in 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ "error": "Failed to send OTP email: " + error.message });
            }
            console.log('Email sent: ' + info.response);
            res.json({ "message": "OTP sent successfully to " + email });
        });
    });
});

// RESET PASSWORD
app.post('/api/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Verify OTP
    db.get(`SELECT * FROM otp_store WHERE email = ? AND otp = ?`, [email, otp], (err, row) => {
        if (err) return res.status(500).json({ "error": err.message });
        if (!row) return res.status(400).json({ "error": "Invalid OTP" });

        // Check expiration
        if (new Date(row.expires_at) < new Date()) {
            return res.status(400).json({ "error": "OTP Expired" });
        }

        // Update Password
        db.run(`UPDATE admin_users SET password = ? WHERE email = ?`, [newPassword, email], (err) => {
            if (err) return res.status(500).json({ "error": "Failed to update password" });

            // Delete used OTP
            db.run(`DELETE FROM otp_store WHERE email = ?`, [email]);

            res.json({ "message": "Password updated successfully" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
