import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import EnrollmentFlow from './enrollment/EnrollmentFlow';

const PricingSection = () => {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const handleEnrollClick = (plan: any) => {
    const serviceDetails = {
      name: plan.name === 'Foundation'
        ? 'A-Z Stock, Forex & Crypto Mastering Program'
        : `${plan.name} Trading Package`,
      price: plan.price,
      originalPrice: plan.name === 'Foundation' ? '50,000' : undefined,
      features: plan.features,
    };
    setSelectedService(serviceDetails);
    setShowEnrollment(true);
  };

  const plans = [
    {
      name: 'Foundation',
      price: '41,500',
      period: 'one-time',
      description: 'Perfect for beginners starting their trading journey',
      features: [
        'A-Z Trading Curriculum',
        '120+ Video Lessons',
        'Basic Technical Analysis',
        'Risk Management Guide',
        'Community Access',
        'Email Support',
        'Lifetime Access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '83,200',
      period: 'one-time',
      description: 'Complete package for serious traders',
      features: [
        'Everything in Foundation',
        'Live Trading Sessions',
        'Copy My Trades Group',
        'RealitiGrowth Indicator',
        'Advanced Strategies',
        '1-on-1 Coaching Session',
        'Priority Support',
        'Trading Templates',
      ],
      cta: 'Start Trading',
      popular: true,
    },
    {
      name: 'Elite',
      price: '1,66,600',
      period: 'one-time',
      description: 'Ultimate package for aspiring professional traders',
      features: [
        'Everything in Professional',
        'Weekly 1-on-1 Coaching',
        'Custom Trading Plan',
        'Portfolio Review',
        'Exclusive Masterclasses',
        'Advanced Indicators Pack',
        'Direct Mentor Access',
        'Lifetime Updates',
      ],
      cta: 'Go Elite',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-12 md:py-24 bg-gradient-to-b from-[#0F1F3A] to-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,102,255,0.1)_0%,_transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
            Invest in Your{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 md:mb-6 px-4">
            Choose the perfect plan to start your trading journey
          </p>
          <div className="inline-flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/20 px-3 md:px-4 py-2 rounded-full">
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-[#00FF88]" />
            <span className="text-xs md:text-sm text-white/80">30-Day Money-Back Guarantee</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-4 py-1 rounded-full text-sm font-bold z-10"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  MOST POPULAR
                </motion.div>
              )}

              <motion.div
                className={`h-full bg-white/5 backdrop-blur-lg border rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col ${
                  plan.popular
                    ? 'border-[#00FF88]/50 shadow-lg shadow-[#00FF88]/20 lg:scale-105'
                    : 'border-white/10'
                }`}
                whileHover={{
                  y: -10,
                  borderColor: plan.popular
                    ? 'rgba(0, 255, 136, 0.7)'
                    : 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-xs md:text-sm mb-4 md:mb-6">{plan.description}</p>

                <div className="mb-4 md:mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-5xl font-black text-white">₹{plan.price}</span>
                    <span className="text-sm md:text-base text-white/60">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 md:gap-3">
                      <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center mt-0.5">
                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#00FF88]" />
                      </div>
                      <span className="text-white/80 text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handleEnrollClick(plan)}
                  className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: plan.popular
                      ? '0 0 30px rgba(0, 255, 136, 0.5)'
                      : '0 0 20px rgba(255, 255, 255, 0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm md:text-base px-4">
            All plans include lifetime access and free updates. Need a custom plan?{' '}
            <button className="text-[#00FF88] hover:underline">Contact us</button>
          </p>
        </motion.div>
      </div>

      {showEnrollment && selectedService && (
        <EnrollmentFlow
          service={selectedService}
          onClose={() => {
            setShowEnrollment(false);
            setSelectedService(null);
          }}
        />
      )}
    </section>
  );
};

export default PricingSection;
