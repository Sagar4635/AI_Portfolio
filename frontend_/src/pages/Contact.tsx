"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,  // ✅ correct
  Github,
  Send,
  Copy,
  Check,
  AlertCircle,
  Clock,
  User,
  Building2,
  MessageSquare,
  Calendar,
  ExternalLink,
  FileText,
  Upload,
  X,
  ChevronDown,
  Star,
  Zap,
  Shield,
  Award,
  Globe,
} from "lucide-react";


// ==================== TYPESCRIPT INTERFACES ====================

/**
 * Interface for contact form data
 */
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  budgetRange: string;
  message: string;
  contactMethod: string;
  timeline: string;
  attachments: File[];
}

/**
 * Interface for form validation errors
 */
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  attachments?: string;
}

/**
 * Interface for form submission state
 */
interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  isDraftSaved: boolean;
}

/**
 * Interface for contact method item
 */
interface ContactMethod {
  id: string;
  icon: React.ElementType;

  label: string;
  value: string;
  href: string;
  description: string;
  isPrimary?: boolean;
}

/**
 * Interface for FAQ item
 */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/**
 * Interface for testimonial
 */
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Email validation utility
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number formatting utility
 */
const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * File size formatter
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Debounce utility for auto-save
 */
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// ==================== CUSTOM HOOKS ====================

/**
 * Custom hook for form validation
 */
const useFormValidation = (formData: ContactFormData) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate phone (optional but format check if provided)
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    // Validate attachments
    if (formData.attachments.length > 0) {
      const totalSize = formData.attachments.reduce(
        (sum, file) => sum + file.size,
        0
      );
      if (totalSize > 5 * 1024 * 1024) {
        // 5MB limit
        newErrors.attachments = "Total file size must be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  return { errors, validateForm };
};

/**
 * Custom hook for clipboard operations
 */
const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  return { copied, copyToClipboard };
};

// ==================== SUB-COMPONENTS ====================

/**
 * Animated background component
 */
const AnimatedBackground: React.FC = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

/**
 * Contact method card component
 */
const ContactMethodCard: React.FC<{
  method: ContactMethod;
  onCopy?: (text: string) => void;
}> = memo(({ method, onCopy }) => {
  const { copied, copyToClipboard } = useClipboard();
  const IconComponent = method.icon;

  const handleClick = () => {
    if (onCopy && (method.id === "email" || method.id === "phone")) {
      copyToClipboard(method.value);
    }
  };

  return (
    <div
      className={`relative group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        method.isPrimary ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
    >
      {method.isPrimary && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Primary
          </span>
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
            <IconComponent
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {method.label}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            {method.description}
          </p>

          <div className="flex items-center space-x-2">
            <a
              href={method.href}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              target={
                method.id === "linkedin" || method.id === "github"
                  ? "_blank"
                  : undefined
              }
              rel={
                method.id === "linkedin" || method.id === "github"
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {method.value}
            </a>

            {(method.id === "email" || method.id === "phone") && (
              <button
                onClick={handleClick}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            )}

            {(method.id === "linkedin" || method.id === "github") && (
              <ExternalLink size={16} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ContactMethodCard.displayName = "ContactMethodCard";

/**
 * Form field component with validation
 */
const FormField: React.FC<{
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}> = memo(({ label, error, required, children }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center space-x-1 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

/**
 * File upload component
 */
const FileUpload: React.FC<{
  files: File[];
  onFilesChange: (files: File[]) => void;
  error?: string;
}> = memo(({ files, onFilesChange, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    onFilesChange([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-3">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <Upload size={24} className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click to upload files or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Maximum 5MB total
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </span>
            <span>{formatFileSize(totalSize)}</span>
          </div>

          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-2"
            >
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-1 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = "FileUpload";

/**
 * FAQ accordion component
 */
const FAQAccordion: React.FC<{ faqs: FAQItem[] }> = memo(({ faqs }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {faq.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                openItems.includes(faq.id) ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {openItems.includes(faq.id) && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

FAQAccordion.displayName = "FAQAccordion";

/**
 * Testimonials slider component
 */
const TestimonialsSlider: React.FC<{ testimonials: Testimonial[] }> = memo(
  ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (testimonials.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [testimonials.length]);

    if (testimonials.length === 0) return null;

    const currentTestimonial = testimonials[currentIndex];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < currentTestimonial.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
          "{currentTestimonial.content}"
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {currentTestimonial.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentTestimonial.role} at {currentTestimonial.company}
            </p>
          </div>

          {testimonials.length > 1 && (
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TestimonialsSlider.displayName = "TestimonialsSlider";

// ==================== MAIN COMPONENT ====================

/**
 * Main Contact Page Component
 */
const Contact: React.FC = () => {
  // Form state management
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    budgetRange: "",
    message: "",
    contactMethod: "email",
    timeline: "",
    attachments: [],
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    isDraftSaved: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Custom hooks
  const { errors, validateForm } = useFormValidation(formData);
  const debouncedFormData = useDebounce(formData, 1000);

  // Auto-save functionality
  useEffect(() => {
    if (
      debouncedFormData.fullName ||
      debouncedFormData.email ||
      debouncedFormData.message
    ) {
      // Simulate auto-save
      setFormState((prev) => ({ ...prev, isDraftSaved: true }));
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isDraftSaved: false }));
      }, 2000);
    }
  }, [debouncedFormData]);

  // Contact methods data
  const contactMethods: ContactMethod[] = [
    {
      id: "email",
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
      description: "Best for detailed inquiries and project discussions",
      isPrimary: true,
    },
    {
      id: "phone",
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      description: "For urgent matters and quick consultations",
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      href: "https://linkedin.com/in/yourprofile",
      description: "Professional networking and career opportunities",
    },
    {
      id: "github",
      icon: Github,
      label: "GitHub",
      value: "github.com/yourusername",
      href: "https://github.com/yourusername",
      description: "View my code and contribute to projects",
    },
  ];

  // FAQ data
  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "What types of projects do you work on?",
      answer:
        "I specialize in AI/ML projects including computer vision, natural language processing, voice recognition systems, and web applications. I'm particularly experienced with face detection systems and AI assistants like JARVIS.",
      category: "services",
    },
    {
      id: "2",
      question: "How quickly can you respond to inquiries?",
      answer:
        "I typically respond to emails within 24 hours on weekdays. For urgent matters, you can reach me via phone or LinkedIn for faster communication.",
      category: "communication",
    },
    {
      id: "3",
      question: "Are you available for full-time opportunities?",
      answer:
        "Yes! As a final year B.Tech student, I'm actively seeking full-time opportunities starting from my graduation. I'm also open to internships and freelance projects.",
      category: "availability",
    },
    {
      id: "4",
      question: "What technologies do you specialize in?",
      answer:
        "My core expertise includes React, TypeScript, Python, TensorFlow, OpenCV, Node.js, and various AI/ML frameworks. I'm always learning new technologies based on project requirements.",
      category: "technical",
    },
  ];

  // Sample testimonials
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Research Supervisor",
      company: "University AI Lab",
      content:
        "Exceptional work on the face detection project. Shows great potential in AI/ML development.",
      rating: 5,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Project Manager",
      company: "Tech Innovations Inc.",
      content:
        "Delivered high-quality code with excellent documentation. Very professional approach.",
      rating: 5,
    },
  ];

  /**
   * Handle form input changes
   */
  const handleInputChange = (
    field: keyof ContactFormData,
    value: string | File[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would integrate with your backend API or email service
      console.log("Form submitted:", formData);

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
      }));

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          inquiryType: "",
          budgetRange: "",
          message: "",
          contactMethod: "email",
          timeline: "",
          attachments: [],
        });
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          error: null,
          isDraftSaved: false,
        });
      }, 3000);
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Failed to send message. Please try again.",
      }));
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Build Something
              <span className="block text-blue-600 dark:text-blue-400">
                Amazing Together
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm a B.Tech final year student specializing in AI/ML development.
              Ready to bring your ideas to life with cutting-edge technology and
              innovative solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Available for opportunities
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <Clock size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Responds within 24h
                </span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  98%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Response Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  24h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Response
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Send Me a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fill out the form below and I'll get back to you soon.
                    </p>
                  </div>

                  {formState.isDraftSaved && (
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <Check size={16} />
                      <span className="text-sm">Draft saved</span>
                    </div>
                  )}
                </div>

                {formState.isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                      <div>
                        <p className="font-semibold text-green-700 dark:text-green-300">
                          Message sent successfully!
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Thank you for reaching out. I’ll get back to you
                          shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formState.error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle
                        size={20}
                        className="text-red-600 dark:text-red-400"
                      />
                      <div>
                        <p className="font-semibold text-red-700 dark:text-red-300">
                          {formState.error}
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Please try again later.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= FORM ================= */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormField label="Full Name" error={errors.fullName} required>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Email" error={errors.email} required>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Phone" error={errors.phone}>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Message" error={errors.message} required>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      rows={4}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Attachments" error={errors.attachments}>
                    <FileUpload
                      files={formData.attachments}
                      onFilesChange={(files) =>
                        handleInputChange("attachments", files)
                      }
                      error={errors.attachments}
                    />
                  </FormField>

                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {formState.isSubmitting ? (
                      <>
                        <Send className="animate-spin mr-2" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info + FAQ + Testimonials */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <ContactMethodCard key={method.id} method={method} />
                ))}
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <FAQAccordion faqs={faqs} />
              </div>

              {/* Testimonials */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Testimonials
                </h3>
                <TestimonialsSlider testimonials={testimonials} />
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-colors"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
