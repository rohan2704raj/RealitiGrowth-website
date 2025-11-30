import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    'Losing money on bad trades?',
    'Overwhelmed by market complexity?',
    'No clear trading strategy?',
    'Emotional decision making?',
  ];

  const solutions = [
    'Proven strategies with 95% win rate',
    'Step-by-step structured learning',
    'Clear, profitable systems',
    'Disciplined, rule-based approach',
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
            Stop Struggling.{' '}
            <span className="text-[#00FF88]">Start Winning.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Transform your trading journey with proven education
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00FF88] to-transparent hidden md:block"></div>

          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white/80 mb-4 md:mb-8">
              Common Pain Points
            </h3>
            {problems.map((problem, index) => (
              <motion.div
                key={problem}
                className="flex items-start gap-3 md:gap-4 bg-red-500/5 border border-red-500/20 rounded-lg md:rounded-xl p-4 md:p-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -5, backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
              >
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-sm md:text-lg text-white/80">{problem}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white/80 mb-4 md:mb-8">
              RealitiGrowth Solutions
            </h3>
            {solutions.map((solution, index) => (
              <motion.div
                key={solution}
                className="flex items-start gap-3 md:gap-4 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-lg md:rounded-xl p-4 md:p-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 136, 0.08)' }}
              >
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88]" />
                  </div>
                </div>
                <p className="text-sm md:text-lg text-white/80">{solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
