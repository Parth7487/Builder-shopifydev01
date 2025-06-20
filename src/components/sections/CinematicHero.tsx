import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
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
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Main screen */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 5, 0.1]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>

        {/* Screen content */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.6, 4.6, 0.01]} />
          <meshStandardMaterial color="#0D1117" />
        </mesh>

        {/* Header with mint gradient */}
        <mesh position={[0, 1.8, 0.07]}>
          <boxGeometry args={[3.4, 0.6, 0.01]} />
          <meshStandardMaterial
            color="#38F9D7"
            emissive="#38F9D7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Product cards */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.2, 0.07]}>
            <boxGeometry args={[0.8, 1.2, 0.01]} />
            <meshStandardMaterial color="#ffffff" opacity={0.95} transparent />
          </mesh>
        ))}

        {/* CTA Button */}
        <mesh position={[0, -1.5, 0.07]}>
          <boxGeometry args={[2, 0.5, 0.01]} />
          <meshStandardMaterial
            color="#6B7EFF"
            emissive="#6B7EFF"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Floating elements around */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[-3, 2, 1]}>
            <octahedronGeometry args={[0.2]} />
            <meshStandardMaterial color="#38F9D7" wireframe />
          </mesh>
        </Float>

        <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={[3, -1, 0.5]}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial
              color="#6B7EFF"
              emissive="#6B7EFF"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>

        <Float speed={4} rotationIntensity={0.8} floatIntensity={1.2}>
          <mesh position={[-2, -2, 1.5]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#38F9D7" />
          </mesh>
        </Float>
      </group>
    </Float>
  );
};

// Liquid Background Component
const LiquidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawLiquidEffect = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = timeRef.current * 0.001;
      const mouseX = mouseRef.current.x / canvas.width;
      const mouseY = mouseRef.current.y / canvas.height;

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * mouseX,
        canvas.height * mouseY,
        0,
        canvas.width * mouseX,
        canvas.height * mouseY,
        canvas.width * 0.8,
      );

      gradient.addColorStop(0, "rgba(56, 249, 215, 0.1)");
      gradient.addColorStop(0.3, "rgba(107, 126, 255, 0.05)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x <= canvas.width; x += 20) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.01 + time + i * 2) * Math.PI) * 50 +
            Math.sin((mouseX * 10 + time + i) * Math.PI) * 30;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(${i === 0 ? "56, 249, 215" : "107, 126, 255"}, ${
          0.1 - i * 0.02
        })`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      timeRef.current += 16.67; // ~60fps
      animationFrame = requestAnimationFrame(drawLiquidEffect);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    drawLiquidEffect();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

const CinematicHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

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
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-navy to-black" />

      {/* Liquid interactive background */}
      <LiquidBackground />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(56,249,215,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,249,215,0.1) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-32 left-16 w-16 h-16 border border-mint/30 rotate-45"
        animate={{
          rotate: [45, 225, 405],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-64 right-20 w-12 h-12 bg-violet/20 rounded-full"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left content */}
        <motion.div
          className="text-center lg:text-left space-y-12"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tight">
              <motion.span
                className="block text-white uppercase"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                We Bring
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-mint via-mint/90 to-violet bg-clip-text text-transparent uppercase"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                animate-style={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
              >
                Shopify
              </motion.span>
              <motion.span
                className="block text-white uppercase"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                Dreams
              </motion.span>
              <motion.span
                className="block text-mint uppercase"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(56,249,215,0.5)",
                    "0 0 40px rgba(56,249,215,0.8)",
                    "0 0 20px rgba(56,249,215,0.5)",
                  ],
                }}
                style={{ animationDuration: "3s", animationRepeat: "infinite" }}
              >
                to Life
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            Custom Shopify themes built for{" "}
            <motion.span
              className="text-mint font-semibold"
              animate={{
                color: ["#38F9D7", "#6B7EFF", "#38F9D7"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              bold, growing brands
            </motion.span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-mint to-violet rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Button
                onClick={() => scrollToSection("contact")}
                className="relative bg-gradient-to-r from-mint to-violet text-black hover:from-mint/90 hover:to-violet/90 font-bold text-lg px-12 py-4 rounded-lg overflow-hidden group tracking-wider uppercase"
              >
                <span className="relative z-10">Schedule a Call</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Button>
            </motion.div>

            <motion.button
              onClick={() => scrollToSection("work")}
              className="text-mint border border-mint/40 hover:border-mint/80 px-8 py-4 rounded-lg transition-all duration-300 relative group font-medium tracking-wider uppercase"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <span className="relative z-10">View Our Work</span>
              <motion.div
                className="absolute inset-0 bg-mint/5 rounded-lg"
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
          transition={{ duration: 1.5, delay: 1 }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.3} />
              <pointLight
                position={[5, 5, 5]}
                intensity={1.5}
                color="#38F9D7"
              />
              <pointLight
                position={[-5, -5, 5]}
                intensity={1}
                color="#6B7EFF"
              />
              <spotLight
                position={[0, 10, 10]}
                angle={0.3}
                intensity={1.2}
                color="#38F9D7"
                castShadow
              />
              <FloatingStorefront />
              <Environment preset="night" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
              />
            </Suspense>
          </Canvas>

          {/* Floating performance metrics */}
          <motion.div
            className="absolute top-20 -left-6 bg-black/80 backdrop-blur-sm border border-mint/30 rounded-lg px-4 py-3"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-mint font-bold text-lg">+89%</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">
              Conversion
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-24 -right-6 bg-black/80 backdrop-blur-sm border border-violet/30 rounded-lg px-4 py-3"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <div className="text-violet font-bold text-lg">1.2s</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">
              Load Time
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -left-8 bg-black/80 backdrop-blur-sm border border-mint/30 rounded-lg px-4 py-3"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <div className="text-mint font-bold text-lg">98%</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">
              Lighthouse
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-8 h-16 border-2 border-mint/60 rounded-full flex justify-center p-3">
          <motion.div
            className="w-1 h-4 bg-gradient-to-b from-mint to-violet rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CinematicHero;
