import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

const Footer = () => {
  const links = {
    company: ['About Us', 'Our Team', 'Careers', 'Press'],
    services: ['A-Z Program', 'Copy Trades', 'Indicator', 'Coaching'],
    support: ['Help Center', 'Contact Us', 'FAQ', 'Community'],
    legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Disclaimer'],
  };

  const socials = [
    { icon: Facebook, url: '#' },
    { icon: Twitter, url: '#' },
    { icon: Instagram, url: '#' },
    { icon: Youtube, url: '#' },
    { icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-[#0A1628] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="lg:col-span-2">
            <motion.div
              className="mb-4 md:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/realitigrowth-logo.png.png"
                alt="RealitiGrowth Logo"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain"
              />
            </motion.div>
            <p className="text-sm md:text-base text-white/60 mb-4 md:mb-6">
              Empowering traders worldwide to achieve financial freedom through
              professional education and proven strategies.
            </p>
            <div className="flex gap-3 md:gap-4">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FF88] hover:border-[#00FF88]/50 transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Company</h4>
            <ul className="space-y-2 text-sm md:text-base">
              {links.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Services</h4>
            <ul className="space-y-2 text-sm md:text-base">
              {links.services.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Support</h4>
            <ul className="space-y-2 text-sm md:text-base">
              {links.support.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2 text-sm md:text-base">
              {links.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#00FF88]/50"
                />
                <motion.button
                  className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Contact Info</h4>
              <div className="space-y-2 text-white/60 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <a href="mailto:hi@realitigrowth.com" className="break-all hover:text-[#00FF88] transition-colors">hi@realitigrowth.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <a href="tel:+917019385981" className="hover:text-[#00FF88] transition-colors">+91 70193 85981</a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 mt-1" />
                  <span>No 639, 3rd Cross, 1st Main, Mahalakshmi Layout, Bangalore - 560086</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-white/40 text-xs md:text-sm text-center md:text-left">
            <p>© 2025 RealitiGrowth. All rights reserved.</p>
            <p>
              Trading involves risk. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
