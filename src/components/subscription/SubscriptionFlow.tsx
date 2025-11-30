import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionConfirmationModal from './SubscriptionConfirmationModal';
import SubscriptionRegistrationForm from './SubscriptionRegistrationForm';
import PlanSelectionPage from './PlanSelectionPage';
import SubscriptionSuccessPage from './SubscriptionSuccessPage';
import { useAuth } from '../../contexts/AuthContext';

interface SubscriptionFlowProps {
  service: {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    billingCycle: string;
    features: string[];
  };
  whatsappLink?: string;
}

type FlowStep = 'confirmation' | 'registration' | 'plan-selection' | 'payment' | 'success';

const SubscriptionFlow = ({ service, whatsappLink }: SubscriptionFlowProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<FlowStep>('confirmation');
  const [selectedPlan, setSelectedPlan] = useState<{
    type: 'monthly' | 'quarterly' | 'annual';
    amount: number;
  } | null>(null);

  const [subscriptionData, setSubscriptionData] = useState({
    id: '#SUB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    plan: 'Monthly Plan',
    amount: '₹1,999/month',
    status: 'Active',
    startDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    paymentMethod: 'Card ending ****1234',
    email: user?.email || 'user@example.com',
  });

  const handleConfirmationContinue = () => {
    if (user) {
      setCurrentStep('plan-selection');
    } else {
      setCurrentStep('registration');
    }
  };

  const handleConfirmationClose = () => {
    navigate(-1);
  };

  const handleRegistrationBack = () => {
    setCurrentStep('confirmation');
  };

  const handleRegistrationContinue = () => {
    setCurrentStep('plan-selection');
  };

  const handlePlanSelectionBack = () => {
    setCurrentStep('registration');
  };

  const handlePlanSelectionContinue = (planType: 'monthly' | 'quarterly' | 'annual', amount: number) => {
    setSelectedPlan({ type: planType, amount });

    const planNames = {
      monthly: 'Monthly Plan',
      quarterly: 'Quarterly Plan',
      annual: 'Annual Plan',
    };

    const planAmounts = {
      monthly: '₹1,999/month',
      quarterly: '₹4,497 (₹1,499/month)',
      annual: '₹14,390 (₹1,199/month)',
    };

    setSubscriptionData(prev => ({
      ...prev,
      plan: planNames[planType],
      amount: planAmounts[planType],
    }));

    setCurrentStep('success');
  };

  if (currentStep === 'confirmation') {
    return (
      <SubscriptionConfirmationModal
        isOpen={true}
        onClose={handleConfirmationClose}
        onContinue={handleConfirmationContinue}
        service={service}
      />
    );
  }

  if (currentStep === 'registration') {
    return (
      <SubscriptionRegistrationForm
        onBack={handleRegistrationBack}
        onContinue={handleRegistrationContinue}
        service={service}
      />
    );
  }

  if (currentStep === 'plan-selection') {
    return (
      <PlanSelectionPage
        onBack={handlePlanSelectionBack}
        onContinue={handlePlanSelectionContinue}
        serviceName={service.name}
      />
    );
  }

  if (currentStep === 'success') {
    return (
      <SubscriptionSuccessPage
        subscription={subscriptionData}
        serviceName={service.name}
        whatsappLink={whatsappLink}
      />
    );
  }

  return null;
};

export default SubscriptionFlow;
