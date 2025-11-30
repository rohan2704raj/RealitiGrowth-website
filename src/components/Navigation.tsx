import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A1628]/95 backdrop-blur-sm border-b border-white/10'
            : 'bg-[#0A1628]/80 md:bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex-shrink-0">
              <img
                src="/Your paragraph text (1) copy.png"
                alt="RealitiGrowth Logo"
                className="h-6 md:h-7 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>

            <div className="hidden md:flex space-x-8">
              {isHomePage ? (
                ['Mentor', 'Services', 'Curriculum', 'Results', 'FAQ'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item === 'Mentor' ? 'about' : item.toLowerCase())}
                    className="text-white/80 hover:text-white transition-colors relative group text-sm lg:text-base"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))
              ) : (
                <Link to="/#services" className="text-white/80 hover:text-white transition-colors relative group text-sm lg:text-base">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
            </div>

            {isHomePage ? (
              <button
                onClick={() => scrollToSection('services')}
                className="hidden md:block bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-sm lg:text-base hover:shadow-lg hover:shadow-[#00FF88]/30 transition-all active:scale-95"
              >
                Get Started
              </button>
            ) : (
              <Link to="/#services" className="hidden md:block">
                <button className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-sm lg:text-base hover:shadow-lg hover:shadow-[#00FF88]/30 transition-all active:scale-95">
                  Get Started
                </button>
              </Link>
            )}

            <button
              className="md:hidden text-white p-2 -mr-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A1628]/98 backdrop-blur-sm border-t border-white/10">
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {isHomePage ? (
                ['Mentor', 'Services', 'Curriculum', 'Results', 'FAQ'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item === 'Mentor' ? 'about' : item.toLowerCase())}
                    className="block w-full text-left text-white/80 hover:text-white py-3 text-base font-medium"
                  >
                    {item}
                  </button>
                ))
              ) : (
                <Link
                  to="/#services"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}
                  className="block w-full text-left text-white/80 hover:text-white py-3 text-base font-medium"
                >
                  Services
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection('services')}
                  className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-6 py-3 rounded-full font-semibold text-base mt-2"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  to="/#services"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}
                >
                  <button className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white px-6 py-3 rounded-full font-semibold text-base mt-2">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navigation;
