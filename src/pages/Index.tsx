// import { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import Hero from '../components/Hero';
// import About from '../components/About';
// import Experience from '../components/Experience';
// import Skills from '../components/Skills';
// import Projects from '../components/Projects';
// import Services from '../components/Services';
// import Certificates from '../components/Certificates';
// import Contact from '../components/Contact';
// import ChatBot from '../components/ChatBot';
// import Navigation from '../components/Navigation';
// import { ThemeProvider } from '../context/ThemeContext';

// const Index = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.style.scrollBehavior = 'smooth';
//     }
//   }, []);

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
//   };

//   return (
//     <ThemeProvider>
//       <motion.div
//         ref={containerRef}
//         className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen overflow-x-hidden transition-colors duration-300"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <Navigation />
//         <main>
//           <motion.section
//             id="home"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Hero />
//           </motion.section>
//           <motion.section
//             id="about"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <About />
//           </motion.section>
//           <motion.section
//             id="experience"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Experience />
//           </motion.section>
//           <motion.section
//             id="skills"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Skills />
//           </motion.section>
//           <motion.section
//             id="projects"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Projects />
//           </motion.section>
//           <motion.section
//             id="services"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Services />
//           </motion.section>
//           <motion.section
//             id="certificates"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Certificates />
//           </motion.section>
//           <motion.section
//             id="contact"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.3 }}
//           >
//             <Contact />
//           </motion.section>
          
//         </main>
//         <ChatBot />
//       </motion.div>
//     </ThemeProvider>
//   );
// };

// export default Index;
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import ChatBot from '../components/ChatBot';
import Navigation from '../components/Navigation';
import { ThemeProvider } from '../context/ThemeContext';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <ThemeProvider>
      <motion.div
        ref={containerRef}
        className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navigation />
        <main>
          {[
            { id: 'home', Component: Hero },
            { id: 'about', Component: About },
            { id: 'experience', Component: Experience },
            { id: 'skills', Component: Skills },
            { id: 'projects', Component: Projects },
            { id: 'services', Component: Services },
            { id: 'certificates', Component: Certificates },
            { id: 'contact', Component: Contact },
          ].map(({ id, Component }) => (
            <motion.section
              key={id}
              id={id}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <Component />
            </motion.section>
          ))}
        </main>
        <ChatBot />
      </motion.div>
    </ThemeProvider>
  );
};

export default Index;