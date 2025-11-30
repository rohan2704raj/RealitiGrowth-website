import { motion } from 'framer-motion';
import { Rocket, Shield, TrendingUp } from 'lucide-react';

const FinalCTA = () => {
  const benefits = [
    {
      icon: Rocket,
      title: 'Start Fast',
      description: 'Immediate access to all course materials',
    },
    {
      icon: Shield,
      title: 'Risk-Free',
      description: '30-day money-back guarantee',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: '95% student success rate',
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-[#0F1F3A] via-[#0A1628] to-[#0F1F3A] relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/20 via-transparent to-[#00FF88]/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 px-4">
            Ready to Transform{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Your Trading?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-white/70 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            Join 500+ successful traders who've taken control of their financial future
          </p>

          <motion.button
            className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-base md:text-xl mb-4 md:mb-6"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px rgba(0, 255, 136, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Start Your Journey Now
          </motion.button>

          <p className="text-white/60 text-xs md:text-sm">
            ⚡ Special offer: Get ₹16,700 off with code GROWTH200
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(0, 255, 136, 0.3)',
              }}
            >
              <motion.div
                className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <benefit.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm md:text-base text-white/60">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 md:mt-16 text-center max-w-3xl mx-auto bg-gradient-to-r from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/20 rounded-xl md:rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#00FF88]" />
            <h4 className="text-lg md:text-xl font-bold text-white">Risk-Free Guarantee</h4>
          </div>
          <p className="text-sm md:text-base text-white/70">
            Try RealitiGrowth for 30 days. If you're not completely satisfied, we'll refund
            100% of your investment. No questions asked. Your success is our priority.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
