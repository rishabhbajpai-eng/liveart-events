import { motion } from 'motion/react';
import { Sparkles, Zap, Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ExperienceMarquee = () => {
  const { t } = useLanguage();
  const baseItems = [
    { text: t('EXPERIENCE DESIGN', 'एक्सपीरियंस डिज़ाइन'), icon: <Sparkles className="w-8 h-8" /> },
    { text: t('INTERACTIVE', 'इंटरैक्टिव'), icon: <Zap className="w-8 h-8" /> },
    { text: t('GUEST ENGAGEMENT', 'अतिथि सहभागिता'), icon: <Heart className="w-8 h-8" /> },
    { text: t('ROYAL LUXURY', 'शाही विलासिता'), icon: <ShieldCheck className="w-8 h-8" /> },
  ];

  const items = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

  return (
    <div className="bg-charcoal py-10 overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-charcoal z-10 pointer-events-none"></div>
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 items-center whitespace-nowrap px-10"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 text-paper/20 group hover:text-gold transition-colors duration-500">
            <span className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase">{item.text}</span>
            <div className="text-gold/40 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
