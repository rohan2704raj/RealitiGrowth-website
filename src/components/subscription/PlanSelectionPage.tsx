import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarCheck, Star, Check, ArrowLeft } from 'lucide-react';

interface PlanOption {
  id: 'monthly' | 'quarterly' | 'annual';
  name: string;
  badge?: string;
  icon: React.ReactNode;
  price: string;
  originalPrice?: string;
  perMonth: string;
  billing: string;
  savings?: string;
  features: string[];
  recommended?: boolean;
}

interface PlanSelectionPageProps {
  onBack: () => void;
  onContinue: (planType: 'monthly' | 'quarterly' | 'annual', amount: number) => void;
  serviceName: string;
}

const PlanSelectionPage = ({ onBack, onContinue, serviceName }: PlanSelectionPageProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'annual' | null>(null);

  const plans: PlanOption[] = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      badge: 'Most Flexible',
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
      price: '₹1,999',
      perMonth: '₹1,999/month',
      billing: 'Billed monthly',
      features: [
        'All trade alerts',
        'Cancel anytime',
        'No commitment',
        'Full community access',
      ],
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      badge: 'BEST VALUE - Save 25%',
      icon: <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      price: '₹4,497',
      originalPrice: '₹5,997',
      perMonth: '₹1,499/month',
      billing: 'Billed every 3 months',
      savings: 'Save ₹1,500',
      features: [
        'All trade alerts',
        'Priority support',
        'Exclusive webinars',
        'Full community access',
      ],
      recommended: true,
    },
    {
      id: 'annual',
      name: 'Annual Plan',
      badge: 'MAXIMUM SAVINGS - Save 40%',
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
      price: '₹14,390',
      originalPrice: '₹23,988',
      perMonth: '₹1,199/month',
      billing: 'Billed annually',
      savings: 'Save ₹9,598',
      features: [
        'All trade alerts',
        'Priority support',
        'Exclusive webinars',
        'Bonus trading templates',
        'Full community access',
      ],
    },
  ];

  const handlePlanSelect = (planId: 'monthly' | 'quarterly' | 'annual') => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;

    const amounts = {
      monthly: 1999,
      quarterly: 4497,
      annual: 14390,
    };

    onContinue(selectedPlan, amounts[selectedPlan]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] py-4 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 sm:mb-8 group text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          Back to registration
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4"
          >
            <span className="text-[#00FF88] text-xs sm:text-sm font-semibold">Step 2 of 3</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 px-2">Choose Your Plan</h1>
          <p className="text-white/70 text-base sm:text-lg px-2">{serviceName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handlePlanSelect(plan.id)}
              className={`relative bg-[#1A2942]/80 backdrop-blur-xl border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-[#00FF88] shadow-2xl shadow-[#00FF88]/20'
                  : 'border-white/10 hover:border-white/30'
              } ${plan.recommended ? 'md:scale-105' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                  RECOMMENDED
                </div>
              )}

              {plan.badge && (
                <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-lg px-2 sm:px-3 py-1 mb-3 sm:mb-4 text-center">
                  <span className="text-[#00FF88] text-[10px] sm:text-xs font-semibold leading-tight break-words">{plan.badge}</span>
                </div>
              )}

              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-white">
                {plan.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{plan.name}</h3>

              <div className="mb-3 sm:mb-4">
                {plan.originalPrice && (
                  <div className="text-white/40 text-base sm:text-lg line-through mb-1">{plan.originalPrice}</div>
                )}
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">{plan.price}</div>
                <div className="text-[#00FF88] text-base sm:text-lg font-semibold mb-1">{plan.perMonth}</div>
                <div className="text-white/60 text-xs sm:text-sm">{plan.billing}</div>
                {plan.savings && (
                  <div className="text-[#00FF88] text-xs sm:text-sm font-semibold mt-2 flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    {plan.savings}
                  </div>
                )}
              </div>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white'
                    : 'border-2 border-white/20 text-white hover:border-white/40'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : `Select ${plan.name.split(' ')[0]}`}
              </button>

              <p className="text-white/40 text-[10px] sm:text-xs text-center mt-2 sm:mt-3">
                {plan.id === 'monthly'
                  ? 'You can cancel anytime from your account'
                  : 'Best value for serious traders'}
              </p>
            </motion.div>
          ))}
        </div>

        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center px-4"
          >
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all"
            >
              Continue to Payment
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlanSelectionPage;
