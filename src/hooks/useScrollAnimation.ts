import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.2) => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-scroll-animation]');
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * (1 - threshold);
        
        if (isVisible) {
          controls.start('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, threshold]);

  return controls;
}; 