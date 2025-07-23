import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code, Brain, Database, Smartphone, Globe, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoimage from '../assets/image .png';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); // Access current theme

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Code size={48} />,
      title: 'Full Stack Development',
      description:
        'End-to-end web applications with React, Node.js, and Laravel. Scalable, secure, and optimized for performance across all platforms.',
    },
    {
      icon: <Brain size={48} />,
      title: 'AI/ML Solutions',
      description:
        'Advanced AI models and automation solutions using Python, TensorFlow, and Hugging Face for intelligent, data-driven applications.',
    },
    {
      icon: <Smartphone size={48} />,
      title: 'Mobile Development',
      description:
        'High-performance cross-platform mobile apps using Flutter and Kotlin, delivering seamless user experiences.',
    },
    {
      icon: <Database size={48} />,
      title: 'Database & Backend',
      description:
        'Robust backend systems with Firebase, MongoDB, and MySQL. Scalable APIs and cloud infrastructure for real-time data.',
    },
    {
      icon: <Globe size={48} />,
      title: 'Web Solutions',
      description:
        'Responsive, SEO-optimized websites with modern frameworks, ensuring cross-browser compatibility and fast load times.',
    },
    {
      icon: <Zap size={48} />,
      title: 'Performance Optimization',
      description:
        'In-depth performance analysis, database tuning, and code optimization for lightning-fast applications.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 100, rotateX: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        delay: i * 0.15,
      },
    }),
    hover: {
      scale: 1.1,
      rotateY: 15,
      boxShadow: theme === 'dark' ? '0 25px 50px rgba(96, 165, 250, 0.4)' : '0 25px 50px rgba(96, 165, 250, 0.2)',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black"
      aria-labelledby="services-heading"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY, opacity }}
      >
        <motion.div
          className="absolute -top-16 -left-16 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-blue-500/15 dark:bg-blue-800/15 rounded-full blur-xl"
          animate={{ rotate: rotate, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Code
            className="text-blue-400 dark:text-blue-300 opacity-50"
            size={40}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-16 -right-16 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-purple-500/15 dark:bg-purple-800/15 rounded-full blur-xl"
          animate={{ rotate: -rotate, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
        >
          <Brain
            className="text-purple-400 dark:text-purple-300 opacity-50"
            size={50}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-green-500/15 dark:bg-green-800/15 rounded-full blur-xl"
          animate={{ rotate: rotate, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 2 }}
        >
          <Globe
            className="text-green-400 dark:text-green-300 opacity-50"
            size={40}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.img
            src={logoimage}
            alt="Portfolio Avatar"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-400 dark:border-blue-600 mb-4 object-cover"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-6"
          >
            My Services
          </h2>
          <motion.div
            className="w-32 sm:w-40 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Explore the diverse tech expertise I bring to your projects, crafted with passion and precision.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
        >
          {services.map((service, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={2000}
              glareEnable
              glareMaxOpacity={0.2}
              glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
              glarePosition="all"
            >
              <motion.div
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-gray-100/50 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-blue-400/20 dark:border-blue-600/20 hover:border-purple-400/50 dark:hover:border-purple-600/50 transition-all duration-500 shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-600/20 overflow-hidden h-full"
              >
                <div className="text-center space-y-6 relative z-10">
                  <motion.div
                    className="text-blue-500 dark:text-blue-300 hover:text-purple-400 dark:hover:text-purple-300 transition-colors mx-auto w-fit"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1, rotate: [0, 360, 0] } : { opacity: 0 }}
                    transition={{ duration: 1.2, delay: index * 0.1, repeat: 0 }}
                  >
                    {service.icon}
                  </motion.div>

                  <motion.h3
                    className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: 'auto' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                  >
                    {service.title}
                  </motion.h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-3">
                    {service.description}
                  </p>

                  <motion.div
                    className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"
                    initial={{ scaleX: 0 }}
                    animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 dark:from-blue-600/10 to-purple-500/10 dark:to-purple-600/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 0.5 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full"
                    animate={{
                      x: [0, 80, 0],
                      y: [0, 40, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    style={{ left: '25%', top: '35%' }}
                  />
                  <motion.div
                    className="absolute w-3 h-3 bg-purple-400 dark:bg-purple-300 rounded-full"
                    animate={{
                      x: [0, -60, 0],
                      y: [0, 70, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    style={{ right: '25%', top: '60%' }}
                  />
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="#projects"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:text-gray-100 px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Explore my projects"
          >
            Explore My Projects
          </motion.a>
        </motion.div>
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
      `}</style>
    </section>
  );
};

export default Services;
