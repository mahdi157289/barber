import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { Heart, MessageCircle, Share2, MoreHorizontal, Music, Camera } from 'lucide-react';

export const PhoneModel = (props: React.ComponentProps<'group'>) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Calculate scale to fit 812px height into 2.9 world units
  // 2.9 / 812 = 0.0035714
  const screenScale = 0.0035714;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <Float
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} {...props}>
        {/* Phone Body - Silver Metallic Finish */}
        <RoundedBox args={[1.5, 3, 0.2]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#e8e8e8" 
            metalness={0.9} 
            roughness={0.1} 
          />
        </RoundedBox>
        
        {/* Screen Background (Black Glass) */}
        <RoundedBox args={[1.4, 2.9, 0.01]} radius={0.1} smoothness={4} position={[0, 0, 0.105]}>
           <meshBasicMaterial color="#000" />
        </RoundedBox>

        {/* Dynamic Island / Notch */}
        <RoundedBox args={[0.4, 0.12, 0.01]} radius={0.06} smoothness={4} position={[0, 1.35, 0.12]} zIndexRange={[100, 0]}>
          <meshBasicMaterial color="#000" />
        </RoundedBox>

        {/* Screen Content - Instagram Reel */}
        <group position={[0, 0, 0.111]}>
          <Html 
            transform 
            occlude={false}
            scale={screenScale / 2} // Half scale for 2x pixel density (Retina)
            style={{ 
              width: '750px', 
              height: '1624px',
              backgroundColor: '#000',
              borderRadius: '80px', // Doubled radius
              overflow: 'hidden',
              pointerEvents: 'auto',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            {/* Content Wrapper - Scaled 2x to fill the larger container while keeping mobile layout */}
            <div className="w-[375px] h-[812px] origin-top-left scale-[2]">
              <div className="relative w-full h-full text-white font-sans select-none bg-black">
                {/* Video Content */}
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover opacity-90"
                  poster="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=800&fit=crop"
                >
                  <source src="https://cdn.coverr.co/videos/coverr-a-barber-trimming-a-mans-hair-1901/1080p.mp4" type="video/mp4" />
                </video>

                {/* Instagram UI Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-black/60 via-transparent to-black/90">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mt-8">
                      <span className="font-bold text-xl drop-shadow-md">Reels</span>
                      <Camera className="w-7 h-7 drop-shadow-md" />
                  </div>
                  
                  {/* Right Side Actions */}
                  <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
                      <div className="flex flex-col items-center gap-1">
                          <Heart className="w-8 h-8 fill-white/10 hover:fill-red-500 transition-colors drop-shadow-md" />
                          <span className="text-xs font-semibold drop-shadow-md">24.5K</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                          <MessageCircle className="w-8 h-8 drop-shadow-md" />
                          <span className="text-xs font-semibold drop-shadow-md">1,203</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                          <Share2 className="w-8 h-8 drop-shadow-md" />
                          <span className="text-xs font-semibold drop-shadow-md">Share</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                          <MoreHorizontal className="w-7 h-7 drop-shadow-md" />
                      </div>
                      <div className="w-9 h-9 border-2 border-white rounded-md overflow-hidden mt-2 bg-gray-800">
                          <div className="w-full h-full bg-gray-600 animate-pulse" />
                      </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="flex flex-col gap-3 mb-6 z-10 pr-16">
                      <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pink-500 bg-gray-800">
                               {/* Profile Placeholder */}
                               <div className="w-full h-full bg-gray-600" />
                          </div>
                          <span className="font-semibold text-sm drop-shadow-md">elitecuts_barber</span>
                          <span className="text-xs border border-white/80 rounded px-2 py-0.5 ml-1 backdrop-blur-sm">Follow</span>
                      </div>
                      <p className="text-sm leading-relaxed drop-shadow-md line-clamp-2">
                          Fresh fade Friday 🔥✂️ Book your appointment now! #barber #fade
                      </p>
                      <div className="flex items-center gap-2 opacity-90">
                          <Music className="w-3 h-3" />
                          <span className="text-xs whitespace-nowrap">Original Audio - elitecuts_barber</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Html>
        </group>
        
        {/* Side Buttons */}
        <mesh position={[0.76, 0.5, 0]}>
          <boxGeometry args={[0.02, 0.2, 0.05]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Camera bump */}
        <RoundedBox args={[0.5, 0.5, 0.05]} radius={0.1} position={[0.3, 1, -0.12]}>
          <meshStandardMaterial color="#d0d0d0" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
    </Float>
  );
};
