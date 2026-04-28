import { useRef, useState, useEffect } from 'react';
import haldiHero from '../assets/haldi-hero.png';
import { useLanguage } from '../context/LanguageContext';
import { OCCASIONS, STATIONS, BLOG_POSTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Users, Sparkles, X, CheckCircle2, PlayCircle, Clock, BadgeIndianRupee, Tag, ShieldCheck, Zap, Heart, Check } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { LeadForm } from './LeadForm';
import emotionalMoment from '../assets/emotional-moment.png';
import heroInteraction from '../assets/hero-interaction.png';
export const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FloatingHeroBlob = ({ floatX, floatY, index }) => {
  const x = useTransform(floatX, (val) => val * (index + 1) * 0.2);
  const y = useTransform(floatY, (val) => val * (index + 1) * 0.2);

  // Use fixed positions to satisfy React Purity rules
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
      {/* Dynamic Background Base */}
      {/* LA Monogram Background */}
      <div className="la-monogram">LA</div>

      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <img 
          src={haldiHero} 
          alt="Luxury Event" 
          className="w-full h-full object-cover animate-slow-zoom grayscale-[0.1] contrast-[1.1] mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        {/* Layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        
        {/* Animated Light Beams */}
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

      {/* Floating Decorative Elements with Parallax */}
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
            {/* Premium Pill Badge */}
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

            {/* Mobile-Only High-Energy Close-Up Interaction */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:hidden mb-12 aspect-[4/5] rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl relative group"
            >
               <img 
                 src="https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-full object-cover saturate-[1.2] brightness-[0.9]" 
                 alt="Experience Joy" 
               />
               {/* Subtle Dark Overlay for Readability */}
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

            {/* Stats Row */}
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
              {/* Trust Line */}
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

            {/* Floating Elements */}
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

      {/* Modern Scroll Indicator */}
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
      {/* Decorative background text */}
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
                navigate('/stations');
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
              
              {/* Trust Line */}
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

// Highlight chip variants per category
const chipConfig = {
  lifestyle: { label: 'Includes premium materials', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  craft: { label: 'Includes all craft supplies', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  food: { label: 'Fresh ingredients daily', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  beauty: { label: 'Professional artist included', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  wellness: { label: 'Expert therapist included', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  entertainment: { label: 'Interactive experience', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  gaming: { label: 'All equipment provided', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

const StationCard = ({ station, t, isExpanded, toggleExpand, openVideo, idx }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "0px 0px -100px 0px" });
  const chip = chipConfig[station.category] || { label: 'Premium experience', color: 'bg-gray-50 text-gray-700 border-gray-200' };

  useEffect(() => {
    let interval;
    if (station.gallery && station.gallery.length > 1 && !isExpanded && isInView) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % station.gallery.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [station.gallery, isExpanded, isInView]);

  const displayImage = station.gallery && station.gallery.length > 0 && !isExpanded
    ? station.gallery[currentImageIndex]
    : station.image;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: idx < 8 ? idx * 0.05 : 0 }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group cursor-pointer" onClick={() => toggleExpand(station.id)}>
        <AnimatePresence>
          <motion.img
            key={displayImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            src={displayImage}
            alt={station.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg">
            {station.category}
          </span>
        </div>

        {station.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <button
              onClick={(e) => { e.stopPropagation(); openVideo(station.videoUrl, station.name); }}
              className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 transform hover:scale-105 transition-all shadow-xl"
            >
              <PlayCircle size={18} className="text-primary" />
              {t('Watch Demo', 'डेमो')}
            </button>
          </div>
        )}
      </div>

      <div className="p-5 lg:p-6" onClick={() => toggleExpand(station.id)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight group-hover:text-gold transition-colors">
            {t(station.name, station.nameHi)}
          </h3>
        </div>

        <p className="text-sm lg:text-base text-gray-500 line-clamp-2 mb-4">
          {t(station.description, station.descriptionHi)}
        </p>

        <div className="flex items-center gap-4 py-3 border-y border-gray-100 mb-4 bg-gray-50/50 -mx-5 px-5 lg:-mx-6 lg:px-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gold" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">2-4 hrs</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gold" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">30+ Guests</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <BadgeIndianRupee size={16} className="text-gold" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">Priced per guest</span>
          </div>
        </div>

        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${chip.color}`}>
            <Tag size={12} />
            {t(chip.label, chip.label)}
          </span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-black uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                  <Sparkles size={16} />
                  {t("What's Included", 'क्या शामिल है')}
                </h4>
                <ul className="space-y-3 mb-6">
                  {[
                    t('Premium raw materials', 'प्रीमियम कच्चा माल'),
                    t('Expert facilitator', 'विशेषज्ञ सूत्रधार'),
                    t('Custom packaging', 'कस्टम पैकेजिंग'),
                    t('Setup & Cleanup', 'सेटअप और सफाई')
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {station.gallery && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('Gallery', 'गैलरी')}</h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
                      {station.gallery.map((img, imgIdx) => (
                        <div key={imgIdx} className="min-w-[120px] h-[90px] rounded-2xl overflow-hidden shrink-0 snap-start bg-gray-100 shadow-sm">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                   <button 
                     onClick={(e) => { e.stopPropagation(); toggleExpand(null); }}
                     className="text-gray-500 hover:text-gray-900 font-bold text-sm tracking-wide transition-colors"
                   >
                     {t('Close Details', 'विवरण बंद करें')}
                   </button>
                   {station.videoUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openVideo(station.videoUrl, station.name); }}
                      className="text-gold font-bold flex items-center gap-1.5 hover:text-gold/80 transition-colors"
                    >
                      <PlayCircle size={18} />
                      {t('Demo', 'डेमो')}
                    </button>
                   )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const StationCatalogue = ({ selectedOccasion }) => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [expandedId, setExpandedId] = useState(null);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-scroll to station if ID is in URL
  useEffect(() => {
    const stationId = searchParams.get('id');
    if (stationId) {
      setTimeout(() => {
        const element = document.getElementById(stationId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setExpandedId(stationId);
        }
      }, 800); // Wait for the page/catalogue to render
    }
  }, [searchParams]);

  const occasionName = OCCASIONS.find(o => o.id === selectedOccasion)?.name || '';
  const occasionNameHi = OCCASIONS.find(o => o.id === selectedOccasion)?.nameHi || '';

  // Derive unique categories from all stations
  const categories = ['all', ...Array.from(new Set(STATIONS.map(s => s.category)))];

  // Show all stations by default; filter by occasion if set, then by selected category
  const occasionFiltered = selectedOccasion
    ? STATIONS.filter(s => s.popularFor?.includes(selectedOccasion))
    : STATIONS;

  const filteredStations = (activeCategory === 'all'
    ? occasionFiltered
    : occasionFiltered.filter(s => s.category === activeCategory)
  ).filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || (s.nameHi && s.nameHi.includes(searchQuery));
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openVideo = (url, title) => {
    setVideoModal({ isOpen: true, url, title });
  };

  return (
    <section id="stations" className="bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16">
        {/* Header - Zomato Style App Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                {occasionName
                  ? t(`${occasionName} Stations`, `${occasionNameHi} स्टेशन्स`)
                  : t('Activity Stations', 'गतिविधि स्टेशन्स')}
              </h2>
              <p className="text-gray-500 font-medium mt-1">
                {filteredStations.length} {t('experiences available', 'अनुभव उपलब्ध')}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setExpandedId(null); }}
              placeholder={t('Search activities...', 'गतिविधि खोजें...')}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter Pill Tabs (Zomato Style Horizons) */}
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gold hover:text-primary hover:bg-gold/5'
                }`}
              >
                {cat === 'all' ? t('ALL', 'सभी') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card List - Masonry grid layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredStations.map((station, idx) => (
              <div key={station.id} className="break-inside-avoid shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-none bg-cream border border-copper/10">
                <StationCard
                  station={station}
                  t={t}
                  isExpanded={expandedId === station.id}
                  toggleExpand={toggleExpand}
                  openVideo={openVideo}
                  idx={idx}
                />
              </div>
            ))}
          </AnimatePresence>

          {filteredStations.length === 0 && (
            <div className="col-span-full py-20 text-center break-inside-avoid">
               <div className="text-6xl mb-4 opacity-50">🖼️</div>
               <h3 className="text-xl font-display font-medium text-gray-900 mb-2">{t('No matching experiences found', 'कोई मेल खाने वाला अनुभव नहीं मिला')}</h3>
               <p className="text-gray-500 font-light">{t('Try adjusting your search or filters.', 'अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
          >
            <div 
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-md"
              onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
            ></div>
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-5 lg:p-6 flex justify-between items-center border-b border-gray-100">
                <h3 className="text-xl lg:text-2xl font-black text-gray-900">{t(videoModal.title, videoModal.title)} - {t('Demo', 'डेमो')}</h3>
                <button 
                  onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                  className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <video 
                  src={videoModal.url} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-teal-600 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-semibold text-center sm:text-left">
                  {t('Love this station? Add it to your custom package!', 'यह स्टेशन पसंद आया? इसे अपने कस्टम पैकेज में जोड़ें!')}
                </p>
                <a 
                  href="#packages" 
                  onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                  className="bg-white text-primary px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
                >
                  {t('Build Package', 'पैकेज बनाएं')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const TrustSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-primary text-paper overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-charcoal/20 skew-x-12 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-gold/20 border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {t('Unmatched Excellence', 'अतुलनीय उत्कृष्टता')}
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">
            {t('Why Luxury Hosts Choose', 'लक्जरी मेज़बान क्यों चुनते हैं')} <br />
            <span className="text-gold italic">LiveArt Events</span>
          </h2>
          <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-paper/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-display mb-2">{t('Bespoke Experience Design', 'बेस्पोक एक्सपीरियंस डिज़ाइन')}</h4>
                <p className="text-paper/60 text-base">{t('Premium guest engagement from setup to cleanup. We handle the aesthetics while you host the moments.', 'सेटअप से लेकर सफाई तक प्रीमियम अतिथि जुड़ाव। जब आप क्षणों की मेजबानी करते हैं तो हम सौंदर्यशास्त्र को संभालते हैं।')}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-paper/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-display mb-2">{t('Emotional ROI', 'इमोशनल ROI')}</h4>
                <p className="text-paper/60 text-base">{t('Guests talk about our stations long after the party. It\'s the "wow" factor your event deserves.', 'मेहमान पार्टी के लंबे समय बाद तक हमारे स्टेशनों के बारे में बात करते हैं। यह वह "वाह" कारक है जिसका आपका कार्यक्रम हकदार है।')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative max-w-md mx-auto lg:max-w-none">
          <motion.div 
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="aspect-square rounded-[40px] lg:rounded-[60px] overflow-hidden rotate-3 shadow-2xl border-8 border-white/5"
          >
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" alt="Happy Guests" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="absolute -bottom-10 lg:-bottom-12 -left-6 lg:-left-10 bg-white text-charcoal p-8 lg:p-10 rounded-[40px] shadow-2xl -rotate-6 max-w-[260px] lg:max-w-[320px] border border-gray-100"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 text-gold fill-gold" />)}
            </div>
            <p className="font-display text-lg lg:text-xl leading-snug mb-4 italic text-teal">&quot;The most premium addition to our event. Pure class!&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold">RK</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest leading-none">Mrs. Kapoor</p>
                <p className="text-[10px] text-charcoal/40 font-bold uppercase mt-1">Lalit Luxury Hotels</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const InquirySection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-32 bg-paper relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none translate-y-1/2 translate-x-1/4">
        <span className="text-[40vw] font-display font-black leading-none">LUXE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 text-left">
            <h2 className="text-6xl md:text-8xl font-display text-charcoal mb-4 leading-[0.9]">
              {t('Because your wedding', 'क्योंकि आपकी शादी')} <br />
              <span className="text-gold italic">{t('Deserves the Extraordinary.', 'असाधारण की हकदार है।')}</span>
            </h2>
            <p className="text-charcoal text-2xl mb-10 font-black uppercase tracking-widest">
              {t('Refuse to be ordinary.', 'साधारण होने से इनकार करें।')}
            </p>
            <p className="text-charcoal/40 text-sm mb-12 italic font-display max-w-xl mx-auto">
              &quot;{t('Years from now, people won’t remember the decorations. They’ll remember how your celebration felt.', 'अब से बरसों बाद, लोग सजावट को याद नहीं रखेंगे। उन्हें याद रहेगा कि आपका उत्सव कैसा महसूस हुआ।')}&quot;
            </p>
            <div className="mb-12">
               <p className="text-charcoal/60 text-xs font-black uppercase tracking-widest mb-6 italic">
                  {t('Make your event impossible to forget.', 'अपने ईवेंट को भूलना असंभव बनाएं।')}
               </p>
               <MagneticButton>
                 <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase shadow-xl inline-block text-center">
                   {t('Plan My Wedding Experience', 'मेरी शादी के अनुभव की योजना बनाएं')}
                 </Link>
               </MagneticButton>
            </div>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Zap className="text-gold" />
                </div>
                <div>
                  <h4 className="text-2xl font-display text-charcoal mb-2">{t('Express Booking', 'एक्सप्रेस बुकिंग')}</h4>
                  <p className="text-charcoal/60">{t('Secure your date in under 60 seconds. We value your time as much as your experience.', '60 सेकंड से भी कम समय में अपनी तारीख सुरक्षित करें। हम आपके अनुभव के साथ-साथ आपके समय को भी महत्व देते हैं।')}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Sparkles className="text-gold" />
                </div>
                <div>
                  <h4 className="text-2xl font-display text-charcoal mb-2">{t('Custom Themes', 'कस्टम थीम्स')}</h4>
                  <p className="text-charcoal/60">{t('Every station is tailored to match your event color palette and prestige.', 'प्रत्येक स्टेशन आपके इवेंट कलर पैलेट और प्रतिष्ठा से मेल खाने के लिए तैयार किया गया है।')}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-charcoal rounded-[40px] text-paper relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <p className="text-gold font-black text-xs uppercase tracking-[0.3em] mb-4">{t('Direct Line', 'सीधी लाइन')}</p>
                <p className="text-3xl font-display mb-2">+91 88532 99951</p>
                <p className="text-paper/40 text-sm font-medium">{t('Available 10 AM - 10 PM IST', 'सुबह 10 बजे - रात 10 बजे IST तक उपलब्ध')}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export const BlogPreview = () => {
  const { language, t } = useLanguage();
  
  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-6">
              {t('Event Insights &', 'इवेंट अंतर्दृष्टि और')} <br />
              <span className="text-teal italic">{t('Creative Ideas', 'रचनात्मक विचार')}</span>
            </h2>
            <p className="text-charcoal/60 text-lg">
              {t('Expert tips and inspiration for making your next celebration truly extraordinary.', 'अगले उत्सव को वास्तव में असाधारण बनाने के लिए विशेषज्ञ सुझाव और प्रेरणा।')}
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group flex items-center gap-3 text-teal font-black uppercase tracking-widest text-sm hover:gap-5 transition-all"
          >
            {t('View All Posts', 'सभी पोस्ट देखें')}
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group flex flex-col"
            >
              <Link to={`/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                    {language === 'hi' ? post.categoryHi : post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  {new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-teal transition-colors line-clamp-2 leading-tight">
                  <Link to={`/blog/${post.id}`}>
                    {language === 'hi' ? post.titleHi : post.title}
                  </Link>
                </h3>
                
                <p className="text-slate-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {language === 'hi' ? post.summaryHi : post.summary}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link to={`/blog/${post.id}`} className="text-teal font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                    {t('Read Story', 'कहानी पढ़ें')}
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

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
            {/* Decorative elements */}
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


export const ProcessSection = () => {
  const { t } = useLanguage();
  const steps = [
    {
      id: 1,
      title: t('The Vision', 'विज़न'),
      description: t('We meet for a personalized styling session to understand your event’s unique soul and guest profile.', 'हम आपके कार्यक्रम की अनूठी आत्मा और अतिथि प्रोफाइल को समझने के लिए एक व्यक्तिगत स्टाइलिंग सत्र के लिए मिलते हैं।'),
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 2,
      title: t('The Curation', 'क्यूरेशन'),
      description: t('Our Experience Designers handpick and personalize activity stations that reflect your brand and taste.', 'हमारे एक्सपीरियंस डिज़ाइनर उन गतिविधि स्टेशनों को चुनते हैं और वैयक्तिकृत करते हैं जो आपके ब्रांड और स्वाद को दर्शाते हैं।'),
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      id: 3,
      title: t('The Magic', 'जादू'),
      description: t('We arrive, execute seamlessly with white-glove service, and transform your event into a world of interaction.', 'हम पहुँचते हैं, पूर्ण सेवा के साथ निर्बाध रूप से निष्पादित करते हैं, और आपके इवेंट को बातचीत की दुनिया में बदल देते हैं।'),
      icon: <Heart className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-32 bg-cream text-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('How It Works', 'यह कैसे काम करता है')}</h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            {t('Three simple steps to transform your celebration from ordinary to extraordinary.', 'अपने उत्सव को साधारण से असाधारण में बदलने के लिए तीन सरल कदम।')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-px bg-charcoal/10 -z-0"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 text-center flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-gold group-hover:text-primary transition-all duration-500 transform group-hover:-rotate-12">
                {step.icon}
              </div>
              <h3 className="text-2xl font-display mb-4">{step.title}</h3>
              <p className="text-charcoal/60 leading-relaxed text-sm lg:text-base">{step.description}</p>
              
              <div className="absolute -top-6 -left-6 text-9xl font-display font-black text-charcoal/[0.03] pointer-events-none select-none">
                0{step.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SocialProof = () => {
  const { t } = useLanguage();
  const testimonials = [
    {
      quote: t('LiveArt didn’t just add activities; they added soul to our wedding. Our guests couldn’t stop talking about it even weeks after the celebration.', 'लाइवआर्ट ने केवल गतिविधियां नहीं जोड़ीं; उन्होंने हमारी शादी में जान डाल दी। हमारे मेहमान उत्सव के हफ़्तों बाद भी इसके बारे में बात करना बंद नहीं कर सके।'),
      author: 'Priya & Rahul',
      role: t('Modern Couple', 'आधुनिक जोड़ा')
    },
    {
      quote: t('The perfume bar was a masterstroke. Our friends ignored the dance floor just to create their signature scents. It was the talk of the night.', 'परफ्यूम बार एक मास्टरस्ट्रोक था। हमारे दोस्तों ने केवल अपनी सिग्नेचर खुशबू बनाने के लिए डांस फ्लोर को नज़रअंदाज़ कर दिया। यह रात की चर्चा थी।'),
      author: 'Sahil Mehra',
      role: t('Visionary Host', 'विज़नरी होस्ट')
    },
    {
      quote: t('Every guest left with a handmade memory and a story to tell. Finally, an event where people actually interacted instead of just sitting.', 'हर मेहमान एक हाथ से बनी याद और बताने के लिए एक कहानी के साथ गया। अंत में, एक ऐसा कार्यक्रम जहाँ लोग सिर्फ बैठने के बजाय वास्तव में बातचीत करते थे।'),
      author: 'Anjali Kapoor',
      role: t('Luxury Curator', 'लक्जरी क्यूरेटर')
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-gold/5 text-gold rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles size={14} />
            {t('Trusted by modern couples', 'आधुनिक जोड़ों द्वारा विश्वसनीय')}
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-charcoal leading-tight">
            {t('Real Stories from', 'से वास्तविक')} <br />
            <span className="text-gold italic">{t('Real Celebrations', 'कहानियां')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[40px] bg-paper-dark border border-gray-100 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Sparkles key={i} size={14} className="text-gold fill-gold" />)}
              </div>
              <p className="text-xl font-display text-charcoal leading-relaxed italic mb-10 text-pretty">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal font-black text-xs uppercase">
                  {item.author.split(' ')[0][0]}{item.author.split(' & ')[1] ? item.author.split(' & ')[1][0] : ''}
                </div>
                <div>
                  <h4 className="font-bold text-charcoal leading-none mb-1">{item.author}</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-charcoal/40">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExclusivityScarcity = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-charcoal text-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 text-gold">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">{t('Exclusivity Guaranteed', 'अनन्यत की गारंटी')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display mb-6">
              {t('We take limited bookings each month to ensure premium quality.', 'हम प्रीमियम गुणवत्ता सुनिश्चित करने के लिए हर महीने सीमित बुकिंग लेते हैं।')}
            </h2>
            <p className="text-paper/60 text-lg">
              {t('Each celebration receives our full focus, from custom designs to white-glove execution. Secure your date early for the legendary LiveArt experience.', 'प्रत्येक उत्सव को हमारा पूरा ध्यान मिलता है, कस्टम डिज़ाइन से लेकर व्हाइट-ग्लव निष्पादन तक। महान लाइवआर्ट अनुभव के लिए अपनी तारीख जल्दी सुरक्षित करें।')}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 text-center">
             <h4 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-6">{t('Elite Scarcity', 'विशेष उपलब्धता')}</h4>
             <div className="mb-8">
               <p className="text-paper/40 text-sm mb-2 uppercase tracking-widest">{t('Starting from', 'से शुरू')}</p>
               <h3 className="text-5xl md:text-6xl font-display">₹15,000</h3>
             </div>
             <p className="text-paper/60 text-sm mb-10 leading-relaxed italic">
               {t('Bookings are confirmed only after a quick consultation to ensure the right fit.', 'सही फिट सुनिश्चित करने के लिए त्वरित परामर्श के बाद ही बुकिंग की पुष्टि की जाती है।')}
             </p>
             <Link 
               to="/contact" 
               className="inline-block bg-paper text-charcoal px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gold transition-all"
             >
               {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export const PainPointSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-cream text-charcoal overflow-hidden border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-display mb-10 leading-tight text-primary">
              {t('Why Most Weddings Feel', 'अधिकांश शादियाँ क्यों महसूस होती हैं')} <br />
              <span className="text-gold italic underline decoration-1 underline-offset-8">{t('Forgettable', 'भूलने योग्य')}</span>
            </h2>
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="text-charcoal/20 text-5xl font-display group-hover:text-gold transition-colors">01</div>
                <div>
                   <h4 className="text-2xl font-display mb-3">{t('The Idle Guest Problem', 'बेकार बैठे मेहमानों की समस्या')}</h4>
                   <p className="text-charcoal/60 leading-relaxed italic">{t('Guests spend hours watching the stage, feeling disconnected and bored during long ceremonies.', 'मेहमान घंटों स्टेज देखते हुए बिताते हैं, लंबी रस्मों के दौरान कटा हुआ और ऊब महसूस करते हैं।')}</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="text-charcoal/20 text-5xl font-display group-hover:text-gold transition-colors">02</div>
                <div>
                   <h4 className="text-2xl font-display mb-3">{t('Repetitive Functions', 'वही पुराने फंक्शन')}</h4>
                   <p className="text-charcoal/60 leading-relaxed italic">{t('The same generic decor and routines that your guests have seen in every wedding this season.', 'वही पुराने डेकोर और रूटीन जो आपके मेहमानों ने इस सीजन की हर शादी में देखे हैं।')}</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="text-charcoal/20 text-5xl font-display group-hover:text-gold transition-colors">03</div>
                <div>
                   <h4 className="text-2xl font-display mb-3">{t('Lack of Interaction', 'बातचीत की कमी')}</h4>
                   <p className="text-charcoal/60 leading-relaxed italic">{t('Limited opportunities for guests to connect, create memories, and truly engage with your celebration.', 'मेहमानों के लिए जुड़ने, यादें बनाने और आपके उत्सव के साथ वास्तव में शामिल होने के सीमित अवसर।')}</p>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-10 border-t border-charcoal/10">
               <p className="text-3xl font-display text-gold italic mb-8">{t('That’s exactly what we solve.', 'यही वह समस्या है जिसे हम हल करते हैं।')}</p>
               <MagneticButton>
                 <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase shadow-xl inline-block">
                   {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
                 </Link>
               </MagneticButton>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-[80px] overflow-hidden rotate-3 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" alt="Bored Guests at Wedding" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
             </div>
             <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-10">
                <div className="text-white text-4xl font-display drop-shadow-2xl italic font-light leading-relaxed">&quot;{t('Don’t let your event be just another blur.', 'अपने ईवेंट को केवल एक धुंधलापन न बनने दें।')}&quot;</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhoItIsFor = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-charcoal text-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('Designed For The Few', 'कुछ चुनिंदा लोगों के लिए डिज़ाइन किया गया')}</h2>
          <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Qualification Process', 'योग्यता प्रक्रिया')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-12 bg-white/5 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
              <Sparkles />
            </div>
            <h4 className="text-2xl font-display mb-4">{t('For High-Vision Couples', 'हाई-विज़न जोड़ों के लिए')}</h4>
            <p className="text-paper/40 leading-relaxed italic">{t('For those who want their wedding to stand out and be remembered as a cultural moment, not just a function.', 'उन लोगों के लिए जो चाहते हैं कि उनकी शादी अलग दिखे और एक सांस्कृतिक क्षण के रूप में याद रखी जाए, न कि केवल एक समारोह के रूप में।')}</p>
          </div>
          
          <div className="p-12 bg-white/5 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
              <Heart />
            </div>
            <h4 className="text-2xl font-display mb-4">{t('For Experience-First Hosts', 'अनुभव-प्रथम मेजबानों के लिए')}</h4>
            <p className="text-paper/40 leading-relaxed italic">{t('For hosts who truly care about guest joy and want every person to leave with a handmade memory.', 'उन मेजबानों के लिए जो वास्तव में मेहमानों की खुशी की परवाह करते हैं और चाहते हैं कि हर व्यक्ति हाथ से बनी याद के साथ जाए।')}</p>
          </div>
          
          <div className="p-12 bg-gold/10 rounded-[40px] border border-gold/30">
            <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-charcoal mb-8">
              <Zap />
            </div>
            <h4 className="text-2xl font-display mb-4">{t('Not For The Ordinary', 'साधारण के लिए नहीं')}</h4>
            <p className="text-paper/60 leading-relaxed italic">{t('If you are looking for basic, generic decoration-only events, we are probably not the right fit. We design interaction.', 'यदि आप बुनियादी, सामान्य सजावट-मात्र कार्यक्रमों की तलाश में हैं, तो हम शायद सही फिट नहीं हैं। हम इंटरेक्शन डिज़ाइन करते हैं।')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export const LossAversionSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-charcoal text-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="aspect-square rounded-[80px] overflow-hidden rotate-2 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=2000&auto=format&fit=crop" alt="Stale Wedding Moment" className="w-full h-full object-cover" />
             </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-display mb-10 leading-tight">
              {t('Without the right experience,', 'बिना सही अनुभव के,')} <br />
              <span className="text-gold italic">{t('Even the best weddings fall flat.', 'सबसे अच्छी शादियाँ भी फीकी पड़ जाती हैं।')}</span>
            </h2>
            <div className="space-y-10 mb-16">
               <div className="flex gap-6 items-start">
                  <div className="text-gold mt-1"><X size={20} /></div>
                  <p className="text-paper/60 text-lg leading-relaxed italic">{t('Guests spend most of the night sitting, watching, and waiting to leave.', 'मेहमान रात का अधिकांश समय बैठने, देखने और जाने का इंतज़ार करने में बिताते हैं।')}</p>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="text-gold mt-1"><X size={20} /></div>
                  <p className="text-paper/60 text-lg leading-relaxed italic">{t('Zero interaction between families leads to repetitive, uninspired celebrations.', 'परिवारों के बीच शून्य बातचीत दोहरावदार, नीरस उत्सवों का कारण बनती है।')}</p>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="text-gold mt-1"><X size={20} /></div>
                  <p className="text-paper/60 text-lg leading-relaxed italic">{t('No memorable moments for your guests to carry back home beside just photos of decor.', 'मेहमानों के लिए घर ले जाने के लिए सजावट की तस्वीरों के अलावा कोई यादगार पल नहीं।')}</p>
               </div>
            </div>
            <p className="text-2xl font-display text-white mb-10 italic">
               {t('That’s exactly what LiveArt Experience Zones™ are designed to prevent.', 'यही वह समस्या है जिसे रोकने के लिए लाइवआर्ट एक्सपीरियंस जोन™ डिज़ाइन किए गए हैं।')}
            </p>
            <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px]">
               {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ExperiencePackages = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('Choose Your Experience Level', 'अपना अनुभव स्तर चुनें')}</h2>
          <p className="text-charcoal/40 uppercase tracking-[0.4em] font-black text-xs">{t('Precision Crafted Guest Engagement', 'परिशुद्धता के साथ अतिथि सहभागिता')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Essential */}
          <div className="p-12 bg-white rounded-[60px] border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all group">
            <h3 className="text-3xl font-display mb-8">{t('Essential Experience', 'एसेंशियल एक्सपीरियंस')}</h3>
            <p className="text-charcoal/40 mb-10 text-sm leading-relaxed">{t('Curated selection of our most loved Experience Zones™ designed for intimate weddings and focused engagement.', 'अंतरंग शादियों और केंद्रित सहभागिता के लिए डिज़ाइन किए गए हमारे सबसे पसंदीदा एक्सपीरियंस जोन™ का क्यूरेटेड चयन।')}</p>
            <ul className="space-y-6 mb-12">
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Check size={16} className="text-gold" /> {t('Strategic Placements', 'रणनीतिक प्लेसमेंट')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Check size={16} className="text-gold" /> {t('Signature Artists', 'सिग्नेचर कलाकार')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Check size={16} className="text-gold" /> {t('High-Guest ROI', 'हाई-गेस्ट रिटर्न')}</li>
            </ul>
            <Link to="/contact" className="w-full inline-block py-5 border border-charcoal text-charcoal text-center text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gold hover:border-gold transition-all">
              {t('Secure for Your Date', 'अपनी तारीख के लिए सुरक्षित करें')}
            </Link>
          </div>

          {/* Signature */}
          <div className="p-12 bg-primary rounded-[60px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-8 right-8 bg-gold text-charcoal px-4 py-2 rounded-full font-black uppercase text-[8px] tracking-widest">
               {t('Most Popular', 'सबसे लोकप्रिय')}
            </div>
            <h3 className="text-3xl font-display mb-8 text-paper">{t('Signature Experience', 'सिग्नेचर एक्सपीरियंस')}</h3>
            <p className="text-paper/40 mb-10 text-sm leading-relaxed">{t('The complete LiveArt standard. Immersive Experience Zones™ integrated seamlessly across all major event functions.', 'पूर्ण लाइवआर्ट मानक। सभी प्रमुख कार्यक्रमों में सहजता से एकीकृत इमर्सिव एक्सपीरियंस जोन™।')}</p>
            <ul className="space-y-6 mb-12">
               <li className="flex items-center gap-4 text-paper/60 text-sm italic"><Sparkles size={16} className="text-gold" /> {t('Full-Event Engagement', 'पूर्ण-ईवेंट सहभागिता')}</li>
               <li className="flex items-center gap-4 text-paper/60 text-sm italic"><Sparkles size={16} className="text-gold" /> {t('Personalized Souvenirs', 'व्यक्तिगत स्मृति चिन्ह')}</li>
               <li className="flex items-center gap-4 text-paper/60 text-sm italic"><Sparkles size={16} className="text-gold" /> {t('Social Buzz Momentum', 'सोशल बज़ मोमेंटम')}</li>
            </ul>
            <Link to="/contact" className="gold-btn w-full inline-block py-5 text-center text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl transform group-hover:scale-105 transition-transform">
              {t('Book My Signature Event', 'मेरा सिग्नेचर ईवेंट बुक करें')}
            </Link>
          </div>

          {/* Luxury */}
          <div className="p-12 bg-white rounded-[60px] border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all group">
            <h3 className="text-3xl font-display mb-8">{t('Luxury Experience', 'लक्जरी एक्सपीरियंस')}</h3>
            <p className="text-charcoal/40 mb-10 text-sm leading-relaxed">{t('Unaltered luxury. Bespoke Experience Zones™ crafted with master artisans and high-end materials for the extraordinary.', 'अपरिवर्तित लक्जरी। असाधारण के लिए मास्टर कलाकारों और उच्च-स्तरीय सामग्रियों के साथ तैयार किए गए बेस्पोक एक्सपीरियंस जोन™।')}</p>
            <ul className="space-y-6 mb-12">
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Zap size={16} className="text-gold" /> {t('Bespoke Craftsmanship', 'बेस्पोक शिल्प कौशल')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Zap size={16} className="text-gold" /> {t('Master-Tier Implementation', 'मास्टर-टियर कार्यान्वयन')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Zap size={16} className="text-gold" /> {t('Infinite Personalization', 'अनंत वैयक्तिकरण')}</li>
            </ul>
            <Link to="/contact" className="w-full inline-block py-5 border border-charcoal text-charcoal text-center text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gold hover:border-gold transition-all">
              {t('Apply for Luxury Access', 'लक्जरी एक्सेस के लिए अप्लाई करें')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RefinedHostsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-white text-charcoal overflow-hidden border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display mb-12 leading-tight">
            {t('For hosts who refuse', 'उन मेजबानों के लिए जो इनकार करते हैं')} <br />
            <span className="text-gold italic">{t('Ordinary Celebrations.', 'साधारण उत्सवों से।')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
             <div className="space-y-6">
                <div className="text-gold font-display text-4xl">01</div>
                <h4 className="text-xl font-black uppercase tracking-widest">{t('Not for basic weddings', 'बेसिक शादियों के लिए नहीं')}</h4>
                <p className="text-charcoal/40 text-sm italic leading-relaxed">{t('We do not build generic setups. We design cultural moments that define a legacy.', 'हम सामान्य सेटअप नहीं बनाते हैं। हम सांस्कृतिक क्षण डिजाइन करते हैं जो एक विरासत को परिभाषित करते हैं।')}</p>
             </div>
             <div className="space-y-6">
                <div className="text-gold font-display text-4xl">02</div>
                <h4 className="text-xl font-black uppercase tracking-widest">{t('Not for passive events', 'सुस्त ईवेंट्स के लिए नहीं')}</h4>
                <p className="text-charcoal/40 text-sm italic leading-relaxed">{t('For hosts who want their guests to be the art, not just the audience.', 'उन मेजबानों के लिए जो चाहते हैं कि उनके मेहमान कला बनें, न कि केवल दर्शक।')}</p>
             </div>
             <div className="space-y-6">
                <div className="text-gold font-display text-4xl">03</div>
                <h4 className="text-xl font-black uppercase tracking-widest">{t('Designed for standby', 'स्टैंडआउट के लिए डिज़ाइन किया गया')}</h4>
                <p className="text-charcoal/40 text-sm italic leading-relaxed">{t('Standout celebrations that are talked about for seasons, not just hours. Designed to engage guests across all age groups.', 'शानदार उत्सव जिनकी चर्चा हफ्तों तक होती है, न कि केवल घंटों तक। सभी आयु समूहों के मेहमानों को शामिल करने के लिए डिज़ाइन किया गया।')}</p>
             </div>
          </div>

          <div className="mt-24">
             <Link to="/contact" className="gold-btn px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px]">
                {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const DecisionControlSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-primary text-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display mb-10 leading-tight text-white">
            {t('If your wedding matters,', 'यदि आपकी शादी मायने रखती है,')} <br />
            <span className="text-gold italic">{t('This decision matters.', 'तो यह निर्णय मायने रखता है।')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left">
             <div className="p-8 bg-paper/5 backdrop-blur-md rounded-3xl border border-paper/10">
                <p className="text-xl leading-relaxed italic text-paper/80">
                  {t('Guests remember experiences, not just visuals. Decoration sets the stage, but interaction defines the memory.', 'मेहमान अनुभवों को याद रखते हैं, न कि केवल दृश्यों को। सजावट मंच तैयार करती है, लेकिन बातचीत याद को परिभाषित करती है।')}
                </p>
             </div>
             <div className="p-8 bg-paper/5 backdrop-blur-md rounded-3xl border border-paper/10">
                <p className="text-xl leading-relaxed italic text-paper/80">
                   {t('Engagement defines how your event is remembered for decades. Don’t overlook the part your guests will talk about the most.', 'सहभागिता यह परिभाषित करती है कि आपके कार्यक्रम को दशकों तक कैसे याद रखा जाएगा। उस हिस्से को नज़रअंदाज़ न करें जिसके बारे में आपके मेहमान सबसे ज्यादा बात करेंगे।')}
                </p>
             </div>
          </div>

          <div className="mt-20">
             <p className="text-gold font-black uppercase tracking-[0.3em] text-xs mb-10 italic">
                {t('From passive weddings to unforgettable experiences.', 'सुस्त शादियों से अविस्मरणीय अनुभवों तक।')}
             </p>
             <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px]">
                {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

