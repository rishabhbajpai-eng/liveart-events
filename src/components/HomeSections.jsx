import { useRef, useState, useEffect } from 'react';
import haldiHero from '../assets/haldi-hero.png';
import { useLanguage } from '../context/LanguageContext';
import { OCCASIONS, STATIONS, BLOG_POSTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Users, Sparkles, X, CheckCircle2, PlayCircle, Clock, BadgeIndianRupee, Tag } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

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
      className="absolute rounded-full bg-firozi/10 blur-3xl"
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
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-ink noise-bg mesh-gradient">
      {/* Dynamic Background Base */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <img 
          src={haldiHero} 
          alt="Haldi Ceremony DIY Activities" 
          className="w-full h-full object-cover animate-slow-zoom grayscale-[0.2] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
        
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-firozi opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-firozi"></span>
              </span>
              <span className="text-xs lg:text-sm font-black tracking-[0.3em] text-snow uppercase glow-text">
                {t('Luxury Haldi DIY Experience', 'लक्जरी हल्दी DIY अनुभव')}
              </span>
            </motion.div>

            <h1 className="text-7xl sm:text-8xl lg:text-[12rem] font-display leading-[0.8] mb-10 tracking-tighter perspective-1000">
              <motion.span 
                initial={{ opacity: 0, rotateX: -30 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="block text-snow drop-shadow-2xl"
              >
                {t('Live', 'लाइव')}
              </motion.span> 
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-gradient italic font-bold glow-text block my-2"
              >
                {t('Art', 'कला')}
              </motion.span> 
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-snow/10 block"
              >
                {t('Moments', 'क्षण')}
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl lg:text-3xl text-snow/80 mb-14 leading-relaxed max-w-2xl font-light tracking-wide drop-shadow-xl"
            >
              <span className="text-firozi font-bold italic mr-2 border-b border-firozi/30">
                {t('Elevate', 'ऊँचा उठाएं')}
              </span>
              {t(
                'your celebration with high-end interactive DIY stations. Handcrafted perfumes, bespoke jewelry, and artisanal favors that define luxury.',
                'उच्च श्रेणी के इंटरैक्टिव DIY स्टेशन्स के साथ अपने उत्सव को बढ़ाएं। हाथ से बने इत्र, विशेष आभूषण और कलात्मक उपहार जो विलासिता को परिभाषित करते हैं।'
              )}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-8 items-stretch sm:items-center">
              <Link 
                to="/packages" 
                className="group relative px-12 py-8 rounded-3xl font-black text-2xl overflow-hidden transition-all bg-firozi text-ink shadow-[0_20px_60px_-15px_rgba(0,206,209,0.5)] active:scale-95"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <span>{t('Build Your Experience', 'अपना अनुभव बनाएं')}</span>
                  <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                />
              </Link>
              
              <Link 
                to="/stations" 
                className="group px-12 py-8 rounded-3xl font-black text-2xl text-snow border-2 border-white/20 hover:border-firozi/50 transition-all flex items-center justify-center gap-4 backdrop-blur-xl relative overflow-hidden"
              >
                <span className="relative z-10">{t('Explore Catalogue', 'कैटलॉग देखें')}</span>
                <Sparkles className="relative z-10 text-firozi group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-firozi/0 via-firozi/5 to-firozi/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-20 flex flex-wrap gap-12 border-t border-white/10 pt-12">
              {[
                { label: 'Events Hosted', value: '500+' },
                { label: 'Happy Guests', value: '25k+' },
                { label: 'Cities Covered', value: '18+' }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className="text-4xl font-display text-snow mb-2 group-hover:text-firozi transition-colors duration-500">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-snow/40">{stat.label}</div>
                  <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-firozi group-hover:w-full transition-all duration-500"></div>
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
                src={haldiHero} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[1.2]" 
                alt="Premium Live Art" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute bottom-16 left-12 right-12 translate-z-50">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-firozi font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-3"
                >
                   <span className="w-4 h-[1px] bg-firozi"></span>
                   Featured Setup
                </motion.div>
                <div className="text-snow text-5xl font-display leading-tight">{t('Curated Craftsmanship', 'क्यूरेटेड शिल्प कौशल')}</div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
               animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-12 -right-12 w-48 h-48 bg-snow rounded-full flex items-center justify-center p-8 shadow-2xl -rotate-12 backdrop-blur-3xl border border-ink/5"
            >
              <div className="text-center">
                <div className="text-ink font-black text-4xl leading-tight glow-text">10x</div>
                <div className="text-ink/40 text-[10px] font-black uppercase tracking-widest mt-1">Attractive</div>
              </div>
            </motion.div>
            
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-firozi rounded-3xl rotate-12 -z-10 shadow-2xl opacity-50 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-40 px-4 py-8 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
      >
        <div className="w-1 h-3 rounded-full bg-firozi animate-bounce"></div>
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
    <section ref={sectionRef} className="py-32 bg-snow overflow-hidden relative">
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
          <h2 className="text-5xl md:text-7xl font-display text-ocean mb-4">{t('Choose Your Vibe', 'अपना वाइब चुनें')}</h2>
          <p className="text-ink/60 text-lg">{t('We curate experiences that match your celebration perfectly.', 'हम ऐसे अनुभव तैयार करते हैं जो आपके उत्सव से पूरी तरह मेल खाते हैं।')}</p>
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
              className={`group relative h-[400px] overflow-hidden rounded-[40px] bg-ink shadow-2xl transition-all duration-500 ${
                activeOccasion === occasion.id ? 'ring-4 ring-ocean ring-offset-4' : ''
              }`}
            >
              <img 
                src={occasion.image} 
                alt={occasion.name} 
                className={`w-full h-full object-cover group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ${
                  activeOccasion === occasion.id ? 'opacity-80 scale-105' : 'opacity-60'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"></div>
              <div className={`absolute inset-0 border-2 transition-all duration-500 m-4 rounded-[32px] ${
                activeOccasion === occasion.id ? 'border-white/40' : 'border-white/0 group-hover:border-white/20'
              }`}></div>
              
              <div className="absolute bottom-10 left-10 right-10 text-left">
                <span className="text-firozi font-black text-xs tracking-[0.3em] uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  {t('Interactive Experience', 'इंटरैक्टिव अनुभव')}
                </span>
                <h3 className="text-snow font-display text-4xl leading-tight mb-2">{t(occasion.name, occasion.nameHi)}</h3>
                
                {occasion.subEvents && (
                  <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                    {occasion.subEvents.map(sub => (
                      <span key={sub.id} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-snow">
                        {t(sub.name, sub.nameHi)}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-snow/60 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
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
  craft: { label: 'Includes all craft supplies', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
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
              <PlayCircle size={18} className="text-teal-600" />
              {t('Watch Demo', 'डेमो')}
            </button>
          </div>
        )}
      </div>

      <div className="p-5 lg:p-6" onClick={() => toggleExpand(station.id)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight group-hover:text-ocean transition-colors">
            {t(station.name, station.nameHi)}
          </h3>
        </div>

        <p className="text-sm lg:text-base text-gray-500 line-clamp-2 mb-4">
          {t(station.description, station.descriptionHi)}
        </p>

        <div className="flex items-center gap-4 py-3 border-y border-gray-100 mb-4 bg-gray-50/50 -mx-5 px-5 lg:-mx-6 lg:px-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-teal-600" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">2-4 hrs</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <Users size={16} className="text-teal-600" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">30+ Guests</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <BadgeIndianRupee size={16} className="text-teal-600" />
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
                <h4 className="text-sm font-black uppercase tracking-widest text-teal-600 mb-3 flex items-center gap-2">
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
                      className="text-teal-600 font-bold flex items-center gap-1.5 hover:text-teal-700 transition-colors"
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
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50'
                }`}
              >
                {cat === 'all' ? t('ALL', 'सभी') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card List - Stacked vertically like Zomato feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStations.map((station, idx) => (
              <StationCard
                key={station.id}
                station={station}
                t={t}
                isExpanded={expandedId === station.id}
                toggleExpand={toggleExpand}
                openVideo={openVideo}
                idx={idx}
              />
            ))}
          </AnimatePresence>

          {filteredStations.length === 0 && (
            <div className="col-span-full py-20 text-center">
               <div className="text-6xl mb-4 opacity-50">🍽️</div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">{t('No matching experiences found', 'कोई मेल खाने वाला अनुभव नहीं मिला')}</h3>
               <p className="text-gray-500">{t('Try adjusting your search or filters.', 'अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।')}</p>
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
                  className="bg-white text-teal-700 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
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
    <section className="py-24 bg-ocean text-snow">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">
            {t('Why India Loves', 'भारत क्यों प्यार करता है')} <br />
            <span className="text-firozi italic">LiveArt Events</span>
          </h2>
          <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-snow/10 flex items-center justify-center shrink-0">
                <Sparkles className="text-firozi" />
              </div>
              <div>
                <h4 className="text-xl font-display mb-2">{t('Memories over Momentary', 'क्षणभंगुर के ऊपर यादें')}</h4>
                <p className="text-snow/60 text-sm">{t('Guests don\'t just watch; they create. Every souvenir is a story they built themselves.', 'मेहमान सिर्फ देखते नहीं हैं; वे बनाते हैं। हर स्मारिका एक कहानी है जिसे उन्होंने खुद बनाया है।')}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-snow/10 flex items-center justify-center shrink-0">
                <Users className="text-firozi" />
              </div>
              <div>
                <h4 className="text-xl font-display mb-2">{t('Trained Facilitators', 'प्रशिक्षित सूत्रधार')}</h4>
                <p className="text-snow/60 text-sm">{t('Our team manages the crowd, the craft, and the cleanup. You just enjoy the party.', 'हमारी टीम भीड़, शिल्प और सफाई का प्रबंधन करती है। आप बस पार्टी का आनंद लें।')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative max-w-md mx-auto lg:max-w-none">
          <div className="aspect-square rounded-[40px] lg:rounded-[60px] overflow-hidden rotate-3 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" alt="Happy Guests" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 lg:-bottom-8 -left-6 lg:-left-8 bg-firozi text-ink p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] shadow-xl -rotate-6 max-w-[200px] lg:max-w-[240px]">
            <p className="font-display text-base lg:text-lg leading-tight mb-2">&quot;The best part of my daughter&apos;s haldi!&quot;</p>
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-60">— Mrs. Kapoor</p>
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
            <h2 className="text-4xl md:text-6xl font-display text-ink mb-6">
              {t('Event Insights &', 'इवेंट अंतर्दृष्टि और')} <br />
              <span className="text-ocean italic">{t('Creative Ideas', 'रचनात्मक विचार')}</span>
            </h2>
            <p className="text-ink/60 text-lg">
              {t('Expert tips and inspiration for making your next celebration truly extraordinary.', 'अगले उत्सव को वास्तव में असाधारण बनाने के लिए विशेषज्ञ सुझाव और प्रेरणा।')}
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group flex items-center gap-3 text-ocean font-black uppercase tracking-widest text-sm hover:gap-5 transition-all"
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
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-ocean text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                    {language === 'hi' ? post.categoryHi : post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  {new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-ocean transition-colors line-clamp-2 leading-tight">
                  <Link to={`/blog/${post.id}`}>
                    {language === 'hi' ? post.titleHi : post.title}
                  </Link>
                </h3>
                
                <p className="text-slate-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {language === 'hi' ? post.summaryHi : post.summary}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link to={`/blog/${post.id}`} className="text-ocean font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
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
