import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Target, Trophy } from 'lucide-react';

const CurriculumSection = () => {
  const stages = [
    {
      icon: BookOpen,
      stage: 'Foundation',
      title: 'Market Basics',
      topics: [
        'Market structure & mechanics',
        'Understanding charts & timeframes',
        'Basic technical indicators',
        'Risk management fundamentals',
      ],
      outcome: 'Confident market understanding',
    },
    {
      icon: TrendingUp,
      stage: 'Intermediate',
      title: 'Strategy Development',
      topics: [
        'Advanced technical analysis',
        'Multiple timeframe analysis',
        'Entry & exit strategies',
        'Position sizing & leverage',
      ],
      outcome: 'Profitable trading system',
    },
    {
      icon: Target,
      stage: 'Advanced',
      title: 'Mastery Techniques',
      topics: [
        'Advanced patterns & setups',
        'Market psychology',
        'Algorithmic trading basics',
        'Portfolio management',
      ],
      outcome: 'Consistent profitability',
    },
    {
      icon: Trophy,
      stage: 'Professional',
      title: 'Elite Trader',
      topics: [
        'Scaling your account',
        'Managing emotions',
        'Creating trading systems',
        'Mentoring & teaching',
      ],
      outcome: 'Financial freedom',
    },
  ];

  return (
    <section id="curriculum" className="py-12 md:py-24 bg-gradient-to-b from-[#0F1F3A] to-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
            Your Learning{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Pathway
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            From beginner to professional trader in structured steps
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-[#0066FF] via-[#00FF88] to-[#0066FF] opacity-50"></div>

          <div className="space-y-8 md:space-y-12">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                className="flex gap-4 md:gap-8 items-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center shadow-lg shadow-[#00FF88]/30 ring-4 ring-[#0A1628]">
                    <stage.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88]"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                <div className="flex-1">
                  <motion.div
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8"
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'rgba(0, 255, 136, 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <span className="text-xs md:text-sm font-bold text-[#00FF88] bg-[#00FF88]/10 px-2 md:px-3 py-1 rounded-full">
                        {stage.stage}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4">
                      {stage.title}
                    </h3>
                    <ul className="space-y-1 md:space-y-2 mb-4 md:mb-6">
                      {stage.topics.map((topic) => (
                        <li key={topic} className="text-sm md:text-base text-white/60">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs md:text-sm text-white/80 font-semibold">
                      Outcome: <span className="text-[#00FF88]">{stage.outcome}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
