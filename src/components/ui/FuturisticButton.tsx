import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface FuturisticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const ButtonWrapper = styled(motion.button)<{ primary?: boolean; secondary?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 8px;
  background: ${props => 
    props.primary ? 'var(--primary-color)' : 
    props.secondary ? 'var(--accent-color)' : 'transparent'
  };
  color: ${props => 
    props.primary || props.secondary ? 'var(--background-dark)' : 'var(--text-light)'
  };
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => 
      props.primary ? 'var(--primary-color)' : 
      props.secondary ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)'
    };
    border-radius: 8px;
    z-index: -1;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Border for non-primary/secondary buttons */
  ${props => (!props.primary && !props.secondary) && `
    border: 1px solid var(--primary-color);
    
    &:before {
      background: transparent;
    }
  `}
`;

const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  children,
  onClick,
  primary,
  secondary,
  icon,
  className,
  disabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      
      if (distance < maxDistance) {
        const angle = Math.atan2(y, x);
        const force = (1 - distance / maxDistance) * 20;
        
        button.style.setProperty('--x', `${Math.cos(angle) * force}px`);
        button.style.setProperty('--y', `${Math.sin(angle) * force}px`);
      }
    };
    
    const handleMouseLeave = () => {
      button.style.setProperty('--x', '0px');
      button.style.setProperty('--y', '0px');
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);
  
  return (
    <ButtonWrapper
      ref={buttonRef}
      primary={primary}
      secondary={secondary}
      onClick={onClick}
      className={`magnetic-button ${className || ''}`}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -3,
        boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon && (
        <motion.span
          animate={{ 
            rotate: isHovered ? [0, 10, -10, 0] : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </ButtonWrapper>
  );
};

export default FuturisticButton; 