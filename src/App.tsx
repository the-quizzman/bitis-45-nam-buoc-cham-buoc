/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DistanceType, RegistrationType, SectionTab } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { HistoryTimeline } from './components/HistoryTimeline';
import { BigIdeaSection } from './components/BigIdeaSection';
import { RaceDistances } from './components/RaceDistances';
import { RouteMap } from './components/RouteMap';
import { RaceSchedule } from './components/RaceSchedule';
import { AthleteBenefits } from './components/AthleteBenefits';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { SponsorsSection } from './components/SponsorsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { RegistrationLookup } from './components/RegistrationLookup';
import { AdminDashboard } from './components/AdminDashboard';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');
  const [activeTab, setActiveTab] = useState<SectionTab>('heritage');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState<DistanceType | undefined>(undefined);
  const [selectedRegType, setSelectedRegType] = useState<RegistrationType>('personal');
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenRegister = (distance?: DistanceType, isFamily?: boolean) => {
    setSelectedDistance(distance);
    setSelectedRegType(isFamily ? 'family' : 'personal');
    setIsRegisterOpen(true);
  };

  const handleOpenLookup = () => {
    setIsLookupOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigateTab = (tabOrHash: string) => {
    const cleanId = tabOrHash.replace('#', '');
    const map: Record<string, string> = {
      hero: 'heritage',
      story: 'heritage',
      distances: 'distances',
      family: 'distances',
      route: 'route-schedule',
      schedule: 'route-schedule',
      benefits: 'benefits',
      news: 'news-gallery',
      gallery: 'news-gallery',
      sponsors: 'faq-sponsors',
      faq: 'faq-sponsors',
      heritage: 'heritage',
      'route-schedule': 'route-schedule',
      'news-gallery': 'news-gallery',
      'faq-sponsors': 'faq-sponsors',
    };

    const targetId = map[cleanId] || cleanId;
    scrollToSection(targetId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenLookup={handleOpenLookup}
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      {currentView === 'landing' ? (
        <main>
          {/* CỤM 1: DI SẢN 45 NĂM & THÔNG ĐIỆP BƯỚC CHẠM BƯỚC */}
          <div id="heritage" className="scroll-mt-20">
            <Hero
              onRegisterClick={() => handleOpenRegister()}
              onExploreClick={() => scrollToSection('distances')}
            />
            <Countdown />
            <BigIdeaSection />
            <HistoryTimeline />
          </div>

          {/* CỤM 2: CỰ LY & TIẾP SỨC GIA ĐÌNH 3 THẾ HỆ */}
          <div id="distances" className="scroll-mt-20">
            <RaceDistances
              onSelectDistance={(d) => handleOpenRegister(d, false)}
              onSelectFamily={() => handleOpenRegister(undefined, true)}
            />
          </div>

          {/* CỤM 3: CUNG ĐƯỜNG SALA & LỊCH TRÌNH */}
          <div id="route-schedule" className="scroll-mt-20">
            <RouteMap />
            <RaceSchedule />
          </div>

          {/* CỤM 4: QUYỀN LỢI & TRỌN BỘ RACE KIT */}
          <div id="benefits" className="scroll-mt-20">
            <AthleteBenefits />
          </div>

          {/* CỤM 5: BẢN TIN SỰ KIỆN & KHOẢNH KHẮC RUNNER */}
          <div id="news-gallery" className="scroll-mt-20">
            <NewsSection />
            <GallerySection />
          </div>

          {/* CỤM 6: CÂU HỎI THƯỜNG GẶP (FAQ) & ĐỐI TÁC ĐỒNG HÀNH */}
          <div id="faq-sponsors" className="scroll-mt-20">
            <FaqSection />
            <SponsorsSection />
          </div>

          {/* Footer */}
          <Footer
            onOpenRegister={() => handleOpenRegister()}
            onOpenLookup={handleOpenLookup}
            onNavigate={handleNavigateTab}
            onSelectTab={setActiveTab}
          />

          {/* Floating Action Button (Scroll to top & Quick register) */}
          {showScrollTop && (
            <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <button
                onClick={() => handleOpenRegister()}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/30 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Đăng ký ngay</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-3 bg-white text-slate-700 hover:text-orange-600 rounded-xl shadow-lg border border-slate-200 transition-transform active:scale-95 cursor-pointer"
                title="Lên đầu trang"
                aria-label="Lên đầu trang"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      ) : (
        /* Admin Dashboard View */
        <AdminDashboard onBackToLanding={() => setCurrentView('landing')} />
      )}

      {/* Registration Wizard Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialDistance={selectedDistance}
        initialType={selectedRegType}
        onViewLookup={() => {
          setIsRegisterOpen(false);
          setIsLookupOpen(true);
        }}
      />

      {/* Registration Lookup Modal */}
      <RegistrationLookup
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onOpenRegister={() => {
          setIsLookupOpen(false);
          handleOpenRegister();
        }}
      />
    </div>
  );
}
