import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadData) => void;
  serviceName: string;
}

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  tradingExperience: string;
  wantsUpdates: boolean;
}

const LeadCaptureModal = ({ isOpen, onClose, onSubmit, serviceName }: LeadCaptureModalProps) => {
  const [formData, setFormData] = useState<LeadData>({
    fullName: '',
    email: '',
    phone: '',
    tradingExperience: '',
    wantsUpdates: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

  const validateField = (name: keyof LeadData, value: string | boolean) => {
    switch (name) {
      case 'fullName':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Please enter your full name';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || (typeof value === 'string' && !emailRegex.test(value))) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value || (typeof value === 'string' && value.length < 10)) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'tradingExperience':
        if (!value) {
          return 'Please select your trading experience';
        }
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    const error = validateField(name as keyof LeadData, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof LeadData, string>> = {};
    (['fullName', 'email', 'phone', 'tradingExperience'] as const).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
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
          className="relative bg-[#0F1F3A] border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
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
              <Download className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Download Complete Syllabus
            </h2>
            <p className="text-white/60">Get the detailed curriculum delivered to your inbox</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-white mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-white mb-2 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50"
                placeholder="1234567890"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="tradingExperience" className="block text-white mb-2 font-medium">
                What's your trading experience? *
              </label>
              <select
                id="tradingExperience"
                name="tradingExperience"
                value={formData.tradingExperience}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF88]/50"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.tradingExperience && (
                <p className="text-red-400 text-sm mt-1">{errors.tradingExperience}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="wantsUpdates"
                  checked={formData.wantsUpdates}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-[#00FF88]"
                />
                <span className="text-white/80 text-sm">
                  I want to receive updates about new courses and trading tips
                </span>
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Now
            </motion.button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-white/60 hover:text-white text-sm transition-colors"
            >
              No thanks, maybe later
            </button>

            <p className="text-center text-white/40 text-xs">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
