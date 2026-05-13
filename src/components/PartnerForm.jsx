import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, User, Mail, Phone, Globe, Briefcase, Sparkles, Instagram, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitToGoogleSheets } from '../utils/formSubmission';

export const PartnerForm = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agency: '',
    website: '',
    instagram: '',
    experience: '1-3 years',
    message: '',
    botField: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: `Partner App: ${formData.agency}`,
      eventDate: `Experience: ${formData.experience}`,
      city: `Website: ${formData.website || "N/A"}`,
      budget: `Insta: ${formData.instagram}`,
      message: formData.message
    };

    const result = await submitToGoogleSheets(payload, formData.botField);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', agency: '', website: '', instagram: '', experience: '1-3 years', message: '', botField: ''
      });
    } else {
      setSubmitError(t('Something went wrong. Please try again.', 'कुछ गलत हो गया। कृपया पुन: प्रयास करें।'));
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] p-12 text-center shadow-2xl border border-teal/20"
      >
        <div className="w-24 h-24 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-purple w-12 h-12" />
        </div>
        <h3 className="text-4xl font-display text-charcoal mb-4">{t('Application Received!', 'आवेदन प्राप्त हुआ!')}</h3>
        <p className="text-charcoal/60 text-lg mb-8">
          {t('Welcome to the collective! Our partnership team will review your profile and reach out within 48 hours.', 'कलेक्टिव में आपका स्वागत है! हमारी पार्टनरशिप टीम आपकी प्रोफाइल की समीक्षा करेगी और 48 घंटों के भीतर आपसे संपर्क करेगी।')}
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-4 bg-charcoal text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-purple transition-all"
        >
          {t('Back to Application', 'वापस आवेदन पर')}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative group">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal/10 to-transparent pointer-events-none"></div>
      
      <div className="p-8 lg:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-charcoal rounded-2xl flex items-center justify-center text-purple">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-display text-charcoal leading-none">{t('Partner Application', 'पार्टनर आवेदन')}</h3>
            <p className="text-charcoal/40 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{t('Join India\'s Most Exclusive Creative Network', 'भारत के सबसे विशिष्ट क्रिएटिव नेटवर्क में शामिल हों')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="botField" tabIndex="-1" value={formData.botField} onChange={(e) => setFormData({...formData, botField: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Principal Designer', 'प्रिंसिपल डिज़ाइनर')}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="text"
                  placeholder="Rahul Sharma"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Work Email', 'कार्य ईमेल')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="email"
                  placeholder="rahul@agency.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('WhatsApp Number', 'व्हाट्सएप नंबर')}</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="tel"
                  pattern="^\+?[0-9\s\-\(\)]{10,15}$"
                  title="Please enter a valid phone number (e.g. +91 9876543210)"
                  placeholder="+91 88532 99951"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Agency Name', 'एजेंसी का नाम')}</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="text"
                  placeholder="Creative Celebrations"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.agency}
                  onChange={(e) => setFormData({...formData, agency: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Portfolio Website', 'पोर्टफोलियो वेबसाइट')}</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  type="url"
                  placeholder="https://agency.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Instagram Handle', 'इंस्टाग्राम हैंडल')}</label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 w-5 h-5" />
                <input 
                  required
                  type="text"
                  placeholder="@your_handle"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all text-charcoal font-medium"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2 block ml-1">{t('Experience Level', 'अनुभव का स्तर')}</label>
            <div className="grid grid-cols-3 gap-3">
              {['1-3 years', '3-7 years', '7+ years'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({...formData, experience: level})}
                  className={`py-3 rounded-xl border-2 font-bold text-[10px] transition-all ${
                    formData.experience === level 
                      ? 'border-purple bg-purple/5 text-charcoal' 
                      : 'border-gray-100 text-charcoal/40 hover:border-purple/30'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
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
              ) : t('Apply Now', 'अभी आवेदन करें')}
              {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />}
            </span>
            {!isSubmitting && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-purple via-charcoal to-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>
                <div className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75"></div>
                <span className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-black text-lg uppercase tracking-[0.2em]">
                  {t('Send Application', 'आवेदन भेजें')}
                </span>
              </>
            )}
          </button>

          {submitError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {submitError}
            </motion.div>
          )}
        </form>

        <p className="text-center text-[10px] text-charcoal/30 mt-8 font-bold uppercase tracking-widest">
          {t('12% Referral Commission • Exclusive Assets • Priority Support', '12% रेफरल कमीशन • विशेष संपत्तियां • प्राथमिकता समर्थन')}
        </p>
      </div>
    </div>
  );
};
