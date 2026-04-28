import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { MagneticButton } from '../shared/MagneticButton';

export const PainPointSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-cream text-charcoal overflow-hidden border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-display mb-10 leading-tight text-primary">
              {t('Why Most Weddings Feel', 'अधिकांश शादियाँ क्यों महसूस होती हैं')} <br />
              <span className="text-gold italic underline decoration-1 underline-offset-8">{t('Forgettable', 'भूलने योग्य')}</span>
            </h2>
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="text-charcoal/20 text-5xl font-display group-hover:text-gold transition-colors">01</div>
                <div>
                   <h4 className="text-2xl font-display mb-3">{t('The Idle Guest Problem', 'बेकार बैठे मेहमानों की समस्या')}</h4>
                   <p className="text-charcoal/60 leading-relaxed italic">{t('Guests spend hours watching the stage, feeling disconnected and bored during long ceremonies.', 'मेहमान घंटों स्टेज देखते हुए बिताते हैं, लंबी रस्मों के दौरान कटा हुआ और ऊब महसूस करते हैं।')}</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="text-charcoal/20 text-5xl font-display group-hover:text-gold transition-colors">02</div>
                <div>
                   <h4 className="text-2xl font-display mb-3">{t('Repetitive Functions', 'वही पुराने फंक्शन')}</h4>
                   <p className="text-charcoal/60 leading-relaxed italic">{t('The same generic decor and routines that your guests have seen in every wedding this season.', 'वही पुराने डेकोर और रूटीन जो आपके मेहमानों ने इस सीजन की हर शादी में देखे हैं।')}</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="text-charcoal/20 text-5xl font-display group-hover:text-gold transition-colors">03</div>
                <div>
                   <h4 className="text-2xl font-display mb-3">{t('Lack of Interaction', 'बातचीत की कमी')}</h4>
                   <p className="text-charcoal/60 leading-relaxed italic">{t('Limited opportunities for guests to connect, create memories, and truly engage with your celebration.', 'मेहमानों के लिए जुड़ने, यादें बनाने और आपके उत्सव के साथ वास्तव में शामिल होने के सीमित अवसर।')}</p>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-10 border-t border-charcoal/10">
               <p className="text-3xl font-display text-gold italic mb-8">{t('That’s exactly what we solve.', 'यही वह समस्या है जिसे हम हल करते हैं।')}</p>
               <MagneticButton>
                 <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase shadow-xl inline-block">
                   {t('Check Availability for Your Date', 'अपनी तारीख के लिए उपलब्धता की जांच करें')}
                 </Link>
               </MagneticButton>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-[80px] overflow-hidden rotate-3 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" alt="Bored Guests at Wedding" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
             </div>
             <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-10">
                <div className="text-white text-4xl font-display drop-shadow-2xl italic font-light leading-relaxed">&quot;{t('Don’t let your event be just another blur.', 'अपने ईवेंट को केवल एक धुंधलापन न बनने दें।')}&quot;</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
