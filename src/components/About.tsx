import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ComputersCanvas from './3D/Computers';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { theme } = useTheme(); // Access current theme

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setIsImageLoaded(true), 300);
          controls.start('visible');
        } else {
          setIsVisible(false);
          controls.start('hidden');
        }
      },
      { threshold: 0.15, rootMargin: '100px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, x: 120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
        staggerChildren: 0.25,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 120 },
    },
  };

  const canvasVariants = {
    hidden: { opacity: 0, x: -120, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
      style={{ perspective: 1200 }}
      aria-labelledby="about-heading"
    >
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: backgroundY, opacity }}>
        <motion.div
          className="absolute -top-20 -left-20 w-64 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[28rem] bg-blue-500/15 dark:bg-blue-800/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 sm:w-96 md:w-[32rem] h-80 sm:h-96 md:h-[32rem] bg-purple-500/15 dark:bg-purple-800/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            perspective={1000}
            scale={1.03}
            transitionSpeed={1500}
            glareEnable
            glareMaxOpacity={0.15}
            glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
            glarePosition="all"
            className="relative"
          >
            <motion.div
              ref={canvasRef}
              variants={canvasVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] rounded-3xl overflow-hidden backdrop-blur-lg bg-gray-100/50 dark:bg-gray-900/50 border border-purple-500/30 dark:border-purple-700/30 hover:border-blue-400/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/15 to-purple-400/15 dark:from-blue-600/15 dark:to-purple-600/15 rounded-3xl blur-xl animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: isImageLoaded ? 0.8 : 0 }}
                transition={{ duration: 1 }}
              />
              <AnimatePresence>
                {isImageLoaded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full h-full"
                  >
                    <ComputersCanvas theme={theme} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Tilt>

          <motion.div variants={textVariants} initial="hidden" animate={controls} className="space-y-6 sm:space-y-8">
            <motion.div variants={childVariants} className="space-y-4">
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                About Me
              </h2>
              <motion.div
                className="w-20 sm:w-24 md:w-28 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : {}}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </motion.div>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
              <motion.p variants={childVariants} className="group hover:text-gray-900 dark:hover:text-white transition-all duration-300">
                I'm{' '}
                <span className="text-blue-400 font-semibold group-hover:animate-pulse">
                  Muhammad Ahmad
                </span>
                , a passionate Full Stack Developer and AI/ML expert based in Pakistan. With a deep love for technology and innovation, I craft scalable, cutting-edge solutions that push the boundaries of what's possible.
              </motion.p>

              <motion.p variants={childVariants} className="group hover:text-gray-900 dark:hover:text-white transition-all duration-300">
                My expertise spans across web development, mobile applications, and artificial intelligence. I specialize in creating seamless user experiences while building robust, efficient backend systems that scale with business needs.
              </motion.p>

              <motion.p variants={childVariants} className="group hover:text-gray-900 dark:hover:text-white transition-all duration-300">
                When I'm not coding, I'm exploring the latest advancements in AI/ML, contributing to open-source projects, and sharing knowledge with the developer community.
              </motion.p>

              <motion.div variants={childVariants} className="pt-4">
                <a
                  href="https://www.linkedin.com/in/muhammad-ahmad-565206291/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold group hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
                >
                  Connect with me on LinkedIn
                  <motion.svg
                    className="w-5 h-5 transform group-hover:translate-x-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M10 12l-2-2m0 0l2-2m-2 2h8m-8 0H2a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v1" />
                  </motion.svg>
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={textVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8"
            >
              {[
                { value: '50+', label: 'Projects Completed', color: 'text-blue-400' },
                { value: '2', label: 'Years Experience', color: 'text-purple-400' },
                { value: '15+', label: 'Technologies', color: 'text-blue-400' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  className="text-center group cursor-pointer p-3 sm:p-4 rounded-xl bg-gray-100/50 dark:bg-gray-900/50 border border-purple-500/30 dark:border-purple-700/30 hover:border-blue-400/60 dark:hover:border-blue-600/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30"
                  whileHover={{ scale: 1.15, rotate: 3 }}
                >
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${stat.color} group-hover:animate-pulse`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
      `}</style>
    </section>
  );
};

export default About;