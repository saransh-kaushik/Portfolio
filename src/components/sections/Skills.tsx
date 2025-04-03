import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled from '@emotion/styled';

const SkillsSection = styled(motion.section)`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--background-dark) 0%, rgba(31, 41, 55, 0.8) 50%, var(--background-dark) 100%);
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

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(31, 41, 55, 0.5);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  border: 1px solid rgba(78, 205, 196, 0.1);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(78, 205, 196, 0.2);
    
    .skill-icon {
      transform: rotateY(180deg);
    }
    
    .skill-bar {
      width: 100%;
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(78, 205, 196, 0.05), transparent 70%);
    z-index: -1;
  }
`;

const SkillIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SkillName = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const SkillDescription = styled(motion.p)`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--text-gray);
`;

const SkillLevel = styled(motion.div)`
  margin-top: 1rem;
`;

const SkillLevelTitle = styled(motion.span)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  span:first-of-type {
    color: var(--text-light);
    font-weight: 500;
  }
  
  span:last-of-type {
    color: var(--primary-color);
  }
`;

const SkillBarContainer = styled(motion.div)`
  width: 100%;
  height: 8px;
  background: rgba(31, 41, 55, 0.8);
  border-radius: 10px;
  overflow: hidden;
`;

const SkillBar = styled(motion.div)`
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 10px;
  width: 0;
  transition: width 1.5s ease;
`;

// 3D Decorative elements
const FloatingHexagon = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 110px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: ${props => props.color || 'rgba(78, 205, 196, 0.05)'};
  z-index: -1;
  opacity: 0.5;
  filter: blur(2px);
`;

const HexagonGrid = styled(motion.div)`
  position: absolute;
  right: 5%;
  bottom: 5%;
  z-index: -1;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const Hexagon = ({ color }: { color: string }) => {
  return (
    <motion.div
      style={{
        width: '50px',
        height: '55px',
        margin: '10px',
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: color,
        display: 'inline-block',
        opacity: 0.4,
      }}
      animate={{
        rotateY: [0, 360],
        rotateX: [0, 180],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// 3D Floating Glow
const GlowOrb = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.color || 'rgba(78, 205, 196, 0.2)'} 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0.3;
  z-index: -1;
`;

// Neural Net Node
const NeuralNode = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-color);
  z-index: -1;
  box-shadow: 0 0 10px var(--primary-color);
`;

const NeuralConnection = styled(motion.div)`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, var(--primary-color), transparent);
  z-index: -1;
  transform-origin: left center;
`;

// Skills data
const skillsData = [
  {
    icon: '🧠',
    name: 'Machine Learning',
    description: 'Expertise in developing and training various ML models including neural networks, decision trees, and ensemble methods.',
    level: 80,
  },
  {
    icon: '🔊',
    name: 'Natural Language Processing',
    description: 'Building systems that understand, interpret, and generate human language using transformer models and LLMs.',
    level: 90,
  },
  {
    icon: '👁️',
    name: 'Computer Vision',
    description: 'Creating algorithms that can effectively identify objects, people, and activities in images and video streams.',
    level: 85,
  },
  {
    icon: '📊',
    name: 'Data Science',
    description: 'Analyzing complex datasets to extract meaningful insights and support data-driven decision making.',
    level: 75,
  },
  {
    icon: '⚙️',
    name: 'Deep Learning',
    description: 'Implementing advanced neural network architectures for solving complex pattern recognition problems.',
    level: 80,
  },
  {
    icon: '📱',
    name: 'AI Applications',
    description: 'Deploying machine learning models in production environments and creating user-friendly AI applications.',
    level: 75,
  },
];

const Skills: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate skill bars
      const skillBars = document.querySelectorAll('.skill-bar');
      skillBars.forEach((bar: any) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
      });
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  // Generate neural network nodes
  const nodes = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
        target: Math.floor(Math.random() * 12),
        length: Math.random() * 150 + 50,
        angle: Math.random() * 360,
      })),
    }));
  }, []);
  
  // Generate glow orbs
  const glowOrbs = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 200 + 100,
      color: i % 2 === 0 
        ? 'rgba(78, 205, 196, 0.15)' 
        : i % 3 === 0 
          ? 'rgba(123, 228, 149, 0.15)' 
          : 'rgba(135, 206, 235, 0.15)',
    }));
  }, []);
  
  return (
    <SkillsSection id="skills" ref={ref}>
      {/* Neural network nodes */}
      {nodes.map((node) => (
        <React.Fragment key={node.id}>
          <NeuralNode
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {node.connections.map((connection, index) => {
            const targetNode = nodes[connection.target];
            if (!targetNode) return null;
            
            return (
              <NeuralConnection
                key={`${node.id}-${index}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${connection.length}px`,
                  transform: `rotate(${connection.angle}deg)`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
      
      {/* Floating hexagons */}
      <FloatingHexagon
        style={{ left: '10%', top: '20%' }}
        animate={{
          y: [0, -30, 0],
          rotateZ: [0, 360],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <FloatingHexagon
        style={{ right: '15%', top: '15%' }}
        color="rgba(123, 228, 149, 0.05)"
        animate={{
          y: [0, 40, 0],
          rotateZ: [360, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <FloatingHexagon
        style={{ left: '15%', bottom: '20%' }}
        color="rgba(135, 206, 235, 0.05)"
        animate={{
          y: [0, 30, 0],
          rotateZ: [0, -360],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Glow orbs */}
      {glowOrbs.map((orb) => (
        <GlowOrb
          key={orb.id}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* 3D Hexagon grid for decoration */}
      <HexagonGrid>
        <Hexagon color="var(--primary-color)" />
        <Hexagon color="var(--secondary-color)" />
        <Hexagon color="var(--accent-color)" />
      </HexagonGrid>
      
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Skills & Expertise
      </SectionTitle>
      
      <SkillsGrid
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {skillsData.map((skill, index) => (
          <SkillCard key={index} variants={itemVariants}>
            <SkillIcon className="skill-icon">{skill.icon}</SkillIcon>
            <SkillName>{skill.name}</SkillName>
            <SkillDescription>{skill.description}</SkillDescription>
            
            <SkillLevel>
              <SkillLevelTitle>
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </SkillLevelTitle>
              
              <SkillBarContainer>
                <SkillBar 
                  className="skill-bar"
                  data-width={skill.level}
                />
              </SkillBarContainer>
            </SkillLevel>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills; 