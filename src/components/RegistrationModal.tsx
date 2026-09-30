import React, { useState, useEffect } from 'react';
import {
  RegistrationType,
  DistanceType,
  ShirtSize,
  PaymentMethod,
  RegistrationRecord,
  FamilyMember,
} from '../types';
import { saveRegistration } from '../services/storage';
import { QRCodeDisplay } from './QRCodeDisplay';
import confetti from 'canvas-confetti';
import {
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  QrCode,
  Download,
  Mail,
  Search,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  Printer,
  Flame,
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDistance?: DistanceType;
  initialType?: RegistrationType;
  onViewLookup: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialDistance,
  initialType = 'personal',
  onViewLookup,
}) => {
  // Wizard steps: 1: Type -> 2: Distance -> 3: Info -> 4: Review -> 5: Mock Payment -> 6: Success
  const [step, setStep] = useState<number>(1);
  const [regType, setRegType] = useState<RegistrationType>(initialType);
  const [distance, setDistance] = useState<DistanceType>(initialDistance || '5KM');

  // Personal Fields
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idCard, setIdCard] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [shirtSize, setShirtSize] = useState<ShirtSize>('L');
  const [runningExperience, setRunningExperience] = useState('Người mới bắt đầu');
  const [healthDeclaration, setHealthDeclaration] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Family Fields
  const [teamName, setTeamName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativePhone, setRepresentativePhone] = useState('');
  const [representativeEmail, setRepresentativeEmail] = useState('');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 'm1',
      fullName: '',
      birthDate: '1960-01-01',
      gender: 'male',
      relationship: 'Thế hệ 1 (Ông / Bà)',
      phone: '',
      shirtSize: 'XL',
      emergencyContact: '',
      emergencyPhone: '',
    },
    {
      id: 'm2',
      fullName: '',
      birthDate: '1985-05-15',
      gender: 'male',
      relationship: 'Thế hệ 2 (Cha / Mẹ - Đội trưởng)',
      phone: '',
      shirtSize: 'L',
      emergencyContact: '',
      emergencyPhone: '',
    },
    {
      id: 'm3',
      fullName: '',
      birthDate: '2016-10-10',
      gender: 'female',
      relationship: 'Thế hệ 3 (Con / Cháu)',
      phone: '',
      shirtSize: 'XS',
      emergencyContact: '',
      emergencyPhone: '',
    },
  ]);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vnpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSimulatedNotice, setPaymentSimulatedNotice] = useState(false);

  // Completed record
  const [successRecord, setSuccessRecord] = useState<RegistrationRecord | null>(null);
  const [emailSentToast, setEmailSentToast] = useState(false);

  // Errors state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialDistance) {
      setDistance(initialDistance);
      setRegType('personal');
      setStep(3); // jump directly to form info
    } else if (initialType === 'family') {
      setRegType('family');
      setStep(3);
    }
  }, [initialDistance, initialType]);

  if (!isOpen) return null;

  // Mock Price calculations
  const getMockPrice = () => {
    if (regType === 'family') {
      return 990000; // 990,000 VND for family relay 3 members (3 thế hệ)
    }
    switch (distance) {
      case '5KM':
        return 350000;
      case '10KM':
        return 500000;
      case '21KM':
        return 700000;
      default:
        return 350000;
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  // Validation
  const validatePersonalInfo = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Vui lòng nhập Họ và tên';
    if (!phone.trim()) errs.phone = 'Vui lòng nhập Số điện thoại';
    else if (!/^[0-9]{9,11}$/.test(phone.replace(/\s+/g, '')))
      errs.phone = 'Số điện thoại không hợp lệ (9 - 11 chữ số)';
    if (!email.trim()) errs.email = 'Vui lòng nhập Email';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Email không hợp lệ';
    if (!idCard.trim()) errs.idCard = 'Vui lòng nhập CCCD/Hộ chiếu';
    if (!emergencyContact.trim())
      errs.emergencyContact = 'Vui lòng nhập người liên hệ khẩn cấp';
    if (!emergencyPhone.trim())
      errs.emergencyPhone = 'Vui lòng nhập SĐT người liên hệ khẩn cấp';
    if (!healthDeclaration)
      errs.healthDeclaration = 'Bạn cần xác nhận đủ điều kiện sức khỏe';
    if (!agreeTerms) errs.agreeTerms = 'Bạn cần đồng ý với điều lệ sự kiện';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateFamilyInfo = () => {
    const errs: Record<string, string> = {};
    if (!teamName.trim()) errs.teamName = 'Vui lòng nhập Tên đội gia đình';
    if (!representativeName.trim())
      errs.representativeName = 'Vui lòng nhập Họ tên người đại diện';
    if (!representativePhone.trim())
      errs.representativePhone = 'Vui lòng nhập SĐT người đại diện';
    if (!representativeEmail.trim())
      errs.representativeEmail = 'Vui lòng nhập Email người đại diện';
    if (!healthDeclaration)
      errs.healthDeclaration = 'Bạn cần xác nhận đủ sức khỏe cho đội';
    if (!agreeTerms) errs.agreeTerms = 'Bạn cần đồng ý với điều lệ giải';

    // validate members
    familyMembers.forEach((m, idx) => {
      if (!m.fullName.trim()) {
        errs[`member_${idx}_name`] = `Vui lòng nhập họ tên thành viên ${idx + 1}`;
      }
    });

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextFromStep3 = () => {
    if (regType === 'personal') {
      if (validatePersonalInfo()) {
        setStep(4);
      }
    } else {
      if (validateFamilyInfo()) {
        setStep(4);
      }
    }
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      // Generate random registration ID: BITI45-XXXXXX
      const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
      const regId = `BITI45-${randomSixDigits}`;

      // Generate BIB
      let bib = '';
      if (regType === 'family') {
        bib = `FR-${Math.floor(100 + Math.random() * 900)}`;
      } else {
        const prefix = distance === '21KM' ? '21K' : distance === '10KM' ? '10K' : '5K';
        bib = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      const newRecord: RegistrationRecord = {
        id: regId,
        bibNumber: bib,
        type: regType,
        distance: regType === 'family' ? 'FAMILY_RELAY' : distance,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        paymentStatus: 'PAID',
        paymentMethod: paymentMethod,
        totalAmount: getMockPrice(),
        isMockPrice: true,
        healthDeclarationAccepted: true,
        termsAccepted: true,

        // Personal
        fullName: regType === 'personal' ? fullName : undefined,
        birthDate: regType === 'personal' ? birthDate : undefined,
        gender: regType === 'personal' ? gender : undefined,
        phone: regType === 'personal' ? phone : undefined,
        email: regType === 'personal' ? email : undefined,
        idCard: regType === 'personal' ? idCard : undefined,
        address: regType === 'personal' ? address : undefined,
        shirtSize: regType === 'personal' ? shirtSize : undefined,
        runningExperience: regType === 'personal' ? runningExperience : undefined,
        emergencyContact: regType === 'personal' ? emergencyContact : undefined,
        emergencyPhone: regType === 'personal' ? emergencyPhone : undefined,

        // Family
        teamName: regType === 'family' ? teamName : undefined,
        representativeName: regType === 'family' ? representativeName : undefined,
        representativePhone: regType === 'family' ? representativePhone : undefined,
        representativeEmail: regType === 'family' ? representativeEmail : undefined,
        familyMembers: regType === 'family' ? familyMembers : undefined,
      };

      saveRegistration(newRecord);
      setSuccessRecord(newRecord);
      setStep(6);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // silent
      }
    }, 1200);
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleSendEmailSimulation = () => {
    setEmailSentToast(true);
    setTimeout(() => setEmailSentToast(false), 3500);
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, val: any) => {
    const list = [...familyMembers];
    list[index] = { ...list[index], [field]: val };
    setFamilyMembers(list);
  };

  const addFamilyMember = () => {
    if (familyMembers.length >= 6) return;
    const newIdx = familyMembers.length + 1;
    setFamilyMembers([
      ...familyMembers,
      {
        id: `m_${Date.now()}`,
        fullName: '',
        birthDate: '2005-01-01',
        gender: 'male',
        relationship: `Thành viên ${newIdx}`,
        phone: '',
        shirtSize: 'M',
        emergencyContact: '',
        emergencyPhone: '',
      },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    if (familyMembers.length <= 2) return;
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const stepNames = ['Hình thức', 'Cự ly', 'Thông tin', 'Xác nhận', 'Thanh toán'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-slate-900">
        
        {/* Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-heading font-black text-sm text-white">
              45
            </div>
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base uppercase tracking-tight">
                ĐĂNG KÝ THAM GIA BƯỚC CHẠM BƯỚC
              </h3>
              <span className="text-[10px] text-amber-100 block">
                Kỷ niệm 45 năm Biti's • 07/03/2027 Khu đô thị Sala
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        {step < 6 && (
          <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 shrink-0">
            {/* Desktop step labels */}
            <div className="hidden sm:flex items-center justify-between text-xs font-bold text-slate-500">
              <span className={step >= 1 ? 'text-orange-600' : ''}>1. Hình thức</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-orange-600' : ''}>2. Cự ly</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-orange-600' : ''}>3. Thông tin</span>
              <span>→</span>
              <span className={step >= 4 ? 'text-orange-600' : ''}>4. Xác nhận</span>
              <span>→</span>
              <span className={step >= 5 ? 'text-orange-600' : ''}>5. Thanh toán</span>
            </div>
            {/* Mobile single step label */}
            <div className="flex sm:hidden items-center justify-between text-xs font-bold text-slate-700">
              <span className="text-orange-600">BƯỚC {step} / 5</span>
              <span>{stepNames[step - 1]}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* ================= STEP 1: CHỌN HÌNH THỨC ================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  BƯỚC 1 / 5
                </span>
                <h4 className="font-heading font-black text-2xl text-slate-900 mt-1">
                  CHỌN HÌNH THỨC THAM GIA
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Bạn muốn tham gia thử thách bản thân với tư cách cá nhân hay cùng gia đình tiếp sức?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Personal Option */}
                <div
                  onClick={() => setRegType('personal')}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    regType === 'personal'
                      ? 'border-orange-500 bg-amber-50/50 shadow-md ring-2 ring-orange-500/20'
                      : 'border-slate-200 hover:border-orange-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                      <User className="w-6 h-6" />
                    </div>
                    <h5 className="font-heading font-black text-xl text-slate-900">
                      CÁ NHÂN
                    </h5>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Dành cho vận động viên tự do, người yêu thích chạy bộ. Tùy chọn 3 cự ly 5KM, 10KM hoặc 21KM.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-orange-600">
                    <span>Chọn cá nhân</span>
                    <CheckCircle2 className={`w-4 h-4 ${regType === 'personal' ? 'opacity-100' : 'opacity-20'}`} />
                  </div>
                </div>

                {/* Family Option */}
                <div
                  onClick={() => setRegType('family')}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    regType === 'family'
                      ? 'border-orange-500 bg-amber-50/50 shadow-md ring-2 ring-orange-500/20'
                      : 'border-slate-200 hover:border-orange-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h5 className="font-heading font-black text-xl text-slate-900">
                      GIA ĐÌNH TIẾP SỨC
                    </h5>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Đội 3 thành viên đại diện 3 thế hệ (Ông/bà, Cha/mẹ, Con cái). Tiếp sức trao gậy cùng nhau về đích.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-orange-600">
                    <span>Chọn đội gia đình</span>
                    <CheckCircle2 className={`w-4 h-4 ${regType === 'family' ? 'opacity-100' : 'opacity-20'}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: CHỌN CỰ LY ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  BƯỚC 2 / 5
                </span>
                <h4 className="font-heading font-black text-2xl text-slate-900 mt-1">
                  {regType === 'personal' ? 'CHỌN CỰ LY THI ĐẤU' : 'HẠNG MỤC GIA ĐÌNH 3 THẾ HỆ'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {regType === 'personal'
                    ? 'Chọn thử thách phù hợp với thể lực của bạn.'
                    : 'Hạng mục Family Relay tiêu chuẩn tiếp sức 3 chặng đại diện 3 thế hệ.'}
                </p>
              </div>

              {regType === 'personal' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['5KM', '10KM', '21KM'] as DistanceType[]).map((d) => (
                    <div
                      key={d}
                      onClick={() => setDistance(d)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-center flex flex-col justify-between ${
                        distance === d
                          ? 'border-orange-500 bg-amber-50/60 shadow-md ring-2 ring-orange-500/20'
                          : 'border-slate-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-heading font-black text-4xl text-slate-900 mb-1">
                          {d}
                        </div>
                        <div className="text-xs font-bold text-orange-600 uppercase">
                          {d === '5KM' ? 'Khởi Bước Đam Mê' : d === '10KM' ? 'Bứt Phá Giới Hạn' : 'Half Marathon'}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2">
                          {d === '5KM'
                            ? 'Người mới & trải nghiệm'
                            : d === '10KM'
                            ? 'Runner có kinh nghiệm'
                            : 'Thử thách đường dài'}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <span className="text-xs font-bold text-slate-800">
                          {formatCurrency(d === '5KM' ? 350000 : d === '10KM' ? 500000 : 700000)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">(Minh họa)</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h5 className="font-heading font-black text-xl text-amber-950 uppercase">
                    Hạng Mục Tiếp Sức 3 Thế Hệ (Family Relay)
                  </h5>
                  <p className="text-xs text-amber-800 max-w-md mx-auto leading-relaxed">
                    Mỗi đội gồm 3 thành viên đại diện cho 3 thế hệ (Ông/bà, Cha/mẹ, Con cháu) chạy nối tiếp nhau trên cung đường Sala. Cả 3 cùng hoàn thành và mỗi thành viên đều nhận Huy chương hoàn thành chính thức kỷ niệm 45 năm Biti's.
                  </p>
                  <div className="text-sm font-bold text-amber-900 pt-2">
                    Phí gói gia đình minh họa: {formatCurrency(990000)} / Đội 3 thế hệ
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3: THÔNG TIN (FORM) ================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  BƯỚC 3 / 5
                </span>
                <h4 className="font-heading font-black text-2xl text-slate-900">
                  {regType === 'personal'
                    ? `THÔNG TIN CÁ NHÂN (${distance})`
                    : 'THÔNG TIN ĐỘI & CÁC THÀNH VIÊN'}
                </h4>
                <p className="text-xs text-slate-500">
                  Vui lòng cung cấp thông tin chính xác theo CCCD/Hộ chiếu để nhận Race Kit và bảo hiểm sự kiện.
                </p>
              </div>

              {/* PERSONAL FORM */}
              {regType === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Họ và tên <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none ${
                          formErrors.fullName ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Ngày sinh */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Ngày sinh <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Giới tính */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Giới tính <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none bg-white"
                      >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Số điện thoại <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="0901234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none ${
                          formErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Email nhận vé <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none ${
                          formErrors.email ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CCCD */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Số CCCD / Hộ chiếu <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="079..."
                        value={idCard}
                        onChange={(e) => setIdCard(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none ${
                          formErrors.idCard ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                        }`}
                      />
                      {formErrors.idCard && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.idCard}</p>
                      )}
                    </div>

                    {/* Địa chỉ */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Địa chỉ cư trú
                      </label>
                      <input
                        type="text"
                        placeholder="TP. Hồ Chí Minh"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Size Áo */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Size Áo Chạy Biti's <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={shirtSize}
                        onChange={(e) => setShirtSize(e.target.value as ShirtSize)}
                        className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none bg-white font-bold"
                      >
                        <option value="XS">XS (Dưới 48kg)</option>
                        <option value="S">S (48 - 56kg)</option>
                        <option value="M">M (56 - 65kg)</option>
                        <option value="L">L (65 - 74kg)</option>
                        <option value="XL">XL (74 - 83kg)</option>
                        <option value="XXL">XXL (Trên 83kg)</option>
                      </select>
                    </div>

                    {/* Người liên hệ khẩn cấp */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Người liên hệ khẩn cấp <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Tên người thân"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none ${
                          formErrors.emergencyContact ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                        }`}
                      />
                    </div>

                    {/* SĐT khẩn cấp */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        SĐT khẩn cấp <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="0987654321"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-sm focus:outline-none ${
                          formErrors.emergencyPhone ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Kinh nghiệm chạy */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Kinh nghiệm chạy bộ
                    </label>
                    <input
                      type="text"
                      placeholder="Người mới bắt đầu, Chạy 15km/tuần, Đã hoàn thành HM..."
                      value={runningExperience}
                      onChange={(e) => setRunningExperience(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* FAMILY RELAY FORM */}
              {regType === 'family' && (
                <div className="space-y-6">
                  {/* Step 1 of Family: Team Info */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <h5 className="font-heading font-black text-sm uppercase text-neutral-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-red-600" />
                      1. THÔNG TIN ĐỘI GIA ĐÌNH
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                          Tên Đội Gia Đình <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Gia Đình Bước Chạm Bước"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                            formErrors.teamName ? 'border-red-500' : 'border-stone-200'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                          Người đại diện (Đội trưởng) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Họ tên người đại diện"
                          value={representativeName}
                          onChange={(e) => setRepresentativeName(e.target.value)}
                          className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                            formErrors.representativeName ? 'border-red-500' : 'border-stone-200'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                          Số điện thoại liên hệ <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="0912345678"
                          value={representativePhone}
                          onChange={(e) => setRepresentativePhone(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                          Email nhận xác nhận <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="email.giadinh@example.com"
                          value={representativeEmail}
                          onChange={(e) => setRepresentativeEmail(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2 of Family: Members list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-heading font-black text-sm uppercase text-neutral-900">
                        2. DANH SÁCH THÀNH VIÊN ({familyMembers.length} NGƯỜI)
                      </h5>
                      {familyMembers.length < 6 && (
                        <button
                          type="button"
                          onClick={addFamilyMember}
                          className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Thêm thành viên</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {familyMembers.map((member, idx) => (
                        <div
                          key={member.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="font-heading font-bold text-xs uppercase text-orange-600">
                              Thành viên #{idx + 1} ({member.relationship || 'Chặng ' + (idx + 1)})
                            </span>
                            {familyMembers.length > 2 && (
                              <button
                                type="button"
                                onClick={() => removeFamilyMember(idx)}
                                className="text-slate-400 hover:text-orange-600 text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Xóa</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">
                                Họ và tên
                              </label>
                              <input
                                type="text"
                                placeholder={`Họ tên người chạy ${idx + 1}`}
                                value={member.fullName}
                                onChange={(e) =>
                                  updateFamilyMember(idx, 'fullName', e.target.value)
                                }
                                className="w-full p-2 rounded-lg border border-stone-200 text-xs focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">
                                Mối quan hệ
                              </label>
                              <input
                                type="text"
                                placeholder="Ông, Cha, Mẹ, Con..."
                                value={member.relationship}
                                onChange={(e) =>
                                  updateFamilyMember(idx, 'relationship', e.target.value)
                                }
                                className="w-full p-2 rounded-lg border border-stone-200 text-xs focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">
                                Size Áo
                              </label>
                              <select
                                value={member.shirtSize}
                                onChange={(e) =>
                                  updateFamilyMember(idx, 'shirtSize', e.target.value)
                                }
                                className="w-full p-2 rounded-lg border border-stone-200 text-xs focus:outline-none bg-white font-bold"
                              >
                                <option value="XS">XS (Trẻ em/nhỏ)</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-stone-100 rounded-xl flex items-center justify-between text-xs font-semibold text-neutral-700">
                      <span>Số thành viên tham gia: <strong>{familyMembers.length} người</strong></span>
                      <span>Tổng phí minh họa: <strong className="text-red-600">{formatCurrency(getMockPrice())}</strong></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Health and Terms checkboxes */}
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={healthDeclaration}
                    onChange={(e) => setHealthDeclaration(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-stone-300"
                  />
                  <span className="text-xs text-neutral-600 leading-snug">
                    Tôi xác nhận bản thân (và các thành viên trong đội) có đầy đủ sức khỏe thể chất 
                    để tham gia thi đấu chạy bộ theo đúng cự ly đã chọn.
                  </span>
                </label>
                {formErrors.healthDeclaration && (
                  <p className="text-[11px] text-red-600">{formErrors.healthDeclaration}</p>
                )}

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-stone-300"
                  />
                  <span className="text-xs text-neutral-600 leading-snug">
                    Tôi đã đọc, hiểu rõ và đồng ý tuân thủ toàn bộ Điều lệ giải chạy Kỷ niệm 45 năm Biti's, 
                    chính sách bảo vệ quyền riêng tư và quy định an toàn giao thông của BTC.
                  </span>
                </label>
                {formErrors.agreeTerms && (
                  <p className="text-[11px] text-red-600">{formErrors.agreeTerms}</p>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 4: XÁC NHẬN THÔNG TIN (REVIEW) ================= */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  BƯỚC 4 / 5
                </span>
                <h4 className="font-heading font-black text-2xl text-slate-900 mt-1">
                  XÁC NHẬN THÔNG TIN ĐĂNG KÝ
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Kiểm tra lại toàn bộ chi tiết đăng ký trước khi tiếp tục thanh toán mô phỏng.
                </p>
              </div>

              <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200 space-y-4 text-xs">
                <div className="flex justify-between pb-3 border-b border-amber-200">
                  <span className="text-slate-500">Hình thức tham gia:</span>
                  <span className="font-bold text-slate-900 uppercase">
                    {regType === 'personal' ? 'Cá nhân' : 'Gia đình tiếp sức (Family Relay)'}
                  </span>
                </div>

                <div className="flex justify-between pb-3 border-b border-amber-200">
                  <span className="text-slate-500">Cự ly đăng ký:</span>
                  <span className="font-heading font-black text-orange-600 text-sm">
                    {regType === 'family' ? 'Family Relay (3 Chặng)' : distance}
                  </span>
                </div>

                {regType === 'personal' ? (
                  <>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">Họ và tên:</span>
                      <span className="font-bold text-slate-900">{fullName}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">Số điện thoại / Email:</span>
                      <span className="font-mono text-slate-900">{phone} • {email}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">CCCD:</span>
                      <span className="font-mono text-slate-900">{idCard}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">Size Áo thi đấu:</span>
                      <span className="font-bold text-slate-900">{shirtSize}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">Tên Đội Gia Đình:</span>
                      <span className="font-bold text-slate-900">{teamName}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">Đội trưởng:</span>
                      <span className="font-bold text-slate-900">{representativeName} ({representativePhone})</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-amber-200">
                      <span className="text-slate-500">Số thành viên:</span>
                      <span className="font-bold text-slate-900">{familyMembers.length} vận động viên</span>
                    </div>
                  </>
                )}

                {/* Price Breakdown */}
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Phí tham dự (Ưu đãi mở cổng):</span>
                    <span>{formatCurrency(getMockPrice())}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí tiện ích & bảo hiểm sự kiện:</span>
                    <span className="text-emerald-600 font-bold">0 VNĐ (Tài trợ bởi Biti's)</span>
                  </div>
                  <div className="flex justify-between text-sm font-heading font-black pt-2 border-t border-amber-200 text-slate-900">
                    <span>TỔNG TIỀN THANH TOÁN:</span>
                    <span className="text-orange-600 text-base">{formatCurrency(getMockPrice())}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Phí minh họa cho prototype:</strong> Biểu phí chính thức sẽ được công bố công khai trước ngày mở cổng chính thức. Bạn có thể tự do bấm tiếp tục để trải nghiệm mô phỏng quy trình thanh toán.
                </span>
              </div>
            </div>
          )}

          {/* ================= STEP 5: THANH TOÁN MÔ PHỎNG ================= */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  BƯỚC 5 / 5
                </span>
                <h4 className="font-heading font-black text-2xl text-slate-900 mt-1">
                  PHƯƠNG THỨC THANH TOÁN
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Chọn cổng thanh toán điện tử bạn mong muốn trải nghiệm.
                </p>
              </div>

              {/* Payment Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'vnpay' as PaymentMethod,
                    name: 'VNPay Cổng Thanh Toán',
                    desc: 'Quét mã QR từ hơn 40 ứng dụng ngân hàng',
                    badge: 'Khuyên dùng',
                  },
                  {
                    id: 'momo' as PaymentMethod,
                    name: 'Ví Điện Tử MoMo',
                    desc: 'Thanh toán tức thì qua ví MoMo',
                  },
                  {
                    id: 'bank_transfer' as PaymentMethod,
                    name: 'Chuyển Khoản Ngân Hàng',
                    desc: 'VietQR tự động xác nhận trong 30 giây',
                  },
                  {
                    id: 'credit_card' as PaymentMethod,
                    name: 'Thẻ Quốc Tế / Nội Địa',
                    desc: 'Visa, MasterCard, JCB, Napas',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPaymentMethod(item.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === item.id
                        ? 'border-orange-500 bg-amber-50/50 shadow-md ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading font-bold text-sm text-slate-900">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                      <span>Chọn phương thức này</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          paymentMethod === item.id ? 'opacity-100' : 'opacity-20'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Prototype Payment Modal Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0a2540] via-[#0e3a66] to-[#0a2540] text-white flex items-center gap-3 border border-sky-400/20 shadow-md">
                <CreditCard className="w-6 h-6 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-amber-300">
                    GIAO DỊCH MÔ PHỎNG (PROTOTYPE DEMO)
                  </div>
                  <div className="text-slate-200 mt-0.5">
                    Hệ thống sẽ không trừ tiền thật. Nhấp "Xác Nhận Thanh Toán" để sinh mã vé, mã BIB và mã QR Code hoàn chỉnh.
                  </div>
                </div>
              </div>

              {paymentSimulatedNotice && (
                <div className="p-4 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs">
                  Đang khởi tạo giao dịch an toàn và sinh số BIB cá nhân...
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 6: ĐĂNG KÝ THÀNH CÔNG (SUCCESS) ================= */}
          {step === 6 && successRecord && (
            <div className="space-y-6 text-center py-2">
              
              {/* Green check badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  THANH TOÁN & ĐĂNG KÝ THÀNH CÔNG!
                </span>
                <h4 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 mt-2">
                  CHÀO MỪNG BẠN ĐẾN VỚI HÀNH TRÌNH 45 NĂM!
                </h4>
                <p className="text-xs text-neutral-600 max-w-md mx-auto mt-1">
                  Chúc mừng bạn đã chính thức trở thành một phần của ngày hội “Bước chạm Bước – Ghi dấu hiện tại, Tiếp bước tương lai”.
                </p>
              </div>

              {/* Official Athlete Card Ticket */}
              <div className="bg-amber-50/50 border-2 border-amber-200 rounded-3xl p-6 max-w-lg mx-auto shadow-md text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      MÃ ĐĂNG KÝ (REGISTRATION ID)
                    </span>
                    <span className="font-mono font-black text-xl text-orange-600 tracking-wider">
                      {successRecord.id}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      SỐ BIB CHÍNH THỨC
                    </span>
                    <span className="font-heading font-black text-2xl text-slate-900">
                      {successRecord.bibNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Vận động viên:</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {successRecord.type === 'personal'
                        ? successRecord.fullName
                        : successRecord.teamName}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Cự ly thi đấu:</span>
                    <span className="font-heading font-black text-orange-600 text-sm">
                      {successRecord.distance}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Trạng thái:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      ĐÃ THANH TOÁN
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Ngày diễn ra:</span>
                    <span className="font-bold text-slate-900">07/03/2027 (Sala)</span>
                  </div>
                </div>

                {/* QR Code generator */}
                <div className="pt-2 flex flex-col items-center justify-center">
                  <QRCodeDisplay
                    value={`${successRecord.id}|${successRecord.bibNumber}|${successRecord.fullName || successRecord.teamName}`}
                    size={160}
                    label={`MÃ QR NHẬN RACE KIT: ${successRecord.id}`}
                  />
                  <p className="text-[11px] text-slate-500 mt-2 text-center">
                    Vui lòng xuất trình mã QR này cùng CCCD/VNeID khi đến nhận Race Kit tại Sala.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintOrDownload}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>TẢI / IN XÁC NHẬN</span>
                </button>

                <button
                  onClick={handleSendEmailSimulation}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-slate-800 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer border border-amber-200"
                >
                  <Mail className="w-4 h-4 text-orange-600" />
                  <span>GỬI QUA EMAIL</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onViewLookup();
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer shadow-md shadow-orange-500/25"
                >
                  <Search className="w-4 h-4" />
                  <span>TRA CỨU VÉ NGAY</span>
                </button>
              </div>

              {emailSentToast && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs max-w-sm mx-auto animate-in fade-in">
                  ✓ Đã mô phỏng gửi email xác nhận kèm mã QR vé về hòm thư của bạn!
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          {step > 1 && step < 6 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>QUAY LẠI</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-heading font-extrabold uppercase rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer w-full sm:w-auto sm:ml-auto"
            >
              <span>TIẾP TỤC CHỌN CỰ LY</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && (
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-heading font-extrabold uppercase rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer w-full sm:w-auto sm:ml-auto"
            >
              <span>ĐIỀN THÔNG TIN</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleNextFromStep3}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-heading font-extrabold uppercase rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer w-full sm:w-auto sm:ml-auto"
            >
              <span>XEM LẠI THÔNG TIN</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={() => setStep(5)}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-heading font-extrabold uppercase rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer w-full sm:w-auto sm:ml-auto"
            >
              <span>TIẾP TỤC THANH TOÁN</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 5 && (
            <button
              disabled={isProcessingPayment}
              onClick={handleSimulatePayment}
              className="inline-flex items-center justify-center gap-1.5 px-8 py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-heading font-black uppercase rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer disabled:opacity-50 w-full sm:w-auto sm:ml-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>
                {isProcessingPayment
                  ? 'ĐANG XỬ LÝ GIAO DỊCH...'
                  : 'XÁC NHẬN THANH TOÁN (MÔ PHỎNG)'}
              </span>
            </button>
          )}

          {step === 6 && (
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold uppercase rounded-xl shadow-md shadow-orange-500/25 w-full sm:w-auto sm:ml-auto cursor-pointer"
            >
              HOÀN TẤT & ĐÓNG
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
