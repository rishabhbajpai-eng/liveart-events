import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export const EmotionalInterrupt = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-8"
          >
            {t('Let’s be honest...', 'ईमानदारी से बात करें तो...')}
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-display text-charcoal leading-tight max-w-4xl">
            {t('Most weddings look beautiful. But very few', 'अधिकांश शादियाँ सुंदर दिखती हैं। लेकिन बहुत कम')} <br />
            <span className="text-gold italic underline underline-offset-[12px] decoration-1">{t('Feel Alive', 'जीवंत महसूस होती हैं')}</span>.
          </h2>
          
          <div className="mt-16 w-12 h-px bg-charcoal/10"></div>
          
          <p className="mt-12 text-charcoal/40 text-sm font-black uppercase tracking-widest max-w-lg leading-loose italic">
            {t('Conventional decor captures eyes. LiveArt Experience Zones™ capture souls.', 'पारंपरिक सजावट आँखों को पकड़ती है। लाइवआर्ट एक्सपीरियंस जोन™ आत्माओं को पकड़ते हैं।')}
          </p>
        </div>
      </div>
    </section>
  );
};
