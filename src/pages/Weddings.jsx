import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionCTA } from '../components/HomeSections';

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
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[1.1]" />
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

export default function Weddings() {
  const { t } = useLanguage();

  const sections = [
    {
      title: "Haldi Ceremony",
      description: "Infuse your Haldi with laughter, vibrant colors, and pure joy. We transform the traditional rituals into an interactive playground where families bond and memories are painted in yellow.",
      image: "https://images.unsplash.com/photo-1583089892943-e02e5ee6dc24?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Phoolon ki Holi", desc: "A mesmerizing flower petal shower experience with interactive games." },
        { name: "Family Relay Games", desc: "Light-hearted competitions that bring both families together in fits of laughter." },
        { name: "Interactive Gifting", desc: "Customized favors and live engagement stations for all age groups." }
      ]
    },
    {
      title: "Mehndi Function",
      description: "An afternoon of artistry, music, and playful banter. While the henna sets, we keep your guests entertained with engaging activities that keep the energy high and smiles wide.",
      image: "https://images.unsplash.com/photo-1581451512401-4966052f55fb?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Live DIY Stations", desc: "Guests can create their own floral jewelry or customized keepsakes." },
        { name: "Musical Tambola", desc: "A musical twist to the classic game, perfect for engaging large groups." },
        { name: "Tarot & Astrologer", desc: "Mystical experiences that add a touch of magic to your afternoon." }
      ]
    },
    {
      title: "Sangeet Night",
      description: "Elevate your Sangeet from a simple dance night to an epic celebration. We blend high-energy hosting with interactive moments that make every guest feel like a star.",
      image: "https://images.unsplash.com/photo-1543364195-077a16c30ff3?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Couple's Trivia", desc: "A hilarious and heartwarming game to test how well families know the couple." },
        { name: "Interactive Dance Challenges", desc: "Spontaneous dance-offs that get even the shyest guests on the floor." },
        { name: "Live Voting & Polls", desc: "Engage the audience during performances with live interactive elements." }
      ]
    },
    {
      title: "Wedding Day",
      description: "The grand finale deserves magical moments. From the Baraat welcome to the Phera engagements, we weave subtle, beautiful interactions that add depth to your sacred day.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1000",
      activities: [
        { name: "Baraat Engagement", desc: "High-energy games to welcome the groom's side with warmth and fun." },
        { name: "Milni Twists", desc: "Adding interactive and humorous elements to the traditional Milni ceremony." },
        { name: "Joota Chupai Games", desc: "Structured, fun-filled negotiation games for the classic shoe-hiding tradition." }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-copper/10 border border-copper/20 rounded-full text-copper text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {t('Curated Wedding Experiences', 'क्यूरेटेड वेडिंग अनुभव')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-charcoal mb-6 leading-tight"
          >
            A Journey of Unforgettable <span className="text-copper italic">Moments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-charcoal/60 leading-relaxed font-light"
          >
            We don&apos;t just provide services; we craft experiences. Discover how we can transform each ceremony of your wedding into an interactive, joy-filled celebration.
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
