import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Download,
  Mail,
  Users,
  BookOpen,
  Calendar,
  Play,
  Gift,
  Shield,
  MessageCircle,
  Phone,
  LayoutDashboard,
  FileText,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface EnrollmentData {
  id: string;
  order_id: string;
  transaction_id: string | null;
  full_name: string;
  email: string;
  service_name: string;
  final_amount: number;
  payment_method: string;
  created_at: string;
}

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emailResent, setEmailResent] = useState(false);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventBack);

    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  const preventBack = () => {
    window.history.pushState(null, '', window.location.href);
  };

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const orderId = searchParams.get('order_id');

        if (!orderId) {
          setError(true);
          setLoading(false);
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        const { data, error: dbError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('order_id', orderId)
          .eq('status', 'completed')
          .single();

        if (dbError || !data) {
          setError(true);
          setLoading(false);
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        setEnrollment(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching enrollment:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [searchParams, navigate]);

  const handleResendEmail = () => {
    setEmailResent(true);
    setTimeout(() => setEmailResent(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-[#00FF88] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading your confirmation...</p>
        </div>
      </div>
    );
  }

  if (error || !enrollment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628] flex items-center justify-center p-4">
        <motion.div
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Order Found</h2>
          <p className="text-white/70 mb-4">We couldn't find your order confirmation.</p>
          <p className="text-white/50 text-sm">Redirecting you to homepage...</p>
        </motion.div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-[#00FF88]/20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00FF88]/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CheckCircle className="w-14 h-14 text-[#00FF88] relative z-10" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome Aboard! 🎉
          </motion.h1>
          <motion.p
            className="text-xl text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your enrollment is confirmed
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-[#1A2942]/80 backdrop-blur-xl border border-[#00FF88]/30 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Order ID</span>
                <span className="text-white font-semibold">{enrollment.order_id}</span>
              </div>
              {enrollment.transaction_id && (
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Transaction ID</span>
                  <span className="text-white font-mono text-sm">{enrollment.transaction_id}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Date</span>
                <span className="text-white">{formatDate(enrollment.created_at)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Amount Paid</span>
                <span className="text-[#00FF88] font-bold text-2xl">
                  ₹{enrollment.final_amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Payment Method</span>
                <span className="text-white capitalize">{enrollment.payment_method}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-white/60">Email</span>
                <span className="text-white">{enrollment.email}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
          </div>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Mail className="w-8 h-8 text-[#0066FF] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-white/80 mb-2">
                  We've sent confirmation and access details to <span className="font-semibold">{enrollment.email}</span>
                </p>
                <p className="text-white/60 text-sm">
                  Didn't receive it? Check your spam folder or{' '}
                  <button
                    onClick={handleResendEmail}
                    className="text-[#00FF88] hover:underline font-semibold"
                  >
                    Resend Email
                  </button>
                </p>
                {emailResent && (
                  <p className="text-[#00FF88] text-sm mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Email sent successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-black text-white text-center mb-8">What's Next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-[#1A2942]/80 backdrop-blur-xl border border-[#00FF88]/30 rounded-2xl p-8 text-center hover:border-[#00FF88]/50 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#0066FF] to-[#00FF88] rounded-full flex items-center justify-center mx-auto mb-6">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Access Your Dashboard</h3>
              <p className="text-white/70 mb-6">
                Start learning immediately with your course materials
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-bold hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all"
              >
                Go to Dashboard
              </button>
            </motion.div>

            <motion.div
              className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Download Syllabus</h3>
              <p className="text-white/70 mb-6">Get the complete course curriculum PDF</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all">
                Download Syllabus
              </button>
            </motion.div>

            <motion.div
              className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Join Community Group</h3>
              <p className="text-white/70 mb-6">Connect with fellow traders and get support</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all">
                Join Now
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-3xl font-black text-white text-center mb-8">
            Your Learning Journey Starts Now
          </h2>
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: 'Check your email for login credentials',
                subtitle: 'Username and password sent to your email',
              },
              {
                icon: Download,
                title: 'Download your course materials and resources',
                subtitle: 'PDFs, spreadsheets, and trading templates',
              },
              {
                icon: Calendar,
                title: 'Join our next live trading session',
                subtitle: 'Schedule: Every Monday & Thursday at 7:00 PM IST',
                button: 'View Full Schedule',
              },
              {
                icon: Users,
                title: 'Introduce yourself in the community',
                subtitle: 'Share your trading goals and connect with others',
              },
              {
                icon: Play,
                title: 'Start with Module 1: Trading Fundamentals',
                subtitle: 'Begin your journey with the basics',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-[#1A2942]/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex items-start gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-[#00FF88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-[#00FF88]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.subtitle}</p>
                  {step.button && (
                    <button className="mt-3 text-[#00FF88] hover:underline text-sm font-semibold">
                      {step.button}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/30 rounded-2xl p-8">
            <div className="flex items-start gap-6">
              <Gift className="w-12 h-12 text-[#00FF88] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Bonus: Exclusive Resources Unlocked!
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    'Trading journal template',
                    'Risk calculator spreadsheet',
                    'Market analysis checklists',
                    'Exclusive webinar recordings',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-[#00FF88] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                  Access Bonus Materials
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <div className="bg-[#1A2942]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Need Help Getting Started?</h3>
              <p className="text-white/70">
                Our support team is here to help you every step of the way
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="mailto:hi@realitigrowth.com"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-6 text-center transition-all group"
              >
                <Mail className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">Email Us</p>
                <p className="text-white/60 text-sm">hi@realitigrowth.com</p>
              </a>

              <a
                href="tel:+917019385981"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-6 text-center transition-all group"
              >
                <Phone className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">Call Us</p>
                <p className="text-white/60 text-sm">+91 70193 85981</p>
              </a>

              <a
                href="https://wa.me/917019385981"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-6 text-center transition-all group"
              >
                <MessageCircle className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">WhatsApp</p>
                <p className="text-white/60 text-sm">Chat with us</p>
              </a>

              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-6 text-center transition-all group">
                <Clock className="w-8 h-8 text-[#00FF88] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">Live Chat</p>
                <p className="text-white/60 text-sm">Start chatting now</p>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          <div className="flex items-center justify-center gap-2 text-white/80 mb-3">
            <Shield className="w-6 h-6 text-[#00FF88]" />
            <p className="text-lg font-semibold">Protected by our 30-Day Money-Back Guarantee</p>
          </div>
          <p className="text-white/60 mb-8">Not satisfied? Get a full refund, no questions asked</p>

          <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
            <button onClick={() => navigate('/')} className="hover:text-[#00FF88] transition-colors">
              Browse more courses
            </button>
            <span>•</span>
            <button onClick={() => navigate('/')} className="hover:text-[#00FF88] transition-colors">
              View pricing plans
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
