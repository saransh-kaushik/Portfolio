import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Navbar container
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

// Logo component
const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: var(--font-header);
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: var(--primary-color);
  }
`;

// Navigation links container
const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile menu button
const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 110;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// Individual nav link
const NavLink = styled(motion.a)<{ active?: boolean }>`
  font-family: var(--font-main);
  font-weight: 500;
  color: ${(props) => (props.active ? 'var(--primary-color)' : 'var(--text-light)')};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${(props) => (props.active ? '100%' : '0')};
    height: 2px;
    background: var(--primary-color);
    transition: all 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

// Mobile menu
const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 105;
  padding: 6rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

interface NavbarProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

const mobileMenuVariants = {
  closed: { opacity: 0, x: "100%" },
  open: { opacity: 1, x: 0 }
};

// Main navbar component
const Navbar: React.FC<NavbarProps> = ({ onSectionChange, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation items
  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];
  
  return (
    <>
      <NavContainer
        initial="hidden"
        animate="visible"
        variants={navVariants}
        style={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <Logo 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => onSectionChange('intro')}
        >
          <span>Saransh</span>Kaushik
        </Logo>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              active={activeSection === item.id}
              onClick={(e) => {
                e.preventDefault();
                onSectionChange(item.id);
              }}
              variants={linkVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        
        <MenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </MenuButton>
      </NavContainer>
      
      <MobileMenu
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            href={`#${item.id}`}
            active={activeSection === item.id}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
              setIsMobileMenuOpen(false);
            }}
            style={{ fontSize: '1.5rem' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </NavLink>
        ))}
      </MobileMenu>
    </>
  );
};

export default Navbar; 