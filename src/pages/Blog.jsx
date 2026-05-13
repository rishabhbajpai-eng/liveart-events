import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, ArrowRight, Search, ChevronRight } from 'lucide-react';

const Blog = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 bg-paper min-h-screen">
      {/* Hero Section */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-copper font-black uppercase tracking-[0.4em] text-xs block mb-6"
          >
            {t('Insights & Stories', 'अंतर्दृष्टि और कहानियाँ')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-bold text-charcoal mb-8 leading-[1.1]"
          >
            {t('The Experience', 'द एक्सपीरियंस')} <br />
            <span className="text-purple italic">{t('Journal', 'जर्नल')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-charcoal/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t(
              'Exploring the art of hospitality, the science of memories, and the future of celebration in modern India.',
              'आधुनिक भारत में आतिथ्य की कला, यादों के विज्ञान और उत्सव के भविष्य की खोज।'
            )}
          </motion.p>
        </div>
      </section>

      {/* Featured Post (Optional, taking the first one) */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          {BLOG_POSTS.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group rounded-[3rem] overflow-hidden bg-cream shadow-2xl aspect-[21/9] flex items-center"
            >
              <div className="absolute inset-0">
                <img 
                  src={BLOG_POSTS[0].image} 
                  alt={BLOG_POSTS[0].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent" />
              </div>
              
              <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16">
                <span className="glass-pill px-4 py-2 rounded-xl text-[10px] font-black text-paper uppercase tracking-widest border border-white/20 backdrop-blur-md inline-block mb-6">
                  {t('Featured Story', 'विशेष कहानी')}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-paper mb-6 leading-tight">
                  {t(BLOG_POSTS[0].title, BLOG_POSTS[0].titleHi)}
                </h2>
                <div className="flex items-center gap-6 text-[10px] font-black text-paper/60 uppercase tracking-[0.2em] mb-8">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-copper" />
                    {BLOG_POSTS[0].date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-copper" />
                    {BLOG_POSTS[0].readTime}
                  </span>
                </div>
                <Link 
                  to={`/blog/${BLOG_POSTS[0].id}`}
                  className="inline-flex items-center gap-3 bg-paper text-charcoal px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple hover:text-paper transition-all group/btn"
                >
                  {t('Read Story', 'कहानी पढ़ें')}
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BLOG_POSTS.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl bg-cream">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="glass-pill px-4 py-2 rounded-xl text-[10px] font-black text-paper uppercase tracking-widest border border-white/20 backdrop-blur-md">
                        {t(post.category, post.categoryHi)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-4 text-[10px] font-black text-charcoal/40 uppercase tracking-widest">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-copper" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-charcoal group-hover:text-purple transition-colors leading-snug">
                      {t(post.title, post.titleHi)}
                    </h3>
                    <p className="text-charcoal/60 text-sm line-clamp-3 leading-relaxed">
                      {t(post.summary, post.summaryHi)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
