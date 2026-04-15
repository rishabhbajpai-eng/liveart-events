import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PartnerForm } from '../components/PartnerForm';
import { Sparkles, Zap, Shield, Gift } from 'lucide-react';

const Partner = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <Zap size={24} />,
      title: t('High Commission', 'उच्च कमीशन'),
      desc: t('12% flat referral fee on every booking you bring.', 'आपके द्वारा लाए गए प्रत्येक बुकिंग पर 12% फ्लैट रेफरल शुल्क।')
    },
    {
      icon: <Gift size={24} />,
      title: t('Exclusive Assets', 'विशेष संपत्तियां'),
      desc: t('Get white-label decks and early access to new stations.', 'व्हाइट-लेबल डेक और नए स्टेशन्स तक जल्दी पहुंच प्राप्त करें।')
    },
    {
      icon: <Shield size={24} />,
      title: t('Priority Support', 'प्राथमिकता समर्थन'),
      desc: t('Dedicated event manager for all your client masterpieces.', 'आपके सभी क्लाइंट मास्टरपीस के लिए समर्पित इवेंट मैनेजर।')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-paper min-h-screen"
    >
      <section id="partner" className="py-20 bg-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1 bg-teal/5 rounded-full text-teal text-xs font-black uppercase tracking-widest mb-6"
                >
                  <Sparkles size={14} />
                  {t('Join the Collective', 'कलेक्टिव से जुड़ें')}
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-display text-charcoal mb-8 leading-tight">
                  {t('Are you an', 'क्या आप एक')} <br />
                  <span className="text-teal italic">{t('Experience Designer?', 'एक्सपीरियंस डिज़ाइनर हैं?')}</span>
                </h1>
                <p className="text-charcoal/60 text-lg leading-relaxed">
                  {t(
                    "LiveArt Partner Program is India's most rewarding creative network. We handle the logistics, you keep the magic (and a piece of the pie).",
                    "LiveArt पार्टनर प्रोग्राम भारत का सबसे पुरस्कृत क्रिएटिव नेटवर्क है। हम रसद संभालते हैं, आप जादू रखते हैं।"
                  )}
                </p>
              </div>

              <div className="space-y-8">
                {benefits.map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center shrink-0 text-teal shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-display text-charcoal mb-2">{benefit.title}</h3>
                      <p className="text-charcoal/40 text-sm font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 bg-charcoal rounded-[32px] text-paper relative overflow-hidden group">
                 <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal mb-2">Current Status</p>
                    <h4 className="text-2xl font-display mb-4">{t('Accepted in 20+ Cities', '20+ शहरों में स्वीकार किया गया')}</h4>
                    <p className="text-paper/40 text-sm leading-relaxed">
                      {t('Currently accepting applications for premium event planners, travel curators, and lifestyle managers.', 'वर्तमान में प्रीमियम इवेंट प्लानर्स, ट्रैवल क्यूरेटर्स और लाइफस्टाइल मैनेजर्स के लिए आवेदन स्वीकार किए जा रहे हैं।')}
                    </p>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Partner;
