import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled from '@emotion/styled';

const ContactSection = styled(motion.section)`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--background-dark) 0%, rgba(10, 10, 10, 0.8) 50%, var(--background-dark) 100%);
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--primary-color);
  }
`;

const ContactContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.03), transparent 70%);
    z-index: -1;
    border-radius: 16px;
  }
`;

const ContactText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 3rem;
  text-align: center;
`;

const ContactDetails = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContactDetail = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateZ(20px);
    
    .contact-icon {
      transform: rotateY(180deg);
      background: var(--gradient-primary);
    }
  }
`;

const ContactIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled(motion.span)`
  font-weight: 500;
  color: var(--text-gray);
  font-size: 0.9rem;
`;

const ContactValue = styled(motion.a)`
  color: var(--primary-color);
  font-size: 1.1rem;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--primary-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-5px) rotateY(180deg);
    background: var(--gradient-primary);
    color: var(--background-dark);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;

// 3D Floating Elements
const FloatingLight = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  z-index: -1;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.05)'};
`;

const FloatingParticle = styled(motion.div)<{ opacity?: number; color?: string }>`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.color || 'var(--primary-color)'};
  filter: blur(1px);
  z-index: -1;
  opacity: ${props => props.opacity || 0.6};
`;

const FloatingLine = styled(motion.div)`
  position: absolute;
  height: 1px;
  width: 100px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0), 
    rgba(255, 255, 255, 0.2), 
    rgba(255, 255, 255, 0)
  );
  opacity: 0.3;
  z-index: -1;
`;

const Contact: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };
  
  // Generate particles for background
  const particles = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: i % 3 === 0 ? 'var(--primary-color)' : 
             i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)',
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 20 + 10,
    }));
  }, []);
  
  // Generate floating lights
  const lights = React.useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: [20, 70, 40][i],
      y: [15, 60, 85][i],
      color: [
        'rgba(255, 255, 255, 0.05)',
        'rgba(230, 230, 230, 0.05)',
        'rgba(200, 200, 200, 0.05)'
      ][i],
      duration: Math.random() * 10 + 15,
    }));
  }, []);
  
  // Generate floating lines
  const lines = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      width: Math.random() * 150 + 50,
      duration: Math.random() * 15 + 10,
    }));
  }, []);
  
  return (
    <ContactSection id="contact" ref={ref}>
      {/* Floating lights */}
      {lights.map(light => (
        <FloatingLight
          key={`light-${light.id}`}
          color={light.color}
          style={{ left: `${light.x}%`, top: `${light.y}%` }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: light.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Particles */}
      {particles.map(particle => (
        <FloatingParticle
          key={`particle-${particle.id}`}
          color={particle.color}
          opacity={particle.opacity}
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating lines */}
      {lines.map(line => (
        <FloatingLine
          key={`line-${line.id}`}
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.width}px`,
            transform: `rotate(${line.rotation}deg)`
          }}
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Get In Touch
      </SectionTitle>
      
      <ContactContainer
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <ContactText variants={itemVariants}>
          Feel free to reach out to me through any of the following methods for opportunities, collaborations, or just to say hello!
        </ContactText>
        
        <ContactDetails>
          <ContactDetail variants={itemVariants}>
            <ContactIcon className="contact-icon">
              ✉️
            </ContactIcon>
            <ContactMethod>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href="mailto:saranshkaushik3@gmail.com">
                saranshkaushik3@gmail.com
              </ContactValue>
            </ContactMethod>
          </ContactDetail>
          
          {/* <ContactDetail variants={itemVariants}>
            <ContactIcon className="contact-icon">
              📱
            </ContactIcon>
            <ContactMethod>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue href="tel:+11234567890">
                +91 9876543210
              </ContactValue>
            </ContactMethod>
          </ContactDetail> */}
          
          <ContactDetail variants={itemVariants}>
            <ContactIcon className="contact-icon">
              📍
            </ContactIcon>
            <ContactMethod>
              <ContactLabel>Location</ContactLabel>
              <span style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                Rajkot, Gujarat, India
              </span>
            </ContactMethod>
          </ContactDetail>
        </ContactDetails>
        
        <SocialLinks variants={itemVariants}>
          <SocialLink href="www.linkedin.com/in/saransh03" target="_blank" whileHover={{ y: -5 }}>
            <span>in</span>
          </SocialLink>
          <SocialLink href="https://github.com/saransh-kaushik" target="_blank" whileHover={{ y: -5 }}>
              <span>
                <svg height="20" width="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </span>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/saransh__kaushik/" target="_blank" whileHover={{ y: -5 }}>
              <span>
                <svg height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </span>
          </SocialLink>
        </SocialLinks>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact; 