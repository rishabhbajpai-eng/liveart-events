import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export const DecisionControlSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-primary text-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display mb-10 leading-tight text-white">
            {t('If your wedding matters,', 'यदि आपकी शादी मायने रखती है,')} <br />
            <span className="text-gold italic">{t('This decision matters.', 'तो यह निर्णय मायने रखता है।')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left">
             <div className="p-8 bg-paper/5 backdrop-blur-md rounded-3xl border border-paper/10">
                <p className="text-xl leading-relaxed italic text-paper/80">
                  {t('Guests remember experiences, not just visuals. Decoration sets the stage, but interaction defines the memory.', 'मेहमान अनुभवों को याद रखते हैं, न कि केवल दृश्यों को। सजावट मंच तैयार करती है, लेकिन बातचीत याद को परिभाषित करती है।')}
                </p>
             </div>
             <div className="p-8 bg-paper/5 backdrop-blur-md rounded-3xl border border-paper/10">
                <p className="text-xl leading-relaxed italic text-paper/80">
                   {t('Engagement defines how your event is remembered for decades. Don’t overlook the part your guests will talk about the most.', 'सहभागिता यह परिभाषित करती है कि आपके कार्यक्रम को दशकों तक कैसे याद रखा जाएगा। उस हिस्से को नज़रअंदाज़ न करें जिसके बारे में आपके मेहमान सबसे ज्यादा बात करेंगे।')}
                </p>
             </div>
          </div>

          <div className="mt-20">
             <p className="text-gold font-black uppercase tracking-[0.3em] text-xs mb-10 italic">
                {t('From passive weddings to unforgettable experiences.', 'सुस्त शादियों से अविस्मरणीय अनुभवों तक।')}
             </p>
             <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px]">
                {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
