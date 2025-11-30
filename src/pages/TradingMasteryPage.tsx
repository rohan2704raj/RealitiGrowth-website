import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import EnrollmentFlow from '../components/enrollment/EnrollmentFlow';
import LeadCaptureModal from '../components/syllabus/LeadCaptureModal';
import ThankYouModal from '../components/syllabus/ThankYouModal';
import type { LeadData } from '../components/syllabus/LeadCaptureModal';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
import {
  BookOpen,
  TrendingUp,
  Target,
  Trophy,
  ChevronDown,
  Play,
  Download,
  Award,
  Check,
  Shield,
  Clock,
  Users,
  Star,
  BarChart3,
  LineChart,
  DollarSign,
  Brain,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

const TradingMasteryPage = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [floatingCTA, setFloatingCTA] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');

  useState(() => {
    const handleScroll = () => {
      setFloatingCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const modules = [
    {
      number: 1,
      title: 'Trading Fundamentals & Market Psychology',
      lessons: 6,
      duration: '4.5 hours',
      topics: [
        'Understanding market participants and order flow',
        'The psychology of winning and losing trades',
        'Building a trader\'s mindset',
        'Market structure across different asset classes',
      ],
      resources: 'PDF guides, psychology worksheets',
    },
    {
      number: 2,
      title: 'Technical Analysis Masterclass',
      lessons: 15,
      duration: '12 hours',
      topics: [
        'Chart types and when to use each',
        'Timeframe analysis and correlation',
        'Price action fundamentals',
        'Volume analysis techniques',
        'Multiple timeframe confluence',
      ],
      resources: 'Cheat sheets, practice charts',
    },
    {
      number: 3,
      title: 'Chart Patterns & Price Action',
      lessons: 10,
      duration: '8 hours',
      topics: [
        'Classical chart patterns (Head & Shoulders, Double Tops/Bottoms)',
        'Continuation patterns (Flags, Pennants, Triangles)',
        'Reversal patterns and early detection',
        'Pattern failure and false breakouts',
      ],
      resources: 'Pattern recognition guide, examples database',
    },
    {
      number: 4,
      title: 'Candlestick Patterns Deep Dive',
      lessons: 8,
      duration: '6 hours',
      topics: [
        'Single candlestick patterns',
        'Multi-candlestick formations',
        'Japanese candlestick psychology',
        'High-probability candlestick setups',
      ],
      resources: 'Candlestick encyclopedia PDF',
    },
    {
      number: 5,
      title: 'Support & Resistance Strategies',
      lessons: 7,
      duration: '5 hours',
      topics: [
        'Identifying key support and resistance zones',
        'Dynamic vs. static levels',
        'Supply and demand zones',
        'Trading breakouts and fakeouts',
      ],
      resources: 'Level plotting worksheet',
    },
    {
      number: 6,
      title: 'Trend Analysis & Market Structure',
      lessons: 9,
      duration: '7 hours',
      topics: [
        'Defining trends across timeframes',
        'Market structure breaks',
        'Trend continuation vs. reversal signals',
        'Trading with and against the trend',
      ],
      resources: 'Trend identification checklist',
    },
    {
      number: 7,
      title: 'Trading Indicators & Oscillators',
      lessons: 12,
      duration: '10 hours',
      topics: [
        'Moving averages strategies',
        'RSI, MACD, Stochastic deep dive',
        'Bollinger Bands and volatility indicators',
        'Creating multi-indicator systems',
        'Avoiding indicator overload',
      ],
      resources: 'Indicator settings guide, MT4/TradingView templates',
    },
    {
      number: 8,
      title: 'Forex Market Specifics',
      lessons: 8,
      duration: '6.5 hours',
      topics: [
        'Currency pair correlations',
        'Trading major, minor, and exotic pairs',
        'Fundamental analysis for forex',
        'Economic calendar and news trading',
      ],
      resources: 'Forex pair correlation matrix',
    },
    {
      number: 9,
      title: 'Cryptocurrency Trading Strategies',
      lessons: 10,
      duration: '8 hours',
      topics: [
        'Crypto market dynamics and volatility',
        'Altcoin vs. Bitcoin trading',
        'On-chain analysis basics',
        'Risk management in 24/7 markets',
      ],
      resources: 'Crypto exchange setup guide',
    },
    {
      number: 10,
      title: 'Risk Management & Position Sizing',
      lessons: 6,
      duration: '5 hours',
      topics: [
        'The 1% rule and risk per trade',
        'Position sizing calculators',
        'Stop loss placement strategies',
        'Managing winning and losing streaks',
      ],
      resources: 'Risk calculator spreadsheet',
    },
    {
      number: 11,
      title: 'Trading Psychology & Discipline',
      lessons: 5,
      duration: '4 hours',
      topics: [
        'Overcoming fear and greed',
        'Dealing with losses',
        'Maintaining discipline',
        'Creating your trading routine',
      ],
      resources: 'Psychology workbook, daily journal template',
    },
    {
      number: 12,
      title: 'Live Trading Sessions & Case Studies',
      lessons: 20,
      duration: '30 hours',
      topics: [
        'Real-time trade execution',
        'Market analysis walkthroughs',
        'Trade management from entry to exit',
        'Reviewing wins and losses',
      ],
      resources: 'Session recordings, trade breakdown PDFs',
    },
  ];

  const features = [
    { icon: BookOpen, text: 'HD video lessons with subtitles' },
    { icon: Download, text: 'Downloadable resources & cheat sheets' },
    { icon: Target, text: 'Interactive quizzes & assignments' },
    { icon: BarChart3, text: 'Progress tracking dashboard' },
    { icon: Users, text: 'Community forum access' },
    { icon: Clock, text: 'Lifetime access to all content' },
  ];

  const bonuses = [
    { icon: BookOpen, title: 'Trading Journal Template', desc: 'Track every trade' },
    { icon: Shield, title: 'Risk Calculator', desc: 'Excel spreadsheet' },
    { icon: Check, title: 'Market Scanner Checklist', desc: 'Daily routine guide' },
    { icon: LineChart, title: 'Entry/Exit Worksheet', desc: 'Plan your trades' },
    { icon: Brain, title: 'Psychology Workbook', desc: '50-page guide' },
    { icon: Users, title: 'Trading Community', desc: 'Exclusive access' },
  ];

  const serviceDetails = {
    name: 'A-Z Stock, Forex & Crypto Mastering Program',
    price: '35,000',
    originalPrice: '50,000',
    features: [
      '120+ Video Lessons',
      'Live Trading Sessions',
      'Lifetime Access',
      'Certificate of Completion',
      'Community Access',
      'Downloadable Resources',
    ],
  };

  const handleEnrollClick = () => {
    setShowEnrollment(true);
  };

  const handleDownloadSyllabusClick = () => {
    setShowLeadCapture(true);
  };

  const handleLeadSubmit = async (data: LeadData) => {
    try {
      const { error } = await supabase.from('leads').insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        trading_experience: data.tradingExperience,
        wants_updates: data.wantsUpdates,
        source: 'A-Z Trading Mastery Program',
      });

      if (error) {
        console.error('Error saving lead:', error);
      }

      setLeadEmail(data.email);
      setShowLeadCapture(false);
      setShowThankYou(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleEnrollFromThankYou = () => {
    setShowThankYou(false);
    setShowEnrollment(true);
  };

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <ScrollProgress />

      {floatingCTA && (
        <motion.button
          onClick={handleEnrollClick}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-8 py-4 rounded-full font-bold shadow-2xl z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' }}
        >
          Enroll Now
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
              { label: 'A-Z Trading Mastery Program' },
            ]}
          />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6">
              Complete Trading{' '}
              <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
                Mastery Program
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl">
              Transform from beginner to professional trader with our comprehensive A-Z curriculum
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <Play className="w-5 h-5 text-[#00FF88]" />
                <span>120+ Video Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5 text-[#00FF88]" />
                <span>Live Trading Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5 text-[#00FF88]" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-5 h-5 text-[#00FF88]" />
                <span>Certificate Included</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#00FF88] fill-[#00FF88]" />
              ))}
              <span className="text-white/70 ml-2">4.9/5 (2,847 reviews)</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={handleEnrollClick}
                className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-8 py-4 rounded-full font-bold text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
              </motion.button>
              <motion.button
                onClick={handleDownloadSyllabusClick}
                className="bg-white/5 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                Download Syllabus
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
            What You'll{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Master
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Stock Market Trading',
                outcomes: ['Day trading strategies', 'Swing trading techniques', 'Long-term investing', 'Sector analysis'],
              },
              {
                icon: DollarSign,
                title: 'Forex Trading',
                outcomes: ['Currency pair analysis', 'Economic calendar reading', 'Pip calculation', 'Leverage management'],
              },
              {
                icon: BarChart3,
                title: 'Cryptocurrency Trading',
                outcomes: ['Altcoin strategies', 'On-chain analysis', '24/7 market tactics', 'DeFi opportunities'],
              },
              {
                icon: Shield,
                title: 'Risk Management',
                outcomes: ['Position sizing', 'Stop loss strategies', 'Portfolio protection', 'Drawdown recovery'],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <item.icon className="w-12 h-12 text-[#00FF88] mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.outcomes.map((outcome, i) => (
                    <li key={i} className="text-white/60 flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#00FF88] mt-1 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Learning Timeline</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { phase: '0-3 Months', title: 'Foundation', desc: 'Master the basics and build confidence' },
                { phase: '3-6 Months', title: 'Strategy', desc: 'Develop your trading system' },
                { phase: '6-12 Months', title: 'Mastery', desc: 'Achieve consistent profitability' },
              ].map((stage, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                    {index + 1}
                  </div>
                  <div className="text-[#00FF88] font-bold mb-2">{stage.phase}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{stage.title}</h4>
                  <p className="text-white/60">{stage.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Detailed{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Curriculum
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-12">
            12 comprehensive modules, 120+ lessons, 100+ hours of content
          </p>

          <div className="space-y-4">
            {modules.map((module) => (
              <motion.div
                key={module.number}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setExpandedModule(expandedModule === module.number ? null : module.number)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {module.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{module.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/60">
                        <span>{module.lessons} lessons</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedModule === module.number ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-white/60" />
                  </motion.div>
                </button>

                {expandedModule === module.number && (
                  <motion.div
                    className="px-6 pb-6 border-t border-white/10"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="pt-6">
                      <h4 className="text-white font-bold mb-3">Key Topics:</h4>
                      <ul className="space-y-2 mb-4">
                        {module.topics.map((topic, index) => (
                          <li key={index} className="text-white/70 flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#00FF88] mt-1 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <div className="text-sm text-white/60 mb-1">Downloadable Resources:</div>
                        <div className="text-white">{module.resources}</div>
                      </div>
                      <button className="text-[#00FF88] hover:text-[#00FF88]/80 font-semibold flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Preview Lesson
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
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
            Premium Learning{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <Play className="w-20 h-20 text-[#00FF88] mx-auto mb-4" />
                <div className="text-white/60">HD Video Player</div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#00FF88]" />
                  </div>
                  <div className="text-white">{feature.text}</div>
                </div>
              ))}
            </motion.div>
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
            Exclusive{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Bonuses
            </span>
          </motion.h2>
          <p className="text-white/60 text-center mb-12">
            Premium resources to accelerate your trading success
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <bonus.icon className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{bonus.title}</h3>
                <p className="text-white/60">{bonus.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Award className="w-20 h-20 text-[#00FF88] mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white mb-4">
              Earn Your Trading Certification
            </h2>
            <p className="text-white/70 mb-6">
              Complete all modules and pass the final assessment to earn your professional trading certificate
            </p>
            <div className="flex items-center justify-center gap-4 text-white/60">
              <Check className="w-5 h-5 text-[#00FF88]" />
              <span>LinkedIn-shareable</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 rounded-2xl p-8 border border-[#00FF88]/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-[#00FF88]" />
              <h3 className="text-2xl font-bold text-white">30-Day Money-Back Guarantee</h3>
            </div>
            <p className="text-white/70 mb-6">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
            <motion.button
              onClick={handleEnrollClick}
              className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-12 py-4 rounded-full font-bold text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Risk-Free Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {showEnrollment && (
        <EnrollmentFlow service={serviceDetails} onClose={() => setShowEnrollment(false)} />
      )}

      {showLeadCapture && (
        <LeadCaptureModal
          isOpen={showLeadCapture}
          onClose={() => setShowLeadCapture(false)}
          onSubmit={handleLeadSubmit}
          serviceName={serviceDetails.name}
        />
      )}

      {showThankYou && (
        <ThankYouModal
          isOpen={showThankYou}
          onClose={() => setShowThankYou(false)}
          onEnroll={handleEnrollFromThankYou}
          email={leadEmail}
          serviceName={serviceDetails.name}
          servicePrice={serviceDetails.price}
          originalPrice={serviceDetails.originalPrice}
        />
      )}
    </div>
  );
};

export default TradingMasteryPage;
