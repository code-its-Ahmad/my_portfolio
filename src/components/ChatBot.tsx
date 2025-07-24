// import { useState, useRef, useEffect, memo, Suspense } from 'react';
// import { MessageCircle, Send, X, User, Bot, RefreshCw, Phone, Mail } from 'lucide-react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { motion, AnimatePresence, Variants } from 'framer-motion';
// import { v4 as uuidv4 } from 'uuid';
// import { ErrorBoundary } from 'react-error-boundary';
// import { useTheme } from '../context/ThemeContext';

// // Interfaces
// interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// interface ProjectDetails {
//   clientType?: 'company' | 'individual';
//   clientName?: string;
//   companyName?: string;
//   projectType?: string;
//   positionTitle?: string;
//   budget?: string;
//   timeline?: string;
//   requirements?: string;
//   contactEmail?: string;
// }

// type ConversationState =
//   | 'greeting'
//   | 'collecting_client_type'
//   | 'collecting_name'
//   | 'collecting_company_name'
//   | 'collecting_project_type'
//   | 'collecting_position_title'
//   | 'collecting_budget'
//   | 'collecting_timeline'
//   | 'collecting_requirements'
//   | 'collecting_contact'
//   | 'connecting';

// interface SpeechQueueItem {
//   text: string;
//   isUser: boolean;
// }

// interface ChatBotProps {
//   theme?: 'light' | 'dark';
// }

// // Animation Variants
// const containerVariants: Variants = {
//   hidden: { opacity: 0, y: '100vh' },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: 'spring', stiffness: 120, damping: 20 },
//   },
//   exit: { opacity: 0, y: '100vh', transition: { duration: 0.4 } },
// };

// const messageVariants: Variants = {
//   initial: { opacity: 0, y: 20, scale: 0.95 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.3, type: 'spring', stiffness: 150 },
//   },
// };

// const buttonVariants: Variants = {
//   hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
//   tap: { scale: 0.9, transition: { duration: 0.1 } },
// };

// const avatarVariants: Variants = {
//   idle: { rotateY: 0, transition: { duration: 2, ease: 'easeInOut' } },
//   speaking: { rotateY: Math.PI * 0.1, transition: { duration: 0.5, ease: 'easeInOut' } },
// };

// // Avatar Model Component
// const AvatarModel = ({ isSpeaking, theme }: { isSpeaking: boolean; theme: 'light' | 'dark' }) => {
//   const groupRef = useRef<THREE.Group>(null);
//   const mixerRef = useRef<THREE.AnimationMixer | null>(null);
//   const { scene, animations } = useGLTF('/avator.glb', true);

//   useEffect(() => {
//     try {
//       if (!scene) {
//         console.warn('GLTF model failed to load, using fallback geometry');
//         const fallbackGeometry = new THREE.BoxGeometry(1, 1, 1);
//         const fallbackMaterial = new THREE.MeshStandardMaterial({
//           color: theme === 'dark' ? 0x808080 : 0xaaaaaa,
//           metalness: 0.3,
//           roughness: 0.4,
//         });
//         const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
//         groupRef.current?.add(fallbackMesh);
//         return;
//       }
//       if (animations?.length > 0) {
//         mixerRef.current = new THREE.AnimationMixer(scene);
//         const action = mixerRef.current.clipAction(animations[0]);
//         action.setEffectiveTimeScale(0.9);
//         action.play();
//       } else {
//         console.warn('No animations found, creating simple animation');
//         const bounce = () => {
//           if (groupRef.current) {
//             groupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
//           }
//         };
//         const animate = () => {
//           bounce();
//           requestAnimationFrame(animate);
//         };
//         animate();
//       }
//       return () => {
//         if (mixerRef.current) {
//           mixerRef.current.stopAllAction();
//           mixerRef.current.uncacheRoot(scene);
//         }
//       };
//     } catch (error) {
//       console.error('Error initializing avatar:', error);
//     }
//   }, [scene, animations, theme]);

//   useFrame((_, delta) => {
//     try {
//       if (mixerRef.current && isSpeaking) {
//         mixerRef.current.update(delta);
//       }
//     } catch (error) {
//       console.error('Error updating animation:', error);
//     }
//   });

//   return (
//     <motion.group
//       ref={groupRef}
//       scale={[1.5, 1.5, 1.5]}
//       position={[0, -1.3, 0]}
//       variants={avatarVariants}
//       animate={isSpeaking ? 'speaking' : 'idle'}
//     >
//       <primitive object={scene} />
//     </motion.group>
//   );
// };

// // Loading Fallback Component
// const LoadingFallback = ({ theme }: { theme: 'light' | 'dark' }) => (
//   <group>
//     <mesh rotation={[0, Math.PI / 4, 0]}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial
//         color={theme === 'dark' ? 'gray' : 'lightgray'}
//         metalness={0.3}
//         roughness={0.4}
//       />
//     </mesh>
//     <pointLight position={[0, 0, 2]} intensity={1} color={theme === 'dark' ? '#0066ff' : '#4b9bff'} />
//   </group>
// );

// // Main ChatBot Component
// const ChatBot = ({ theme: propTheme }: ChatBotProps) => {
//   const { theme: contextTheme } = useTheme();
//   const theme = propTheme || contextTheme;
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: uuidv4(),
//       text: "Hello! I'm Muhammad Ahmad's AI assistant. I'm here to help you connect with a Full Stack Developer and AI/ML expert. Are you reaching out as a company looking to hire or an individual with a project idea? You can also contact Muhammad directly at +923314815161.",
//       isUser: false,
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [voicesLoaded, setVoicesLoaded] = useState(false);
//   const [conversationState, setConversationState] = useState<ConversationState>('greeting');
//   const [projectDetails, setProjectDetails] = useState<ProjectDetails>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const speechQueueRef = useRef<SpeechQueueItem[]>([]);
//   const isSpeakingRef = useRef(false);
//   const hasSpokenFirstMessage = useRef(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Handle responsive design
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Load speech synthesis voices
//   useEffect(() => {
//     const loadVoices = () => {
//       try {
//         const voices = window.speechSynthesis.getVoices();
//         if (voices.length > 0) {
//           setVoicesLoaded(true);
//         }
//       } catch (error) {
//         console.error('Error loading voices:', error);
//         setError('Speech synthesis is not available on this device.');
//       }
//     };
//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//     return () => {
//       window.speechSynthesis.onvoiceschanged = null;
//     };
//   }, []);

//   // Handle canvas resizing
//   useEffect(() => {
//     const handleResize = () => {
//       if (canvasRef.current) {
//         const parent = canvasRef.current.parentElement;
//         if (parent) {
//           canvasRef.current.style.width = '100%';
//           canvasRef.current.style.height = `${parent.clientHeight}px`;
//         }
//       }
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle initial message and input focus
//   useEffect(() => {
//     if (isOpen && voicesLoaded && !hasSpokenFirstMessage.current) {
//       const initialMessage = messages[0]?.text || '';
//       speechQueueRef.current.push({ text: initialMessage, isUser: false });
//       processSpeechQueue();
//       hasSpokenFirstMessage.current = true;
//     }
//     scrollToBottom();
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen, voicesLoaded]);

//   // Reset chat when closing
//   useEffect(() => {
//     if (!isOpen) {
//       resetChat();
//     }
//   }, [isOpen]);

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     try {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
//     } catch (error) {
//       console.error('Error scrolling to bottom:', error);
//     }
//   };

//   // Speech synthesis
//   const speakMessage = (text: string, isUser: boolean, onEnd: () => void) => {
//     try {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = 'en-US';
//       utterance.pitch = isUser ? 1.0 : 1.1;
//       utterance.rate = 0.95;
//       utterance.volume = 0.9;

//       const voices = window.speechSynthesis.getVoices();
//       const preferredVoice = voices.find(
//         (voice) => voice.name.includes('Google US English') || voice.name.includes('Samantha') || voice.name.includes('Victoria')
//       ) || voices[0];
//       utterance.voice = preferredVoice;

//       setIsSpeaking(true);
//       isSpeakingRef.current = true;

//       utterance.onend = () => {
//         setIsSpeaking(false);
//         isSpeakingRef.current = false;
//         onEnd();
//       };

//       utterance.onerror = (event) => {
//         console.error('Speech synthesis error:', event.error);
//         setIsSpeaking(false);
//         isSpeakingRef.current = false;
//         setError('Speech synthesis failed. Please try again.');
//         onEnd();
//       };

//       window.speechSynthesis.speak(utterance);
//     } catch (error) {
//       console.error('Error speaking message:', error);
//       setIsSpeaking(false);
//       isSpeakingRef.current = false;
//       setError('Speech synthesis is not available.');
//       onEnd();
//     }
//   };

//   const processSpeechQueue = () => {
//     if (speechQueueRef.current.length === 0 || isSpeakingRef.current) return;
//     const nextItem = speechQueueRef.current.shift();
//     if (nextItem) {
//       speakMessage(nextItem.text, nextItem.isUser, processSpeechQueue);
//     }
//   };

//   // Submit project details to backend
//   const sendDetailsToDeveloper = async (details: ProjectDetails): Promise<string> => {
//     try {
//       setIsSubmitting(true);
//       if (!details.contactEmail || !isValidEmail(details.contactEmail)) {
//         return 'Please provide a valid contact email (e.g., example@domain.com).';
//       }

//       const payload = details.clientType === 'company'
//         ? {
//             clientType: 'company',
//             companyName: details.companyName!.trim(),
//             positionTitle: details.positionTitle!.trim(),
//             budget: details.budget!.includes('$') ? details.budget!.trim() : `$${details.budget!.trim()}`,
//             timeline: details.timeline!.trim(),
//             requirements: details.requirements!.trim(),
//             contactEmail: details.contactEmail!.trim(),
//           }
//         : {
//             clientType: 'individual',
//             clientName: details.clientName!.trim(),
//             projectType: details.projectType!.trim(),
//             budget: details.budget!.includes('$') ? details.budget!.trim() : `$${details.budget!.trim()}`,
//             timeline: details.timeline!.trim(),
//             requirements: details.requirements!.trim(),
//             contactEmail: details.contactEmail!.trim(),
//           };

//       const endpoint = details.clientType === 'company'
//         ? 'https://portfolio-backend-aeu8.onrender.com/api/hiring-request'
//         : 'https://portfolio-backend-aeu8.onrender.com/api/project-request';

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to submit request');
//       }

//       return details.clientType === 'company'
//         ? 'Your hiring request has been successfully submitted! Muhammad Ahmad will contact you soon at your provided email. You can also reach him at +923314815161.'
//         : 'Your project request has been successfully submitted! Muhammad Ahmad will contact you soon at your provided email. You can also reach him at +923314815161.';
//     } catch (error) {
//       console.error('Error sending details:', error);
//       return 'An error occurred while submitting your request. Please try again or contact Muhammad directly at Ahmadrajpootr1@gmail.com or +923314815161.';
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isValidEmail = (email: string): boolean => {
//     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   };

//   // Handle AI response logic
//   const getAIResponse = (userMessage: string): { response: string; nextState: ConversationState } => {
//     const message = userMessage.toLowerCase().trim();

//     if (!message) {
//       return {
//         response: 'Please provide some details to proceed. Are you a company or an individual? Contact Muhammad at +923314815161.',
//         nextState: conversationState,
//       };
//     }

//     switch (conversationState) {
//       case 'greeting':
//       case 'collecting_client_type':
//         if (message.includes('company') || message.includes('business') || message.includes('organization') || message.includes('hire')) {
//           setProjectDetails((prev) => ({ ...prev, clientType: 'company' }));
//           return { response: "Great! What's the company name?", nextState: 'collecting_company_name' };
//         }
//         setProjectDetails((prev) => ({ ...prev, clientType: 'individual' }));
//         return { response: "Nice to connect! What's your name?", nextState: 'collecting_name' };

//       case 'collecting_company_name':
//         if (userMessage.trim().length < 2) {
//           return { response: 'Please provide a valid company name.', nextState: 'collecting_company_name' };
//         }
//         setProjectDetails((prev) => ({ ...prev, companyName: userMessage }));
//         return { response: `Thanks, ${userMessage}! What's the position title?`, nextState: 'collecting_position_title' };

//       case 'collecting_name':
//         if (userMessage.trim().length < 2) {
//           return { response: 'Please provide a valid name.', nextState: 'collecting_name' };
//         }
//         setProjectDetails((prev) => ({ ...prev, clientName: userMessage }));
//         return { response: `Hi, ${userMessage}! What type of project are you planning?`, nextState: 'collecting_project_type' };

//       case 'collecting_position_title':
//         if (userMessage.trim().length < 3) {
//           return { response: 'Please provide a valid position title.', nextState: 'collecting_position_title' };
//         }
//         setProjectDetails((prev) => ({ ...prev, positionTitle: userMessage }));
//         return { response: `A ${userMessage} role sounds great! What's your budget?`, nextState: 'collecting_budget' };

//       case 'collecting_project_type':
//         if (userMessage.trim().length < 3) {
//           return { response: 'Please provide a valid project type.', nextState: 'collecting_project_type' };
//         }
//         setProjectDetails((prev) => ({ ...prev, projectType: userMessage }));
//         return { response: `A ${userMessage} project sounds exciting! What's your budget?`, nextState: 'collecting_budget' };

//       case 'collecting_budget':
//         if (!/^\$?[0-9,]+(\.[0-9]{1,2})?$/.test(userMessage)) {
//           return { response: 'Please provide a valid budget (e.g., $1,000 or 1000).', nextState: 'collecting_budget' };
//         }
//         setProjectDetails((prev) => ({ ...prev, budget: userMessage }));
//         return { response: "Thanks! What's the timeline for this?", nextState: 'collecting_timeline' };

//       case 'collecting_timeline':
//         if (userMessage.trim().length < 3) {
//           return { response: 'Please provide a valid timeline (e.g., 1 month).', nextState: 'collecting_timeline' };
//         }
//         setProjectDetails((prev) => ({ ...prev, timeline: userMessage }));
//         return { response: 'Got it! What are the specific requirements?', nextState: 'collecting_requirements' };

//       case 'collecting_requirements':
//         if (userMessage.trim().length < 10) {
//           return { response: 'Please provide detailed requirements (at least 10 characters).', nextState: 'collecting_requirements' };
//         }
//         setProjectDetails((prev) => ({ ...prev, requirements: userMessage }));
//         return { response: 'Thanks for the details! Please provide your contact email.', nextState: 'collecting_contact' };

//       case 'collecting_contact':
//         if (!isValidEmail(userMessage)) {
//           return { response: 'Please provide a valid email.', nextState: 'collecting_contact' };
//         }
//         setProjectDetails((prev) => ({ ...prev, contactEmail: userMessage }));
//         sendDetailsToDeveloper({ ...projectDetails, contactEmail: userMessage }).then((response) => {
//           setMessages((prev) => [...prev, { id: uuidv4(), text: response, isUser: false, timestamp: new Date() }]);
//           speechQueueRef.current.push({ text: response, isUser: false });
//           processSpeechQueue();
//         });
//         return { response: 'Submitting your request... Anything else you\'d like to add?', nextState: 'connecting' };

//       case 'connecting':
//         return {
//           response: 'Your request is submitted! Contact Muhammad at Ahmadrajpootr1@gmail.com or +923314815161 if needed. Want to start a new conversation?',
//           nextState: 'greeting',
//         };

//       default:
//         return {
//           response: 'Are you a company looking to hire or an individual with a project idea? Contact Muhammad at +923314815161.',
//           nextState: 'collecting_client_type',
//         };
//     }
//   };

//   // Handle sending messages
//   const handleSendMessage = async () => {
//     if (!inputText.trim() || isSubmitting) return;
//     try {
//       const userMessage: Message = {
//         id: uuidv4(),
//         text: inputText,
//         isUser: true,
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, userMessage]);
//       speechQueueRef.current.push({ text: inputText, isUser: true });
//       setInputText('');
//       setIsTyping(true);
//       processSpeechQueue();

//       setTimeout(() => {
//         const { response, nextState } = getAIResponse(inputText);
//         setMessages((prev) => [...prev, { id: uuidv4(), text: response, isUser: false, timestamp: new Date() }]);
//         speechQueueRef.current.push({ text: response, isUser: false });
//         setConversationState(nextState);
//         setIsTyping(false);
//         processSpeechQueue();
//       }, 1000 + Math.random() * 500);
//     } catch (error) {
//       console.error('Error handling message:', error);
//       setError('An error occurred while processing your message.');
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const resetChat = () => {
//     try {
//       hasSpokenFirstMessage.current = false;
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//       isSpeakingRef.current = false;
//       speechQueueRef.current = [];
//       setConversationState('greeting');
//       setProjectDetails({});
//       setMessages([
//         {
//           id: uuidv4(),
//           text: "Hello! I'm Muhammad Ahmad's AI assistant. I'm here to help you connect with a Full Stack Developer and AI/ML expert. Are you reaching out as a company looking to hire or an individual with a project idea? You can also contact Muhammad directly at +923314815161.",
//           isUser: false,
//           timestamp: new Date(),
//         },
//       ]);
//       setError(null);
//     } catch (error) {
//       console.error('Error resetting chat state:', error);
//       setError('Failed to reset chat. Please try again.');
//     }
//   };

//   const handleContact = () => {
//     window.open('mailto:Ahmadrajpootr1@gmail.com', '_blank');
//   };

//   return (
//     <>
//       <motion.button
//         variants={buttonVariants}
//         initial="initial"
//         whileHover="hover"
//         whileTap="tap"
//         onClick={() => setIsOpen(!isOpen)}
//         className={`fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white dark:text-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 md:p-4 animate-glow`}
//         aria-label={isOpen ? 'Close chat' : 'Open chat'}
//       >
//         {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className={`fixed bottom-16 ${isMobile ? 'left-2 right-2' : 'right-4'} z-40 w-[calc(100%-16px)] max-w-[1200px] bg-transparent p-2 sm:p-4 flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-4 mx-auto max-h-[80vh]`}
//             role="dialog"
//             aria-label="Chatbot interface"
//             aria-live="polite"
//           >
//             {/* Avatar Section */}
//             <div className={`w-full ${isMobile ? 'h-[200px]' : 'md:w-1/2 h-[350px] sm:h-[400px] md:h-[500px]'} rounded-xl shadow-2xl overflow-hidden bg-gray-100/50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30`}>
//               <Canvas
//                 ref={canvasRef}
//                 camera={{ position: [0, 0, 4], fov: 45 }}
//                 gl={{ antialias: true, powerPreference: 'low-power' }}
//                 className="w-full h-full"
//               >
//                 <ambientLight intensity={theme === 'dark' ? 0.6 : 0.8} />
//                 <directionalLight position={[5, 5, 5]} intensity={theme === 'dark' ? 1.2 : 1.5} castShadow />
//                 <pointLight position={[-2, 2, 2]} intensity={0.9} color={theme === 'dark' ? '#0066ff' : '#4b9bff'} />
//                 <pointLight position={[2, 2, 2]} intensity={0.9} color={theme === 'dark' ? '#6600ff' : '#8b5cf6'} />
//                 <Suspense fallback={<LoadingFallback theme={theme} />}>
//                   <ErrorBoundary fallback={<LoadingFallback theme={theme} />}>
//                     <AvatarModel isSpeaking={isSpeaking} theme={theme} />
//                     <OrbitControls
//                       enablePan={false}
//                       enableZoom={false}
//                       minPolarAngle={Math.PI / 2}
//                       maxPolarAngle={Math.PI / 2}
//                       enableDamping
//                       dampingFactor={0.05}
//                     />
//                     <Preload all />
//                   </ErrorBoundary>
//                 </Suspense>
//               </Canvas>
//             </div>

//             {/* Chat Section */}
//             <div className={`w-full ${isMobile ? 'h-[350px]' : 'md:w-1/2 h-[400px] sm:h-[500px] md:h-[500px]'} bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-300/30 dark:border-gray-700/30 flex flex-col animate-glow`}>
//               {/* Header */}
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 p-3 md:p-4 text-white dark:text-gray-100 flex justify-between items-center rounded-t-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-gray-200/20 flex items-center justify-center">
//                     <Bot size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-base md:text-lg">AI Assistant</h3>
//                     <p className="text-xs md:text-sm opacity-80">Connect with Muhammad Ahmad</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     onClick={resetChat}
//                     className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-200/20 transition-colors"
//                     aria-label="Restart conversation"
//                   >
//                     <RefreshCw size={20} />
//                   </motion.button>
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     onClick={() => window.open('tel:+923314815161', '_blank')}
//                     className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-200/20 transition-colors"
//                     aria-label="Call Muhammad"
//                   >
//                     <Phone size={20} />
//                   </motion.button>
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     onClick={handleContact}
//                     className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-200/20 transition-colors"
//                     aria-label="Email Muhammad"
//                   >
//                     <Mail size={20} />
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 dark:scrollbar-thumb-blue-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
//                 {error && (
//                   <motion.div
//                     variants={messageVariants}
//                     initial="initial"
//                     animate="animate"
//                     className="flex gap-3 justify-start"
//                   >
//                     <div className="w-8 h-8 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
//                       <Bot size={18} className="text-white dark:text-gray-100" />
//                     </div>
//                     <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg text-sm md:text-base text-red-900 dark:text-red-100 shadow-md">
//                       {error}
//                     </div>
//                   </motion.div>
//                 )}
//                 {messages.map((message, index) => (
//                   <motion.div
//                     key={message.id}
//                     variants={messageVariants}
//                     initial="initial"
//                     animate="animate"
//                     className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
//                   >
//                     {!message.isUser && (
//                       <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center">
//                         <Bot size={18} className="text-white dark:text-gray-100" />
//                       </div>
//                     )}
//                     <div
//                       className={`max-w-[80%] p-3 rounded-lg text-sm md:text-base ${
//                         message.isUser
//                           ? 'bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100'
//                           : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
//                       } shadow-md`}
//                     >
//                       {message.text}
//                       <div className="text-xs opacity-70 mt-1">
//                         {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                     {message.isUser && (
//                       <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
//                         <User size={18} className="text-white dark:text-gray-100" />
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//                 {isTyping && (
//                   <motion.div
//                     variants={messageVariants}
//                     initial="initial"
//                     animate="animate"
//                     className="flex gap-3 justify-start"
//                   >
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center">
//                       <Bot size={18} className="text-white dark:text-gray-100" />
//                     </div>
//                     <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg">
//                       <div className="flex gap-1.5">
//                         <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" />
//                         <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
//                         <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//                 {isSubmitting && (
//                   <motion.div
//                     variants={messageVariants}
//                     initial="initial"
//                     animate="animate"
//                     className="flex gap-3 justify-start"
//                   >
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center">
//                       <Bot size={18} className="text-white dark:text-gray-100" />
//                     </div>
//                     <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-gray-100 flex items-center gap-3">
//                       <div className="w-5 h-5 border-2 border-blue-400 dark:border-blue-600 border-t-transparent rounded-full animate-spin" />
//                       Submitting...
//                     </div>
//                   </motion.div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Input */}
//               <div className="p-3 md:p-4 border-t border-gray-300 dark:border-gray-700">
//                 <div className="flex gap-3">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder={
//                       conversationState === 'collecting_client_type'
//                         ? 'Company or individual?'
//                         : conversationState === 'collecting_company_name'
//                         ? 'Company name...'
//                         : conversationState === 'collecting_name'
//                         ? 'Your name...'
//                         : conversationState === 'collecting_position_title'
//                         ? 'Position title...'
//                         : conversationState === 'collecting_project_type'
//                         ? 'Project type...'
//                         : conversationState === 'collecting_budget'
//                         ? 'Budget (e.g., $1,000)...'
//                         : conversationState === 'collecting_timeline'
//                         ? 'Timeline (e.g., 1 month)...'
//                         : conversationState === 'collecting_requirements'
//                         ? 'Requirements...'
//                         : conversationState === 'collecting_contact'
//                         ? 'Contact email...'
//                         : 'Your project or hiring needs...'
//                     }
//                     className="flex-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm md:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                     aria-label="Chat input"
//                     disabled={isSubmitting}
//                   />
//                   <motion.button
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     onClick={handleSendMessage}
//                     disabled={!inputText.trim() || isSubmitting}
//                     className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white dark:text-gray-100 p-2 md:p-3 rounded-lg transition-colors"
//                     aria-label="Send message"
//                   >
//                     <Send size={20} />
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx global>{`
//         .scrollbar-thin {
//           scrollbar-width: thin;
//           scrollbar-color: #3b82f6 rgba(0, 0, 0, 0.2);
//         }
//         .dark .scrollbar-thin {
//           scrollbar-color: #3b82f6 rgba(255, 255, 255, 0.1);
//         }
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 8px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.2);
//           border-radius: 4px;
//         }
//         .dark .scrollbar-thin::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #3b82f6;
//           border-radius: 4px;
//         }
//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
//         @keyframes glow {
//           0%, 100% {
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
//           0%, 100% {
//             box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default memo(ChatBot);

import { useState, useRef, useEffect, memo, Suspense } from 'react';
import { MessageCircle, Send, X, User, Bot, RefreshCw, Phone, Mail } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from '../context/ThemeContext';

// Interfaces
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ProjectDetails {
  clientType?: 'company' | 'individual';
  clientName?: string;
  companyName?: string;
  projectType?: string;
  positionTitle?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  contactEmail?: string;
}

type ConversationState =
  | 'greeting'
  | 'collecting_client_type'
  | 'collecting_name'
  | 'collecting_company_name'
  | 'collecting_project_type'
  | 'collecting_position_title'
  | 'collecting_budget'
  | 'collecting_timeline'
  | 'collecting_requirements'
  | 'collecting_contact'
  | 'connecting';

interface SpeechQueueItem {
  text: string;
  isUser: boolean;
}

interface ChatBotProps {
  theme?: 'light' | 'dark';
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: '100vh' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 },
  },
  exit: { opacity: 0, y: '100vh', transition: { duration: 0.4, ease: 'easeInOut' } },
};

const messageVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, type: 'spring', stiffness: 150, damping: 15 },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2, type: 'spring', stiffness: 200 } },
  tap: { scale: 0.9, transition: { duration: 0.1 } },
};

const avatarVariants: Variants = {
  idle: { rotateY: 0, y: 0, transition: { duration: 2, ease: 'easeInOut' } },
  speaking: {
    rotateY: [0, Math.PI * 0.1, -Math.PI * 0.1, 0],
    y: [0, 0.1, 0, -0.1, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const shimmerVariants: Variants = {
  shimmer: {
    backgroundPosition: ['-200%', '200%'],
    transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
  },
};

// Avatar Model Component
const AvatarModel = ({ isSpeaking, theme }: { isSpeaking: boolean; theme: 'light' | 'dark' }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { scene, animations } = useGLTF('/avator.glb', true);

  useEffect(() => {
    try {
      if (!scene) {
        console.warn('GLTF model failed to load, using fallback geometry');
        const fallbackGeometry = new THREE.BoxGeometry(1, 1, 1);
        const fallbackMaterial = new THREE.MeshStandardMaterial({
          color: theme === 'dark' ? 0x808080 : 0xaaaaaa,
          metalness: 0.3,
          roughness: 0.4,
        });
        const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        groupRef.current?.add(fallbackMesh);
        return;
      }
      if (animations?.length > 0) {
        mixerRef.current = new THREE.AnimationMixer(scene);
        const action = mixerRef.current.clipAction(animations[0]);
        action.setEffectiveTimeScale(0.9);
        action.play();
      } else {
        console.warn('No animations found, creating simple animation');
        const bounce = () => {
          if (groupRef.current) {
            groupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
          }
        };
        const animate = () => {
          bounce();
          requestAnimationFrame(animate);
        };
        animate();
      }
      return () => {
        if (mixerRef.current) {
          mixerRef.current.stopAllAction();
          mixerRef.current.uncacheRoot(scene);
        }
      };
    } catch (error) {
      console.error('Error initializing avatar:', error);
    }
  }, [scene, animations, theme]);

  useFrame((_, delta) => {
    try {
      if (mixerRef.current && isSpeaking) {
        mixerRef.current.update(delta);
      }
    } catch (error) {
      console.error('Error updating animation:', error);
    }
  });

  return (
    <motion.group
      ref={groupRef}
      scale={[1.5, 1.5, 1.5]}
      position={[0, -1.3, 0]}
      variants={avatarVariants}
      animate={isSpeaking ? 'speaking' : 'idle'}
    >
      <primitive object={scene} />
    </motion.group>
  );
};

// Loading Fallback Component with Shimmer
const LoadingFallback = ({ theme }: { theme: 'light' | 'dark' }) => (
  <motion.group
    variants={shimmerVariants}
    animate="shimmer"
    style={{
      background: `linear-gradient(90deg, ${theme === 'dark' ? '#444' : '#ddd'} 25%, ${
        theme === 'dark' ? '#666' : '#eee'
      } 50%, ${theme === 'dark' ? '#444' : '#ddd'} 75%)`,
      backgroundSize: '200% 100%',
    }}
  >
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={theme === 'dark' ? 'gray' : 'lightgray'}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
    <pointLight position={[0, 0, 2]} intensity={1} color={theme === 'dark' ? '#0066ff' : '#4b9bff'} />
  </motion.group>
);

// Main ChatBot Component
const ChatBot = ({ theme: propTheme }: ChatBotProps) => {
  const { theme: contextTheme } = useTheme();
  const theme = propTheme || contextTheme;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages
      ? JSON.parse(savedMessages, (key, value) => (key === 'timestamp' ? new Date(value) : value))
      : [
          {
            id: uuidv4(),
            text: "Hello! I'm Muhammad Ahmad's AI assistant. I'm here to help you connect with a Full Stack Developer and AI/ML expert. Are you reaching out as a company looking to hire or an individual with a project idea? You can also contact Muhammad directly at +923314815161.",
            isUser: false,
            timestamp: new Date(),
          },
        ];
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>(
    (localStorage.getItem('conversationState') as ConversationState) || 'greeting'
  );
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>(
    JSON.parse(localStorage.getItem('projectDetails') || '{}')
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechQueueRef = useRef<SpeechQueueItem[]>([]);
  const isSpeakingRef = useRef(false);
  const hasSpokenFirstMessage = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    localStorage.setItem('conversationState', conversationState);
    localStorage.setItem('projectDetails', JSON.stringify(projectDetails));
  }, [messages, conversationState, projectDetails]);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        } else {
          setError('Speech synthesis voices not available. Some features may be limited.');
        }
      } catch (error) {
        console.error('Error loading voices:', error);
        setError('Speech synthesis is not supported on this device.');
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Handle canvas resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.style.width = '100%';
          canvasRef.current.style.height = `${parent.clientHeight}px`;
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle initial message and input focus
  useEffect(() => {
    if (isOpen && voicesLoaded && !hasSpokenFirstMessage.current) {
      const initialMessage = messages[0]?.text || '';
      speechQueueRef.current.push({ text: initialMessage, isUser: false });
      processSpeechQueue();
      hasSpokenFirstMessage.current = true;
    }
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, voicesLoaded]);

  // Reset chat when closing
  useEffect(() => {
    if (!isOpen) {
      resetChat();
    }
  }, [isOpen]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } catch (error) {
      console.error('Error scrolling to bottom:', error);
    }
  };

  // Speech synthesis
  const speakMessage = (text: string, isUser: boolean, onEnd: () => void) => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = isUser ? 1.0 : 1.1;
      utterance.rate = 0.95;
      utterance.volume = 0.9;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) => voice.name.includes('Google US English') || voice.name.includes('Samantha') || voice.name.includes('Victoria')
      ) || voices[0];
      utterance.voice = preferredVoice;

      setIsSpeaking(true);
      isSpeakingRef.current = true;

      utterance.onend = () => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        onEnd();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        setError('Speech synthesis failed. Please try again or use text input.');
        onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking message:', error);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setError('Speech synthesis is not supported on this device.');
      onEnd();
    }
  };

  const processSpeechQueue = () => {
    if (speechQueueRef.current.length === 0 || isSpeakingRef.current) return;
    const nextItem = speechQueueRef.current.shift();
    if (nextItem) {
      speakMessage(nextItem.text, nextItem.isUser, processSpeechQueue);
    }
  };

  // Submit project details to backend
  const sendDetailsToDeveloper = async (details: ProjectDetails): Promise<string> => {
    try {
      setIsSubmitting(true);
      if (!details.contactEmail || !isValidEmail(details.contactEmail)) {
        return 'Please provide a valid contact email (e.g., example@domain.com).';
      }

      const payload = details.clientType === 'company'
        ? {
            clientType: 'company',
            companyName: details.companyName!.trim(),
            positionTitle: details.positionTitle!.trim(),
            budget: details.budget!.includes('$') ? details.budget!.trim() : `$${details.budget!.trim()}`,
            timeline: details.timeline!.trim(),
            requirements: details.requirements!.trim(),
            contactEmail: details.contactEmail!.trim(),
          }
        : {
            clientType: 'individual',
            clientName: details.clientName!.trim(),
            projectType: details.projectType!.trim(),
            budget: details.budget!.includes('$') ? details.budget!.trim() : `$${details.budget!.trim()}`,
            timeline: details.timeline!.trim(),
            requirements: details.requirements!.trim(),
            contactEmail: details.contactEmail!.trim(),
          };

      const endpoint = details.clientType === 'company'
        ? 'https://portfolio-backend-aeu8.onrender.com/api/hiring-request'
        : 'https://portfolio-backend-aeu8.onrender.com/api/project-request';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit request');
      }

      return details.clientType === 'company'
        ? 'Your hiring request has been successfully submitted! Muhammad Ahmad will contact you soon at your provided email. You can also reach him at +923314815161.'
        : 'Your project request has been successfully submitted! Muhammad Ahmad will contact you soon at your provided email. You can also reach him at +923314815161.';
    } catch (error) {
      console.error('Error sending details:', error);
      setError('Failed to submit your request. Please try again or contact Muhammad directly.');
      return 'An error occurred while submitting your request. Please try again or contact Muhammad directly at Ahmadrajpootr1@gmail.com or +923314815161.';
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // Handle AI response logic
  const getAIResponse = (userMessage: string): { response: string; nextState: ConversationState } => {
    const message = userMessage.toLowerCase().trim();

    if (!message) {
      return {
        response: 'Please provide some details to proceed. Are you a company or an individual? Contact Muhammad at +923314815161.',
        nextState: conversationState,
      };
    }

    switch (conversationState) {
      case 'greeting':
      case 'collecting_client_type':
        if (message.includes('company') || message.includes('business') || message.includes('organization') || message.includes('hire')) {
          setProjectDetails((prev) => ({ ...prev, clientType: 'company' }));
          return { response: "Great! What's the company name?", nextState: 'collecting_company_name' };
        }
        setProjectDetails((prev) => ({ ...prev, clientType: 'individual' }));
        return { response: "Nice to connect! What's your name?", nextState: 'collecting_name' };

      case 'collecting_company_name':
        if (userMessage.trim().length < 2) {
          return { response: 'Please provide a valid company name (at least 2 characters).', nextState: 'collecting_company_name' };
        }
        setProjectDetails((prev) => ({ ...prev, companyName: userMessage }));
        return { response: `Thanks, ${userMessage}! What's the position title?`, nextState: 'collecting_position_title' };

      case 'collecting_name':
        if (userMessage.trim().length < 2) {
          return { response: 'Please provide a valid name (at least 2 characters).', nextState: 'collecting_name' };
        }
        setProjectDetails((prev) => ({ ...prev, clientName: userMessage }));
        return { response: `Hi, ${userMessage}! What type of project are you planning?`, nextState: 'collecting_project_type' };

      case 'collecting_position_title':
        if (userMessage.trim().length < 3) {
          return { response: 'Please provide a valid position title (at least 3 characters).', nextState: 'collecting_position_title' };
        }
        setProjectDetails((prev) => ({ ...prev, positionTitle: userMessage }));
        return { response: `A ${userMessage} role sounds great! What's your budget?`, nextState: 'collecting_budget' };

      case 'collecting_project_type':
        if (userMessage.trim().length < 3) {
          return { response: 'Please provide a valid project type (at least 3 characters).', nextState: 'collecting_project_type' };
        }
        setProjectDetails((prev) => ({ ...prev, projectType: userMessage }));
        return { response: `A ${userMessage} project sounds exciting! What's your budget?`, nextState: 'collecting_budget' };

      case 'collecting_budget':
        if (!/^\$?[0-9,]+(\.[0-9]{1,2})?$/.test(userMessage)) {
          return { response: 'Please provide a valid budget (e.g., $1,000 or 1000).', nextState: 'collecting_budget' };
        }
        setProjectDetails((prev) => ({ ...prev, budget: userMessage }));
        return { response: "Thanks! What's the timeline for this?", nextState: 'collecting_timeline' };

      case 'collecting_timeline':
        if (userMessage.trim().length < 3) {
          return { response: 'Please provide a valid timeline (e.g., 1 month).', nextState: 'collecting_timeline' };
        }
        setProjectDetails((prev) => ({ ...prev, timeline: userMessage }));
        return { response: 'Got it! What are the specific requirements?', nextState: 'collecting_requirements' };

      case 'collecting_requirements':
        if (userMessage.trim().length < 10) {
          return { response: 'Please provide detailed requirements (at least 10 characters).', nextState: 'collecting_requirements' };
        }
        setProjectDetails((prev) => ({ ...prev, requirements: userMessage }));
        return { response: 'Thanks for the details! Please provide your contact email.', nextState: 'collecting_contact' };

      case 'collecting_contact':
        if (!isValidEmail(userMessage)) {
          return { response: 'Please provide a valid email (e.g., example@domain.com).', nextState: 'collecting_contact' };
        }
        setProjectDetails((prev) => ({ ...prev, contactEmail: userMessage }));
        sendDetailsToDeveloper({ ...projectDetails, contactEmail: userMessage }).then((response) => {
          setMessages((prev) => [...prev, { id: uuidv4(), text: response, isUser: false, timestamp: new Date() }]);
          speechQueueRef.current.push({ text: response, isUser: false });
          processSpeechQueue();
        });
        return { response: 'Submitting your request... Anything else you\'d like to add?', nextState: 'connecting' };

      case 'connecting':
        return {
          response: 'Your request is submitted! Contact Muhammad at Ahmadrajpootr1@gmail.com or +923314815161 if needed. Want to start a new conversation?',
          nextState: 'greeting',
        };

      default:
        return {
          response: 'Are you a company looking to hire or an individual with a project idea? Contact Muhammad at +923314815161.',
          nextState: 'collecting_client_type',
        };
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputText.trim() || isSubmitting) return;
    try {
      setError(null);
      const userMessage: Message = {
        id: uuidv4(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      speechQueueRef.current.push({ text: inputText, isUser: true });
      setInputText('');
      setIsTyping(true);
      processSpeechQueue();

      setTimeout(() => {
        const { response, nextState } = getAIResponse(inputText);
        setMessages((prev) => [...prev, { id: uuidv4(), text: response, isUser: false, timestamp: new Date() }]);
        speechQueueRef.current.push({ text: response, isUser: false });
        setConversationState(nextState);
        setIsTyping(false);
        processSpeechQueue();
      }, 800 + Math.random() * 400);
    } catch (error) {
      console.error('Error handling message:', error);
      setError('Failed to process your message. Please try again.');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    try {
      hasSpokenFirstMessage.current = false;
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      speechQueueRef.current = [];
      setConversationState('greeting');
      setProjectDetails({});
      setMessages([
        {
          id: uuidv4(),
          text: "Hello! I'm Muhammad Ahmad's AI assistant. I'm here to help you connect with a Full Stack Developer and AI/ML expert. Are you reaching out as a company looking to hire or an individual with a project idea? You can also contact Muhammad directly at +923314815161.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setError(null);
      localStorage.removeItem('chatMessages');
      localStorage.removeItem('conversationState');
      localStorage.removeItem('projectDetails');
    } catch (error) {
      console.error('Error resetting chat state:', error);
      setError('Failed to reset chat. Please try again.');
    }
  };

  const handleContact = () => {
    window.open('mailto:Ahmadrajpootr1@gmail.com', '_blank');
  };

  return (
    <>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 sm:p-4 animate-glow"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-16 ${isMobile ? 'left-2 right-2' : 'right-4'} z-40 w-[calc(100%-16px)] max-w-[1200px] p-2 sm:p-4 flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-4 mx-auto max-h-[80vh]`}
            role="dialog"
            aria-label="Chatbot interface"
            aria-live="polite"
          >
            {/* Avatar Section */}
            <div className={`w-full ${isMobile ? 'h-[180px]' : 'md:w-1/2 h-[300px] sm:h-[350px] md:h-[450px]'} rounded-xl shadow-2xl overflow-hidden bg-gray-100/50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30`}>
              <Canvas
                ref={canvasRef}
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{ antialias: true, powerPreference: 'low-power' }}
                className="w-full h-full"
                performance={{ min: 0.5 }}
              >
                <ambientLight intensity={theme === 'dark' ? 0.6 : 0.8} />
                <directionalLight position={[5, 5, 5]} intensity={theme === 'dark' ? 1.2 : 1.5} castShadow />
                <pointLight position={[-2, 2, 2]} intensity={0.9} color={theme === 'dark' ? '#0066ff' : '#4b9bff'} />
                <pointLight position={[2, 2, 2]} intensity={0.9} color={theme === 'dark' ? '#6600ff' : '#8b5cf6'} />
                <Suspense fallback={<LoadingFallback theme={theme} />}>
                  <ErrorBoundary fallback={<LoadingFallback theme={theme} />}>
                    <AvatarModel isSpeaking={isSpeaking} theme={theme} />
                    <OrbitControls
                      enablePan={false}
                      enableZoom={false}
                      minPolarAngle={Math.PI / 2}
                      maxPolarAngle={Math.PI / 2}
                      enableDamping
                      dampingFactor={0.05}
                    />
                    <Preload all />
                  </ErrorBoundary>
                </Suspense>
              </Canvas>
            </div>

            {/* Chat Section */}
            <div className={`w-full ${isMobile ? 'h-[300px]' : 'md:w-1/2 h-[350px] sm:h-[400px] md:h-[450px]'} bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-300/30 dark:border-gray-700/30 flex flex-col animate-glow`}>
              {/* Header */}
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 p-3 sm:p-4 text-white flex justify-between items-center rounded-t-xl"
                variants={shimmerVariants}
                animate="shimmer"
                style={{
                  background: `linear-gradient(90deg, ${theme === 'dark' ? '#4b5bff' : '#3b82f6'} 25%, ${
                    theme === 'dark' ? '#6b7280' : '#93c5fd'
                  } 50%, ${theme === 'dark' ? '#4b5bff' : '#3b82f6'} 75%)`,
                  backgroundSize: '200% 100%',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-gray-200/20 flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">AI Assistant</h3>
                    <p className="text-xs sm:text-sm opacity-80">Connect with Muhammad Ahmad</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={resetChat}
                    className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-200/20 transition-colors"
                    aria-label="Restart conversation"
                  >
                    <RefreshCw size={20} />
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => window.open('tel:+923314815161', '_blank')}
                    className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-200/20 transition-colors"
                    aria-label="Call Muhammad"
                  >
                    <Phone size={20} />
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleContact}
                    className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-200/20 transition-colors"
                    aria-label="Email Muhammad"
                  >
                    <Mail size={20} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 dark:scrollbar-thumb-blue-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
                {error && (
                  <motion.div
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                      <Bot size={18} className="text-white dark:text-gray-100" />
                    </div>
                    <motion.div
                      className="max-w-[80%] p-3 rounded-lg text-sm sm:text-base bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 shadow-md"
                      variants={shimmerVariants}
                      animate="shimmer"
                      style={{
                        background: `linear-gradient(90deg, ${theme === 'dark' ? '#991b1b' : '#fecaca'} 25%, ${
                          theme === 'dark' ? '#b91c1c' : '#f87171'
                        } 50%, ${theme === 'dark' ? '#991b1b' : '#fecaca'} 75%)`,
                        backgroundSize: '200% 100%',
                      }}
                    >
                      {error}
                    </motion.div>
                  </motion.div>
                )}
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center">
                        <Bot size={18} className="text-white dark:text-gray-100" />
                      </div>
                    )}
                    <motion.div
                      className={`max-w-[80%] p-3 rounded-lg text-sm sm:text-base ${
                        message.isUser
                          ? 'bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      } shadow-md`}
                      variants={shimmerVariants}
                      animate={message.isUser ? undefined : 'shimmer'}
                      style={{
                        background: message.isUser
                          ? undefined
                          : `linear-gradient(90deg, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 25%, ${
                              theme === 'dark' ? '#4b5563' : '#d1d5db'
                            } 50%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 75%)`,
                        backgroundSize: '200% 100%',
                      }}
                    >
                      {message.text}
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </motion.div>
                    {message.isUser && (
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <User size={18} className="text-white dark:text-gray-100" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center">
                      <Bot size={18} className="text-white dark:text-gray-100" />
                    </div>
                    <motion.div
                      className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg"
                      variants={shimmerVariants}
                      animate="shimmer"
                      style={{
                        background: `linear-gradient(90deg, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 25%, ${
                          theme === 'dark' ? '#4b5563' : '#d1d5db'
                        } 50%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 75%)`,
                        backgroundSize: '200% 100%',
                      }}
                    >
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                {isSubmitting && (
                  <motion.div
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center">
                      <Bot size={18} className="text-white dark:text-gray-100" />
                    </div>
                    <motion.div
                      className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-gray-100 flex items-center gap-3"
                      variants={shimmerVariants}
                      animate="shimmer"
                      style={{
                        background: `linear-gradient(90deg, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 25%, ${
                          theme === 'dark' ? '#4b5563' : '#d1d5db'
                        } 50%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 75%)`,
                        backgroundSize: '200% 100%',
                      }}
                    >
                      <div className="w-5 h-5 border-2 border-blue-400 dark:border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </motion.div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <motion.div
                className="p-3 sm:p-4 border-t border-gray-300 dark:border-gray-700"
                variants={shimmerVariants}
                animate="shimmer"
                style={{
                  background: `linear-gradient(90deg, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 25%, ${
                    theme === 'dark' ? '#4b5563' : '#d1d5db'
                  } 50%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 75%)`,
                  backgroundSize: '200% 100%',
                }}
              >
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      conversationState === 'collecting_client_type'
                        ? 'Company or individual?'
                        : conversationState === 'collecting_company_name'
                        ? 'Company name...'
                        : conversationState === 'collecting_name'
                        ? 'Your name...'
                        : conversationState === 'collecting_position_title'
                        ? 'Position title...'
                        : conversationState === 'collecting_project_type'
                        ? 'Project type...'
                        : conversationState === 'collecting_budget'
                        ? 'Budget (e.g., $1,000)...'
                        : conversationState === 'collecting_timeline'
                        ? 'Timeline (e.g., 1 month)...'
                        : conversationState === 'collecting_requirements'
                        ? 'Requirements...'
                        : conversationState === 'collecting_contact'
                        ? 'Contact email...'
                        : 'Your project or hiring needs...'
                    }
                    className="flex-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    aria-label="Chat input"
                    disabled={isSubmitting}
                  />
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isSubmitting}
                    className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 sm:p-3 rounded-lg transition-colors"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 rgba(0, 0, 0, 0.2);
        }
        .dark .scrollbar-thin {
          scrollbar-color: #3b82f6 rgba(255, 255, 255, 0.1);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% {
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
          0%, 100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </>
  );
};

export default memo(ChatBot);