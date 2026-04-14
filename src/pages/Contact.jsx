import { motion } from 'motion/react';
import { LeadForm } from '../components/LeadForm';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-paper min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 bg-teal/5 rounded-full text-teal text-xs font-black uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            {t('Lets Create Magic', 'चलो जादू करते हैं')}
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display text-charcoal mb-6">
            {t('Contact', 'संपर्क')} <span className="text-teal italic">{t('Us', 'करें')}</span>
          </h1>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
            {t('Ready to elevate your event? Reach out to our luxury stylists for a personalized consultation.', 'अपने इवेंट को एलीवेट करने के लिए तैयार हैं? व्यक्तिगत परामर्श के लिए हमारे लग्जरी स्टाइलिस्टों से संपर्क करें।')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-display text-charcoal mb-6 uppercase tracking-widest text-teal">{t('Quick Contact', 'त्वरित संपर्क')}</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 text-teal">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-1">{t('Call or WhatsApp', 'कॉल या व्हाट्सएप')}</p>
                    <p className="font-bold text-charcoal">+91 99999 99999</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0 text-teal">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-1">{t('Email Us', 'हमें ईमेल करें')}</p>
                    <p className="font-bold text-charcoal">hello@liveartevents.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-charcoal p-8 rounded-[32px] text-paper relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 rounded-full blur-2xl"></div>
               <h3 className="text-xl font-display mb-6 uppercase tracking-widest text-purple">{t('Office Hours', 'कार्यालय का समय')}</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-paper/40 font-medium">{t('Mon - Fri', 'सोम - शुक्र')}</span>
                    <span className="font-bold">10:00 AM - 08:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-paper/40 font-medium">{t('Saturday', 'शनिवार')}</span>
                    <span className="font-bold">11:00 AM - 06:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-paper/40 font-medium">{t('Sunday', 'रविवार')}</span>
                    <span className="text-purple font-black uppercase tracking-widest">{t('Events Only', 'केवल इवेंट्स')}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
