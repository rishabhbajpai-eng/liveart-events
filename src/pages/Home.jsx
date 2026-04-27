import { 
  Hero, 
  OccasionSelector, 
  WhyChooseUs,
  VisualProofGallery,
  LocationsSection,
  BlogPreview, 
  FAQSection,
  InquirySection
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
      
      {/* Services Section */}
      <section id="services">
        <OccasionSelector onSelect={onSelectOccasion} activeOccasion={selectedOccasion} />
      </section>

      {/* Why Choose Us - Focus on engagement vs decoration */}
      <WhyChooseUs />

      {/* Real Event Experiences */}
      <VisualProofGallery />
      
      {/* Cities Served */}
      <section id="cities">
        <LocationsSection />
      </section>

      <FAQSection />
      <BlogPreview />
      
      {/* Strong Final CTA */}
      <InquirySection />
    </motion.div>
  );
};

export default Home;
