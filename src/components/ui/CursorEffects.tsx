import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from '@emotion/styled';

const CursorContainer = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
`;

const CursorRing = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
`;

const CursorEffects: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  
  // Using lighter spring configuration
  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
      cursorScale.set(1.5);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      cursorScale.set(1);
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, cursorScale]);
  
  return (
    <>
      <CursorContainer>
        <CursorDot
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            scale: cursorScaleSpring,
          }}
        />
        <CursorRing
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            scale: cursorScaleSpring,
          }}
        />
      </CursorContainer>
    </>
  );
};

export default CursorEffects; 