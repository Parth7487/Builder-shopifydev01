import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import ScrollProgress from "../components/ScrollProgress";
import ElegantNavigation from "../components/sections/ElegantNavigation";
import ElegantHero from "../components/sections/ElegantHero";
import AnimatedTestimonials from "../components/sections/AnimatedTestimonials";
import Footer from "../components/sections/Footer";
import { VelocityScroll } from "../components/ui/scroll-based-velocity";

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
            {/* Hero Section - Banner */}
            <div id="hero" className="relative z-20">
              <ElegantHero />
            </div>

            {/* Clients Section - Testimonials */}
            <div className="relative z-20">
              <AnimatedTestimonials />
            </div>
          </main>

          {/* Scroll Velocity Section */}
          <div className="relative z-20">
            <VelocityScroll
              text="Shopify Development • Performance Optimization • Custom Themes • "
              default_velocity={5}
              className="text-4xl font-light text-beige"
            />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
