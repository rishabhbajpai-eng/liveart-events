import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { OCCASIONS, STATIONS } from '../../constants';
import { StationCard } from './StationCard';

export const StationCatalogue = ({ selectedOccasion }) => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [expandedId, setExpandedId] = useState(null);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-scroll to station if ID is in URL
  useEffect(() => {
    const stationId = searchParams.get('id');
    if (stationId) {
      setTimeout(() => {
        const element = document.getElementById(stationId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setExpandedId(stationId);
        }
      }, 800); // Wait for the page/catalogue to render
    }
  }, [searchParams]);

  const occasionName = OCCASIONS.find(o => o.id === selectedOccasion)?.name || '';
  const occasionNameHi = OCCASIONS.find(o => o.id === selectedOccasion)?.nameHi || '';

  // Derive unique categories from all stations
  const categories = ['all', ...Array.from(new Set(STATIONS.map(s => s.category)))];

  // Show all stations by default; filter by occasion if set, then by selected category
  const occasionFiltered = selectedOccasion
    ? STATIONS.filter(s => s.popularFor?.includes(selectedOccasion))
    : STATIONS;

  const filteredStations = (activeCategory === 'all'
    ? occasionFiltered
    : occasionFiltered.filter(s => s.category === activeCategory)
  ).filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || (s.nameHi && s.nameHi.includes(searchQuery));
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openVideo = (url, title) => {
    setVideoModal({ isOpen: true, url, title });
  };

  return (
    <section id="stations" className="bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16">
        {/* Header - Zomato Style App Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                {occasionName
                  ? t(`${occasionName} Stations`, `${occasionNameHi} स्टेशन्स`)
                  : t('Activity Stations', 'गतिविधि स्टेशन्स')}
              </h2>
              <p className="text-gray-500 font-medium mt-1">
                {filteredStations.length} {t('experiences available', 'अनुभव उपलब्ध')}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setExpandedId(null); }}
              placeholder={t('Search activities...', 'गतिविधि खोजें...')}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter Pill Tabs (Zomato Style Horizons) */}
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gold hover:text-primary hover:bg-gold/5'
                }`}
              >
                {cat === 'all' ? t('ALL', 'सभी') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card List - Masonry grid layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredStations.map((station, idx) => (
              <div key={station.id} className="break-inside-avoid shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-none bg-cream border border-copper/10">
                <StationCard
                  station={station}
                  t={t}
                  isExpanded={expandedId === station.id}
                  toggleExpand={toggleExpand}
                  openVideo={openVideo}
                  idx={idx}
                />
              </div>
            ))}
          </AnimatePresence>

          {filteredStations.length === 0 && (
            <div className="col-span-full py-20 text-center break-inside-avoid">
               <div className="text-6xl mb-4 opacity-50">🖼️</div>
               <h3 className="text-xl font-display font-medium text-gray-900 mb-2">{t('No matching experiences found', 'कोई मेल खाने वाला अनुभव नहीं मिला')}</h3>
               <p className="text-gray-500 font-light">{t('Try adjusting your search or filters.', 'अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
          >
            <div 
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-md"
              onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
            ></div>
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-5 lg:p-6 flex justify-between items-center border-b border-gray-100">
                <h3 className="text-xl lg:text-2xl font-black text-gray-900">{t(videoModal.title, videoModal.title)} - {t('Demo', 'डेमो')}</h3>
                <button 
                  onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                  className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <video 
                  src={videoModal.url} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-teal-600 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-semibold text-center sm:text-left">
                  {t('Love this station? Add it to your custom package!', 'यह स्टेशन पसंद आया? इसे अपने कस्टम पैकेज में जोड़ें!')}
                </p>
                <a 
                  href="#packages" 
                  onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                  className="bg-white text-primary px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
                >
                  {t('Build Package', 'पैकेज बनाएं')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
