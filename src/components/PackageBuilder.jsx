import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { STATIONS, PACKAGES } from '../constants';
import { Check, Plus, Minus, Send, Calculator, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const PackageBuilder = () => {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [guestCount, setGuestCount] = useState(60);
  const [travelDistance, setTravelDistance] = useState(0);

  const totalPrice = useMemo(() => {
    let price = selectedPackage.basePrice;
    
    // Extra stations
    if (selectedStations.length > selectedPackage.stationsCount) {
      price += (selectedStations.length - selectedPackage.stationsCount) * 7000;
    }

    // Extra guests
    if (guestCount > selectedPackage.guestsCount) {
      const extraGuests = guestCount - selectedPackage.guestsCount;
      price += Math.ceil(extraGuests / 25) * 2500;
    }

    // Travel
    if (travelDistance > 20) {
      price += (travelDistance - 20) * 25;
    }

    return price;
  }, [selectedPackage, selectedStations, guestCount, travelDistance]);

  const handleStationToggle = (id) => {
    if (selectedStations.includes(id)) {
      setSelectedStations(selectedStations.filter(s => s !== id));
    } else {
      setSelectedStations([...selectedStations, id]);
    }
  };

  const generateWhatsAppLink = () => {
    const stationsList = selectedStations.map(id => STATIONS.find(s => s.id === id)?.name).join(', ');
    const message = `Hi LiveArt! I'd like to book a package:
- Package: ${selectedPackage.name}
- Stations: ${stationsList || 'None selected'}
- Guests: ${guestCount}
- Travel: ${travelDistance}km
- Estimated Price: ₹${totalPrice}
Please confirm availability!`;
    
    return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="packages" className="py-20 lg:py-32 bg-ink text-snow relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-ocean/20 blur-[80px] lg:blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-firozi/20 blur-[80px] lg:blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-firozi font-black tracking-[0.3em] text-[10px] lg:text-xs uppercase mb-4 block">
              {t('Transparent Pricing', 'पारदर्शी मूल्य निर्धारण')}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display text-snow mb-6">
              {t('Build Your', 'अपनी')} <span className="text-firozi italic">{t('Party', 'पार्टी')}</span>
            </h2>
            <p className="text-snow/60 max-w-2xl mx-auto text-base lg:text-lg">
              {t('Customize every detail of your interactive experience. Watch the price update live.', 'अपने इंटरैक्टिव अनुभव के हर विवरण को कस्टमाइज़ करें। मूल्य अपडेट लाइव देखें।')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Options */}
          <div className="lg:col-span-8 space-y-12 lg:space-y-16">
            {/* Step 1: Packages */}
            <div className="space-y-6 lg:space-y-8">
              <h3 className="text-xl lg:text-3xl font-display flex items-center gap-4">
                <span className="w-8 lg:w-12 h-8 lg:h-12 rounded-full bg-firozi text-ink flex items-center justify-center font-black text-sm lg:text-xl shadow-lg">1</span>
                {t('Choose a Base Package', 'एक बेस पैकेज चुनें')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {PACKAGES.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border-2 text-left transition-all duration-500 ${
                      selectedPackage.id === pkg.id 
                      ? 'border-firozi bg-firozi/10 shadow-[0_20px_40px_rgba(0,206,209,0.15)]' 
                      : 'border-snow/10 hover:border-snow/30 bg-snow/5'
                    }`}
                  >
                    <div className="mb-6">
                      <span className="block text-xl lg:text-2xl font-display mb-2">{t(pkg.name, pkg.nameHi)}</span>
                      <span className="text-firozi font-black text-2xl lg:text-3xl">₹{pkg.basePrice.toLocaleString()}</span>
                    </div>
                    <ul className="space-y-3 text-xs lg:text-sm text-snow/60">
                      <li className="flex items-center gap-3"><Check size={14} className="text-firozi"/> {pkg.stationsCount} {t('Stations included', 'स्टेशन्स शामिल')}</li>
                      <li className="flex items-center gap-3"><Check size={14} className="text-firozi"/> {t('Up to', 'तक')} {pkg.guestsCount} {t('Guests', 'मेहमान')}</li>
                      <li className="flex items-center gap-3"><Check size={14} className="text-firozi"/> {pkg.durationHours} {t('Hours of fun', 'घंटे का मज़ा')}</li>
                    </ul>
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-8 bg-firozi text-ink text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl animate-bounce">
                        {t('MOST POPULAR', 'सबसे लोकप्रिय')}
                      </div>
                    )}
                    {selectedPackage.id === pkg.id && (
                      <motion.div 
                        layoutId="active-pkg"
                        className="absolute inset-0 border-4 border-firozi rounded-[32px] lg:rounded-[40px] pointer-events-none"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 2: Stations */}
            <div className="space-y-6 lg:space-y-8">
              <h3 className="text-xl lg:text-3xl font-display flex items-center gap-4">
                <span className="w-8 lg:w-12 h-8 lg:h-12 rounded-full bg-firozi text-ink flex items-center justify-center font-black text-sm lg:text-xl shadow-lg">2</span>
                {t('Pick Your Stations', 'अपने स्टेशन्स चुनें')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {STATIONS.map((station) => (
                  <motion.button
                    key={station.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStationToggle(station.id)}
                    className={`group relative aspect-square rounded-[24px] lg:rounded-[32px] overflow-hidden border-4 transition-all duration-500 ${
                      selectedStations.includes(station.id)
                      ? 'border-firozi shadow-[0_0_30px_rgba(0,206,209,0.3)]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={station.image} alt={station.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest block leading-tight">{t(station.name, station.nameHi)}</span>
                    </div>
                    {selectedStations.includes(station.id) && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-firozi/20 flex items-center justify-center"
                      >
                        <div className="bg-firozi text-ink p-2 lg:p-3 rounded-full shadow-2xl">
                          <Check size={20} lg:size={24} />
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-snow text-ink p-8 lg:p-10 rounded-[40px] lg:rounded-[56px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] space-y-8 lg:space-y-10 border-t-8 border-firozi"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-ocean">
                  <Calculator size={28} />
                  <h3 className="text-2xl lg:text-3xl font-display">{t('Live Quote', 'लाइव कोट')}</h3>
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-firozi"
                >
                  <Sparkles size={24} />
                </motion.div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-xs lg:text-sm font-black uppercase tracking-widest text-ink/40 mb-4">
                    <span>{t('Guest Count', 'मेहमानों की संख्या')}</span>
                    <span className="text-ocean text-lg">{guestCount}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <button onClick={() => setGuestCount(Math.max(10, guestCount - 10))} className="w-10 lg:w-12 h-10 lg:h-12 bg-ink/5 rounded-full flex items-center justify-center hover:bg-ink/10 transition-colors"><Minus size={16}/></button>
                    <input 
                      type="range" min="10" max="500" step="10" value={guestCount} 
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-ocean"
                    />
                    <button onClick={() => setGuestCount(guestCount + 10)} className="w-10 lg:w-12 h-10 lg:h-12 bg-ink/5 rounded-full flex items-center justify-center hover:bg-ink/10 transition-colors"><Plus size={16}/></button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs lg:text-sm font-black uppercase tracking-widest text-ink/40 mb-4">
                    <span>{t('Travel Distance', 'यात्रा की दूरी')}</span>
                    <span className="text-ocean text-lg">{travelDistance}km</span>
                  </div>
                  <input 
                    type="range" min="0" max="250" value={travelDistance} 
                    onChange={(e) => setTravelDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-ocean"
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-ink/30 font-bold">
                    <span>INDIA</span>
                    <span>OUTSTATION</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 lg:pt-10 border-t-2 border-dashed border-ink/10">
                <div className="flex justify-between items-end mb-8 lg:mb-10">
                  <span className="text-ink/40 font-black uppercase tracking-widest text-xs lg:text-sm">{t('Total Investment', 'कुल निवेश')}</span>
                  <div className="text-right">
                    <motion.span 
                      key={totalPrice}
                      initial={{ scale: 1.5, color: '#0077b6' }}
                      animate={{ scale: 1, color: '#1A1A1A' }}
                      className="block text-5xl lg:text-6xl font-display font-black tracking-tighter"
                    >
                      ₹{totalPrice.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                <motion.a 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href={generateWhatsAppLink()}
                  className="w-full bg-[#25D366] text-white py-5 lg:py-6 rounded-[24px] lg:rounded-[32px] font-black text-lg lg:text-xl flex items-center justify-center gap-4 shadow-2xl shadow-[#25D366]/30"
                >
                  <Send size={24} />
                  {t('Book via WhatsApp', 'व्हाट्सएप के माध्यम से बुक करें')}
                </motion.a>
                <p className="text-[10px] lg:text-xs text-center text-ink/40 mt-6 lg:mt-8 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles size={12} />
                  {t('Instant confirmation • 30% advance', 'त्वरित पुष्टि • 30% अग्रिम')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
