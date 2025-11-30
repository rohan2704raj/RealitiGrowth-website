import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Lock,
  Tag,
  Check,
  X,
  AlertCircle,
  ChevronDown,
  Edit,
  Award,
  Headphones,
} from 'lucide-react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise, createPaymentIntent } from '../../lib/stripe';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import EnrollmentLayout from './EnrollmentLayout';
import type { RegistrationData } from './RegistrationForm';

interface PaymentPageProps {
  onBack: () => void;
  onComplete: (paymentData: PaymentData) => void;
  service: {
    name: string;
    price: string;
    originalPrice?: string;
    features: string[];
  };
  registrationData: RegistrationData;
}

export interface PaymentData {
  paymentMethod: string;
  promoCode?: string;
  discountAmount: number;
  finalAmount: number;
  stripePaymentId?: string;
}

const PROMO_CODES = {
  GROWTH200: 16700,
  SAVE10: 3500,
  WELCOME: 5000,
};

const PaymentForm = ({ onBack, onComplete, service, registrationData }: PaymentPageProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showWhatIncluded, setShowWhatIncluded] = useState(false);
  const [showMobileOrderSummary, setShowMobileOrderSummary] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);

  const basePrice = parseFloat(service.price.replace(/,/g, ''));
  const originalPrice = service.originalPrice
    ? parseFloat(service.originalPrice.replace(/,/g, ''))
    : basePrice;
  const existingDiscount = originalPrice - basePrice;
  const finalAmount = basePrice - discountAmount;

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    const discount = PROMO_CODES[code as keyof typeof PROMO_CODES];

    if (discount) {
      setDiscountAmount(discount);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setDiscountAmount(0);
    setPromoError('');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!termsAccepted) {
      setPaymentError('Please accept the terms and refund policy to proceed');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/success',
          payment_method_data: {
            billing_details: {
              name: registrationData.fullName,
              email: registrationData.email,
              phone: `${registrationData.countryCode}${registrationData.phone}`,
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setPaymentError(error.message || 'Payment failed. Please try again.');
        } else {
          setPaymentError('An unexpected error occurred. Please try again.');
        }
        setIsProcessing(false);
      } else {
        const paymentData: PaymentData = {
          paymentMethod: 'stripe',
          promoCode: promoApplied ? promoCode : undefined,
          discountAmount,
          finalAmount,
          stripePaymentId: 'payment_succeeded',
        };

        onComplete(paymentData);
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Payment processing failed');
      setIsProcessing(false);
    }
  };

  return (
    <EnrollmentLayout currentStep={2}>
      <div className="pb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to registration
        </button>

        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileOrderSummary(!showMobileOrderSummary)}
            className="w-full bg-[#1A2942]/60 backdrop-blur-xl border border-[#00FF88]/20 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="text-left">
              <span className="text-white font-semibold block">Order Summary</span>
              <span className="text-white/60 text-sm">₹{finalAmount.toLocaleString('en-IN')}</span>
            </div>
            <motion.div
              animate={{ rotate: showMobileOrderSummary ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.div>
          </button>

          {showMobileOrderSummary && (
            <motion.div
              className="bg-[#1A2942]/60 backdrop-blur-xl border border-[#00FF88]/20 rounded-2xl p-6 mt-4 shadow-2xl shadow-[#00FF88]/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-white/80">
                  <span>Program Price:</span>
                  <span className="line-through text-white/50">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                {existingDiscount > 0 && (
                  <div className="flex justify-between text-[#00FF88]">
                    <span>Discount (30% off):</span>
                    <span>-₹{existingDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {discountAmount > 0 && promoApplied && (
                  <div className="flex justify-between text-[#00FF88]">
                    <span>Promo Code ({promoCode}):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-bold text-2xl">
                    <span>Total:</span>
                    <span className="text-[#00FF88]">₹{finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">One-time payment • No recurring charges</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 md:p-12 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
                  Complete Your Payment
                </h1>
                <p className="text-white/70 text-base sm:text-lg">Secure checkout powered by Stripe</p>
              </div>

              <div className="mb-4 sm:mb-6 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white text-sm sm:text-base font-semibold">Billing Information</h3>
                  <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-[#00FF88] hover:underline text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-sm text-white/70">
                  <p className="font-medium text-white">{registrationData.fullName}</p>
                  <p>{registrationData.email}</p>
                  <p>
                    {registrationData.countryCode} {registrationData.phone}
                  </p>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                {!showPromoInput ? (
                  <button
                    onClick={() => setShowPromoInput(true)}
                    className="text-[#00FF88] hover:underline text-xs sm:text-sm font-medium flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Have a promo code? Click to apply
                  </button>
                ) : (
                  <div>
                    <label htmlFor="promoCode" className="block text-white text-sm sm:text-base mb-1.5 sm:mb-2 font-medium">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                        <input
                          type="text"
                          id="promoCode"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value.toUpperCase());
                            setPromoError('');
                          }}
                          disabled={promoApplied}
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50"
                          placeholder="Enter promo code"
                        />
                      </div>
                      {promoApplied ? (
                        <button
                          onClick={handleRemovePromo}
                          className="px-3 sm:px-6 py-2.5 sm:py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm sm:text-base font-semibold transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                        >
                          <X className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyPromo}
                          disabled={!promoCode}
                          className="px-3 sm:px-6 py-2.5 sm:py-3 bg-[#00FF88]/20 hover:bg-[#00FF88]/30 text-[#00FF88] rounded-lg text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                    {promoApplied && (
                      <p className="text-[#00FF88] text-sm mt-2 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Code applied! You saved ₹{discountAmount.toLocaleString('en-IN')}
                      </p>
                    )}
                    {promoError && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {promoError}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <form onSubmit={handlePayment}>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Payment Method</h2>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                    <PaymentElement
                      options={{
                        layout: 'tabs',
                        defaultValues: {
                          billingDetails: {
                            name: registrationData.fullName,
                            email: registrationData.email,
                            phone: `${registrationData.countryCode}${registrationData.phone}`,
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                    <Shield className="w-5 h-5 text-[#00FF88]" />
                    <span>Powered by Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Lock className="w-5 h-5 text-[#00FF88]" />
                    <span>SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Check className="w-5 h-5 text-[#00FF88]" />
                    <span>PCI Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Shield className="w-5 h-5 text-[#00FF88]" />
                    <span>256-bit Encryption</span>
                  </div>
                </div>

                <p className="text-white/50 text-xs sm:text-sm text-center mb-4 sm:mb-6">
                  Your payment information is encrypted and secure
                </p>

                <div className="mb-4 sm:mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        setPaymentError('');
                      }}
                      className="mt-1 w-5 h-5 accent-[#00FF88] cursor-pointer"
                    />
                    <span className="text-white/80 text-sm">
                      I authorize this purchase and agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowRefundPolicy(true)}
                        className="text-[#00FF88] hover:underline font-semibold"
                      >
                        Refund Policy
                      </button>
                    </span>
                  </label>
                </div>

                {paymentError && (
                  <div className="mb-4 sm:mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-400 font-semibold mb-1">Payment Failed</p>
                      <p className="text-red-300 text-sm">{paymentError}</p>
                    </div>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={!stripe || isProcessing || !termsAccepted}
                  className={`w-full py-3.5 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all ${
                    !stripe || isProcessing || !termsAccepted
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white hover:shadow-2xl hover:shadow-[#00FF88]/30'
                  }`}
                  whileHover={stripe && !isProcessing && termsAccepted ? { scale: 1.02 } : {}}
                  whileTap={stripe && !isProcessing && termsAccepted ? { scale: 0.98 } : {}}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${finalAmount.toLocaleString('en-IN')} Now`
                  )}
                </motion.button>

                <div className="mt-4 sm:mt-6 text-center space-y-1.5 sm:space-y-2">
                  <p className="text-white/60 text-xs sm:text-sm flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-[#00FF88]" />
                    30-Day Money-Back Guarantee
                  </p>
                  <p className="text-white/50 text-xs">
                    You will receive a confirmation email after successful payment
                  </p>
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
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Program Price:</span>
                  <span className="line-through text-white/50">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                {existingDiscount > 0 && (
                  <div className="flex justify-between text-[#00FF88]">
                    <span>Discount (30% off):</span>
                    <span>-₹{existingDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {discountAmount > 0 && promoApplied && (
                  <div className="flex justify-between items-center text-[#00FF88]">
                    <span>Promo Code ({promoCode}):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-bold text-2xl mb-1">
                    <span>Total:</span>
                    <span className="text-[#00FF88]">₹{finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-white/60 text-xs">One-time payment • No recurring charges</p>
                </div>
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setShowWhatIncluded(!showWhatIncluded)}
                  className="flex items-center justify-between w-full text-white font-semibold mb-3"
                >
                  <span>What's Included</span>
                  <motion.div
                    animate={{ rotate: showWhatIncluded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {showWhatIncluded && (
                    <motion.ul
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/20 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-[#00FF88] flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">30-Day Money-Back Guarantee</h4>
                    <p className="text-white/60 text-xs">
                      Not satisfied? Get a full refund within 30 days
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 text-sm">Questions about your purchase?</h4>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[#00FF88] hover:underline text-sm"
                >
                  <Headphones className="w-4 h-4" />
                  Contact Support
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showRefundPolicy && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            className="bg-[#0F1F3A] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Refund Policy</h3>
              <button
                onClick={() => setShowRefundPolicy(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-white/70 space-y-4">
              <p>
                We offer a 30-day money-back guarantee on all our programs. If you're not satisfied
                with the course, you can request a full refund within 30 days of purchase.
              </p>
              <p className="font-semibold text-white">To request a refund:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Contact our support team within 30 days of purchase</li>
                <li>Provide your order ID and reason for refund</li>
                <li>We'll process your refund within 5-7 business days</li>
              </ul>
              <p className="text-sm text-white/50 italic">
                Note: Refunds are not available after 30 days from the date of purchase.
              </p>
            </div>
            <button
              onClick={() => setShowRefundPolicy(false)}
              className="w-full mt-6 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              I Understand
            </button>
          </motion.div>
        </div>
      )}
    </EnrollmentLayout>
  );
};

const PaymentPage = (props: PaymentPageProps) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

        if (!stripePublishableKey) {
          throw new Error('Stripe is not configured. Please add VITE_STRIPE_PUBLISHABLE_KEY to your .env file. See SETUP_GUIDE.md for instructions.');
        }

        const orderId = `ORD${Date.now()}`;
        const basePrice = parseFloat(props.service.price.replace(/,/g, ''));

        const enrollmentData = {
          user_id: user?.id || null,
          full_name: props.registrationData.fullName,
          email: props.registrationData.email,
          phone: `${props.registrationData.countryCode}${props.registrationData.phone}`,
          service_name: props.service.name,
          service_price: basePrice,
          status: 'pending',
          order_id: orderId,
          payment_method: 'stripe',
          promo_code: null,
          discount_amount: 0,
          final_amount: basePrice,
        };

        const { data: enrollment, error: dbError } = await supabase
          .from('enrollments')
          .insert(enrollmentData)
          .select()
          .single();

        if (dbError) {
          throw new Error('Failed to create enrollment record');
        }

        const { clientSecret: secret } = await createPaymentIntent(
          basePrice,
          {
            name: props.registrationData.fullName,
            email: props.registrationData.email,
            phone: `${props.registrationData.countryCode}${props.registrationData.phone}`,
          },
          {
            order_id: orderId,
            enrollment_id: enrollment.id,
            user_id: user?.id || 'guest',
            service_name: props.service.name,
          }
        );

        setClientSecret(secret);
        setLoading(false);
      } catch (err: any) {
        console.error('Payment initialization error:', err);
        setError(err.message || 'Failed to initialize payment');
        setLoading(false);
      }
    };

    initializePayment();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-[#00FF88] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Initializing payment...</p>
          <p className="text-white/60 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (error || !clientSecret) {
    const isStripeNotConfigured = error?.includes('Stripe is not configured');

    return (
      <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-[#1A2942]/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 max-w-2xl w-full my-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isStripeNotConfigured ? 'Stripe Not Configured' : 'Payment Initialization Failed'}
            </h2>
            <p className="text-white/70 mb-4">{error || 'Unable to initialize payment'}</p>
          </div>

          {isStripeNotConfigured && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 text-left">
              <h3 className="text-white font-semibold mb-3">Setup Instructions:</h3>
              <ol className="text-white/80 text-sm space-y-2 list-decimal list-inside">
                <li>Get your Stripe test keys from <a href="https://dashboard.stripe.com/test/apikeys" target="_blank" rel="noopener noreferrer" className="text-[#00FF88] hover:underline">Stripe Dashboard</a></li>
                <li>Add to your <code className="bg-black/30 px-2 py-1 rounded text-[#00FF88]">.env</code> file:
                  <pre className="bg-black/30 p-3 rounded mt-2 text-xs overflow-x-auto">
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
                  </pre>
                </li>
                <li>Deploy Edge Functions and configure secrets (see SETUP_GUIDE.md)</li>
                <li>Restart your development server</li>
              </ol>
              <p className="text-white/60 text-xs mt-4">
                For complete setup instructions, see <code className="bg-black/30 px-2 py-1 rounded">SETUP_GUIDE.md</code>
              </p>
            </div>
          )}

          <button
            onClick={props.onBack}
            className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#00FF88',
        colorBackground: '#1A2942',
        colorText: '#ffffff',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '12px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentPage;
