import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, User, Mail, Phone, Calendar, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LeadForm = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    eventSize: '50-100',
    message: '',
    botField: '' // Honeypot field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Honeypot validation
      if (formData.botField) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        return; // Silently reject bots
      }

      const scriptURL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      
      const formBody = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'botField') {
          formBody.append(key, formData[key]);
        }
      });
      formBody.append('formType', 'LeadForm');
      formBody.append('sourceUrl', window.location.href);

      // Sending data to Google Sheets
      if (scriptURL) {
        await fetch(scriptURL, {
          method: 'POST',
          body: formBody,
          mode: 'no-cors'
        });
      } else {
        // Simulate delay if URL isn't set yet
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.warn("Please set VITE_GOOGLE_SHEETS_URL in your .env to send data to Google Sheets.");
      }

      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', date: '', location: '', eventSize: '50-100', message: '', botField: ''
      });
    } catch (error) {
      console.error('Error submitting form', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] p-12 text-center shadow-2xl border border-purple/20"
      >
        <div className="w-24 h-24 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-purple w-12 h-12" />
        </div>
        <h3 className="text-4xl font-display text-charcoal mb-4">{t('Request Received!', 'अनुरोध प्राप्त हुआ!')}</h3>
        <p className="text-charcoal/60 text-lg mb-8">
          {t('Our Experience Designers will reach out to you within 24 hours to curate your masterpiece.', 'हमारे एक्सपीरियंस डिज़ाइनर आपके मास्टरपीस को क्यूरेट करने के लिए 24 घंटों के भीतर आपसे संपर्क करेंगे।')}
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-4 bg-charcoal text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-purple hover:text-charcoal transition-all"
        >
          {t('Send Another Request', 'दूसरा अनुरोध भेजें')}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative group">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple/10 to-transparent pointer-events-none"></div>
      
      <div className="p-8 lg:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-charcoal rounded-2xl flex items-center justify-center">
            <Sparkles className="text-purple w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-display text-charcoal leading-none">{t('Book the Experience', 'अनुभव बुक करें')}</h3>
            <p className="text-charcoal/40 text-xs font-black uppercase tracking-[0.2em] mt-2">{t('Limited Slots for 2026', '2026 के लिए सीमित स्लॉट')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="botField" tabIndex="-1" value={formData.botField} onChange={(e) => setFormData({...formData, botField: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Full Name', 'पूरा नाम')}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="text"
                  placeholder="Rahul Sharma"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Email Address', 'ईमेल पता')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="email"
                  placeholder="rahul@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Phone Number', 'फ़ोन नंबर')}</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="tel"
                  pattern="^\+?[0-9\s\-\(\)]{10,15}$"
                  title="Please enter a valid phone number (e.g. +91 9876543210)"
                  placeholder="+91 88532 99951"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Event Date', 'कार्यक्रम की तारीख')}</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Event Location', 'कार्यक्रम का स्थान')}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
              <input 
                required
                type="text"
                placeholder="New Delhi, Imperial Hotel"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Guest Count', 'मेहमानों की संख्या')}</label>
            <div className="grid grid-cols-3 gap-3">
              {['< 50', '50-200', '200+'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFormData({...formData, eventSize: size})}
                  className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    formData.eventSize === size 
                      ? 'border-purple bg-purple/5 text-charcoal' 
                      : 'border-gray-100 text-charcoal/40 hover:border-purple/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Event Details', 'कार्यक्रम का विवरण')}</label>
            <textarea 
              rows="3"
              placeholder="Tell us about your vision..."
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium resize-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-charcoal text-white rounded-2xl font-black text-lg uppercase tracking-[0.2em] relative overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                 <>
                   <Loader2 className="w-5 h-5 animate-spin" />
                   {t('Sending...', 'भेजा जा रहा है...')}
                 </>
              ) : (
                 <>
                   {t('Secure Your Date', 'अपनी तारीख सुरक्षित करें')}
                   <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                 </>
              )}
            </span>
            {!isSubmitting && (
               <>
                 <div className="absolute inset-0 bg-gradient-to-r from-purple via-teal to-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>
                 <div className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75"></div>
                 <span className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-black text-lg uppercase tracking-[0.2em]">
                   {t('Send Inquiry', 'पूछताछ भेजें')}
                 </span>
               </>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-charcoal/30 mt-8 font-bold uppercase tracking-widest">
          {t('Secure & Private • Guaranteed 24h Response', 'सुरक्षित और निजी • गारंटीकृत 24 घंटे प्रतिक्रिया')}
        </p>
      </div>
    </div>
  );
};

