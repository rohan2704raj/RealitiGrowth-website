import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Lock, Check, ChevronDown } from 'lucide-react';
import EnrollmentLayout from './EnrollmentLayout';

interface RegistrationFormProps {
  onBack: () => void;
  onContinue: (data: RegistrationData) => void;
  service: {
    name: string;
    price: string;
    originalPrice?: string;
    features: string[];
  };
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const RegistrationForm = ({ onBack, onContinue, service }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationData, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const [showMobileOrderSummary, setShowMobileOrderSummary] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fullNameRef.current?.focus();
  }, []);

  const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' | '' => {
    if (!password) return '';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  };

  const validateField = (name: keyof RegistrationData, value: string | boolean) => {
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
        const phoneRegex = /^[0-9]{10}$/;
        if (!value || (typeof value === 'string' && !phoneRegex.test(value))) {
          return 'Please enter a valid 10-digit phone number';
        }
        break;
      case 'password':
        if (!value || (typeof value === 'string' && value.length < 8)) {
          return 'Password must be at least 8 characters';
        }
        if (typeof value === 'string') {
          if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least 1 uppercase letter';
          }
          if (!/[a-z]/.test(value)) {
            return 'Password must contain at least 1 lowercase letter';
          }
          if (!/[0-9]/.test(value)) {
            return 'Password must contain at least 1 number';
          }
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        break;
      case 'agreedToTerms':
        if (!value) {
          return 'You must agree to the terms and conditions';
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

    if (name === 'password' && typeof newValue === 'string') {
      setPasswordStrength(calculatePasswordStrength(newValue));
    }

    if (touched[name as keyof RegistrationData]) {
      const error = validateField(name as keyof RegistrationData, newValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof RegistrationData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};
    const allTouched: Partial<Record<keyof RegistrationData, boolean>> = {};

    Object.keys(formData).forEach((key) => {
      allTouched[key as keyof RegistrationData] = true;
      const error = validateField(
        key as keyof RegistrationData,
        formData[key as keyof RegistrationData]
      );
      if (error) newErrors[key as keyof RegistrationData] = error;
    });

    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onContinue(formData);
    } else {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element?.focus();
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^[0-9]{10}$/.test(formData.phone) &&
      formData.password.length >= 8 &&
      /[A-Z]/.test(formData.password) &&
      /[a-z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      formData.agreedToTerms
    );
  };

  return (
    <EnrollmentLayout currentStep={1}>
      <div className="pb-8 sm:pb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Back to service selection</span>
          <span className="sm:hidden">Back</span>
        </button>

      <div className="lg:hidden mb-4 sm:mb-6">
        <button
          onClick={() => setShowMobileOrderSummary(!showMobileOrderSummary)}
          className="w-full bg-[#1A2942]/60 backdrop-blur-xl border border-[#00FF88]/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between"
        >
          <span className="text-white text-sm sm:text-base font-semibold">
            {showMobileOrderSummary ? 'Hide' : 'Show'} Order Summary
          </span>
          <motion.div
            animate={{ rotate: showMobileOrderSummary ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </motion.div>
        </button>

        {showMobileOrderSummary && (
          <motion.div
            className="bg-[#1A2942]/60 backdrop-blur-xl border border-[#00FF88]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-3 sm:mt-4 shadow-2xl shadow-[#00FF88]/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Order Summary</h2>
            <div className="mb-3 sm:mb-4">
              <h3 className="text-white text-sm sm:text-base font-semibold mb-2">{service.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                {service.originalPrice && (
                  <span className="text-white/50 text-lg line-through">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">₹{service.price}</span>
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-1">One-time payment • Lifetime access</p>
            </div>
            <div className="border-t border-white/10 pt-3 sm:pt-4 mb-3 sm:mb-4">
              <h4 className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">What's Included:</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 pt-3 sm:pt-4">
              <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                <span className="text-white">Total:</span>
                <span className="text-[#00FF88]">₹{service.price}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 leading-tight">
                  Create Your Account
                </h1>
                <p className="text-white/70 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">Just a few details to get you started</p>
                <p className="text-white/60 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#00FF88] hover:underline font-semibold">
                    Login here
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-white text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 font-medium">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    ref={fullNameRef}
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('fullName')}
                    className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:border-[#00FF88]/50 transition-colors ${
                      touched.fullName && errors.fullName
                        ? 'border-red-400'
                        : 'border-white/10'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 font-medium">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:border-[#00FF88]/50 transition-colors ${
                      touched.email && errors.email ? 'border-red-400' : 'border-white/10'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 font-medium">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 sm:px-3 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#00FF88]/50"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      className={`flex-1 bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50 transition-colors ${
                        touched.phone && errors.phone ? 'border-red-400' : 'border-white/10'
                      }`}
                      placeholder="Enter your phone number"
                      maxLength={10}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-white text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 font-medium">
                    Create Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50 pr-10 sm:pr-12 transition-colors ${
                        touched.password && errors.password
                          ? 'border-red-400'
                          : 'border-white/10'
                      }`}
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        <div
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            passwordStrength === 'weak'
                              ? 'bg-red-500'
                              : passwordStrength === 'medium'
                              ? 'bg-yellow-500'
                              : passwordStrength === 'strong'
                              ? 'bg-green-500'
                              : 'bg-white/10'
                          }`}
                        />
                        <div
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            passwordStrength === 'medium' || passwordStrength === 'strong'
                              ? passwordStrength === 'medium'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                              : 'bg-white/10'
                          }`}
                        />
                        <div
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            passwordStrength === 'strong' ? 'bg-green-500' : 'bg-white/10'
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs ${
                          passwordStrength === 'weak'
                            ? 'text-red-400'
                            : passwordStrength === 'medium'
                            ? 'text-yellow-400'
                            : 'text-green-400'
                        }`}
                      >
                        Password strength: {passwordStrength}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-white/50 mt-2">
                    Must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number
                  </p>

                  {touched.password && errors.password && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-white text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 font-medium">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={`w-full bg-white/5 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50 pr-10 sm:pr-12 transition-colors ${
                        touched.confirmPassword && errors.confirmPassword
                          ? 'border-red-400'
                          : 'border-white/10'
                      }`}
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      onBlur={() => handleBlur('agreedToTerms')}
                      className="mt-1 w-5 h-5 accent-[#00FF88] cursor-pointer"
                    />
                    <span className="text-white/80 text-sm">
                      I agree to the{' '}
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FF88] hover:underline font-semibold"
                      >
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FF88] hover:underline font-semibold"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {touched.agreedToTerms && errors.agreedToTerms && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.agreedToTerms}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg transition-all ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white hover:shadow-lg hover:shadow-[#00FF88]/20'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                  whileHover={isFormValid() ? { scale: 1.02 } : {}}
                  whileTap={isFormValid() ? { scale: 0.98 } : {}}
                >
                  Continue to Payment
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-white/40 text-xs sm:text-sm pt-2">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Your information is secure and encrypted</span>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              className="bg-[#1A2942]/60 backdrop-blur-xl border border-[#00FF88]/20 rounded-2xl p-6 lg:sticky lg:top-[120px] shadow-2xl shadow-[#00FF88]/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

              <div className="mb-4">
                <h3 className="text-white font-semibold mb-2">{service.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  {service.originalPrice && (
                    <span className="text-white/50 text-lg line-through">
                      ₹{service.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">₹{service.price}</span>
                </div>
                <p className="text-white/60 text-sm mt-1">One-time payment • Lifetime access</p>
              </div>

              <div className="border-t border-white/10 pt-4 mb-4">
                <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60">Subtotal:</span>
                  <span className="text-white font-semibold">₹{service.price}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-[#00FF88]">₹{service.price}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </EnrollmentLayout>
  );
};

export default RegistrationForm;
