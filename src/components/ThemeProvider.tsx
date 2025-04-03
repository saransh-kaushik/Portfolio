import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Background3D from './Background3D';

type ThemeContextType = {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Add loading animation
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 10], fov: 25 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <Preload all />
          <Background3D />
        </Canvas>
        
        {/* Loading Screen */}
        {!isLoaded && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'var(--background-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              zIndex: 1000,
              transition: 'opacity 1s ease',
              opacity: isMounted ? 1 : 0,
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '3px solid transparent',
                borderTopColor: 'var(--primary-color)',
                borderBottomColor: 'var(--accent-color)',
                animation: 'spin 1.5s linear infinite',
              }}
            />
            <h2
              style={{
                marginTop: '2rem',
                color: 'var(--text-light)',
                fontFamily: 'var(--font-header)',
                fontWeight: 500,
              }}
            >
              Loading...
            </h2>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}
        
        {children}
      </div>
    </ThemeContext.Provider>
  );
}; 