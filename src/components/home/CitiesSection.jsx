import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin } from 'lucide-react';

export const CitiesSection = () => {
  const { t } = useLanguage();
  
  const cities = [
    'Delhi NCR', 'Mumbai', 'Udaipur', 'Jaipur', 
    'Goa', 'Bangalore', 'Hyderabad', 'Chandigarh', 
    'Kolkata', 'Chennai', 'Agra', 'Pune'
  ];

  return (
    <section className="py-24 bg-paper border-t border-charcoal/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <MapPin size={12} />
            {t('Available Nationwide', 'देश भर में उपलब्ध')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display text-charcoal mb-6">
            {t('Bringing Luxury Experiences to', 'लक्जरी अनुभव ला रहे हैं')} <br />
            <span className="text-gold italic">{t('Premier Destinations', 'प्रमुख गंतव्यों पर')}</span>
          </h2>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto font-medium">
             {t('While based in Delhi NCR, our LiveArt Experience Zones™ travel to the most exclusive wedding celebrations across India.', 'दिल्ली एनसीआर में स्थित होने के बावजूद, हमारे लाइवआर्ट एक्सपीरियंस जोन™ पूरे भारत में सबसे खास शादी समारोहों में जाते हैं।')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {cities.map((city, index) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white border border-charcoal/5 p-6 rounded-2xl hover:border-gold/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="relative z-10 text-xl font-display text-charcoal group-hover:text-primary transition-colors duration-300">
                {city}
              </h3>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto text-center">
            <h4 className="text-[10px] text-charcoal/40 font-black uppercase tracking-[0.2em] mb-2">
               {t('Nationwide Guest Engagement & Wedding Entertainment', 'राष्ट्रव्यापी अतिथि जुड़ाव और वेडिंग मनोरंजन')}
            </h4>
            <p className="text-xs text-charcoal/40 leading-relaxed">
               {t('Providing interactive guest engagement, luxury wedding games, and premium artistic entertainment for high-end events in Delhi NCR, Mumbai, Udaipur, Jaipur, Goa, and other major metropolitan areas across India. Elevating the standard of celebration everywhere we go.', 'दिल्ली एनसीआर, मुंबई, उदयपुर, जयपुर, गोवा और भारत भर के अन्य प्रमुख महानगरीय क्षेत्रों में उच्च स्तरीय कार्यक्रमों के लिए इंटरैक्टिव अतिथि जुड़ाव, लक्जरी वेडिंग गेम्स और प्रीमियम कलात्मक मनोरंजन प्रदान करना। हम जहां भी जाते हैं, उत्सव के मानक को ऊंचा उठाते हैं।')}
            </p>
        </div>
      </div>
    </section>
  );
};
