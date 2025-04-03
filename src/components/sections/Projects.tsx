import React, { useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled from '@emotion/styled';
import FuturisticButton from '../ui/FuturisticButton';

const ProjectsSection = styled(motion.section)`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
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

const ProjectsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:hover {
    transform: translateY(-10px) rotateX(5deg);
    border-color: var(--primary-color);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(78, 205, 196, 0.2);
    
    .project-image {
      transform: scale(1.1);
      filter: brightness(1.1);
    }
    
    .project-content {
      transform: translateZ(20px);
    }
    
    .project-title:after {
      width: 100%;
    }
  }
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  transition: all 0.8s ease;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(15, 23, 42, 0.9)
    );
    z-index: 1;
  }
`;

const ProjectContent = styled(motion.div)`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease;
`;

const ProjectTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-light);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40%;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
`;

const ProjectDescription = styled(motion.p)`
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProjectTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled(motion.span)`
  background: rgba(78, 205, 196, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(78, 205, 196, 0.2);
`;

const ProjectActions = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

// 3D floating elements
const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: var(--primary-color);
  filter: blur(20px);
  opacity: 0.1;
  z-index: -1;
  pointer-events: none;
`;

// Sample projects data
const projectsData = [
  {
    title: 'Model Context Protocol (MCP)',
    description: 'A protocol for passing context between models in a pipeline.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Python', 'Gemini', 'Pydantic'],
    demoLink: 'https://github.com/saransh-kaushik/Model-Context-Protocol',
    sourceLink: 'https://github.com/saransh-kaushik/Model-Context-Protocol',
  },
  {
    title: 'RAG-based Chatbot',
    description: 'A chatbot that uses RAG (Retrieval-Augmented Generation) to answer questions based on a knowledge base.',
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['NLP', 'Python', 'RAG', 'streamlit'],
    demoLink: 'https://github.com/saransh-kaushik/RAG_for_you',
    sourceLink: 'https://github.com/saransh-kaushik/RAG_for_you',
  },
  {
    title: 'Speech Recognition and Speech Synthesis in C#',
    description: 'A C# application that uses the Microsoft Speech API to recognize speech and synthesize speech.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['C#', 'Speech Recognition', 'Speech Synthesis'],
    demoLink: 'https://github.com/saransh-kaushik/VoiceRecognition-Iris',
    sourceLink: 'https://github.com/saransh-kaushik/VoiceRecognition-Iris',
  },
  {
    title: 'CNN for Plant Disease Detection',
    description: 'A CNN model for detecting plant diseases from images.',
    image: 'https://images.unsplash.com/photo-1558346547-4439467bd1d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['CNN', 'Python', 'TensorFlow'],
    demoLink: 'https://github.com/saransh-kaushik/Crop_disease_CNN',
    sourceLink: 'https://github.com/saransh-kaushik/Crop_disease_CNN',
  },
];

const Projects: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
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
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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
  
  // Generate floating elements
  const floatingElements = React.useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      color: i % 2 === 0 ? 'var(--primary-color)' : 'var(--accent-color)',
    }));
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard === index) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = ((y - centerY) / centerY) * 10;
      const angleY = ((centerX - x) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    }
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
    setHoveredCard(null);
  };
  
  return (
    <ProjectsSection id="projects" ref={ref}>
      {/* Floating background elements */}
      {floatingElements.map((element) => (
        <FloatingElement
          key={element.id}
          style={{ 
            left: `${element.x}%`, 
            top: `${element.y}%`, 
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: element.color,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </SectionTitle>
      
      <ProjectsContainer
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={index} 
            variants={cardVariants}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={handleMouseLeave}
          >
            <ProjectImage 
              className="project-image"
              style={{ backgroundImage: `url(${project.image})` }}
              whileHover={{ filter: 'brightness(1.1)' }}
            />
            
            <ProjectContent className="project-content">
              <ProjectTitle className="project-title">{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <ProjectTags>
                {project.tags.map((tag, tagIndex) => (
                  <ProjectTag key={tagIndex}>{tag}</ProjectTag>
                ))}
              </ProjectTags>
              
              <ProjectActions>
                <FuturisticButton onClick={() => window.open(project.sourceLink, '_blank')}>
                  Source Code
                </FuturisticButton>
              </ProjectActions>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects; 