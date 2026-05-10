import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionCTA } from '../components/HomeSections';
import { Users, Heart, Sparkles, Trophy } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

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
            {t('Our Story', 'हमारी कहानी')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-charcoal mb-6 leading-tight"
          >
            Crafting Unforgettable <span className="text-copper italic">Experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-charcoal/60 leading-relaxed font-light"
          >
            We are India&apos;s premier experience design collective, dedicated to transforming personal milestones into deeply engaging, joy-filled celebrations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[40px] overflow-hidden shadow-2xl relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" 
              alt="About LiveArt" 
              className="w-full h-full object-cover saturate-[1.1]" 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-display text-charcoal">The Philosophy of <span className="text-copper italic">Play</span></h2>
            <p className="text-charcoal/80 text-lg leading-relaxed">
              We believe that celebrations shouldn&apos;t just be attended; they should be experienced. The magic of an event doesn&apos;t lie in the decor alone, but in the laughter shared, the connections made, and the unexpected moments of joy.
            </p>
            <p className="text-charcoal/80 text-lg leading-relaxed">
              At LiveArt Events, we specialize in human connection. Through interactive games, curated stalls, and expert hosting, we break the ice and bring families and friends together like never before.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-copper/10">
              <div className="flex flex-col gap-2">
                <Users className="w-8 h-8 text-teal" />
                <h4 className="text-2xl font-display font-bold text-charcoal">500+</h4>
                <p className="text-sm font-black uppercase tracking-widest text-charcoal/40">Events Hosted</p>
              </div>
              <div className="flex flex-col gap-2">
                <Heart className="w-8 h-8 text-teal" />
                <h4 className="text-2xl font-display font-bold text-charcoal">25k+</h4>
                <p className="text-sm font-black uppercase tracking-widest text-charcoal/40">Happy Guests</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="bg-charcoal text-paper rounded-[40px] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display mb-4">Our Core Values</h2>
            <p className="text-paper/60 text-lg max-w-2xl mx-auto">What drives us to deliver excellence at every event.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              { icon: Sparkles, title: "Innovation in Joy", desc: "We constantly invent new ways to engage, ensuring your event stands out from the traditional norms." },
              { icon: Heart, title: "Inclusive Connection", desc: "Our experiences are designed to bring everyone together, from the youngest children to the oldest grandparents." },
              { icon: Trophy, title: "Premium Execution", desc: "Flawless delivery, professional hosts, and high-quality materials guarantee a luxurious experience." }
            ].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-display text-white">{value.title}</h3>
                <p className="text-paper/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="mt-20">
        <SectionCTA />
      </div>
    </motion.div>
  );
}
