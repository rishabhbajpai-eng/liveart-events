import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-4 text-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Post not found!</h1>
        <Link to="/blog" className="text-teal underline">Back to Blog</Link>
      </div>
    );
  }

  const content = language === 'hi' ? post.fullContentHi : post.fullContent;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 min-h-screen bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-teal transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-slate-600 truncate">{language === 'hi' ? post.titleHi : post.title}</span>
        </nav>

        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-teal font-bold hover:gap-3 transition-all group"
        >
          <ArrowLeft size={20} />
          {t('Back', 'वापस')}
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-black uppercase tracking-widest rounded-full">
              {language === 'hi' ? post.categoryHi : post.category}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-charcoal leading-tight">
            {language === 'hi' ? post.titleHi : post.title}
          </h1>

          <p className="text-xl text-slate-500 italic leading-relaxed border-l-4 border-teal/20 pl-6 mb-10">
            {language === 'hi' ? post.summaryHi : post.summary}
          </p>
        </header>

        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Structured Content with Internal Links */}
        <div 
          className="prose prose-lg max-w-none prose-slate prose-headings:font-display prose-headings:font-bold prose-a:text-teal prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <hr className="my-16 border-slate-100" />

        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-display font-bold mb-4">
            {t('Ready to make your event super-hit?', 'क्या आप अपने इवेंट को सुपर-हिट बनाने के लिए तैयार हैं?')}
          </h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            {t('Contact us today to book these amazing DIY activity stations for your upcoming celebration!', 'अपने आगामी उत्सव के लिए इन अद्भुत DIY गतिविधि स्टेशनों को बुक करने के लिए आज ही हमसे संपर्क करें!')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/stations" 
              className="px-8 py-4 bg-teal text-white font-bold rounded-2xl hover:scale-105 transition-transform"
            >
              {t('Explore All Stations', 'सभी स्टेशन्स देखें')}
            </Link>
            <Link 
              to="/packages" 
              className="px-8 py-4 bg-charcoal text-white font-bold rounded-2xl hover:scale-105 transition-transform"
            >
              {t('Build Your Package', 'अपना पैकेज बनाएं')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
