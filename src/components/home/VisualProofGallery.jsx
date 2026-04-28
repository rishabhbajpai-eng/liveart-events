import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export const VisualProofGallery = () => {
  const { t } = useLanguage();
  const images = [
    "https://images.unsplash.com/photo-1519671482749-fd09be45bc36?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop"
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('Real Moments We Created', 'वास्तविक क्षण जो हमने बनाए')}</h2>
          <p className="text-charcoal/40 text-lg">{t('No generic decor. Pure guest interaction and authentic emotion.', 'कोई सामान्य सजावट नहीं। शुद्ध अतिथि सहभागिता और प्रामाणिक भावना।')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="aspect-[3/4] rounded-[40px] overflow-hidden group shadow-xl"
            >
              <img src={img} alt="LiveArt Experience Zone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <p className="text-charcoal/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8 italic">
             {t('LiveArt Experience Zones™: Where guests become part of the art.', 'लाइवआर्ट एक्सपीरियंस जोन™: जहाँ मेहमान कला का हिस्सा बन जाते हैं।')}
           </p>
           <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px]">
             {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
           </Link>
        </div>
      </div>
    </section>
  );
};
