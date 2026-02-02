const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db-postgres.cjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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
app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
        res.json({
            "message": "success",
            "data": result.rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// POST a new message (For Contact Form)
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id',
            [name, email, message]
        );
        res.json({
            "message": "success",
            "data": { id: result.rows[0].id }
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// REGISTER Admin
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Whitelist check
    const allowedEmails = ['phravin.v2v@gmail.com', 'arun.v2v@gmail.com'];
    if (!allowedEmails.includes(email)) {
        return res.status(403).json({ "error": "Access denied. This email is not authorized for admin access." });
    }

    try {
        const result = await pool.query(
            'INSERT INTO admin_users (email, password) VALUES ($1, $2) RETURNING id',
            [email, password]
        );
        res.json({
            "message": "success",
            "data": { id: result.rows[0].id }
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// LOGIN Admin
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM admin_users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length > 0) {
            res.json({
                "message": "success",
                "data": { id: result.rows[0].id, email: result.rows[0].email }
            });
        } else {
            res.status(401).json({ "error": "Invalid credentials" });
        }
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// FORGOT PASSWORD - Generate OTP and Send Email
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Whitelist check
    const allowedEmails = ['phravin.v2v@gmail.com', 'arun.v2v@gmail.com'];
    if (!allowedEmails.includes(email)) {
        return res.status(403).json({ "error": "Access denied. Email not found." });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes

    try {
        // Store OTP (upsert)
        await pool.query(
            `INSERT INTO otp_store (email, otp, expires_at) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (email) 
             DO UPDATE SET otp = $2, expires_at = $3`,
            [email, otp, expiresAt]
        );

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
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// RESET PASSWORD
app.post('/api/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Verify OTP
        const result = await pool.query(
            'SELECT * FROM otp_store WHERE email = $1 AND otp = $2',
            [email, otp]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ "error": "Invalid OTP" });
        }

        // Check expiration
        if (new Date(result.rows[0].expires_at) < new Date()) {
            return res.status(400).json({ "error": "OTP Expired" });
        }

        // Update Password
        await pool.query(
            'UPDATE admin_users SET password = $1 WHERE email = $2',
            [newPassword, email]
        );

        // Delete used OTP
        await pool.query('DELETE FROM otp_store WHERE email = $1', [email]);

        res.json({ "message": "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ "error": "Failed to update password: " + err.message });
    }
});

// START SERVER
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
