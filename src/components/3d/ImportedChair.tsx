import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { ColladaLoader } from 'three-stdlib';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const ImportedChair = (props: React.ComponentProps<'group'>) => {
  const dae = useLoader(ColladaLoader, '/models/model.dae');
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    // Define Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: '#C9A227', // Gold
      metalness: 0.9,
      roughness: 0.2,
    });

    const leatherMaterial = new THREE.MeshStandardMaterial({
      color: '#F2D16B', // Golden Leather
      roughness: 0.5,
      metalness: 0.4,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
        color: '#e0e0e0', // Chrome
        metalness: 1.0,
        roughness: 0.1,
    });
    
    // Fallback/Default Material (Dark Metal)
    const defaultMaterial = new THREE.MeshStandardMaterial({
        color: '#333333',
        metalness: 0.8,
        roughness: 0.3
    });

    dae.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        const name = mesh.name.toLowerCase();

        // Since the previous guessing failed, let's try a broader approach.
        // If the names are generic (like "mesh_0", "object_1"), we might need to rely on other properties
        // or just apply one uniform material for now to see IF it works at all.
        
        // Let's try to detect if it's the "wireframe" look causing issues.
        // Sometimes imported models have multiple materials per mesh.
        if (Array.isArray(mesh.material)) {
             mesh.material = mesh.material.map(() => defaultMaterial);
        } else {
             // FORCE apply the material to verify it works.
             // If we can't identify parts, let's try to make EVERYTHING Golden Leather for a moment
             // just to see if the update takes effect. 
             // If this works, we know the traversal is correct but the logic was wrong.
             
             // Improved Heuristic:
             // Often seats are the largest meshes.
             // Frames are often thin.
             
             if (name.includes('seat') || name.includes('cushion') || name.includes('leather') || name.includes('back') || name.includes('pad') || name.includes('upholstery')) {
                mesh.material = leatherMaterial;
            } else if (name.includes('lever') || name.includes('handle') || name.includes('manette') || name.includes('pedal') || name.includes('adjust')) {
                mesh.material = blackMaterial;
            } else if (name.includes('base') || name.includes('pump') || name.includes('chrome') || name.includes('metal') || name.includes('steel')) {
                 mesh.material = chromeMaterial;
            } else if (name.includes('frame') || name.includes('gold') || name.includes('detail') || name.includes('brass')) {
                mesh.material = goldMaterial;
            } else {
                // If the name is generic (e.g., 'Box001'), we have a problem.
                // Let's assume most of the visible surface area IS the chair leather.
                // So let's default to Leather instead of Dark Metal to show the user "Golden Leather" as requested.
                mesh.material = leatherMaterial; 
            }
        }
      }
    });
  }, [dae]);

  useFrame((state) => {
    if (groupRef.current) {
      // Make the chair follow the mouse movement
      // state.mouse.x/y are normalized coordinates (-1 to 1)
      const targetRotationY = state.mouse.x * 0.5; // Rotate left/right
      const targetRotationX = -state.mouse.y * 0.2; // Tilt up/down slightly

      // Smoothly interpolate to the target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.2}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef} {...props}>
        <primitive object={dae.scene} />
      </group>
    </Float>
  );
};
