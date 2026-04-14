import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 relative"
    >
      <section id="gallery" className="py-20 lg:py-32 bg-charcoal overflow-hidden relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] border border-white/20 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 lg:mb-20">
            <motion.span 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple font-black tracking-[0.3em] lg:tracking-[0.4em] text-[10px] lg:text-xs uppercase mb-4 block"
            >
              {t('Join the Celebration', 'उत्सव में शामिल हों')}
            </motion.span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display text-paper mb-6">#LiveArtMoments</h2>
            <p className="text-paper/40 text-base lg:text-lg">Real smiles, real crafts, real party vibes.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
              'https://images.unsplash.com/photo-1519741497674-611481863552',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
              'https://images.unsplash.com/photo-1513151233558-d860c5398176',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
              'https://images.unsplash.com/photo-1594122230689-45899d9e6f69',
              'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539',
              'https://images.unsplash.com/photo-1520854221256-17451cc331bf'
            ].map((url, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="aspect-square bg-paper/5 rounded-[24px] lg:rounded-[32px] overflow-hidden group border-2 border-white/5"
              >
                <img 
                  src={`${url}?auto=format&fit=crop&q=80&w=600`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 lg:mt-20 text-center">
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="#" 
              className="inline-flex items-center gap-3 lg:gap-4 text-purple font-black text-lg lg:text-xl uppercase tracking-widest"
            >
              <Instagram size={24} />
              @liveartevents.in
            </motion.a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Gallery;
