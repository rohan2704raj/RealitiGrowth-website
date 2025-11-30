import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface ServiceConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  service: {
    name: string;
    price: string;
    originalPrice?: string;
    features: string[];
  };
}

const ServiceConfirmationModal = ({
  isOpen,
  onClose,
  onContinue,
  service,
}: ServiceConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative bg-[#0F1F3A] border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Confirm Your Selection
            </h2>
            <p className="text-white/60">Review your service details before continuing</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">{service.name}</h3>

            <div className="mb-4">
              {service.originalPrice && (
                <div className="text-white/50 text-lg line-through mb-1">₹{service.originalPrice}</div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">₹{service.price}</span>
                <span className="text-white/60">one-time</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold mb-3">What's Included:</h4>
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={onContinue}
              className="flex-1 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
            >
              Continue to Enrollment
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceConfirmationModal;
