import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Users, Clock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    { icon: Users, label: '500+ Students', value: '500+' },
    { icon: TrendingUp, label: '95% Success Rate', value: '95%' },
    { icon: Clock, label: '24/7 Support', value: '24/7' },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldAnimate = !isMobile && !prefersReducedMotion;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] pt-20">
      <div className="hidden md:block absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {shouldAnimate && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="hidden md:block absolute w-2 h-2 bg-[#00FF88] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-0">
        <div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight px-2">
            Master Trading.{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Build Wealth.
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Achieve Financial Freedom.
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            From complete beginner to professional trader - your comprehensive
            journey starts here
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-16 px-4">
            {shouldAnimate ? (
              <>
                <motion.button
                  className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  className="bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border border-white/20"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Courses
                </motion.button>
              </>
            ) : (
              <>
                <button
                  className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg active:scale-95 transition-transform"
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Start Your Journey
                </button>
                <button
                  className="bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border border-white/20 active:scale-95 transition-transform"
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Courses
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto px-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-[#00FF88] mx-auto mb-2 md:mb-3" />
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {shouldAnimate && (
          <motion.div
            className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/40" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
