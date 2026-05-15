import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ArrowRight, Calendar, Clock, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SafeImage from '../components/shared/SafeImage';

const BlogDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-6 text-charcoal">Story Not Found</h1>
          <Link to="/blog" className="text-purple font-black uppercase tracking-widest text-sm">Back to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <Helmet>
        <title>{t(`${post.title} | LiveArt Events Journal`, `${post.titleHi} | लाइवआर्ट इवेंट्स जर्नल`)}</title>
        <meta name="description" content={t(post.summary, post.summaryHi)} />
        <meta property="og:title" content={t(post.title, post.titleHi)} />
        <meta property="og:description" content={t(post.summary, post.summaryHi)} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://liveartevents.in/blog/${post.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": "LiveArt Events"
            },
            "description": post.summary
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://liveartevents.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Journal",
                "item": "https://liveartevents.in/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://liveartevents.in/blog/${post.id}`
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Article Hero */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <SafeImage 
          src={post.image} 
          alt={post.title}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-24 px-4">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-paper/80 hover:text-paper font-black uppercase tracking-widest text-[10px] mb-8 transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                {t('Back to Journal', 'वापस जर्नल पर')}
              </Link>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="glass-pill px-4 py-2 rounded-xl text-[10px] font-black text-paper uppercase tracking-widest border border-white/20 backdrop-blur-md">
                  {t(post.category, post.categoryHi)}
                </span>
                <div className="flex items-center gap-4 text-[10px] font-black text-paper/60 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-copper" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-copper" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-paper leading-[1.1]">
                {t(post.title, post.titleHi)}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="prose prose-xl prose-charcoal prose-headings:font-display prose-headings:font-bold prose-p:text-charcoal/70 prose-p:leading-relaxed prose-img:rounded-[2rem] prose-a:text-purple prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: t(post.fullContent, post.fullContentHi) }}
          />

          {/* Share & Footer */}
          <div className="mt-20 pt-10 border-t border-charcoal/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-charcoal/40">{t('Share this story', 'यह कहानी साझा करें')}</span>
              <div className="flex gap-4">
                {[Facebook, Twitter, LinkIcon].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/60 hover:bg-purple hover:text-paper hover:border-purple transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
            
            <Link 
              to="/blog"
              className="text-xs font-black uppercase tracking-widest text-charcoal hover:text-purple transition-colors flex items-center gap-2"
            >
              {t('Next Story', 'अगली कहानी')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-24 bg-cream/30 border-t border-charcoal/5 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-charcoal mb-12 text-center">{t('You might also like', 'आपको यह भी पसंद आ सकता है')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.filter(p => p.id !== id).slice(0, 3).map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="group">
                <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                  <SafeImage src={p.image} alt={p.title} className="w-full h-full transition-transform group-hover:scale-105" />
                </div>
                <h4 className="text-xl font-display font-bold text-charcoal group-hover:text-purple transition-colors line-clamp-2">
                  {t(p.title, p.titleHi)}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
