import { motion } from 'motion/react';
import { Zap, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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
