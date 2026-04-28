import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export const RefinedHostsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-white text-charcoal overflow-hidden border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display mb-12 leading-tight">
            {t('For hosts who refuse', 'उन मेजबानों के लिए जो इनकार करते हैं')} <br />
            <span className="text-gold italic">{t('Ordinary Celebrations.', 'साधारण उत्सवों से।')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
             <div className="space-y-6">
                <div className="text-gold font-display text-4xl">01</div>
                <h4 className="text-xl font-black uppercase tracking-widest">{t('Not for basic weddings', 'बेसिक शादियों के लिए नहीं')}</h4>
                <p className="text-charcoal/40 text-sm italic leading-relaxed">{t('We do not build generic setups. We design cultural moments that define a legacy.', 'हम सामान्य सेटअप नहीं बनाते हैं। हम सांस्कृतिक क्षण डिजाइन करते हैं जो एक विरासत को परिभाषित करते हैं।')}</p>
             </div>
             <div className="space-y-6">
                <div className="text-gold font-display text-4xl">02</div>
                <h4 className="text-xl font-black uppercase tracking-widest">{t('Not for passive events', 'सुस्त ईवेंट्स के लिए नहीं')}</h4>
                <p className="text-charcoal/40 text-sm italic leading-relaxed">{t('For hosts who want their guests to be the art, not just the audience.', 'उन मेजबानों के लिए जो चाहते हैं कि उनके मेहमान कला बनें, न कि केवल दर्शक।')}</p>
             </div>
             <div className="space-y-6">
                <div className="text-gold font-display text-4xl">03</div>
                <h4 className="text-xl font-black uppercase tracking-widest">{t('Designed for standby', 'स्टैंडआउट के लिए डिज़ाइन किया गया')}</h4>
                <p className="text-charcoal/40 text-sm italic leading-relaxed">{t('Standout celebrations that are talked about for seasons, not just hours. Designed to engage guests across all age groups.', 'शानदार उत्सव जिनकी चर्चा हफ्तों तक होती है, न कि केवल घंटों तक। सभी आयु समूहों के मेहमानों को शामिल करने के लिए डिज़ाइन किया गया।')}</p>
             </div>
          </div>

          <div className="mt-24">
             <Link to="/contact" className="gold-btn px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px]">
                {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
