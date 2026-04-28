import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ExclusivityScarcity = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-charcoal text-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 text-gold">
              <ShieldCheck size={20} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">{t('Exclusivity Guaranteed', 'अनन्यत की गारंटी')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display mb-6">
              {t('We take limited bookings each month to ensure premium quality.', 'हम प्रीमियम गुणवत्ता सुनिश्चित करने के लिए हर महीने सीमित बुकिंग लेते हैं।')}
            </h2>
            <p className="text-paper/60 text-lg">
              {t('Each celebration receives our full focus, from custom designs to white-glove execution. Secure your date early for the legendary LiveArt experience.', 'प्रत्येक उत्सव को हमारा पूरा ध्यान मिलता है, कस्टम डिज़ाइन से लेकर व्हाइट-ग्लव निष्पादन तक। महान लाइवआर्ट अनुभव के लिए अपनी तारीख जल्दी सुरक्षित करें।')}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 text-center">
             <h4 className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-6">{t('Elite Scarcity', 'विशेष उपलब्धता')}</h4>
             <div className="mb-8">
               <p className="text-paper/40 text-sm mb-2 uppercase tracking-widest">{t('Starting from', 'से शुरू')}</p>
               <h3 className="text-5xl md:text-6xl font-display">₹15,000</h3>
             </div>
             <p className="text-paper/60 text-sm mb-10 leading-relaxed italic">
               {t('Bookings are confirmed only after a quick consultation to ensure the right fit.', 'सही फिट सुनिश्चित करने के लिए त्वरित परामर्श के बाद ही बुकिंग की पुष्टि की जाती है।')}
             </p>
             <Link 
               to="/contact" 
               className="inline-block bg-paper text-charcoal px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gold transition-all"
             >
               {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
