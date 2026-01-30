import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../components/ui/badge";

import { blogPosts } from "@/data/blogData";

const Blogs = () => {
    const newTechnologies = blogPosts.filter(post => post.id < 100);
    const techNews = blogPosts.filter(post => post.id >= 100);

    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Navigation */}
                <Link to="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Button>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-primary font-medium tracking-wider text-sm uppercase mb-2 block">
                        Stay Updated
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        V2V <span className="text-primary">Insights</span> & News
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Discover the latest trends in technology, deep dives into innovation, and updates from the world of tech.
                    </p>
                </motion.div>

                {/* Section 1: New Technologies */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            Booming Technologies
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newTechnologies.map((tech, index) => (
                            <motion.div
                                key={tech.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group bg-card/50 backdrop-blur-sm border-white/10">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={tech.image}
                                            alt={tech.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary">
                                            {tech.category}
                                        </Badge>
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <Calendar className="h-3 w-3" />
                                            {tech.date}
                                        </div>
                                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                            {tech.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="line-clamp-3">
                                            {tech.description}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                        <Link to={`/blogs/${tech.id}`} className="w-full">
                                            <Button variant="link" className="px-0 text-primary group-hover:underline w-full justify-start">
                                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Tech News */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            <Share2 className="h-6 w-6 text-primary" />
                            Tech Articles
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {techNews.map((news, index) => (
                            <motion.div
                                key={news.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="hover:bg-accent/5 transition-colors duration-300 border-l-4 border-l-primary/50 hover:border-l-primary">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="font-semibold text-lg line-clamp-1">{news.title}</h3>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1 bg-secondary px-2 py-1 rounded-full">
                                                <Clock className="h-3 w-3" />
                                                {news.date}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                            {news.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xs font-medium text-primary">
                                                Source: {news.author}
                                            </span>
                                            <Link to={`/blogs/${news.id}`}>
                                                <Button variant="ghost" size="sm" className="h-8">
                                                    Read <ArrowRight className="ml-1 h-3 w-3" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Blogs;
