import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-charcoal/30 z-[60] origin-left"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-gold via-accent to-gold relative overflow-hidden"
        style={{ scaleX }}
      >
        {/* Shimmer effect on the progress bar */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollProgress;
