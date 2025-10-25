/*
Setup:
npm install framer-motion lucide-react
npm install -D @types/react @types/react-dom

Add to tailwind.config.js:/*
module.exports = {
  content: ['./src/.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
}

Add Inter font to index.html:
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
*/

'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Github, 
  Eye, 
  X, 
  Calendar, 
  TrendingUp, 
  Users, 
  Zap,
  RefreshCw,
  ChevronDown
} from 'lucide-react';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface Technology {
  name: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: Technology[];
  category: 'AI/ML' | 'MERN' | 'Full Stack';
  liveUrl?: string;
  githubUrl: string;
  features: string[];
  metrics?: {
    users?: string;
    performance?: string;
    accuracy?: string;
  };
  status: 'Completed' | 'In Progress';
  dateCompleted: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}

type FilterType = 'All Projects' | 'AI/ML' | 'MERN' | 'Full Stack';
type SortType = 'date' | 'technology' | 'complexity';

// =============================================================================
// SAMPLE DATA
// =============================================================================

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Image Classification Platform',
    description: 'Real-time image classification using computer vision with 95% accuracy on custom datasets.',
    longDescription: 'A comprehensive platform that leverages TensorFlow and React to provide real-time image classification. Features include custom model training, batch processing, and detailed analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    technologies: [
      { name: 'TensorFlow', color: 'bg-orange-500' },
      { name: 'React', color: 'bg-blue-500' },
      { name: 'Python', color: 'bg-green-500' },
      { name: 'FastAPI', color: 'bg-teal-500' }
    ],
    category: 'AI/ML',
    liveUrl: 'https://ai-classifier-demo.com',
    githubUrl: 'https://github.com/username/ai-classifier',
    features: ['Real-time classification', 'Custom model training', 'Batch processing', 'Analytics dashboard'],
    metrics: { accuracy: '95%', performance: '< 100ms', users: '1.2k+' },
    status: 'Completed',
    dateCompleted: '2024-01-15',
    complexity: 'Advanced'
  },
  {
    id: '2',
    title: 'NLP Chatbot with RAG',
    description: 'Intelligent chatbot using retrieval-augmented generation for accurate, context-aware responses.',
    longDescription: 'Advanced conversational AI system built with OpenAI GPT and custom retrieval mechanisms. Implements RAG architecture for domain-specific knowledge integration.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
    technologies: [
      { name: 'OpenAI API', color: 'bg-purple-500' },
      { name: 'Node.js', color: 'bg-green-600' },
      { name: 'MongoDB', color: 'bg-green-500' },
      { name: 'Socket.io', color: 'bg-gray-600' }
    ],
    category: 'AI/ML',
    liveUrl: 'https://nlp-chatbot-demo.com',
    githubUrl: 'https://github.com/username/nlp-chatbot',
    features: ['RAG architecture', 'Real-time chat', 'Context memory', 'Multi-language support'],
    metrics: { accuracy: '92%', users: '800+', performance: '< 200ms' },
    status: 'Completed',
    dateCompleted: '2023-12-20',
    complexity: 'Advanced'
  },
  {
    id: '3',
    title: 'Predictive Analytics Dashboard',
    description: 'Interactive dashboard for business intelligence with ML-powered forecasting and insights.',
    longDescription: 'Comprehensive analytics platform combining machine learning models with interactive visualizations. Features predictive modeling, trend analysis, and automated reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: [
      { name: 'scikit-learn', color: 'bg-orange-600' },
      { name: 'D3.js', color: 'bg-orange-500' },
      { name: 'Express', color: 'bg-gray-600' },
      { name: 'PostgreSQL', color: 'bg-blue-600' }
    ],
    category: 'AI/ML',
    githubUrl: 'https://github.com/username/analytics-dashboard',
    features: ['Predictive modeling', 'Interactive charts', 'Automated reporting', 'Real-time updates'],
    metrics: { accuracy: '88%', users: '500+' },
    status: 'Completed',
    dateCompleted: '2024-02-10',
    complexity: 'Intermediate'
  },
  {
    id: '4',
    title: 'Real-time Object Detection',
    description: 'Browser-based object detection using YOLO model with WebRTC for live video processing.',
    longDescription: 'Real-time object detection system running entirely in the browser. Uses TensorFlow.js implementation of YOLO for detecting multiple objects in live video streams.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    technologies: [
      { name: 'TensorFlow.js', color: 'bg-orange-500' },
      { name: 'WebRTC', color: 'bg-blue-600' },
      { name: 'React', color: 'bg-blue-500' },
      { name: 'OpenCV', color: 'bg-green-600' }
    ],
    category: 'AI/ML',
    liveUrl: 'https://object-detection-demo.com',
    githubUrl: 'https://github.com/username/object-detection',
    features: ['Real-time detection', 'Multiple object classes', 'Video recording', 'Performance metrics'],
    metrics: { accuracy: '85%', performance: '30 FPS' },
    status: 'In Progress',
    dateCompleted: '2024-03-01',
    complexity: 'Advanced'
  },
  {
    id: '5',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics.',
    longDescription: 'Complete e-commerce platform built with MERN stack. Features include user authentication, payment processing via Stripe, inventory management, order tracking, and comprehensive admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: [
      { name: 'React', color: 'bg-blue-500' },
      { name: 'Node.js', color: 'bg-green-600' },
      { name: 'MongoDB', color: 'bg-green-500' },
      { name: 'Stripe', color: 'bg-purple-600' }
    ],
    category: 'MERN',
    liveUrl: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    features: ['Payment processing', 'Inventory management', 'Order tracking', 'Admin dashboard'],
    metrics: { users: '2.5k+', performance: '98% uptime' },
    status: 'Completed',
    dateCompleted: '2023-11-30',
    complexity: 'Advanced'
  },
  {
    id: '6',
    title: 'Social Media App',
    description: 'Real-time social platform with posts, messaging, notifications, and live chat features.',
    longDescription: 'Modern social media application with real-time features. Includes post sharing, direct messaging, push notifications, story features, and live chat functionality.',
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
    technologies: [
      { name: 'React', color: 'bg-blue-500' },
      { name: 'Express', color: 'bg-gray-600' },
      { name: 'Socket.io', color: 'bg-gray-600' },
      { name: 'JWT', color: 'bg-red-500' }
    ],
    category: 'MERN',
    liveUrl: 'https://social-app-demo.com',
    githubUrl: 'https://github.com/username/social-media-app',
    features: ['Real-time messaging', 'Post sharing', 'Push notifications', 'Story features'],
    metrics: { users: '1.8k+', performance: '< 50ms latency' },
    status: 'Completed',
    dateCompleted: '2024-01-05',
    complexity: 'Intermediate'
  },
  {
    id: '7',
    title: 'Task Management System',
    description: 'Collaborative project management tool with real-time updates, file sharing, and team analytics.',
    longDescription: 'Comprehensive task management platform for teams. Features include project boards, task assignment, file sharing, time tracking, team collaboration, and detailed progress analytics.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    technologies: [
      { name: 'React', color: 'bg-blue-500' },
      { name: 'Node.js', color: 'bg-green-600' },
      { name: 'MongoDB', color: 'bg-green-500' },
      { name: 'Redis', color: 'bg-red-600' }
    ],
    category: 'MERN',
    githubUrl: 'https://github.com/username/task-management',
    features: ['Project boards', 'Task assignment', 'File sharing', 'Time tracking'],
    metrics: { users: '900+', performance: '99.5% uptime' },
    status: 'Completed',
    dateCompleted: '2023-10-15',
    complexity: 'Intermediate'
  },
  {
    id: '8',
    title: 'Real-time Chat Application',
    description: 'Multi-room chat app with video calls, file sharing, message encryption, and presence indicators.',
    longDescription: 'Feature-rich chat application supporting multiple rooms, video calls via WebRTC, file sharing, end-to-end message encryption, user presence indicators, and message history.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop',
    technologies: [
      { name: 'React', color: 'bg-blue-500' },
      { name: 'Express', color: 'bg-gray-600' },
      { name: 'Socket.io', color: 'bg-gray-600' },
      { name: 'WebRTC', color: 'bg-blue-600' }
    ],
    category: 'MERN',
    liveUrl: 'https://chat-app-demo.com',
    githubUrl: 'https://github.com/username/chat-application',
    features: ['Multi-room chat', 'Video calls', 'File sharing', 'Message encryption'],
    metrics: { users: '1.5k+', performance: '< 30ms latency' },
    status: 'In Progress',
    dateCompleted: '2024-02-28',
    complexity: 'Advanced'
  }
];

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

/**
 * Custom hook for debouncing values with configurable delay
 */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for infinite scroll functionality with IntersectionObserver
 */
function useInfiniteScroll(
  hasMore: boolean,
  loadMore: () => void,
  threshold: number = 1.0
) {
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetching) {
          setIsFetching(true);
          loadMore();
          setTimeout(() => setIsFetching(false), 300);
        }
      },
      { threshold }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore, isFetching, threshold]);

  return { sentinelRef, isFetching };
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Loading skeleton component with shimmer effect
 */
const SkeletonCard: FC = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 animate-pulse">
    <div className="relative overflow-hidden bg-gray-700 rounded-lg h-48 mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-700 rounded w-2/3" />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 bg-gray-700 rounded w-16" />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Project card component with hover effects and lazy loading
 */
const ProjectCard: FC<{ project: Project; onViewDetails: (project: Project) => void }> = React.memo(
  ({ project, onViewDetails }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleViewDetails = useCallback(() => {
      onViewDetails(project);
    }, [project, onViewDetails]);

    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
        }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden group cursor-pointer will-change-transform"
        style={{ willChange: 'transform' }}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'Completed' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-black'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech.name}
                className={`px-2 py-1 text-xs font-medium rounded-full text-white ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(project.dateCompleted).toLocaleDateString()}
            </span>
            <span className="capitalize">{project.complexity}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3 h-3" />
              Code
            </a>
            <button
              onClick={handleViewDetails}
              className="flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Eye className="w-3 h-3" />
              Details
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

/**
 * Modal component for project details with focus management
 */
const ProjectModal: FC<{ 
  project: Project | null; 
  isOpen: boolean; 
  onClose: () => void; 
}> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-white/20 p-6 flex items-center justify-between">
              <h2 id="modal-title" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">About This Project</h3>
                <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-3 py-2 text-sm font-medium rounded-full text-white ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Project Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.metrics.users && (
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{project.metrics.users}</p>
                        <p className="text-gray-400 text-sm">Users</p>
                      </div>
                    )}
                    {project.metrics.performance && (
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{project.metrics.performance}</p>
                        <p className="text-gray-400 text-sm">Performance</p>
                      </div>
                    )}
                    {project.metrics.accuracy && (
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{project.metrics.accuracy}</p>
                        <p className="text-gray-400 text-sm">Accuracy</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-white/20">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Source Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Main Projects component with all functionality
 */
const Projects: FC = () => {
  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All Projects');
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounced search term
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);

  // Fetch projects data
const fetchProjects = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    // Try fetching from API (optional, can be mocked)
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error('API not available, using local sample data');
    }
    const data: Project[] = await response.json();
    setProjects(data);
  } catch (err) {
    console.warn(err);
    setProjects(SAMPLE_PROJECTS); // fallback
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Derived projects list with filtering, searching, sorting
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (activeFilter !== 'All Projects') {
      result = result.filter((p) => p.category === activeFilter);
    }

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.technologies.some((t) =>
            t.name.toLowerCase().includes(term)
          )
      );
    }

    if (sortBy === 'date') {
      result.sort(
        (a, b) =>
          new Date(b.dateCompleted).getTime() -
          new Date(a.dateCompleted).getTime()
      );
    } else if (sortBy === 'technology') {
      result.sort(
        (a, b) => a.technologies.length - b.technologies.length
      );
    } else if (sortBy === 'complexity') {
      const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      result.sort(
        (a, b) =>
          order[a.complexity] - order[b.complexity]
      );
    }

    return result;
  }, [projects, activeFilter, debouncedSearchTerm, sortBy]);

  // Infinite scroll hook
  const { sentinelRef, isFetching } = useInfiniteScroll(
    visibleCount < filteredProjects.length,
    () => setVisibleCount((prev) => prev + 3)
  );

  // Handlers
  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Render
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Projects
        </h2>
        <p className="mt-4 text-gray-400">
          Explore my latest AI/ML and Full-Stack projects
        </p>
      </motion.div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="flex gap-2">
          {(['All Projects', 'AI/ML', 'MERN', 'Full Stack'] as FilterType[]).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none"
          >
            <option value="date">Sort by Date</option>
            <option value="technology">Sort by Technologies</option>
            <option value="complexity">Sort by Complexity</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleViewDetails}
            />
          ))}
        </motion.div>
      )}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10" />
      {isFetching && (
        <p className="text-center text-gray-400 mt-4">Loading more...</p>
      )}

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
