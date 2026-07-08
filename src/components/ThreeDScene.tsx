"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stage } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Dumbbell() {
  const meshRef = useRef<THREE.Group>(null);

  // Rotate slowly and follow mouse slightly
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 2) * 0.2;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.rotation.z = Math.cos(t / 3) * 0.15;
  });

  return (
    <group ref={meshRef} scale={1.2}>
      {/* Central Bar Handle */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 32]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Knurling Grid Texture (Grip Ring Indicators) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.8, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.5}
          metalness={0.9}
        />
      </mesh>

      {/* Left Weight Plates */}
      <group position={[0, 0.85, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.18, 32]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial color="#222" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* Right Weight Plates */}
      <group position={[0, -0.85, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.18, 32]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial color="#222" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Kettlebell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = -t * 0.3;
    meshRef.current.rotation.z = Math.sin(t) * 0.1;
  });

  return (
    <group ref={meshRef} position={[2.5, -0.8, -1]} scale={0.75}>
      {/* Kettlebell Base Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Golden Weight Brand Label Plate */}
      <mesh position={[0, 0, 0.76]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Kettlebell Handle */}
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
        <torusGeometry args={[0.45, 0.09, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Handle Connectors */}
      <mesh castShadow position={[-0.45, 0.55, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.4, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh castShadow position={[0.45, 0.55, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.4, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

function DustParticles() {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Slow drift
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Drift Y upwards
      positions[idx + 1] += Math.sin(t + i) * 0.002 + 0.001;
      if (positions[idx + 1] > 3) {
        positions[idx + 1] = -3; // reset to bottom
      }
      // Drift X/Z sideways slightly
      positions[idx] += Math.cos(t * 0.5 + i) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Random coordinates
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 8; // Spread between -4 and 4
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.03}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeDScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-60 md:opacity-100">
      <Canvas
        shadows
        camera={{ position: [0, 0, 3.2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        
        {/* Cinematic Studio Lights */}
        <spotLight
          position={[5, 5, 5]}
          angle={0.25}
          penumbra={1}
          intensity={5}
          castShadow
          shadow-bias={-0.0001}
          color="#D4AF37"
        />
        <spotLight
          position={[-5, 5, -5]}
          angle={0.3}
          penumbra={1}
          intensity={3}
          color="#ffffff"
        />
        <pointLight position={[0, -2, 2]} intensity={2} color="#FF4D4D" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Dumbbell />
          <Kettlebell />
        </Float>

        <DustParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
