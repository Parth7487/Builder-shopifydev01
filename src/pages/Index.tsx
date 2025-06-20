import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import ScrollProgress from "../components/ScrollProgress";
import ElegantNavigation from "../components/sections/ElegantNavigation";
import ElegantHero from "../components/sections/ElegantHero";
import ScrollStoryPanel from "../components/sections/ScrollStoryPanel";
import ElegantServices from "../components/sections/ElegantServices";
import ElegantCaseStudies from "../components/sections/ElegantCaseStudies";
import About from "../components/sections/About";
import AnimatedTestimonials from "../components/sections/AnimatedTestimonials";
import EnhancedContact from "../components/sections/EnhancedContact";
import CinematicFinalCTA from "../components/sections/CinematicFinalCTA";
import Footer from "../components/sections/Footer";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set dark mode by default for the landing page
    document.documentElement.classList.add("dark");

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    return () => {
      // Cleanup function to maintain proper state
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main application */}
      {isLoaded && (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Navigation */}
          <ElegantNavigation />

          {/* Main content */}
          <main>
            <div id="hero">
              <ElegantHero />
            </div>
            <ScrollStoryPanel />
            <div id="services">
              <ElegantServices />
            </div>
            <div id="work">
              <ElegantCaseStudies />
            </div>
            <div id="about">
              <About />
            </div>
            <AnimatedTestimonials />
            <div id="contact">
              <EnhancedContact />
            </div>
            <CinematicFinalCTA />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
