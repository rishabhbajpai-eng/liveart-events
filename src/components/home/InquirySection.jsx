import { Link } from 'react-router-dom';
import { Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MagneticButton } from '../shared/MagneticButton';
import { LeadForm } from '../LeadForm';

export const InquirySection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-32 bg-paper relative overflow-hidden">
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none translate-y-1/2 translate-x-1/4">
        <span className="text-[40vw] font-display font-black leading-none">LUXE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 text-left">
            <h2 className="text-6xl md:text-8xl font-display text-charcoal mb-4 leading-[0.9]">
              {t('Because your wedding', 'क्योंकि आपकी शादी')} <br />
              <span className="text-gold italic">{t('Deserves the Extraordinary.', 'असाधारण की हकदार है।')}</span>
            </h2>
            <p className="text-charcoal text-2xl mb-10 font-black uppercase tracking-widest">
              {t('Refuse to be ordinary.', 'साधारण होने से इनकार करें।')}
            </p>
            <p className="text-charcoal/40 text-sm mb-12 italic font-display max-w-xl mx-auto">
              &quot;{t('Years from now, people won’t remember the decorations. They’ll remember how your celebration felt.', 'अब से बरसों बाद, लोग सजावट को याद नहीं रखेंगे। उन्हें याद रहेगा कि आपका उत्सव कैसा महसूस हुआ।')}&quot;
            </p>
            <div className="mb-12">
               <p className="text-charcoal/60 text-xs font-black uppercase tracking-widest mb-6 italic">
                  {t('Make your event impossible to forget.', 'अपने ईवेंट को भूलना असंभव बनाएं।')}
               </p>
               <MagneticButton>
                 <Link to="/contact" className="gold-btn px-10 py-5 rounded-full font-black tracking-widest text-[10px] uppercase shadow-xl inline-block text-center">
                   {t('Plan My Wedding Experience', 'मेरी शादी के अनुभव की योजना बनाएं')}
                 </Link>
               </MagneticButton>
            </div>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Zap className="text-gold" />
                </div>
                <div>
                  <h4 className="text-2xl font-display text-charcoal mb-2">{t('Express Booking', 'एक्सप्रेस बुकिंग')}</h4>
                  <p className="text-charcoal/60">{t('Secure your date in under 60 seconds. We value your time as much as your experience.', '60 सेकंड से भी कम समय में अपनी तारीख सुरक्षित करें। हम आपके अनुभव के साथ-साथ आपके समय को भी महत्व देते हैं।')}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Sparkles className="text-gold" />
                </div>
                <div>
                  <h4 className="text-2xl font-display text-charcoal mb-2">{t('Custom Themes', 'कस्टम थीम्स')}</h4>
                  <p className="text-charcoal/60">{t('Every station is tailored to match your event color palette and prestige.', 'प्रत्येक स्टेशन आपके इवेंट कलर पैलेट और प्रतिष्ठा से मेल खाने के लिए तैयार किया गया है।')}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-charcoal rounded-[40px] text-paper relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <p className="text-gold font-black text-xs uppercase tracking-[0.3em] mb-4">{t('Direct Line', 'सीधी लाइन')}</p>
                <p className="text-3xl font-display mb-2">+91 88532 99951</p>
                <p className="text-paper/40 text-sm font-medium">{t('Available 10 AM - 10 PM IST', 'सुबह 10 बजे - रात 10 बजे IST तक उपलब्ध')}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};
