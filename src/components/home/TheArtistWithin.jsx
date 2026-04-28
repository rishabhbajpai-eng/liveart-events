import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MagneticButton } from '../shared/MagneticButton';

export const TheArtistWithin = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=2000&auto=format&fit=crop" 
                alt="The joy of creation" 
                className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-0"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 text-teal font-black uppercase tracking-[0.3em] text-xs">
              <div className="w-10 h-px bg-teal"></div>
              {t('Beyond Activities', 'गतिविधियों से परे')}
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display leading-[1.1] text-charcoal">
              {t('A Celebration of', 'उत्सव')} <br />
              <span className="text-gold italic">{t('Connection', 'संबंधों का')}</span>
            </h2>
            
            <p className="text-xl text-charcoal/60 leading-relaxed font-medium">
              {t('At LiveArt, we don’t just host stalls; we create spaces where hands meet, laughter flows, and memories are born. Every pot painted and every jar filled is a bridge between generations.', 'लाइवआर्ट में, हम केवल स्टॉल नहीं लगाते; हम ऐसे स्थान बनाते हैं जहाँ हाथ मिलते हैं, हंसी बहती है और यादें पैदा होती हैं। पेंट किया गया हर बर्तन और भरा हुआ हर जार पीढ़ियों के बीच एक पुल है।')}
            </p>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-charcoal/5">
              <div>
                <h4 className="text-3xl font-display text-charcoal mb-1">98%</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-charcoal/40">{t('Guest Engagement', 'मेहमानों की भागीदारी')}</p>
              </div>
              <div>
                <h4 className="text-3xl font-display text-charcoal mb-1">10k+</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-charcoal/40">{t('Smiles Created', 'मुस्कानें बनाईं')}</p>
              </div>
            </div>
            
            <MagneticButton className="inline-block">
              <Link to="/gallery" className="inline-flex items-center gap-4 bg-charcoal text-white px-10 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl group">
                {t('View Our Story', 'हमारी कहानी देखें')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
