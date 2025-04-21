import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface BoxProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: [number, number, number];
}

// Animated 3D box component
export const AnimatedBox: React.FC<BoxProps> = ({ 
  position, 
  color, 
  speed = 1,
  size = [1, 1, 1]
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * speed * 0.5;
    mesh.current.rotation.y += delta * speed * 0.2;
  });

  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Animated sphere component
export const AnimatedSphere: React.FC<BoxProps> = ({
  position,
  color,
  speed = 1,
  size = [1, 32, 32]
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * speed * 0.2;
    mesh.current.rotation.y += delta * speed * 0.5;
  });

  return (
    <mesh position={position} ref={mesh}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Animated torus component
export const AnimatedTorus: React.FC<BoxProps> = ({
  position,
  color,
  speed = 1,
  size = [1, 0.4, 16, 100]
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * speed * 0.3;
    mesh.current.rotation.y += delta * speed * 0.1;
  });

  return (
    <mesh position={position} ref={mesh}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};