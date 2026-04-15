import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './HomeSections';

export const FloatingCTA = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.0 }}
      className="fixed bottom-8 right-10 z-[60] flex flex-col gap-4 items-end"
    >
      {/* WhatsApp Button */}
      <MagneticButton>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-gold/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal">
              {t('Online: Response in 30m', 'ऑनलाइन: 30 मिनट में जवाब')}
            </span>
          </div>
          <a 
            href="https://wa.me/919582538183" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group relative z-50 pointer-events-auto"
          >
            <MessageCircle size={30} fill="currentColor" />
          </a>
        </div>
      </MagneticButton>

      <MagneticButton>
        <Link 
          to="/contact" 
          className="group relative flex items-center gap-6 bg-charcoal text-white px-8 py-6 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-gold/30 hover:scale-105 hover:bg-primary transition-all duration-500 active:scale-95 border border-white/10"
        >
          <span className="relative z-10 font-black tracking-[0.2em] uppercase text-[10px]">{t('Book Your Experience Call', 'अपना अनुभव कॉल बुक करें')}</span>
          <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-gold transition-colors shadow-lg">
            <Phone className="text-charcoal w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
      </MagneticButton>
    </motion.div>
  );
};
