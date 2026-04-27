import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { t, language } = useLanguage();

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
      className="pt-32 pb-20 px-4 min-h-screen bg-paper"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold font-black tracking-[0.4em] uppercase text-xs mb-6 block"
          >
            {t('The Wedding Journal', 'वेडिंग जर्नल')}
          </motion.span>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-display text-charcoal mb-8"
          >
            {t('Engagement Insights', 'एंगेजमेंट अंतर्दृष्टि')}
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-charcoal/60 text-xl max-w-2xl mx-auto italic leading-relaxed"
          >
            {t(
              'Discover creative ideas, event planning tips, and the latest trends in interactive guest experiences for Indian weddings.',
              'भारतीय शादियों के लिए रचनात्मक विचार, इवेंट प्लानिंग टिप्स और इंटरैक्टिव गेस्ट एक्सपीरियंस के नवीनतम रुझानों की खोज करें।'
            )}
          </motion.p>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-charcoal/5 flex flex-col group"
            >
              <Link to={`/blog/${post.id}`} className="relative aspect-[16/9] overflow-hidden block">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-6 py-2 bg-paper/90 backdrop-blur-sm text-gold text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                    {language === 'en' ? post.category : post.categoryHi}
                  </span>
                </div>
              </Link>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-6">
                  <span>{new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-3xl font-display mb-6 group-hover:text-gold transition-colors leading-tight">
                  <Link to={`/blog/${post.id}`}>{language === 'en' ? post.title : post.titleHi}</Link>
                </h2>
                
                <p className="text-charcoal/60 mb-8 line-clamp-3 text-lg italic leading-relaxed">
                  {language === 'en' ? post.summary : post.summaryHi}
                </p>
                
                <div className="mt-auto pt-8 border-t border-charcoal/5">
                  <Link to={`/blog/${post.id}`} className="text-gold font-black uppercase tracking-widest text-[10px] flex items-center gap-3 group/btn">
                    {language === 'en' ? 'Read the Full Story' : 'पूरी कहानी पढ़ें'}
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;
