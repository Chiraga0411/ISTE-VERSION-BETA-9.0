import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Scanlines from './components/Scanlines';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import Background from './components/Background';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <Background>
      <div className="relative min-h-screen bg-transparent">
        <AnimatePresence>
          {!booted && <LoadingScreen onComplete={() => setBooted(true)} />}
        </AnimatePresence>

        <CustomCursor />
        <Scanlines />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Timeline />
          <Prizes />
          <Gallery />
          <Sponsors />
          <FAQs />
        </main>

        <Footer />
      </div>
    </Background>
  );
}
