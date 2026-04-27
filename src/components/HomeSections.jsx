import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  Zap,
  Users,
  Star,
  CheckCircle2,
  Heart,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { STATIONS, OCCASIONS, CITIES, FAQS, BLOG_POSTS } from '../constants';
import { LeadForm } from './LeadForm';

// Magnetic Button for premium feel
export const MagneticButton = ({ children, className = "" }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 1. HERO SECTION
export const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal pt-20">
      {/* Background with parallax effect */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Wedding Engagement" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-black tracking-[0.4em] uppercase text-xs mb-6 block">
            {t('India’s #1 Wedding Guest Engagement Brand', 'भारत का #1 वेडिंग गेस्ट एंगेजमेंट ब्रांड')}
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-paper mb-8 leading-[1.1]">
            {t('Wedding Guest Engagement', 'वेडिंग गेस्ट एंगेजमेंट')} <br />
            <span className="text-gold italic">{t('& Entertainment', '& एंटरटेनमेंट')}</span> <br />
            {t('Across India', 'पूरे भारत में')}
          </h1>
          <p className="text-xl md:text-3xl text-paper/60 mb-12 max-w-3xl mx-auto leading-relaxed italic">
            &ldquo;{t('We turn boring weddings into unforgettable interactive experiences', 'हम उबाऊ शादियों को अविस्मरणीय इंटरैक्टिव अनुभवों में बदल देते हैं')}&rdquo;
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton>
              <Link to="/contact" className="gold-btn px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl">
                {t('Book Now', 'अभी बुक करें')}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="https://wa.me/918853299951" className="bg-paper/5 backdrop-blur-md border border-white/20 text-paper px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3">
                <MessageCircle size={18} />
                {t('WhatsApp Us', 'व्हाट्सएप करें')}
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// 2. SERVICES SECTION (OccasionSelector)
export const OccasionSelector = ({ onSelect, activeOccasion }) => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-white overflow-hidden border-b border-gray-100" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display text-charcoal mb-6">{t('Our Services', 'हमारी सेवाएं')}</h2>
          <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Specialized Engagement Zones', 'विशेष एंगेजमेंट ज़ोन')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {OCCASIONS.map((occ) => (
            <motion.div
              key={occ.id}
              whileHover={{ y: -15 }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100"
            >
              <img src={occ.image} alt={occ.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-display text-paper mb-4">{t(occ.name, occ.nameHi)}</h3>
                <p className="text-paper/60 text-sm mb-8 leading-relaxed italic line-clamp-2">{t(occ.description, occ.description)}</p>
                <Link 
                  to={`/${occ.slug}`}
                  className="w-full py-4 bg-paper/10 backdrop-blur-md border border-white/20 text-paper text-center text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-gold group-hover:border-gold group-hover:text-charcoal transition-all"
                >
                  {t('Explore Service', 'सेवा देखें')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. WHY CHOOSE US (Engagement focus)
export const WhyChooseUs = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-cream text-charcoal overflow-hidden border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-10 leading-tight">
            {t('Engagement,', 'एंगेजमेंट,')} <br />
            <span className="text-gold italic">{t('Not Decoration.', 'सजावट नहीं।')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-charcoal/60 italic leading-relaxed">
            {t('Decoration sets the stage, but interaction defines the memory. We specialize in the art of involving your guests.', 'सजावट मंच तैयार करती है, लेकिन बातचीत याद को परिभाषित करती है। हम आपके मेहमानों को शामिल करने की कला में विशेषज्ञ हैं।')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
              <Zap size={32} />
            </div>
            <h4 className="text-2xl font-display">{t('10x Interaction', '10 गुना अधिक जुड़ाव')}</h4>
            <p className="text-charcoal/60 leading-relaxed italic">{t('Proven to increase guest participation across all age groups by 10x.', 'सभी आयु समूहों के बीच अतिथि भागीदारी को 10 गुना बढ़ाने के लिए सिद्ध।')}</p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
              <Users size={32} />
            </div>
            <h4 className="text-2xl font-display">{t('No Idle Guests', 'कोई भी मेहमान खाली नहीं')}</h4>
            <p className="text-charcoal/60 leading-relaxed italic">{t('We eliminate the "waiting time" during ceremonies with active zones.', 'हम सक्रिय क्षेत्रों के साथ रस्मों के दौरान "प्रतीक्षा समय" को समाप्त करते हैं।')}</p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto">
              <Heart size={32} />
            </div>
            <h4 className="text-2xl font-display">{t('Handmade Memories', 'हाथ से बनी यादें')}</h4>
            <p className="text-charcoal/60 leading-relaxed italic">{t('Guests take home souvenirs they created themselves, not just generic gifts.', 'मेहमान अपने द्वारा बनाए गए स्मृति चिन्ह घर ले जाते हैं, न कि केवल सामान्य उपहार।')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. REAL EVENT EXPERIENCES (VisualProofGallery)
export const VisualProofGallery = () => {
  const { t } = useLanguage();
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=2000&auto=format&fit=crop"
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-6 text-charcoal">{t('Real Event Experiences', 'वास्तविक इवेंट अनुभव')}</h2>
          <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Pure Interaction. No Generic Decor.', 'शुद्ध बातचीत। कोई सामान्य सजावट नहीं।')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="aspect-[3/4] rounded-[60px] overflow-hidden group shadow-2xl border border-gray-100"
            >
              <img src={img} alt="Wedding Engagement Moment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. CITIES SERVED
export const LocationsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-charcoal text-paper overflow-hidden relative" id="cities">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('Cities We Serve', 'शहर जहाँ हम सेवा देते हैं')}</h2>
          <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Presence Across India', 'पूरे भारत में उपस्थिति')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CITIES.map((city) => (
            <Link 
              key={city.id} 
              to={`/wedding-games-${city.slug}`}
              className="group p-12 bg-white/5 rounded-[40px] border border-white/10 hover:bg-gold hover:border-gold transition-all duration-500"
            >
              <h3 className="text-3xl font-display mb-4 group-hover:text-charcoal transition-colors">{city.name}</h3>
              <p className="text-paper/40 group-hover:text-charcoal/60 transition-colors text-sm leading-relaxed italic">{t(city.description, city.description)}</p>
              <div className="mt-8 flex items-center gap-3 text-gold group-hover:text-charcoal font-black text-[10px] uppercase tracking-widest">
                {t('View Services', 'सेवाएं देखें')} <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. BLOG PREVIEW
export const BlogPreview = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-cream text-charcoal overflow-hidden border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-left">
            <h2 className="text-5xl md:text-7xl font-display mb-6">{t('The Wedding Blog', 'वेडिंग ब्लॉग')}</h2>
            <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Engagement Insights & Guides', 'एंगेजमेंट इनसाइट्स और गाइड्स')}</p>
          </div>
          <Link to="/blog" className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest border-b-2 border-charcoal pb-2 hover:text-gold hover:border-gold transition-all">
            {t('View All Stories', 'सभी कहानियां देखें')} <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group space-y-8">
              <div className="aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <span className="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">{t(post.category, post.categoryHi)}</span>
                <h3 className="text-3xl md:text-4xl font-display mb-4 group-hover:text-gold transition-colors">{t(post.title, post.titleHi)}</h3>
                <p className="text-charcoal/60 text-lg leading-relaxed italic line-clamp-2">{t(post.summary, post.summaryHi)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// 7. FINAL CTA (FAQ & Inquiry)
export const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display text-charcoal mb-6">{t('Common Questions', 'सामान्य प्रश्न')}</h2>
          <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Everything you need to know', 'सब कुछ जो आपको जानना आवश्यक है')}</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-xl md:text-2xl font-display transition-colors ${openIndex === i ? 'text-gold' : 'text-charcoal group-hover:text-gold'}`}>
                  {t(faq.question, faq.questionHi)}
                </span>
                <div className={`w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center transition-all ${openIndex === i ? 'bg-gold border-gold text-white rotate-45' : 'text-charcoal group-hover:border-gold'}`}>
                  <Sparkles size={16} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-charcoal/60 text-lg leading-relaxed italic">
                      {t(faq.answer, faq.answerHi)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InquirySection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-charcoal text-paper relative overflow-hidden" id="book">
      <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl md:text-8xl font-display mb-10 leading-tight">
            {t('Ready to Create', 'बनाने के लिए तैयार')} <br />
            <span className="text-gold italic">{t('Magic?', 'जादू?')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-paper/40 mb-12 italic leading-relaxed">
            {t('Limited availability for the 2026 wedding season. Secure your date today and give your guests something they will talk about for years.', '2026 वेडिंग सीजन के लिए सीमित उपलब्धता। आज ही अपनी तारीख सुरक्षित करें।')}
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-paper/40">{t('Call Our Expert', 'हमारे विशेषज्ञ को कॉल करें')}</p>
                <p className="text-xl font-display">+91 88532 99951</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-paper/40">{t('WhatsApp Us', 'हमें व्हाट्सएप करें')}</p>
                <p className="text-xl font-display">{t('Chat Now', 'अभी चैट करें')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl border border-white/10">
          <LeadForm />
        </div>
      </div>
    </section>
  );
};
