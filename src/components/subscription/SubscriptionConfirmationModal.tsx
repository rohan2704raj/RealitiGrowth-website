import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface SubscriptionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  service: {
    name: string;
    price: string;
    originalPrice?: string;
    billingCycle: string;
    features: string[];
  };
}

const SubscriptionConfirmationModal = ({
  isOpen,
  onClose,
  onContinue,
  service,
}: SubscriptionConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-[#1A2942] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#1A2942] border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Confirm Your Selection</h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">Review your service details before continuing</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-br from-[#0066FF]/10 to-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{service.name}</h3>

                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-2">
                    {service.originalPrice && (
                      <span className="text-white/40 text-lg sm:text-xl line-through">
                        {service.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-black text-[#00FF88]">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm">
                    {service.billingCycle}
                  </p>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88]" />
                    </span>
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 sm:gap-3 text-white/80 bg-white/5 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88] flex-shrink-0" />
                        <span className="break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white border border-white/20 hover:bg-white/5 transition-all"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={onContinue}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all"
                  >
                    Continue to Enrollment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionConfirmationModal;
