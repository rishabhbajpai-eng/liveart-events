import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
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
      <MagneticButton>
        <Link 
          to="/contact" 
          className="group relative flex items-center gap-6 bg-ink text-white px-8 py-6 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(0,206,209,0.3)] hover:scale-105 hover:bg-ocean transition-all duration-500 active:scale-95 border border-white/10"
        >
          <span className="relative z-10 font-black tracking-[0.2em] uppercase text-[10px]">{t('Book Experience', 'अनुभव बुक करें')}</span>
          <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-firozi transition-colors shadow-lg">
            <Phone className="text-ink w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-firozi/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
      </MagneticButton>
    </motion.div>
  );
};
