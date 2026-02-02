import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut } from 'lucide-react';

interface ContactMessage {
    id: number;
    created_at: string;
    name: string;
    email: string;
    message: string;
}

const AdminDashboard = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
        fetchMessages();
    }, []);

    const checkUser = async () => {
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/messages');
            const result = await response.json();

            if (result.data) {
                setMessages(result.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        // Clear local session storage if any
        localStorage.removeItem('admin_session');
        navigate('/admin-login');
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Messages</CardTitle>
                        <CardDescription>Messages received from the website contact form.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messages.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No messages found.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Message</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.map((msg) => (
                                        <TableRow key={msg.id}>
                                            <TableCell>{new Date(msg.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>{msg.name}</TableCell>
                                            <TableCell>{msg.email}</TableCell>
                                            <TableCell className="max-w-md truncate" title={msg.message}>{msg.message}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
