import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { AnimatedBox, AnimatedSphere, AnimatedTorus } from './Scene3D';

interface Canvas3DProps {
  className?: string;
  cameraPosition?: [number, number, number];
  orbitControls?: boolean;
  children?: React.ReactNode;
}

const Canvas3D: React.FC<Canvas3DProps> = ({
  className = '',
  cameraPosition = [0, 0, 5],
  orbitControls = false,
  children
}) => {
  return (
    <div className={`${className}`}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera makeDefault position={cameraPosition} />
        {orbitControls && <OrbitControls />}
        {children}
      </Canvas>
    </div>
  );
};

export default Canvas3D;

// Pre-configured 3D scenes for different use cases
export const FloatingShapes: React.FC<{className?: string}> = ({ className }) => {
  return (
    <Canvas3D className={className}>
      <AnimatedBox position={[-1.5, 0, 0]} color="#A3FF12" />
      <AnimatedSphere position={[0, 0, 0]} color="white" />
      <AnimatedTorus position={[1.5, 0, 0]} color="#A3FF12" />
    </Canvas3D>
  );
};

export const HeroScene: React.FC<{className?: string}> = ({ className }) => {
  return (
    <Canvas3D className={className} cameraPosition={[0, 0, 8]}>
      {/* Create a grid of small animated cubes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <AnimatedBox 
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}
          color={Math.random() > 0.7 ? "#A3FF12" : "white"}
          speed={Math.random() * 2}
          size={[0.2, 0.2, 0.2]}
        />
      ))}
    </Canvas3D>
  );
};

export const BackgroundScene: React.FC<{className?: string}> = ({ className }) => {
  return (
    <Canvas3D className={className} cameraPosition={[0, 0, 5]}>
      <AnimatedTorus
        position={[0, 0, -2]}
        color="#A3FF12"
        speed={0.2}
        size={[3, 1, 16, 100]}
      />
      <AnimatedSphere
        position={[0, 0, -5]}
        color="white"
        speed={0.1}
        size={[5, 16, 16]}
      />
    </Canvas3D>
  );
};