import { useEffect, useRef, useState, useMemo } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();

  // Scroll-based animations with enhanced spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '50%']), {
    stiffness: 150,
    damping: 25,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]), {
    stiffness: 140,
    damping: 22,
  });

  // Particle animation for background
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        duration: Math.random() * 8 + 4,
      })),
    []
  );

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const experiences = useMemo(
    () => [
      {
        title: 'Full Stack Developer',
        company: 'Allzone Technologies',
        location: 'Lahore, Pakistan',
        period: '2025 - Present',
        description:
          'Built scalable web and mobile applications using React, Node.js, Laravel, and Firebase. Led development teams and implemented CI/CD pipelines for faster deployment cycles.',
        technologies: ['React', 'Node.js', 'Laravel', 'Firebase', 'Docker'],
        icon: '💻',
        achievements: [
          'Increased app performance by 40% through optimization',
          'Led a team of 5 developers to deliver 3 major projects',
        ],
      },
      {
        title: 'ML/AI Engineer',
        company: 'Allzone Technologies',
        location: 'Lahore, Pakistan',
        period: '2025 - Present',
        description:
          'Developed machine learning models using Python, TensorFlow, and Hugging Face transformers for natural language processing and computer vision applications.',
        technologies: ['Python', 'TensorFlow', 'Hugging Face', 'OpenCV', 'AWS'],
        icon: '🤖',
        achievements: [
          'Deployed NLP model with 95% accuracy',
          'Optimized CV pipeline, reducing latency by 30%',
        ],
      },
      {
        title: 'Mobile Developer',
        company: 'Arfa Karim Technologies',
        location: 'Lahore, Pakistan',
        period: '2021 - 2022',
        description:
          'Created cross-platform mobile applications using Flutter and Kotlin. Integrated with various APIs and implemented real-time features with WebSocket connections.',
        technologies: ['Flutter', 'Kotlin', 'Firebase', 'REST APIs', 'WebSocket'],
        icon: '📱',
        achievements: [
          'Launched 2 apps with 10K+ installs',
          'Improved API response time by 25%',
        ],
      },
    ],
    []
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.3, ease: [0.6, -0.05, 0.01, 0.99], staggerChildren: 0.25 },
    },
  };

  const timelineElementVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.3, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] },
    }),
    hover: {
      scale: 1.06,
      rotateY: 4,
      transition: { duration: 0.35, ease: 'easeInOut' },
    },
  };

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
      style={{ perspective: 1600 }}
    >
      {/* Background Particles */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/25 dark:bg-blue-600/25"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.25, 0.6, 0.25],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
          style={{ y: backgroundY, opacity }}
        />
      </motion.div>

      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto relative z-10 w-full"
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        style={{ scale }}
      >
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            Professional Experience
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 md:w-24 lg:w-28 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.3, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.5 }}
          />
        </div>

        <VerticalTimeline
          lineColor={theme === 'dark' ? '#6B7280' : '#D1D5DB'}
          animate={true}
          layout="1-column"
        >
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                background: theme === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(243, 244, 246, 0.85)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${theme === 'dark' ? 'rgba(96, 165, 250, 0.5)' : 'rgba(96, 165, 250, 0.7)'}`,
                borderRadius: '1.5rem',
                boxShadow:
                  theme === 'dark'
                    ? '0 0 25px rgba(255, 255, 255, 0.3)'
                    : '0 0 25px rgba(0, 0, 0, 0.2)',
                padding: '1rem sm:1.25rem md:1.5rem lg:1.75rem',
              }}
              contentArrowStyle={{
                borderRight: `8px solid ${theme === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(243, 244, 246, 0.85)'}`,
              }}
              date={exp.period}
              dateClassName="vertical-timeline-element-date"
              iconStyle={{
                background: theme === 'dark' ? '#1F2937' : '#F3F4F6',
                color: theme === 'dark' ? '#60A5FA' : '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem sm:1.75rem',
                boxShadow: `0 0 0 4px ${theme === 'dark' ? '#3b82f6' : '#60a5fa'}`,
              }}
              icon={exp.icon}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.04}
                transitionSpeed={800}
                glareEnable={true}
                glareMaxOpacity={0.25}
                glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
                glarePosition="all"
              >
                <motion.div
                  custom={index}
                  variants={timelineElementVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  whileHover="hover"
                  className="p-3 sm:p-4 md:p-5 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleToggleExpand(index)}
                  role="button"
                  aria-expanded={expandedIndex === index}
                  aria-controls={`achievements-${index}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleExpand(index);
                    }
                  }}
                >
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <motion.h3
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {exp.title}
                    </motion.h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Briefcase size={12} className="sm:size-14 md:size-16 text-purple-400" />
                        <p className="text-purple-400 font-semibold text-xs sm:text-sm md:text-base">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 sm:ml-2 md:ml-3">
                        <MapPin size={12} className="sm:size-14 md:size-16 text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-blue-400/50 to-purple-600/50" />

                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 bg-blue-500/30 dark:bg-blue-700/30 text-blue-400 dark:text-blue-200 rounded-full text-xs sm:text-sm border border-blue-400/60 dark:border-blue-600/60 hover:bg-blue-500/50 dark:hover:bg-blue-700/50 transition-colors"
                          animate={
                            hoveredIndex === index ? { scale: 1.15, y: -6 } : { scale: 1, y: 0 }
                          }
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          id={`achievements-${index}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                          className="space-y-2 sm:space-y-3"
                        >
                          <p className="text-sm sm:text-base font-semibold text-blue-400 dark:text-blue-200">
                            Key Achievements:
                          </p>
                          <ul className="list-disc pl-4 sm:pl-5 text-gray-700 dark:text-gray-200 text-xs sm:text-sm md:text-base">
                            {exp.achievements.map((achievement, achIndex) => (
                              <motion.li
                                key={achIndex}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: achIndex * 0.15 }}
                              >
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/25 dark:from-blue-600/25 to-purple-400/25 dark:to-purple-600/25 rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.div>
              </Tilt>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>

      <style jsx global>{`
        .vertical-timeline::before {
          background: linear-gradient(to bottom, #3b82f6, #a855f7);
          width: 4px;
          border-radius: 2px;
        }
        .vertical-timeline-element-date {
          font-size: 0.85rem !important;
          color: ${theme === 'dark' ? '#D1D5DB' : '#4B5563'} !important;
          opacity: 1 !important;
          padding: 0.5rem 0.75rem !important;
          font-weight: 500;
        }
        .vertical-timeline-element-icon {
          box-shadow: 0 0 0 4px ${theme === 'dark' ? '#3b82f6' : '#60a5fa'} !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .vertical-timeline-element-icon:hover {
          transform: scale(1.15);
        }
        /* Mobile Styles */
        @media (max-width: 767px) {
          .vertical-timeline {
            padding: 0 !important;
          }
          .vertical-timeline::before {
            left: 20px !important;
            margin-left: 0 !important;
          }
          .vertical-timeline-element {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .vertical-timeline-element-content {
            margin-left: 40px !important;
            padding: 0.75rem !important;
            border-radius: 1rem !important;
            width: calc(100% - 48px) !important;
          }
          .vertical-timeline-element-date {
            text-align: left !important;
            margin-bottom: 0.75rem !important;
            margin-left: 40px !important;
            font-size: 0.8rem !important;
          }
          .vertical-timeline-element-icon {
            left: 0 !important;
            transform: none !important;
            width: 32px !important;
            height: 32px !important;
            margin-top: 8px !important;
          }
        }
        /* Tablet Styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .vertical-timeline {
            padding: 0 1rem !important;
          }
          .vertical-timeline::before {
            left: 50% !important;
            margin-left: -2px !important;
          }
          .vertical-timeline-element-content {
            padding: 1rem !important;
            border-radius: 1.25rem !important;
            width: calc(50% - 30px) !important;
            margin-left: auto !important;
            margin-right: 10px !important;
          }
          .vertical-timeline-element-date {
            font-size: 0.9rem !important;
            text-align: right !important;
            margin-right: 10px !important;
          }
          .vertical-timeline-element-icon {
            width: 48px !important;
            height: 48px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          .vertical-timeline-element:nth-child(even) .vertical-timeline-element-content {
            margin-left: 10px !important;
            margin-right: auto !important;
          }
          .vertical-timeline-element:nth-child(even) .vertical-timeline-element-date {
            text-align: left !important;
            margin-left: 10px !important;
            margin-right: 0 !important;
          }
        }
        /* Desktop Styles */
        @media (min-width: 1024px) {
          .vertical-timeline {
            padding: 0 2rem !important;
          }
          .vertical-timeline::before {
            left: 50% !important;
            margin-left: -2px !important;
          }
          .vertical-timeline-element {
            display: flex;
            justify-content: center;
          }
          .vertical-timeline-element-content {
            padding: 1.5rem !important;
            border-radius: 1.5rem !important;
            width: calc(50% - 30px) !important;
            margin-left: auto !important;
            margin-right: 10px !important;
          }
          .vertical-timeline-element-date {
            font-size: 1rem !important;
            text-align: right !important;
            margin-right: 10px !important;
          }
          .vertical-timeline-element-icon {
            width: 56px !important;
            height: 56px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          .vertical-timeline-element:nth-child(even) .vertical-timeline-element-content {
            margin-left: 10px !important;
            margin-right: auto !important;
          }
          .vertical-timeline-element:nth-child(even) .vertical-timeline-element-date {
            text-align: left !important;
            margin-left: 10px !important;
            margin-right: 0 !important;
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
          }
        }
        .dark .animate-glow {
          animation: glow-dark 2s ease-in-out infinite;
        }
        @keyframes glow-dark {
          0%, 100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;