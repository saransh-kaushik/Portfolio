import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const StarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  background: transparent;
`;

const Star = styled(motion.div)<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(0.5px);
  opacity: 1;
  z-index: 2;
`;

const StarCluster = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const StarryBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Generate stars
  const stars = React.useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
      speed: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 2 + 1,
    }));
  }, []);
  
  // Generate star clusters
  const clusters = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 100,
      stars: Array.from({ length: 30 }).map((_, j) => ({
        id: j,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`,
      })),
    }));
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <StarContainer ref={containerRef}>
      {/* Individual stars */}
      {stars.map(star => (
        <Star
          key={`star-${star.id}`}
          size={star.size}
          color={star.color}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            x: springX,
            y: springY,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.twinkleSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Star clusters */}
      {clusters.map(cluster => (
        <StarCluster
          key={`cluster-${cluster.id}`}
          style={{
            left: `${cluster.x}%`,
            top: `${cluster.y}%`,
            x: springX,
            y: springY,
          }}
        >
          {cluster.stars.map(star => (
            <Star
              key={`cluster-star-${star.id}`}
              size={star.size}
              color={star.color}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </StarCluster>
      ))}
    </StarContainer>
  );
};

export default StarryBackground; 