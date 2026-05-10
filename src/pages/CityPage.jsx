import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CITIES, OCCASIONS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';

const CityPage = () => {
  const { citySlug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const city = CITIES.find(c => c.slug === citySlug);
  
  useEffect(() => {
    if (!city) {
      navigate('/');
    }
  }, [city, navigate]);

  if (!city) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-cream min-h-screen"
    >
      {/* City Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-charcoal text-paper">
        <div className="la-monogram opacity-[0.05]">{city.name.toUpperCase()}</div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-gold/20 border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <MapPin size={14} />
              {t(`Now Serving ${city.name}`, `अब ${city.nameHi} में उपलब्ध`)}
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-display leading-[0.9] mb-8 tracking-tighter">
              {t(city.title, city.title)}
            </h1>
            
            <p className="text-xl md:text-2xl text-paper/60 mb-12 max-w-3xl leading-relaxed italic">
              {t(city.description, city.description)}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#quote"
                className="gold-btn px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase shadow-xl"
              >
                {t('Get a Local Quote', 'स्थानीय कोट प्राप्त करें')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/918853299951"
                className="px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase border border-white/20 flex items-center gap-3"
              >
                <MessageCircle size={16} />
                {t('WhatsApp Expert', 'विशेषज्ञ से व्हाट्सएप करें')}
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & SEO Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-8 leading-tight">
                {t(`Transforming Weddings in ${city.name}`, `${city.nameHi} में शादियों को बदलना`)}
              </h2>
              <p className="text-xl text-charcoal/60 leading-relaxed mb-10">
                {t(
                  `We understand the unique culture and requirements of weddings in ${city.name}. Whether it's a grand hotel celebration or an intimate farmhouse event, our guest engagement specialists ensure every moment is interactive and memorable.`,
                  `हम ${city.nameHi} में शादियों की अनूठी संस्कृति और आवश्यकताओं को समझते हैं। चाहे वह एक भव्य होटल उत्सव हो या एक अंतरंग फार्महाउस कार्यक्रम, हमारे गेस्ट एंगेजमेंट विशेषज्ञ यह सुनिश्चित करते हैं कि हर पल इंटरैक्टिव और यादगार हो।`
                )}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                    <ShieldCheck />
                  </div>
                  <h4 className="font-bold text-charcoal">{t('Local Team', 'स्थानीय टीम')}</h4>
                  <p className="text-sm text-charcoal/40">{t('Experienced hosts familiar with the city.', 'शहर से परिचित अनुभवी होस्ट।')}</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                    <Zap />
                  </div>
                  <h4 className="font-bold text-charcoal">{t('Quick Setup', 'त्वरित सेटअप')}</h4>
                  <p className="text-sm text-charcoal/40">{t('Efficient logistics for local venues.', 'स्थानीय स्थानों के लिए कुशल रसद।')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border-8 border-cream rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop" 
                  alt={city.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Services for the City */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-4">{t('Popular in Your City', 'आपके शहर में लोकप्रिय')}</h2>
            <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Top Services for Local Weddings', 'स्थानीय शादियों के लिए शीर्ष सेवाएं')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {OCCASIONS.map((occ) => (
              <Link 
                to={`/stations?occasion=${occ.id}`} 
                key={occ.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-charcoal/5"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={occ.image} alt={occ.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display text-charcoal mb-2 group-hover:text-gold transition-colors">{t(occ.name, occ.nameHi)}</h3>
                  <p className="text-charcoal/40 text-sm line-clamp-2 italic">{occ.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="quote" className="py-24 bg-charcoal text-paper">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display mb-6">{t('Request a Quote', 'कोट का अनुरोध करें')}</h2>
            <p className="text-paper/60 text-lg leading-relaxed italic">
              {t(`Planning a wedding in ${city.name}? Let's make it extraordinary. Fill out the form below and our city manager will get in touch.`, `${city.nameHi} में शादी की योजना बना रहे हैं? आइए इसे असाधारण बनाएं। नीचे दिया गया फॉर्म भरें और हमारे सिटी मैनेजर आपसे संपर्क करेंगे।`)}
            </p>
          </div>
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl">
            <LeadForm initialMessage={t(`Inquiry for wedding games in ${city.name}`, `${city.nameHi} में वेडिंग गेम्स के लिए पूछताछ`)} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CityPage;
