/**
 * Biti's 45 Năm Marathon - Design Tokens System (2026 Contemporary Editorial Edition)
 * Inspired by Nike Running editorial layouts and contemporary Vietnamese brand campaigns.
 */

export const tokens = {
  // Brand & Supporting Palette
  colors: {
    // Primary Accents
    brandOrange: '#F26522', // Action / Movement / Highlight
    brandBlue: '#005EB8',   // Trust / Brand / Navigation accents
    ink: '#18233A',         // Primary typography & high contrast

    // Sophisticated Neutral Supporting Palette
    warmBg: '#FAF7F1',      // Warm off-white / soft ivory (Hero & editorial)
    coolBg: '#F3F7FA',      // Very light cool gray (Alternating sections)
    surface: '#FFFFFF',     // Pure surface (Editorial tiles / cards)
    softSand: '#EEE5D7',    // Dividers / borders / subtle chips
    paleMint: '#E7F1E7',    // Sustainable / eco highlights

    // Text & Slate Variants
    textPrimary: '#18233A',
    textMuted: '#526077',
    textSubtle: '#8C9BAE',
    borderLight: '#E8EDF2',
    borderSand: '#E5DCCE',
  },

  // Typography Scales
  typography: {
    heroEyebrow: 'text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-[#005EB8]',
    heroTitle: 'font-heading font-black text-6xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tighter leading-[0.88] text-[#18233A]',
    heroSub: 'font-heading font-bold text-lg sm:text-2xl text-[#18233A] tracking-tight',
    sectionEyebrow: 'text-xs font-heading font-bold tracking-widest text-[#F26522] uppercase mb-2 inline-block',
    sectionTitle: 'font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#18233A]',
    sectionDesc: 'mt-3 text-[#526077] text-base leading-relaxed max-w-2xl',
    tileTitle: 'font-heading font-black text-2xl lg:text-3xl text-[#18233A] tracking-tight',
    bodyText: 'text-[#526077] text-sm sm:text-base leading-relaxed',
  },

  // Component Shells
  components: {
    // Primary Action Button (Pure Biti's Orange, bold, direct)
    buttonPrimary:
      'inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer',

    // Secondary Dark Button (Ink)
    buttonSecondary:
      'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#18233A] hover:bg-[#253658] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer',

    // Ghost / Outline Button (Editorial)
    buttonOutline:
      'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-black/5 text-[#18233A] border border-[#18233A]/20 hover:border-[#18233A] font-heading font-bold text-xs uppercase tracking-wide transition-all cursor-pointer',

    // Main Content Containers
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerWide: 'max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8',

    // Section Spacing (96px - 140px as per guideline)
    sectionPadding: 'py-24 sm:py-32',

    // Editorial Tile (Border radius 12-16px, restrained border, subtle shadow)
    tile: 'bg-white rounded-2xl border border-[#E8EDF2] p-6 sm:p-8 hover:border-[#F26522]/40 transition-all duration-300 shadow-[0_2px_12px_rgba(24,35,58,0.04)]',

    // Input Control
    input:
      'w-full px-4 py-3 rounded-xl bg-white border border-[#E8EDF2] focus:border-[#F26522] focus:ring-2 focus:ring-[#F26522]/15 text-sm text-[#18233A] placeholder:text-[#8C9BAE] outline-none transition-all',

    // Modal
    modalOverlay: 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#18233A]/60 backdrop-blur-sm animate-in fade-in duration-200',
    modalDialog: 'bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8EDF2] text-[#18233A]',
  },
};
