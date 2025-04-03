import React, { useState, useEffect, useRef } from 'react';
import './styles/globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/ui/Navbar';
import Intro from './components/sections/Intro';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Background3DElements from './components/Background3DElements';
import CursorEffects from './components/ui/CursorEffects';
import styled from '@emotion/styled';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: var(--background-dark);
`;

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const sectionRefs = {
    intro: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };
  
  const scrollToSection = (section: string) => {
    const sectionRef = document.getElementById(section);
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Determine active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of Object.keys(sectionRefs)) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);
  
  return (
    <ThemeProvider>
      {/* Cursor Effects */}
      <CursorEffects />
      
      {/* Background Effects */}
      <BackgroundWrapper>
        <Background3DElements />
      </BackgroundWrapper>
      
      {/* Navigation */}
      <Navbar
        onSectionChange={scrollToSection}
        activeSection={activeSection}
      />
      
      {/* Sections */}
      <main>
        <Intro onButtonClick={scrollToSection} />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: 'var(--text-gray)',
        fontSize: '0.9rem',
        background: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(10px)',
      }}>
        <p>© {new Date().getFullYear()} Your Name - All Rights Reserved</p>
      </footer>
    </ThemeProvider>
  );
};

export default App;
