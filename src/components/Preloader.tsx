import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    const startTime = Date.now();
    const duration = 3500; // 3.5 seconds for cinematic feel

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 1200);
        }, 800);
      } else {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [onComplete]);

  // Cinematic Shopify Bag SVG
  const CinematicShopifyBag = () => (
    <div className="relative">
      <svg
        width="100"
        height="100"
        viewBox="0 0 120 120"
        className="text-gold drop-shadow-2xl"
        fill="none"
      >
        {/* Main bag body with gradient effect */}
        <motion.path
          d="M30 42 L90 42 L86 95 L34 95 Z"
          fill="none"
          stroke="url(#bagGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Bag handles */}
        <motion.path
          d="M42 42 V30 C42 21 47 18 60 18 C73 18 78 21 78 30 V42"
          fill="none"
          stroke="url(#handleGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Shopify logo mark */}
        <motion.circle
          cx="60"
          cy="65"
          r="4"
          fill="url(#centerGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD580" />
            <stop offset="100%" stopColor="#FF5E5B" />
          </linearGradient>
          <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5E5B" />
            <stop offset="100%" stopColor="#FFD580" />
          </linearGradient>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#FFD580" />
            <stop offset="100%" stopColor="#FF5E5B" />
          </radialGradient>
        </defs>
      </svg>

      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gold/20 to-accent/20 rounded-full blur-3xl"
        style={{
          width: "200px",
          height: "200px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          exit={{
            scale: 1.1,
            opacity: 0,
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Cinematic background with subtle gradients */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-black cinematic-grain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Subtle grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-[0.02]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.02 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(255,213,128,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,213,128,0.1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -120, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="text-center relative z-10">
            {/* Main logo with cinematic reveal */}
            <motion.div
              className="mb-16"
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3,
              }}
            >
              <CinematicShopifyBag />
            </motion.div>

            {/* Studio branding */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.h1
                className="text-4xl font-bold text-gray-100 mb-3 tracking-tight"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,213,128,0.3)",
                    "0 0 40px rgba(255,213,128,0.6)",
                    "0 0 20px rgba(255,213,128,0.3)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                SHOPIFY DEV STUDIO
              </motion.h1>
              <p className="text-gray-400 text-sm font-light tracking-[0.2em] uppercase">
                Premium Theme Development
              </p>
            </motion.div>

            {/* Progress display */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.div
                className="text-8xl font-bold text-gradient font-mono leading-none mb-2"
                key={Math.floor(progress)}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Math.floor(progress).toString().padStart(2, "0")}
              </motion.div>
              <div className="text-gold/60 text-xs font-light tracking-[0.3em] uppercase">
                PERCENT COMPLETE
              </div>
            </motion.div>

            {/* Cinematic progress bar */}
            <div className="w-96 h-[2px] bg-graphite/50 rounded-full mx-auto mb-12 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold via-accent to-gold rounded-full relative"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Loading status */}
            <motion.p
              className="text-gray-500 text-xs font-light tracking-widest uppercase"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Crafting Experience...
            </motion.p>
          </div>

          {/* Corner frame elements */}
          {[
            { position: "top-8 left-8", rotation: 0 },
            { position: "top-8 right-8", rotation: 90 },
            { position: "bottom-8 left-8", rotation: 270 },
            { position: "bottom-8 right-8", rotation: 180 },
          ].map((corner, index) => (
            <motion.div
              key={index}
              className={`absolute ${corner.position} w-24 h-24`}
              style={{ rotate: corner.rotation }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            >
              <div className="w-full h-full border-l-[1px] border-t-[1px] border-gold/30" />
            </motion.div>
          ))}

          {/* Subtle spotlight effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
