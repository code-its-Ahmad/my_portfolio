// import { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import Tilt from 'react-parallax-tilt';
// import { useTheme } from '../context/ThemeContext';

// const Skills = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const { theme } = useTheme(); // Access current theme

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start end', 'end start'],
//   });

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
//   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           setTimeout(() => {
//             const skillIndices = Array.from({ length: 12 }, (_, i) => i);
//             skillIndices.forEach((index) => {
//               setTimeout(() => {
//                 setAnimatedSkills((prev) => [...prev, index]);
//               }, index * 150);
//             });
//           }, 300);
//         } else {
//           setIsVisible(false);
//           setAnimatedSkills([]);
//         }
//       },
//       { threshold: 0.2, rootMargin: '50px' }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const skills = [
//     { name: 'React', level: 'Advanced', icon: '⚛️', percentage: 95, color: 'from-blue-400 to-blue-600' },
//     { name: 'Node.js', level: 'Advanced', icon: '🟢', percentage: 90, color: 'from-green-400 to-green-600' },
//     { name: 'Python', level: 'Advanced', icon: '🐍', percentage: 88, color: 'from-yellow-400 to-yellow-600' },
//     { name: 'Flutter', level: 'Advanced', icon: '💙', percentage: 85, color: 'from-blue-400 to-cyan-600' },
//     { name: 'Machine Learning', level: 'Advanced', icon: '🤖', percentage: 82, color: 'from-purple-400 to-purple-600' },
//     { name: 'Firebase', level: 'Advanced', icon: '🔥', percentage: 90, color: 'from-orange-400 to-red-600' },
//     { name: 'MongoDB', level: 'Advanced', icon: '🍃', percentage: 88, color: 'from-green-400 to-green-600' },
//     { name: 'Laravel', level: 'Advanced', icon: '🚀', percentage: 85, color: 'from-red-400 to-red-600' },
//     { name: 'JavaScript', level: 'Advanced', icon: '📜', percentage: 95, color: 'from-yellow-400 to-yellow-600' },
//     { name: 'TypeScript', level: 'Advanced', icon: '📘', percentage: 90, color: 'from-blue-400 to-blue-600' },
//     { name: 'Kotlin', level: 'Intermediate', icon: '🔷', percentage: 75, color: 'from-orange-400 to-orange-600' },
//     { name: 'MySQL', level: 'Advanced', icon: '🗄️', percentage: 85, color: 'from-blue-400 to-blue-600' },
//   ];

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50, rotateX: -15 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       rotateX: 0,
//       transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.15 },
//     }),
//     hover: {
//       scale: 1.1,
//       rotateY: 5,
//       boxShadow: theme === 'dark' ? '0 15px 30px rgba(59, 130, 246, 0.3)' : '0 15px 30px rgba(59, 130, 246, 0.2)',
//       transition: { duration: 0.4, ease: 'easeInOut' },
//     },
//   };

//   const progressVariants = {
//     hidden: { scaleX: 0 },
//     visible: {
//       scaleX: 1,
//       transition: { duration: 1.5, ease: 'easeOut', delay: 0.5 },
//     },
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
//       style={{ perspective: 1200 }}
//       aria-labelledby="skills-heading"
//     >
//       <motion.div className="absolute inset-0 overflow-hidden" style={{ y: backgroundY, opacity }}>
//         <motion.div
//           className="absolute -top-20 -left-20 w-64 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[28rem] bg-blue-500/15 dark:bg-blue-800/15 rounded-full blur-3xl"
//           animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
//           transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
//         />
//         <motion.div
//           className="absolute -bottom-20 -right-20 w-80 sm:w-96 md:w-[32rem] h-80 sm:h-96 md:h-[32rem] bg-purple-500/15 dark:bg-purple-800/15 rounded-full blur-3xl"
//           animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
//           transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
//         />
//       </motion.div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <motion.div
//           className="text-center mb-12 sm:mb-16"
//           initial={{ opacity: 0, y: 100 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//         >
//           <h2
//             id="skills-heading"
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
//           >
//             Skills & Technologies
//           </h2>
//           <motion.div
//             className="w-20 sm:w-24 md:w-28 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"
//             initial={{ scaleX: 0 }}
//             animate={isVisible ? { scaleX: 1 } : {}}
//             transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
//           />
//         </motion.div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
//           {skills.map((skill, index) => (
//             <Tilt
//               key={index}
//               tiltMaxAngleX={12}
//               tiltMaxAngleY={12}
//               perspective={1000}
//               scale={1.03}
//               transitionSpeed={600}
//               glareEnable
//               glareMaxOpacity={0.15}
//               glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
//               glarePosition="all"
//             >
//               <motion.div
//                 custom={index}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate={animatedSkills.includes(index) ? 'visible' : 'hidden'}
//                 whileHover="hover"
//                 className="group relative bg-gray-100/50 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-500/30 dark:border-purple-700/30 hover:border-blue-400/60 dark:hover:border-blue-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-600/20 cursor-pointer"
//                 aria-label={`${skill.name} skill, ${skill.level}, ${skill.percentage}% proficiency`}
//               >
//                 <div className="text-center space-y-3 sm:space-y-4">
//                   <motion.div
//                     className="text-3xl sm:text-4xl md:text-5xl mb-3"
//                     whileHover={{ scale: 1.2, rotate: 10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {skill.icon}
//                   </motion.div>
//                   <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
//                     {skill.name}
//                   </h3>
//                   <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{skill.level}</p>

//                   <div className="w-full bg-gray-200/50 dark:bg-gray-800/50 rounded-full h-2.5 sm:h-3 overflow-hidden">
//                     <motion.div
//                       className={`bg-gradient-to-r ${skill.color} h-full rounded-full`}
//                       variants={progressVariants}
//                       initial="hidden"
//                       animate={animatedSkills.includes(index) ? 'visible' : 'hidden'}
//                       style={{ width: `${skill.percentage}%` }}
//                     />
//                   </div>

//                   <AnimatePresence>
//                     {animatedSkills.includes(index) && (
//                       <motion.div
//                         className="text-xs sm:text-sm font-semibold text-blue-500 dark:text-blue-300"
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         transition={{ duration: 0.5, delay: 0.3 }}
//                       >
//                         {skill.percentage}%
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <motion.div
//                   className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-sm pointer-events-none`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: animatedSkills.includes(index) ? 0.1 : 0 }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>
//       </div>

//       <style jsx global>{`
//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
//         @keyframes glow {
//           0%,
//           100% {
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
//           }
//         }
//         .dark .animate-glow {
//           animation: glow-dark 3s ease-in-out infinite;
//         }
//         @keyframes glow-dark {
//           0%,
//           100% {
//             box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Skills;


import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const sectionRef = useRef(null);
  const { theme } = useTheme(); // Access current theme

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            const skillIndices = Array.from({ length: 16 }, (_, i) => i);
            skillIndices.forEach((index) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => [...prev, index]);
              }, index * 150);
            });
          }, 300);
        } else {
          setIsVisible(false);
          setAnimatedSkills([]);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'React', level: 'Advanced', icon: '⚛️', percentage: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 'Advanced', icon: '🟢', percentage: 90, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 'Advanced', icon: '🐍', percentage: 88, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Flutter', level: 'Advanced', icon: '💙', percentage: 85, color: 'from-blue-400 to-cyan-600' },
    { name: 'Machine Learning', level: 'Advanced', icon: '🤖', percentage: 82, color: 'from-purple-400 to-purple-600' },
    { name: 'Firebase', level: 'Advanced', icon: '🔥', percentage: 90, color: 'from-orange-400 to-red-600' },
    { name: 'MongoDB', level: 'Advanced', icon: '🍃', percentage: 88, color: 'from-green-400 to-green-600' },
    { name: 'Laravel', level: 'Advanced', icon: '🚀', percentage: 85, color: 'from-red-400 to-red-600' },
    { name: 'JavaScript', level: 'Advanced', icon: '📜', percentage: 95, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', level: 'Advanced', icon: '📘', percentage: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'Kotlin', level: 'Intermediate', icon: '🔷', percentage: 75, color: 'from-orange-400 to-orange-600' },
    { name: 'MySQL', level: 'Advanced', icon: '🗄️', percentage: 85, color: 'from-blue-400 to-blue-600' },
    { name: 'Supabase', level: 'Advanced', icon: '🗳️', percentage: 87, color: 'from-green-400 to-teal-600' },
    { name: 'Spring Boot', level: 'Advanced', icon: '🌱', percentage: 85, color: 'from-green-400 to-lime-600' },
    { name: 'Microservices', level: 'Advanced', icon: '🧩', percentage: 82, color: 'from-indigo-400 to-indigo-600' },
    { name: 'Payment API', level: 'Intermediate', icon: '💳', percentage: 78, color: 'from-pink-400 to-pink-600' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.15 },
    }),
    hover: {
      scale: 1.1,
      rotateY: 5,
      boxShadow: theme === 'dark' ? '0 15px 30px rgba(59, 130, 246, 0.3)' : '0 15px 30px rgba(59, 130, 246, 0.2)',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.5 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
      style={{ perspective: 1200 }}
      aria-labelledby="skills-heading"
    >
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: backgroundY, opacity }}>
        <motion.div
          className="absolute -top-20 -left-20 w-64 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[28rem] bg-blue-500/15 dark:bg-blue-800/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 sm:w-96 md:w-[32rem] h-80 sm:h-96 md:h-[32rem] bg-purple-500/15 dark:bg-purple-800/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </h2>
          <motion.div
            className="w-20 sm:w-24 md:w-28 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              perspective={1000}
              scale={1.03}
              transitionSpeed={600}
              glareEnable
              glareMaxOpacity={0.15}
              glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
              glarePosition="all"
            >
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={animatedSkills.includes(index) ? 'visible' : 'hidden'}
                whileHover="hover"
                className="group relative bg-gray-100/50 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-500/30 dark:border-purple-700/30 hover:border-blue-400/60 dark:hover:border-blue-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-600/20 cursor-pointer"
                aria-label={`${skill.name} skill, ${skill.level}, ${skill.percentage}% proficiency`}
              >
                <div className="text-center space-y-3 sm:space-y-4">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{skill.level}</p>

                  <div className="w-full bg-gray-200/50 dark:bg-gray-800/50 rounded-full h-2.5 sm:h-3 overflow-hidden">
                    <motion.div
                      className={`bg-gradient-to-r ${skill.color} h-full rounded-full`}
                      variants={progressVariants}
                      initial="hidden"
                      animate={animatedSkills.includes(index) ? 'visible' : 'hidden'}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>

                  <AnimatePresence>
                    {animatedSkills.includes(index) && (
                      <motion.div
                        className="text-xs sm:text-sm font-semibold text-blue-500 dark:text-blue-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {skill.percentage}%
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-sm pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animatedSkills.includes(index) ? 0.1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </Tilt>
          ))}
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

export default Skills;