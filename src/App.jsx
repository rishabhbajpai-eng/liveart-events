import { LanguageProvider } from './context/LanguageProvider';
import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, ContactFAB } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';
import Home from './pages/Home';
import Stations from './pages/Stations';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Inspiration from './pages/Inspiration';
import Partner from './pages/Partner';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Birthdays from './pages/Birthdays';
import Weddings from './pages/Weddings';
import WeddingGames from './pages/WeddingGames';
import ServicePage from './pages/ServicePage';
import CityPage from './pages/CityPage';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <HelmetProvider>
        <Router>
          <AppContent />
        </Router>
      </HelmetProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="min-h-screen flex flex-col"
    >
      <ScrollToTop />
      <CustomCursor />
      <Toaster position="top-center" richColors />
      <Navbar />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={<Home onSelectOccasion={setSelectedOccasion} selectedOccasion={selectedOccasion} />} 
            />
            <Route 
              path="/stations" 
              element={<Stations selectedOccasion={selectedOccasion} />} 
            />
            <Route 
              path="/packages" 
              element={<Packages />} 
            />
            <Route 
              path="/gallery" 
              element={<Gallery />} 
            />
            <Route 
              path="/inspiration" 
              element={<Inspiration />} 
            />
            <Route 
              path="/partner" 
              element={<Partner />} 
            />
            <Route 
              path="/blog" 
              element={<Blog />} 
            />
            <Route 
              path="/blog/:id" 
              element={<BlogDetail />} 
            />

            <Route 
              path="/contact" 
              element={<Contact />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/birthdays" 
              element={<Birthdays />} 
            />
            <Route 
              path="/weddings" 
              element={<Weddings />} 
            />
            <Route 
              path="/wedding-games" 
              element={<WeddingGames />} 
            />
            <Route 
              path="/services/:serviceSlug" 
              element={<ServicePage />} 
            />
            <Route 
              path="/city/:citySlug" 
              element={<CityPage />} 
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <ContactFAB />
    </motion.div>
  );
}
