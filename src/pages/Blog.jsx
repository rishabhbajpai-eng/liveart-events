import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SafeImage from '../components/shared/SafeImage';

const Blog = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', en: 'All Stories', hi: 'सभी कहानियाँ' },
    { id: 'Wedding', en: 'Weddings', hi: 'शादियाँ' },
    { id: 'Wedding Guide', en: 'Guides', hi: 'गाइड' },
    { id: 'Birthday', en: 'Birthdays', hi: 'जन्मदिन' }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory || post.id.includes(activeCategory.toLowerCase()));

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="pt-32 pb-24 bg-paper min-h-screen">
      <Helmet>
        <title>{t('Journal & Insights | LiveArt Events', 'जर्नल और अंतर्दृष्टि | लाइवआर्ट इवेंट्स')}</title>
        <meta name="description" content={t('Exploring the art of hospitality, the science of memories, and the future of celebration in modern India.', 'आधुनिक भारत में आतिथ्य की कला, यादों के विज्ञान और उत्सव के भविष्य की खोज।')} />
        <link rel="canonical" href="https://liveartevents.in/blog" />
      </Helmet>

      {/* Hero Section */}
      <section className="px-4 mb-12">
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
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-purple text-paper shadow-xl shadow-purple/20 translate-y-[-2px]' 
                    : 'bg-cream text-charcoal/40 hover:text-charcoal hover:bg-paper border border-charcoal/5'
                }`}
              >
                {t(cat.en, cat.hi)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredPosts.length > 0 ? (
                <>
                  {/* Featured Post */}
                  {featuredPost && activeCategory === 'All' && (
                    <section className="mb-24">
                      <Link to={`/blog/${featuredPost.id}`} className="group">
                        <div className="relative rounded-[3rem] overflow-hidden bg-cream shadow-2xl aspect-[21/9] flex items-center">
                          <div className="absolute inset-0">
                            <SafeImage 
                              src={featuredPost.image} 
                              alt={featuredPost.title}
                              className="w-full h-full transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent" />
                          </div>
                          
                          <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16">
                            <span className="glass-pill px-4 py-2 rounded-xl text-[10px] font-black text-paper uppercase tracking-widest border border-white/20 backdrop-blur-md inline-block mb-6">
                              {t('Featured Story', 'विशेष कहानी')}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-paper mb-6 leading-tight">
                              {t(featuredPost.title, featuredPost.titleHi)}
                            </h2>
                            <div className="flex items-center gap-6 text-[10px] font-black text-paper/60 uppercase tracking-[0.2em] mb-8">
                              <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-copper" />
                                {featuredPost.date}
                              </span>
                              <span className="flex items-center gap-2">
                                <Clock size={16} className="text-copper" />
                                {featuredPost.readTime}
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-3 bg-paper text-charcoal px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs group-hover:bg-purple group-hover:text-paper transition-all">
                              {t('Read Story', 'कहानी पढ़ें')}
                              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </section>
                  )}

                  {/* Grid Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {(activeCategory === 'All' ? remainingPosts : filteredPosts).map((post, index) => (
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
                            <SafeImage 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full transition-transform duration-700 group-hover:scale-110"
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
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-8">
                    <Filter className="text-charcoal/20" size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-4">
                    {t('No stories found in this category', 'इस श्रेणी में कोई कहानी नहीं मिली')}
                  </h3>
                  <p className="text-charcoal/40 font-black uppercase tracking-[0.2em] text-xs">
                    {t('Try exploring our other stories', 'हमारी अन्य कहानियों को देखने का प्रयास करें')}
                  </p>
                  <button 
                    onClick={() => setActiveCategory('All')}
                    className="mt-8 text-purple font-black uppercase tracking-widest text-[10px] border-b border-purple/20 pb-2"
                  >
                    {t('Show all stories', 'सभी कहानियाँ दिखाएँ')}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Blog;
