import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-firozi pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isPointer ? 2.5 : 1,
          backgroundColor: isPointer ? 'rgba(0, 206, 209, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-firozi pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: useSpring(mouseX, { damping: 15, stiffness: 600 }),
          y: useSpring(mouseY, { damping: 15, stiffness: 600 }),
          left: 12,
          top: 12,
          scale: isPointer ? 0 : 1,
        }}
      />
    </>
  );
};
