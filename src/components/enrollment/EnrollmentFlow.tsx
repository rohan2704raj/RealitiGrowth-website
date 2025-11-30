import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import ServiceConfirmationModal from './ServiceConfirmationModal';
import RegistrationForm, { RegistrationData } from './RegistrationForm';
import PaymentPage, { PaymentData } from './PaymentPage';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface EnrollmentFlowProps {
  service: {
    name: string;
    price: string;
    originalPrice?: string;
    features: string[];
  };
  onClose: () => void;
}

type FlowStep = 'confirmation' | 'registration' | 'payment' | 'processing' | 'success';

const EnrollmentFlow = ({ service, onClose }: EnrollmentFlowProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FlowStep>('confirmation');
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleConfirmation = () => {
    setCurrentStep('registration');
  };

  const handleRegistration = (data: RegistrationData) => {
    setRegistrationData(data);
    setCurrentStep('payment');
  };

  const handlePayment = async (paymentData: PaymentData) => {
    if (!registrationData) return;

    setCurrentStep('processing');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = `ORD${Date.now()}`;
    const transactionId = `TXN${Date.now()}`;

    try {
      const { error } = await supabase.from('enrollments').insert({
        full_name: registrationData.fullName,
        email: registrationData.email,
        phone: `${registrationData.countryCode}${registrationData.phone}`,
        service_name: service.name,
        service_price: parseFloat(service.price.replace(/,/g, '')),
        status: 'completed',
        order_id: orderId,
        transaction_id: transactionId,
        payment_method: paymentData.paymentMethod,
        promo_code: paymentData.promoCode,
        discount_amount: paymentData.discountAmount,
        final_amount: paymentData.finalAmount,
      });

      if (error) {
        console.error('Error saving enrollment:', error);
      }

      navigate(`/success?order_id=${orderId}`);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setCurrentStep('payment');
    }
  };

  const handleBack = () => {
    if (currentStep === 'registration') {
      setCurrentStep('confirmation');
    } else if (currentStep === 'payment') {
      setCurrentStep('registration');
    }
  };

  if (currentStep === 'confirmation') {
    return (
      <ServiceConfirmationModal
        isOpen={true}
        onClose={onClose}
        onContinue={handleConfirmation}
        service={service}
      />
    );
  }

  if (currentStep === 'registration') {
    return (
      <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] overflow-y-auto">
        <RegistrationForm onBack={handleBack} onContinue={handleRegistration} service={service} />
      </div>
    );
  }

  if (currentStep === 'payment' && registrationData) {
    return (
      <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] overflow-y-auto">
        <PaymentPage
          onBack={handleBack}
          onComplete={handlePayment}
          service={service}
          registrationData={registrationData}
        />
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white/20 border-t-[#00FF88] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Processing your payment...</p>
          <p className="text-white/60 mt-2">Please wait, do not close this window</p>
        </div>
      </div>
    );
  }

  return null;
};

export default EnrollmentFlow;
