import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/lib/apiConfig";

const AdminLogin = () => {
    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Mode State: 'login', 'register', 'forgot-request', 'forgot-verify'
    const [mode, setMode] = useState<'login' | 'register' | 'forgot-request' | 'forgot-verify'>('login');

    // Forgot Password State
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const resetState = () => {
        setError(null);
        setSuccess(null);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOtp('');
    };

    const handleLoginRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const endpoint = mode === 'register' ? `${API_BASE_URL}/api/register` : `${API_BASE_URL}/api/login`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Authentication failed');

            if (mode === 'register') {
                setMode('login');
                setSuccess("Account created! Please login.");
            } else {
                navigate('/admin-dashboard');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPasswordRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            setSuccess("OTP sent! Check server console.");
            setMode('forgot-verify');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            setSuccess("Password updated! Please login.");
            setMode('login');
            setPassword('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative">
            <div className="absolute top-4 left-4">
                <Button variant="ghost" onClick={() => navigate('/')}>
                    ← Back to Home
                </Button>
            </div>
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>
                        {mode === 'login' && "Admin Login"}
                        {mode === 'register' && "Create Account"}
                        {mode === 'forgot-request' && "Reset Password"}
                        {mode === 'forgot-verify' && "Enter New Password"}
                    </CardTitle>
                    <CardDescription>
                        {mode === 'login' && "Enter your email and password."}
                        {mode === 'register' && "Enter details to create admin account."}
                        {mode === 'forgot-request' && "Enter authorized email to receive OTP."}
                        {mode === 'forgot-verify' && "Enter OTP and new password."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* LOGIN / REGISTER FORM */}
                    {(mode === 'login' || mode === 'register') && (
                        <form onSubmit={handleLoginRegister} className="space-y-4">
                            <Input
                                type="email" placeholder="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                            />
                            <Input
                                type="password" placeholder="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required
                            />

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Processing..." : (mode === 'register' ? "Create Account" : "Login")}
                            </Button>

                            <div className="space-y-2 text-center text-sm">
                                <button type="button"
                                    onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); resetState(); }}
                                    className="text-primary hover:underline block w-full">
                                    {mode === 'login' ? "Create an Account" : "Back to Login"}
                                </button>
                                {mode === 'login' && (
                                    <button type="button"
                                        onClick={() => { setMode('forgot-request'); resetState(); }}
                                        className="text-muted-foreground hover:text-primary underline block w-full">
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                        </form>
                    )}

                    {/* FORGOT PASSWORD REQUEST */}
                    {mode === 'forgot-request' && (
                        <form onSubmit={handleForgotPasswordRequest} className="space-y-4">
                            <Input
                                type="email" placeholder="Enter valid admin email" value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                            <button type="button" onClick={() => setMode('login')} className="text-sm text-center w-full block hover:underline">
                                Cancel
                            </button>
                        </form>
                    )}

                    {/* FORGOT PASSWORD VERIFY */}
                    {mode === 'forgot-verify' && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <Input
                                type="text" placeholder="Enter OTP" value={otp}
                                onChange={(e) => setOtp(e.target.value)} required
                            />
                            <Input
                                type="password" placeholder="New Password" value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} required
                            />
                            <Input
                                type="password" placeholder="Confirm Password" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                            <button type="button" onClick={() => setMode('login')} className="text-sm text-center w-full block hover:underline">
                                Cancel
                            </button>
                        </form>
                    )}

                    {/* MESSAGES */}
                    {error && <div className="mt-4 text-sm text-red-500 text-center">{error}</div>}
                    {success && <div className="mt-4 text-sm text-green-500 text-center">{success}</div>}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
