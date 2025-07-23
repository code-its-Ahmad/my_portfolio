import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface EarthCanvasProps {
  isVisible: boolean;
}

const Earth = ({ scale }: { scale: number }) => {
  const earth = useGLTF('./planet/scene.gltf');

  return (
    <primitive
      object={earth.scene}
      scale={scale}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const EarthCanvas: React.FC<EarthCanvasProps> = ({ isVisible }) => {
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);

  const getScaleAndCamera = () => {
    const width = window.innerWidth;
    if (width < 640) return { scale: 1.8, cameraPos: new Vector3(-4, 3, 6) }; // Mobile
    if (width < 1024) return { scale: 2.2, cameraPos: new Vector3(-5, 4, 7) }; // Tablet
    return { scale: 4.8, cameraPos: new Vector3(-6, 5, 8) }; // Desktop
  };

  const { scale, cameraPos } = getScaleAndCamera();

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = isVisible;
      orbitControlsRef.current.autoRotateSpeed = 1.5;
      orbitControlsRef.current.update();
    }
  }, [isVisible]);

  return (
    <div className="relative w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br to-black">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{
          fov: 50,
          near: 0.1,
          far: 200,
          position: cameraPos,
        }}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            ref={orbitControlsRef}
            autoRotate={isVisible}
            autoRotateSpeed={3.5}
            enablePan={false}
            enableZoom={true}
            maxDistance={12}
            minDistance={5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
            enableDamping={true}
            dampingFactor={0.05}
          />
          {isVisible && <Earth scale={scale} />}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the GLTF model for better performance
useGLTF.preload('./planet/scene.gltf');

export default EarthCanvas;