import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Target,
  Shield,
  Bell,
  Settings,
  Download,
  Check,
  Star,
  Award,
  Zap,
  BarChart3,
  LineChart,
  Activity,
  Lightbulb,
  Lock,
  Smartphone,
  Monitor,
  Code,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import IndicatorSubscriptionFlow from '../components/subscription/IndicatorSubscriptionFlow';

const IndicatorPage = () => {
  const [floatingCTA, setFloatingCTA] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('4H');
  const [showSubscriptionFlow, setShowSubscriptionFlow] = useState(false);

  const indicatorService = {
    id: 'indicator',
    name: 'RealitiGrowth Indicator',
    price: '₹1,999/month',
    originalPrice: '₹5,000',
    billingCycle: 'Monthly subscription • Cancel anytime',
    features: [
      'Multi-Timeframe Analysis',
      'Custom Alerts',
      '73% Accuracy Rate',
      'MT4/MT5 Compatible',
      'TradingView Integration',
      'NinjaTrader Support',
      'Lifetime Updates',
    ],
  };

  useState(() => {
    const handleScroll = () => {
      setFloatingCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const features = [
    {
      icon: Target,
      title: 'Smart Entry Signals',
      desc: 'Green arrows for buy, red for sell with confidence levels',
      details: ['High/Medium/Low confidence indicator', 'Works on any timeframe (1m to 1D+)', 'Filtered for quality over quantity'],
    },
    {
      icon: TrendingUp,
      title: 'Trend Detection',
      desc: 'Real-time trend strength and direction analysis',
      details: ['Color-coded trend zones', 'Strength meter (0-100)', 'Early reversal warnings'],
    },
    {
      icon: LineChart,
      title: 'Dynamic S&R Levels',
      desc: 'Automatically plots key support and resistance',
      details: ['Auto-updates as price moves', 'Historical accuracy tracking', 'Multiple timeframe levels'],
    },
    {
      icon: Shield,
      title: 'Risk Management',
      desc: 'Built-in position sizing and stop-loss calculator',
      details: ['Automatic stop-loss suggestions', 'Risk-to-reward display', 'Position size calculator'],
    },
    {
      icon: Bell,
      title: 'Custom Alerts',
      desc: 'Never miss an opportunity with smart notifications',
      details: ['Price level alerts', 'Signal alerts', 'Mobile push notifications'],
    },
    {
      icon: Activity,
      title: 'Multi-Asset Compatible',
      desc: 'Works across stocks, forex, crypto, and commodities',
      details: ['Optimized for each market', 'Universal application', 'Backtested on 1000+ instruments'],
    },
  ];

  const platforms = [
    { name: 'MetaTrader 4', icon: Monitor, compatible: true },
    { name: 'MetaTrader 5', icon: Monitor, compatible: true },
    { name: 'TradingView', icon: LineChart, compatible: true },
    { name: 'NinjaTrader', icon: BarChart3, compatible: true },
  ];

  const performanceData = [
    { market: 'Forex', winRate: '71%', avgRR: '1:2.3' },
    { market: 'Stocks', winRate: '75%', avgRR: '1:2.7' },
    { market: 'Crypto', winRate: '69%', avgRR: '1:2.1' },
    { market: 'Commodities', winRate: '73%', avgRR: '1:2.5' },
  ];

  const testimonials = [
    {
      name: 'Rahul M.',
      role: 'Day Trader',
      quote: 'My win rate improved by 35% within the first month. The signal accuracy is incredible.',
      rating: 5,
    },
    {
      name: 'Anjali K.',
      role: 'Swing Trader',
      quote: 'Finally, an indicator that doesnt repaint! Saved me from countless false signals.',
      rating: 5,
    },
    {
      name: 'Suresh T.',
      role: 'Forex Trader',
      quote: 'The risk management features alone are worth the investment. Game-changer.',
      rating: 5,
    },
  ];

  if (showSubscriptionFlow) {
    return <IndicatorSubscriptionFlow service={indicatorService} />;
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
          Get Indicator
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
              { label: 'RealitiGrowth Indicator' },
            ]}
          />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6">
              Your Trading{' '}
              <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
                Edge
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl">
              Proprietary trading indicator combining AI precision with proven technical analysis
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <LineChart className="w-5 h-5 text-[#00FF88]" />
                <span>Multi-Timeframe Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Bell className="w-5 h-5 text-[#00FF88]" />
                <span>Custom Alerts</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Target className="w-5 h-5 text-[#00FF88]" />
                <span>73% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Activity className="w-5 h-5 text-[#00FF88]" />
                <span>All Asset Classes</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-4 py-2"
                >
                  <platform.icon className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-white/80 text-sm">{platform.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => setShowSubscriptionFlow(true)}
                className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-8 py-4 rounded-full font-bold text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Indicator
              </motion.button>
              <motion.button
                className="bg-white/5 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.5)' }}
              >
                <Download className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
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
            What is{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              RealitiGrowth Indicator?
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-16 max-w-3xl mx-auto">
            A proprietary trading indicator that identifies high-probability entry points, detects trend reversals early, and calculates optimal stop-loss and take-profit levels automatically
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center w-full">
                <div className="flex items-center justify-between mb-4 text-xs text-white/50">
                  {['1H', '4H', '1D', '1W'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setActiveTimeframe(tf)}
                      className={`px-3 py-1 rounded ${
                        activeTimeframe === tf ? 'bg-[#00FF88]/20 text-[#00FF88]' : ''
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <div className="relative h-48 border-l-2 border-b-2 border-white/20">
                  <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-green-400 rounded-full" />
                  <div className="absolute bottom-0 left-1/4 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-green-400" />
                  <div className="absolute bottom-24 right-1/4 w-2 h-2 bg-red-400 rounded-full" />
                  <div className="absolute bottom-24 right-1/4 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-red-400" />
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 0 180 Q 50 160, 100 140 T 200 100 T 300 80"
                      stroke="rgba(0, 255, 136, 0.5)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="text-white/60 text-sm mt-4">Live Chart with Signals</div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {[
                'Identifies high-probability entry points',
                'Detects trend reversals early',
                'Calculates optimal stop-loss and take-profit',
                'Filters out false signals automatically',
                'Works across all timeframes and assets',
                'Adapts to market volatility in real-time',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#00FF88] flex-shrink-0 mt-1" />
                  <span className="text-white text-lg">{item}</span>
                </div>
              ))}
            </motion.div>
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
            Powerful{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Features
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <feature.icon className="w-12 h-12 text-[#00FF88] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 mb-4">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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
            The Science{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Behind It
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-16 max-w-3xl mx-auto">
            RealitiGrowth uses advanced algorithms combining machine learning and proven technical analysis
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Lightbulb, title: 'Data Input', desc: 'Price, volume, momentum' },
              { icon: Activity, title: 'Analysis', desc: 'Pattern recognition' },
              { icon: Zap, title: 'Signal Generation', desc: 'High-probability setups' },
              { icon: Bell, title: 'Alert', desc: 'Instant notification' },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">10+ Years</div>
                <div className="text-white/60">Backtested Data</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">50+ Markets</div>
                <div className="text-white/60">Tested Across</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">100K+</div>
                <div className="text-white/60">Backtested Trades</div>
              </div>
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
            Performance{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Metrics
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-12">
            Tested across multiple markets and timeframes
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {performanceData.map((data, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{data.market}</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-[#00FF88] mb-1">{data.winRate}</div>
                  <div className="text-white/60 text-sm">Win Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{data.avgRR}</div>
                  <div className="text-white/60 text-sm">Avg Risk:Reward</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 rounded-2xl p-8 border border-[#00FF88]/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">73% Overall Win Rate</h3>
            <p className="text-white/60">Across all markets and timeframes</p>
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
            Customize to{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Your Style
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Settings className="w-12 h-12 text-[#00FF88] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-6">Adjustable Parameters</h3>
              <div className="space-y-4">
                {[
                  { label: 'Sensitivity', value: 'Balanced' },
                  { label: 'Alert Type', value: 'All Signals' },
                  { label: 'Risk Level', value: 'Moderate' },
                  { label: 'Timeframe Focus', value: '4H' },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white/70">{setting.label}</span>
                    <span className="text-[#00FF88] font-bold">{setting.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {[
                { title: 'Conservative', desc: 'Fewer, higher-quality signals' },
                { title: 'Balanced', desc: 'Optimal quality-quantity ratio' },
                { title: 'Aggressive', desc: 'More opportunities, higher frequency' },
              ].map((preset, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-[#00FF88]/30 transition-colors cursor-pointer"
                >
                  <h4 className="text-lg font-bold text-white mb-2">{preset.title}</h4>
                  <p className="text-white/60">{preset.desc}</p>
                </div>
              ))}
            </motion.div>
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
            Easy{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Installation
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { step: 1, title: 'Purchase & Download', desc: 'Instant delivery to your email', icon: Download },
              { step: 2, title: 'Install on Platform', desc: 'Video tutorial included', icon: Code },
              { step: 3, title: 'Configure & Trade', desc: 'Guided setup wizard', icon: Settings },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">24/7 Technical Support</h3>
            <p className="text-white/60 mb-6">
              Get help anytime with our dedicated support team. Setup assistance included in first 48 hours.
            </p>
            <div className="flex items-center justify-center gap-8 text-white/60">
              <div>
                <div className="text-2xl font-bold text-white">&lt; 2 hrs</div>
                <div className="text-sm">Avg Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
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
            What Traders{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Are Saying
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#00FF88] fill-[#00FF88]" />
                  ))}
                </div>
                <p className="text-white/70 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-white/50 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 rounded-2xl p-12 border border-[#00FF88]/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Lock className="w-16 h-16 text-[#00FF88] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Get Your Trading Edge Today
            </h2>
            <p className="text-white/70 text-lg mb-2">One-Time Payment - Lifetime Access</p>
            <p className="text-white/60 mb-8">
              30-Day Money-Back Guarantee. No questions asked.
            </p>
            <motion.button
              onClick={() => setShowSubscriptionFlow(true)}
              className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-12 py-4 rounded-full font-bold text-lg mb-6"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get RealitiGrowth Indicator
            </motion.button>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-[#00FF88]" />
              <span className="text-white/70">Secure Payment - SSL Encrypted</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndicatorPage;
