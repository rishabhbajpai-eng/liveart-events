import { Sparkles, Heart, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WhoItIsFor = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-charcoal text-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display mb-6">{t('Designed For The Few', 'कुछ चुनिंदा लोगों के लिए डिज़ाइन किया गया')}</h2>
          <p className="text-gold uppercase tracking-[0.4em] font-black text-xs">{t('Qualification Process', 'योग्यता प्रक्रिया')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-12 bg-white/5 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
              <Sparkles />
            </div>
            <h4 className="text-2xl font-display mb-4">{t('For High-Vision Couples', 'हाई-विज़न जोड़ों के लिए')}</h4>
            <p className="text-paper/40 leading-relaxed italic">{t('For those who want their wedding to stand out and be remembered as a cultural moment, not just a function.', 'उन लोगों के लिए जो चाहते हैं कि उनकी शादी अलग दिखे और एक सांस्कृतिक क्षण के रूप में याद रखी जाए, न कि केवल एक समारोह के रूप में।')}</p>
          </div>
          
          <div className="p-12 bg-white/5 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
              <Heart />
            </div>
            <h4 className="text-2xl font-display mb-4">{t('For Experience-First Hosts', 'अनुभव-प्रथम मेजबानों के लिए')}</h4>
            <p className="text-paper/40 leading-relaxed italic">{t('For hosts who truly care about guest joy and want every person to leave with a handmade memory.', 'उन मेजबानों के लिए जो वास्तव में मेहमानों की खुशी की परवाह करते हैं और चाहते हैं कि हर व्यक्ति हाथ से बनी याद के साथ जाए।')}</p>
          </div>
          
          <div className="p-12 bg-gold/10 rounded-[40px] border border-gold/30">
            <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-charcoal mb-8">
              <Zap />
            </div>
            <h4 className="text-2xl font-display mb-4">{t('Not For The Ordinary', 'साधारण के लिए नहीं')}</h4>
            <p className="text-paper/60 leading-relaxed italic">{t('If you are looking for basic, generic decoration-only events, we are probably not the right fit. We design interaction.', 'यदि आप बुनियादी, सामान्य सजावट-मात्र कार्यक्रमों की तलाश में हैं, तो हम शायद सही फिट नहीं हैं। हम इंटरेक्शन डिज़ाइन करते हैं।')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
