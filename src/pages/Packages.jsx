import { PackageBuilder } from '../components/PackageBuilder';
import { motion } from 'motion/react';

const Packages = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <PackageBuilder />
    </motion.div>
  );
};

export default Packages;
