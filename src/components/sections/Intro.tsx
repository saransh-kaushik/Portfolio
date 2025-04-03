import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from '@emotion/styled';
import FuturisticButton from '../ui/FuturisticButton';
import { useInView } from 'framer-motion';
import BannerScene from '../BannerScene';

const IntroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0;
`;

const Banner = styled(motion.div)`
  width: 100%;
  height: 50vh;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const Banner3D = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const BannerOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, var(--background-dark) 90%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerContent = styled(motion.div)`
  text-align: center;
  z-index: 3;
  padding: 0 2rem;
`;

const BannerTitle = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 4rem);
  color: var(--text-light);
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const BannerSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-light);
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const IntroContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 1000px;
  width: 100%;
  z-index: 1;
  padding: 0 2rem;
`;

const IntroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  span {
    display: block;
    color: var(--accent-color);
    font-size: clamp(1.5rem, 5vw, 2rem);
    margin-bottom: 0.5rem;
  }
`;

const IntroParagraph = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2.5rem;
  max-width: 700px;
  opacity: 0.9;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

// Animated code snippet
const CodeSnippet = styled(motion.div)`
  background: rgba(15, 23, 42, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: var(--font-code);
  font-size: 0.9rem;
  color: var(--text-light);
  text-align: left;
  max-width: 600px;
  margin: 2rem auto;
  position: relative;
  border: 1px solid rgba(78, 205, 196, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--primary-color);
  }
`;

const CodeLine = styled(motion.div)`
  margin-bottom: 0.5rem;
  
  .comment {
    color: var(--secondary-color);
  }
  
  .keyword {
    color: var(--primary-color);
  }
  
  .function {
    color: var(--accent-color);
  }
  
  .string {
    color: #7BE495;
  }
  
  .number {
    color: #87CEEB;
  }
`;

// TypeWriter effect for the heading
const TypeWriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = React.useState('');
  const index = React.useRef(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (index.current < text.length) {
        setDisplayText((prev) => prev + text.charAt(index.current));
        index.current += 1;
      }
    }, speed);
    
    return () => clearTimeout(timer);
  }, [displayText, text, speed]);
  
  return <span>{displayText}</span>;
};

interface IntroProps {
  onButtonClick: (section: string) => void;
}

const Intro: React.FC<IntroProps> = ({ onButtonClick }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
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
  
  return (
    <IntroSection id="intro" ref={ref}>
      <Banner>
        <Banner3D>
          <BannerScene />
        </Banner3D>
        <BannerOverlay>
          <BannerContent>
            <BannerTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I'm Saransh Kaushik
            </BannerTitle>
            <BannerSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI Engineer passionate about building intelligent systems
            </BannerSubtitle>
          </BannerContent>
        </BannerOverlay>
      </Banner>
      
      <IntroContainer
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <IntroTitle variants={itemVariants}>
          <span>Welcome to my world of AI and Innovation</span>
          Turning Ideas into Intelligent Solutions
        </IntroTitle>
        
        <IntroParagraph variants={itemVariants}>
          As an AI Engineer, I specialize in developing cutting-edge solutions that bridge the gap between human needs and artificial intelligence. When I'm not coding, you'll find me contributing to open-source projects, immersed in a good book, or playing basketball.
        </IntroParagraph>

        <CodeSnippet variants={itemVariants}>
          <CodeLine>
            <span className="comment">// A glimpse into who I am</span>
          </CodeLine>
          <CodeLine>
            <span className="keyword">const</span> <span className="function">developer</span> = {"{"}
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;name: <span className="string">'Saransh Kaushik'</span>,
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;role: <span className="string">'AI Engineer'</span>,
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;passions: [<span className="string">'AI Development'</span>, <span className="string">'Open Source'</span>, <span className="string">'Innovation'</span>],
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;hobbies: [<span className="string">'Open Source'</span>, <span className="string">'Reading'</span>, <span className="string">'Basketball'</span>],
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;goals: <span className="string">'Building AI solutions that matter'</span>
          </CodeLine>
          <CodeLine>
            {"}"};
          </CodeLine>
        </CodeSnippet>

        <ButtonContainer variants={itemVariants}>
          <FuturisticButton primary onClick={() => onButtonClick('projects')}>
            View My Projects
          </FuturisticButton>
          <FuturisticButton onClick={() => onButtonClick('contact')}>
            Get In Touch
          </FuturisticButton>
        </ButtonContainer>
      </IntroContainer>
    </IntroSection>
  );
};

export default Intro; 