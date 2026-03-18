import { Hero, OccasionSelector, TrustSection } from '../components/HomeSections';
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
      <OccasionSelector onSelect={onSelectOccasion} activeOccasion={selectedOccasion} />
      <TrustSection />
    </motion.div>
  );
};

export default Home;
