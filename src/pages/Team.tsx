import { motion } from "framer-motion";
import { ArrowLeft, Linkedin, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Team = () => {
    const teamMembers = [
        {
            name: "Arun S",
            role: "Founder (Vision & Strategic Leadership)",
            bio: "Provides the overall vision and strategic direction for V2V. Leverages strong industry connections.",
            image: "/team/arun.jpg",
            linkedin: "https://www.linkedin.com/in/arun-sekar-7617b1253/",
            quote: "Innovation distinguishes between a leader and a follower."
        },
        {
            name: "Siva Rami Reddy",
            role: "Hardware R&D Lead",
            bio: "Leads the design, development, and prototyping of innovative hardware solutions.",
            image: "/team/sivarami.jpg",
            linkedin: "https://www.linkedin.com/in/sivaramireddy-venna-37a3661a1/",
            quote: "The best way to predict the future is to invent it."
        },
        {
            name: "Phravin S",
            role: "Software R&D Lead",
            bio: "Oversees software development and digital innovation. Focuses on creating intelligent systems.",
            image: "/team/phravin.jpg",
            linkedin: "https://www.linkedin.com/in/phravin-s-467503252",
            quote: "Code is like humor. When you have to explain it, it’s bad."
        },
        {
            name: "Mareeswaran V",
            role: "Business & Partnerships Lead",
            bio: "Heads business strategy, market engagement, and partnership development.",
            image: "/team/Mareeswaran.jpg",
            linkedin: "https://www.linkedin.com/in/mareeswaran-v-482524306?",
            quote: "Opportunities don't happen. You create them."
        },
        {
            name: "Sivagurunathan",
            role: "Finance & Operations Lead",
            bio: "Manages financial planning, budgeting, and operational efficiency.",
            image: "/team/sivagurunathan.jpg",
            linkedin: "https://www.linkedin.com/in/sivagurunathan-rajasekar-2386bb344/",
            quote: "Efficiency is doing things right; effectiveness is doing the right things."
        },
        {
            name: "Bavanieswaran J",
            role: "Social media & Outreach Lead",
            bio: "Leads Brand Communication, digital presence, and outreach initiatives.",
            image: "/team/bavanies.jpg",
            linkedin: "https://www.linkedin.com/in/bavanieswaran-j-2a0621268",
            quote: "Content is king, but engagement is queen."
        },
    ];

    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
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
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <img
                            src="/v2v-logo.png"
                            alt="V2V Tech Logo"
                            className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Brains Behind the Mission</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Meet the talented individuals behind our mission to transform innovation into reality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 group flex flex-col rounded-[2rem]">
                                <div className="pt-8 pb-4 flex justify-center relative">
                                    <div className="w-56 h-64 relative rounded-2xl p-2 bg-gradient-to-tr from-primary/10 to-transparent">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                <CardHeader className="p-6 pb-2 text-center">
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                                        {member.name}
                                    </CardTitle>
                                    <CardDescription className="text-xs font-bold text-primary/80 uppercase tracking-widest mt-1">
                                        {member.role}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-6 pt-2 flex-grow flex flex-col">
                                    {/* Quote Section */}
                                    <div className="mb-4 relative px-4">
                                        <Quote className="w-4 h-4 text-primary/20 absolute -top-1 -left-0" />
                                        <p className="text-xs italic text-muted-foreground/80 text-center">
                                            "{member.quote}"
                                        </p>
                                        <Quote className="w-4 h-4 text-primary/20 absolute -bottom-1 -right-0 rotate-180" />
                                    </div>

                                    <p className="text-sm leading-relaxed text-muted-foreground mb-6 text-center">
                                        {member.bio}
                                    </p>

                                    <div className="flex justify-center border-t border-border/50 pt-4 mt-auto">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span className="text-xs">Connect</span>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
