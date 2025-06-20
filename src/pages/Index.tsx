import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import ScrollProgress from "../components/ScrollProgress";
import CinematicNavigation from "../components/sections/CinematicNavigation";
import CinematicHero from "../components/sections/CinematicHero";
import EnhancedServices from "../components/sections/EnhancedServices";
import InteractiveCaseStudies from "../components/sections/InteractiveCaseStudies";
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
          <CinematicNavigation />

          {/* Main content */}
          <main>
            <div id="hero">
              <CinematicHero />
            </div>
            <div id="services">
              <EnhancedServices />
            </div>
            <div id="work">
              <InteractiveCaseStudies />
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
