import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Menu, X, Instagram, Phone, Facebook, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('Home', 'होम'), href: '/' },
    { name: t('Stations', 'स्टेशन्स'), href: '/stations' },
    { name: t('Packages', 'पैकेज'), href: '/packages' },
    { name: t('Inspiration', 'प्रेरणा'), href: '/inspiration' },
    { name: t('Gallery', 'गैलरी'), href: '/gallery' },
    { name: t('Partner', 'पार्टनर'), href: '/partner' },
    { name: t('Blog', 'ब्लॉग'), href: '/blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-paper/90 backdrop-blur-xl border-b-2 border-transparent overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden shadow-[0_0_15px_rgba(184,115,51,0.15)] bg-cream border border-copper/10 group-hover:scale-105 transition-transform duration-500">
                <img src={logoImg} alt="LiveArt Events Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-display font-black text-charcoal tracking-tighter">
                  Live<span className="text-copper italic">Art</span>
                </span>
                <span className="text-[8px] font-black tracking-[0.3em] text-charcoal/40 uppercase">Events.in</span>
              </div>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`transition-all font-black uppercase text-xs tracking-widest ${
                  location.pathname === link.href ? 'text-teal' : 'text-charcoal/70 hover:text-teal'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-1.5 border-2 border-teal rounded-full text-[10px] font-black text-teal hover:bg-teal hover:text-paper transition-all uppercase tracking-tighter"
            >
              {language === 'en' ? 'HINDI' : 'ENGLISH'}
            </button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/919999999999" 
              className="bg-slate text-paper px-6 py-2.5 rounded-full font-black text-sm hover:shadow-lg transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <MessageCircle size={18} />
              {t('Book Now', 'अभी बुक करें')}
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-[10px] font-black text-teal border-2 border-teal px-2 py-0.5 rounded-full"
            >
              {language === 'en' ? 'HI' : 'EN'}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 flex items-center justify-center bg-charcoal text-paper rounded-full"
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
            className="md:hidden bg-paper border-b-2 border-charcoal/5 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`block text-2xl font-display font-bold transition-colors ${
                    location.pathname === link.href ? 'text-teal' : 'text-charcoal hover:text-teal'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <a href="https://wa.me/919999999999" className="block w-full bg-slate text-paper text-center py-4 rounded-2xl font-black text-lg shadow-xl">
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
    <footer className="bg-charcoal text-paper py-20 px-4 relative overflow-hidden">
      {/* LA Monogram Background */}
      <div className="la-monogram !text-copper/5 pointer-events-none">LA</div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(184,115,51,0.2)] border border-copper/30 bg-cream">
               <img src={logoImg} alt="LiveArt Events Logo" className="w-full h-full object-cover scale-[1.3] pt-1" />
            </div>
            <span className="text-2xl font-display font-bold text-purple">LiveArt Events</span>
          </div>
          <p className="text-paper/60 text-base leading-relaxed max-w-xs">
            {t(
              "India's leading Experience Design collective creating interactive celebrations for personal events.",
              "लक्जरी इंटरैक्टिव उत्सव बनाने वाली भारत की अग्रणी एक्सपीरियंस डिज़ाइन टीम।"
            )}
          </p>
          <div className="flex gap-6">
            <motion.a whileHover={{ scale: 1.2, color: '#00ced1' }} href="#" className="text-paper/40 transition-colors"><Instagram size={24} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#00ced1' }} href="#" className="text-paper/40 transition-colors"><MessageCircle size={24} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#00ced1' }} href="#" className="text-paper/40 transition-colors"><Phone size={24} /></motion.a>
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-xl mb-8 text-purple uppercase tracking-widest">{t('Quick Links', 'त्वरित लिंक')}</h4>
          <ul className="space-y-4 text-paper/50 font-medium">
            <li><Link to="/stations" className="hover:text-paper transition-colors">{t('Activity Stations', 'गतिविधि स्टेशन्स')}</Link></li>
            <li><Link to="/packages" className="hover:text-paper transition-colors">{t('Package Builder', 'पैकेज बिल्डर')}</Link></li>
            <li><Link to="/gallery" className="hover:text-paper transition-colors">{t('Gallery', 'गैलरी')}</Link></li>
            <li><Link to="/partner" className="hover:text-paper transition-colors">{t('Referral Program', 'रेफरल प्रोग्राम')}</Link></li>
            <li><Link to="/blog" className="hover:text-paper transition-colors">{t('Blog', 'ब्लॉग')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-purple uppercase tracking-widest">{t('Locations', 'स्थान')}</h4>
          <ul className="space-y-4 text-paper/50 font-medium">
            <li>{t('Across India', 'पूरे भारत में')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-purple uppercase tracking-widest">{t('Contact Us', 'संपर्क करें')}</h4>
          <div className="space-y-4 text-paper/50 font-medium">
            <p className="leading-relaxed">
              {t('Available Across India', 'पूरे भारत में उपलब्ध')}
            </p>
            <p className="text-paper tracking-widest">+91 99999 99999</p>
            <p className="text-paper/70">hello@liveartevents.in</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-paper/20 text-xs tracking-[0.3em] uppercase">
        © 2026 LiveArt Events. {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}
      </div>
    </footer>
  );
};

export const ContactFAB = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const fabRef = React.useRef(null);

  const channels = [
    { 
      id: 'contact', 
      name: t('Book Now', 'अभी बुक करें'), 
      icon: <MousePointer2 size={16} />, 
      href: '/contact', 
      gradient: 'linear-gradient(135deg, #00CED1 0%, #0077B6 100%)',
      label: 'Book Experience',
      shadow: 'shadow-purple/30',
      isInternal: true
    },
    { 
      id: 'facebook', 
      name: t('Facebook', 'फेसबुक'), 
      icon: <Facebook size={18} />, 
      href: 'https://facebook.com/liveartevents', 
      gradient: 'linear-gradient(135deg, #1877F2 0%, #0C63D4 100%)',
      label: 'Facebook',
      shadow: 'shadow-blue-600/30'
    },
    { 
      id: 'instagram', 
      name: t('Instagram', 'इंस्टाग्राम'), 
      icon: <Instagram size={18} />, 
      href: 'https://instagram.com/liveartevents', 
      gradient: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
      label: 'Instagram',
      shadow: 'shadow-pink-500/30'
    },
    { 
      id: 'pinterest', 
      name: t('Pinterest', 'पिंटरेस्ट'), 
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.654 2.569-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.138.892 2.738.1.12.115.223.085.345-.094.393-.309 1.25-.353 1.432-.058.24-.192.29-.442.175-1.644-.763-2.67-3.16-2.67-5.087 0-4.139 3.009-7.938 8.656-7.938 4.544 0 8.071 3.226 8.071 7.546 0 4.513-2.844 8.147-6.804 8.147-1.33 0-2.578-.69-3.003-1.493l-.819 3.11c-.296 1.141-1.099 2.568-1.639 3.429a12.13 12.13 0 003.37.472c6.621 0 11.988-5.366 11.988-11.987C23.992 5.368 18.63 0 12.017 0z"/>
        </svg>
      ), 
      href: 'https://pin.it/A9pbFdUQT', 
      gradient: 'linear-gradient(135deg, #E60023 0%, #ff4b2b 100%)',
      label: 'Pinterest',
      shadow: 'shadow-red-500/30'
    },
    { 
      id: 'whatsapp', 
      name: t('WhatsApp', 'व्हाट्सएप'), 
      icon: <MessageCircle size={18} />, 
      href: 'https://wa.me/919999999999', 
      gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
      label: 'WhatsApp',
      shadow: 'shadow-green-500/30'
    },
    { 
      id: 'call', 
      name: t('Call Us', 'हमें कॉल करें'), 
      icon: <Phone size={18} />, 
      href: 'tel:+919999999999', 
      gradient: 'linear-gradient(135deg, #007BFF 0%, #00d2ff 100%)',
      label: 'Call',
      shadow: 'shadow-blue-500/30'
    },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={fabRef} className="fixed bottom-[20px] right-[20px] z-[9999] flex flex-col items-center">
      {/* Backdrop with stronger blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Sub Buttons */}
      <div className="flex flex-col gap-5 mb-6 items-center">
        <AnimatePresence mode="popLayout">
          {isOpen && channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 30, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 30, scale: 0.5, rotate: -20 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 25, 
                delay: index * 0.08 
              }}
              className="relative group"
            >
              <div className="absolute right-full mr-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0">
                <div className="glass-pill px-4 py-2 rounded-2xl text-[10px] font-black text-paper uppercase tracking-[0.2em] whitespace-nowrap border border-white/30 shadow-2xl">
                  {channel.label}
                </div>
              </div>

              {channel.isInternal ? (
                <Link
                  to={channel.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 ${channel.shadow} transition-shadow duration-300 relative overflow-hidden bg-teal group/btn`}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 drop-shadow-lg">
                    {channel.icon}
                  </div>
                </Link>
              ) : (
                <motion.a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ background: channel.gradient }}
                  className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 ${channel.shadow} transition-shadow duration-300 relative overflow-hidden group/btn`}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 drop-shadow-lg">
                    {channel.icon}
                  </div>
                </motion.a>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Button Premium Overhaul */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-[54px] h-[54px] rounded-2xl party-gradient text-paper flex items-center justify-center shadow-[0_15px_35px_rgba(0,206,209,0.3)] relative z-50 border-2 border-white/30 overflow-hidden group`}
      >
        {/* Inner Glow Surround */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
        
        <motion.div
          animate={{ 
            rotate: isOpen ? 135 : 0,
            scale: isOpen ? 0.9 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative z-10"
        >
          {isOpen ? <X size={24} strokeWidth={3} /> : <MessageCircle size={24} strokeWidth={3} />}
        </motion.div>
        
        {/* Multi-layered Pulse */}
        <AnimatePresence>
          {!isOpen && (
            <>
              <motion.span 
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl bg-purple/50 -z-10"
              ></motion.span>
              <motion.span 
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl bg-teal/30 -z-10"
              ></motion.span>
            </>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
