import { useRef, useState } from 'react';
import haldiHero from '../assets/haldi-hero.png';
import { useLanguage } from '../context/LanguageContext';
import { OCCASIONS, STATIONS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Users, Sparkles, X, CheckCircle2, PlayCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.4]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* Dynamic Background */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <img 
          src={haldiHero} 
          alt="Haldi Ceremony DIY Activities" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"></div>
      </motion.div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-firozi rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: y2 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-ocean rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-firozi opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-firozi"></span>
              </span>
              <span className="text-[10px] lg:text-xs font-black tracking-[0.2em] text-snow uppercase">
                {t('Premium Haldi DIY Experience', 'प्रीमियम हल्दी DIY अनुभव')}
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-display leading-[0.85] mb-8 tracking-tighter drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-snow via-snow to-firozi/50">{t('Live', 'लाइव')}</span> <br />
              <span className="text-firozi italic drop-shadow-[0_0_20px_rgba(0,206,209,0.5)]">{t('Art', 'कला')}</span> <br />
              <span className="text-snow/30">{t('Moments', 'क्षण')}</span>
            </h1>

            <p className="text-lg lg:text-2xl text-snow/90 mb-12 leading-relaxed max-w-xl font-light tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {t(
                'Bring a burst of creativity to your Haldi ceremony. Interactive DIY stations for perfumes, jewelry, and favors—handcrafted with love.',
                'अपनी हल्दी की रस्म में रचनात्मकता का तड़का लगाएं। इत्र, आभूषण और उपहारों के लिए इंटरैक्टिव DIY स्टेशन्स—प्यार से हाथ से बनाए गए।'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
              <Link 
                to="/packages" 
                className="group relative bg-firozi text-ink px-10 py-6 rounded-2xl font-black text-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,206,209,0.4)]"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span>{t('Build Your Package', 'अपना पैकेज बनाएं')}</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              
              <Link 
                to="/stations" 
                className="px-10 py-6 rounded-2xl font-black text-xl text-snow border-2 border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3"
              >
                {t('Explore Stations', 'स्टेशन्स देखें')}
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap gap-10 border-t border-white/5 pt-10">
              {[
                { label: 'Events', value: '500+' },
                { label: 'Guests', value: '20k+' },
                { label: 'Cities', value: '15+' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-display text-snow mb-1">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-snow/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-5 hidden lg:block relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                boxShadow: [
                  "0 0 40px rgba(0, 206, 209, 0.2)",
                  "0 0 80px rgba(0, 206, 209, 0.4)",
                  "0 0 40px rgba(0, 206, 209, 0.2)"
                ]
              }}
              transition={{ 
                duration: 1, 
                delay: 0.2,
                boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative aspect-[4/5] rounded-[60px] overflow-hidden border-8 border-firozi/20 shadow-2xl group"
            >
              <img 
                src={haldiHero} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Live Art Experience" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-firozi font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                   <div className="w-2 h-2 bg-firozi rounded-full animate-pulse"></div>
                   Featured Experience
                </div>
                <div className="text-snow text-3xl font-display">The Attar Bar</div>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-snow rounded-full flex items-center justify-center p-4 shadow-2xl rotate-12"
            >
              <div className="text-center">
                <div className="text-ink font-black text-2xl leading-tight">100%</div>
                <div className="text-ink/40 text-[10px] font-black uppercase tracking-tighter">Handcrafted</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-snow/30 rotate-90 mb-8">SCROLL</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-firozi to-transparent"></div>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <span key={sub.id} className="px-3 py-1 bg-firozi/20 border border-firozi/30 rounded-full text-[10px] font-black uppercase tracking-widest text-firozi">
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

export const StationCatalogue = ({ selectedOccasion }) => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });

  const occasionName = OCCASIONS.find(o => o.id === selectedOccasion)?.name || 'Celebration';
  const occasionNameHi = OCCASIONS.find(o => o.id === selectedOccasion)?.nameHi || 'उत्सव';

  // Show all stations if no filters are available
  const filteredStations = STATIONS;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openVideo = (url, title) => {
    setVideoModal({ isOpen: true, url, title });
  };

  return (
    <section id="stations" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="text-ocean font-black tracking-[0.3em] text-xs uppercase mb-4 block">
              {t(`${occasionName} Activity Stations`, `${occasionNameHi} गतिविधि स्टेशन्स`)}
            </span>
            <h2 className="text-5xl md:text-8xl font-display text-ink leading-none">
              {t('Interactive', 'इंटरैक्टिव')} <br />
              <span className="text-ocean italic">{t('Stations', 'स्टेशन्स')}</span>
            </h2>
          </div>
          <p className="text-ink/60 text-lg max-w-sm">
            {t(`Curated DIY experiences specifically for your ${occasionName.toLowerCase()}.`, `आपके ${occasionNameHi} के लिए विशेष रूप से तैयार किए गए DIY अनुभव।`)}
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredStations.map((station) => {
              const isExpanded = expandedId === station.id;
              return (
                <motion.div 
                  key={station.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={!isExpanded ? { 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 30px 60px -12px rgba(0, 119, 182, 0.3)"
                  } : {}}
                  transition={{ 
                    duration: 0.4,
                    layout: { duration: 0.4, type: "spring", stiffness: 100 },
                  }}
                  className={`group bg-snow rounded-[50px] overflow-hidden border border-ocean/5 shadow-lg transition-all duration-500 flex flex-col ${isExpanded ? 'lg:col-span-2 lg:row-span-2 z-20' : ''}`}
                >
                <div className={`overflow-hidden relative ${isExpanded ? 'h-64 lg:h-96' : 'aspect-[4/3]'}`}>
                  <img src={station.image} alt={station.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 right-6 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-ink px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {station.category}
                    </span>
                    {isExpanded && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleExpand(null); }}
                        className="bg-ink text-snow p-2 rounded-full hover:bg-ink/80 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); openVideo(station.videoUrl, station.name); }}
                        className="bg-snow text-ink px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-110 transition-transform"
                      >
                        <PlayCircle size={18} />
                        {t('Watch Demo', 'डेमो देखें')}
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-3xl font-display text-ink mb-4">{t(station.name, station.nameHi)}</h3>
                  <p className="text-ink/60 text-base leading-relaxed mb-8">
                    {t(station.description, station.descriptionHi)}
                  </p>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 border-t border-ink/5 pt-8"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-ocean mb-4 flex items-center gap-2">
                              <Sparkles size={16} />
                              {t('What\'s Included', 'क्या शामिल है')}
                            </h4>
                            <ul className="space-y-3">
                              {[
                                t('Premium raw materials', 'प्रीमियम कच्चा माल'),
                                t('Expert facilitator', 'विशेषज्ञ सूत्रधार'),
                                t('Custom packaging', 'कस्टम पैकेजिंग'),
                                t('Setup & Cleanup', 'सेटअप और सफाई')
                              ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-ink/70 text-sm">
                                  <CheckCircle2 size={16} className="text-emerald" />
                                  {item}
                                  </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-ocean mb-4 flex items-center gap-2">
                              <PlayCircle size={16} />
                              {t('How it works', 'यह कैसे काम करता है')}
                            </h4>
                            <div 
                              onClick={() => openVideo(station.videoUrl, station.name)}
                              className="aspect-video bg-ink/5 rounded-2xl flex items-center justify-center group/video cursor-pointer border-2 border-dashed border-ink/10 hover:border-ocean/30 transition-colors"
                            >
                              <div className="text-center">
                                <PlayCircle size={48} className="text-ocean/40 group-hover/video:text-ocean transition-colors mx-auto mb-2" />
                                <span className="text-[10px] font-black uppercase tracking-tighter text-ink/40 group-hover/video:text-ocean/60">{t('Watch Demo', 'डेमो देखें')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto flex items-center justify-between">
                    <motion.button 
                      onClick={() => toggleExpand(station.id)}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-ocean font-black text-sm uppercase tracking-widest"
                    >
                      {isExpanded ? t('Show Less', 'कम दिखाएं') : t('See Details', 'विवरण देखें')}
                      <ArrowRight size={18} className={isExpanded ? 'rotate-180' : ''} />
                    </motion.button>
                    {!isExpanded && (
                      <button 
                        onClick={() => openVideo(station.videoUrl, station.name)}
                        className="text-ink/40 hover:text-ocean transition-colors"
                        title={t('Watch Demo', 'डेमो देखें')}
                      >
                        <PlayCircle size={24} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
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
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
              onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
            ></div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-snow rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl"
            >
              <div className="p-6 lg:p-10 flex justify-between items-center border-b border-ink/5">
                <h3 className="text-2xl lg:text-4xl font-display text-ink">{t(videoModal.title, videoModal.title)} - {t('Demo', 'डेमो')}</h3>
                <button 
                  onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-ink text-snow rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors"
                >
                  <X size={24} />
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
              <div className="p-6 lg:p-10 bg-ocean text-snow flex flex-col lg:flex-row justify-between items-center gap-6">
                <p className="text-lg lg:text-xl font-medium text-center lg:text-left">
                  {t('Love this station? Add it to your custom package!', 'यह स्टेशन पसंद आया? इसे अपने कस्टम पैकेज में जोड़ें!')}
                </p>
                <a 
                  href="#packages" 
                  onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                  className="bg-snow text-ocean px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
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
