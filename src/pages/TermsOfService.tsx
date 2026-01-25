import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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
                    <h1 className="text-4xl font-bold mb-8 text-foreground">Terms and Conditions</h1>
                    <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-8 text-foreground/90 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the Vision2Value (V2V) website and services, you agree to be bound by these Terms and Conditions.
                                If you do not agree with any part of these terms, you may not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Intellectual Property Rights</h2>
                            <p>
                                Unless otherwise stated, V2V and/or its licensors own the intellectual property rights for all material on Vision2Value.
                                All intellectual property rights are reserved. You may access this from V2V for your own personal use subjected to restrictions set in these terms and conditions.
                            </p>
                            <p className="mt-2 text-muted-foreground italic">
                                Note on R&D: Specific IP rights regarding technology transfer projects will be governed by separate contractual agreements signed between V2V and the respective parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Operational Scope</h2>
                            <p>
                                V2V specializes in:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Identifying real-world problems.</li>
                                <li>Conducting Research and Development (R&D).</li>
                                <li>Transferring technology to industries and government bodies.</li>
                            </ul>
                            <p className="mt-2">
                                We strive to ensure the accuracy and reliability of our solutions but do not guarantee that every R&D project will result in a commercially viable product.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Limitation of Liability</h2>
                            <p>
                                In no event shall Vision2Value, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.
                                V2V shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website or our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">5. Contact Information</h2>
                            <p>
                                If you have any queries regarding any of our terms, please contact us at:
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

export default TermsOfService;
