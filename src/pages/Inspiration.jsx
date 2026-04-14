import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Share2, ExternalLink, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { STATIONS } from '../constants';

const Inspiration = () => {
  const { t } = useLanguage();
  const [activeBoard, setActiveBoard] = useState('All');

  const boards = [
    { id: 'All', name: t('All Pins', 'सभी पिन्स') },
    { id: 'wedding', name: t('Weddings', 'शादियाँ') },
    { id: 'birthday', name: t('Kids Parties', 'बच्चों की पार्टियाँ') },
    { id: 'corporate', name: t('Corporate', 'कॉर्पोरेट') },
    { id: 'lifestyle', name: t('Lifestyle', 'लाइफस्टाइल') },
  ];

  const filteredPins = activeBoard === 'All' 
    ? STATIONS 
    : STATIONS.filter(s => 
        (activeBoard === 'wedding' && s.popularFor?.includes('wedding')) ||
        (activeBoard === 'birthday' && s.popularFor?.includes('birthday')) ||
        (activeBoard === 'corporate' && s.category === 'entertainment') ||
        (activeBoard === 'lifestyle' && s.category === 'lifestyle')
      );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-snow"
    >
      {/* Pinterest Profile Header */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Camera className="text-snow" size={32} />
            </div>
            <div className="w-full h-full bg-gradient-to-tr from-ocean to-firozi flex items-center justify-center text-snow font-display text-5xl font-black">
              L
            </div>
          </motion.div>
          
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-black text-ink mb-2">Liveart Events</h1>
            <p className="text-ink/40 text-sm font-black tracking-widest uppercase mb-4">@liveartpartyevents</p>
            <p className="max-w-2xl mx-auto text-ink/70 text-lg leading-relaxed mb-8">
              {t(
                "LiveArt Events creates celebrations people don’t just attend—they feel, live, and remember. We design moments that spark joy, connection, and belonging.",
                "LiveArt Events ऐसे उत्सव बनाता है जिन्हें लोग केवल देखते नहीं हैं - वे उन्हें महसूस करते हैं, जीते हैं और याद रखते हैं।"
              )}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
               <div className="flex items-center gap-2">
                  <span className="font-black text-ink">0</span>
                  <span className="text-ink/40 text-sm font-bold uppercase tracking-tighter">Followers</span>
               </div>
               <div className="w-1 h-1 bg-ink/10 rounded-full my-auto"></div>
               <div className="flex items-center gap-2">
                  <span className="font-black text-ink">0</span>
                  <span className="text-ink/40 text-sm font-bold uppercase tracking-tighter">Following</span>
               </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
               <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://pin.it/A9pbFdUQT"
                target="_blank"
                className="bg-red-600 text-snow px-8 py-3 rounded-full font-black text-base flex items-center gap-3 shadow-lg hover:bg-red-700 transition-colors"
               >
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.654 2.569-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.138.892 2.738.1.12.115.223.085.345-.094.393-.309 1.25-.353 1.432-.058.24-.192.29-.442.175-1.644-.763-2.67-3.16-2.67-5.087 0-4.139 3.009-7.938 8.656-7.938 4.544 0 8.071 3.226 8.071 7.546 0 4.513-2.844 8.147-6.804 8.147-1.33 0-2.578-.69-3.003-1.493l-.819 3.11c-.296 1.141-1.099 2.568-1.639 3.429a12.13 12.13 0 003.37.472c6.621 0 11.988-5.366 11.988-11.987C23.992 5.368 18.63 0 12.017 0z"/>
                 </svg>
                 {t('Follow on Pinterest', 'पिंटरेस्ट पर फॉलो करें')}
               </motion.a>
               <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-ink/5 text-ink px-8 py-3 rounded-full font-black text-base flex items-center gap-3 hover:bg-ink/10 transition-colors"
               >
                 <Share2 size={20} />
                 {t('Share', 'शेयर करें')}
               </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Board Navigation */}
      <section className="sticky top-20 z-40 bg-snow/80 backdrop-blur-md border-b-2 border-ink/5">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-center gap-8 py-6">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => setActiveBoard(board.id)}
                className={`relative px-2 py-1 text-sm font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
                  activeBoard === board.id ? 'text-ink' : 'text-ink/40 hover:text-ink'
                }`}
              >
                {board.name}
                {activeBoard === board.id && (
                  <motion.div 
                    layoutId="boardUnderline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-ink"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Feed */}
      <section className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPins.map((pin, index) => (
              <motion.div
                key={pin.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                className="break-inside-avoid relative group cursor-zoom-in"
              >
                <div className="relative overflow-hidden rounded-[32px] bg-snow-dark group">
                  <img 
                    src={pin.image} 
                    alt={pin.name}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-600 text-snow px-6 py-3 rounded-full font-black text-sm shadow-xl"
                      >
                        {t('Save', 'सेव करें')}
                      </motion.button>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-all">
                      <div className="flex items-center justify-between">
                         <div className="p-2 bg-snow/20 backdrop-blur-md rounded-full border border-white/30 text-snow opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink size={16} />
                         </div>
                         <div className="flex gap-2">
                            <div className="p-2 bg-snow/20 backdrop-blur-md rounded-full border border-white/30 text-snow">
                               <Share2 size={16} />
                            </div>
                            <div className="p-2 bg-snow/20 backdrop-blur-md rounded-full border border-white/30 text-snow">
                               <Heart size={16} />
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="mt-3 px-2">
                  <h3 className="text-sm font-black text-ink mb-1 line-clamp-1">{pin.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-ink/10 flex items-center justify-center text-[8px] font-black text-ink">L</div>
                    <span className="text-[10px] text-ink/40 font-bold uppercase tracking-tighter">LiveArt Events</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Load More Stylized */}
      <div className="py-20 text-center">
         <motion.button 
          whileHover={{ scale: 1.05 }}
          className="bg-ink text-snow px-10 py-4 rounded-full font-black text-lg shadow-2xl uppercase tracking-widest"
         >
           {t('Load More Inspiration', 'और अधिक प्रेरणा लोड करें')}
         </motion.button>
      </div>
    </motion.div>
  );
};

export default Inspiration;
