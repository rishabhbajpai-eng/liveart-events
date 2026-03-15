import { LanguageProvider } from './context/LanguageContext';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, WhatsAppButton } from './components/Layout';
import Home from './pages/Home';
import Stations from './pages/Stations';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Partner from './pages/Partner';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

function AppContent() {
  const [selectedOccasion, setSelectedOccasion] = useState('wedding');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
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
    </div>
  );
}
