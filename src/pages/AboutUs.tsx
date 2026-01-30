import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
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
                    <div className="flex justify-center mb-6">
                        <img
                            src="/v2v-logo.png"
                            alt="V2V Tech Logo"
                            className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                        />
                    </div>

                    <h1 className="text-4xl font-bold mb-8 text-foreground hover:text-primary transition-colors duration-300 cursor-default text-center">Vision2Value (V2V) Tech</h1>

                    <div className="space-y-8 text-foreground/90 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Who We Are</h2>
                            <p>
                                Founded in 2025, Vision2Value (V2V) Tech is a forward-thinking technology company dedicated to bridging the gap between innovative ideas and real-world applications. We are a team of passionate engineers, researchers, and strategists committed to solving complex challenges.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
                            <p>
                                Our mission is to "Transform Innovation into Reality." We believe that the best solutions come from a deep understanding of the problems at hand and a relentless pursuit of technological excellence. We aim to empower industries and government bodies with cutting-edge technologies that drive efficiency, sustainability, and growth.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">What We Do</h2>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>
                                    <strong>Problem Identification:</strong> We work closely with our partners to identify critical bottlenecks and challenges that require innovative interventions.
                                </li>
                                <li>
                                    <strong>Deep R&D:</strong> Our core strength lies in Research and Development. We don't just use existing tools; we build new ones. From hardware prototyping to advanced software algorithms, we push the boundaries of what is possible.
                                </li>
                                <li>
                                    <strong>Technology Transfer:</strong> Innovation is only valuable when it is applied. We specialize in the seamless transfer of our developed technologies to our clients, ensuring they are scalable, reliable, and ready for deployment.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Why Choose Us?</h2>
                            <p>
                                At V2V, we don't just deliver a product; we deliver a partnership. We govern the entire lifecycle of innovation, from the initial spark of an idea to its final implementation and beyond. Our commitment to quality, transparency, and impact sets us apart in the technology landscape.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
