import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const MobileContactButtons = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0A1628]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-area-bottom">
      <div className="flex gap-2 max-w-md mx-auto">
        <motion.a
          href="tel:+917019385981"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Call us at +91 70193 85981"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </motion.a>

        <motion.a
          href="mailto:hi@realitigrowth.com?subject=Inquiry from Website"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00FF88] to-[#00CC6E] text-[#0A1628] px-4 py-3 rounded-xl font-semibold text-sm shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Email us at hi@realitigrowth.com"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </motion.a>

        <motion.a
          href="https://wa.me/917019385981?text=Hi%20RealitiGrowth%2C%20I%20would%20like%20to%20know%20more%20about%20your%20trading%20courses."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#1EBE57] text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </motion.a>
      </div>
    </div>
  );
};

export default MobileContactButtons;
