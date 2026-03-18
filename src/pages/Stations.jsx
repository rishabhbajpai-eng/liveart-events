import { StationCatalogue } from '../components/HomeSections';
import { motion } from 'motion/react';

const Stations = ({ selectedOccasion }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 relative"
    >
      <StationCatalogue key={selectedOccasion} selectedOccasion={selectedOccasion} />
    </motion.div>
  );
};

export default Stations;
