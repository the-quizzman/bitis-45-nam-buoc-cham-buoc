import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { SectionTab } from '../types';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenLookup: () => void;
  currentView: 'landing' | 'admin';
  setCurrentView: (view: 'landing' | 'admin') => void;
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
}

export const NAV_ITEMS = [
  { id: 'heritage', label: 'Di sản' },
  { id: 'distances', label: 'Cự ly' },
  { id: 'route-schedule', label: 'Hành trình' },
  { id: 'benefits', label: 'Quyền lợi' },
  { id: 'news-gallery', label: 'Tin tức' },
  { id: 'faq-sponsors', label: 'FAQ' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenLookup,
  currentView,
  setCurrentView,
  activeTab,
  setActiveTab,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('heritage');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy detection
      if (currentView === 'landing') {
        if (window.scrollY < 300) {
          setCurrentSection('');
          return;
        }

        const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
        const scrollPosition = window.scrollY + 160;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setCurrentSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavClick = (itemId: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('landing');
    }
    setActiveTab(itemId as SectionTab);

    setTimeout(() => {
      const element = document.getElementById(itemId);
      if (element) {
        const navHeight = 76;
        const targetPosition = element.offsetTop - navHeight;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F1]/95 backdrop-blur-md border-b border-[#EEE5D7] shadow-[0_2px_12px_rgba(24,35,58,0.03)]'
          : 'bg-[#FAF7F1]/80 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Left: Biti's 45 Anniversary Campaign Logo */}
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentSection('');
            }}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#005EB8] flex items-center justify-center text-white font-heading font-black text-lg tracking-tighter shadow-xs group-hover:bg-[#F26522] transition-colors">
              45
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-[#005EB8] leading-none group-hover:text-[#F26522] transition-colors">
                BITI’S
              </span>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#526077] mt-1">
                Bước Chạm Bước
              </span>
            </div>
          </div>

          {/* Center: Clean Text Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-heading font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#F26522]'
                      : 'text-[#18233A]/75 hover:text-[#18233A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26522] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Tra cứu & Primary Đăng ký CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenLookup}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-heading font-bold text-[#18233A]/80 hover:text-[#005EB8] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Tra cứu BIB</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span>Đăng ký</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-3.5 py-2 rounded-lg bg-[#F26522] text-white font-heading font-bold text-xs uppercase cursor-pointer"
            >
              Đăng ký
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#18233A] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F1] border-b border-[#EEE5D7] shadow-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-base font-heading font-bold ${
                  currentSection === item.id
                    ? 'text-[#F26522] bg-[#EEE5D7]/50'
                    : 'text-[#18233A] hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EEE5D7] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#18233A]/20 text-[#18233A] font-heading font-bold text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Tra cứu thông tin đăng ký / BIB</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
