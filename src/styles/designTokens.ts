/**
 * Biti's 45 Năm Marathon - Design Tokens System
 * Unified design tokens across all landing sections, admin dashboard, and modal dialogs.
 */

export const tokens = {
  // Brand Colors
  colors: {
    brandBlue: '#005BAC',       // Biti's Corporate Heritage Blue
    brandOrange: '#FF6B00',     // Campaign Primary Energy Orange
    brandAmber: '#F59E0B',      // Sunrise / Speed Amber
    brandEmerald: '#10B981',    // Net Zero / Sustainable Green
    slateMain: '#0F172A',       // Main text / Slate 900
    slateMuted: '#64748B',      // Secondary text / Slate 500
    slateSubtle: '#94A3B8',     // Helper text / Slate 400
    surfaceBg: '#F8FAFC',       // Global background / Slate 50
    surfaceCard: '#FFFFFF',     // Card surface
    borderDefault: '#E2E8F0',   // Slate 200
    borderSubtle: '#F1F5F9',    // Slate 100
  },

  // Typography Tokens
  typography: {
    sectionSub: 'text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block',
    sectionTitle: 'font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-slate-900',
    sectionDesc: 'mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto',
    cardTitle: 'font-heading font-black text-lg sm:text-xl text-slate-900',
    bodyText: 'text-slate-600 text-sm leading-relaxed',
    statNumber: 'font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight',
  },

  // Component UI Tokens
  components: {
    // Primary Action Button (Orange-Amber Energy Gradient)
    buttonPrimary:
      'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer',

    // Secondary Dark Button
    buttonSecondary:
      'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs active:scale-95 transition-all cursor-pointer',

    // Outline / Ghost Button
    buttonOutline:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-orange-600 border border-slate-200 hover:border-orange-300 font-heading font-bold text-xs uppercase tracking-wide transition-all cursor-pointer shadow-2xs',

    // Standard Container
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

    // Section Padding
    sectionPadding: 'py-16 md:py-24',

    // Base Card
    card: 'bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all',

    // Accent Card (Highlighted with subtle orange tint)
    cardAccent: 'bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-white rounded-2xl border-2 border-orange-200/90 shadow-xs',

    // Input Control
    input:
      'w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all',

    // Segmented Tab Controller
    segmentedTabWrapper: 'inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80',
    segmentedTabActive: 'bg-white text-slate-900 font-bold shadow-xs',
    segmentedTabInactive: 'text-slate-600 hover:text-slate-900 font-medium',

    // Modal Wrapper Shell
    modalOverlay: 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200',
    modalDialog: 'bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-slate-900',
    modalHeader: 'px-5 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-between shrink-0 shadow-sm',
    modalFooter: 'p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0',
  },
};
