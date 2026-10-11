import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Work from '@/components/site/Work';
import Building from '@/components/site/Building';
import Experience from '@/components/site/Experience';
import Education from '@/components/site/Education';
import Toolkit from '@/components/site/Toolkit';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';

// The skip link lives in the Spaces layout, ahead of the page bar.
const Index = () => (
  <>
    <Header />
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <Work />
      <Experience />
      <Building />
      <Education />
      <Toolkit />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
