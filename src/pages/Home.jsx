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
  SectionCTA
} from '../components/HomeSections';
import { motion } from 'motion/react';

const Home = ({ onSelectOccasion, selectedOccasion }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Hero />
      <ExperienceMarquee />
      <OccasionSelector onSelect={onSelectOccasion} activeOccasion={selectedOccasion} />
      <SectionCTA />
      <ProcessSection />
      <SectionCTA />
      <TrustSection />
      <SectionCTA />
      <SocialProof />
      <SectionCTA />
      <TheArtistWithin />
      <SectionCTA />
      <ExclusivityScarcity />
      <SectionCTA />
      <BlogPreview />
      <InquirySection />
    </motion.div>
  );
};

export default Home;
