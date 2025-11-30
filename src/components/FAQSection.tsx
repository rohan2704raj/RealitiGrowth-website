import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do I need prior trading experience?',
      answer:
        'Not at all! Our A-Z program is designed for complete beginners. We start with the absolute basics and progressively build your knowledge to professional level. Many of our most successful students started with zero experience.',
    },
    {
      question: 'How long does it take to become profitable?',
      answer:
        'Results vary by individual, but most students start seeing consistent profits within 3-6 months of dedicated learning and practice. Our structured curriculum and live trading sessions accelerate your learning curve significantly.',
    },
    {
      question: 'What markets can I trade with your system?',
      answer:
        'Our strategies work across all major markets including stocks, forex, cryptocurrencies, and commodities. The technical analysis principles and risk management techniques apply universally.',
    },
    {
      question: 'How much capital do I need to start?',
      answer:
        'You can start practicing with as little as ₹8,000-₹40,000. We teach proper risk management and position sizing so you can grow your account safely. Many students start small and scale up as they gain confidence.',
    },
    {
      question: 'Is the RealitiGrowth Indicator compatible with my platform?',
      answer:
        'Yes! The indicator works with MetaTrader 4 (MT4) and MetaTrader 5 (MT5), the most popular trading platforms worldwide. Installation is simple with our step-by-step guide.',
    },
    {
      question: 'How does the Copy Trades group work?',
      answer:
        'You receive real-time notifications of trade setups from our expert traders, including entry points, stop loss, take profit levels, and risk management guidelines. You maintain full control and can choose which trades to take.',
    },
    {
      question: 'What if I have questions during my learning?',
      answer:
        'All plans include community access where you can ask questions. Professional and Elite plans include direct coaching sessions. We also have responsive email support and regular live Q&A sessions.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer:
        "Absolutely! We offer a 30-day money-back guarantee. If you're not satisfied with the program for any reason within 30 days, we'll refund your investment—no questions asked.",
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-24 bg-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,102,255,0.05)_0%,_transparent_50%)]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Everything you need to know about RealitiGrowth
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl md:rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <button
                className="w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-base md:text-lg font-bold text-white pr-4 md:pr-8">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88] flex-shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 md:w-5 md:h-5 text-white/60 flex-shrink-0" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 md:px-8 pb-4 md:pb-6">
                      <p className="text-sm md:text-base text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 md:mt-12 text-center bg-gradient-to-r from-[#0066FF]/10 to-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl md:rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
            Still Have Questions?
          </h3>
          <p className="text-sm md:text-base text-white/70 mb-4 md:mb-6">
            Our team is here to help you make the best decision for your trading journey.
          </p>
          <motion.a
            href="mailto:hi@realitigrowth.com?subject=Support Request&body=Hello RealitiGrowth Team,%0D%0A%0D%0AI need assistance with:%0D%0A%0D%0AName:%0D%0APhone:%0D%0AQuery:%0D%0A%0D%0AThank you!"
            className="inline-block bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
