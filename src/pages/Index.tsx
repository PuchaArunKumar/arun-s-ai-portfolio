import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ImpactGlance from '@/components/ImpactGlance';
import About from '@/components/About';
import ResearchPhilosophy from '@/components/ResearchPhilosophy';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import MLProduction from '@/components/MLProduction';
import Experience from '@/components/Experience';
import Publications from '@/components/Publications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ImpactGlance />
        <About />
        <ResearchPhilosophy />
        <Skills />
        <Projects />
        <MLProduction />
        <Experience />
        <Publications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
