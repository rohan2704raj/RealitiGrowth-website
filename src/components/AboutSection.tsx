import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  Users,
  Globe,
  Target,
  Award,
  Star,
  ArrowRight,
} from 'lucide-react';

const AboutSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    { icon: Calendar, value: '8+', label: 'Years Trading Experience' },
    { icon: Users, value: '500+', label: 'Students Trained' },
    { icon: Globe, value: '15+', label: 'Markets Actively Traded' },
    { icon: Target, value: '85%+', label: 'Win Rate*' },
  ];

  const expertise = [
    'Stock Market Analysis',
    'Forex Trading',
    'Cryptocurrency Trading',
    'Technical Analysis Expert',
    'Risk Management Specialist',
    'Trading Psychology',
    'Market Structure',
    'Price Action Trading',
  ];

  const timeline = [
    { year: '2016', event: 'Started Trading Journey' },
    { year: '2019', event: 'First Consistently Profitable Year' },
    { year: '2021', event: 'Founded RealitiGrowth' },
    { year: '2025', event: 'Serving Global Community' },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const shouldAnimate = !isMobile && !prefersReducedMotion;

  // Component wrapper for conditional rendering
  const Wrapper = ({ children, animate = false }: { children: React.ReactNode; animate?: boolean }) => {
    if (animate && shouldAnimate) {
      return children;
    }
    return <div>{children}</div>;
  };

  return (
    <section id="about" className="relative py-12 md:py-20 bg-[#0A1628] overflow-hidden">
      {/* Background effects - hidden on mobile */}
      <div className="hidden md:block absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066FF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="hidden md:block absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="text-[#0066FF] text-sm font-bold tracking-wider mb-3">
            MEET YOUR MENTOR
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
            Learn From a Proven{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Trading Expert
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            8+ years of market mastery translated into actionable education
          </p>
        </div>

        <div className="flex flex-col items-center max-w-[1100px] mx-auto">
          <div className="relative w-full max-w-[500px] mx-auto mb-8 md:mb-12">
            <div className="relative group">
              {/* Glow effect - reduced on mobile */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden">
                <div className="aspect-[4/5] rounded-2xl md:rounded-3xl relative overflow-hidden">
                  <img
                    src="/IMG_3786.JPG"
                    alt="Dheemanth S - Founder & Lead Instructor"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/30 to-[#0A1628]/20" />

                  {/* Floating badges - simplified on mobile */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/10 border border-[#0066FF]/30 rounded-full px-3 py-1.5 md:px-4 md:py-2">
                    <div className="text-white font-bold text-xs md:text-sm whitespace-nowrap">8+ Years</div>
                  </div>

                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/10 border border-[#00FF88]/30 rounded-full px-3 py-1.5 md:px-4 md:py-2">
                    <div className="text-white font-bold text-xs md:text-sm whitespace-nowrap">500+ Students</div>
                  </div>

                  {/* Award badge - desktop only */}
                  {shouldAnimate && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -right-3 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-full p-3"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    >
                      <Award className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Floating orbs - desktop only */}
              {shouldAnimate && (
                <>
                  <motion.div
                    className="hidden md:block absolute -bottom-6 -left-6 w-32 h-32 bg-[#0066FF]/20 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="hidden md:block absolute -top-6 -right-6 w-32 h-32 bg-[#00FF88]/20 rounded-full blur-2xl"
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </>
              )}
            </div>

            <div className="text-center mt-5 md:mt-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Dheemanth S</h2>
              <p className="text-[#00FF88] font-semibold text-base md:text-lg">Founder & Lead Instructor</p>
            </div>
          </div>

          <div className="w-full max-w-[900px] mx-auto space-y-6 md:space-y-8 lg:space-y-10">
            <div>
              <p className="text-sm md:text-lg leading-relaxed text-white/90 px-4">
                Meet <span className="text-[#00FF88] font-bold">Dheemanth S</span>, the visionary founder of RealitiGrowth and your guide to trading mastery. With over 8 years of intensive trading experience across global markets, Dheemanth has transformed from an ambitious beginner into a seasoned professional—and now, he's dedicated to shortening that journey for you.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 md:h-6 bg-gradient-to-b from-[#0066FF] to-[#00FF88]" />
                <h3 className="text-base md:text-lg font-bold text-white">THE JOURNEY</h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                Starting his trading career in 2016, Dheemanth immersed himself in the complex world of financial markets. Through countless hours of chart analysis, strategy testing, and real-money trading across stocks, forex, and cryptocurrencies, he developed a systematic approach that consistently delivers results. His breakthrough came not from following conventional wisdom, but from combining rigorous technical analysis with psychological discipline—a methodology he now teaches to thousands.
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-white font-bold mb-3 md:mb-4 text-xs md:text-sm tracking-wider">EXPERTISE</h4>
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                {expertise.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-xs md:text-[13px] text-white/80 hover:bg-white/10 hover:border-[#00FF88]/30 transition-colors cursor-default whitespace-nowrap"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-[700px] mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#00FF88]/30 transition-colors aspect-square flex flex-col items-center justify-center text-center"
                >
                  <stat.icon className="w-6 md:w-7 h-6 md:h-7 text-[#00FF88] mb-2 md:mb-3" />
                  <div className="text-xl md:text-3xl font-black bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-[10px] md:text-[13px] leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#0066FF]/10 to-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl md:rounded-2xl p-4 md:p-5">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-1 h-full bg-gradient-to-b from-[#0066FF] to-[#00FF88] rounded-full flex-shrink-0" />
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">TRADING PHILOSOPHY</h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/80 italic">
                    "Trading isn't about luck—it's about preparation, discipline, and continuous learning. I've been where you are: confused by indicators, overwhelmed by market noise, and frustrated by inconsistent results. RealitiGrowth exists because I believe everyone deserves access to professional-grade trading education without the gatekeeping or complexity."
                  </p>
                  <div className="text-[#00FF88] font-bold mt-3 text-sm md:text-base">— Dheemanth S</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 md:w-6 h-5 md:h-6 text-[#00FF88]" />
                <h3 className="text-base md:text-lg font-bold text-white">THE REALTIGROWTH MISSION</h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                Dheemanth founded RealitiGrowth with a singular mission: to democratize professional trading education. Every course, indicator, and community resource is built on real-world experience and battle-tested strategies. This isn't theory from textbooks—it's practical wisdom from someone who trades daily and understands the emotional and technical challenges you face.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg flex items-center justify-center gap-2 group min-h-[48px] hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all active:scale-95"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Learn Dheemanth's Strategies
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-12 w-full max-w-[1100px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-6">
            <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-5 text-center">JOURNEY TIMELINE</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative">
                  <div className="text-center">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center text-white font-bold text-base md:text-lg mx-auto mb-2 md:mb-3">
                      {index + 1}
                    </div>
                    <div className="text-[#00FF88] font-bold mb-1 md:mb-2 text-sm md:text-base">{item.year}</div>
                    <div className="text-white/70 text-xs md:text-sm leading-tight">{item.event}</div>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#0066FF] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 w-full max-w-[1100px] mx-auto bg-gradient-to-r from-[#0066FF]/20 to-[#00FF88]/20 border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <div className="text-white/80 text-sm md:text-base text-center sm:text-left">As Trusted By Traders Worldwide</div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] border-2 border-[#0A1628] flex items-center justify-center text-white text-[10px] md:text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-white/10 border-2 border-[#0A1628] flex items-center justify-center text-white text-[10px] md:text-xs font-bold">
                  +9.8K
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 md:w-5 h-4 md:h-5 text-[#00FF88] fill-[#00FF88]" />
                ))}
              </div>
              <div className="text-white/80 text-xs md:text-sm text-center sm:text-left">4.9/5 from 2,847 reviews</div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating particles - desktop only */}
      {shouldAnimate && (
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00FF88]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 text-center text-white/40 text-xs pb-4 px-2">
        *Historical performance based on documented trades
      </div>
    </section>
  );
};

export default AboutSection;
