import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const Partner = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 relative"
    >
      <section id="partner" className="py-20 lg:py-32 bg-paper relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="w-24 lg:w-32 h-24 lg:h-32 bg-paper/10 border border-paper/20 rounded-full flex items-center justify-center mx-auto mb-8 lg:mb-12 shadow-2xl animate-float">
            <span className="text-4xl lg:text-5xl">🤝</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display text-charcoal mb-6 lg:mb-8 leading-tight">
            {t('Are you an', 'क्या आप एक')} <br />
            <span className="text-teal italic">{t('Event Planner?', 'इवेंट प्लानर हैं?')}</span>
          </h2>
          <p className="text-charcoal/60 mb-10 lg:mb-12 text-lg lg:text-xl leading-relaxed">
            Partner with us and bring India&apos;s most unique DIY experiences to your clients. 
            Enjoy a <span className="text-teal font-black">12% referral commission</span> on every successful booking.
          </p>
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(26,26,26,0.2)" }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/919999999999?text=I'm an event planner and I'd like to partner with LiveArt." 
            className="inline-block bg-charcoal text-paper px-10 lg:px-16 py-4 lg:py-6 rounded-full font-black text-lg lg:text-xl transition-all"
          >
            Apply for Partner Program
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default Partner;
