import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

// Artistic symbols for the loader
const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.301c5.523 0 10-4.477 10-10C22 5.301 18 1 12 1S2 5.301 2 10.301c0 5.523 4.477 10 10 10z" />
    <path d="M8.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M5.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M5.5 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M10.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

const CandleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8" />
    <path d="M9 13a3 3 0 0 1 6 0v7a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-7z" />
    <path d="M12 2v3" />
    <path d="M12 5a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0V7a2 2 0 0 1 2-2z" />
  </svg>
);

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200); // Animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-snow"
        >
          {/* Animated Background Splashes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1.5], 
                opacity: [0, 0.4, 0],
                x: ['-20%', '10%', '20%'],
                y: ['-20%', '10%', '-10%']
              }}
              transition={{ duration: 3, times: [0, 0.5, 1], ease: "easeOut" }}
              className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-firozi/30 blur-[120px]"
            />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1.5], 
                opacity: [0, 0.3, 0],
                x: ['20%', '-10%', '-20%'],
                y: ['20%', '-10%', '10%']
              }}
              transition={{ duration: 3, delay: 0.4, times: [0, 0.5, 1], ease: "easeOut" }}
              className="absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-ocean/20 blur-[120px]"
            />
            
            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0], 
                  scale: [0, 1.5, 0],
                  x: [Math.random() * 100 - 50 + 'vw', Math.random() * 100 - 50 + 'vw'],
                  y: [Math.random() * 100 - 50 + 'vh', Math.random() * 100 - 50 + 'vh']
                }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-firozi' : 'bg-ocean'} blur-sm`}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center px-6">
            {/* Artistic Floating Icons */}
            <div className="absolute -top-32 md:-top-24 flex gap-16 md:gap-12 text-ink/10">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="scale-150 md:scale-100"
              >
                <PaletteIcon />
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="scale-150 md:scale-100"
              >
                <CandleIcon />
              </motion.div>
            </div>

            {/* The "Drawing" Logo */}
            <div className="relative">
              <svg 
                viewBox="0 0 400 120" 
                className="w-full max-w-[320px] md:max-w-[450px] h-auto overflow-visible"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-ocean)" />
                    <stop offset="100%" stopColor="var(--color-firozi)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* stylized "LiveArt" Signature Draw */}
                {/* L */}
                <motion.path
                  d="M40,20 L40,80 L80,80"
                  stroke="url(#loader-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                {/* i */}
                <motion.path
                  d="M100,45 L100,80 M100,30 L100,32"
                  stroke="url(#loader-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
                />
                {/* v */}
                <motion.path
                  d="M120,45 L140,80 L160,45"
                  stroke="url(#loader-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: "easeInOut" }}
                />
                {/* e */}
                <motion.path
                  d="M180,65 L220,65 C220,65 220,40 200,40 C180,40 180,80 200,80 C215,80 220,70 220,70"
                  stroke="url(#loader-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
                />
                {/* Art (simplified) */}
                <motion.path
                  d="M250,80 L290,20 L330,80 M270,60 L310,60"
                  stroke="var(--color-ink)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 2.2, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* Progress Bar */}
            <div className="mt-12 w-64 h-[3px] bg-ink/5 rounded-full relative overflow-hidden backdrop-blur-sm">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '0%' }}
                transition={{ duration: 2.8, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 bg-gradient-to-r from-ocean via-firozi to-ocean"
              />
            </div>

            {/* Tagline Animation */}
            <div className="mt-6 flex flex-col items-center gap-2 overflow-hidden">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="text-sm font-display italic text-ink/60"
              >
                Where Events Come to Life
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 2.8, duration: 1 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-firozi/50 to-transparent"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="text-[10px] uppercase tracking-[0.4em] text-ink/30 font-bold"
              >
                Interactive DIY Stations
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
