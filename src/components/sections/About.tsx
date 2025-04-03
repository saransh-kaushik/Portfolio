import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled from '@emotion/styled';

const AboutSection = styled(motion.section)`
  min-height: 100vh;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--background-dark) 0%, rgba(10, 10, 10, 0.8) 50%, var(--background-dark) 100%);
  
  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
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

const AboutContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0) 50%
    );
    z-index: 1;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(
      135deg,
      var(--primary-color) 0%,
      transparent 50%,
      var(--accent-color) 100%
    );
    z-index: -1;
    border-radius: 18px;
    opacity: 0.3;
    filter: blur(8px);
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 0.5;
  }
  
  @media (max-width: 992px) {
    height: 400px;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: translateZ(20px) rotateY(5deg);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const AboutBio = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--text-light);
`;

const AboutHighlight = styled.span`
  color: var(--primary-color);
  font-weight: 500;
`;

const StatsList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: rgba(31, 41, 55, 0.4);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateZ(10px);
    border-color: rgba(78, 205, 196, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(78, 205, 196, 0.2);
  }
`;

const StatValue = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: var(--text-gray);
`;

// 3D floating elements
const FloatingOrb = styled(motion.div)<{ size?: number; color?: string }>`
  position: absolute;
  width: ${props => props.size || 100}px;
  height: ${props => props.size || 100}px;
  border-radius: 50%;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.05)'};
  filter: blur(30px);
  opacity: 0.4;
  z-index: -1;
`;

const FloatingShape = styled(motion.div)<{ 
  width?: number; 
  height?: number; 
  rotation?: number;
  color?: string;
}>`
  position: absolute;
  width: ${props => props.width || 50}px;
  height: ${props => props.height || 50}px;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.1)'};
  transform: rotate(${props => props.rotation || 0}deg);
  opacity: 0.5;
  z-index: -1;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FloatingTriangle = styled(motion.div)<{ size?: number; color?: string }>`
  position: absolute;
  width: 0;
  height: 0;
  border-left: ${props => props.size || 50}px solid transparent;
  border-right: ${props => props.size || 50}px solid transparent;
  border-bottom: ${props => (props.size || 50) * 1.5}px solid ${props => props.color || 'rgba(255, 255, 255, 0.1)'};
  opacity: 0.4;
  z-index: -1;
`;

const CodeBlock = styled(motion.div)`
  position: absolute;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  backdrop-filter: blur(4px);
  
  &:before {
    content: '// AI Code';
    display: block;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
`;

const About: React.FC = () => {
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
  
  // 3D elements data
  const orbs = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 80,
      color: [
        'rgba(255, 255, 255, 0.03)',
        'rgba(240, 240, 240, 0.03)',
        'rgba(220, 220, 220, 0.03)',
        'rgba(200, 200, 200, 0.03)',
        'rgba(180, 180, 180, 0.03)'
      ][i],
      duration: Math.random() * 20 + 15,
    }));
  }, []);
  
  const shapes = React.useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: [15, 85, 65][i],
      y: [25, 75, 35][i],
      width: Math.random() * 60 + 40,
      height: Math.random() * 60 + 40,
      rotation: Math.random() * 45,
      color: [
        'rgba(255, 255, 255, 0.1)',
        'rgba(240, 240, 240, 0.1)',
        'rgba(220, 220, 220, 0.1)'
      ][i],
      duration: Math.random() * 10 + 20,
    }));
  }, []);
  
  const triangles = React.useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: [75, 25, 50][i],
      y: [15, 65, 85][i],
      size: Math.random() * 30 + 20,
      color: [
        'rgba(255, 255, 255, 0.1)',
        'rgba(240, 240, 240, 0.1)',
        'rgba(220, 220, 220, 0.1)'
      ][i],
      duration: Math.random() * 15 + 20,
    }));
  }, []);
  
  const codeBlocks = [
    {
      id: 0,
      x: 75,
      y: 25,
      content: 'function createAI() {\n  return new Intelligence();\n}',
      scale: 0.8,
    },
    {
      id: 1,
      x: 15,
      y: 80,
      content: 'const future = {\n  technology: "advanced",\n  ai: "evolved"\n}',
      scale: 0.7,
    }
  ];
  
  return (
    <AboutSection id="about" ref={ref}>
      {/* Floating Orbs */}
      {orbs.map(orb => (
        <FloatingOrb
          key={`orb-${orb.id}`}
          size={orb.size}
          color={orb.color}
          style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating Shapes */}
      {shapes.map(shape => (
        <FloatingShape
          key={`shape-${shape.id}`}
          width={shape.width}
          height={shape.height}
          rotation={shape.rotation}
          color={shape.color}
          style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 10, shape.rotation],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating Triangles */}
      {triangles.map(triangle => (
        <FloatingTriangle
          key={`triangle-${triangle.id}`}
          size={triangle.size}
          color={triangle.color}
          style={{ left: `${triangle.x}%`, top: `${triangle.y}%` }}
          animate={{
            rotate: [0, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: triangle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Code Blocks */}
      {codeBlocks.map(block => (
        <CodeBlock
          key={`code-${block.id}`}
          style={{ 
            left: `${block.x}%`, 
            top: `${block.y}%`,
            transform: `scale(${block.scale})` 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {block.content}
        </CodeBlock>
      ))}
      
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </SectionTitle>
      
      <AboutContainer
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <ProfileImageContainer 
          variants={itemVariants}
        >
          <ImageWrapper>
            <img
              src="/profile.jpg"
              alt="Profile"
              loading="eager"
            />
          </ImageWrapper>
        </ProfileImageContainer>
        
        <ContentContainer>
          <AboutBio variants={itemVariants}>
            Hello! I'm a <AboutHighlight>AI Engineer and Machine Learning Specialist</AboutHighlight> with a passion for creating intelligent systems that solve real-world problems. My journey in tech started over 5 years ago, and I've been fascinated by the potential of artificial intelligence ever since.
          </AboutBio>
          
          <AboutBio variants={itemVariants}>
            I specialize in <AboutHighlight>deep learning</AboutHighlight>, <AboutHighlight>computer vision</AboutHighlight>, and <AboutHighlight>natural language processing</AboutHighlight>. My approach combines cutting-edge research with practical implementations that deliver tangible results for clients and users.
          </AboutBio>
          
          <AboutBio variants={itemVariants}>
            When I'm not coding or training models, you can find me exploring the latest AI research, contributing to open-source projects, or mentoring aspiring data scientists and AI engineers.
          </AboutBio>
          
          <StatsList variants={containerVariants}>
            <StatItem variants={itemVariants}>
              <StatValue>5+</StatValue>
              <StatLabel>Years of Experience</StatLabel>
            </StatItem>
            
            <StatItem variants={itemVariants}>
              <StatValue>50+</StatValue>
              <StatLabel>Projects Completed</StatLabel>
            </StatItem>
            
            <StatItem variants={itemVariants}>
              <StatValue>20+</StatValue>
              <StatLabel>AI Models Deployed</StatLabel>
            </StatItem>
            
            <StatItem variants={itemVariants}>
              <StatValue>15+</StatValue>
              <StatLabel>Research Publications</StatLabel>
            </StatItem>
          </StatsList>
        </ContentContainer>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 