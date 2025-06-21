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
          <main className="relative">
            {/* Hero Section */}
            <div id="hero" className="relative z-20">
              <ElegantHero />
            </div>

            {/* Story Panel Section */}
            <div className="relative z-10">
              <ScrollStoryPanel />
            </div>

            {/* Services Section */}
            <div id="services" className="relative z-20">
              <ElegantServices />
            </div>

            {/* Work Section */}
            <div id="work" className="relative z-20">
              <ElegantCaseStudies />
            </div>

            {/* About Section */}
            <div id="about" className="relative z-20">
              <About />
            </div>

            {/* Testimonials Section */}
            <div className="relative z-20">
              <AnimatedTestimonials />
            </div>

            {/* Contact Section */}
            <div id="contact" className="relative z-20">
              <EnhancedContact />
            </div>

            {/* Final CTA Section */}
            <div className="relative z-20">
              <CinematicFinalCTA />
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
