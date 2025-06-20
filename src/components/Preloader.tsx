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
    const duration = 3000; // 3 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 1000);
        }, 500);
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

  // Shopify Bag SVG Icon
  const ShopifyBagIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      className="text-mint"
      fill="currentColor"
    >
      <motion.path
        d="M25 35 L75 35 L72 80 L28 80 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M35 35 V25 C35 18 40 15 50 15 C60 15 65 18 65 25 V35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.circle
        cx="50"
        cy="55"
        r="3"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
      />
    </svg>
  );

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Gradient background overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black via-navy to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Animated grid background */}
          <motion.div
            className="absolute inset-0 opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1.5 }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(56,249,215,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,249,215,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-mint/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="text-center relative z-10">
            {/* Shopify Bag Icon */}
            <motion.div
              className="mb-12"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="relative">
                <motion.div
                  className="flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ShopifyBagIcon />
                </motion.div>

                {/* Orbital rings */}
                <motion.div
                  className="absolute inset-0 border border-mint/20 rounded-full"
                  style={{
                    width: "120px",
                    height: "120px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 border border-violet/10 rounded-full"
                  style={{
                    width: "160px",
                    height: "160px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Pulsing glow */}
                <motion.div
                  className="absolute inset-0 bg-mint/10 rounded-full blur-xl"
                  style={{
                    width: "200px",
                    height: "200px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2 tracking-wider uppercase">
                SHOPIFY DEV STUDIO
              </h1>
              <p className="text-gray-400 text-sm font-light tracking-widest uppercase">
                Premium Theme Development
              </p>
            </motion.div>

            {/* Progress counter */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div
                className="text-7xl font-bold text-gradient font-mono leading-none"
                key={Math.floor(progress)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.floor(progress).toString().padStart(3, "0")}
              </motion.div>
              <div className="text-mint/60 text-sm font-light tracking-widest uppercase mt-2">
                PERCENT
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-80 h-1 bg-navy/50 rounded-full mx-auto mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-mint via-violet to-mint rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-gray-500 text-xs font-light tracking-wider uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Experience...
            </motion.p>
          </div>

          {/* Corner frame decorations */}
          <motion.div
            className="absolute top-8 left-8 w-20 h-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="w-full h-full border-l-2 border-t-2 border-mint/30" />
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 w-20 h-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="w-full h-full border-r-2 border-t-2 border-violet/30" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8 w-20 h-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-full h-full border-l-2 border-b-2 border-violet/30" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-full h-full border-r-2 border-b-2 border-mint/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
