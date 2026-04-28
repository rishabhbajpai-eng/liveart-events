import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LossAversionSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-charcoal text-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="aspect-square rounded-[80px] overflow-hidden rotate-2 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=2000&auto=format&fit=crop" alt="Stale Wedding Moment" className="w-full h-full object-cover" />
             </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-display mb-10 leading-tight">
              {t('Without the right experience,', 'बिना सही अनुभव के,')} <br />
              <span className="text-gold italic">{t('Even the best weddings fall flat.', 'सबसे अच्छी शादियाँ भी फीकी पड़ जाती हैं।')}</span>
            </h2>
            <div className="space-y-10 mb-16">
               <div className="flex gap-6 items-start">
                  <div className="text-gold mt-1"><X size={20} /></div>
                  <p className="text-paper/60 text-lg leading-relaxed italic">{t('Guests spend most of the night sitting, watching, and waiting to leave.', 'मेहमान रात का अधिकांश समय बैठने, देखने और जाने का इंतज़ार करने में बिताते हैं।')}</p>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="text-gold mt-1"><X size={20} /></div>
                  <p className="text-paper/60 text-lg leading-relaxed italic">{t('Zero interaction between families leads to repetitive, uninspired celebrations.', 'परिवारों के बीच शून्य बातचीत दोहरावदार, नीरस उत्सवों का कारण बनती है।')}</p>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="text-gold mt-1"><X size={20} /></div>
                  <p className="text-paper/60 text-lg leading-relaxed italic">{t('No memorable moments for your guests to carry back home beside just photos of decor.', 'मेहमानों के लिए घर ले जाने के लिए सजावट की तस्वीरों के अलावा कोई यादगार पल नहीं।')}</p>
               </div>
            </div>
            <p className="text-2xl font-display text-white mb-10 italic">
               {t('That’s exactly what LiveArt Experience Zones™ are designed to prevent.', 'यही वह समस्या है जिसे रोकने के लिए लाइवआर्ट एक्सपीरियंस जोन™ डिज़ाइन किए गए हैं।')}
            </p>
            <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px]">
               {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
