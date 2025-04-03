import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  position: relative;
  background: var(--background-dark);
  overflow: hidden;
  padding: 5rem 2rem 2rem;
  z-index: 1;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
  z-index: 2;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-family: var(--font-header);
  
  span {
    color: var(--primary-color);
  }
`;

const FooterDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 300px;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 2px;
    background: var(--primary-color);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: var(--text-gray);
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    position: relative;
    
    &:before {
      content: '';
      width: 0;
      height: 1px;
      background: var(--primary-color);
      position: absolute;
      bottom: -2px;
      left: 0;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: var(--primary-color);
      
      &:before {
        width: 100%;
      }
    }
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-5px) scale(1.1);
    background: var(--gradient-primary);
    color: var(--background-dark);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 4rem;
  padding-top: 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const FooterCopyright = styled.p`
  color: var(--text-gray);
  font-size: 0.9rem;
  
  span {
    color: var(--primary-color);
  }
`;

// Decorative elements
const GlowCircle = styled(motion.div)<{ size?: number; color?: string }>`
  position: absolute;
  width: ${props => props.size || 300}px;
  height: ${props => props.size || 300}px;
  border-radius: 50%;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.02)'};
  filter: blur(80px);
  z-index: 0;
`;

const BackgroundGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.2;
  z-index: 0;
`;

const FloatingParticle = styled(motion.div)<{ size?: number; color?: string }>`
  position: absolute;
  width: ${props => props.size || 6}px;
  height: ${props => props.size || 6}px;
  border-radius: 50%;
  background: ${props => props.color || 'var(--primary-color)'};
  opacity: 0.5;
  filter: blur(1px);
  z-index: 0;
`;

const Footer: React.FC = () => {
  // Generate particles for background
  const particles = React.useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: i % 3 === 0 ? 'var(--primary-color)' : 
             i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)',
      duration: Math.random() * 15 + 10,
    }));
  }, []);
  
  // Glow circles
  const glowCircles = [
    { id: 1, x: -5, y: 10, size: 350, color: 'rgba(255, 255, 255, 0.02)' },
    { id: 2, x: 90, y: 80, size: 250, color: 'rgba(230, 230, 230, 0.01)' }
  ];
  
  return (
    <FooterContainer>
      <BackgroundGrid 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      />
      
      {glowCircles.map(circle => (
        <GlowCircle
          key={`circle-${circle.id}`}
          size={circle.size}
          color={circle.color}
          style={{ left: `${circle.x}%`, top: `${circle.y}%` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {particles.map(particle => (
        <FloatingParticle
          key={`particle-${particle.id}`}
          size={particle.size}
          color={particle.color}
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <FooterContent>
        <FooterColumn>
          <FooterLogo>John<span>AI</span>Doe</FooterLogo>
          <FooterDescription>
            A passionate AI engineer and machine learning specialist creating intelligent solutions for a better future.
          </FooterDescription>
          <FooterSocial>
            <SocialLink href="#" target="_blank" whileHover={{ y: -5, rotateY: 180 }}>
              <span>𝕏</span>
            </SocialLink>
            <SocialLink href="#" target="_blank" whileHover={{ y: -5, rotateY: 180 }}>
              <span>in</span>
            </SocialLink>
            <SocialLink href="#" target="_blank" whileHover={{ y: -5, rotateY: 180 }}>
              <span>𝐆</span>
            </SocialLink>
            <SocialLink href="#" target="_blank" whileHover={{ y: -5, rotateY: 180 }}>
              <span>∆</span>
            </SocialLink>
          </FooterSocial>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <a href="#home">Home</a>
            </FooterLink>
            <FooterLink>
              <a href="#about">About</a>
            </FooterLink>
            <FooterLink>
              <a href="#skills">Skills</a>
            </FooterLink>
            <FooterLink>
              <a href="#projects">Projects</a>
            </FooterLink>
            <FooterLink>
              <a href="#contact">Contact</a>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Services</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <a href="#">AI Development</a>
            </FooterLink>
            <FooterLink>
              <a href="#">Machine Learning</a>
            </FooterLink>
            <FooterLink>
              <a href="#">Computer Vision</a>
            </FooterLink>
            <FooterLink>
              <a href="#">NLP Solutions</a>
            </FooterLink>
            <FooterLink>
              <a href="#">Data Analytics</a>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Contact</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </FooterLink>
            <FooterLink>
              <a href="tel:+11234567890">+1 (123) 456-7890</a>
            </FooterLink>
            <FooterLink>
              <a href="#">New York, NY, USA</a>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <FooterCopyright>
          © {new Date().getFullYear()} <span>JohnAIDoe</span>. All Rights Reserved. Crafted with <span>❤</span> and AI.
        </FooterCopyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 