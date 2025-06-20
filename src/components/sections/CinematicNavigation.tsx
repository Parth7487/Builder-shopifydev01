import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CinematicNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ["hero", "services", "work", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-mint/10 shadow-2xl"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => scrollToSection("hero")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-mint via-mint/80 to-violet rounded-lg flex items-center justify-center relative">
                  <span className="text-black font-bold text-xl">S</span>
                  <motion.div
                    className="absolute inset-0 border-2 border-mint/30 rounded-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              <div>
                <motion.span
                  className="text-white font-bold text-xl tracking-wider uppercase"
                  animate={
                    isScrolled
                      ? {}
                      : {
                          textShadow: [
                            "0 0 5px rgba(56,249,215,0.5)",
                            "0 0 20px rgba(56,249,215,0.8)",
                            "0 0 5px rgba(56,249,215,0.5)",
                          ],
                        }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Dev Studio
                </motion.span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-6 py-3 text-white hover:text-mint transition-all duration-300 font-medium tracking-wider uppercase text-sm ${
                    activeSection === item.id ? "text-mint" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mint to-violet"
                      layoutId="navIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mint/5 to-violet/5 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-mint to-violet text-black hover:from-mint/90 hover:to-violet/90 font-bold px-8 py-3 rounded-lg relative overflow-hidden group tracking-wider uppercase text-sm"
                >
                  <span className="relative z-10">Start the Conversation</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(56,249,215,0.4)",
                        "0 0 40px rgba(107,126,255,0.6)",
                        "0 0 20px rgba(56,249,215,0.4)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-6 h-0.5 bg-white mb-1.5" />
                <div className="w-6 h-0.5 bg-white mb-1.5" />
                <div className="w-6 h-0.5 bg-white" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-navy/98 backdrop-blur-xl border-t border-mint/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white hover:text-mint transition-colors duration-200 py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-mint/20 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-mint to-mint/80"
          style={{
            scaleX: 0,
            transformOrigin: "left",
          }}
          animate={{
            scaleX:
              typeof window !== "undefined"
                ? window.scrollY /
                  (document.documentElement.scrollHeight - window.innerHeight)
                : 0,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </>
  );
};

export default CinematicNavigation;
