import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

// Artistic symbols for the loader
const PaletteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.301c5.523 0 10-4.477 10-10C22 5.301 18 1 12 1S2 5.301 2 10.301c0 5.523 4.477 10 10 10z" />
    <path d="M8.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M5.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" fillOpacity="0.3"/>
    <path d="M5.5 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" fillOpacity="0.4"/>
    <path d="M10.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" fillOpacity="0.5"/>
  </svg>
);

const CandleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8" />
    <path d="M9 13a3 3 0 0 1 6 0v7a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-7z" />
    <path d="M12 2v3" strokeWidth="2" stroke="var(--color-firozi)"/>
    <circle cx="12" cy="7" r="2" fill="var(--color-firozi)" fillOpacity="0.3" />
  </svg>
);

const Sparkle = ({ delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 0], 
      opacity: [0, 1, 0],
      rotate: [0, 45, 90]
    }}
    transition={{ 
      duration: 1.5, 
      delay, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute w-2 h-2 bg-gradient-to-tr from-firozi to-white rounded-full blur-[1px]"
  />
);

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3800); // Increased slightly for better visual storytelling
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const tagline = "Where Events Come to Life";
  const subline = "Interactive DIY Stations";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "circIn" }
          }}
          className="fixed inset-0 z-[1001] flex items-center justify-center bg-snow overflow-hidden"
        >
          {/* Enhanced Background Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />

          {/* Interactive Artistic Background */}
          <motion.div 
            style={{ x: springX.get() * 50, y: springY.get() * 50 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 20, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[100vw] h-[100vw] rounded-full bg-firozi/20 blur-[150px]"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.25, 0.15],
                x: [0, -30, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-[100vw] h-[100vw] rounded-full bg-ocean/15 blur-[150px]"
            />
          </motion.div>

          {/* Drifting Ink Drops */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + 'vw', 
                y: '-20vh',
                scale: 0.5 + Math.random()
              }}
              animate={{ 
                y: '120vh',
                x: `calc(${Math.random() * 100}vw + ${(i - 4) * 20}px)`,
                rotate: 360
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "linear"
              }}
              className={`absolute w-32 h-32 rounded-full opacity-[0.05] filter blur-3xl ${i % 2 === 0 ? 'bg-firozi' : 'bg-ocean'}`}
            />
          ))}

          <div className="relative flex flex-col items-center max-w-[90vw]">
            {/* The Signature SVG */}
            <div className="relative mb-8">
              <svg 
                viewBox="0 0 400 120" 
                className="w-full max-w-[350px] md:max-w-[500px] h-auto drop-shadow-2xl"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="brush-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-ocean)" />
                    <stop offset="50%" stopColor="var(--color-firozi)" />
                    <stop offset="100%" stopColor="var(--color-ocean)" />
                  </linearGradient>
                  <filter id="brush-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* L */}
                <motion.path
                  d="M40,20 L40,80 L80,80"
                  stroke="url(#brush-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#brush-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                
                {/* i */}
                <motion.path
                  d="M100,45 L100,80"
                  stroke="url(#brush-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
                <motion.circle
                  cx="100" cy="31" r="5"
                  fill="var(--color-firozi)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 1.4 }}
                />

                {/* v */}
                <motion.path
                  d="M120,45 L140,80 L160,45"
                  stroke="url(#brush-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />

                {/* e */}
                <motion.path
                  d="M180,65 L220,65 C220,65 220,40 200,40 C180,40 180,80 200,80 C215,80 220,70 220,70"
                  stroke="url(#brush-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.8 }}
                />

                {/* Art (The bold finishing touch) */}
                <motion.path
                  d="M250,80 Q290,10 330,80 M265,60 Q290,60 315,60"
                  stroke="var(--color-ink)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 2.5, ease: "anticipate" }}
                />
              </svg>

              {/* Decorative elements around the logo */}
              <div className="absolute top-0 right-0">
                <Sparkle delay={0} />
              </div>
              <div className="absolute bottom-4 left-10">
                <Sparkle delay={0.5} />
              </div>
            </div>

            {/* Artistic Symbols - Floating and breathing */}
            <div className="flex gap-12 mb-12">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-firozi/40"
              >
                <PaletteIcon />
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="text-ocean/40"
              >
                <CandleIcon />
              </motion.div>
            </div>

            {/* Premium Text Reveal */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center overflow-hidden h-8">
                {tagline.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.8 + index * 0.04, duration: 0.5 }}
                    className="text-lg md:text-xl font-display italic text-ink/80 whitespace-pre"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Elegant Progress Line */}
              <div className="w-48 h-[1px] relative">
                <div className="absolute inset-0 bg-ink/10" />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.5, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-firozi to-transparent origin-left"
                />
              </div>

              <div className="flex flex-wrap justify-center overflow-hidden">
                {subline.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.2 + index * 0.03, duration: 0.3 }}
                    className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-ocean/50 whitespace-pre"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Creative border decorations */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-4 border border-ink/5 pointer-events-none rounded-sm"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-firozi/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-firozi/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-firozi/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-firozi/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

