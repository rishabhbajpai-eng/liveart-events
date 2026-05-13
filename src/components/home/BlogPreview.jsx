import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const BlogPreview = () => {
  const { t } = useLanguage();
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-24 bg-paper relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-copper font-black uppercase tracking-[0.3em] text-xs block mb-4"
            >
              {t('Journal', 'जर्नल')}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold text-charcoal leading-tight"
            >
              {t('Latest from our', 'हमारे नवीनतम')} <br />
              <span className="text-purple italic">{t('Experience Blog', 'एक्सपीरियंस ब्लॉग')}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/blog"
              className="group flex items-center gap-3 text-charcoal font-black uppercase tracking-widest text-sm hover:text-purple transition-colors"
            >
              {t('View All Stories', 'सभी कहानियाँ देखें')}
              <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-purple group-hover:bg-purple group-hover:text-paper transition-all">
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-2xl bg-cream">
                  <motion.img 
                    src={post.image} 
                    alt={post.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Category Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="glass-pill px-4 py-2 rounded-xl text-[10px] font-black text-paper uppercase tracking-widest border border-white/20 backdrop-blur-md">
                      {t(post.category, post.categoryHi)}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-[10px] font-black text-charcoal/40 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-copper" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-copper" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-charcoal group-hover:text-purple transition-colors line-clamp-2 leading-snug">
                    {t(post.title, post.titleHi)}
                  </h3>
                  
                  <p className="text-charcoal/60 text-sm line-clamp-2 leading-relaxed">
                    {t(post.summary, post.summaryHi)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
