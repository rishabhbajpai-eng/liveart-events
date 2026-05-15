import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  Users,
  Wallet,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { submitToGoogleSheets } from '../utils/formSubmission';

/**
 * LeadForm - Premium Inquiry System for LiveArt Events
 * Features: Google Sheets sync, WhatsApp redirect, Honeypot, Validation, Luxury UX.
 */
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
    eventType: 'Wedding',
    guestCount: '',
    budget: '',
    message: '',
    botField: '' // Anti-spam Honeypot
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('Name is required', 'नाम आवश्यक है');
    if (!formData.phone.match(/^\+?[0-9\s\-\(\)]{10,15}$/)) newErrors.phone = t('Invalid phone number', 'अमान्य फ़ोन नंबर');
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = t('Invalid email', 'अमान्य ईमेल');
    if (!formData.date) newErrors.date = t('Date is required', 'तारीख आवश्यक है');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(t('Please fix the errors in the form.', 'कृपया फॉर्म में त्रुटियों को ठीक करें।'));
      return;
    }

    setIsSubmitting(true);
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.date,
      guestCount: formData.guestCount,
      city: formData.location,
      budget: formData.budget,
      message: formData.message
    };

    try {
      const result = await submitToGoogleSheets(payload, formData.botField);

      if (result.success) {
        toast.success(t('Inquiry Sent Successfully!', 'पूछताछ सफलतापूर्वक भेजी गई!'));
        setIsSubmitted(true);
        
        // Automatic WhatsApp Redirect after 1.5 seconds
        if (result.whatsappUrl) {
          setTimeout(() => {
            window.open(result.whatsappUrl, '_blank');
          }, 1500);
        }
      } else {
        toast.error(result.error || t('Failed to send inquiry. Please try again.', 'पूछताछ भेजने में विफल। कृपया पुन: प्रयास करें।'));
      }
    } catch (err) {
      toast.error(t('A network error occurred.', 'एक नेटवर्क त्रुटि हुई।'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] p-12 text-center shadow-2xl border border-purple/10 max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-teal w-12 h-12" />
        </div>
        <h3 className="text-4xl font-display font-bold text-charcoal mb-4">
          {t('Your Story Begins!', 'आपकी कहानी शुरू होती है!')}
        </h3>
        <p className="text-charcoal/60 text-lg mb-8 leading-relaxed">
          {t('Thank you for choosing LiveArt. We are redirecting you to WhatsApp for instant connection, and our designers will also reach out within 24 hours.', 'लाइवआर्ट चुनने के लिए धन्यवाद। हम आपको तत्काल कनेक्शन के लिए व्हाट्सएप पर रीडायरेक्ट कर रहे हैं, और हमारे डिज़ाइनर भी 24 घंटों के भीतर संपर्क करेंगे।')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 bg-gray-100 text-charcoal rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
          >
            {t('Send Another', 'दूसरा भेजें')}
          </button>
          <a 
            href={`https://wa.me/918853299951?text=${encodeURIComponent("Hello LiveArt Events, I just submitted an inquiry on your website.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-teal text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-charcoal transition-all shadow-lg shadow-teal/20"
          >
            {t('Chat on WhatsApp', 'व्हाट्सएप पर चैट करें')}
            <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative luxe-shadow">
      
      {/* Premium Header Decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple via-teal to-purple opacity-70"></div>
      
      <div className="p-8 lg:p-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-charcoal rounded-2xl flex items-center justify-center shadow-xl rotate-3">
              <Sparkles className="text-purple w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="text-3xl font-display font-bold text-charcoal leading-none">
                {t('Secure Your Date', 'अपनी तारीख सुरक्षित करें')}
              </h3>
              <p className="text-purple text-[10px] font-black uppercase tracking-[0.25em] mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple animate-ping"></span>
                {t('Limited Availability for 2026', '2026 के लिए सीमित उपलब्धता')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="botField" tabIndex="-1" value={formData.botField} onChange={handleChange} />
          </div>

          {/* Personal Info Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                <User size={12} /> {t('Full Name', 'पूरा नाम')}
              </label>
              <input 
                name="name"
                required
                type="text"
                placeholder="Ex: Vikram Singh"
                className={`w-full px-6 py-4 bg-gray-50 border ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-100'} rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium placeholder:text-charcoal/20`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase tracking-tight">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                <Phone size={12} /> {t('Phone Number', 'फ़ोन नंबर')}
              </label>
              <input 
                name="phone"
                required
                type="tel"
                placeholder="+91 00000 00000"
                className={`w-full px-6 py-4 bg-gray-50 border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-100'} rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium placeholder:text-charcoal/20`}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
              <Mail size={12} /> {t('Email Address', 'ईमेल पता')}
            </label>
            <input 
              name="email"
              required
              type="email"
              placeholder="Ex: vikram@luxuryevents.in"
              className={`w-full px-6 py-4 bg-gray-50 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-100'} rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium placeholder:text-charcoal/20`}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Event Details Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                <Calendar size={12} /> {t('Event Date', 'कार्यक्रम की तारीख')}
              </label>
              <input 
                name="date"
                required
                type="date"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                <MapPin size={12} /> {t('Event Location', 'कार्यक्रम का स्थान')}
              </label>
              <input 
                name="location"
                required
                type="text"
                placeholder="City or Venue Name"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium placeholder:text-charcoal/20"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Selection Group */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">{t('What are we celebrating?', 'हम क्या जश्न मना रहे हैं?')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Wedding', 'Birthday', 'Corporate', 'Other'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, eventType: type})}
                  className={`py-3 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                    formData.eventType === type 
                      ? 'border-charcoal bg-charcoal text-white shadow-lg' 
                      : 'border-gray-100 text-charcoal/30 hover:border-purple/30 bg-gray-50/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Logistics Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                <Users size={12} /> {t('Estimated Guests', 'अनुमानित मेहमान')}
              </label>
              <input 
                name="guestCount"
                type="number"
                placeholder="Ex: 200"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium placeholder:text-charcoal/20"
                value={formData.guestCount}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                <Wallet size={12} /> {t('Planned Budget (Approx)', 'नियोजित बजट (लगभग)')}
              </label>
              <input 
                name="budget"
                type="text"
                placeholder="Ex: ₹ 2 - 5 Lakhs"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium placeholder:text-charcoal/20"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
              <MessageSquare size={12} /> {t('Tell us your vision', 'हमें अपना विजन बताएं')}
            </label>
            <textarea 
              name="message"
              rows="4"
              placeholder="What would make this event magical for you?"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple focus:bg-white transition-all text-charcoal font-medium resize-none placeholder:text-charcoal/20"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-charcoal text-white rounded-3xl font-black text-lg uppercase tracking-[0.3em] relative overflow-hidden group shadow-2xl transition-all disabled:opacity-70 disabled:pointer-events-none"
          >
            <div className="relative z-10 flex items-center justify-center gap-4">
              {isSubmitting ? (
                 <>
                   <Loader2 className="w-6 h-6 animate-spin text-purple" />
                   {t('Confirming Date...', 'तारीख की पुष्टि की जा रही है...')}
                 </>
              ) : (
                 <>
                   {t('Begin Consultation', 'परामर्श शुरू करें')}
                   <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 text-purple" />
                 </>
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-purple/20 via-transparent to-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.button>

          <p className="text-center text-[9px] text-charcoal/30 font-black uppercase tracking-[0.3em]">
            {t('🔒 Secure Data Processing • Instant WhatsApp Response', '🔒 सुरक्षित डेटा प्रोसेसिंग • तत्काल व्हाट्सएप प्रतिक्रिया')}
          </p>
        </form>
      </div>
    </div>
  );
};

