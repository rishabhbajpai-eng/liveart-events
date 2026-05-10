import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BLOG_POSTS } from '../../constants';

export const BlogPreview = () => {
  const { language, t } = useLanguage();
  
  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display text-charcoal mb-6">
              {t('Event Insights &', 'इवेंट अंतर्दृष्टि और')} <br />
              <span className="text-teal italic">{t('Creative Ideas', 'रचनात्मक विचार')}</span>
            </h2>
            <p className="text-charcoal/60 text-lg">
              {t('Expert tips and inspiration for making your next celebration truly extraordinary.', 'अगले उत्सव को वास्तव में असाधारण बनाने के लिए विशेषज्ञ सुझाव और प्रेरणा।')}
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group flex items-center gap-3 text-teal font-black uppercase tracking-widest text-sm hover:gap-5 transition-all"
          >
            {t('View All Posts', 'सभी पोस्ट देखें')}
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group flex flex-col"
            >
              <Link to={`/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                    {language === 'hi' ? post.categoryHi : post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  {new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-teal transition-colors line-clamp-2 leading-tight">
                  <Link to={`/blog/${post.id}`}>
                    {language === 'hi' ? post.titleHi : post.title}
                  </Link>
                </h3>
                
                <p className="text-slate-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {language === 'hi' ? post.summaryHi : post.summary}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link to={`/blog/${post.id}`} className="text-teal font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                    {t('Read Story', 'कहानी पढ़ें')}
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* SEO Cities Mention */}
        <div className="mt-16 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] max-w-3xl mx-auto">
               {language === 'en' 
                 ? 'Discover insights on luxury weddings, corporate events, and premium guest engagement across Delhi NCR, Mumbai, Udaipur, Jaipur, Goa, and other premier destinations.' 
                 : 'दिल्ली एनसीआर, मुंबई, उदयपुर, जयपुर, गोवा और अन्य प्रमुख गंतव्यों में लक्जरी शादियों, कॉर्पोरेट कार्यक्रमों और प्रीमियम अतिथि जुड़ाव पर अंतर्दृष्टि प्राप्त करें।'}
            </p>
        </div>
      </div>
    </section>
  );
};
