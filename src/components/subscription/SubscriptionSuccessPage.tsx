import { motion } from 'framer-motion';
import { Check, Download, MessageCircle, Bell, LayoutDashboard, BookOpen, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionSuccessPageProps {
  subscription: {
    id: string;
    plan: string;
    amount: string;
    status: string;
    startDate: string;
    nextBilling: string;
    paymentMethod: string;
    email: string;
  };
  serviceName: string;
  whatsappLink?: string;
}

const SubscriptionSuccessPage = ({ subscription, serviceName, whatsappLink }: SubscriptionSuccessPageProps) => {
  const navigate = useNavigate();

  const handleEnableNotifications = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
            Welcome to the Trading Community! 🎉
          </h1>
          <p className="text-white/70 text-lg">Your subscription is active</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Subscription Confirmation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-white/60 text-sm mb-1">Subscription ID</p>
              <p className="text-white font-mono">{subscription.id}</p>
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
              <p className="text-white/60 text-sm mb-1">Status</p>
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-green-400 text-sm font-semibold">{subscription.status}</span>
              </div>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Started</p>
              <p className="text-white">{subscription.startDate}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Next Billing</p>
              <p className="text-white">{subscription.nextBilling}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Payment Method</p>
              <p className="text-white">{subscription.paymentMethod}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Email</p>
              <p className="text-white">{subscription.email}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-[#00FF88] hover:underline text-sm">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>

          <div className="mt-6 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-4">
            <p className="text-white/80 text-sm">
              Check your inbox! We've sent subscription confirmation to <span className="text-[#00FF88] font-semibold">{subscription.email}</span>
            </p>
            <button className="text-[#00FF88] text-sm hover:underline mt-2">
              Didn't receive? Resend email
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {whatsappLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 border-2 border-[#00FF88]/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Join Trade Alerts Group</h3>
              <p className="text-white/70 text-sm mb-4">Get instant notifications for every trade signal</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all"
              >
                Join WhatsApp Group
              </a>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-[#00FF88]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Enable Push Notifications</h3>
            <p className="text-white/70 text-sm mb-4">Never miss a trade alert with browser notifications</p>
            <button
              onClick={handleEnableNotifications}
              className="w-full py-3 rounded-xl font-semibold text-white border-2 border-white/20 hover:border-[#00FF88]/50 transition-all"
            >
              Enable Notifications
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
              <LayoutDashboard className="w-6 h-6 text-[#00FF88]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">View Your Dashboard</h3>
            <p className="text-white/70 text-sm mb-4">Track your subscription and past signals</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 rounded-xl font-semibold text-white border-2 border-white/20 hover:border-[#00FF88]/50 transition-all"
            >
              Go to Dashboard
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Start Receiving Trade Alerts</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00FF88] font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Join the WhatsApp/Telegram group now</h3>
                <p className="text-white/60 text-sm">You'll start receiving alerts immediately</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00FF88] font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Enable notifications on all your devices</h3>
                <p className="text-white/60 text-sm">Stay updated even when you're not actively trading</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00FF88] font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Review today's market analysis</h3>
                <p className="text-white/60 text-sm mb-2">Catch up on current opportunities</p>
                <button className="text-[#00FF88] text-sm hover:underline">View Today's Signals →</button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00FF88] font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Read the trading guidelines</h3>
                <p className="text-white/60 text-sm mb-2">Understand how to use our signals effectively</p>
                <button className="text-[#00FF88] text-sm hover:underline">Download Guide →</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[#0066FF] flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-3">About Your Subscription</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• You'll be charged {subscription.amount} on {subscription.nextBilling}</li>
                <li>• Access continues as long as subscription is active</li>
                <li>• Cancel anytime from your account dashboard</li>
                <li>• Refunds available within first 7 days (pro-rated)</li>
                <li>• You'll receive email reminder 3 days before each billing</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-[#00FF88]" />
            <h3 className="text-white font-bold">Need Help Getting Started?</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#00FF88]/50 transition-all text-sm">
              Join Live Onboarding Call
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#00FF88]/50 transition-all text-sm">
              Watch Setup Tutorial
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#00FF88]/50 transition-all text-sm">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
