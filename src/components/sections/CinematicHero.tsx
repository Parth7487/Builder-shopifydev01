import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Text3D,
  Float,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

// Enhanced 3D Shopify Storefront
const FloatingStorefront = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main screen */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Screen content */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.6, 4.6, 0.01]} />
          <meshStandardMaterial color="#0A192F" />
        </mesh>

        {/* Header with Shopify green */}
        <mesh position={[0, 1.8, 0.07]}>
          <boxGeometry args={[3.4, 0.6, 0.01]} />
          <meshStandardMaterial
            color="#00FFB2"
            emissive="#00FFB2"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Product cards */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0.07]}>
            <boxGeometry args={[0.8, 1.2, 0.01]} />
            <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
          </mesh>
        ))}

        {/* CTA Button */}
        <mesh position={[0, -1.5, 0.07]}>
          <boxGeometry args={[2, 0.5, 0.01]} />
          <meshStandardMaterial
            color="#00FFB2"
            emissive="#00FFB2"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Floating elements around */}
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[-3, 2, 1]}>
            <octahedronGeometry args={[0.3]} />
            <meshStandardMaterial color="#00FFB2" wireframe />
          </mesh>
        </Float>

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={[3, -1, 0.5]}>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00FFB2"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>

        <Float speed={4} rotationIntensity={0.8} floatIntensity={1.2}>
          <mesh position={[-2, -2, 1.5]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial color="#00FFB2" />
          </mesh>
        </Float>
      </group>
    </Float>
  );
};

// Particle field background
const ParticleField = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 100;

  useFrame((state) => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4();
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        const time = state.clock.elapsedTime * 0.5;

        matrix.setPosition(
          x + Math.sin(time + i) * 0.1,
          y + Math.cos(time + i) * 0.1,
          z,
        );

        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02]} />
      <meshStandardMaterial color="#00FFB2" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const CinematicHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-navy-900" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,178,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} />
            <ambientLight intensity={0.2} />
            <pointLight
              position={[10, 10, 10]}
              intensity={0.8}
              color="#00FFB2"
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#ffffff"
            />
            <ParticleField />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <motion.div
          className="text-center lg:text-left space-y-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-white">We Bring</span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-mint to-mint/80 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Shopify Dreams
              </motion.span>
              <br />
              <span className="text-white">to Life</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Custom Shopify themes built for{" "}
            <span className="text-mint font-semibold">bold brands</span> that
            demand more
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-mint text-navy hover:bg-mint/90 font-bold text-lg px-12 py-4 rounded-full relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Project</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>

            <motion.button
              onClick={() => scrollToSection("work")}
              className="text-mint border border-mint/30 hover:border-mint/60 px-8 py-4 rounded-full transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">View Our Work</span>
              <motion.div
                className="absolute inset-0 bg-mint/10 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right 3D content */}
        <motion.div
          className="relative h-[600px] lg:h-[700px]"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.4} />
              <pointLight
                position={[5, 5, 5]}
                intensity={1.5}
                color="#00FFB2"
              />
              <pointLight
                position={[-5, -5, 5]}
                intensity={0.8}
                color="#ffffff"
              />
              <spotLight
                position={[0, 10, 10]}
                angle={0.3}
                intensity={1}
                color="#00FFB2"
                castShadow
              />
              <FloatingStorefront />
              <Environment preset="night" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>

          {/* Floating UI elements */}
          <motion.div
            className="absolute top-16 -left-4 bg-navy-800/80 backdrop-blur-sm border border-mint/20 rounded-lg px-4 py-2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-mint text-sm font-semibold">
              +67% Conversion
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-20 -right-4 bg-navy-800/80 backdrop-blur-sm border border-mint/20 rounded-lg px-4 py-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <span className="text-mint text-sm font-semibold">
              2.3s Load Time
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-14 border-2 border-mint/60 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-mint rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CinematicHero;
