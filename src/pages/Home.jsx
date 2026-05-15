import { 
  Hero, 
  OccasionSelector, 
  TrustSection, 
  TheArtistWithin, 
  BlogPreview, 
  InquirySection, 
  ExperienceMarquee,
  ProcessSection,
  SocialProof,
  ExclusivityScarcity,
  SectionCTA,
  PainPointSection,
  WhoItIsFor,
  VisualProofGallery,
  EmotionalInterrupt,
  LossAversionSection,
  ExperiencePackages,
  RefinedHostsSection,
  DecisionControlSection,
  CitiesSection
} from '../components/HomeSections';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const Home = ({ onSelectOccasion, selectedOccasion }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Helmet>
        <title>{t('LiveArt Events | Premium Interactive Experiences for Weddings & Corporate', 'लाइवआर्ट इवेंट्स | शादियों और कॉर्पोरेट के लिए प्रीमियम इंटरएक्टिव अनुभव')}</title>
        <meta name="description" content={t('Transforming moments into permanent memories with luxury perfume bars, caricature art, and interactive guest engagement for weddings in India.', 'भारत में शादियों के लिए लक्जरी परफ्यूम बार, कैरिकेचर कला और इंटरएक्टिव अतिथि जुड़ाव के साथ पलों को स्थायी यादों में बदलना।')} />
        <meta property="og:title" content="LiveArt Events | The Future of Celebration" />
        <meta property="og:description" content="Luxury interactive experiences for your most cherished celebrations." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://liveartevents.in/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LiveArt Events",
            "url": "https://liveartevents.in",
            "logo": "https://liveartevents.in/logo.png",
            "sameAs": [
              "https://instagram.com/liveartevents"
            ],
            "description": "Premium interactive experience company in India specializing in luxury wedding engagement stations."
          })}
        </script>
      </Helmet>

      <Hero />
      <EmotionalInterrupt />
      <PainPointSection />
      <LossAversionSection />
      <ExperienceMarquee />
      <OccasionSelector onSelect={onSelectOccasion} activeOccasion={selectedOccasion} />
      <SectionCTA />
      <ProcessSection />
      <WhoItIsFor />
      <RefinedHostsSection />
      <ExperiencePackages />
      <SectionCTA />
      <TrustSection />
      <VisualProofGallery />
      <SectionCTA />
      <TheArtistWithin />
      <SectionCTA />
      <ExclusivityScarcity />
      <SectionCTA />
      <DecisionControlSection />
      <CitiesSection />
      <BlogPreview />
      <SocialProof />
      <SectionCTA />
      <InquirySection />
    </motion.div>
  );
};

export default Home;
