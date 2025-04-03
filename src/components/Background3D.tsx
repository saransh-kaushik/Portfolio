import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Create a star field component with a more subtle effect
export const StarField = ({ count = 3000 }) => {
  const points = useRef<THREE.Points>(null!);
  
  // Generate random positions for stars
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, [count]);
  
  // Animate stars in each frame with a slower, more subtle motion
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });
  
  return (
    <group>
      <Points 
        ref={points}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#4ECDC4"
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Create a neural network-like grid for AI theme
export const NeuralGrid = () => {
  const gridRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() % 1) * 1.5;
      gridRef.current.rotation.x = -Math.PI / 2;
    }
  });
  
  return (
    <group ref={gridRef} position={[0, -5, 0]}>
      <gridHelper 
        args={[40, 40, '#7BE495', '#1E293B']}
        position={[0, 0, -2]}
      />
      <gridHelper 
        args={[40, 40, '#4ECDC4', '#1E293B']}
        position={[0, 0, -4]}
      />
    </group>
  );
};

// Define interface for the FloatingShape props
interface FloatingShapeProps {
  position: [number, number, number];
  color?: string;
  speed?: number;
  scale?: number;
}

// Create a floating node shape (like neural network nodes)
export const FloatingNode = ({ position, color = '#4ECDC4', speed = 1, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // More subtle, slow rotation
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2 * speed;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1 * speed;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshLambertMaterial color={color} wireframe={true} transparent opacity={0.6} />
    </mesh>
  );
};

// Main background component that combines all elements
const Background3D = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
      <StarField />
      <NeuralGrid />
      
      {/* Neural network nodes */}
      <FloatingNode position={[-8, 2, -10]} color="#4ECDC4" speed={0.7} scale={0.8} />
      <FloatingNode position={[-4, 5, -15]} color="#87CEEB" speed={0.5} scale={1.2} />
      <FloatingNode position={[0, 3, -12]} color="#7BE495" speed={0.6} scale={1} />
      <FloatingNode position={[5, 1, -8]} color="#4ECDC4" speed={0.8} scale={0.7} />
      <FloatingNode position={[8, 6, -20]} color="#7BE495" speed={0.4} scale={1.5} />
      
      {/* Lines connecting nodes could be added here with additional custom geometry */}
      
      <fog attach="fog" args={['#0F172A', 15, 40]} />
    </>
  );
};

export default Background3D; 