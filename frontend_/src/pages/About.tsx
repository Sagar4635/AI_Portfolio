import React, { useState } from "react";

// top of file: add Types from framer-motion
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

/* ...your other imports... */

// define reusable transitions
const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
};

const springTransitionFast: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// typed variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    } as Transition,
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: springTransition,
  },
};

import {
  FaGraduationCap,
  FaCode,
  FaBrain,
  FaTrophy,
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaCamera,
  FaGamepad,
  FaMusic,
  FaBook,
  FaMountain,
  FaCoffee,
  FaPython,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaAws,
  FaGit,
  FaDocker,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiPytorch,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiKubernetes,
  SiPandas,
  SiScikitlearn,
  SiOpenai,
} from "react-icons/si";

// TypeScript Interfaces
interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: "programming" | "frameworks" | "tools" | "ai_ml";
}

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  type: "education" | "work" | "project";
  description: string;
  skills: string[];
  achievements: string[];
  icon: React.ReactNode;
}

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  category: "award" | "certification" | "publication" | "recognition";
}

interface Interest {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  university: string;
  degree: string;
  expectedGraduation: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
  personalStory: string;
  philosophy: string;
}

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "skills" | "experience" | "achievements"
  >("skills");
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );

  // Personal Information Data
  const personalInfo: PersonalInfo = {
    name: "Alex Johnson",
    title: "AI/ML Developer & BTech Final Year Student",
    location: "San Francisco, CA",
    university: "Stanford University",
    degree: "BTech Computer Science with AI Specialization",
    expectedGraduation: "May 2025",
    email: "alex.johnson@email.com",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    bio: "Passionate AI/ML developer combining cutting-edge technology with creative problem-solving to build intelligent systems that make a real-world impact.",
    personalStory:
      "My journey into AI began during my sophomore year when I built my first computer vision project for detecting emotions in real-time. What started as curiosity evolved into a passion for creating intelligent systems that can understand and interact with the world around us. I believe AI has the power to solve humanity's greatest challenges, and I'm dedicated to being part of that solution.",
    philosophy:
      "I believe in the intersection of technology and humanity. Every line of code I write is guided by the principle that technology should enhance human capabilities, not replace them. My goal is to create AI systems that are not only intelligent but also ethical, accessible, and beneficial for society.",
  };

  // Skills Data
  const skills: Skill[] = [
    // Programming Languages
    { name: "Python", level: 95, icon: <FaPython />, category: "programming" },
    { name: "JavaScript", level: 90, icon: <FaJs />, category: "programming" },
    {
      name: "TypeScript",
      level: 85,
      icon: <SiTypescript />,
      category: "programming",
    },
    { name: "Java", level: 80, icon: <FaCode />, category: "programming" },
    { name: "C++", level: 75, icon: <FaCode />, category: "programming" },

    // Frameworks & Libraries
    { name: "React", level: 92, icon: <FaReact />, category: "frameworks" },
    { name: "Node.js", level: 88, icon: <FaNodeJs />, category: "frameworks" },
    {
      name: "TensorFlow",
      level: 90,
      icon: <SiTensorflow />,
      category: "ai_ml",
    },
    { name: "PyTorch", level: 85, icon: <SiPytorch />, category: "ai_ml" },
    {
      name: "Scikit-learn",
      level: 88,
      icon: <SiScikitlearn />,
      category: "ai_ml",
    },

    // Tools & Platforms
    { name: "Git", level: 90, icon: <FaGit />, category: "tools" },
    { name: "Docker", level: 82, icon: <FaDocker />, category: "tools" },
    { name: "AWS", level: 78, icon: <FaAws />, category: "tools" },
    { name: "MongoDB", level: 85, icon: <SiMongodb />, category: "tools" },
    {
      name: "PostgreSQL",
      level: 80,
      icon: <SiPostgresql />,
      category: "tools",
    },
  ];

  // Experience Data
  const experiences: Experience[] = [
    {
      id: 1,
      title: "BTech Computer Science - AI Specialization",
      company: "Stanford University",
      location: "Stanford, CA",
      period: "2021 - 2025",
      type: "education",
      description:
        "Pursuing Bachelor of Technology in Computer Science with specialization in Artificial Intelligence and Machine Learning. Maintaining a GPA of 3.8/4.0.",
      skills: [
        "Data Structures",
        "Algorithms",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
      ],
      achievements: [
        "Dean's List for 6 consecutive semesters",
        "Research Assistant in AI Lab",
        "Teaching Assistant for CS101 - Introduction to Programming",
      ],
      icon: <FaGraduationCap />,
    },
    {
      id: 2,
      title: "Machine Learning Engineer Intern",
      company: "TechCorp AI",
      location: "San Francisco, CA",
      period: "June 2024 - August 2024",
      type: "work",
      description:
        "Developed and deployed machine learning models for real-time recommendation systems serving 1M+ users daily.",
      skills: ["Python", "TensorFlow", "AWS", "Docker", "Kubernetes"],
      achievements: [
        "Improved recommendation accuracy by 23%",
        "Reduced model inference time by 40%",
        "Led a team of 3 junior developers",
      ],
      icon: <FaBrain />,
    },
    {
      id: 3,
      title: "Full Stack Developer Intern",
      company: "StartupXYZ",
      location: "Remote",
      period: "May 2023 - August 2023",
      type: "work",
      description:
        "Built scalable web applications using MERN stack, implementing responsive UI/UX and RESTful APIs.",
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      achievements: [
        "Developed 3 major features from scratch",
        "Improved application performance by 35%",
        "Mentored 2 new interns",
      ],
      icon: <FaCode />,
    },
    {
      id: 4,
      title: "AI Research Project - Emotion Recognition",
      company: "Stanford AI Lab",
      location: "Stanford, CA",
      period: "January 2023 - Present",
      type: "project",
      description:
        "Leading research on real-time emotion recognition using computer vision and deep learning techniques.",
      skills: ["Computer Vision", "Deep Learning", "OpenCV", "PyTorch"],
      achievements: [
        "Published paper in IEEE conference",
        "Achieved 94% accuracy on emotion detection",
        "Open-sourced the project with 500+ GitHub stars",
      ],
      icon: <FaLightbulb />,
    },
  ];

  // Achievements Data
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Winner - National AI Hackathon 2024",
      organization: "TechFest National",
      date: "March 2024",
      description:
        "Led a team of 4 to develop an AI-powered healthcare diagnosis system that won first place among 200+ teams.",
      icon: <FaTrophy />,
      category: "award",
    },
    {
      id: 2,
      title: "Google Summer of Code Participant",
      organization: "Google",
      date: "Summer 2023",
      description:
        "Contributed to TensorFlow open-source project, implementing new optimization algorithms for neural networks.",
      icon: <FaRocket />,
      category: "recognition",
    },
    {
      id: 3,
      title: "Published Research Paper",
      organization: "IEEE Conference on AI",
      date: "December 2023",
      description:
        "Co-authored paper on 'Real-time Emotion Recognition using Convolutional Neural Networks' - cited 25+ times.",
      icon: <FaBook />,
      category: "publication",
    },
    {
      id: 4,
      title: "AWS Solutions Architect Associate",
      organization: "Amazon Web Services",
      date: "August 2023",
      description:
        "Certified in designing distributed systems and cloud architecture on AWS platform.",
      icon: <FaAws />,
      category: "certification",
    },
  ];

  // Personal Interests
  const interests: Interest[] = [
    {
      name: "Photography",
      description:
        "Capturing moments and landscapes, especially drone photography",
      icon: <FaCamera />,
    },
    {
      name: "Gaming",
      description: "Competitive esports and game development as a hobby",
      icon: <FaGamepad />,
    },
    {
      name: "Music Production",
      description:
        "Creating electronic music using AI-assisted composition tools",
      icon: <FaMusic />,
    },
    {
      name: "Reading",
      description: "Sci-fi novels, AI research papers, and technology blogs",
      icon: <FaBook />,
    },
    {
      name: "Hiking",
      description: "Exploring nature trails and mountain climbing on weekends",
      icon: <FaMountain />,
    },
    {
      name: "Coffee Culture",
      description: "Coffee enthusiast and part-time barista at campus café",
      icon: <FaCoffee />,
    },
  ];

  const funFacts = [
    "I've built over 50 AI models, from simple linear regression to complex neural networks",
    "I can solve a Rubik's cube in under 2 minutes (working on sub-1 minute)",
    "I've traveled to 12 countries and speak 3 languages fluently",
    "My code has been starred over 2,000 times on GitHub",
    "I once debugged a critical system issue in under 10 minutes during a live demo",
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const skillCategories = {
    programming: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    tools: "Tools & Platforms",
    ai_ml: "AI/ML Technologies",
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section 
          className="py-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Content */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <FaRocket className="mr-2" />
                Available for Internships & Collaborations
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-4 dark:text-gray-300">
                I'm a{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Web Developer
                </span>
              </h1>

              <h2 className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6">
                {personalInfo.title}
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Uttar Pradesh, India
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGraduationCap className="text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">
                    ANDUAT, Kumarganj, Ayodhya
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Graduation 2022-26
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCode className="text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">
                    AI/ML Specialist & Web dev
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-wrap gap-4 ">
                <motion.a
                  href="/resume.pdf" // Path to your resume inside public/
                  download="Sagar_Singh_Resume.pdf" // Suggested filename when downloaded
                  className="btn-primary flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload /> Download Resume
                </motion.a>

                <motion.a
                  href="https://in.linkedin.com/in/sagar-singh-25ba6837a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin /> Connect
                </motion.a>

                <motion.a
                  href="https://github.com/Sagar4635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub /> GitHub
                </motion.a>
              </div> */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {/* Download Resume */}
                <motion.a
                  href="/resume.pdf"
                  download="Sagar_Singh_Resume.pdf"
                  className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg
               overflow-hidden text-white
               bg-gradient-to-r from-blue-500 to-purple-600
               dark:from-blue-600 dark:to-purple-700
               transition-all duration-700 ease-in-out
               hover:scale-105 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="relative z-10" />
                  <span className="relative z-10">Download Resume</span>

                  {/* Shine effect */}
                  <span
                    className="absolute left-0 top-0 w-0 h-full bg-white/30 transform -skew-x-12
                     animate-shine pointer-events-none"
                  ></span>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/919794504499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg
               overflow-hidden text-white
               bg-gradient-to-r from-green-500 to-emerald-600
               dark:from-green-600 dark:to-emerald-700
               transition-all duration-700 ease-in-out
               hover:scale-105 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="relative z-10" />
                  <span className="relative z-10">WhatsApp</span>

                  {/* Shine effect */}
                  <span
                    className="absolute left-0 top-0 w-0 h-full bg-white/30 transform -skew-x-12
                     animate-shine pointer-events-none"
                  ></span>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/Sagar4635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg
               overflow-hidden text-white
               bg-gray-800 dark:bg-gray-700
               transition-all duration-700 ease-in-out
               hover:scale-105 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="relative z-10" />
                  <span className="relative z-10">GitHub</span>

                  <span
                    className="absolute left-0 top-0 w-0 h-full bg-white/20 transform -skew-x-12
                     animate-shine pointer-events-none"
                  ></span>
                </motion.a>
              </div>
            </motion.div>

            {/* Profile Image & Stats */}
            <motion.div className="relative" variants={itemVariants}>
              <div className="relative w-80 h-80 mx-auto">
                {/* Profile Image Placeholder */}
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center text-white text-6xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  AJ
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    AI Models Built
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-2xl font-bold text-primary">3.8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    GPA
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-2xl font-bold text-primary">2k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    GitHub Stars
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Personal Story Section */}
        {/* <motion.section
          className="py-16 bg-white dark:bg-gray-800 rounded-2xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-8">
            <motion.h2
              className="text-4xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              My Journey
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {personalInfo.personalStory}
            </motion.p>
          </div>
        </motion.section> */}
        <motion.section
          className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Section Title */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              My Journey
            </motion.h2>

            {/* Divider */}
            <motion.div
              className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Paragraph */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed md:leading-loose max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {personalInfo.personalStory}
            </motion.p>

            {/* Call-to-action / Highlight Box */}
            <motion.div
              className="mt-8 inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Excited to build impactful AI & Web solutions!
            </motion.div>
          </div>
        </motion.section>

        {/* Skills, Experience, Achievements Tabs */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              {(["skills", "experience", "achievements"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 rounded-md transition-all duration-300 font-medium ${
                      activeTab === tab
                        ? "bg-primary text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-primary"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {Object.entries(skillCategories).map(([category, title]) => (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">{title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="card p-6"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl text-primary">
                                {skill.icon}
                              </div>
                              <span className="font-semibold">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="card p-8 cursor-pointer"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    setExpandedExperience(
                      expandedExperience === exp.id ? null : exp.id
                    )
                  }
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl text-primary mt-1">{exp.icon}</div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <span className="text-sm text-primary font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-primary font-semibold mb-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {exp.location}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {exp.skills.length > 5 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                            +{exp.skills.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Expandable Achievements */}
                      {expandedExperience === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 dark:border-gray-700 pt-4"
                        >
                          <h4 className="font-semibold mb-2">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-primary mt-1">•</span>
                                <span className="text-gray-600 dark:text-gray-300">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="card p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl text-yellow-500">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">
                          {achievement.title}
                        </h3>
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-full">
                          {achievement.category}
                        </span>
                      </div>
                      <p className="text-primary font-medium mb-1">
                        {achievement.organization}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {achievement.date}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Personal Interests */}
        <motion.section
          className="py-16 bg-white dark:bg-gray-800 rounded-2xl mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="px-8">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Beyond the Code
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl text-primary">{interest.icon}</div>
                    <h3 className="font-semibold text-lg">{interest.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Fun Facts Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Fun Facts
          </motion.h2>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-gray-700 dark:text-gray-300">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
