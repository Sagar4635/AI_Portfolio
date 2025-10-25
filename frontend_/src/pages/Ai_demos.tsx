"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  Camera,
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Github,
  ExternalLink,
  Search,
  Filter,
  User,
  Brain,
  Zap,
  Home,
  ChevronRight,
  Share2,
  Download,
  Eye,
  Users,
  Clock,
  Tag,
} from "lucide-react";

// ==================== TYPESCRIPT INTERFACES ====================

/**
 * Interface for individual AI demo items
 */
interface AIDemo {
  id: string;
  title: string;
  description: string;
  category: "computer-vision" | "nlp" | "voice" | "ml" | "other";
  techStack: string[];
  githubUrl: string;
  isActive: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completionTime: string;
  demoComponent: React.ComponentType<any>;
  icon: React.ComponentType<any>;
}

/**
 * Interface for demo modal state management
 */
interface DemoModalState {
  isOpen: boolean;
  activeDemo: AIDemo | null;
}

/**
 * Interface for face detection state
 */
interface FaceDetectionState {
  isActive: boolean;
  isLoading: boolean;
  faceCount: number;
  error: string | null;
  hasPermission: boolean;
}

/**
 * Interface for Jarvis assistant state
 */
interface JarvisState {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  response: string;
  error: string | null;
  isPlaying: boolean;
}

/**
 * Interface for search and filter state
 */
interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedDifficulty: string;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Utility function to simulate API delay for demos
 */
const simulateDelay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Utility function to generate random face detection results
 */
const generateFaceDetectionResults = (): {
  count: number;
  confidence: number;
} => ({
  count: Math.floor(Math.random() * 4) + 1,
  confidence: Math.random() * 0.3 + 0.7,
});

/**
 * Utility function to simulate Jarvis responses
 */
const generateJarvisResponse = (input: string): string => {
  const responses = {
    hello: "Hello! I am Jarvis, your AI assistant. How can I help you today?",
    weather:
      "I would need access to weather APIs to provide current weather information.",
    time: `The current time is ${new Date().toLocaleTimeString()}.`,
    default:
      'I understand you said "' +
      input +
      '". This is a demo response from your AI assistant.',
  };

  const key = Object.keys(responses).find((k) =>
    input.toLowerCase().includes(k)
  ) as keyof typeof responses;

  return responses[key] || responses.default;
};

// ==================== DEMO COMPONENTS ====================

/**
 * Face Detection Demo Component
 */
const FaceDetectionDemo: React.FC = memo(() => {
  const [state, setState] = useState<FaceDetectionState>({
    isActive: false,
    isLoading: false,
    faceCount: 0,
    error: null,
    hasPermission: false,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
 

  /**
   * Start face detection demo
   */
  const startDetection = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate camera access
      await simulateDelay(1500);

      setState((prev) => ({
        ...prev,
        isActive: true,
        isLoading: false,
        hasPermission: true,
      }));

      // Simulate face detection updates
      intervalRef.current = setInterval(() => {
        const results = generateFaceDetectionResults();
        setState((prev) => ({ ...prev, faceCount: results.count }));
      }, 2000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Camera access denied or not available",
        isLoading: false,
      }));
    }
  }, []);

  /**
   * Stop face detection demo
   */
  const stopDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState((prev) => ({
      ...prev,
      isActive: false,
      faceCount: 0,
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ display: state.isActive ? "block" : "none" }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {!state.isActive && !state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Camera size={48} className="mx-auto mb-4 opacity-50" />
              <p>Click "Start Detection" to begin face detection demo</p>
            </div>
          </div>
        )}

        {state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Accessing camera...</p>
            </div>
          </div>
        )}

        {state.isActive && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {state.faceCount} face{state.faceCount !== 1 ? "s" : ""} detected
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {!state.isActive ? (
          <button
            onClick={startDetection}
            disabled={state.isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Play size={16} />
            {state.isLoading ? "Starting..." : "Start Detection"}
          </button>
        ) : (
          <button
            onClick={stopDetection}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Square size={16} />
            Stop Detection
          </button>
        )}
      </div>

      {state.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {state.error}
        </div>
      )}
    </div>
  );
});

FaceDetectionDemo.displayName = "FaceDetectionDemo";

/**
 * Jarvis Assistant Demo Component
 */
const JarvisDemo: React.FC = memo(() => {
  const [state, setState] = useState<JarvisState>({
    isListening: false,
    isProcessing: false,
    transcript: "",
    response: "",
    error: null,
    isPlaying: false,
  });

  /**
   * Start voice recognition
   */
  const startListening = useCallback(async () => {
    setState((prev) => ({ ...prev, isListening: true, error: null }));

    try {
      // Simulate voice recognition
      await simulateDelay(3000);

      const mockTranscripts = [
        "Hello Jarvis, how are you today?",
        "What's the weather like?",
        "What time is it?",
        "Tell me about artificial intelligence",
      ];

      const randomTranscript =
        mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];

      setState((prev) => ({
        ...prev,
        isListening: false,
        isProcessing: true,
        transcript: randomTranscript,
      }));

      // Process response
      await simulateDelay(2000);
      const response = generateJarvisResponse(randomTranscript);

      setState((prev) => ({
        ...prev,
        isProcessing: false,
        response,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Voice recognition failed",
        isListening: false,
      }));
    }
  }, []);

  /**
   * Stop listening
   */
  const stopListening = useCallback(() => {
    setState((prev) => ({ ...prev, isListening: false }));
  }, []);

  /**
   * Play response audio (simulated)
   */
  const playResponse = useCallback(async () => {
    if (!state.response) return;

    setState((prev) => ({ ...prev, isPlaying: true }));
    await simulateDelay(3000);
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, [state.response]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-lg p-6 min-h-[300px]">
        <div className="text-center mb-6">
          <div
            className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
              state.isListening
                ? "bg-red-500 animate-pulse"
                : state.isProcessing
                ? "bg-yellow-500 animate-spin"
                : "bg-blue-500"
            }`}
          >
            <Brain size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">J.A.R.V.I.S</h3>
          <p className="text-gray-400">Just A Rather Very Intelligent System</p>
        </div>

        {state.transcript && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <User size={16} className="text-blue-400 mt-1" />
              <div>
                <p className="text-blue-400 text-sm font-medium">You said:</p>
                <p className="text-white">{state.transcript}</p>
              </div>
            </div>
          </div>
        )}

        {state.response && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <Brain size={16} className="text-green-400 mt-1" />
              <div className="flex-1">
                <p className="text-green-400 text-sm font-medium">Jarvis:</p>
                <p className="text-white">{state.response}</p>
                <button
                  onClick={playResponse}
                  disabled={state.isPlaying}
                  className="mt-2 flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {state.isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {state.isPlaying ? "Playing..." : "Play Audio"}
                </button>
              </div>
            </div>
          </div>
        )}

        {state.isListening && (
          <div className="text-center">
            <div className="text-red-400 mb-2">🔴 Listening...</div>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-400 rounded animate-pulse"
                  style={{
                    height: Math.random() * 20 + 10,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {state.isProcessing && (
          <div className="text-center text-yellow-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
            Processing your request...
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {!state.isListening ? (
          <button
            onClick={startListening}
            disabled={state.isProcessing}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Mic size={16} />
            Start Listening
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MicOff size={16} />
            Stop Listening
          </button>
        )}
      </div>

      {state.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {state.error}
        </div>
      )}
    </div>
  );
});

JarvisDemo.displayName = "JarvisDemo";

/**
 * Placeholder Demo Component for future projects
 */
const PlaceholderDemo: React.FC<{ title: string }> = memo(({ title }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
    <Zap size={48} className="mx-auto mb-4 text-gray-400" />
    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
      {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4">
      Coming soon! This demo is currently under development.
    </p>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-full max-w-xs mx-auto">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: "60%" }}
      ></div>
    </div>
    <p className="text-xs text-gray-400 mt-2">60% Complete</p>
  </div>
));

PlaceholderDemo.displayName = "PlaceholderDemo";

// ==================== MAIN COMPONENT ====================

/**
 * Main AI Demos Page Component
 */
const AIDemosPage: React.FC = () => {
  const [modalState, setModalState] = useState<DemoModalState>({
    isOpen: false,
    activeDemo: null,
  });

  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: "",
    selectedCategory: "",
    selectedDifficulty: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(true);

  // Demo data configuration
  const demos: AIDemo[] = [
    {
      id: "face-detection",
      title: "Real-time Face Detection",
      description:
        "Advanced computer vision system that detects and tracks human faces in real-time using webcam input with high accuracy and performance.",
      category: "computer-vision",
      techStack: ["React", "TensorFlow.js", "WebRTC", "Canvas API"],
      githubUrl: "https://github.com/yourusername/face-detection",
      isActive: true,
      difficulty: "Intermediate",
      completionTime: "3 weeks",
      demoComponent: FaceDetectionDemo,
      icon: Eye,
    },
    {
      id: "jarvis-assistant",
      title: "J.A.R.V.I.S Voice Assistant",
      description:
        "Intelligent voice-controlled assistant inspired by Iron Man's JARVIS, featuring natural language processing and text-to-speech capabilities.",
      category: "voice",
      techStack: [
        "React",
        "Web Speech API",
        "Natural Language Processing",
        "Text-to-Speech",
      ],
      githubUrl: "https://github.com/yourusername/jarvis-assistant",
      isActive: true,
      difficulty: "Advanced",
      completionTime: "4 weeks",
      demoComponent: JarvisDemo,
      icon: Mic,
    },
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis Engine",
      description:
        "Machine learning model that analyzes text sentiment and emotion detection with real-time processing capabilities.",
      category: "nlp",
      techStack: ["Python", "NLTK", "TensorFlow", "FastAPI", "React"],
      githubUrl: "https://github.com/yourusername/sentiment-analysis",
      isActive: false,
      difficulty: "Intermediate",
      completionTime: "2 weeks",
      demoComponent: () => (
        <PlaceholderDemo title="Sentiment Analysis Engine" />
      ),
      icon: Brain,
    },
    {
      id: "object-detection",
      title: "Multi-Object Detection",
      description:
        "YOLO-based object detection system capable of identifying and classifying multiple objects in images and video streams.",
      category: "computer-vision",
      techStack: ["Python", "YOLOv5", "OpenCV", "PyTorch", "Streamlit"],
      githubUrl: "https://github.com/yourusername/object-detection",
      isActive: false,
      difficulty: "Advanced",
      completionTime: "5 weeks",
      demoComponent: () => <PlaceholderDemo title="Multi-Object Detection" />,
      icon: Camera,
    },
  ];

  /**
   * Filter demos based on search query and selected filters
   */
  const filteredDemos = demos.filter((demo) => {
    const matchesSearch =
      demo.title
        .toLowerCase()
        .includes(filterState.searchQuery.toLowerCase()) ||
      demo.description
        .toLowerCase()
        .includes(filterState.searchQuery.toLowerCase());
    const matchesCategory =
      !filterState.selectedCategory ||
      demo.category === filterState.selectedCategory;
    const matchesDifficulty =
      !filterState.selectedDifficulty ||
      demo.difficulty === filterState.selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  /**
   * Open demo modal
   */
  const openModal = useCallback((demo: AIDemo) => {
    setModalState({ isOpen: true, activeDemo: demo });
  }, []);

  /**
   * Close demo modal
   */
  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, activeDemo: null });
  }, []);

  /**
   * Share demo functionality
   */
  const shareDemo = useCallback((demo: AIDemo) => {
    if (navigator.share) {
      navigator.share({
        title: demo.title,
        text: demo.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${demo.title}: ${window.location.href}`);
      alert("Demo link copied to clipboard!");
    }
  }, []);

  /**
   * Get category color
   */
  const getCategoryColor = (category: string): string => {
    const colors = {
      "computer-vision":
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      nlp: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      voice: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ml: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  /**
   * Get difficulty color
   */
  const getDifficultyColor = (difficulty: string): string => {
    const colors = {
      Beginner: "text-green-600 dark:text-green-400",
      Intermediate: "text-yellow-600 dark:text-yellow-400",
      Advanced: "text-red-600 dark:text-red-400",
    };
    return colors[difficulty as keyof typeof colors] || colors.Beginner;
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Navigation Breadcrumbs */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Home size={16} />
              <ChevronRight size={16} />
              <span>Portfolio</span>
              <ChevronRight size={16} />
              <span className="text-gray-900 dark:text-white font-medium">
                AI Demos
              </span>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI & Machine Learning
            <span className="block text-blue-600 dark:text-blue-400">
              Demonstrations
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my collection of artificial intelligence and machine
            learning projects, featuring computer vision, natural language
            processing, and voice recognition technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{demos.length} Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{demos.filter((d) => d.isActive).length} Live Demos</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Updated Recently</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search AI demos..."
                value={filterState.searchQuery}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterState.selectedCategory}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  selectedCategory: e.target.value,
                }))
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              <option value="computer-vision">Computer Vision</option>
              <option value="nlp">Natural Language Processing</option>
              <option value="voice">Voice Recognition</option>
              <option value="ml">Machine Learning</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={filterState.selectedDifficulty}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  selectedDifficulty: e.target.value,
                }))
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredDemos.length} of {demos.length} demos
          </div>
        </div>

        {/* Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredDemos.map((demo) => {
            const IconComponent = demo.icon;
            return (
              <div
                key={demo.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg ${
                        demo.isActive
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <IconComponent
                        size={24}
                        className={
                          demo.isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400"
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => shareDemo(demo)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Share demo"
                      >
                        <Share2 size={16} />
                      </button>
                      {demo.isActive && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {demo.description}
                  </p>

                  {/* Category and Difficulty Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        demo.category
                      )}`}
                    >
                      <Tag size={12} className="inline mr-1" />
                      {demo.category
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <span
                      className={`text-xs font-medium ${getDifficultyColor(
                        demo.difficulty
                      )}`}
                    >
                      {demo.difficulty}
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {demo.techStack.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {demo.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded">
                          +{demo.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <a
                      href={demo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <Github size={14} />
                      GitHub
                      <ExternalLink size={12} />
                    </a>

                    {demo.isActive ? (
                      <button
                        onClick={() => openModal(demo)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <Play size={14} />
                        Try Demo
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demo Modal */}
      {modalState.isOpen && modalState.activeDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {modalState.activeDemo.title}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {modalState.activeDemo.description}
            </p>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <modalState.activeDemo.demoComponent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDemosPage;
