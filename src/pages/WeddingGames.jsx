import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Users, Lightbulb, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import gameImg1 from '../assets/luxury_wedding_games_india.png'; // I'll need to make sure these names are correct after I save them
import gameImg2 from '../assets/sangeet_guest_engagement.png';

const WeddingGames = () => {
  const { t } = useLanguage();

  const offerings = [
    {
      title: t('Interactive Games', 'इंटरैक्टिव गेम्स'),
      desc: t('Curated games for all age groups, from kids to elders.', 'बच्चों से लेकर बड़ों तक सभी आयु समूहों के लिए चुनिंदा खेल।'),
      icon: <Users className="w-6 h-6" />
    },
    {
      title: t('Hosted Activities', 'होस्टेड गतिविधियाँ'),
      desc: t('Professional hosts who drive the energy and participation.', 'पेशेवर होस्ट जो ऊर्जा और भागीदारी बढ़ाते हैं।'),
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: t('Custom Concepts', 'कस्टम कॉन्सेप्ट्स'),
      desc: t('Games tailored to your family traditions and event theme.', 'आपकी पारिवारिक परंपराओं और इवेंट थीम के अनुसार खेल।'),
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: t('Indoor & Outdoor', 'इंडोर और आउटडोर'),
      desc: t('Flexible setups for lawns, banquet halls, or poolside.', 'लॉन, बैंक्वेट हॉल या पूलसाइड के लिए लचीला सेटअप।'),
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  const occasions = [
    { name: t('Mehndi Functions', 'मेहंदी फंक्शन'), img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80' },
    { name: t('Haldi Ceremonies', 'हल्दी सेरेमनी'), img: 'https://images.unsplash.com/photo-1621345155106-9399264c760d?auto=format&fit=crop&q=80' },
    { name: t('Sangeet Nights', 'संगीत नाइट'), img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80' },
    { name: t('Engagement Parties', 'सगाई पार्टी'), img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-cream min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="la-monogram opacity-[0.03]">GAMES</div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-copper font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                {t('Guest Engagement Specialists', 'गेस्ट एंगेजमेंट स्पेशलिस्ट')}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-charcoal mb-6 leading-tight">
                {t('Wedding Games &', 'वेडिंग गेम्स और')} <br />
                <span className="italic text-copper">{t('Guest Engagement', 'गेस्ट एंगेजमेंट')}</span>
              </h1>
              <p className="text-xl text-charcoal/70 mb-10 leading-relaxed max-w-xl">
                {t(
                  'Looking to make your wedding fun, interactive, and unforgettable? We provide professional wedding game hosting and guest engagement services across India.',
                  'अपनी शादी को मज़ेदार, इंटरैक्टिव और अविस्मरणीय बनाना चाहते हैं? हम पूरे भारत में पेशेवर वेडिंग गेम होस्टिंग और गेस्ट एंगेजमेंट सेवाएं प्रदान करते हैं।'
                )}
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#book"
                  className="bg-slate text-paper px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  {t('Book an Experience', 'अनुभव बुक करें')}
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/918853299951"
                  className="border-2 border-teal text-teal px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2"
                >
                  <MessageCircle size={24} />
                  {t('WhatsApp Us', 'व्हाट्सएप करें')}
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl luxury-border">
                <img 
                  src={gameImg1} 
                  alt="Wedding Games India" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-paper hidden md:block">
                <img 
                  src={gameImg2} 
                  alt="Sangeet Engagement" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              {t('What We Offer', 'हम क्या प्रदान करते हैं')}
            </h2>
            <div className="w-24 h-1 bg-copper mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-paper p-8 rounded-3xl shadow-lg border border-copper/10"
              >
                <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-copper mb-6 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-charcoal">{item.title}</h3>
                <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Guest Engagement Matters */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate skew-y-3 origin-right translate-y-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-paper">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              {t('Why Guest Engagement Matters', 'गेस्ट एंगेजमेंट क्यों महत्वपूर्ण है')}
            </h2>
            <p className="text-xl text-paper/70 mb-8 leading-relaxed">
              {t(
                'Most weddings lose energy after some time. Our job is to keep the excitement alive from start to finish. We don’t just install games — we create experiences.',
                'अधिकांश शादियां कुछ समय बाद ऊर्जा खो देती हैं। हमारा काम शुरू से अंत तक उत्साह को जीवित रखना है। हम केवल खेल स्थापित नहीं करते हैं - हम अनुभव बनाते हैं।'
              )}
            </p>
            <ul className="space-y-4">
              {[
                t('Break the ice between families', 'परिवारों के बीच की झिझक दूर करें'),
                t('Memorable moments for guests of all ages', 'सभी उम्र के मेहमानों के लिए यादगार पल'),
                t('Higher energy levels throughout the event', 'पूरे कार्यक्रम के दौरान उच्च ऊर्जा स्तर'),
                t('Professional management - zero stress for you', 'पेशेवर प्रबंधन - आपके लिए शून्य तनाव')
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-paper/90">
                  <CheckCircle2 className="text-copper w-6 h-6 flex-shrink-0" />
                  <span className="text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-paper/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20">
            <h3 className="text-3xl font-display font-bold text-paper mb-6">
              {t('Our Approach', 'हमारा दृष्टिकोण')}
            </h3>
            <p className="text-paper/80 text-lg leading-relaxed mb-8">
              {t(
                'Our team actively engages with guests, ensuring participation, laughter, and memorable moments. We blend tradition with modern entertainment to create a unique vibe.',
                'हमारी टीम सक्रिय रूप से मेहमानों के साथ जुड़ती है, भागीदारी, हंसी और यादगार पल सुनिश्चित करती है। हम एक अनूठा माहौल बनाने के लिए आधुनिक मनोरंजन के साथ परंपरा का मिश्रण करते हैं।'
              )}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-3xl font-bold text-copper mb-2">100%</div>
                <div className="text-sm text-paper/60 uppercase tracking-widest">{t('Participation', 'भागीदारी')}</div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-3xl font-bold text-copper mb-2">500+</div>
                <div className="text-sm text-paper/60 uppercase tracking-widest">{t('Events Hosted', 'होस्ट किए गए इवेंट')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              {t('Perfect For', 'इनके लिए उपयुक्त')}
            </h2>
            <p className="text-charcoal/50 uppercase tracking-[0.2em] text-sm">
              {t('Tailored experiences for every function', 'हर फंक्शन के लिए अनुकूलित अनुभव')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group relative h-80 rounded-[2rem] overflow-hidden shadow-xl"
              >
                <img 
                  src={occ.img} 
                  alt={occ.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex items-end p-8">
                  <h3 className="text-paper text-2xl font-display font-bold">{occ.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="book" className="py-24 bg-cream relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              {t('Book Wedding Games', 'वेडिंग गेम्स बुक करें')}
            </h2>
            <p className="text-charcoal/60 text-lg">
              {t('Contact us today to plan your wedding entertainment experience.', 'आज ही अपने विवाह मनोरंजन अनुभव की योजना बनाने के लिए हमसे संपर्क करें।')}
            </p>
          </div>
          <div className="bg-paper p-8 md:p-12 rounded-[3rem] shadow-2xl border border-copper/10">
            <LeadForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default WeddingGames;
