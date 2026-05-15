import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionCTA } from '../components/HomeSections';
import { Helmet } from 'react-helmet-async';
import SafeImage from '../components/shared/SafeImage';

const OccasionSection = ({ title, description, activities, image, reverse }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center py-20 border-b border-copper/10`}>
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 aspect-square lg:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl relative group"
      >
        <SafeImage src={image} alt={title} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-paper font-display text-4xl">{title}</div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 flex flex-col gap-6"
      >
        <p className="text-xl text-charcoal/80 font-light leading-relaxed">{description}</p>
        <div className="bg-cream/50 p-8 rounded-3xl border border-copper/20">
          <h4 className="text-copper font-black text-sm uppercase tracking-widest mb-6">You can enjoy these activities during this function</h4>
          <ul className="space-y-4">
            {activities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="text-teal text-xl">✦</span>
                <div>
                  <h5 className="font-bold text-charcoal text-lg">{item.name}</h5>
                  <p className="text-charcoal/60 text-sm mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default function Birthdays() {
  const { t } = useLanguage();

  const sections = [
    {
      title: "Kids Birthday",
      description: "Step into a world of imagination and wonder. We design enchanting experiences that captivate children's minds and keep them joyfully engaged from start to finish.",
      image: "https://images.unsplash.com/photo-1530103862676-de389de4ada8?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Immersive Treasure Hunts", desc: "Interactive storytelling adventures that turn the venue into a magical quest." },
        { name: "Creative Art Stations", desc: "Guided craft activities where kids can create and take home their own masterpieces." },
        { name: "High-Energy Group Games", desc: "Inclusive and fun physical games led by professional hosts to burn off that party energy." }
      ]
    },
    {
      title: "Adult Birthday",
      description: "Sophisticated, hilarious, and deeply memorable. Whether it's a 30th, 40th, or 50th milestone, we bring tailored experiences that break the ice and create lasting memories among friends.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Roast & Toast Hosting", desc: "A perfectly balanced comedic hosting experience celebrating the birthday star." },
        { name: "Interactive Mixology", desc: "Engaging cocktail or mocktail making sessions with professional flair." },
        { name: "Life-Size Board Games", desc: "Giant, interactive versions of classic games for competitive, light-hearted fun." }
      ]
    },
    {
      title: "Theme-Based Activities",
      description: "Your vision, brought to life. We curate immersive activities that perfectly align with your chosen theme, transporting your guests to a different world.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Thematic Escape Rooms", desc: "Customized puzzle experiences built right into your venue." },
        { name: "Character Interactivity", desc: "Professional actors engaging guests in theme-appropriate personas." },
        { name: "Immersive DIY Counters", desc: "Activities like potion making, wand crafting, or retro arcade tournaments depending on the theme." }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-paper min-h-screen pt-32 pb-20"
    >
      <Helmet>
        <title>{t('Interactive Birthday Party Entertainment & Activities | LiveArt Events', 'इंटरएक्टिव बर्थडे पार्टी एंटरटेनमेंट और गतिविधियां | लाइवआर्ट इवेंट्स')}</title>
        <meta name="description" content={t('Unique birthday experiences for kids and adults. Immersive treasure hunts, creative art stations, and thematic interactive fun for birthdays in India.', 'बच्चों और वयस्कों के लिए अद्वितीय जन्मदिन के अनुभव। भारत में जन्मदिन के लिए इमर्सिव ट्रेजर हंट, रचनात्मक कला स्टेशन और विषय-आधारित इंटरैक्टिव मस्ती।')} />
        <link rel="canonical" href="https://liveartevents.in/birthdays" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-copper/10 border border-copper/20 rounded-full text-copper text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {t('Curated Birthday Experiences', 'क्यूरेटेड जन्मदिन अनुभव')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-charcoal mb-6 leading-tight"
          >
            Celebrate Life&apos;s <span className="text-copper italic">Milestones</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-charcoal/60 leading-relaxed font-light"
          >
            From magical moments for kids to sophisticated fun for adults, we design birthday experiences that prioritize engagement, connection, and pure joy.
          </motion.p>
        </div>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <OccasionSection key={idx} {...section} reverse={idx % 2 !== 0} />
          ))}
        </div>
      </div>
      <SectionCTA />
    </motion.div>
  );
}
