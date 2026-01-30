import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../components/ui/badge";
import { blogPosts } from "@/data/blogData";

const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>();

    const post = blogPosts.find((p) => p.id === Number(id));

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);

        // Redirect if post not found
        if (!post && id) {
            // Optional: navigate('/blogs') or show 404
        }
    }, [id, post]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                <Link to="/blogs">
                    <Button>Back to Blogs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-8">
            <article className="max-w-4xl mx-auto">
                {/* Navigation */}
                <Link to="/blogs">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Blogs
                    </Button>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {post.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                        </span>
                        {post.author && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                                <User className="h-3 w-3" />
                                {post.author}
                            </span>
                        )}
                        {post.github && (
                            <a
                                href={post.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                            >
                                <Github className="h-3 w-3" />
                                View on GitHub
                            </a>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                        {post.title}
                    </h1>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/10"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto max-h-[500px] object-cover"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="prose prose-lg prose-invert max-w-none
              prose-headings:font-bold 
              prose-h1:text-foreground prose-h2:text-foreground
              prose-h3:text-primary prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-primary
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-li:text-muted-foreground prose-li:mb-3
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              marker:text-primary"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <hr className="my-12 border-white/10" />

                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground italic">
                        Hope you enjoyed reading this article!
                    </p>
                    <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="outline">
                        Scroll to Top
                    </Button>
                </div>

            </article>
        </div>
    );
};

export default BlogPostPage;
