import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ProblemSolution from '../components/ProblemSolution';
import ServicesShowcase from '../components/ServicesShowcase';
import AboutSection from '../components/AboutSection';
import CurriculumSection from '../components/CurriculumSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProblemSolution />
      <AboutSection />
      <ServicesShowcase />
      <CurriculumSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default HomePage;
