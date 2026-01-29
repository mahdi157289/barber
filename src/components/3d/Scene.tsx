import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { ImportedChair } from './ImportedChair';

export const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      
      {/* Key Light - Warm Main Light */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        color="#fff5e6" 
        castShadow 
      />
      
      {/* Fill Light - Soft Cool Light from opposite side */}
      <pointLight position={[-10, 0, -10]} intensity={0.5} color="#e6eeff" />
      
      {/* Rim Light - Gold accent from behind */}
      <spotLight 
        position={[0, 5, -5]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2} 
        color="#c9a227" 
      />

      <Suspense fallback={null}>
        <ImportedChair scale={3.5} position={[0, -2.0, 0]} rotation={[0, -Math.PI / 4, 0]} />
        {/* <Environment preset="city" /> Commented out due to network error loading HDR */}
        <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#c9a227" />
      </Suspense>
      
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
    </Canvas>
  );
};
