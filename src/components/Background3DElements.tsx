import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Styled components for 3D decorative elements
const FloatingCube = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(78, 205, 196, 0.15);
  border: 1px solid rgba(78, 205, 196, 0.3);
  border-radius: 2px;
  transform-style: preserve-3d;
  backdrop-filter: blur(4px);
  z-index: -1;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(78, 205, 196, 0.3);
    border-radius: 2px;
  }
  
  &:before {
    transform: translateZ(-10px);
    background: rgba(78, 205, 196, 0.05);
  }
  
  &:after {
    transform: translateZ(10px);
    background: rgba(78, 205, 196, 0.1);
  }
`;

const FloatingSphere = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(123, 228, 149, 0.1), rgba(123, 228, 149, 0.05));
  border: 1px solid rgba(123, 228, 149, 0.2);
  box-shadow: 0 0 20px rgba(123, 228, 149, 0.1);
  backdrop-filter: blur(4px);
  z-index: -1;
`;

const FloatingRing = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(135, 206, 235, 0.2);
  background: transparent;
  box-shadow: 0 0 10px rgba(135, 206, 235, 0.1);
  z-index: -1;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 70%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid rgba(135, 206, 235, 0.3);
  }
`;

const Dot = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--primary-color);
  opacity: 0.5;
  z-index: -1;
`;

const Line = styled(motion.div)`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, rgba(78, 205, 196, 0), rgba(78, 205, 196, 0.3), rgba(78, 205, 196, 0));
  z-index: -1;
`;

// Main component for 3D decorative elements
const Background3DElements = () => {
  // Generate floating cube elements
  const cubes = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: `cube-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 15,
      rotation: Math.random() * 360,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, []);
  
  // Generate floating sphere elements
  const spheres = useMemo(() => {
    return Array.from({ length: 2 }).map((_, i) => ({
      id: `sphere-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 5,
    }));
  }, []);
  
  // Generate floating ring elements
  const rings = useMemo(() => {
    return Array.from({ length: 2 }).map((_, i) => ({
      id: `ring-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 30,
      rotation: Math.random() * 360,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 5,
    }));
  }, []);
  
  // Generate small dots (stars)
  const dots = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `dot-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      scale: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);
  
  // Generate lines (connections)
  const lines = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: `line-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 150 + 50,
      rotation: Math.random() * 180,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
    }));
  }, []);
  
  return (
    <>
      {/* Floating cubes */}
      {cubes.map((cube) => (
        <FloatingCube
          key={cube.id}
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: `${cube.size}px`,
            height: `${cube.size}px`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: cube.duration * 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: cube.delay,
          }}
        />
      ))}
      
      {/* Floating spheres */}
      {spheres.map((sphere) => (
        <FloatingSphere
          key={sphere.id}
          style={{
            left: `${sphere.x}%`,
            top: `${sphere.y}%`,
            width: `${sphere.size}px`,
            height: `${sphere.size}px`,
          }}
          animate={{
            y: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: sphere.duration * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sphere.delay,
          }}
        />
      ))}
      
      {/* Floating rings */}
      {rings.map((ring) => (
        <FloatingRing
          key={ring.id}
          style={{
            left: `${ring.x}%`,
            top: `${ring.y}%`,
            width: `${ring.size}px`,
            height: `${ring.size}px`,
          }}
          animate={{
            rotate: [0, 180],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: ring.duration * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring.delay,
          }}
        />
      ))}
      
      {/* Small dots */}
      {dots.map((dot) => (
        <Dot
          key={dot.id}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            opacity: dot.opacity,
          }}
          animate={{
            opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
          }}
          transition={{
            duration: dot.duration * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
      
      {/* Connecting lines */}
      {lines.map((line) => (
        <Line
          key={line.id}
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.width}px`,
            transform: `rotate(${line.rotation}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: line.duration * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.delay,
          }}
        />
      ))}
    </>
  );
};

export default Background3DElements; 