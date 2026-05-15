import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { OCCASIONS } from '../../constants';

export const OccasionSelector = ({ onSelect, activeOccasion }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xPos = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section ref={sectionRef} className="py-32 bg-paper overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <motion.span 
          style={{ x: xPos }}
          className="text-[30vw] font-display font-black whitespace-nowrap"
        >
          CELEBRATE
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-display text-primary mb-4">{t('Choose Your Vibe', 'अपना वाइब चुनें')}</h2>
          <p className="text-charcoal/60 text-lg">{t('We curate experiences that match your celebration perfectly.', 'हम ऐसे अनुभव तैयार करते हैं जो आपके उत्सव से पूरी तरह मेल खाते हैं।')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {OCCASIONS.map((occasion, idx) => (
            <motion.button 
              key={occasion.id} 
              onClick={() => {
                onSelect(occasion.id);
                navigate(`/${occasion.id}s`);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative h-[400px] overflow-hidden rounded-[40px] bg-charcoal shadow-2xl transition-all duration-500 ${
                activeOccasion === occasion.id ? 'ring-4 ring-gold ring-offset-4' : ''
              }`}
            >
              <img 
                src={occasion.image} 
                alt={occasion.name} 
                className={`w-full h-full object-cover group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ${
                  activeOccasion === occasion.id ? 'opacity-80 scale-105' : 'opacity-60'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
              
              <div className="absolute top-8 left-8 z-30 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white italic">
                  {t('Serving modern weddings across Uttar Pradesh', 'उत्तर प्रदेश में आधुनिक शादियों की सेवा')}
                </span>
              </div>
              <div className={`absolute inset-0 border-2 transition-all duration-500 m-4 rounded-[32px] ${
                activeOccasion === occasion.id ? 'border-white/40' : 'border-white/0 group-hover:border-white/20'
              }`}></div>
              
              <div className="absolute bottom-10 left-10 right-10 text-left">
                <span className="text-gold font-black text-xs tracking-[0.3em] uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  {t('Interactive Experience', 'इंटरैक्टिव अनुभव')}
                </span>
                <h3 className="text-paper font-display text-4xl leading-tight mb-2">{t(occasion.name, occasion.nameHi)}</h3>
                
                {occasion.subEvents && (
                  <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                    {occasion.subEvents.map(sub => (
                      <span key={sub.id} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-paper">
                        {t(sub.name, sub.nameHi)}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-paper/60 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                  {occasion.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
