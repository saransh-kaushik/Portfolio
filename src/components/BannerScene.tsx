import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

type Vector3 = [number, number, number];

// Animated cube
const FloatingCube = ({ position, size = 1, color = "#4ECDC4" }: { position: Vector3, size?: number, color?: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.3;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
      mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  return (
    <mesh ref={mesh} position={position} scale={[size, size, size]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.5}
        roughness={0.2} 
        wireframe={true}
      />
    </mesh>
  );
};

// Animated sphere
const FloatingSphere = ({ position, size = 1, color = "#7BE495" }: { position: Vector3, size?: number, color?: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
      mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  return (
    <mesh ref={mesh} position={position} scale={[size, size, size]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.4}
        roughness={0.3}
        wireframe={true} 
      />
    </mesh>
  );
};

// Animated torus (ring)
const FloatingTorus = ({ position, size = 1, color = "#87CEEB" }: { position: Vector3, size?: number, color?: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.4;
      mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  
  return (
    <mesh ref={mesh} position={position} scale={[size, size, size]}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.4}
        roughness={0.3}
        wireframe={true} 
      />
    </mesh>
  );
};

// Animated grid
const GridPlane = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() % 1) * 1.5;
      gridRef.current.rotation.x = -Math.PI / 2;
    }
  });
  
  return (
    <group ref={gridRef} position={[0, -4, 0]}>
      <gridHelper 
        args={[30, 30, "#4ECDC4", "#1E293B"]}
        position={[0, 0, -2]}
      />
      <gridHelper 
        args={[30, 30, "#7BE495", "#1E293B"]}
        position={[0, 0, -4]}
      />
    </group>
  );
};

// Particle system for stars/dots
const ParticleField = () => {
  const points = useRef<THREE.Points>(null!);
  
  // Generate random positions for stars
  const positions = useMemo(() => {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() * 2 - 1) * 15;
      positions[i3 + 1] = (Math.random() * 2 - 1) * 10;
      positions[i3 + 2] = (Math.random() * 2 - 1) * 10;
    }
    
    return positions;
  }, []);
  
  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <Points 
      ref={points}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#4ECDC4"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Main 3D Scene
const BannerScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      
      <FloatingCube position={[-3, 1, 0]} size={1.5} />
      <FloatingCube position={[1, 2, -2]} size={1.2} color="#7BE495" />
      <FloatingSphere position={[3, 0, -2]} size={1.2} color="#7BE495" />
      <FloatingSphere position={[-4, -2, -3]} size={0.8} color="#87CEEB" />
      <FloatingTorus position={[4, 2, -1]} size={1.3} />
      <FloatingTorus position={[-2, -1, -4]} size={0.9} color="#4ECDC4" />
      
      <GridPlane />
      <ParticleField />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={true}
        autoRotate={true} 
        autoRotateSpeed={0.5} 
      />
      <fog attach="fog" args={['#0F172A', 8, 30]} />
    </Canvas>
  );
};

export default BannerScene; 