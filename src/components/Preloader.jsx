import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

const FloatingBlob = ({ color, size, initialPos, duration, delay }) => (
  <motion.div
    initial={initialPos}
    animate={{
      x: [initialPos.x, initialPos.x + 80, initialPos.x - 50, initialPos.x],
      y: [initialPos.y, initialPos.y - 60, initialPos.y + 100, initialPos.y],
      scale: [1, 1.2, 0.8, 1],
      backgroundColor: [color, "var(--color-purple)", "var(--color-teal)", color],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    style={{
      width: size,
      height: size,
      filter: 'blur(100px)',
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.12,
    }}
  />
);

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const rotateX = useTransform(springY, [-20, 20], [5, -5]);
  const rotateY = useTransform(springX, [-20, 20], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 22);

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(progressTimer);
      clearTimeout(exitTimer);
    };
  }, [mouseX, mouseY]);

  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }
    }
  };

  const contentVariants = {
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "anticipate"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          exit="exit"
          className="fixed inset-0 z-[1001] flex items-center justify-center bg-paper overflow-hidden"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />

          {/* Interactive Cinematic Background */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingBlob color="var(--color-teal)" size="70vw" initialPos={{ x: -100, y: -100 }} duration={18} delay={0} />
            <FloatingBlob color="var(--color-purple)" size="60vw" initialPos={{ x: 700, y: 100 }} duration={22} delay={2} />
            <FloatingBlob color="var(--color-teal)" size="50vw" initialPos={{ x: 200, y: 700 }} duration={25} delay={4} />
          </div>

          <motion.div 
            style={{ 
              x: springX, 
              y: springY,
              rotateX: rotateX,
              rotateY: rotateY,
              perspective: 1000
            }}
            className="relative z-10 flex flex-col items-center"
            variants={contentVariants}
            exit="exit"
          >
            {/* Elegant Brand Logo Animation */}
            <div className="relative mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <h1 className="text-7xl md:text-9xl font-display italic text-charcoal tracking-tighter select-none flex items-baseline">
                  Live 
                  <span className="text-teal relative ml-4">
                    Art
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-2 left-0 right-0 h-[8px] bg-gradient-to-r from-teal to-purple blur-[1px] rounded-full origin-left"
                    />
                  </span>
                </h1>
                
                {/* Ethereal Glow */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-purple/10 blur-[60px] -z-10 rounded-full"
                />
              </motion.div>
            </div>

            {/* Premium Loader Info */}
            <div className="flex flex-col items-center gap-10 w-72">
              <div className="relative w-full h-[3px] bg-charcoal/5 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal via-purple to-teal"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  style={{ backgroundSize: '200% 100%' }}
                />
              </div>

              <div className="flex flex-col items-center gap-3">
                <motion.span 
                  initial={{ opacity: 0, tracking: '0.2em' }}
                  animate={{ opacity: 1, tracking: '0.8em' }}
                  transition={{ duration: 2 }}
                  className="text-[10px] uppercase font-bold text-teal/40"
                >
                  Brewing Creativity
                </motion.span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display italic text-charcoal/70">{progress}</span>
                  <span className="text-[12px] font-sans text-charcoal/20 font-medium">%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Corner Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-8 border border-charcoal/5 pointer-events-none rounded-sm"
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-teal/20" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-teal/20" />
          </motion.div>

          {/* Liquid Splash Transition Mask (for the exit) */}
          <motion.div
            style={{ scaleY: 0 }}
            variants={{
              exit: {
                scaleY: 1,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              }
            }}
            className="absolute inset-0 bg-teal pointer-events-none origin-bottom opacity-5 z-[1002]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

