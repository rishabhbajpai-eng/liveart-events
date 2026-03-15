import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Menu, X, Instagram, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('Home', 'होम'), href: '/' },
    { name: t('Stations', 'स्टेशन्स'), href: '/stations' },
    { name: t('Packages', 'पैकेज'), href: '/packages' },
    { name: t('Gallery', 'गैलरी'), href: '/gallery' },
    { name: t('Partner', 'पार्टनर'), href: '/partner' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-snow/90 backdrop-blur-xl border-b-2 border-transparent overflow-hidden">
      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] party-gradient animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-ocean to-firozi rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg"></div>
                <div className="absolute inset-0 bg-ink rounded-xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-white/10"></div>
                <span className="relative text-snow font-display text-2xl font-black z-10">L</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-display font-black text-ink tracking-tighter">
                  Live<span className="text-ocean italic">Art</span>
                </span>
                <span className="text-[8px] font-black tracking-[0.3em] text-ink/40 uppercase">Events.in</span>
              </div>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`transition-all font-black uppercase text-xs tracking-widest ${
                  location.pathname === link.href ? 'text-ocean' : 'text-ink/70 hover:text-ocean'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-1.5 border-2 border-ocean rounded-full text-[10px] font-black text-ocean hover:bg-ocean hover:text-snow transition-all uppercase tracking-tighter"
            >
              {language === 'en' ? 'HINDI' : 'ENGLISH'}
            </button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/919999999999" 
              className="bg-emerald text-snow px-6 py-2.5 rounded-full font-black text-sm hover:shadow-lg transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <MessageCircle size={18} />
              {t('Book Now', 'अभी बुक करें')}
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-[10px] font-black text-ocean border-2 border-ocean px-2 py-0.5 rounded-full"
            >
              {language === 'en' ? 'HI' : 'EN'}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 flex items-center justify-center bg-ink text-snow rounded-full"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-snow border-b-2 border-ink/5 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`block text-2xl font-display font-bold transition-colors ${
                    location.pathname === link.href ? 'text-ocean' : 'text-ink hover:text-ocean'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <a href="https://wa.me/919999999999" className="block w-full bg-emerald text-snow text-center py-4 rounded-2xl font-black text-lg shadow-xl">
                  {t('Book on WhatsApp', 'व्हाट्सएप पर बुक करें')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-ink text-snow py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-firozi rounded-full flex items-center justify-center text-ink font-display text-xl shadow-lg">L</div>
            <span className="text-2xl font-display font-bold text-firozi">LiveArt Events</span>
          </div>
          <p className="text-snow/60 text-base leading-relaxed max-w-xs">
            {t(
              "India's only mobile multi-station DIY activity service for personal celebrations.",
              "व्यक्तिगत उत्सवों के लिए भारत की एकमात्र मोबाइल मल्टी-स्टेशन DIY गतिविधि सेवा।"
            )}
          </p>
          <div className="flex gap-6">
            <motion.a whileHover={{ scale: 1.2, color: '#00ced1' }} href="#" className="text-snow/40 transition-colors"><Instagram size={24} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#00ced1' }} href="#" className="text-snow/40 transition-colors"><MessageCircle size={24} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#00ced1' }} href="#" className="text-snow/40 transition-colors"><Phone size={24} /></motion.a>
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-xl mb-8 text-firozi uppercase tracking-widest">{t('Quick Links', 'त्वरित लिंक')}</h4>
          <ul className="space-y-4 text-snow/50 font-medium">
            <li><Link to="/stations" className="hover:text-snow transition-colors">{t('Activity Stations', 'गतिविधि स्टेशन्स')}</Link></li>
            <li><Link to="/packages" className="hover:text-snow transition-colors">{t('Package Builder', 'पैकेज बिल्डर')}</Link></li>
            <li><Link to="/gallery" className="hover:text-snow transition-colors">{t('Gallery', 'गैलरी')}</Link></li>
            <li><Link to="/partner" className="hover:text-snow transition-colors">{t('Referral Program', 'रेफरल प्रोग्राम')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-firozi uppercase tracking-widest">{t('Locations', 'स्थान')}</h4>
          <ul className="space-y-4 text-snow/50 font-medium">
            <li>{t('Across India', 'पूरे भारत में')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-firozi uppercase tracking-widest">{t('Contact Us', 'संपर्क करें')}</h4>
          <div className="space-y-4 text-snow/50 font-medium">
            <p className="leading-relaxed">
              {t('Available Across India', 'पूरे भारत में उपलब्ध')}
            </p>
            <p className="text-snow tracking-widest">+91 99999 99999</p>
            <p className="text-snow/70">hello@liveartevents.in</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-snow/20 text-xs tracking-[0.3em] uppercase">
        © 2024 LiveArt Events. {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}
      </div>
    </footer>
  );
};

export const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/919999999999?text=Hi LiveArt! I'm interested in booking a DIY station for my event."
      className="whatsapp-sticky"
      aria-label="Chat on WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        stroke="currentColor" 
        strokeWidth="0" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};
