// import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import Tilt from 'react-parallax-tilt';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectCoverflow, Parallax } from 'swiper/modules';
// import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';
// import ChatBot from './ChatBot';
// import { ErrorBoundary } from 'react-error-boundary';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/parallax';
// import project1 from '../assets/project1.png';
// import project2 from '../assets/project2.png';
// import project3 from '../assets/project3.png';
// import project4 from '../assets/project4.png';
// import project5 from '../assets/project5.png';
// import project7 from '../assets/project7.png';
// import { debounce } from 'lodash';

// // Interfaces
// interface Project {
//   id: number;
//   title: string;
//   shortDescription: string;
//   fullDescription: string;
//   image: string;
//   galleryImages: string[];
//   technologies: string[];
//   challenges: string;
//   solutions: string;
//   outcomes: string;
//   liveUrl: string;
//   githubUrl: string;
//   featured: boolean;
//   category: string;
// }

// // Placeholder images
// const placeholderGalleryImages = [
//   'https://images.unsplash.com/photo-1516321310762-479d72a370a7?w=600&h=400&fit=crop',
//   'https://images.unsplash.com/photo-1536147116438-62679a5e7161?w=600&h=400&fit=crop',
//   'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop',
// ];

// // Project data
// const PROJECTS_DATA = [
//     {
//       id: 1,
//       title: "GreenGuardian AI",
//       shortDescription: "AI-powered platform for smart plant care, featuring disease detection, health monitoring, progress tracking, and personalized care recommendations.",
//       fullDescription: "GreenGuardian AI is a revolutionary platform that leverages machine learning to provide intelligent plant care solutions. It uses TensorFlow models to analyze plant images for disease detection, monitors growth metrics, and offers personalized care recommendations through a Flutter-based mobile app. The backend, powered by MongoDB, ensures scalable data management, while a user-friendly dashboard and daily task diary enhance user engagement.",
//       image: project1,
//       galleryImages: [project1, ...placeholderGalleryImages],
//       technologies: ["Flutter", "MongoDB", "TensorFlow", "Machine Learning"],
//       challenges: "Training accurate ML models for diverse plant species and optimizing real-time image processing on mobile devices.",
//       solutions: "Utilized transfer learning with TensorFlow and implemented efficient image compression techniques.",
//       outcomes: "Achieved 95% accuracy in disease detection and increased user retention by 40% through personalized care plans.",
//       liveUrl: "#",
//       githubUrl: "#",
//       featured: true,
//       category: "AI & Mobile"
//     },
//     {
//       id: 2,
//       title: 'Flutter Mobile Banking App',
//       shortDescription: 'Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial analytics.',
//       fullDescription: "This mobile banking app, built with Flutter, offers a secure and seamless user experience with biometric authentication, real-time transaction processing via Stripe API, and advanced financial analytics powered by Python-based ML models. Firebase ensures robust backend services, enabling push notifications and secure data storage.",
//       image: project2,
//       galleryImages: [project2, ...placeholderGalleryImages],
//       technologies: ['Flutter', 'Firebase', 'Stripe API', 'Python', 'Machine Learning Models'],
//       challenges: "Ensuring secure transactions and integrating biometric authentication across diverse devices.",
//       solutions: "Implemented end-to-end encryption and device-specific biometric APIs for compatibility.",
//       outcomes: "Processed over 10,000 transactions with 99.9% uptime and enhanced user trust through secure authentication.",
//       liveUrl: '#',
//       githubUrl: '#',
//       featured: true,
//       category: 'Mobile',
//     },
//     {
//       id: 3,
//       title: 'Nexlify DataVision Learning Analytics',
//       shortDescription: 'Advanced data visualization platform with predictive analytics, real-time data processing, and interactive reporting tools.',
//       fullDescription: "This analytics dashboard, built with Django and D3.js, provides real-time data visualization and predictive analytics using TensorFlow models. PostgreSQL ensures efficient data storage, while the platform supports interactive reporting for business insights, optimized for both web and mobile access.",
//       image: project3,
//       galleryImages: [project3, ...placeholderGalleryImages],
//       technologies: ['Python', 'Django', 'TensorFlow', 'D3.js', 'PostgreSQL'],
//       challenges: "Handling large datasets in real-time and ensuring cross-platform compatibility.",
//       solutions: "Optimized database queries with PostgreSQL and used D3.js for responsive visualizations.",
//       outcomes: "Reduced data processing time by 60% and improved user engagement with interactive reports.",
//       liveUrl: '#',
//       githubUrl: '#',
//       featured: true,
//       category: 'AI/ML',
//     },
//     {
//       id: 4,
//       title: 'Real-Time Chat Application',
//       shortDescription: 'Scalable messaging platform with end-to-end encryption, file sharing, video calls, and comprehensive admin controls.',
//       fullDescription: "This real-time chat application, built with React and Node.js, uses Socket.io for instant messaging and WebRTC for video calls. MongoDB handles scalable data storage, while end-to-end encryption ensures user privacy. The platform includes admin controls for user management and moderation.",
//       image: project4,
//       galleryImages: [project4, ...placeholderGalleryImages],
//       technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
//       challenges: "Maintaining low-latency communication and ensuring secure file sharing.",
//       solutions: "Optimized Socket.io for real-time performance and implemented secure file transfer protocols.",
//       outcomes: "Supported 5,000 concurrent users with minimal latency and zero security breaches.",
//       liveUrl: '#',
//       githubUrl: '#',
//       featured: false,
//       category: 'Web App',
//     },
//     {
//       id: 5,
//       title: 'AI Skill Survey Analysis',
//       shortDescription: 'An AI-powered platform that guides users through a skill survey, analyzes responses, suggests personalized skills to learn, and generates a 90-day skill improvement plan.',
//       fullDescription: "This AI-powered platform, built with Flutter and React, guides users through a skill survey, uses Python and AWS for response analysis, and suggests personalized skills to learn. MQTT enables real-time community chat, while MongoDB stores user data. The platform generates a 90-day skill improvement plan with daily tasks and inspirational quotes.",
//       image: project5,
//       galleryImages: [project5, ...placeholderGalleryImages],
//       technologies: ['Flutter', 'MongoDB', 'Python', 'AWS', 'Machine Learning', 'React', 'MQTT'],
//       challenges: "Processing complex survey data and integrating real-time chat with low latency.",
//       solutions: "Used AWS Lambda for scalable data processing and MQTT for efficient chat functionality.",
//       outcomes: "Generated personalized plans for 2,000+ users with 85% user satisfaction rate.",
//       liveUrl: '#',
//       githubUrl: '#',
//       featured: true,
//       category: 'AI & Mobile'
//     },
//     {
//       id: 6,
//       title: 'Blockchain Voting System',
//       shortDescription: 'Secure and transparent voting platform using blockchain technology with voter verification and real-time results.',
//       fullDescription: "This blockchain-based voting system, built with Solidity and React, uses Ethereum for secure vote recording and Web3.js for blockchain interaction. IPFS stores voter data securely, ensuring transparency and immutability, with real-time result updates for stakeholders.",
//       image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop&crop=center',
//       galleryImages: ['https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop', ...placeholderGalleryImages],
//       technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
//       challenges: "Ensuring voter privacy and preventing double-voting on the blockchain.",
//       solutions: "Implemented zero-knowledge proofs and smart contract-based voter verification.",
//       outcomes: "Processed 1,000+ votes with 100% accuracy and transparency.",
//       liveUrl: '#',
//       githubUrl: '#',
//       featured: false,
//       category: 'Blockchain',
//     },
//     {
//       id: 7,
//       title: 'CinemaMind AI',
//       shortDescription: 'An innovative AI-driven platform that leverages machine learning to create personalized movie experiences with advanced video generation and user preference modeling.',
//       fullDescription: "CinemaMind AI uses machine learning to generate personalized movie experiences, built with Flutter for the frontend and Python for ML model processing. MongoDB handles data storage, while the platform supports real-time content analysis and user preference modeling, delivering a unique cinematic experience.",
//       image: project7,
//       galleryImages: [project7, ...placeholderGalleryImages],
//       technologies: ['Flutter', 'MongoDB', 'Python', 'Machine Learning Models'],
//       challenges: "Generating high-quality video content and optimizing for mobile performance.",
//       solutions: "Used optimized ML models and cloud-based rendering for efficient video generation.",
//       outcomes: "Created personalized content for 3,000+ users with 90% positive feedback.",
//       liveUrl: '#',
//       githubUrl: '#',
//       featured: false,
//       category: 'AI & Mobile'
//     },
//   ];

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2, delayChildren: 0.4 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 80, rotateX: -20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     rotateX: 0,
//     transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.2 },
//   }),
//   hover: {
//     scale: 1.05,
//     rotateY: 5,
//     boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
//     transition: { duration: 0.3 },
//   },
// };

// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.7, y: 150 },
//   visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
//   exit: { opacity: 0, scale: 0.7, y: 150, transition: { duration: 0.4 } },
// };

// const buttonVariants = {
//   hover: { scale: 1.06, transition: { duration: 0.2 } },
//   tap: { scale: 0.94 },
// };

// const titleVariants = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
// };

// const dividerVariants = {
//   hidden: { scaleX: 0 },
//   visible: { scaleX: 1, transition: { duration: 1, ease: 'easeOut', delay: 0.3 } },
// };

// const descriptionVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 } },
// };

// // Utility for image color analysis
// const getDominantColor = async (imageSrc: string): Promise<string> => {
//   try {
//     const img = new Image();
//     img.crossOrigin = 'Anonymous';
//     img.src = imageSrc;
//     await new Promise((resolve) => (img.onload = resolve));
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return '#ffffff';
//     ctx.drawImage(img, 0, 0);
//     const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
//     let r = 0, g = 0, b = 0, count = 0;
//     for (let i = 0; i < imageData.length; i += 4) {
//       r += imageData[i];
//       g += imageData[i + 1];
//       b += imageData[i + 2];
//       count++;
//     }
//     return `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;
//   } catch (error) {
//     console.error('Error analyzing image color:', error);
//     return '#ffffff';
//   }
// };

// // Main Projects Component
// const Projects = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredProject, setHoveredProject] = useState<number | null>(null);
//   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLowPerformance, setIsLowPerformance] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [filterCategory, setFilterCategory] = useState<string>('All');
//   const [dominantColors, setDominantColors] = useState<Record<number, string>>({});
//   const sectionRef = useRef<HTMLElement>(null);
//   const swiperRef = useRef<any>(null);
//   const gallerySwiperRef = useRef<any>(null);
//   const { theme } = useTheme();

//   // Detect mobile and low-performance devices
//   useEffect(() => {
//     const checkDevice = debounce(() => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsLowPerformance(width <= 720 || navigator.hardwareConcurrency < 4);
//     }, 100);
//     checkDevice();
//     window.addEventListener('resize', checkDevice, { passive: true });
//     return () => {
//       checkDevice.cancel();
//       window.removeEventListener('resize', checkDevice);
//     };
//   }, []);

//   // Analyze dominant colors for project images
//   useEffect(() => {
//     const analyzeImages = async () => {
//       const colors: Record<number, string> = {};
//       for (const project of PROJECTS_DATA) {
//         colors[project.id] = await getDominantColor(project.image);
//       }
//       setDominantColors(colors);
//     };
//     analyzeImages();
//   }, []);

//   // Initialize Swiper and observe visibility
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//         if (entry.isIntersecting && swiperRef.current) {
//           swiperRef.current.update();
//         }
//       },
//       { threshold: 0.3, rootMargin: '150px' }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Update gallery Swiper
//   useEffect(() => {
//     if (selectedProject && gallerySwiperRef.current) {
//       gallerySwiperRef.current.update();
//     }
//   }, [selectedProject]);

//   // Persist last viewed project
//   useEffect(() => {
//     if (selectedProject) {
//       localStorage.setItem('lastViewedProject', selectedProject.id.toString());
//     }
//   }, [selectedProject]);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start end', 'end start'],
//   });

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
//   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

//   const handleSlideChange = useCallback((swiper: any) => {
//     setActiveSlideIndex(swiper.realIndex);
//   }, []);

//   // Filter projects
//   const filteredProjects = useMemo(() => {
//     return filterCategory === 'All'
//       ? PROJECTS_DATA
//       : PROJECTS_DATA.filter((project) => project.category === filterCategory);
//   }, [filterCategory]);

//   // Categories for filter
//   const categories = useMemo(() => [
//     'All',
//     ...Array.from(new Set(PROJECTS_DATA.map((project) => project.category))),
//   ], []);

//   // Swiper configuration
//   const swiperConfig = useMemo(
//     () => ({
//       modules: [Navigation, Pagination, Autoplay, EffectCoverflow, Parallax],
//       effect: 'coverflow' as const,
//       coverflowEffect: {
//         rotate: isMobile ? 5 : 8,
//         stretch: isMobile ? 6 : 12,
//         depth: isMobile ? 40 : 80,
//         modifier: isMobile ? 1.8 : 2.2,
//         slideShadows: false,
//       },
//       parallax: true,
//       loop: filteredProjects.length > 1,
//       autoplay: isLowPerformance
//         ? false
//         : { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
//       navigation: {
//         prevEl: '.swiper-button-prev',
//         nextEl: '.swiper-button-next',
//       },
//       pagination: {
//         clickable: true,
//         dynamicBullets: true,
//         renderBullet: (index: number, className: string) => {
//           return `<span class="${className} bg-blue-400/80 dark:bg-blue-600/80 w-2.5 h-2.5"></span>`;
//         },
//       },
//       spaceBetween: isMobile ? 8 : 14,
//       slidesPerView: 1,
//       centeredSlides: true,
//       breakpoints: {
//         360: { slidesPerView: 1.2, spaceBetween: 8 }, // For low-res devices like Infinix Hot 10
//         640: { slidesPerView: 1.6, spaceBetween: 10 },
//         768: { slidesPerView: 2.2, spaceBetween: 14 },
//         1024: { slidesPerView: 2.8, spaceBetween: 18 },
//         1280: { slidesPerView: 3.2, spaceBetween: 22 },
//       },
//       onSlideChange: handleSlideChange,
//       onSwiper: (swiper: any) => (swiperRef.current = swiper),
//     }),
//     [isMobile, isLowPerformance, handleSlideChange, filteredProjects]
//   );

//   const gallerySwiperConfig = useMemo(
//     () => ({
//       modules: [Navigation, Pagination],
//       navigation: {
//         prevEl: '.gallery-swiper-button-prev',
//         nextEl: '.gallery-swiper-button-next',
//       },
//       pagination: {
//         clickable: true,
//         renderBullet: (index: number, className: string) => {
//           return `<span class="${className} bg-blue-400/80 dark:bg-blue-600/80 w-2 h-2"></span>`;
//         },
//       },
//       spaceBetween: 10,
//       slidesPerView: 1,
//       loop: true,
//       effect: 'fade' as const,
//       fadeEffect: { crossFade: true },
//       observer: true,
//       observeParents: true,
//       onSwiper: (swiper: any) => (gallerySwiperRef.current = swiper),
//     }),
//     []
//   );

//   // Error fallback component
//   const ErrorFallback = ({ error }: { error: Error }) => (
//     <div className="p-4 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg">
//       Error: {error.message}. Please try refreshing the page.
//     </div>
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="relative min-h-screen py-16 px-4 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/60"
//       id="projects"
//     >
//       <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY, opacity }}>
//         <motion.div
//           className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-blue-500/15 dark:bg-blue-800/15 rounded-full blur-4xl"
//           animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
//           transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
//         />
//         <motion.div
//           className="absolute -bottom-32 -right-32 w-[300px] h-[300px] bg-purple-500/15 dark:bg-purple-800/15 rounded-full blur-4xl"
//           animate={{ scale: [1, 1.35, 1], opacity: [0.1, 0.25, 0.1] }}
//           transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
//         />
//       </motion.div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <motion.div
//           className="text-center mb-12 sm:mb-16 md:mb-20"
//           initial="hidden"
//           animate={isVisible ? 'visible' : 'hidden'}
//           variants={containerVariants}
//         >
//           <motion.h2
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight"
//             variants={titleVariants}
//           >
//             Featured Projects
//           </motion.h2>
//           <motion.div
//             className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-6"
//             variants={dividerVariants}
//           />
//           <motion.p
//             className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-100 max-w-3xl mx-auto mt-6 leading-relaxed"
//             variants={descriptionVariants}
//           >
//             Discover groundbreaking solutions crafted with cutting-edge technologies in AI, mobile, web, and blockchain.
//           </motion.p>
//         </motion.div>

//         {/* Filter Controls */}
//         <motion.div
//           className="flex flex-wrap gap-2 justify-center mb-8"
//           initial="hidden"
//           animate={isVisible ? 'visible' : 'hidden'}
//           variants={containerVariants}
//         >
//           {categories.map((category) => (
//             <motion.button
//               key={category}
//               onClick={() => setFilterCategory(category)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 filterCategory === category
//                   ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100'
//                   : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-400/50 dark:hover:bg-blue-600/50'
//               }`}
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               aria-label={`Filter projects by ${category}`}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Swiper Carousel */}
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <motion.div
//             initial="hidden"
//             animate={isVisible ? 'visible' : 'hidden'}
//             variants={containerVariants}
//           >
//             <Swiper {...swiperConfig} className="projects-swiper">
//               {filteredProjects.length === 0 ? (
//                 <div className="text-center py-12 text-gray-600 dark:text-gray-300">
//                   No projects found for this category.
//                 </div>
//               ) : (
//                 filteredProjects.map((project, index) => (
//                   <SwiperSlide key={project.id} className="flex items-center justify-center">
//                     <Tilt
//                       tiltEnable={!isLowPerformance}
//                       tiltMaxAngleX={isMobile ? 2 : 4}
//                       tiltMaxAngleY={isMobile ? 2 : 4}
//                       perspective={1500}
//                       scale={1.03}
//                       transitionSpeed={500}
//                       glareEnable={!isMobile && !isLowPerformance}
//                       glareMaxOpacity={0.25}
//                       glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
//                       glarePosition="all"
//                       glareBorderRadius="16px"
//                     >
//                       <motion.div
//                         custom={index}
//                         variants={cardVariants}
//                         initial="hidden"
//                         animate={isVisible ? 'visible' : 'hidden'}
//                         whileHover={isMobile ? undefined : 'hover'}
//                         className={`relative bg-gray-100/50 dark:bg-gray-900/85 backdrop-blur-lg rounded-2xl border ${
//                           project.featured ? 'border-blue-400/60 dark:border-blue-600/60' : 'border-gray-300/60 dark:border-gray-700/60'
//                         } overflow-hidden max-w-[380px] mx-auto shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-blue-500/20 dark:hover:shadow-blue-600/20`}
//                         onClick={() => setSelectedProject(project)}
//                         onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
//                         onMouseLeave={() => !isMobile && setHoveredProject(null)}
//                         onTouchStart={() => isMobile && setHoveredProject(project.id)}
//                         onTouchEnd={() => isMobile && setHoveredProject(null)}
//                         role="button"
//                         tabIndex={0}
//                         aria-label={`View details for ${project.title}`}
//                         onKeyPress={(e) => e.key === 'Enter' && setSelectedProject(project)}
//                         style={{ backgroundColor: dominantColors[project.id] ? `${dominantColors[project.id]}20` : undefined }}
//                       >
//                         <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden" data-swiper-parallax="-120">
//                           <motion.img
//                             src={project.image}
//                             alt={project.title}
//                             className="w-full h-full object-cover"
//                             initial={{ scale: 1.15 }}
//                             animate={{
//                               scale: hoveredProject === project.id ? 1.2 : activeSlideIndex === index ? 1.15 : 1.1,
//                             }}
//                             transition={{ duration: 0.5, ease: 'easeOut' }}
//                             loading="lazy"
//                             onError={(e) => (e.currentTarget.src = placeholderGalleryImages[0])}
//                           />
//                           <motion.div
//                             className="absolute inset-0 bg-gradient-to-t from-gray-900/95 dark:from-gray-950/95 to-transparent"
//                             initial={{ opacity: 0.55 }}
//                             animate={{
//                               opacity: hoveredProject === project.id ? 0.8 : activeSlideIndex === index ? 0.65 : 0.55,
//                             }}
//                             transition={{ duration: 0.4 }}
//                           />
//                           <div className="absolute top-5 right-5" data-swiper-parallax="-60">
//                             <motion.span
//                               className={`px-4 py-1.5 text-sm font-medium rounded-full ${
//                                 project.featured
//                                   ? 'bg-blue-500/90 dark:bg-blue-600/90 text-white dark:text-gray-100'
//                                   : 'bg-gray-200/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100'
//                               } shadow-md`}
//                               whileHover={{ scale: 1.06 }}
//                             >
//                               {project.category}
//                             </motion.span>
//                           </div>
//                         </div>
//                         <div className="p-5 sm:p-6 space-y-4" data-swiper-parallax="-100">
//                           <motion.h4
//                             id={`project-title-${project.id}`}
//                             className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white tracking-wide"
//                             whileHover={{ x: 4, color: theme === 'dark' ? '#93c5fd' : '#3b82f6' }}
//                             transition={{ duration: 0.25 }}
//                           >
//                             {project.title}
//                           </motion.h4>
//                           <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed line-clamp-2">
//                             {project.shortDescription}
//                           </p>
//                           <div className="flex flex-wrap gap-2.5">
//                             {project.technologies.slice(0, 3).map((tech, techIndex) => (
//                               <motion.span
//                                 key={techIndex}
//                                 className={`px-2.5 py-1 text-xs rounded-lg border ${
//                                   project.featured
//                                     ? 'bg-blue-500/50 dark:bg-blue-600/50 text-blue-100 dark:text-blue-100 border-blue-400/70 dark:border-blue-500/70'
//                                     : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 border-gray-300/70 dark:border-gray-600/70'
//                                 }`}
//                                 animate={hoveredProject === project.id ? { scale: 1.06, y: -3 } : { scale: 1, y: 0 }}
//                                 transition={{ duration: 0.25 }}
//                               >
//                                 {tech}
//                               </motion.span>
//                             ))}
//                             {project.technologies.length > 3 && (
//                               <span className="px-2.5 py-1 bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
//                                 +{project.technologies.length - 3}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     </Tilt>
//                   </SwiperSlide>
//                 ))
//               )}
//             </Swiper>

//             <button
//               className="swiper-button-prev absolute left-3 sm:left-8 top-1/2 z-20 -translate-y-1/2 bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-400/50 dark:hover:bg-blue-600/50 transition-colors duration-300"
//               onClick={() => swiperRef.current?.slidePrev()}
//               aria-label="Previous project"
//             >
//               <ChevronLeft size={20} className="text-blue-600 dark:text-blue-300" />
//             </button>
//             <button
//               className="swiper-button-next absolute right-3 sm:right-8 top-1/2 z-20 -translate-y-1/2 bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-400/50 dark:hover:bg-blue-600/50 transition-colors duration-300"
//               onClick={() => swiperRef.current?.slideNext()}
//               aria-label="Next project"
//             >
//               <ChevronRight size={20} className="text-blue-600 dark:text-blue-300" />
//             </button>
//           </motion.div>
//         </ErrorBoundary>

//         <motion.div
//           className="text-center mt-12 sm:mt-16"
//           initial="hidden"
//           animate={isVisible ? 'visible' : 'hidden'}
//           variants={containerVariants}
//         >
//           <motion.button
//             onClick={() => setShowChatBot(true)}
//             className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:text-gray-100 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl transition-all duration-300"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             aria-label="Discuss a project"
//           >
//             Discuss a Project
//           </motion.button>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 dark:bg-black/90 backdrop-blur-md p-4 sm:p-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedProject(null)}
//             role="dialog"
//             aria-labelledby={`modal-title-${selectedProject.id}`}
//             aria-modal="true"
//           >
//             <motion.div
//               className="relative w-full max-w-4xl bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col lg:flex-row"
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-4 right-4 z-20 bg-gray-200/85 dark:bg-gray-800/85 rounded-full p-2 hover:bg-gray-300/85 dark:hover:bg-gray-700/85 transition-colors"
//                 onClick={() => setSelectedProject(null)}
//                 aria-label="Close project details"
//               >
//                 <X size={20} className="text-gray-800 dark:text-gray-200" />
//               </button>
//               <div className="lg:w-1/2 relative h-48 sm:h-56 md:h-64 lg:h-[360px]">
//                 <ErrorBoundary FallbackComponent={ErrorFallback}>
//                   <Swiper {...gallerySwiperConfig} className="gallery-swiper w-full h-full">
//                     {selectedProject.galleryImages.map((img, index) => (
//                       <SwiperSlide key={index}>
//                         <motion.img
//                           src={img}
//                           alt={`${selectedProject.title} screenshot ${index + 1}`}
//                           className="w-full h-full object-cover"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ duration: 0.6 }}
//                           loading="lazy"
//                           onError={(e) => (e.currentTarget.src = placeholderGalleryImages[0])}
//                         />
//                       </SwiperSlide>
//                     ))}
//                     <button
//                       className="gallery-swiper-button-prev absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-gray-100/70 dark:bg-gray-900/70 rounded-full p-2 hover:bg-blue-400/50 dark:hover:bg-blue-600/50 transition-colors"
//                       aria-label="Previous image"
//                     >
//                       <ChevronLeft size={18} className="text-blue-600 dark:text-blue-300" />
//                     </button>
//                     <button
//                       className="gallery-swiper-button-next absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-gray-100/70 dark:bg-gray-900/70 rounded-full p-2 hover:bg-blue-400/50 dark:hover:bg-blue-600/50 transition-colors"
//                       aria-label="Next image"
//                     >
//                       <ChevronRight size={18} className="text-blue-600 dark:text-blue-300" />
//                     </button>
//                   </Swiper>
//                 </ErrorBoundary>
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-gray-950/80 to-transparent" />
//               </div>
//               <div className="lg:w-1/2 p-5 sm:p-6 lg:p-8 space-y-5 overflow-y-auto max-h-[70vh] sm:max-h-[75vh] custom-scrollbar">
//                 <motion.h3
//                   id={`modal-title-${selectedProject.id}`}
//                   className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.2 }}
//                 >
//                   {selectedProject.title}
//                 </motion.h3>
//                 <motion.div
//                   className="space-y-5 text-gray-700 dark:text-gray-100 text-sm sm:text-base"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.3 }}
//                 >
//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold text-blue-500 dark:text-blue-300">Description</h4>
//                     <p className="leading-relaxed mt-2">{selectedProject.fullDescription}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold text-blue-500 dark:text-blue-300">Technologies</h4>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {selectedProject.technologies.map((tech, index) => (
//                         <motion.span
//                           key={index}
//                           className="px-3 py-1 bg-blue-500/40 dark:bg-blue-600/40 text-blue-900 dark:text-blue-100 border border-blue-400/60 dark:border-blue-500/60 rounded-lg text-xs sm:text-sm"
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
//                         >
//                           {tech}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold text-blue-500 dark:text-blue-300">Challenges</h4>
//                     <p className="leading-relaxed mt-2">{selectedProject.challenges}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold text-blue-500 dark:text-blue-300">Solutions</h4>
//                     <p className="leading-relaxed mt-2">{selectedProject.solutions}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold text-blue-500 dark:text-blue-300">Outcomes</h4>
//                     <p className="leading-relaxed mt-2">{selectedProject.outcomes}</p>
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   className="flex flex-col sm:flex-row gap-3 pt-5"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.5 }}
//                 >
//                   <motion.a
//                     href={selectedProject.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:text-gray-100 rounded-lg text-sm font-medium text-center hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2 shadow-md"
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     aria-label={`View live demo of ${selectedProject.title}`}
//                   >
//                     <ExternalLink size={16} /> Live Demo
//                   </motion.a>
//                   <motion.a
//                     href={selectedProject.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 py-2.5 px-4 bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 rounded-lg text-sm font-medium text-center hover:bg-gray-300/70 dark:hover:bg-gray-600/70 border border-gray-300/60 dark:border-gray-600/60 flex items-center justify-center gap-2 shadow-md"
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     aria-label={`View source code of ${selectedProject.title}`}
//                   >
//                     <Github size={16} /> Code
//                   </motion.a>
//                   <motion.button
//                     onClick={() => setShowChatBot(true)}
//                     className="flex-1 py-2.5 px-4 bg-blue-500/90 dark:bg-blue-600/90 text-white dark:text-gray-100 rounded-lg text-sm font-medium text-center hover:bg-blue-600 dark:hover:bg-blue-700 shadow-md"
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     aria-label={`Discuss ${selectedProject.title}`}
//                   >
//                     Discuss Project
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showChatBot && (
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 60 }}
//             transition={{ duration: 0.4 }}
//             className="fixed bottom-4 right-4 z-50"
//           >
//             <ErrorBoundary FallbackComponent={ErrorFallback}>
//               <Suspense fallback={<div>Loading ChatBot...</div>}>
//                 <ChatBot theme={theme} />
//               </Suspense>
//             </ErrorBoundary>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx global>{`
//         .projects-swiper {
//           padding: 24px 0 48px;
//           margin: 0 -12px;
//           width: calc(100% + 24px);
//         }
//         .projects-swiper .swiper-slide {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           opacity: 0.55;
//           transition: opacity 0.5s ease, transform 0.5s ease;
//           height: auto;
//           padding: 12px 0;
//         }
//         .projects-swiper .swiper-slide-active {
//           opacity: 1;
//           transform: scale(1.05) translateY(-6px);
//           z-index: 10;
//         }
//         .projects-swiper .swiper-slide-prev,
//         .projects-swiper .swiper-slide-next {
//           opacity: 0.9;
//           z-index: 5;
//         }
//         .projects-swiper .swiper-pagination {
//           bottom: 10px !important;
//         }
//         .projects-swiper .swiper-pagination-bullet {
//           background: rgba(0, 0, 0, 0.85);
//           width: 8px;
//           height: 8px;
//           margin: 0 6px;
//           opacity: 0.75;
//           transition: all 0.3s ease;
//         }
//         .dark .projects-swiper .swiper-pagination-bullet {
//           background: rgba(255, 255, 255, 0.85);
//         }
//         .projects-swiper .swiper-pagination-bullet-active {
//           background: #3b82f6;
//           opacity: 1;
//           transform: scale(1.4);
//         }
//         .gallery-swiper {
//           position: relative;
//           height: 100%;
//         }
//         .gallery-swiper .swiper-slide {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .gallery-swiper .swiper-pagination {
//           bottom: 8px !important;
//         }
//         .gallery-swiper .swiper-pagination-bullet {
//           background: rgba(0, 0, 0, 0.8);
//           width: 7px;
//           height: 7px;
//           margin: 0 5px;
//           opacity: 0.7;
//         }
//         .dark .gallery-swiper .swiper-pagination-bullet {
//           background: rgba(255, 255, 255, 0.8);
//         }
//         .gallery-swiper .swiper-pagination-bullet-active {
//           background: #3b82f6;
//           opacity: 1;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.15);
//           border-radius: 3px;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #3b82f6;
//           border-radius: 3px;
//         }
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #3b82f6 rgba(0, 0, 0, 0.15);
//         }
//         .dark .custom-scrollbar {
//           scrollbar-color: #3b82f6 rgba(255, 255, 255, 0.1);
//         }
//         @media (max-width: 720px) {
//           .projects-swiper {
//             margin: 0 -8px;
//             width: calc(100% + 16px);
//           }
//           .projects-swiper .swiper-slide {
//             max-width: 95%;
//           }
//           .projects-swiper .swiper-slide-active {
//             transform: scale(1.03) translateY(-4px);
//           }
//         }
//         @media (min-width: 1280px) {
//           .projects-swiper {
//             padding: 32px 0 56px;
//           }
//         }
//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
//         @keyframes glow {
//           0%, 100% {
//             box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
//           }
//           50% {
//             box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
//           }
//         }
//         .dark .animate-glow {
//           animation: glow-dark 3s ease-in-out infinite;
//         }
//         @keyframes glow-dark {
//           0%, 100% {
//             box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
//           }
//           50% {
//             box-shadow: 0 0 16px rgba(255, 255, 255, 0.3);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Projects;

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow, Parallax } from 'swiper/modules';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ChatBot from './ChatBot';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/parallax';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';
import project7 from '../assets/project7.png';
import { debounce } from 'lodash';

// Interfaces
interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  galleryImages: string[];
  technologies: string[];
  challenges: string;
  solutions: string;
  outcomes: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.15 },
  }),
  hover: (theme: string) => ({
    scale: 1.06,
    rotateY: 6,
    boxShadow: theme === 'dark' ? '0 20px 40px rgba(59, 130, 246, 0.5)' : '0 20px 40px rgba(59, 130, 246, 0.25)',
    transition: { duration: 0.3 },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 200 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.7, y: 200, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.08, transition: { duration: 0.2, type: 'spring', stiffness: 200 } },
  tap: { scale: 0.92 },
};

const titleVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const dividerVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: 'easeOut', delay: 0.3 } },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.4 } },
};

// Placeholder Images
const placeholderGalleryImages = [
  'https://images.unsplash.com/photo-1516321310762-479d72a370a7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1536147116438-62679a5e7161?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop',
];

// Project Data
const PROJECTS_DATA = [
      {
        id: 1,
        title: "GreenGuardian AI",
        shortDescription: "AI-powered platform for smart plant care, featuring disease detection, health monitoring, progress tracking, and personalized care recommendations.",
        fullDescription: "GreenGuardian AI is a revolutionary platform that leverages machine learning to provide intelligent plant care solutions. It uses TensorFlow models to analyze plant images for disease detection, monitors growth metrics, and offers personalized care recommendations through a Flutter-based mobile app. The backend, powered by MongoDB, ensures scalable data management, while a user-friendly dashboard and daily task diary enhance user engagement.",
        image: project1,
        galleryImages: [project1, ...placeholderGalleryImages],
        technologies: ["Flutter", "MongoDB", "TensorFlow", "Machine Learning"],
        challenges: "Training accurate ML models for diverse plant species and optimizing real-time image processing on mobile devices.",
        solutions: "Utilized transfer learning with TensorFlow and implemented efficient image compression techniques.",
        outcomes: "Achieved 95% accuracy in disease detection and increased user retention by 40% through personalized care plans.",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "AI & Mobile"
      },
      {
        id: 2,
        title: 'Flutter Mobile Banking App',
        shortDescription: 'Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial analytics.',
        fullDescription: "This mobile banking app, built with Flutter, offers a secure and seamless user experience with biometric authentication, real-time transaction processing via Stripe API, and advanced financial analytics powered by Python-based ML models. Firebase ensures robust backend services, enabling push notifications and secure data storage.",
        image: project2,
        galleryImages: [project2, ...placeholderGalleryImages],
        technologies: ['Flutter', 'Firebase', 'Stripe API', 'Python', 'Machine Learning Models'],
        challenges: "Ensuring secure transactions and integrating biometric authentication across diverse devices.",
        solutions: "Implemented end-to-end encryption and device-specific biometric APIs for compatibility.",
        outcomes: "Processed over 10,000 transactions with 99.9% uptime and enhanced user trust through secure authentication.",
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'Mobile',
      },
      {
        id: 3,
        title: 'Nexlify DataVision Learning Analytics',
        shortDescription: 'Advanced data visualization platform with predictive analytics, real-time data processing, and interactive reporting tools.',
        fullDescription: "This analytics dashboard, built with Django and D3.js, provides real-time data visualization and predictive analytics using TensorFlow models. PostgreSQL ensures efficient data storage, while the platform supports interactive reporting for business insights, optimized for both web and mobile access.",
        image: project3,
        galleryImages: [project3, ...placeholderGalleryImages],
        technologies: ['Python', 'Django', 'TensorFlow', 'D3.js', 'PostgreSQL'],
        challenges: "Handling large datasets in real-time and ensuring cross-platform compatibility.",
        solutions: "Optimized database queries with PostgreSQL and used D3.js for responsive visualizations.",
        outcomes: "Reduced data processing time by 60% and improved user engagement with interactive reports.",
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'AI/ML',
      },
      {
        id: 4,
        title: 'Real-Time Chat Application',
        shortDescription: 'Scalable messaging platform with end-to-end encryption, file sharing, video calls, and comprehensive admin controls.',
        fullDescription: "This real-time chat application, built with React and Node.js, uses Socket.io for instant messaging and WebRTC for video calls. MongoDB handles scalable data storage, while end-to-end encryption ensures user privacy. The platform includes admin controls for user management and moderation.",
        image: project4,
        galleryImages: [project4, ...placeholderGalleryImages],
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
        challenges: "Maintaining low-latency communication and ensuring secure file sharing.",
        solutions: "Optimized Socket.io for real-time performance and implemented secure file transfer protocols.",
        outcomes: "Supported 5,000 concurrent users with minimal latency and zero security breaches.",
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'Web App',
      },
      {
        id: 5,
        title: 'AI Skill Survey Analysis',
        shortDescription: 'An AI-powered platform that guides users through a skill survey, analyzes responses, suggests personalized skills to learn, and generates a 90-day skill improvement plan.',
        fullDescription: "This AI-powered platform, built with Flutter and React, guides users through a skill survey, uses Python and AWS for response analysis, and suggests personalized skills to learn. MQTT enables real-time community chat, while MongoDB stores user data. The platform generates a 90-day skill improvement plan with daily tasks and inspirational quotes.",
        image: project5,
        galleryImages: [project5, ...placeholderGalleryImages],
        technologies: ['Flutter', 'MongoDB', 'Python', 'AWS', 'Machine Learning', 'React', 'MQTT'],
        challenges: "Processing complex survey data and integrating real-time chat with low latency.",
        solutions: "Used AWS Lambda for scalable data processing and MQTT for efficient chat functionality.",
        outcomes: "Generated personalized plans for 2,000+ users with 85% user satisfaction rate.",
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        category: 'AI & Mobile'
      },
      {
        id: 6,
        title: 'Blockchain Voting System',
        shortDescription: 'Secure and transparent voting platform using blockchain technology with voter verification and real-time results.',
        fullDescription: "This blockchain-based voting system, built with Solidity and React, uses Ethereum for secure vote recording and Web3.js for blockchain interaction. IPFS stores voter data securely, ensuring transparency and immutability, with real-time result updates for stakeholders.",
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop&crop=center',
        galleryImages: ['https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop', ...placeholderGalleryImages],
        technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
        challenges: "Ensuring voter privacy and preventing double-voting on the blockchain.",
        solutions: "Implemented zero-knowledge proofs and smart contract-based voter verification.",
        outcomes: "Processed 1,000+ votes with 100% accuracy and transparency.",
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'Blockchain',
      },
      {
        id: 7,
        title: 'CinemaMind AI',
        shortDescription: 'An innovative AI-driven platform that leverages machine learning to create personalized movie experiences with advanced video generation and user preference modeling.',
        fullDescription: "CinemaMind AI uses machine learning to generate personalized movie experiences, built with Flutter for the frontend and Python for ML model processing. MongoDB handles data storage, while the platform supports real-time content analysis and user preference modeling, delivering a unique cinematic experience.",
        image: project7,
        galleryImages: [project7, ...placeholderGalleryImages],
        technologies: ['Flutter', 'MongoDB', 'Python', 'Machine Learning Models'],
        challenges: "Generating high-quality video content and optimizing for mobile performance.",
        solutions: "Used optimized ML models and cloud-based rendering for efficient video generation.",
        outcomes: "Created personalized content for 3,000+ users with 90% positive feedback.",
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        category: 'AI & Mobile'
      },
    ];

// Swiper Button Component
const SwiperButton = ({ direction, onClick, ariaLabel, theme }: { direction: 'prev' | 'next'; onClick: () => void; ariaLabel: string; theme: string }) => (
  <motion.button
    className={`absolute ${direction === 'prev' ? 'left-2 sm:left-6' : 'right-2 sm:right-6'} top-1/2 z-20 -translate-y-1/2 bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-blue-400/50 dark:hover:bg-blue-600/50 transition-colors duration-300`}
    onClick={onClick}
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    aria-label={ariaLabel}
  >
    {direction === 'prev' ? (
      <ChevronLeft size={20} className="text-blue-600 dark:text-blue-300" />
    ) : (
      <ChevronRight size={20} className="text-blue-600 dark:text-blue-300" />
    )}
  </motion.button>
);

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<any>(null);
  const gallerySwiperRef = useRef<any>(null);
  const { theme } = useTheme();

  // Handle responsiveness
  useEffect(() => {
    const checkIfMobile = debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 100);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile, { passive: true });
    return () => {
      checkIfMobile.cancel();
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API fetch
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load projects. Please try again.');
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '100px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Update Swiper on modal open
  useEffect(() => {
    if (selectedProject && gallerySwiperRef.current) {
      gallerySwiperRef.current.update();
    }
  }, [selectedProject]);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  // Handle slide change
  const handleSlideChange = useCallback((swiper: any) => {
    setActiveSlideIndex(swiper.realIndex);
  }, []);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(PROJECTS_DATA.map((p) => p.category)));
    return ['All', ...uniqueCategories];
  }, []);

  // Swiper configurations
  const swiperConfig = useMemo(() => ({
    modules: [Navigation, Pagination, Autoplay, EffectCoverflow, Parallax],
    effect: 'coverflow' as const,
    coverflowEffect: {
      rotate: isMobile ? 4 : 7,
      stretch: isMobile ? 5 : 10,
      depth: isMobile ? 30 : 70,
      modifier: isMobile ? 1.5 : 2,
      slideShadows: false,
    },
    parallax: true,
    loop: filteredProjects.length > 1,
    autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: false, // Handled by custom buttons
    pagination: {
      clickable: true,
      dynamicBullets: true,
      renderBullet: (index: number, className: string) => {
        return `<span class="${className} bg-blue-400/80 dark:bg-blue-600/80 w-2.5 h-2.5"></span>`;
      },
    },
    spaceBetween: isMobile ? 6 : 12,
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 6 },
      480: { slidesPerView: 1.4, spaceBetween: 8 },
      640: { slidesPerView: 1.8, spaceBetween: 10 },
      768: { slidesPerView: 2.2, spaceBetween: 12 },
      1024: { slidesPerView: 2.8, spaceBetween: 16 },
      1280: { slidesPerView: 3.4, spaceBetween: 20 },
    },
    onSlideChange: handleSlideChange,
    onSwiper: (swiper: any) => (swiperRef.current = swiper),
  }), [isMobile, handleSlideChange, filteredProjects.length]);

  const gallerySwiperConfig = useMemo(() => ({
    modules: [Navigation, Pagination],
    navigation: false, // Handled by custom buttons
    pagination: {
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return `<span class="${className} bg-blue-400/80 dark:bg-blue-600/80 w-2 h-2"></span>`;
      },
    },
    spaceBetween: 8,
    slidesPerView: 1,
    loop: true,
    effect: 'fade' as const,
    fadeEffect: { crossFade: true },
    observer: true,
    observeParents: true,
    onSwiper: (swiper: any) => (gallerySwiperRef.current = swiper),
  }), []);

  // Keyboard navigation for accessibility
  const handleKeyPress = useCallback((e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setSelectedProject(project);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-10 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/60"
      id="projects"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY, opacity }}>
        <motion.div
          className="absolute -top-24 -left-24 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-blue-500/15 dark:bg-blue-800/15 rounded-full blur-4xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-purple-500/15 dark:bg-purple-800/15 rounded-full blur-4xl"
          animate={{ scale: [1, 1.45, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight"
            variants={titleVariants}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-4 sm:mt-6"
            variants={dividerVariants}
          />
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-100 max-w-3xl mx-auto mt-4 sm:mt-6 leading-relaxed"
            variants={descriptionVariants}
          >
            Explore innovative solutions crafted with advanced technologies in AI, mobile, web, and blockchain.
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label="Search projects"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Project Swiper */}
        {isLoading ? (
          <motion.div
            className="text-center text-gray-700 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading projects...
          </motion.div>
        ) : error ? (
          <motion.div
            className="text-center text-red-600 dark:text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            className="text-center text-gray-700 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No projects found matching your criteria.
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <Swiper {...swiperConfig} className="projects-swiper">
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.id} className="flex items-center justify-center">
                  <Tilt
                    tiltMaxAngleX={isMobile ? 1.5 : 3.5}
                    tiltMaxAngleY={isMobile ? 1.5 : 3.5}
                    perspective={1500}
                    scale={1.04}
                    transitionSpeed={600}
                    glareEnable={!isMobile}
                    glareMaxOpacity={0.3}
                    glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
                    glarePosition="all"
                    glareBorderRadius="16px"
                  >
                    <motion.div
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      whileHover={isMobile ? undefined : { ...cardVariants.hover(theme) }}
                      className={`relative bg-gray-100/50 dark:bg-gray-900/85 backdrop-blur-lg rounded-2xl border ${
                        project.featured ? 'border-blue-400/60 dark:border-blue-600/60' : 'border-gray-300/60 dark:border-gray-700/60'
                      } overflow-hidden max-w-[360px] sm:max-w-[380px] mx-auto shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-blue-500/20 dark:hover:shadow-blue-600/20 animate-glow`}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                      onMouseLeave={() => !isMobile && setHoveredProject(null)}
                      onTouchStart={() => isMobile && setHoveredProject(project.id)}
                      onTouchEnd={() => isMobile && setHoveredProject(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${project.title}`}
                      onKeyPress={(e) => handleKeyPress(e, project)}
                    >
                      <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden" data-swiper-parallax="-120">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.2 }}
                          animate={{
                            scale: hoveredProject === project.id ? 1.25 : activeSlideIndex === index ? 1.2 : 1.15,
                          }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = placeholderGalleryImages[0])}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-gray-900/95 dark:from-gray-950/95 to-transparent"
                          initial={{ opacity: 0.6 }}
                          animate={{
                            opacity: hoveredProject === project.id ? 0.85 : activeSlideIndex === index ? 0.7 : 0.6,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute top-4 right-4" data-swiper-parallax="-60">
                          <motion.span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${
                              project.featured
                                ? 'bg-blue-500/90 dark:bg-blue-600/90 text-white dark:text-gray-100'
                                : 'bg-gray-200/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100'
                            } shadow-md`}
                            whileHover={{ scale: 1.08 }}
                          >
                            {project.category}
                          </motion.span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5 space-y-3" data-swiper-parallax="-100">
                        <motion.h4
                          id={`project-title-${project.id}`}
                          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white tracking-wide"
                          whileHover={{ x: 5, color: theme === 'dark' ? '#93c5fd' : '#3b82f6' }}
                          transition={{ duration: 0.25 }}
                        >
                          {project.title}
                        </motion.h4>
                        <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed line-clamp-2">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className={`px-2.5 py-1 text-xs rounded-lg border ${
                                project.featured
                                  ? 'bg-blue-500/50 dark:bg-blue-600/50 text-blue-100 dark:text-blue-100 border-blue-400/70 dark:border-blue-500/70'
                                  : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 border-gray-300/70 dark:border-gray-600/70'
                              }`}
                              animate={hoveredProject === project.id ? { scale: 1.08, y: -3 } : { scale: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2.5 py-1 bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Tilt>
                </SwiperSlide>
              ))}
            </Swiper>
            <SwiperButton
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
              ariaLabel="Previous project"
              theme={theme}
            />
            <SwiperButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
              ariaLabel="Next project"
              theme={theme}
            />
          </motion.div>
        )}

        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.button
            onClick={() => setShowChatBot(true)}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:text-gray-100 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl transition-all duration-300 animate-glow"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Discuss a project"
          >
            Discuss a Project
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 dark:bg-black/90 backdrop-blur-md p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-labelledby={`modal-title-${selectedProject.id}`}
            aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-[90vw] sm:max-w-4xl bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col lg:flex-row"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-3 right-3 z-20 bg-gray-200/85 dark:bg-gray-800/85 rounded-full p-1.5 hover:bg-gray-300/85 dark:hover:bg-gray-700/85 transition-colors"
                onClick={() => setSelectedProject(null)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Close project details"
              >
                <X size={18} className="text-gray-800 dark:text-gray-200" />
              </motion.button>
              <div className="lg:w-1/2 relative h-48 sm:h-56 md:h-64 lg:h-[360px]">
                <Swiper {...gallerySwiperConfig} className="gallery-swiper w-full h-full">
                  {selectedProject.galleryImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <motion.img
                        src={img}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                        onError={(e) => (e.currentTarget.src = placeholderGalleryImages[0])}
                      />
                    </SwiperSlide>
                  ))}
                  <SwiperButton
                    direction="prev"
                    onClick={() => gallerySwiperRef.current?.slidePrev()}
                    ariaLabel="Previous image"
                    theme={theme}
                  />
                  <SwiperButton
                    direction="next"
                    onClick={() => gallerySwiperRef.current?.slideNext()}
                    ariaLabel="Next image"
                    theme={theme}
                  />
                </Swiper>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-gray-950/80 to-transparent" />
              </div>
              <div className="lg:w-1/2 p-4 sm:p-5 lg:p-7 space-y-4 overflow-y-auto max-h-[70vh] sm:max-h-[75vh] custom-scrollbar">
                <motion.h3
                  id={`modal-title-${selectedProject.id}`}
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {selectedProject.title}
                </motion.h3>
                <motion.div
                  className="space-y-4 text-gray-700 dark:text-gray-100 text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-blue-500 dark:text-blue-300">Description</h4>
                    <p className="leading-relaxed mt-1.5">{selectedProject.fullDescription}</p>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-blue-500 dark:text-blue-300">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {selectedProject.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-2.5 py-1 bg-blue-500/40 dark:bg-blue-600/40 text-blue-900 dark:text-blue-100 border border-blue-400/60 dark:border-blue-500/60 rounded-lg text-xs"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-blue-500 dark:text-blue-300">Challenges</h4>
                    <p className="leading-relaxed mt-1.5">{selectedProject.challenges}</p>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-blue-500 dark:text-blue-300">Solutions</h4>
                    <p className="leading-relaxed mt-1.5">{selectedProject.solutions}</p>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-blue-500 dark:text-blue-300">Outcomes</h4>
                    <p className="leading-relaxed mt-1.5">{selectedProject.outcomes}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-2 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:text-gray-100 rounded-lg text-xs sm:text-sm font-medium text-center hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-1.5 shadow-md animate-glow"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`View live demo of ${selectedProject.title}`}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 rounded-lg text-xs sm:text-sm font-medium text-center hover:bg-gray-300/70 dark:hover:bg-gray-600/70 border border-gray-300/60 dark:border-gray-600/60 flex items-center justify-center gap-1.5 shadow-md animate-glow"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`View source code of ${selectedProject.title}`}
                  >
                    <Github size={14} /> Code
                  </motion.a>
                  <motion.button
                    onClick={() => setShowChatBot(true)}
                    className="flex-1 py-2 px-3 bg-blue-500/90 dark:bg-blue-600/90 text-white dark:text-gray-100 rounded-lg text-xs sm:text-sm font-medium text-center hover:bg-blue-600 dark:hover:bg-blue-700 shadow-md animate-glow"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={`Discuss ${selectedProject.title}`}
                  >
                    Discuss Project
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChatBot && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
            className="fixed bottom-3 right-3 z-50"
          >
            <ChatBot theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .projects-swiper {
          padding: 20px 0 40px;
          margin: 0 -12px;
          width: calc(100% + 24px);
        }
        .projects-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.5;
          transition: opacity 0.5s ease, transform 0.5s ease;
          height: auto;
          padding: 12px 0;
        }
        .projects-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.08) translateY(-6px);
          z-index: 10;
        }
        .projects-swiper .swiper-slide-prev,
        .projects-swiper .swiper-slide-next {
          opacity: 0.85;
          z-index: 5;
        }
        .projects-swiper .swiper-pagination {
          bottom: 10px !important;
        }
        .projects-swiper .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.8);
          width: 7px;
          height: 7px;
          margin: 0 5px;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .dark .projects-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.8);
        }
        .projects-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
          transform: scale(1.3);
        }
        .gallery-swiper {
          position: relative;
          height: 100%;
        }
        .gallery-swiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gallery-swiper .swiper-pagination {
          bottom: 8px !important;
        }
        .gallery-swiper .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.75);
          width: 6px;
          height: 6px;
          margin: 0 4px;
          opacity: 0.65;
        }
        .dark .gallery-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.75);
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2.5px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 2.5px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 rgba(0, 0, 0, 0.1);
        }
        .dark .custom-scrollbar {
          scrollbar-color: #3b82f6 rgba(255, 255, 255, 0.08);
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          }
          50% {
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
          }
        }
        .dark .animate-glow {
          animation: glow-dark 3s ease-in-out infinite;
        }
        @keyframes glow-dark {
          0%, 100% {
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.12);
          }
          50% {
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
          }
        }
        @media (max-width: 480px) {
          .projects-swiper {
            margin: 0 -8px;
            width: calc(100% + 16px);
          }
          .projects-swiper .swiper-slide {
            max-width: 92%;
          }
          .projects-swiper .swiper-slide-active {
            transform: scale(1.04) translateY(-4px);
          }
        }
        @media (min-width: 1280px) {
          .projects-swiper {
            padding: 28px 0 48px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;