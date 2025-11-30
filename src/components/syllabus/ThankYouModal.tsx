import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, Star, Play } from 'lucide-react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: () => void;
  email: string;
  serviceName: string;
  servicePrice: string;
  originalPrice?: string;
}

const ThankYouModal = ({
  isOpen,
  onClose,
  onEnroll,
  email,
  serviceName,
  servicePrice,
  originalPrice,
}: ThankYouModalProps) => {
  const handleDownload = () => {
    alert('PDF download would be triggered here');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative bg-[#0F1F3A] border border-white/10 rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <motion.div
            className="text-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your Syllabus is Ready!
            </h2>
            <p className="text-white/70 text-lg">
              Check your email - we've sent the PDF to{' '}
              <span className="text-[#00FF88] font-semibold">{email}</span>
            </p>
          </motion.div>

          <motion.button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mb-6 hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            Download PDF Now
          </motion.button>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-white font-bold text-lg mb-4">Preview: What's Inside</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></div>
                <span>12 Comprehensive Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></div>
                <span>120+ Video Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></div>
                <span>100+ Hours Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></div>
                <span>Lifetime Access</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Ready to Start Learning?</h3>
                <p className="text-white/70 mb-4">
                  Join{' '}
                  <span className="text-[#00FF88] font-semibold">500+ traders</span> who are
                  already mastering the markets
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  {originalPrice && (
                    <span className="text-white/50 text-lg line-through">₹{originalPrice}</span>
                  )}
                  <span className="text-3xl font-black text-white">₹{servicePrice}</span>
                  <span className="bg-[#00FF88]/20 text-[#00FF88] px-2 py-1 rounded text-sm font-semibold">
                    Limited Time
                  </span>
                </div>
                <button
                  onClick={onEnroll}
                  className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
                >
                  Enroll Now - Special Discount
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">What You'll Get When You Enroll</h3>
            <div className="space-y-3">
              {[
                'Complete A-Z trading curriculum with 120+ lessons',
                'Live trading sessions every week',
                'Exclusive community access with 500+ members',
                'Lifetime access to all course materials',
                'Certificate of completion',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-[#00FF88]" />
                  </div>
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0066FF]/10 to-[#00FF88]/10 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Student Success Stories</h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#00FF88] fill-[#00FF88]" />
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 mb-3">
              <p className="text-white/80 italic text-sm mb-2">
                "The syllabus looked amazing, but the actual course exceeded all my expectations. Best investment I've made!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88]"></div>
                <div>
                  <p className="text-white font-semibold text-sm">Amit Verma</p>
                  <p className="text-white/60 text-xs">Made ₹72.5L in 8 months</p>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm text-center">
              4.9/5 rating from 2,847 students
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full text-white/60 hover:text-white text-sm mt-6 transition-colors"
          >
            I'll think about it
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ThankYouModal;
