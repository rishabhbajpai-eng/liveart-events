import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionCTA } from '../components/HomeSections';
import { Helmet } from 'react-helmet-async';
import OccasionActivities from '../components/shared/OccasionActivities';

export default function Birthdays() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-paper min-h-screen pt-32 pb-20"
    >
      <Helmet>
        <title>{t('Interactive Birthday Party Entertainment & Activities | LiveArt Events', 'इंटरएक्टिव बर्थडे पार्टी एंटरटेनमेंट और गतिविधियां | लाइवआर्ट इवेंट्स')}</title>
        <meta name="description" content={t('Unique birthday experiences for kids and adults. Immersive treasure hunts, creative art stations, and thematic interactive fun for birthdays in India.', 'बच्चों और वयस्कों के लिए अद्वितीय जन्मदिन के अनुभव। भारत में जन्मदिन के लिए इमर्सिव ट्रेजर हंट, रचनात्मक कला स्टेशन और विषय-आधारित इंटरैक्टिव मस्ती।')} />
        <link rel="canonical" href="https://liveartevents.in/birthdays" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-copper/10 border border-copper/20 rounded-full text-copper text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {t('Curated Birthday Experiences', 'क्यूरेटेड जन्मदिन अनुभव')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-charcoal mb-6 leading-tight"
          >
            Celebrate Life&apos;s <span className="text-copper italic">Milestones</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-charcoal/60 leading-relaxed font-light"
          >
            From magical moments for kids to sophisticated fun for adults, we design birthday experiences that prioritize engagement, connection, and pure joy.
          </motion.p>
        </div>


      </div>
      
      <OccasionActivities occasion="birthday" />
      
      <SectionCTA />
    </motion.div>
  );
}
