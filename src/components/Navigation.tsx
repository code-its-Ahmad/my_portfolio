import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown, User, Home, Briefcase, Code, Folder, Award, MessageSquare } from 'lucide-react';
import logoimage from '../assets/image .png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const touchStartX = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  // Scroll handling with debouncing
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + 120;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const section = document.getElementById(navItems[i].id);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }, 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [navItems]);

  // Handle screen resize to reset menu state on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false); // Close mobile menu on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll with dynamic offset
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = window.innerWidth < 768 ? 70 : 90;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  // Scroll-based animations
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 200], [1, 0.97]);
  const navScale = useTransform(scrollY, [0, 200], [1, 0.98]);
  const navBlur = useTransform(scrollY, [0, 200], ['blur(0px)', 'blur(3px)']);

  // Animation variants
  const navVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.68, -0.55, 0.265, 1.55],
        type: 'spring',
        stiffness: 150,
        damping: 15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50, rotateY: 45 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55],
        type: 'spring',
        stiffness: 140,
        damping: 12,
      },
    }),
  };

  const bannerVariants = {
    hidden: { scale: 0, opacity: 0, borderRadius: '50%' },
    visible: {
      scale: 1,
      opacity: 1,
      borderRadius: '12px',
      transition: {
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55],
        type: 'spring',
        stiffness: 160,
        damping: 12,
        staggerChildren: 0.1,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      borderRadius: '50%',
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const toggleVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      boxShadow: '0 0 15px rgba(96, 165, 250, 0.4)',
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    tap: {
      scale: 0.9,
      rotate: 360,
      transition: { duration: 0.3, type: 'spring', stiffness: 200, damping: 10 },
    },
  };

  // Simplified touch handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50 && !isOpen) {
      setIsOpen(true);
    }
    touchStartX.current = null;
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <motion.nav
      ref={navRef}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ opacity: navOpacity, scale: navScale, backdropFilter: navBlur, willChange: 'opacity, transform' }}
      className={`fixed top-3 right-3 left-3 z-50 transition-all duration-500 mx-auto max-w-[1440px] ${
        isOpen
          ? 'bg-gray-50/95 dark:bg-gray-950/95'
          : 'bg-gray-50/90 dark:bg-gray-950/90'
      } rounded-2xl border border-blue-500/25 shadow-lg shadow-blue-500/15 overflow-visible`}
    >
      <div className="flex items-center justify-between p-2 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.img
            src={logoimage}
            alt="Muhammad Ahmad Profile"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-blue-500/50 object-cover"
            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 140 }}
            whileHover={{
              borderColor: 'rgba(59, 130, 246, 0.8)',
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)',
              rotate: 360,
              transition: { duration: 0.5 },
            }}
          />
          <motion.div
            className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight"
            animate={{ x: [0, 3, 0], opacity: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Muhammad Ahmad
          </motion.div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-100/15 dark:bg-gray-900/15 rounded-full p-1.5">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.15,
                      y: -4,
                      backgroundColor: 'rgba(96, 165, 250, 0.25)',
                      boxShadow: '0 4px 12px rgba(96, 165, 250, 0.35)',
                      rotateY: index % 2 === 0 ? 10 : -10,
                    }}
                    whileTap={{ scale: 0.85, rotateY: 0 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-400 ${
                      activeSection === item.id
                        ? 'text-blue-400 bg-blue-400/25 border border-blue-400/35'
                        : 'text-gray-900 dark:text-white hover:text-blue-400'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <item.icon
                      size={16}
                      className="group-hover:animate-pulse"
                      style={{ willChange: 'transform' }}
                    />
                    <span className="hidden xl:inline">{item.label}</span>
                    <motion.span
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={activeSection === item.id ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
                    />
                  </motion.button>
                ))}
                <ThemeToggle />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          variants={toggleVariants}
          whileHover="hover"
          whileTap="tap"
          className="lg:hidden p-2 rounded-full bg-gradient-to-r from-blue-500/25 to-purple-500/25 text-gray-900 dark:text-white relative overflow-hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="relative w-6 h-6"
          >
            <Menu
              size={22}
              className={`absolute transition-all duration-500 ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              } text-blue-400`}
            />
            <X
              size={22}
              className={`absolute transition-all duration-500 ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale0'
              } text-purple-400`}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile/Tablet Navigation - Card Swiper */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={bannerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-gray-50/95 dark:bg-gray-950/95 rounded-2xl border border-blue-500/25 shadow-xl shadow-blue-500/20 w-[95vw] max-w-[360px] z-50 overflow-hidden"
              style={{ transformOrigin: 'top center', perspective: 1000, willChange: 'transform, opacity' }}
            >
              <div className="flex flex-col items-start py-4 px-5 space-y-2.5">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.05,
                      x: 10,
                      rotateY: index % 2 === 0 ? 15 : -15,
                      backgroundColor: 'rgba(96, 165, 250, 0.2)',
                      boxShadow: '0 5px 15px rgba(96, 165, 250, 0.3)',
                      zIndex: 10,
                    }}
                    whileTap={{ scale: 0.95, rotateY: 0, zIndex: 10 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full text-left py-3 px-4 text-sm font-medium rounded-lg transition-all duration-400 relative ${
                      activeSection === item.id
                        ? 'text-blue-400 bg-blue-400/20 border border-blue-400/35'
                        : 'text-gray-900 dark:text-white hover:text-blue-400'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: activeSection === item.id ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
                      willChange: 'transform, background-color',
                    }}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500"
                      initial={{ scaleY: 0 }}
                      animate={activeSection === item.id ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
                    />
                    <item.icon size={20} className="group-hover:animate-pulse" />
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: [0.68, -0.55, 0.265, 1.55] }}
                      />
                    )}
                  </motion.button>
                ))}
                <ThemeToggle />
              </div>
              <motion.div
                className="absolute bottom-3 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 6, 0], opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: [0.68, -0.55, 0.265, 1.55] }}
              >
                <ChevronDown size={16} className="text-blue-400 animate-pulse" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        nav {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .group:hover .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        @media (max-width: 1280px) {
          nav {
            top: 0.75rem;
            right: 0.75rem;
            left: 0.75rem;
          }
          .rounded-2xl {
            border-radius: 1rem;
          }
        }
        @media (max-width: 768px) {
          nav {
            top: 0.5rem;
            right: 0.5rem;
            left: 0.5rem;
          }
          .rounded-2xl {
            border-radius: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          nav {
            top: 0.5rem;
            right: 0.5rem;
            left: 0.5rem;
          }
          .rounded-2xl {
            border-radius: 0.625rem;
          }
        }
        @media (max-width: 360px) {
          nav {
            top: 0.5rem;
            right: 0.5rem;
            left: 0.5rem;
          }
          .rounded-2xl {
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navigation;