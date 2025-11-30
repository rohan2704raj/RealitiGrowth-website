import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Lock, Check, Mail, User, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SubscriptionRegistrationFormProps {
  onBack: () => void;
  onContinue: () => void;
  service: {
    name: string;
    price: string;
    billingCycle: string;
    features: string[];
  };
}

const SubscriptionRegistrationForm = ({ onBack, onContinue, service }: SubscriptionRegistrationFormProps) => {
  const { user, signUp, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      onContinue();
    }
  }, [user, onContinue]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!signupData.agreedToTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
      if (error) {
        setError(error.message);
      } else {
        onContinue();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      if (error) {
        setError(error.message);
      } else {
        onContinue();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] py-4 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 sm:mb-8 group text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          Back to service selection
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4"
          >
            <span className="text-[#00FF88] text-xs sm:text-sm font-semibold">Step 1 of 3</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 px-2">Your Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10">
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 pb-3 sm:pb-4 font-semibold text-sm sm:text-base transition-all ${
                    activeTab === 'signup'
                      ? 'text-[#00FF88] border-b-2 border-[#00FF88]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 pb-3 sm:pb-4 font-semibold text-sm sm:text-base transition-all ${
                    activeTab === 'login'
                      ? 'text-[#00FF88] border-b-2 border-[#00FF88]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Login
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {activeTab === 'signup' ? (
                <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-white mb-2 font-medium text-sm sm:text-base">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                      <input
                        type="text"
                        id="fullName"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-white text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-2 font-medium">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        id="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white mb-2 font-medium">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="tel"
                        id="phone"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-white mb-2 font-medium">
                      Create Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-white mb-2 font-medium">
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={signupData.agreedToTerms}
                        onChange={(e) => setSignupData({ ...signupData, agreedToTerms: e.target.checked })}
                        className="mt-1 w-5 h-5 accent-[#00FF88]"
                      />
                      <span className="text-white/80 text-sm">
                        I agree to the{' '}
                        <Link to="/terms" className="text-[#00FF88] hover:underline">
                          Terms & Conditions
                        </Link>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Continue to Subscription'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                  <div>
                    <label htmlFor="loginEmail" className="block text-white mb-2 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        id="loginEmail"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="loginPassword" className="block text-white mb-2 font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="loginPassword"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 accent-[#00FF88]" />
                      <span className="text-white/60">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-[#00FF88] hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Logging in...' : 'Continue to Payment'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Order Summary</h3>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div>
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Service</p>
                  <p className="text-white font-semibold text-sm sm:text-base break-words">{service.name}</p>
                </div>

                <div>
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Price</p>
                  <p className="text-xl sm:text-2xl font-black text-[#00FF88]">{service.price}</p>
                </div>

                <div>
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Billing Cycle</p>
                  <p className="text-white text-sm sm:text-base">{service.billingCycle}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 sm:pt-4 mb-4 sm:mb-6">
                <h4 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF88]" />
                  What's Included
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-white/70 text-xs sm:text-sm flex items-start gap-2">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionRegistrationForm;
