import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import haldiHero from '../../assets/haldi-hero.png';
import heroInteraction from '../../assets/hero-interaction.png';

const FloatingHeroBlob = ({ floatX, floatY, index }) => {
  const x = useTransform(floatX, (val) => val * (index + 1) * 0.2);
  const y = useTransform(floatY, (val) => val * (index + 1) * 0.2);

  const positions = [
    { width: 400, height: 400, left: '10%', top: '20%' },
    { width: 300, height: 300, left: '70%', top: '15%' },
    { width: 500, height: 500, left: '40%', top: '60%' },
    { width: 250, height: 250, left: '80%', top: '70%' },
    { width: 350, height: 350, left: '15%', top: '80%' },
    { width: 450, height: 450, left: '60%', top: '40%' },
  ];

  const style = positions[index % positions.length];

  return (
    <motion.div
      style={{ x, y }}
      className="absolute rounded-full bg-purple/10 blur-3xl"
      initial={style}
    />
  );
};

export const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-charcoal noise-bg mesh-gradient">
      <div className="la-monogram">LA</div>

      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <img 
          src={haldiHero} 
          alt="Luxury Event" 
          className="w-full h-full object-cover animate-slow-zoom grayscale-[0.1] contrast-[1.1] mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/2 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,206,209,0.1)_0%,transparent_70%)]"
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingHeroBlob key={i} index={i} floatX={floatX} floatY={floatY} />
        ))}
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 w-full pt-32 pb-20 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            style={{ y: textY }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, cubicBezier: [0.2, 0.65, 0.3, 0.9] }}
            className="lg:col-span-8 text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full mb-10 shadow-2xl"
            >
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
              <span className="text-xs lg:text-sm font-black tracking-[0.3em] text-paper uppercase glow-text">
                {t('Crafted for Modern Indian Weddings', 'आधुनिक भारतीय शादियों के लिए तैयार किया गया')}
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display leading-[0.9] mb-10 tracking-tighter perspective-1000 relative z-20">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="block text-white"
              >
                {t('Ordinary is easy.', 'साधारण आसान है।')}
              </motion.span> 
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-gold italic font-bold block my-4"
              >
                {t('Extraordinary is LiveArt.', 'असाधारण लाइवआर्ट है।')}
              </motion.span> 
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-white/60 text-lg md:text-xl block mt-6 font-sans tracking-[0.1em] uppercase font-black"
              >
                {t('A great wedding is seen. A memorable one is experienced.', 'एक अच्छी शादी देखी जाती है। एक यादगार शादी का अनुभव किया जाता है।')}
              </motion.span>
            </h1>
            
            <div className="mt-8 mb-12 py-3 px-6 bg-paper/5 backdrop-blur-md border border-paper/10 rounded-xl inline-block">
               <p className="text-paper/60 text-xs font-black uppercase tracking-widest italic leading-relaxed">
                  {t('This isn’t event planning. This is experience design.', 'यह ईवेंट प्लानिंग नहीं है। यह एक्सपीरियंस डिज़ाइन है।')}
               </p>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl lg:text-3xl text-paper/80 mb-14 leading-relaxed max-w-3xl font-light tracking-wide drop-shadow-xl"
            >
              {t(
                "Your guests won’t remember the decor. They’ll remember how they felt.",
                "आपके मेहमानों को सजावट याद नहीं रहेगी। उन्हें याद रहेगा कि उन्होंने कैसा महसूस किया।"
              )}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:hidden mb-12 aspect-[4/5] rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl relative group"
            >
               <img 
                 src={heroInteraction} 
                 className="w-full h-full object-cover saturate-[1.2] brightness-[0.9]" 
                 alt="Experience Joy" 
               />
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent">
                  <p className="text-gold font-black text-[10px] uppercase tracking-widest italic drop-shadow-md">{t('Human Connection & Discovery', 'मानवीय संबंध और खोज')}</p>
               </div>
            </motion.div>

            <div className="mb-8 inline-block px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg text-gold text-xs font-black uppercase tracking-widest">
               {t('Specializing in guest engagement and experience design for modern celebrations.', 'आधुनिक उत्सवों के लिए अतिथि सहभागिता और अनुभव डिज़ाइन में विशेषज्ञता।')}
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-stretch sm:items-center relative z-20">
              <div className="flex flex-col gap-4">
                <Link 
                  to="/contact" 
                  className="gold-btn group relative px-10 py-5 rounded-none tracking-widest uppercase text-sm font-semibold text-center"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <span>{t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
                  </div>
                </Link>
                <p className="text-paper/40 text-[10px] uppercase font-black tracking-widest pl-2 italic">
                   {t('Only limited weddings taken each month to maintain experience quality.', 'अनुभव की गुणवत्ता बनाए रखने के लिए हर महीने सीमित शादियां ही ली जाती हैं।')}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  to="/stations" 
                  className="group px-10 py-5 tracking-widest uppercase text-sm font-semibold text-cream border border-gold/50 hover:border-gold transition-all flex items-center justify-center gap-4 relative overflow-hidden"
                >
                  <span className="relative z-10">{t('Explore Experience Zones™', 'एक्सपीरियंस जोन™ देखें')}</span>
                  <div className="absolute inset-0 bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
                <p className="text-paper/40 text-[10px] uppercase font-black tracking-widest pl-2 italic">
                   {t('Peak season dates get booked weeks in advance.', 'पीक सीजन की तारीखें हफ्तों पहले बुक हो जाती हैं।')}
                </p>
              </div>
            </div>

            <div className="mt-20 flex flex-wrap gap-12 border-t border-white/10 pt-12">
              {[
                { label: 'Events Hosted', value: '500+' },
                { label: 'Happy Guests', value: '25k+' },
                { label: 'Cities Covered', value: '18+' }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className="text-4xl font-display text-paper mb-2 group-hover:text-gold transition-colors duration-500">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-paper/40">{stat.label}</div>
                  <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-4 hidden lg:block relative perspective-1000">
            <motion.div 
              style={{ 
                rotateX: useTransform(floatY, y => y * 0.1),
                rotateY: useTransform(floatX, x => x * -0.1)
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="relative aspect-[3/4] rounded-[80px] overflow-hidden border-[12px] border-white/5 shadow-2xl group cursor-none"
            >
              <img 
                src={heroInteraction} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[1.2]" 
                alt="Live Event Experience" 
              />
              <div className="absolute top-8 left-8 z-30 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white italic">
                  {t('Serving modern weddings across Uttar Pradesh', 'उत्तर प्रदेश में आधुनिक शादियों की सेवा')}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute bottom-16 left-12 right-12 translate-z-50">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-gold font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-3"
                >
                   <span className="w-4 h-[1px] bg-gold"></span>
                   Featured Setup
                </motion.div>
                <div className="text-paper text-5xl font-display leading-tight">{t('Experience the Joy', 'जोय का अनुभव करें')}</div>
              </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-12 -right-12 w-48 h-48 bg-paper rounded-full flex items-center justify-center p-8 shadow-2xl -rotate-12 backdrop-blur-3xl border border-charcoal/5"
            >
              <div className="text-center">
                <div className="text-charcoal font-black text-4xl leading-tight glow-text">10x</div>
                <div className="text-charcoal/40 text-[10px] font-black uppercase tracking-widest mt-1">Attractive</div>
              </div>
            </motion.div>
            
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gold rounded-3xl rotate-12 -z-10 shadow-2xl opacity-50 blur-xl"></div>
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-40 px-4 py-8 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
      >
        <div className="w-1 h-3 rounded-full bg-purple animate-bounce"></div>
      </motion.div>
    </section>
  );
};
