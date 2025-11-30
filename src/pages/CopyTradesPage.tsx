import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bell,
  TrendingUp,
  Users,
  MessageSquare,
  Shield,
  Clock,
  Check,
  Star,
  Target,
  Zap,
  BarChart3,
  Award,
  Play,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import SubscriptionFlow from '../components/subscription/SubscriptionFlow';

const CopyTradesPage = () => {
  const [floatingCTA, setFloatingCTA] = useState(false);
  const [showSubscriptionFlow, setShowSubscriptionFlow] = useState(false);

  const subscriptionService = {
    id: 'copy-trades',
    name: "Copy My Trades Call's Group",
    price: '₹1,999/month',
    originalPrice: '₹5,000',
    billingCycle: 'Monthly subscription • Cancel anytime',
    features: [
      'Real-Time Alerts',
      'High Win Rate (78%)',
      'All Markets Covered',
      'Entry/Exit Points',
      'Risk Management Guidance',
      'Daily Trade Setups',
    ],
  };

  useState(() => {
    const handleScroll = () => {
      setFloatingCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const sampleAlerts = [
    {
      date: 'Jan 15, 2025',
      market: 'Forex',
      type: 'Buy',
      pair: 'USD/INR',
      entry: '83.50',
      stopLoss: '83.10',
      takeProfit: '84.20',
      result: 'Won',
      gain: '+2.3%',
      rationale: 'Strong bullish divergence on 4H chart with support holding at key level. Economic data favoring USD strength against INR.',
    },
    {
      date: 'Jan 14, 2025',
      market: 'Crypto',
      type: 'Sell',
      pair: 'BTC/USDT',
      entry: '₹35,50,000',
      stopLoss: '₹36,10,000',
      takeProfit: '₹34,25,000',
      result: 'Won',
      gain: '+3.5%',
      rationale: 'Overbought conditions on RSI, bearish engulfing pattern at resistance. Volume declining on rally.',
    },
    {
      date: 'Jan 13, 2025',
      market: 'Stocks',
      type: 'Buy',
      pair: 'RELIANCE',
      entry: '₹2,450',
      stopLoss: '₹2,400',
      takeProfit: '₹2,550',
      result: 'Won',
      gain: '+3.7%',
      rationale: 'Breakout above descending trendline with increased volume. Earnings catalyst expected.',
    },
    {
      date: 'Jan 12, 2025',
      market: 'Forex',
      type: 'Sell',
      pair: 'EUR/INR',
      entry: '90.20',
      stopLoss: '91.50',
      takeProfit: '88.40',
      result: 'Won',
      gain: '+1.7%',
      rationale: 'Double top formation at major resistance. INR strengthening on favorable trade data.',
    },
  ];

  const experts = [
    {
      name: 'Rajesh Kumar',
      specialty: 'Forex Expert',
      experience: '12 years',
      winRate: '76%',
      quote: 'Trading is about patience and probability, not prediction.',
    },
    {
      name: 'Priya Sharma',
      specialty: 'Crypto Specialist',
      experience: '8 years',
      winRate: '71%',
      quote: 'In crypto, volatility is your friend when you know how to dance.',
    },
    {
      name: 'Arjun Patel',
      specialty: 'Stock Market Pro',
      experience: '15 years',
      winRate: '78%',
      quote: 'The stock market rewards those who do their homework.',
    },
  ];

  const communityFeatures = [
    { icon: MessageSquare, title: 'Live Trading Room', desc: 'Daily sessions 9 AM - 4 PM IST' },
    { icon: Users, title: 'Member Forum', desc: 'Connect with 500+ active traders' },
    { icon: BarChart3, title: 'Trade Journal Sharing', desc: 'Learn from others\' experiences' },
    { icon: Play, title: 'Weekly Analysis Videos', desc: 'Expert market breakdowns' },
    { icon: Award, title: 'Performance Reviews', desc: 'Monthly strategy evaluations' },
    { icon: Target, title: 'Q&A Sessions', desc: 'Direct access to experts' },
  ];

  const platforms = [
    { name: 'Telegram', icon: MessageSquare, desc: 'Instant notifications' },
    { name: 'Discord', icon: Users, desc: 'Community hub' },
    { name: 'Mobile App', icon: Smartphone, desc: 'iOS & Android' },
    { name: 'Email', icon: Bell, desc: 'Detailed alerts' },
  ];

  if (showSubscriptionFlow) {
    return (
      <SubscriptionFlow
        service={subscriptionService}
        whatsappLink="https://chat.whatsapp.com/your-group-invite-link"
      />
    );
  }

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <ScrollProgress />

      {floatingCTA && (
        <motion.button
          onClick={() => setShowSubscriptionFlow(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-8 py-4 rounded-full font-bold shadow-2xl z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' }}
        >
          Join Community
        </motion.button>
      )}

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066FF]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FF88]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/#services' },
              { label: "Copy My Trades Call's Group" },
            ]}
          />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6">
              Trade Alongside{' '}
              <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
                Expert Traders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl">
              Receive real-time trade alerts and learn from live market opportunities daily
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <Target className="w-5 h-5 text-[#00FF88]" />
                <span>78% Win Rate</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5 text-[#00FF88]" />
                <span>500+ Active Members</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Bell className="w-5 h-5 text-[#00FF88]" />
                <span>Daily Trade Alerts</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <BarChart3 className="w-5 h-5 text-[#00FF88]" />
                <span>All Markets</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
                <span className="text-white/70">245 members online now</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => setShowSubscriptionFlow(true)}
                className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-8 py-4 rounded-full font-bold text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Join Community
              </motion.button>
              <motion.button
                className="bg-white/5 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.5)' }}
              >
                <Play className="w-5 h-5" />
                See Sample Alerts
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: Target,
                title: 'Expert Identifies',
                desc: 'Our traders spot high-probability opportunities across markets',
              },
              {
                step: 2,
                icon: Zap,
                title: 'Alert Sent Instantly',
                desc: 'Notification reaches you in under 30 seconds',
              },
              {
                step: 3,
                icon: Bell,
                title: 'Full Trade Details',
                desc: 'Receive entry, stop-loss, take-profit, and rationale',
              },
              {
                step: 4,
                icon: TrendingUp,
                title: 'Trade & Learn',
                desc: 'Execute the trade and understand the strategy behind it',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 text-[#00FF88]/50" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-[#00FF88]/30 rounded-full px-6 py-3">
              <Clock className="w-5 h-5 text-[#00FF88]" />
              <span className="text-white">Average alert speed: &lt; 30 seconds</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Recent{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Winning Alerts
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-12">
            Real alerts from our expert traders with documented results
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {sampleAlerts.map((alert, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-[#00FF88]/30 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/50">{alert.date}</span>
                    <span className="px-3 py-1 bg-[#00FF88]/10 text-[#00FF88] text-xs font-bold rounded-full">
                      {alert.market}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    alert.type === 'Buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {alert.type}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{alert.pair}</h3>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-white/50 mb-1">Entry</div>
                    <div className="text-white font-bold">{alert.entry}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">Stop Loss</div>
                    <div className="text-white font-bold">{alert.stopLoss}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">Take Profit</div>
                    <div className="text-white font-bold">{alert.takeProfit}</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <div className="text-xs text-white/50 mb-1">Rationale:</div>
                  <p className="text-sm text-white/70">{alert.rationale}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-white/70">{alert.result}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{alert.gain}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 rounded-2xl p-6 border border-[#00FF88]/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-2">
              <Target className="w-6 h-6 text-[#00FF88]" />
              <span className="text-2xl font-bold text-white">78% Overall Win Rate</span>
            </div>
            <p className="text-white/60 text-sm">
              Past performance does not guarantee future results. Trading involves risk.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Types of{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Trade Alerts
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-12">
            Three distinct trading styles to match your schedule and goals
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Swing Trades',
                duration: '2-5 Days',
                icon: TrendingUp,
                features: ['Detailed technical analysis', 'Multiple position levels', 'Perfect for part-time traders', '3-5 alerts per week'],
              },
              {
                title: 'Day Trades',
                duration: 'Intraday',
                icon: Zap,
                features: ['Quick scalping opportunities', 'Fast-paced action', 'For active traders', '5-10 alerts daily'],
              },
              {
                title: 'Long-Term Positions',
                duration: 'Weeks-Months',
                icon: Target,
                features: ['Fundamental + technical', 'Investment-grade setups', 'Lower frequency', 'High conviction trades'],
              },
            ].map((type, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 hover:border-[#00FF88]/30 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <type.icon className="w-12 h-12 text-[#00FF88] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{type.title}</h3>
                <div className="text-[#00FF88] font-bold mb-6">{type.duration}</div>
                <ul className="space-y-3">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70">
                      <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More Than Just{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Alerts
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <feature.icon className="w-10 h-10 text-[#00FF88] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur border border-white/10 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Thriving Community</h3>
            <p className="text-white/70 mb-6">Join 500+ active traders sharing insights daily</p>
            <div className="flex items-center justify-center gap-8 text-white/60">
              <div>
                <div className="text-3xl font-bold text-white">1,200+</div>
                <div className="text-sm">Messages/Day</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">245</div>
                <div className="text-sm">Online Now</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet Your{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Signal Providers
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{expert.name}</h3>
                <div className="text-[#00FF88] font-bold mb-1">{expert.specialty}</div>
                <div className="text-white/60 text-sm mb-4">{expert.experience} experience</div>

                <div className="bg-white/5 rounded-lg py-3 mb-4">
                  <div className="text-3xl font-bold text-white">{expert.winRate}</div>
                  <div className="text-white/60 text-sm">Win Rate</div>
                </div>

                <p className="text-white/70 italic text-sm">"{expert.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Receive Alerts{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Anywhere
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-12">
            Choose your preferred platform - we've got you covered
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <platform.icon className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-white/60 text-sm">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 rounded-2xl p-12 border border-[#00FF88]/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-[#00FF88] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Join Risk-Free Today
            </h2>
            <p className="text-white/70 text-lg mb-2">14-Day Money-Back Guarantee</p>
            <p className="text-white/60 mb-8">
              Not seeing value? Get a full refund, no questions asked.
            </p>
            <motion.button
              onClick={() => setShowSubscriptionFlow(true)}
              className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-12 py-4 rounded-full font-bold text-lg mb-6"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Community
            </motion.button>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#00FF88] fill-[#00FF88]" />
              ))}
              <span className="text-white/70 ml-2">4.8/5 from 500+ members</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CopyTradesPage;
