"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Center, Environment, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function StylizedBag() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle, elegant rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef}>
        {/* Main Bag Body */}
        <RoundedBox args={[2.5, 1.8, 1]} radius={0.15} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#111111" 
            roughness={0.2} 
            metalness={0.8}
            envMapIntensity={2}
          />
        </RoundedBox>

        {/* Bag Flap / Accent */}
        <RoundedBox args={[2.6, 1.2, 1.05]} radius={0.1} smoothness={4} position={[0, 0.4, 0]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.3} 
            metalness={0.7}
          />
        </RoundedBox>

        {/* Gold Lock / Clasp */}
        <mesh position={[0, 0, 0.55]}>
          <boxGeometry args={[0.3, 0.4, 0.1]} />
          <meshStandardMaterial 
            color="#d4af37" 
            roughness={0.1} 
            metalness={1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Left Handle Anchor */}
        <mesh position={[-0.8, 0.9, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
        </mesh>

        {/* Right Handle Anchor */}
        <mesh position={[0.8, 0.9, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
        </mesh>

        {/* The Handle (Top half of a Torus) */}
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.8, 0.06, 16, 64, Math.PI]} />
          <meshStandardMaterial 
            color="#d4af37" 
            roughness={0.1} 
            metalness={1} 
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, 5, -10]} color="#d4af37" intensity={2} />
        <pointLight position={[10, -5, 10]} color="#f3e5ab" intensity={1} />
        
        {/* Adds realistic reflections to the materials */}
        <Environment preset="city" />
        
        <Center>
          <StylizedBag />
        </Center>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
