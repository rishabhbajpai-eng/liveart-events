import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { STATIONS } from '../../constants';
import { Link } from 'react-router-dom';
import SafeImage from './SafeImage';

const OccasionActivities = ({ occasion }) => {
  const { t } = useLanguage();
  
  const activities = STATIONS.filter(s => s.popularFor?.includes(occasion));

  if (activities.length === 0) return null;

  return (
    <section className="py-24 border-t border-copper/10 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4"
          >
            {occasion === 'wedding' 
              ? t('Popular Wedding Activities', 'लोकप्रिय वेडिंग गतिविधियाँ')
              : t('Popular Birthday Activities', 'लोकप्रिय जन्मदिन की गतिविधियाँ')}
          </motion.h2>
          <div className="w-24 h-1 bg-copper mx-auto mb-6"></div>
          <p className="text-xl text-charcoal/60 max-w-2xl mx-auto">
            {t('Explore our curated list of interactive stations to make your event unforgettable.', 'अपने कार्यक्रम को अविस्मरणीय बनाने के लिए हमारे इंटरैक्टिव स्टेशनों की क्यूरेटेड सूची देखें।')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 > 1 ? 0 : idx * 0.05 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-copper/10 hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage 
                  src={activity.image} 
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                   <Link to="/stations" className="text-paper font-bold text-sm bg-copper/90 px-6 py-2 rounded-full backdrop-blur-sm hover:bg-copper transition-colors">
                     {t('Explore More', 'और जानें')}
                   </Link>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-charcoal mb-2">{activity.name}</h3>
                <p className="text-charcoal/60 text-sm line-clamp-2">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/stations" className="inline-block bg-slate text-paper px-8 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-2xl transition-all">
            {t('View All Stations', 'सभी स्टेशन देखें')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OccasionActivities;
