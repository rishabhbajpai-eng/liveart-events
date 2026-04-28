import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SocialProof = () => {
  const { t } = useLanguage();
  const testimonials = [
    {
      quote: t('LiveArt didn’t just add activities; they added soul to our wedding. Our guests couldn’t stop talking about it even weeks after the celebration.', 'लाइवआर्ट ने केवल गतिविधियां नहीं जोड़ीं; उन्होंने हमारी शादी में जान डाल दी। हमारे मेहमान उत्सव के हफ़्तों बाद भी इसके बारे में बात करना बंद नहीं कर सके।'),
      author: 'Priya & Rahul',
      role: t('Modern Couple', 'आधुनिक जोड़ा')
    },
    {
      quote: t('The perfume bar was a masterstroke. Our friends ignored the dance floor just to create their signature scents. It was the talk of the night.', 'परफ्यूम बार एक मास्टरस्ट्रोक था। हमारे दोस्तों ने केवल अपनी सिग्नेचर खुशबू बनाने के लिए डांस फ्लोर को नज़रअंदाज़ कर दिया। यह रात की चर्चा थी।'),
      author: 'Sahil Mehra',
      role: t('Visionary Host', 'विज़नरी होस्ट')
    },
    {
      quote: t('Every guest left with a handmade memory and a story to tell. Finally, an event where people actually interacted instead of just sitting.', 'हर मेहमान एक हाथ से बनी याद और बताने के लिए एक कहानी के साथ गया। अंत में, एक ऐसा कार्यक्रम जहाँ लोग सिर्फ बैठने के बजाय वास्तव में बातचीत करते थे।'),
      author: 'Anjali Kapoor',
      role: t('Luxury Curator', 'लक्जरी क्यूरेटर')
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-gold/5 text-gold rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles size={14} />
            {t('Trusted by modern couples', 'आधुनिक जोड़ों द्वारा विश्वसनीय')}
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-charcoal leading-tight">
            {t('Real Stories from', 'से वास्तविक')} <br />
            <span className="text-gold italic">{t('Real Celebrations', 'कहानियां')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[40px] bg-paper-dark border border-gray-100 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Sparkles key={i} size={14} className="text-gold fill-gold" />)}
              </div>
              <p className="text-xl font-display text-charcoal leading-relaxed italic mb-10 text-pretty">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal font-black text-xs uppercase">
                  {item.author.split(' ')[0][0]}{item.author.split(' & ')[1] ? item.author.split(' & ')[1][0] : ''}
                </div>
                <div>
                  <h4 className="font-bold text-charcoal leading-none mb-1">{item.author}</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-charcoal/40">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
