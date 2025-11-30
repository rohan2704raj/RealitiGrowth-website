import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TrustBar = () => {
  const logos = [
    'Bloomberg',
    'Forbes',
    'CNBC',
    'Reuters',
    'Financial Times',
    'Wall Street Journal',
  ];

  return (
    <section className="py-8 md:py-16 bg-[#0F1F3A]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-4 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88] fill-[#00FF88]" />
            ))}
          </div>
          <p className="text-white/60 text-sm md:text-base">Trusted by traders worldwide</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="text-white/40 text-base md:text-xl font-bold whitespace-nowrap hover:text-white/60 transition-colors cursor-pointer flex-shrink-0"
                style={{ minWidth: '180px' }}
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
