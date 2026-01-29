import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export const BarberChairModel = (props: React.ComponentProps<'group'>) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  const leatherColor = "#2a2a2a"; // Dark leather
  const metalColor = "#e8e8e8";   // Chrome
  
  return (
    <Float
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} {...props}>
        {/* Base (Chrome Disk) */}
        <Cylinder args={[0.4, 0.4, 0.05, 32]} position={[0, -1.5, 0]}>
          <meshStandardMaterial 
            color={metalColor} 
            metalness={0.9} 
            roughness={0.1} 
          />
        </Cylinder>

        {/* Hydraulic Pump */}
        <Cylinder args={[0.08, 0.08, 0.8, 16]} position={[0, -1.1, 0]}>
          <meshStandardMaterial 
            color={metalColor} 
            metalness={0.8} 
            roughness={0.2} 
          />
        </Cylinder>

        {/* Seat Cushion */}
        <RoundedBox args={[0.7, 0.15, 0.7]} radius={0.05} smoothness={4} position={[0, -0.7, 0]}>
          <meshStandardMaterial 
            color={leatherColor} 
            roughness={0.6}
          />
        </RoundedBox>

        {/* Backrest */}
        <RoundedBox args={[0.7, 0.9, 0.1]} radius={0.05} smoothness={4} position={[0, -0.2, -0.3]}>
          <meshStandardMaterial 
            color={leatherColor} 
            roughness={0.6}
          />
        </RoundedBox>

        {/* Headrest */}
        <RoundedBox args={[0.4, 0.25, 0.1]} radius={0.05} smoothness={4} position={[0, 0.45, -0.3]}>
          <meshStandardMaterial 
            color={leatherColor} 
            roughness={0.6}
          />
        </RoundedBox>
        {/* Headrest Connector */}
         <Cylinder args={[0.03, 0.03, 0.2, 8]} position={[0.1, 0.3, -0.3]}>
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.03, 0.03, 0.2, 8]} position={[-0.1, 0.3, -0.3]}>
          <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
        </Cylinder>


        {/* Armrests */}
        {/* Left Armrest */}
        <group position={[-0.4, -0.4, 0]}>
            {/* Vertical Support */}
            <Cylinder args={[0.04, 0.04, 0.4, 8]} position={[0, 0, 0.1]}>
                <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
            </Cylinder>
             {/* Horizontal Rest */}
            <RoundedBox args={[0.1, 0.05, 0.5]} radius={0.02} smoothness={4} position={[0, 0.2, 0]}>
                <meshStandardMaterial color={leatherColor} roughness={0.6} />
            </RoundedBox>
        </group>

        {/* Right Armrest */}
        <group position={[0.4, -0.4, 0]}>
            {/* Vertical Support */}
            <Cylinder args={[0.04, 0.04, 0.4, 8]} position={[0, 0, 0.1]}>
                <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
            </Cylinder>
             {/* Horizontal Rest */}
            <RoundedBox args={[0.1, 0.05, 0.5]} radius={0.02} smoothness={4} position={[0, 0.2, 0]}>
                <meshStandardMaterial color={leatherColor} roughness={0.6} />
            </RoundedBox>
        </group>

        {/* Footrest */}
        <group position={[0, -1.0, 0.5]} rotation={[0.3, 0, 0]}>
             <RoundedBox args={[0.5, 0.05, 0.4]} radius={0.02} smoothness={4}>
                <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.3} />
            </RoundedBox>
            <Cylinder args={[0.04, 0.04, 0.6, 8]} position={[0, 0.3, -0.2]} rotation={[Math.PI/2, 0, 0]}>
                 <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.2} />
            </Cylinder>
        </group>

      </group>
    </Float>
  );
};
