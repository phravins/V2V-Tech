import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight,
  Zap,
  Lightbulb,
  Rocket,
  Users,
  Target,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  TrendingUp,
  Calendar,
  Star,

  Quote,
  ChevronDown,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden pb-10 pt-32 font-light text-white antialiased md:pb-16 md:pt-20 bg-background"
    >
      <div className="absolute top-5 right-5 z-50">
        <Link to="/admin-login">
          <button className="neon-button">
            Admin Login
          </button>
        </Link>
      </div>

      <div
        className="absolute right-0 top-0 h-full w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-full w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="/v2v-logo.png"
              alt="V2V Logo"
              className="h-24 md:h-32 w-auto transition-all drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            />
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
            Transforming <span className="text-primary">Innovation</span> into Reality
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
            V2V focuses on identifying real-world problems, developing innovative solutions through deep R&D, and transferring these technologies to industries and government bodies.
          </p>

          <div className="mb-10 sm:mb-0 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-primary/30 sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>Learn how it works</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Problem Identification",
      description: "We identify critical real-world challenges through comprehensive research and industry analysis.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deep R&D",
      description: "Our team conducts extensive research and development to create innovative, practical solutions.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Technology Transfer",
      description: "We seamlessly transfer proven technologies to industries and government organizations.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Industry Collaboration",
      description: "Strong partnerships with leading industries ensure real-world applicability and impact.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Rigorous testing and validation processes guarantee excellence in every solution.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Innovation",
      description: "We stay ahead of the curve with ongoing research and technology advancement.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="text-primary font-medium mb-2 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-4 h-4" />
            OUR CAPABILITIES
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to implementation, we deliver comprehensive solutions that drive real value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUsSection = () => {
  const teamMembers = [
    {
      name: "Arun S",
      role: "Founder (Vision & Strategic Leadership)",
      bio: "Provides the overall vision and strategic direction for V2V. Leverages strong industry connections.",
      image: "/team/arun.jpg",
      linkedin: "https://www.linkedin.com/in/arun-sekar-7617b1253/",
    },
    {
      name: "Siva Rami Reddy",
      role: "Hardware R&D Lead",
      bio: "Leads the design, development, and prototyping of innovative hardware solutions.",
      image: "/team/sivarami.jpg",
      linkedin: "https://www.linkedin.com/in/sivaramireddy-venna-37a3661a1/",
    },
    {
      name: "Phravin S",
      role: "Software R&D Lead",
      bio: "Oversees software development and digital innovation. Focuses on creating intelligent systems.",
      image: "/team/phravin.jpg",
      linkedin: "https://www.linkedin.com/in/phravin-s-467503252",
    },
    {
      name: "Mareeswaran V",
      role: "Business & Partnerships Lead",
      bio: "Heads business strategy, market engagement, and partnership development.",
      image: "/team/Mareeswaran.jpg",
      linkedin: "https://www.linkedin.com/in/mareeswaran-v-482524306?",
    },
    {
      name: "Sivagurunathan",
      role: "Finance & Operations Lead",
      bio: "Manages financial planning, budgeting, and operational efficiency.",
      image: "/team/sivagurunathan.jpg",
      linkedin: "https://www.linkedin.com/in/sivagurunathan-rajasekar-2386bb344/",
    },
    {
      name: "Bavanieswaran J",
      role: "Social media & Outreach Lead",
      bio: "Leads Brand Communication, digital presence, and outreach initiatives.",
      image: "/team/bavanies.jpg",
      linkedin: "https://www.linkedin.com/in/bavanieswaran-j-2a0621268",
    },
  ];

  // Duplicate the list for infinite scroll
  const scrollingMembers = [...teamMembers, ...teamMembers];

  return (
    <section id="about" className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <motion.span
            className="text-primary font-medium mb-2 flex items-center justify-center gap-2 text-xs"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-3.5 h-3.5" />
            OUR TEAM
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Brains Behind the Mission</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Meet the talented individuals behind our mission to transform innovation into reality.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 px-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {scrollingMembers.map((member, index) => (
            <div key={index} className="w-64 shrink-0">
              <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden bg-card backdrop-blur-sm border-white/5 group">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="p-4 pb-1">
                  <CardTitle className="text-base group-hover:text-primary transition-colors duration-300">{member.name}</CardTitle>
                  <CardDescription className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 pb-5">
                  <p className="text-[11px] leading-relaxed text-muted-foreground mb-3 line-clamp-2">
                    {member.bio}
                  </p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline transition-all"
                  >
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                    <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>

        {/* Side Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
};

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-card p-6 rounded-xl flex flex-col items-center text-center group hover:shadow-lg transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-foreground flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </motion.div>
  );
}

const ProofSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const stats = [
    { icon: <Award />, value: 50, label: "Prototypes Built", suffix: "+" },
    { icon: <Users />, value: 20, label: "Collaborative Solutions", suffix: "+" },
    { icon: <Calendar />, value: 5, label: "Sustainable Solutions", suffix: "+" },
    { icon: <TrendingUp />, value: 95, label: "Customer Retention Rate", suffix: "%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Proven Track Record</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and innovation.
          </p>
        </div>

        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Venkatesan Dhakshinamurthy",
      role: "Founder, Veba Systems, Chennai",
      content: "V2V helped us develop an IoT-based server hardware health monitoring system with firmware integration. Their innovative approach and technical expertise were outstanding.",
      rating: 5,
    },
    {
      name: "Dr. B.Perumal",
      role: "Founder, PMD Systems, Virudhunagar",
      content: "We worked with V2V to redesign a LoRa-based IoT system for pond monitoring, complete with AI-driven suggestions for farmers. Their solutions are practical and impactful.",
      rating: 5,
    },
    {
      name: "Ashok",
      role: "VP Engineering, FutureSystems",
      content: "The team at V2V delivered beyond our expectations. Their commitment to quality and innovation is evident in every project they undertake.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="text-primary font-medium mb-2 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-4 h-4" />
            TESTIMONIALS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading organizations across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What is V2V's primary focus?",
      answer: "V2V specializes in identifying real-world problems, conducting deep R&D to develop innovative solutions, and transferring these technologies to industries and government bodies.",
    },
    {
      question: "How does the technology transfer process work?",
      answer: "We follow a comprehensive process that includes problem identification, solution development through R&D, validation and testing, and finally seamless integration with your existing systems and processes.",
    },
    {
      question: "What industries do you work with?",
      answer: "We collaborate with a wide range of industries including manufacturing, healthcare, energy, transportation, and government sectors, providing tailored solutions for each domain.",
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and scope. Typically, projects range from 3 to 12 months, with ongoing support and optimization available after implementation.",
    },
    {
      question: "Do you provide post-implementation support?",
      answer: "Yes, we offer comprehensive post-implementation support including training, maintenance, updates, and continuous optimization to ensure long-term success.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};



const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Use Local API
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your vision into value? Contact us today to discuss your project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:contact@v2v.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info.v2vtech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 80128 85499
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">Tamilnadu,India</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  {status === "success" && <p className="text-green-500 mt-2 text-center">Message sent successfully!</p>}
                  {status === "error" && <p className="text-red-500 mt-2 text-center">Failed to send message. Please try again.</p>}


                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-background pt-20 pb-12 overflow-hidden border-t">


      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="group">
            <div className="flex items-center mb-6">
              <img
                src="/v2v-logo.png"
                alt="Vision2Value Logo"
                className="h-16 w-auto transition-all group-hover:scale-105 duration-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Transforming innovative ideas into real-world solutions through cutting-edge R&D and technology transfer.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/v2v-tech-vision-to-value-technologies-b91498396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { icon: Mail, href: "mailto:info.v2vtech@gmail.com" },
                { icon: Instagram, href: "https://www.instagram.com/v2vtech?igsh=MXBuaDI2dWJwZGx1Zg==" },
                { icon: Youtube, href: "https://youtube.com/@v2vtech-visiontovaluetech?si=gquIOnoofqTtUQ-1" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                "Problem Identification",
                "R&D Solutions",
                "Technology Transfer",
                "Industry Collaboration",
                "Consulting",
              ].map((service, idx) => (
                <li key={idx}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Experiments", href: "/experiments" },
                { name: "Team", href: "/team" },
                { name: "Blogs", href: "/blogs" },

              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-muted-foreground/70" />
                Tamilnadu,India
              </li>
              <li>
                <a href="mailto:contact@v2v.com" className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group">
                  <Mail className="w-5 h-5 mr-2 text-muted-foreground/70" />
                  info.v2vtech@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group">
                  <Phone className="w-5 h-5 mr-2 text-muted-foreground/70" />
                  +91 80128 85499
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} Vision2Value (V2V). All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <AboutUsSection />
      <ProofSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
