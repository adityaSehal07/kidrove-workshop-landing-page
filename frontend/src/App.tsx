import { useRef } from "react";
import Hero from "./components/Hero";
import WorkshopDetails from "./components/WorkshopDetails";
import LearningOutcomes from "./components/LearningOutcomes";
import Faq from "./components/Faq";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";

function App() {
  const formSectionRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Hero onEnrollClick={scrollToForm} />
      <WorkshopDetails />
      <LearningOutcomes />
      <Faq />
      <RegistrationForm ref={formSectionRef} />
      <Footer />
    </div>
  );
}

export default App;
