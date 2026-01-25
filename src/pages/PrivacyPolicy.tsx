import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-8 text-foreground/90 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Information Collection</h2>
                            <p>
                                Vision2Value (V2V) collects information that you provide directly to us when you fill out our contact forms,
                                subscribe to our updates, or communicate with us. This may include your name, email address, phone number,
                                and any other details you choose to provide.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Use of Information</h2>
                            <p>
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Provide, maintain, and improve our R&D and technology transfer services.</li>
                                <li>Respond to your comments, questions, and requests.</li>
                                <li>Communicate with you about our products, services, and events.</li>
                                <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Data Sharing and Transfer</h2>
                            <p>
                                V2V does not sell your personal information. We may share your information with:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Industry partners and government bodies when necessary for technology transfer projects (with your consent).</li>
                                <li>Service providers who perform services on our behalf.</li>
                                <li>Authorities if required by law or to protect the rights and safety of V2V or others.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Cookies and Tracking</h2>
                            <p>
                                We may use cookies and similar tracking technologies to track the activity on our specific service and hold certain information.
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">5. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                <a href="mailto:info.v2vtech@gmail.com" className="text-primary hover:underline">info.v2vtech@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
