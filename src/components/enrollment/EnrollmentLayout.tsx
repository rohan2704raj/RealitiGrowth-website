import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, HelpCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EnrollmentLayoutProps {
  children: React.ReactNode;
  currentStep: 1 | 2 | 3;
  hideOrderSummary?: boolean;
}

const EnrollmentLayout = ({ children, currentStep, hideOrderSummary = false }: EnrollmentLayoutProps) => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const steps = [
    { number: 1, label: 'Your Details' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Complete' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowExitConfirm(true);
  };

  const handleExitConfirm = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-[100] bg-[#0A1628]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">R</span>
              </div>
              <span className="text-white font-bold text-lg sm:text-xl hidden sm:block group-hover:text-[#00FF88] transition-colors">
                RealitiGrowth
              </span>
            </Link>

            {!hideOrderSummary && (
              <div className="hidden md:flex items-center gap-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                          step.number < currentStep
                            ? 'bg-[#00FF88] text-[#0A1628]'
                            : step.number === currentStep
                            ? 'bg-gradient-to-br from-[#0066FF] to-[#00FF88] text-white'
                            : 'bg-white/10 text-white/40'
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {step.number < currentStep ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          step.number
                        )}
                      </motion.div>
                      <span
                        className={`text-xs mt-2 font-medium ${
                          step.number <= currentStep ? 'text-white' : 'text-white/40'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-2 mb-6 transition-all ${
                          step.number < currentStep ? 'bg-[#00FF88]' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <a
              href="tel:+911234567890"
              className="flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#00FF88] transition-colors" />
              <span className="hidden sm:block text-xs sm:text-sm font-medium">Need Help?</span>
              <Phone className="w-4 h-4 sm:hidden" />
            </a>
          </div>

          <div className="md:hidden mt-3">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                        step.number < currentStep
                          ? 'bg-[#00FF88] text-[#0A1628]'
                          : step.number === currentStep
                          ? 'bg-gradient-to-br from-[#0066FF] to-[#00FF88] text-white'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {step.number < currentStep ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : step.number}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-1 font-medium ${
                        step.number <= currentStep ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-6 sm:w-8 h-0.5 mx-0.5 sm:mx-1 mb-5 sm:mb-6 transition-all ${
                        step.number < currentStep ? 'bg-[#00FF88]' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-4 sm:py-6 md:py-8 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">{children}</div>
      </main>

      {showExitConfirm && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            className="bg-[#0F1F3A] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Leave Enrollment?</h3>
            <p className="text-sm sm:text-base text-white/70 mb-5 sm:mb-6">
              Your progress will be lost. Are you sure you want to exit the enrollment process?
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/15 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors"
              >
                Stay
              </button>
              <button
                onClick={handleExitConfirm}
                className="flex-1 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
              >
                Exit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentLayout;
