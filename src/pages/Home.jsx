import { Hero, OccasionSelector, TrustSection, BlogPreview, InquirySection, ExperienceMarquee } from '../components/HomeSections';
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
      <TrustSection />
      <BlogPreview />
      <InquirySection />
    </motion.div>
  );
};

export default Home;
