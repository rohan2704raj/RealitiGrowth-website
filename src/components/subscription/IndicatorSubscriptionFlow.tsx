import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionConfirmationModal from './SubscriptionConfirmationModal';
import SubscriptionRegistrationForm from './SubscriptionRegistrationForm';
import PlatformSelectionPage from './PlatformSelectionPage';
import PlanSelectionPage from './PlanSelectionPage';
import IndicatorSuccessPage from './IndicatorSuccessPage';
import { useAuth } from '../../contexts/AuthContext';

interface IndicatorSubscriptionFlowProps {
  service: {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    billingCycle: string;
    features: string[];
  };
}

type FlowStep = 'confirmation' | 'registration' | 'platform-selection' | 'plan-selection' | 'payment' | 'success';

const IndicatorSubscriptionFlow = ({ service }: IndicatorSubscriptionFlowProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<FlowStep>('confirmation');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<{
    type: 'monthly' | 'quarterly' | 'annual';
    amount: number;
  } | null>(null);

  const generateLicenseKey = () => {
    const segments = [];
    for (let i = 0; i < 4; i++) {
      segments.push(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
    }
    return `RTIG-${segments.join('-')}`;
  };

  const [subscriptionData] = useState({
    id: '#SUB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    plan: 'Monthly Plan',
    amount: '₹1,999/month',
    status: 'Active',
    startDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    email: user?.email || 'user@example.com',
  });

  const [licenseKey] = useState(generateLicenseKey());

  const handleConfirmationContinue = () => {
    if (user) {
      setCurrentStep('platform-selection');
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
    setCurrentStep('platform-selection');
  };

  const handlePlatformSelectionBack = () => {
    if (user) {
      navigate(-1);
    } else {
      setCurrentStep('registration');
    }
  };

  const handlePlatformSelectionContinue = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
    setCurrentStep('plan-selection');
  };

  const handlePlanSelectionBack = () => {
    setCurrentStep('platform-selection');
  };

  const handlePlanSelectionContinue = (planType: 'monthly' | 'quarterly' | 'annual', amount: number) => {
    setSelectedPlan({ type: planType, amount });
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

  if (currentStep === 'platform-selection') {
    return (
      <PlatformSelectionPage
        onBack={handlePlatformSelectionBack}
        onContinue={handlePlatformSelectionContinue}
        serviceName={service.name}
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
      <IndicatorSuccessPage
        subscription={subscriptionData}
        licenseKey={licenseKey}
        selectedPlatforms={selectedPlatforms}
        serviceName={service.name}
      />
    );
  }

  return null;
};

export default IndicatorSubscriptionFlow;
