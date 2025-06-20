import { useEffect } from "react";
import Navigation from "../components/sections/Navigation";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import CaseStudies from "../components/sections/CaseStudies";
import About from "../components/sections/About";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/sections/Footer";

const Index = () => {
  useEffect(() => {
    // Set dark mode by default for the landing page
    document.documentElement.classList.add("dark");

    // Cleanup function to maintain proper state
    return () => {
      // Optional: remove dark class if needed when component unmounts
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Services />
      <CaseStudies />
      <About />
      <Testimonials />
      <Contact />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
