import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TrustSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-primary text-paper overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-charcoal/20 skew-x-12 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-gold/20 border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {t('Unmatched Excellence', 'अतुलनीय उत्कृष्टता')}
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">
            {t('Why Luxury Hosts Choose', 'लक्जरी मेज़बान क्यों चुनते हैं')} <br />
            <span className="text-gold italic">LiveArt Events</span>
          </h2>
          <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-paper/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-display mb-2">{t('Bespoke Experience Design', 'बेस्पोक एक्सपीरियंस डिज़ाइन')}</h4>
                <p className="text-paper/60 text-base">{t('Premium guest engagement from setup to cleanup. We handle the aesthetics while you host the moments.', 'सेटअप से लेकर सफाई तक प्रीमियम अतिथि जुड़ाव। जब आप क्षणों की मेजबानी करते हैं तो हम सौंदर्यशास्त्र को संभालते हैं।')}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-paper/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-primary transition-all duration-500">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl font-display mb-2">{t('Emotional ROI', 'इमोशनल ROI')}</h4>
                <p className="text-paper/60 text-base">{t('Guests talk about our stations long after the party. It\'s the "wow" factor your event deserves.', 'मेहमान पार्टी के लंबे समय बाद तक हमारे स्टेशनों के बारे में बात करते हैं। यह वह "वाह" कारक है जिसका आपका कार्यक्रम हकदार है।')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative max-w-md mx-auto lg:max-w-none">
          <motion.div 
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="aspect-square rounded-[40px] lg:rounded-[60px] overflow-hidden rotate-3 shadow-2xl border-8 border-white/5"
          >
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" alt="Happy Guests" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="absolute -bottom-10 lg:-bottom-12 -left-6 lg:-left-10 bg-white text-charcoal p-8 lg:p-10 rounded-[40px] shadow-2xl -rotate-6 max-w-[260px] lg:max-w-[320px] border border-gray-100"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 text-gold fill-gold" />)}
            </div>
            <p className="font-display text-lg lg:text-xl leading-snug mb-4 italic text-teal">&quot;The most premium addition to our event. Pure class!&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold">RK</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest leading-none">Mrs. Kapoor</p>
                <p className="text-[10px] text-charcoal/40 font-bold uppercase mt-1">Lalit Luxury Hotels</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
