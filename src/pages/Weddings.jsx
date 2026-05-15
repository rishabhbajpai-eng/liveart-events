import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionCTA } from '../components/HomeSections';
import { Helmet } from 'react-helmet-async';
import OccasionActivities from '../components/shared/OccasionActivities';

export default function Weddings() {
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
        <title>{t('Luxury Wedding Guest Experiences & Entertainment | LiveArt Events', 'लक्जरी वेडिंग गेस्ट एक्सपीरियंस और एंटरटेनमेंट | लाइवआर्ट इवेंट्स')}</title>
        <meta name="description" content={t('Elevate your Haldi, Mehndi, Sangeet, and Wedding Day with interactive guest stations, flower petal showers, and curated games in India.', 'भारत में इंटरएक्टिव गेस्ट स्टेशनों, फूलों की वर्षा और क्यूरेटेड गेम्स के साथ अपनी हल्दी, मेहंदी, संगीत और शादी के दिन को बेहतर बनाएं।')} />
        <link rel="canonical" href="https://liveartevents.in/weddings" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Luxury Wedding Guest Entertainment",
            "provider": {
              "@type": "Organization",
              "name": "LiveArt Events"
            },
            "description": "Interactive guest engagement and entertainment services for Indian weddings.",
            "areaServed": "India"
          })}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-copper/10 border border-copper/20 rounded-full text-copper text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {t('Curated Wedding Experiences', 'क्यूरेटेड वेडिंग अनुभव')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-charcoal mb-6 leading-tight"
          >
            A Journey of Unforgettable <span className="text-copper italic">Moments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-charcoal/60 leading-relaxed font-light"
          >
            We don&apos;t just provide services; we craft experiences. Discover how we can transform each ceremony of your wedding into an interactive, joy-filled celebration.
          </motion.p>
        </div>


      </div>
      
      <OccasionActivities occasion="wedding" />
      
      <SectionCTA />
    </motion.div>
  );
}
