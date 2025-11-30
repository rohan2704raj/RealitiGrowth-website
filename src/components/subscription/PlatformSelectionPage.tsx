import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface Platform {
  id: 'mt4' | 'mt5' | 'tradingview' | 'ninjatrader';
  name: string;
  badge?: string;
  icon: string;
  features: string[];
}

interface PlatformSelectionPageProps {
  onBack: () => void;
  onContinue: (platforms: string[]) => void;
  serviceName: string;
}

const PlatformSelectionPage = ({ onBack, onContinue, serviceName }: PlatformSelectionPageProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showRequirements, setShowRequirements] = useState(false);

  const platforms: Platform[] = [
    {
      id: 'mt4',
      name: 'MetaTrader 4',
      badge: 'Most Popular',
      icon: 'MT4',
      features: [
        'Windows & Mac compatible',
        'Most popular forex platform',
        'Easy installation',
      ],
    },
    {
      id: 'mt5',
      name: 'MetaTrader 5',
      icon: 'MT5',
      features: [
        'Enhanced features vs MT4',
        'Multi-asset trading',
        'Advanced analytics',
      ],
    },
    {
      id: 'tradingview',
      name: 'TradingView',
      badge: 'Web-Based',
      icon: 'TV',
      features: [
        'Web-based platform',
        'No installation needed',
        'Cloud-synced alerts',
      ],
    },
    {
      id: 'ninjatrader',
      name: 'NinjaTrader',
      icon: 'NT',
      features: [
        'Futures & forex',
        'Advanced charting',
        'Automated trading',
      ],
    },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleContinue = () => {
    if (selectedPlatforms.length > 0) {
      onContinue(selectedPlatforms);
    }
  };

  const handleSkip = () => {
    onContinue([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to registration
        </button>

        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-4 py-2 mb-4"
          >
            <span className="text-[#00FF88] text-sm font-semibold">Step 2 of 4</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Select Your Trading Platform</h1>
          <p className="text-white/70 text-lg">{serviceName}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-xl p-4 mb-8 flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium mb-1">Choose which platform(s) you'll use the indicator on</p>
            <p className="text-white/60 text-sm">You can select multiple platforms. Setup instructions will be customized for your selection.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => togglePlatform(platform.id)}
              className={`relative bg-[#1A2942]/80 backdrop-blur-xl border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-[#00FF88] shadow-2xl shadow-[#00FF88]/20'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {selectedPlatforms.includes(platform.id) && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#00FF88] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {platform.badge && (
                <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-lg px-3 py-1 mb-4 text-center inline-block">
                  <span className="text-[#00FF88] text-xs font-semibold">{platform.badge}</span>
                </div>
              )}

              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-xl mb-4 text-white font-black text-xl">
                {platform.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{platform.name}</h3>

              <div className="space-y-2 mb-4">
                {platform.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.id)}
                    onChange={() => {}}
                    className="w-5 h-5 accent-[#00FF88]"
                  />
                  <span className="text-white font-medium">Use on {platform.name}</span>
                </label>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8"
        >
          <button
            onClick={() => setShowRequirements(!showRequirements)}
            className="w-full flex items-center justify-between text-white hover:text-[#00FF88] transition-colors"
          >
            <span className="font-semibold">View System Requirements</span>
            {showRequirements ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showRequirements && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 space-y-4"
            >
              <div>
                <h4 className="text-white font-semibold mb-2">Operating System</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Windows 7 or later (for MT4/MT5/NinjaTrader)</li>
                  <li>• macOS 10.12 or later (for MT4/MT5 via Wine)</li>
                  <li>• Any OS with modern browser (for TradingView)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Hardware Requirements</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Minimum 4GB RAM (8GB recommended)</li>
                  <li>• Intel Core i3 or equivalent processor</li>
                  <li>• Stable internet connection</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="text-center mb-8">
          <p className="text-white/60 text-sm mb-4">
            Not sure which platform to choose?{' '}
            <button className="text-[#00FF88] hover:underline">Watch comparison video</button>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSkip}
            className="px-8 py-4 rounded-xl font-semibold text-white/70 hover:text-white transition-all"
          >
            Skip for now
          </button>
          <button
            onClick={handleContinue}
            disabled={selectedPlatforms.length === 0}
            className="px-12 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Plan Selection
          </button>
        </div>

        {selectedPlatforms.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/60 text-sm mt-4"
          >
            {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''} selected
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PlatformSelectionPage;
