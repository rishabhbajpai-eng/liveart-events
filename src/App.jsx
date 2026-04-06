import { LanguageProvider } from './context/LanguageProvider';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, WhatsAppButton } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Stations from './pages/Stations';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Partner from './pages/Partner';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync with Preloader duration for a seamless transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Preloader />
      {!loading && (
        <Router>
          <AppContent />
        </Router>
      )}
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
              path="/partner" 
              element={<Partner />} 
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
}
