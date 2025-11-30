import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Bell, Target, ArrowRight } from 'lucide-react';

const ServicesShowcase = () => {
  const services = [
    {
      icon: GraduationCap,
      title: 'A-Z Stock, Forex & Crypto Mastering Program',
      description:
        'Complete curriculum from market fundamentals to advanced strategies. Learn technical analysis, risk management, and profitable trading systems across all major markets.',
      features: ['120+ Video Lessons', 'Live Trading Sessions', 'Lifetime Access'],
      gradient: 'from-[#0066FF] to-[#0066FF]/50',
      cta: 'Explore Curriculum',
      link: '/trading-mastery',
      originalPrice: '50,000',
      price: '35,000',
      period: 'one-time',
    },
    {
      icon: Bell,
      title: "Copy My Trades Call's Group",
      description:
        'Get real-time trade alerts directly from our expert traders. Join our exclusive community receiving profitable setups, entry/exit points, and risk management guidance.',
      features: ['Real-Time Alerts', 'High Win Rate', 'All Markets Covered'],
      gradient: 'from-[#00FF88] to-[#00FF88]/50',
      cta: 'Join Community',
      link: '/copy-trades',
      originalPrice: '5,000',
      price: '1,999',
      period: 'month',
    },
    {
      icon: Target,
      title: 'RealitiGrowth Indicator',
      description:
        'Proprietary trading indicator giving you edge in the markets. Precision entry signals, trend detection, and automated risk calculations built for modern traders.',
      features: ['Multi-Timeframe', 'Custom Alerts', 'MT4/MT5 Compatible'],
      gradient: 'from-[#0066FF] via-[#7B3FF2] to-[#00FF88]',
      cta: 'Get Indicator',
      link: '/indicator',
      originalPrice: '5,000',
      price: '1,999',
      period: 'month',
    },
  ];

  return (
    <section id="services" className="py-12 md:py-24 bg-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,102,255,0.1)_0%,_transparent_70%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
            Our Premium{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Choose your path to trading excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`}></div>

              <motion.div
                className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 h-full flex flex-col"
                whileHover={{
                  y: -10,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 md:mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>

                <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-white/60 mb-4 md:mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mb-4 md:mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white/50 text-lg md:text-xl line-through">₹{service.originalPrice}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-4xl font-black text-white">₹{service.price}</span>
                    <span className="text-sm md:text-base text-white/60">/{service.period}</span>
                  </div>
                </div>

                <Link to={service.link}>
                  <motion.button
                    className="w-full bg-white/10 hover:bg-white/15 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {service.cta}
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
