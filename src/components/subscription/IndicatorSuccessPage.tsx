import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Download,
  Copy,
  BookOpen,
  Settings,
  Users,
  LayoutDashboard,
  Key,
  Video,
  FileText,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IndicatorSuccessPageProps {
  subscription: {
    id: string;
    plan: string;
    amount: string;
    status: string;
    startDate: string;
    nextBilling: string;
    email: string;
  };
  licenseKey: string;
  selectedPlatforms: string[];
  serviceName: string;
}

const IndicatorSuccessPage = ({
  subscription,
  licenseKey,
  selectedPlatforms,
  serviceName,
}: IndicatorSuccessPageProps) => {
  const navigate = useNavigate();
  const [copiedKey, setCopiedKey] = useState(false);
  const [expandedInstructions, setExpandedInstructions] = useState<string | null>(null);

  const platformDetails: Record<string, { name: string; fileName: string; size: string; icon: string }> = {
    mt4: { name: 'MetaTrader 4', fileName: 'RealitiGrowth_MT4_v2.3.ex4', size: '2.4 MB', icon: 'MT4' },
    mt5: { name: 'MetaTrader 5', fileName: 'RealitiGrowth_MT5_v2.3.ex5', size: '2.6 MB', icon: 'MT5' },
    tradingview: { name: 'TradingView', fileName: 'Invite Link', size: 'N/A', icon: 'TV' },
    ninjatrader: { name: 'NinjaTrader', fileName: 'RealitiGrowth_NT8.zip', size: '3.1 MB', icon: 'NT' },
  };

  const handleCopyLicenseKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownload = (platform: string) => {
    console.log(`Downloading for ${platform}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <div className="absolute inset-0 rounded-full bg-[#00FF88]/20 animate-ping" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Your Indicator is Ready! 🚀
          </h1>
          <p className="text-white/70 text-lg">Download and start trading with an edge</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Subscription Confirmation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Subscription ID</p>
              <p className="text-white font-mono text-sm">{subscription.id}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Plan</p>
              <p className="text-white font-semibold">{subscription.plan}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Amount</p>
              <p className="text-2xl font-black text-[#00FF88]">{subscription.amount}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Next Billing</p>
              <p className="text-white">{subscription.nextBilling}</p>
            </div>
          </div>

          <div className="mt-6 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-4">
            <p className="text-white/80 text-sm">
              Setup instructions sent to <span className="text-[#00FF88] font-semibold">{subscription.email}</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 border-2 border-[#00FF88]/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-6 h-6 text-[#00FF88]" />
            <h2 className="text-2xl font-bold text-white">Your License Key</h2>
          </div>

          <div className="bg-[#1A2942] rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-white/60 text-sm mb-1">License Key:</p>
                <p className="text-white font-mono text-lg">{licenseKey}</p>
              </div>
              <button
                onClick={handleCopyLicenseKey}
                className="px-4 py-2 rounded-lg bg-[#00FF88]/20 border border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/30 transition-all flex items-center gap-2"
              >
                {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedKey ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <p className="text-white/70 text-sm">
            Keep this key safe - you'll need it for activation. Enter this key when prompted during indicator installation.
          </p>
        </motion.div>

        {selectedPlatforms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Download Your Indicator</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedPlatforms.map((platformId, index) => {
                const platform = platformDetails[platformId];
                if (!platform) return null;

                return (
                  <motion.div
                    key={platformId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-xl mb-4 text-white font-black text-xl">
                      {platform.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">Download for {platform.name}</h3>

                    {platformId !== 'tradingview' ? (
                      <>
                        <p className="text-white/60 text-sm mb-4">
                          {platform.fileName} • {platform.size}
                        </p>

                        <button
                          onClick={() => handleDownload(platformId)}
                          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all flex items-center justify-center gap-2 mb-3"
                        >
                          <Download className="w-5 h-5" />
                          Download {platform.name} Indicator
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-white/60 text-sm mb-4">No download needed - Use invite link</p>

                        <div className="bg-[#0A1628] rounded-lg p-3 mb-3">
                          <p className="text-white/60 text-xs mb-1">Invite Link:</p>
                          <p className="text-[#00FF88] text-sm break-all">
                            https://tradingview.com/invite/{licenseKey}
                          </p>
                        </div>

                        <button
                          onClick={() => navigator.clipboard.writeText(`https://tradingview.com/invite/${licenseKey}`)}
                          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all flex items-center justify-center gap-2 mb-3"
                        >
                          <Copy className="w-5 h-5" />
                          Copy Invite Link
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setExpandedInstructions(expandedInstructions === platformId ? null : platformId)}
                      className="w-full py-2 rounded-lg border border-white/20 text-white hover:border-[#00FF88]/50 transition-all flex items-center justify-center gap-2 mb-2"
                    >
                      <FileText className="w-4 h-4" />
                      View Installation Guide
                    </button>

                    <button className="w-full py-2 rounded-lg text-[#00FF88] hover:underline text-sm flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" />
                      Watch Video Tutorial
                    </button>

                    {expandedInstructions === platformId && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <h4 className="text-white font-semibold mb-3">Installation Steps:</h4>
                        <ol className="space-y-2 text-white/70 text-sm">
                          {platformId === 'mt4' || platformId === 'mt5' ? (
                            <>
                              <li>1. Download the indicator file above</li>
                              <li>2. Open {platform.name} platform</li>
                              <li>3. Go to File → Open Data Folder</li>
                              <li>4. Navigate to MQL{platformId === 'mt4' ? '4' : '5'} → Indicators</li>
                              <li>5. Copy the downloaded file here</li>
                              <li>6. Restart {platform.name}</li>
                              <li>7. Drag indicator onto your chart</li>
                            </>
                          ) : platformId === 'tradingview' ? (
                            <>
                              <li>1. Copy the invite link above</li>
                              <li>2. Open TradingView and login</li>
                              <li>3. Click Indicators → Invite-only scripts</li>
                              <li>4. Paste your invite link</li>
                              <li>5. Apply indicator to your chart</li>
                            </>
                          ) : (
                            <>
                              <li>1. Download and extract the ZIP file</li>
                              <li>2. Open NinjaTrader</li>
                              <li>3. Go to Tools → Import → NinjaScript</li>
                              <li>4. Select the extracted file</li>
                              <li>5. Restart NinjaTrader</li>
                              <li>6. Apply to your chart</li>
                            </>
                          )}
                        </ol>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
          >
            <BookOpen className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">User Manual</h3>
            <button className="text-[#00FF88] text-sm hover:underline">Download PDF</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
          >
            <Settings className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Customization</h3>
            <button className="text-[#00FF88] text-sm hover:underline">View Guide</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
          >
            <Users className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Community</h3>
            <button className="text-[#00FF88] text-sm hover:underline">Join Discord</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
          >
            <LayoutDashboard className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Dashboard</h3>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-[#00FF88] text-sm hover:underline"
            >
              Manage Account
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Next Steps</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Download the indicator', desc: 'Use the download buttons above', time: '2 min' },
              { step: 2, title: 'Install and configure', desc: 'Follow our step-by-step guide', time: '5 min' },
              { step: 3, title: 'Apply to your first chart', desc: 'Test with demo account', time: '10 min' },
              { step: 4, title: 'Study trading strategies', desc: 'Learn professional techniques', time: '30 min' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00FF88] font-bold">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                  <p className="text-white/40 text-xs mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[#00FF88]" />
            <h2 className="text-2xl font-bold text-white">Need Help?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#00FF88]/50 transition-all flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#00FF88]" />
              <span>Email Support</span>
            </button>
            <button className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#00FF88]/50 transition-all flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#00FF88]" />
              <span>WhatsApp Chat</span>
            </button>
            <button className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#00FF88]/50 transition-all flex items-center gap-2">
              <Video className="w-5 h-5 text-[#00FF88]" />
              <span>Schedule Call</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IndicatorSuccessPage;
