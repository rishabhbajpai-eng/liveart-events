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
  VisualProofGallery
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
      <PainPointSection />
      <ExperienceMarquee />
      <OccasionSelector onSelect={onSelectOccasion} activeOccasion={selectedOccasion} />
      <SectionCTA />
      <ProcessSection />
      <WhoItIsFor />
      <SectionCTA />
      <TrustSection />
      <VisualProofGallery />
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
