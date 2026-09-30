/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DistanceType, RegistrationType, SectionTab } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RaceDistances } from './components/RaceDistances';
import { HistoryTimeline } from './components/HistoryTimeline';
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
      const navOffset = 76;
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
      heritage: 'heritage',
      distances: 'distances',
      family: 'distances',
      route: 'route-schedule',
      schedule: 'route-schedule',
      'route-schedule': 'route-schedule',
      benefits: 'benefits',
      news: 'news-gallery',
      gallery: 'news-gallery',
      'news-gallery': 'news-gallery',
      sponsors: 'faq-sponsors',
      faq: 'faq-sponsors',
      'faq-sponsors': 'faq-sponsors',
    };

    const targetId = map[cleanId] || cleanId;
    scrollToSection(targetId);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#18233A] font-sans selection:bg-[#F26522] selection:text-white">
      {/* Sticky Navigation (76px height, editorial aesthetic) */}
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
          {/* VIEWPORT 1: HERO (3-second comprehension: 45th anniversary, BƯỚC CHẠM BƯỚC, date, location, main CTA) */}
          <Hero
            onRegisterClick={() => handleOpenRegister()}
            onExploreClick={() => scrollToSection('distances')}
          />

          {/* VIEWPORT 2: CỰ LY THI ĐẤU (4 large editorial tiles: 5KM, 10KM, 21KM, Tiếp sức gia đình 3 thế hệ) */}
          <div id="distances" className="scroll-mt-20">
            <RaceDistances
              onSelectDistance={(d) => handleOpenRegister(d, false)}
              onSelectFamily={() => handleOpenRegister(undefined, true)}
            />
          </div>

          {/* VIEWPORT 3: DI SẢN 45 NĂM (Horizontal timeline: 1982 → 2000s → Today → 2027) */}
          <div id="heritage" className="scroll-mt-20">
            <HistoryTimeline />
          </div>

          {/* VIEWPORT 4: HÀNH TRÌNH & CUNG ĐƯỜNG SALA */}
          <div id="route-schedule" className="scroll-mt-20">
            <RouteMap />
            <RaceSchedule />
          </div>

          {/* VIEWPORT 5: VẬT PHẨM & QUYỀN LỢI VẬN ĐỘNG VIÊN */}
          <div id="benefits" className="scroll-mt-20">
            <AthleteBenefits />
          </div>

          {/* VIEWPORT 6: TIN TỨC & KHOẢNH KHẮC RUNNER */}
          <div id="news-gallery" className="scroll-mt-20">
            <NewsSection />
            <GallerySection />
          </div>

          {/* VIEWPORT 7: CÂU HỎI THƯỜNG GẶP (FAQ) & ĐỐI TÁC ĐỒNG HÀNH */}
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
                className="hidden sm:inline-flex items-center gap-2 px-5 py-3 bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Đăng ký ngay</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-3 bg-white text-[#18233A] hover:text-[#F26522] rounded-xl shadow-lg border border-[#EEE5D7] transition-transform active:scale-95 cursor-pointer"
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
