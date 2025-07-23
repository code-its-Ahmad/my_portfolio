import { useEffect, useRef, useState, useMemo } from 'react';
import { Award, ExternalLink, MoveRight, MoveLeft } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';
import { useScroll, useGesture } from '@use-gesture/react';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '../context/ThemeContext';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
  credentialUrl: string;
  color: string;
  darkColor?: string; // Optional darker gradient for dark mode
}

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); // Access current theme

  const certificates = useMemo<Certificate[]>(() => [
    {
      title: "Full Stack Web Development",
      issuer: "Meta (Coursera)",
      year: "2023",
      description: "Comprehensive program covering React, Node.js, databases, and modern web development practices with hands-on projects.",
      credentialUrl: "https://coursera.org/verify/certificate-example-1",
      color: "from-blue-400 to-purple-600",
      darkColor: "from-blue-500 to-purple-700"
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University (Coursera)",
      year: "2023",
      description: "Advanced machine learning concepts including supervised learning, neural networks, and deep learning with Python and TensorFlow.",
      credentialUrl: "https://coursera.org/verify/certificate-example-2",
      color: "from-amber-400 to-red-600",
      darkColor: "from-amber-500 to-red-700"
    },
    {
      title: "Google AI for Everyone",
      issuer: "Google Cloud",
      year: "2023",
      description: "Foundational knowledge of AI and machine learning concepts, practical applications, and ethical considerations in AI development.",
      credentialUrl: "https://google.com/verify/certificate-example-3",
      color: "from-green-400 to-blue-600",
      darkColor: "from-green-500 to-blue-700"
    },
    {
      title: "Flutter & Dart Development",
      issuer: "Google Developers",
      year: "2022",
      description: "Cross-platform mobile app development using Flutter framework, Dart programming language, and mobile UI/UX principles.",
      credentialUrl: "https://developers.google.com/verify/certificate-example-4",
      color: "from-sky-400 to-indigo-600",
      darkColor: "from-sky-500 to-indigo-700"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2022",
      description: "Cloud computing fundamentals, AWS services, security, architecture, and best practices for cloud deployment and management.",
      credentialUrl: "https://aws.amazon.com/verify/certificate-example-5",
      color: "from-yellow-400 to-orange-600",
      darkColor: "from-yellow-500 to-orange-700"
    },
    {
      title: "Advanced JavaScript & TypeScript",
      issuer: "Microsoft Learn",
      year: "2022",
      description: "Modern JavaScript ES6+, TypeScript development, asynchronous programming, and advanced web development techniques.",
      credentialUrl: "https://learn.microsoft.com/verify/certificate-example-6",
      color: "from-purple-400 to-pink-600",
      darkColor: "from-purple-500 to-pink-700"
    }
  ], []);

  const headerSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 50,
    config: config.wobbly
  });

  const swipeSpring = useSpring({
    opacity: swipeDir ? 1 : 0,
    x: swipeDir === 'left' ? -10 : swipeDir === 'right' ? 10 : 0,
    config: config.gentle
  });

  useScroll(
    ({ xy: [, y] }) => {
      if (containerRef.current && typeof window !== 'undefined') {
        const scrollRatio = y / window.innerHeight;
        containerRef.current.style.setProperty('--scroll-ratio', scrollRatio.toString());
      }
    },
    { target: typeof window !== 'undefined' ? window : undefined }
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (typeof window !== 'undefined' && window.innerWidth < 768) {
            const interval = setInterval(() => {
              setSwipeDir('left');
              setTimeout(() => setSwipeDir(null), 500);
            }, 3000);
            return () => clearInterval(interval);
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bind = useGesture({
    onDrag: ({ direction: [xDir], active, movement: [mx] }) => {
      if (active && Math.abs(mx) > 50) {
        setSwipeDir(xDir > 0 ? 'right' : 'left');
        setTimeout(() => setSwipeDir(null), 500);
      }
    }
  });

  const getCardSpring = useMemo(() => {
    return (index: number) => useSpring({
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 50 + index * 10,
      scale: activeIndex === index ? 1.05 : 1,
      config: { tension: 300, friction: 20 },
      delay: isVisible ? index * 100 : 0
    });
  }, [isVisible, activeIndex]);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 10 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * 360,
      translateX: Math.random() > 0.5 ? -Math.random() * 100 : Math.random() * 100
    }));
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-950"
      style={{
        background: theme === 'dark'
          ? 'radial-gradient(circle at 75% 50%, rgba(56, 182, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 50%)'
          : 'radial-gradient(circle at 75% 50%, rgba(56, 182, 255, 0.2) 0%, rgba(255, 255, 255, 0.5) 50%)'
      }}
      aria-labelledby="certificates-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={`bg-${i}`}
            className="absolute rounded-full bg-blue-500/10 dark:bg-blue-800/10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              transform: `rotate(${Math.random() * 360}deg)`
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10" ref={containerRef}>
        <animated.div 
          style={headerSpring}
          className="text-center mb-16"
        >
          <h2 id="certificates-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl">
            Professional certifications demonstrating expertise in cutting-edge technologies
          </p>
        </animated.div>

        <animated.div 
          style={swipeSpring}
          className="md:hidden flex items-center justify-center mb-8 text-blue-500 dark:text-blue-300"
          aria-live="polite"
        >
          {swipeDir === 'left' ? (
            <>
              <MoveLeft className="mr-2" aria-hidden="true" />
              <span>Swipe left</span>
            </>
          ) : (
            <>
              <span>Swipe right</span>
              <MoveRight className="ml-2" aria-hidden="true" />
            </>
          )}
        </animated.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0"
          {...bind()}
          role="list"
          aria-label="List of certificates"
        >
          {certificates.map((cert, index) => (
            <animated.div
              key={index}
              style={{
                ...getCardSpring(index),
                transformOrigin: 'center center'
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(activeIndex === index ? null : index)}
              role="listitem"
              tabIndex={0}
            >
              <Tilt
                tiltEnable={typeof window !== 'undefined' && window.innerWidth > 768}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor={theme === 'dark' ? '#ffffff' : '#000000'}
                glarePosition="all"
                glareBorderRadius="12px"
                scale={1.02}
                transitionSpeed={1500}
                perspective={1000}
              >
                <div className={`group h-full bg-gradient-to-br ${theme === 'dark' && cert.darkColor ? cert.darkColor : cert.color} rounded-2xl p-0.5 shadow-xl hover:shadow-2xl transition-all duration-500 animate-glow`}>
                  <div className="h-full bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl p-6 transition-all duration-500">
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`text-gray-100 dark:text-gray-100 bg-gradient-to-br ${theme === 'dark' && cert.darkColor ? cert.darkColor : cert.color} p-2 rounded-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6`}>
                            <Award size={28} aria-hidden="true" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold">{cert.year}</span>
                        </div>
                        <span className="text-xs font-mono px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-500">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">{cert.issuer}</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" aria-hidden="true" />
                        <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 transition-all duration-300 text-sm font-semibold group/link"
                          aria-label={`View ${cert.title} credential`}
                        >
                          <span className="group-hover/link:underline">View Credential</span>
                          <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 dark:from-blue-600/10 to-purple-600/10 dark:to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </Tilt>
            </animated.div>
          ))}
        </div>

        <div className="absolute -bottom-20 left-0 right-0 h-40 overflow-hidden pointer-events-none z-0">
          {particles.map((particle) => (
            <div
              key={`particle-${particle.id}`}
              className="absolute rounded-full bg-blue-500/20 dark:bg-blue-300/20"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                bottom: '0',
                left: `${particle.left}%`,
                animation: `float-up ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                opacity: particle.opacity
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(${(particle: typeof particles[0]) => particle.translateX}px) rotate(${(particle: typeof particles[0]) => particle.rotation}deg);
            opacity: 0;
          }
        }
        
        .react-parallax-tilt {
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .react-parallax-tilt::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 0%, transparent 100%);
          transform: translateZ(20px);
          border-radius: inherit;
          pointer-events: none;
        }

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

export default Certificates;