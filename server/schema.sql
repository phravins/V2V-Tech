-- PostgreSQL Schema for V2V Application

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP Store Table
CREATE TABLE IF NOT EXISTS otp_store (
    email TEXT PRIMARY KEY,
    otp TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

-- Seed Default Admin Users
INSERT INTO admin_users (email, password) 
VALUES 
    ('phravin.v2v@gmail.com', 'password123'),
    ('arun.v2v@gmail.com', 'password123')
ON CONFLICT (email) DO NOTHING;
