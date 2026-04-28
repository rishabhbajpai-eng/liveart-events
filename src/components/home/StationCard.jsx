import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { PlayCircle, Clock, Users, BadgeIndianRupee, Tag, Sparkles, CheckCircle2 } from 'lucide-react';

const chipConfig = {
  lifestyle: { label: 'Includes premium materials', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  craft: { label: 'Includes all craft supplies', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  food: { label: 'Fresh ingredients daily', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  beauty: { label: 'Professional artist included', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  wellness: { label: 'Expert therapist included', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  entertainment: { label: 'Interactive experience', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  gaming: { label: 'All equipment provided', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

export const StationCard = ({ station, t, isExpanded, toggleExpand, openVideo, idx }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "0px 0px -100px 0px" });
  const chip = chipConfig[station.category] || { label: 'Premium experience', color: 'bg-gray-50 text-gray-700 border-gray-200' };

  useEffect(() => {
    let interval;
    if (station.gallery && station.gallery.length > 1 && !isExpanded && isInView) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % station.gallery.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [station.gallery, isExpanded, isInView]);

  const displayImage = station.gallery && station.gallery.length > 0 && !isExpanded
    ? station.gallery[currentImageIndex]
    : station.image;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: idx < 8 ? idx * 0.05 : 0 }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group cursor-pointer" onClick={() => toggleExpand(station.id)}>
        <AnimatePresence>
          <motion.img
            key={displayImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            src={displayImage}
            alt={station.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg">
            {station.category}
          </span>
        </div>

        {station.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <button
              onClick={(e) => { e.stopPropagation(); openVideo(station.videoUrl, station.name); }}
              className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 transform hover:scale-105 transition-all shadow-xl"
            >
              <PlayCircle size={18} className="text-primary" />
              {t('Watch Demo', 'डेमो')}
            </button>
          </div>
        )}
      </div>

      <div className="p-5 lg:p-6" onClick={() => toggleExpand(station.id)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight group-hover:text-gold transition-colors">
            {t(station.name, station.nameHi)}
          </h3>
        </div>

        <p className="text-sm lg:text-base text-gray-500 line-clamp-2 mb-4">
          {t(station.description, station.descriptionHi)}
        </p>

        <div className="flex items-center gap-4 py-3 border-y border-gray-100 mb-4 bg-gray-50/50 -mx-5 px-5 lg:-mx-6 lg:px-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gold" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">2-4 hrs</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gold" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">30+ Guests</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <BadgeIndianRupee size={16} className="text-gold" />
            <span className="text-xs lg:text-sm font-semibold text-gray-700">Priced per guest</span>
          </div>
        </div>

        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${chip.color}`}>
            <Tag size={12} />
            {t(chip.label, chip.label)}
          </span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-black uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                  <Sparkles size={16} />
                  {t("What's Included", 'क्या शामिल है')}
                </h4>
                <ul className="space-y-3 mb-6">
                  {[
                    t('Premium raw materials', 'प्रीमियम कच्चा माल'),
                    t('Expert facilitator', 'विशेषज्ञ सूत्रधार'),
                    t('Custom packaging', 'कस्टम पैकेजिंग'),
                    t('Setup & Cleanup', 'सेटअप और सफाई')
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {station.gallery && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('Gallery', 'गैलरी')}</h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
                      {station.gallery.map((img, imgIdx) => (
                        <div key={imgIdx} className="min-w-[120px] h-[90px] rounded-2xl overflow-hidden shrink-0 snap-start bg-gray-100 shadow-sm">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                   <button 
                     onClick={(e) => { e.stopPropagation(); toggleExpand(null); }}
                     className="text-gray-500 hover:text-gray-900 font-bold text-sm tracking-wide transition-colors"
                   >
                     {t('Close Details', 'विवरण बंद करें')}
                   </button>
                   {station.videoUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openVideo(station.videoUrl, station.name); }}
                      className="text-gold font-bold flex items-center gap-1.5 hover:text-gold/80 transition-colors"
                    >
                      <PlayCircle size={18} />
                      {t('Demo', 'डेमो')}
                    </button>
                   )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
