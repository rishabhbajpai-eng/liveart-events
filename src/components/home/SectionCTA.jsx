import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MagneticButton } from '../shared/MagneticButton';

export const SectionCTA = () => {
  const { t } = useLanguage();
  return (
    <div className="py-16 bg-white flex justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)]"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-charcoal/40 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          {t('Don’t risk a boring wedding.', 'बोरिंग शादी का जोखिम न उठाएं।')}
        </p>
        <MagneticButton>
          <Link 
            to="/contact" 
            className="gold-btn px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-105 transition-all flex items-center gap-4"
          >
            {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
            <ArrowRight size={16} />
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  );
};
