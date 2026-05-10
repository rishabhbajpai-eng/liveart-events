import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 min-h-screen bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal to-purple bg-clip-text text-transparent"
          >
            {language === 'en' ? 'LiveArt Insights' : 'लाइवआर्ट अंतर्दृष्टि'}
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            {language === 'en' 
              ? 'Discover creative ideas, event planning tips, and the latest trends in interactive guest experiences.' 
              : 'रचनात्मक विचार, इवेंट प्लानिंग टिप्स और इंटरैक्टिव गेस्ट एक्सपीरियंस के नवीनतम रुझानों की खोज करें।'}
          </motion.p>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
            >
              <Link to={`/blog/${post.id}`} className="relative aspect-[16/9] overflow-hidden block">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal text-sm font-semibold rounded-full shadow-sm">
                    {language === 'en' ? post.category : post.categoryHi}
                  </span>
                </div>
              </Link>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span>{new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-teal transition-colors line-clamp-2 leading-tight">
                  <Link to={`/blog/${post.id}`}>{language === 'en' ? post.title : post.titleHi}</Link>
                </h2>
                
                <p className="text-slate-600 mb-6 line-clamp-3 text-sm">
                  {language === 'en' ? post.summary : post.summaryHi}
                </p>
                
                <div className="mt-auto">
                  <Link to={`/blog/${post.id}`} className="text-teal font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all">
                    {language === 'en' ? 'Read More' : 'अधिक पढ़ें'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* SEO Cities Tag Cloud */}
        <div className="mt-24 pt-16 border-t border-slate-200 text-center">
            <h3 className="text-xl font-bold mb-6 text-slate-800">
               {language === 'en' ? 'Serving Premier Event Destinations' : 'प्रमुख इवेंट गंतव्यों की सेवा'}
            </h3>
            <p className="text-slate-500 max-w-3xl mx-auto mb-8 leading-relaxed">
               {language === 'en' 
                 ? 'From luxury destination weddings to exclusive corporate galas, LiveArt Experience Zones™ elevate guest engagement across major cities in India.'
                 : 'लक्जरी डेस्टिनेशन शादियों से लेकर विशेष कॉर्पोरेट गाला तक, लाइवआर्ट एक्सपीरियंस जोन™ भारत के प्रमुख शहरों में अतिथि जुड़ाव को बढ़ाते हैं।'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Delhi NCR', 'Mumbai', 'Udaipur', 'Jaipur', 'Goa', 'Bangalore', 'Hyderabad', 'Chandigarh', 'Kolkata', 'Chennai', 'Agra', 'Pune'].map((city) => (
                <span key={city} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium shadow-sm hover:border-teal hover:text-teal transition-colors cursor-default">
                  {language === 'en' ? `Events in ${city}` : `${city} में कार्यक्रम`}
                </span>
              ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
