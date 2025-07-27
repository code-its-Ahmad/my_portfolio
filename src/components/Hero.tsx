import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, Code, Cpu, Database } from 'lucide-react';
import CodingScene from './3D/CodingScene';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroText = 'Muhammad Ahmad';
  const roles = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'Blockchain Developer',
    'UI/UX Designer',
    'DevOps Engineer',
  ];

  // Typing animation
  useEffect(() => {
    setIsLoaded(true);
    if (textRef.current) {
      const text = textRef.current;
      text.innerHTML = '';
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < heroText.length) {
          text.innerHTML += heroText.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 120);
      return () => clearInterval(typeInterval);
    }
  }, []);

  // Role switching animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1LEb7Scv_BQzuClhKMqYnNDqrOdwfnJI0/view?usp=sharing';
    link.download = 'Muhammad_Ahmad_CV.pdf';
    link.click();
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const roleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.06, transition: { duration: 0.3 } },
    tap: { scale: 0.94 },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      style={{ opacity, scale }}
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 zoom-out-90">
        <CodingScene theme={theme} />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 z-10 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-90' : 'opacity-70'
        }`}
      ></div>
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 z-10 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-80'
        }`}
      ></div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-16 sm:top-24 left-6 sm:left-12 w-12 sm:w-24 h-12 sm:h-24 bg-blue-600/25 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 sm:bottom-24 right-6 sm:right-12 w-16 sm:w-32 h-16 sm:h-32 bg-purple-600/25 rounded-full blur-2xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute top-1/3 right-12 sm:right-24 w-8 sm:w-16 h-8 sm:h-16 bg-cyan-600/20 rounded-lg rotate-45 blur-lg"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 left-12 sm:left-24 w-6 sm:w-12 h-6 sm:h-12 bg-green-600/20 rounded-full blur-md"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-20 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        <div className="space-y-8 sm:space-y-10">
          {/* Hero Text */}
          <motion.div className="space-y-6">
            <h1
              ref={textRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent min-h-[80px] sm:min-h-[100px] md:min-h-[140px] lg:min-h-[180px] drop-shadow-2xl"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                variants={roleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold h-12 sm:h-16 flex items-center justify-center text-gray-200 dark:text-white"
              >
                {roles[currentRole].split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="inline-block hover:text-blue-400 transition-colors duration-300"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[clamp(0.875rem,2.5vw,1.125rem)] text-gray-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Crafting innovative digital solutions with cutting-edge technology, creative problem-solving, and a passion for transforming ideas into reality.
          </motion.p>

        {/* Skill Icons */}
        <motion.div
            className="flex flex-wrap justify-center gap-[clamp(0.75rem,2vw,1rem)] py-[clamp(1rem,3vh,2rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, staggerChildren: 0.2 }}
          >
            {[
              { icon: Code, label: 'Frontend', color: 'blue' },
              { icon: Database, label: 'Backend', color: 'purple' },
              { icon: Cpu, label: 'AI/ML', color: 'cyan' },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`p-[clamp(0.5rem,2vw,0.75rem)] bg-${skill.color}-500/20 rounded-full border border-${skill.color}-400/30 group-hover:bg-${skill.color}-500/40 transition-all duration-300`}
                  whileHover={{ rotate: 6 }}
                >
                  <skill.icon
                    size="clamp(16px,2vw,18px)"
                    className={`text-${skill.color}-400 group-hover:animate-pulse`}
                    aria-label={`${skill.label} skill icon`}
                  />
                </motion.div>
                <span className={`text-[clamp(0.65rem,1.5vw,0.75rem)] text-gray-300 mt-1 group-hover:text-${skill.color}-300 transition-colors`}>
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <motion.button
              onClick={downloadCV}
              className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center gap-3 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Download CV"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Download size={20} className="sm:w-6 sm:h-6 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Download CV</span>
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
            <motion.button
              onClick={scrollToProjects}
              className="group relative w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-3 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Explore My Work"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10">Explore My Work</span>
              <ChevronDown size={20} className="sm:w-6 sm:h-6 group-hover:animate-bounce relative z-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '50+', label: 'Projects', color: 'blue' },
              { value: '2', label: 'Years Experience', color: 'purple' },
              { value: '100+', label: 'Happy Clients', color: 'cyan' },
              { value: '24/7', label: 'Support', color: 'green' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300 animate-pulse`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-300 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-[clamp(1rem,3vh,2rem)] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1.5rem,3vw,2rem)] border-2 border-gray-400 dark:border-gray-200 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-[0.5rem] bg-gray-400 dark:bg-gray-200 rounded-full mt-1"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <ChevronDown size="clamp(16px,2vw,18px)" className="text-gray-400 dark:text-gray-200 mt-1" />
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
        }
        @media (max-width: 640px) {
          .min-h-screen {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;