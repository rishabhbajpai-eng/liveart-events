import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { OCCASIONS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { StationCatalogue } from '../components/HomeSections';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';

const ServicePage = () => {
  const { serviceSlug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const occasion = OCCASIONS.find(o => o.slug === serviceSlug);
  
  useEffect(() => {
    if (!occasion) {
      // Check if it's one of our predefined wedding slugs
      if (['mehndi-activities', 'interactive-stalls', 'haldi-games', 'wedding-games'].includes(serviceSlug)) {
        // already handled by occasion find
      } else {
        // navigate('/');
      }
    }
  }, [occasion, serviceSlug]);

  if (!occasion) return (
    <div className="pt-32 pb-20 text-center">
      <h1 className="text-4xl font-display text-charcoal">Service Not Found</h1>
      <button onClick={() => navigate('/')} className="mt-8 gold-btn px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs">Back to Home</button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-cream min-h-screen"
    >
      {/* Service Hero */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden bg-charcoal text-paper">
        <div className="la-monogram opacity-[0.05]">{occasion.name.toUpperCase()}</div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gold font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                {t('Premium Wedding Service', 'प्रीमियम वेडिंग सर्विस')}
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[0.9]">
                {t(occasion.name, occasion.nameHi)}
              </h1>
              <p className="text-xl text-paper/60 mb-12 leading-relaxed italic max-w-xl">
                {t(occasion.description, occasion.description)}
              </p>
              <div className="flex flex-wrap gap-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#stations"
                  className="gold-btn px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase shadow-xl"
                >
                  {t('View Activity Stations', 'एक्टिविटी स्टेशन्स देखें')}
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
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-[80px] overflow-hidden shadow-2xl border-8 border-white/5 rotate-3">
                <img src={occasion.image} alt={occasion.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section id="stations" className="py-24">
        <StationCatalogue selectedOccasion={occasion.id} />
      </section>

      {/* Where Used & Benefits */}
      <section className="py-24 bg-cream border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Where Used */}
            <div className="space-y-12">
              <div>
                <span className="text-gold font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                  {t('Ideal Occasions', 'आदर्श अवसर')}
                </span>
                <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-8">
                  {t('Where it shines', 'कहाँ यह चमकता है')}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: t('Mehndi', 'मेहंदी'), desc: t('Perfect ice-breakers for an afternoon of fun.', 'दोपहर की मस्ती के लिए बेहतरीन शुरुआत।') },
                  { title: t('Haldi', 'हल्दी'), desc: t('High-energy games for a vibrant yellow morning.', 'एक जीवंत पीली सुबह के लिए उच्च-ऊर्जा वाले खेल।') },
                  { title: t('Sangeet', 'संगीत'), desc: t('Interactive hosting to keep the energy high between performances.', 'प्रदर्शनों के बीच ऊर्जा को बनाए रखने के लिए इंटरैक्टिव होस्टिंग।') },
                  { title: t('Cocktails', 'कॉकटेल'), desc: t('Sophisticated activity stations for a relaxed evening.', 'एक आरामदायक शाम के लिए परिष्कृत गतिविधि स्टेशन।') }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <h4 className="text-xl font-display text-charcoal">{item.title}</h4>
                    <p className="text-charcoal/60 text-sm leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-12">
              <div>
                <span className="text-gold font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                  {t('The LiveArt Advantage', 'लाइवआर्ट लाभ')}
                </span>
                <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-8">
                  {t('Why guests love it', 'मेहमान इसे क्यों पसंद करते हैं')}
                </h2>
              </div>
              <div className="space-y-8">
                {[
                  { title: t('Real Connections', 'वास्तविक जुड़ाव'), desc: t('We break the ice between families, turning strangers into participants.', 'हम परिवारों के बीच की झिझक को दूर करते हैं, अजनबियों को प्रतिभागियों में बदलते हैं।') },
                  { title: t('No Boring Moments', 'कोई बोरियत नहीं'), desc: t('Our engagement experts ensure there is always something fun happening.', 'हमारे एंगेजमेंट विशेषज्ञ सुनिश्चित करते हैं कि हमेशा कुछ मज़ेदार होता रहे।') },
                  { title: t('Memorable Favors', 'यादगार उपहार'), desc: t('Guests take home handmade memories, not just generic store-bought gifts.', 'मेहमान घर पर हाथ से बनी यादें ले जाते हैं, न कि केवल सामान्य स्टोर से खरीदे गए उपहार।') }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-gold font-display text-4xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                    <div>
                      <h4 className="text-xl font-display text-charcoal mb-2">{item.title}</h4>
                      <p className="text-charcoal/60 text-base leading-relaxed italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 bg-white border-t border-charcoal/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-6">{t('Get a Custom Proposal', 'कस्टम प्रस्ताव प्राप्त करें')}</h2>
            <p className="text-charcoal/40 text-lg leading-relaxed italic">
              {t(`Interested in ${occasion.name}? Share your event details and we'll design a custom engagement plan for you.`, `${occasion.nameHi} में रुचि है? अपने ईवेंट विवरण साझा करें और हम आपके लिए एक कस्टम एंगेजमेंट प्लान तैयार करेंगे।`)}
            </p>
          </div>
          <div className="bg-cream rounded-[40px] p-8 md:p-12 shadow-2xl border border-charcoal/5">
            <LeadForm initialMessage={t(`Inquiry for ${occasion.name}`, `${occasion.nameHi} के लिए पूछताछ`)} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicePage;
