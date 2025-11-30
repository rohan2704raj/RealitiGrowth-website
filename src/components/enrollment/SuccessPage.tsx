import { motion } from 'framer-motion';
import { CheckCircle, Download, Users, Calendar, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnrollmentLayout from './EnrollmentLayout';

interface SuccessPageProps {
  orderDetails: {
    orderId: string;
    transactionId: string;
    email: string;
    serviceName: string;
    amount: number;
  };
}

const SuccessPage = ({ orderDetails }: SuccessPageProps) => {
  const handleDownloadReceipt = () => {
    alert('Receipt download functionality would be implemented here');
  };

  return (
    <EnrollmentLayout currentStep={3} hideOrderSummary>
      <div className="max-w-5xl mx-auto pb-12">
        <motion.div
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-[#00FF88]/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-[#00FF88]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Welcome Aboard! 🎉</h2>
            <p className="text-xl text-white/70">Your enrollment is confirmed</p>
          </motion.div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Order ID</p>
                <p className="text-white font-mono font-bold">{orderDetails.orderId}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Transaction ID</p>
                <p className="text-white font-mono font-bold">{orderDetails.transactionId}</p>
              </div>
            </div>
            <button
              onClick={handleDownloadReceipt}
              className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Receipt (PDF)
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 border border-[#00FF88]/30 rounded-xl p-6 mb-6">
            <p className="text-white text-center">
              📧 We've sent confirmation and access details to{' '}
              <span className="font-bold text-[#00FF88]">{orderDetails.email}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-[#00FF88]/30 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Access Dashboard</h3>
              <p className="text-white/60 text-sm mb-4">Start learning immediately</p>
              <Link to="/dashboard">
                <button className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all">
                  Go to Dashboard
                </button>
              </Link>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-[#00FF88]/30 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Download Syllabus</h3>
              <p className="text-white/60 text-sm mb-4">Get the full curriculum</p>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white py-2 rounded-lg font-semibold transition-colors">
                Download PDF
              </button>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-[#00FF88]/30 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Join Community</h3>
              <p className="text-white/60 text-sm mb-4">Connect with traders</p>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white py-2 rounded-lg font-semibold transition-colors">
                Join Group
              </button>
            </motion.div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#00FF88]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Check your email for login credentials</p>
                  <p className="text-white/60 text-sm">
                    You'll receive your dashboard access details within 5 minutes
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Download className="w-4 h-4 text-[#00FF88]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Download course materials</p>
                  <p className="text-white/60 text-sm">
                    Access all PDFs, cheat sheets, and templates
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-[#00FF88]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Join our live session schedule</p>
                  <p className="text-white/60 text-sm">
                    Weekly live trading sessions and Q&A
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0066FF]/10 to-[#00FF88]/10 border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-white font-bold mb-2">Need Help?</h3>
            <p className="text-white/60 mb-4">
              Our support team is here to help you get started
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@realitigrowth.com"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </EnrollmentLayout>
  );
};

export default SuccessPage;
