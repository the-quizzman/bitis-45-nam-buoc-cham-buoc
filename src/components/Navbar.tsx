import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SectionTab } from '../types';

interface NavbarProps {
  onOpenRegister: (distance?: '5KM' | '10KM' | '21KM', isFamily?: boolean) => void;
  onOpenLookup: () => void;
  currentView: 'landing' | 'admin';
  setCurrentView: (view: 'landing' | 'admin') => void;
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
}

export const NAV_ITEMS: { id: string; tab: SectionTab; label: string }[] = [
  { id: 'heritage', tab: 'heritage', label: 'Di sản 45 năm' },
  { id: 'distances', tab: 'distances', label: 'Cự ly & Tiếp sức' },
  { id: 'route-schedule', tab: 'route-schedule', label: 'Cung đường & Lịch trình' },
  { id: 'benefits', tab: 'benefits', label: 'Quyền lợi VĐV' },
  { id: 'news-gallery', tab: 'news-gallery', label: 'Tin tức & Ảnh' },
  { id: 'faq-sponsors', tab: 'faq-sponsors', label: 'Hỏi đáp & Đối tác' },
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
        const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
        const scrollPosition = window.scrollY + 140;

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

  const handleNavClick = (itemId: string, tab: SectionTab) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('landing');
    }
    setActiveTab(tab);

    setTimeout(() => {
      const element = document.getElementById(itemId);
      if (element) {
        const navHeight = 72;
        const targetPosition = element.offsetTop - navHeight;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200/80'
          : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('heritage', 'heritage')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-xl text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="font-heading font-black text-lg tracking-tighter">45</span>
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-black text-lg tracking-tight text-[#005BAC] leading-none">
                BITI’S
              </span>
              <span className="text-[11px] font-bold tracking-wider text-orange-600 uppercase mt-0.5">
                BƯỚC CHẠM BƯỚC
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-[13px] font-bold">
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentView === 'landing' &&
                (currentSection === item.id || activeTab === item.tab);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.tab)}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-extrabold shadow-2xs'
                      : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Tra cứu Button */}
            <button
              onClick={onOpenLookup}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-orange-600 hover:bg-orange-50/80 rounded-lg transition-all cursor-pointer border border-slate-200/80 hover:border-orange-200"
              title="Tra cứu BIB & thông tin đăng ký"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Tra cứu</span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={() => setCurrentView(currentView === 'landing' ? 'admin' : 'landing')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Chuyển chế độ Admin"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentView === 'admin' ? 'Trang chủ' : 'Admin'}</span>
            </button>

            {/* Primary Register CTA Button */}
            <button
              onClick={() => onOpenRegister()}
              className="relative group overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-extrabold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>ĐĂNG KÝ NGAY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenRegister()}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-bold text-xs uppercase px-3 py-2 rounded-lg shadow-xs"
            >
              ĐĂNG KÝ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-orange-600 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1 font-semibold text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentView === 'landing' &&
                (currentSection === item.id || activeTab === item.tab);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.tab)}
                  className={`text-left py-2.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup();
                }}
                className="w-full py-2.5 px-3 bg-slate-100 text-slate-800 font-bold rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-600" />
                Tra cứu thông tin đăng ký
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView(currentView === 'admin' ? 'landing' : 'admin');
                }}
                className="w-full py-2.5 px-3 bg-slate-900 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                {currentView === 'admin' ? 'Quay lại Trang chủ' : 'Trang quản trị (Admin)'}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-heading font-extrabold rounded-lg text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                ĐĂNG KÝ THAM GIA NGAY
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
