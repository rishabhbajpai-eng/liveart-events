import { Link } from 'react-router-dom';
import { Sparkles, Zap, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ExperiencePackages = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('Choose Your Experience Level', 'अपना अनुभव स्तर चुनें')}</h2>
          <p className="text-charcoal/40 uppercase tracking-[0.4em] font-black text-xs">{t('Precision Crafted Guest Engagement', 'परिशुद्धता के साथ अतिथि सहभागिता')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Essential */}
          <div className="p-12 bg-white rounded-[60px] border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all group">
            <h3 className="text-3xl font-display mb-8">{t('Essential Experience', 'एसेंशियल एक्सपीरियंस')}</h3>
            <p className="text-charcoal/40 mb-10 text-sm leading-relaxed">{t('Curated selection of our most loved Experience Zones™ designed for intimate weddings and focused engagement.', 'अंतरंग शादियों और केंद्रित सहभागिता के लिए डिज़ाइन किए गए हमारे सबसे पसंदीदा एक्सपीरियंस जोन™ का क्यूरेटेड चयन।')}</p>
            <ul className="space-y-6 mb-12">
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Check size={16} className="text-gold" /> {t('Strategic Placements', 'रणनीतिक प्लेसमेंट')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Check size={16} className="text-gold" /> {t('Signature Artists', 'सिग्नेचर कलाकार')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Check size={16} className="text-gold" /> {t('High-Guest ROI', 'हाई-गेस्ट रिटर्न')}</li>
            </ul>
            <Link to="/contact" className="w-full inline-block py-5 border border-charcoal text-charcoal text-center text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gold hover:border-gold transition-all">
              {t('Secure for Your Date', 'अपनी तारीख के लिए सुरक्षित करें')}
            </Link>
          </div>

          {/* Signature */}
          <div className="p-12 bg-primary rounded-[60px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-8 right-8 bg-gold text-charcoal px-4 py-2 rounded-full font-black uppercase text-[8px] tracking-widest">
               {t('Most Popular', 'सबसे लोकप्रिय')}
            </div>
            <h3 className="text-3xl font-display mb-8 text-paper">{t('Signature Experience', 'सिग्नेचर एक्सपीरियंस')}</h3>
            <p className="text-paper/40 mb-10 text-sm leading-relaxed">{t('The complete LiveArt standard. Immersive Experience Zones™ integrated seamlessly across all major event functions.', 'पूर्ण लाइवआर्ट मानक। सभी प्रमुख कार्यक्रमों में सहजता से एकीकृत इमर्सिव एक्सपीरियंस जोन™।')}</p>
            <ul className="space-y-6 mb-12">
               <li className="flex items-center gap-4 text-paper/60 text-sm italic"><Sparkles size={16} className="text-gold" /> {t('Full-Event Engagement', 'पूर्ण-ईवेंट सहभागिता')}</li>
               <li className="flex items-center gap-4 text-paper/60 text-sm italic"><Sparkles size={16} className="text-gold" /> {t('Personalized Souvenirs', 'व्यक्तिगत स्मृति चिन्ह')}</li>
               <li className="flex items-center gap-4 text-paper/60 text-sm italic"><Sparkles size={16} className="text-gold" /> {t('Social Buzz Momentum', 'सोशल बज़ मोमेंटम')}</li>
            </ul>
            <Link to="/contact" className="gold-btn w-full inline-block py-5 text-center text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl transform group-hover:scale-105 transition-transform">
              {t('Book My Signature Event', 'मेरा सिग्नेचर ईवेंट बुक करें')}
            </Link>
          </div>

          {/* Luxury */}
          <div className="p-12 bg-white rounded-[60px] border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all group">
            <h3 className="text-3xl font-display mb-8">{t('Luxury Experience', 'लक्जरी एक्सपीरियंस')}</h3>
            <p className="text-charcoal/40 mb-10 text-sm leading-relaxed">{t('Unaltered luxury. Bespoke Experience Zones™ crafted with master artisans and high-end materials for the extraordinary.', 'अपरिवर्तित लक्जरी। असाधारण के लिए मास्टर कलाकारों और उच्च-स्तरीय सामग्रियों के साथ तैयार किए गए बेस्पोक एक्सपीरियंस जोन™।')}</p>
            <ul className="space-y-6 mb-12">
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Zap size={16} className="text-gold" /> {t('Bespoke Craftsmanship', 'बेस्पोक शिल्प कौशल')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Zap size={16} className="text-gold" /> {t('Master-Tier Implementation', 'मास्टर-टियर कार्यान्वयन')}</li>
               <li className="flex items-center gap-4 text-charcoal/60 text-sm italic"><Zap size={16} className="text-gold" /> {t('Infinite Personalization', 'अनंत वैयक्तिकरण')}</li>
            </ul>
            <Link to="/contact" className="w-full inline-block py-5 border border-charcoal text-charcoal text-center text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gold hover:border-gold transition-all">
              {t('Apply for Luxury Access', 'लक्जरी एक्सेस के लिए अप्लाई करें')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
