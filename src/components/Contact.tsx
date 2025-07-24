import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import EarthCanvas from './3D/Earth';
import { useTheme } from '../context/ThemeContext';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const notificationVariants: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3 } },
};

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('contact_form_data');
    return savedData
      ? JSON.parse(savedData)
      : { name: '', email: '', message: '' };
  });

  const socialLinks = [
    {
      icon: <FaWhatsapp className="text-green-500 dark:text-green-300 text-2xl" />,
      url: 'https://wa.me/923314815161?text=Hi%20MuhammadAhmad,%20I%20have%20a%20project%20or%20hiring%20opportunity%20to%20discuss!',
      label: 'WhatsApp',
      value: '@muhammad_ahmad',
    },
    {
      icon: <FaEnvelope className="text-blue-500 dark:text-blue-300 text-2xl" />,
      url: 'mailto:Ahmadrajpootr1@gmail.com',
      label: 'Email',
      value: 'Ahmadrajpootr1@gmail.com',
    },
    {
      icon: <FaLinkedin className="text-blue-500 dark:text-blue-300 text-xl" />,
      url: 'https://www.linkedin.com/in/muhammad-ahmad-565206291/',
      label: 'LinkedIn',
      value: '@muhammad_ahmad',
    },
  ];

  useEffect(() => {
    localStorage.setItem('contact_form_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!isValidEmail(formData.email)) return 'Please enter a valid email address';
    if (!formData.message.trim()) return 'Message is required';
    if (formData.message.length > 1000) return 'Message cannot exceed 1000 characters';
    if (lastSubmissionTime && Date.now() - lastSubmissionTime < 30000) {
      const remaining = Math.ceil((30000 - (Date.now() - lastSubmissionTime)) / 1000);
      return `Please wait ${remaining} seconds before submitting again`;
    }
    return null;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const validationError = validateForm();
  if (validationError) {
    toast.error(validationError);
    return;
  }

  setIsSubmitting(true);
  setLastSubmissionTime(Date.now());

  const loadingToast = toast.loading('Sending your message...');

  try {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    const response = await fetch('https://portfolio-backend-aeu8.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText || 'Failed to send message' };
      }
      if (response.status === 0 || errorData.detail.includes('CORS')) {
        throw new Error(
          'Unable to connect to the server due to a CORS issue. Please try contacting via WhatsApp or Email.'
        );
      }
      throw new Error(errorData.detail || 'Failed to send message');
    }

    const data = await response.json();
    toast.success(data.message || 'Thank you for your message! Muhammad Ahmad will get back to you soon.', {
      duration: 5000,
    });

    setFormData({ name: '', email: '', message: '' });
    localStorage.removeItem('contact_form_data');
  } catch (error: any) {
    toast.error(
      error.message || 'Failed to send message. Please try again or contact via WhatsApp/Email.',
      {
        duration: 6000,
      }
    );
  } finally {
    setIsSubmitting(false);
    toast.dismiss(loadingToast);
  }
};

  

  

  const handleSocialClick = (url: string, label: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${label} to connect with Muhammad Ahmad`, {
      duration: 3000,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-950 overflow-hidden"
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            color: theme === 'dark' ? '#fff' : '#1f2937',
            border: theme === 'dark' ? '1px solid rgba(96, 165, 250, 0.5)' : '1px solid rgba(96, 165, 250, 0.3)',
            backdropFilter: 'blur(6px)',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: theme === 'dark' ? '0 0 15px rgba(255, 255, 255, 0.2)' : '0 0 15px rgba(0, 0, 0, 0.2)',
            maxWidth: '90vw',
            width: 'auto',
            fontSize: '0.9rem',
          },
          success: {
            style: {
              background: theme === 'dark' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(220, 252, 231, 0.95)',
              color: theme === 'dark' ? '#fff' : '#166534',
              border: theme === 'dark' ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(34, 197, 94, 0.3)',
            },
            iconTheme: { primary: theme === 'dark' ? '#fff' : '#166534', secondary: '#22c55e' },
          },
          error: {
            style: {
              background: theme === 'dark' ? 'rgba(220, 38, 38, 0.95)' : 'rgba(254, 226, 226, 0.95)',
              color: theme === 'dark' ? '#fff' : '#7f1d1d',
              border: theme === 'dark' ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(239, 68, 68, 0.3)',
            },
            iconTheme: { primary: theme === 'dark' ? '#fff' : '#7f1d1d', secondary: '#dc2626' },
          },
          loading: {
            style: {
              background: theme === 'dark' ? 'rgba(59, 130, 246, 0.95)' : 'rgba(219, 234, 254, 0.95)',
              color: theme === 'dark' ? '#fff' : '#1e40af',
              border: theme === 'dark' ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(59, 130, 246, 0.3)',
            },
            iconTheme: { primary: theme === 'dark' ? '#fff' : '#1e40af', secondary: '#3b82f6' },
          },
        }}
      >
        {(t) => (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                variants={notificationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ToastBar toast={t} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Toaster>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y, opacity }}>
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={1.5} />
        </Canvas>
      </motion.div>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/30 dark:from-blue-400/30 to-purple-500/30 dark:to-purple-400/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0,
          }}
          animate={
            isVisible
              ? {
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: [0, 0.6, 0],
                  scale: [0, Math.random() * 1.5 + 0.5, 0],
                }
              : {}
          }
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 4,
          }}
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
          }}
        />
      ))}

      <div ref={containerRef} className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <Tilt
              tiltEnable={window.innerWidth > 768}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.03}
              transitionSpeed={1000}
              glareEnable
              glareMaxOpacity={0.25}
              glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
              glarePosition="all"
              glareBorderRadius="16px"
            >
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gray-100/90 dark:bg-gray-900/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-300/30 dark:border-gray-800/30 animate-glow"
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-200/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-400 focus:ring-blue-400/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-400/20 placeholder:text-gray-400"
                    placeholder="Enter your name"
                    required
                    aria-required="true"
                    autoComplete="name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-200/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-400 focus:ring-blue-400/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-400/20 placeholder:text-gray-400"
                    placeholder="your.email@example.com"
                    required
                    aria-required="true"
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Your Message
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      ({formData.message.length}/1000)
                    </span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-200/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-blue-400 focus:ring-blue-400/30 min-h-[160px] transition-all duration-300 hover:shadow-md hover:shadow-blue-400/20 placeholder:text-gray-400"
                    placeholder="Tell me about your project or inquiry..."
                    required
                    aria-required="true"
                    maxLength={1000}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white dark:text-gray-100 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-100"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700/30 dark:from-blue-800/30 to-purple-700/30 dark:to-purple-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>

                  <Button
                    onClick={() => handleSocialClick(socialLinks[0].url, socialLinks[0].label)}
                    className="flex-1 group relative overflow-hidden bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 text-white dark:text-gray-100 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 dark:hover:shadow-green-400/30"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Message on WhatsApp
                      <FaWhatsapp className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-green-700/30 dark:bg-green-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </motion.div>
              </motion.form>
            </Tilt>

            <motion.div
              className="mt-8 pt-8 border-t border-gray-300/50 dark:border-gray-800/50"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
            >
              <motion.h3
                className="text-xl font-semibold text-blue-500 dark:text-blue-300 mb-6 flex items-center"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-green-500 to-green-500 dark:from-green-400 dark:to-green-400 w-4 h-4 rounded-full mr-2"></span>
                Connect with Me
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(link.url, link.label);
                    }}
                    className="flex items-center gap-3 p-4 bg-gray-200/80 dark:bg-gray-900/80 rounded-lg hover:bg-gray-300/90 dark:hover:bg-gray-800/90 transition-colors duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    aria-label={`Connect via ${link.label}`}
                  >
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 dark:from-blue-400/20 to-purple-500/20 dark:to-purple-400/20 rounded-full">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{link.label}</p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">{link.value}</p>
                    </div>
                  </motion.a>
                ))}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 bg-gray-200/80 dark:bg-gray-900/80 rounded-lg hover:bg-gray-300/90 dark:hover:bg-gray-800/90 transition-colors duration-300"
                >
                  <div className="p-2 bg-purple-500/20 dark:bg-purple-400/20 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-500 dark:text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-700 dark:text-gray-200 font-medium">Lahore, Pakistan</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="flex justify-center h-full"
          >
            <Tilt
              tiltEnable={window.innerWidth > 768}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.05}
              transitionSpeed={1500}
              glareEnable
              glareMaxOpacity={0.3}
              glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
              glarePosition="all"
              glareBorderRadius="16px"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-300/30 dark:border-gray-800/30 shadow-2xl animate-glow">
                <EarthCanvas isVisible={isVisible} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100/40 dark:to-black/40 pointer-events-none"></div>
                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-medium bg-gray-200/50 dark:bg-gray-900/50 px-4 py-2 rounded-lg">
                    Based in Pakistan, connecting globally
                  </p>
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
          }
        }
        .dark .animate-glow {
          animation: glow-dark 3s ease-in-out infinite;
        }
        @keyframes glow-dark {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
        }
        /* Responsive adjustments for toasts */
        @media (max-width: 640px) {
          .react-hot-toast {
            padding: 8px !important;
            font-size: 0.85rem !important;
            max-width: 95vw !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .react-hot-toast {
            padding: 10px !important;
            font-size: 0.9rem !important;
            max-width: 80vw !important;
          }
        }
        @media (min-width: 1024px) {
          .react-hot-toast {
            padding: 12px !important;
            font-size: 0.95rem !important;
            max-width: 500px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
