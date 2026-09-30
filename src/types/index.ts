export type RegistrationType = 'personal' | 'family';

export type SectionTab =
  | 'heritage'        // Di sản 45 năm & Thông điệp
  | 'distances'       // Cự ly & Tiếp sức 3 thế hệ
  | 'route-schedule'  // Cung đường & Lịch trình
  | 'benefits'        // Quyền lợi VĐV & Race Kit
  | 'news-gallery'    // Tin tức & Thư viện ảnh
  | 'faq-sponsors'    // Hỏi đáp & Nhà tài trợ
  // Legacy aliases
  | 'route'
  | 'news'
  | 'sponsors-faq'
  | 'all';

export type DistanceType = '5KM' | '10KM' | '21KM';

export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type PaymentMethod = 'vnpay' | 'momo' | 'bank_transfer' | 'credit_card';

export type PaymentStatus = 'PAID' | 'PENDING' | 'CANCELLED';

export interface FamilyMember {
  id: string;
  fullName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  relationship: string;
  phone: string;
  shirtSize: ShirtSize;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface RegistrationRecord {
  id: string; // e.g. BITI45-892341
  bibNumber: string; // e.g. 5K-1042 or FR-042
  type: RegistrationType;
  distance: DistanceType | 'FAMILY_RELAY';
  createdAt: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number; // in VND
  isMockPrice: boolean;

  // Personal fields
  fullName?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  email?: string;
  idCard?: string;
  address?: string;
  shirtSize?: ShirtSize;
  runningExperience?: string;
  emergencyContact?: string;
  emergencyPhone?: string;

  // Family fields
  teamName?: string;
  representativeName?: string;
  representativePhone?: string;
  representativeEmail?: string;
  familyMembers?: FamilyMember[];

  // Terms
  healthDeclarationAccepted: boolean;
  termsAccepted: boolean;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  extendedStory: string;
  highlight: string;
  tag: string;
}

export interface RouteDetail {
  distance: DistanceType;
  title: string;
  startTime: string;
  cutOffTime: string;
  closeTime: string;
  elevation: string;
  description: string;
  streets: string[];
  stations: {
    water: number;
    electrolyte: number;
    medical: number;
    wc: number;
    cheer: number;
  };
  highlights: string[];
}

export interface FaqItem {
  id: string;
  category: 'register' | 'distance' | 'racekit' | 'raceday';
  question: string;
  answer: string;
  isOfficialPending?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'all' | 'runner' | 'family' | 'bitis' | 'route' | 'stage' | 'checkin';
  title: string;
  caption: string;
  imageUrl: string;
  tag: string;
}
