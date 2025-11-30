import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Amit Verma',
      role: 'Former Accountant',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: "RealitiGrowth transformed my life. I went from losing money consistently to making ₹12.5L/month in just 6 months. The structured curriculum and live trading sessions were game-changers.",
      result: '+₹72.5L in 8 months',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      role: 'Nurse turned Trader',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: "I started with zero trading knowledge. The A-Z program broke everything down perfectly. Now I'm trading part-time and earning more than my nursing salary.",
      result: '+₹43.5L in 5 months',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: "The RealitiGrowth Indicator is incredible. Combined with the Copy Trades group, I've achieved consistent 80% win rate. Best investment I've ever made.",
      result: '+₹1.03Cr in 1 year',
      rating: 5,
    },
    {
      name: 'Kavita Nair',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: "The community support is unmatched. Real-time trade alerts helped me learn faster and avoid costly mistakes. I'm now consistently profitable.",
      result: '+₹31.7L in 4 months',
      rating: 5,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="results" className="py-12 md:py-24 bg-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,255,136,0.05)_0%,_transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
            Real Results from{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Real Traders
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Join thousands who've transformed their financial future
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-16">
          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#00FF88]"
                    />
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm md:text-base text-white/60">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88] fill-[#00FF88]" />
                    ))}
                  </div>

                  <p className="text-sm md:text-lg text-white/80 mb-4 md:mb-6 flex-grow italic">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-lg md:rounded-xl p-3 md:p-4 flex items-center justify-between">
                    <span className="text-sm md:text-base text-white/80">Total Profit:</span>
                    <div className="flex items-center gap-1 md:gap-2">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88]" />
                      <span className="text-xl md:text-2xl font-black text-[#00FF88]">
                        {testimonials[currentIndex].result}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <motion.button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              {[
                { label: 'Average ROI', value: '287%' },
                { label: 'Success Rate', value: '95%' },
                { label: 'Active Students', value: '500+' },
                { label: 'Total Profits', value: '₹150Cr+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-center"
                  whileHover={{ y: -5, borderColor: 'rgba(0, 255, 136, 0.3)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-gradient-to-br from-[#0066FF]/10 to-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl md:rounded-2xl p-6 md:p-8"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Start Your Success Story
              </h3>
              <p className="text-sm md:text-base text-white/70 mb-4 md:mb-6">
                Join our community of successful traders and transform your financial future today.
              </p>
              <motion.button
                className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
