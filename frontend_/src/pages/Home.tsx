import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaMicrophone } from 'react-icons/fa';

const Home: React.FC = () => {
  const handleVoiceCommand = () => {
    // This will connect to our JARVIS assistant later
    console.log('Voice command activated');
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold dark:text-gray-300 mb-8">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sagar Singh</span>
            </h1>
            <h2 className="text-3xl text-gray-600 dark:text-gray-300 mb-6">
              AI/ML Developer & BTech Final Year Student
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Building intelligent systems with Machine Learning, Computer Vision, 
              and Natural Language Processing. Specializing in real-time AI applications.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 bg-primary  hover:text-white bg-gray-200 px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download Resume
              </motion.a>
              
              <motion.button
                onClick={handleVoiceCommand}
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary  hover:text-white bg-gray-200 hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMicrophone /> Try Voice Commands
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a href="https://github.com/yourusername" className="text-gray-600 hover:text-white bg-gray-200 hover:bg-blue-600 rounded-full p-2 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-gray-600 hover:text-white bg-gray-200 hover:bg-blue-600 rounded-full p-2 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>

          {/* Profile Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
              <div className="text-white text-6xl font-bold">AI</div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 -right-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-sm font-semibold dark:text-gray-300 ">Face Detection</div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-10 -left-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="text-sm font-semibold dark:text-gray-300">JARVIS AI</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
