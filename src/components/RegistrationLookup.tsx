import React, { useState } from 'react';
import { findRegistration } from '../services/storage';
import { RegistrationRecord } from '../types';
import { QRCodeDisplay } from './QRCodeDisplay';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  Calendar,
  MapPin,
  Tag,
  ShieldCheck,
  User,
  Users,
  Clock,
  Printer,
} from 'lucide-react';

interface RegistrationLookupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const RegistrationLookup: React.FC<RegistrationLookupProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
}) => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<RegistrationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const res = findRegistration(keyword.trim());
    setResult(res);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#18233A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#EEE5D7] text-[#18233A]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#FAF7F1] border-b border-[#EEE5D7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#005EB8] flex items-center justify-center font-heading font-black text-sm text-white shadow-xs">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base text-[#18233A] uppercase tracking-tight leading-none">
                TRA CỨU THÔNG TIN ĐĂNG KÝ
              </h3>
              <span className="text-[11px] text-[#526077] block mt-1">
                Kiểm tra số BIB, thẻ điện tử & tình trạng nhận Race Kit
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/5 text-[#18233A]/60 hover:text-[#18233A] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2.5">
            <label className="block text-xs font-heading font-bold text-[#18233A]">
              Nhập Số điện thoại, Email hoặc Mã đăng ký (BITI45-XXXXXX):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ví dụ: 0908123456 hoặc BITI45-774920"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8EDF2] focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522]/20 text-sm text-[#18233A] placeholder:text-[#8C9BAE] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#F26522] hover:bg-[#D95314] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
              >
                Tra cứu
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1">
              <span>Gợi ý thử nghiệm:</span>
              <button
                type="button"
                onClick={() => setKeyword('0908123456')}
                className="underline hover:text-orange-600 cursor-pointer font-medium"
              >
                0908123456 (Cá nhân)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setKeyword('BITI45-774920')}
                className="underline hover:text-orange-600 cursor-pointer font-medium"
              >
                BITI45-774920 (Đội Gia Đình)
              </button>
            </div>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div>
              {result ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in">
                  
                  {/* Top Bar Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-200 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Mã đơn đăng ký
                      </span>
                      <span className="font-mono font-black text-lg text-orange-600 tracking-wide">
                        {result.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ĐÃ XÁC NHẬN HỢP LỆ
                      </span>
                    </div>
                  </div>

                  {/* BIB & Athlete Card */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        SỐ BIB VẬN ĐỘNG VIÊN
                      </span>
                      <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                        {result.bibNumber}
                      </div>
                      <div className="text-xs text-orange-600 font-bold">
                        Cự ly: {result.distance}
                      </div>
                    </div>

                    <div className="sm:text-right space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        VẬN ĐỘNG VIÊN / ĐỘI TIẾP SỨC
                      </span>
                      <div className="font-heading font-bold text-base text-slate-900">
                        {result.type === 'personal'
                          ? result.fullName
                          : result.teamName}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {result.phone || result.representativePhone}
                      </div>
                    </div>
                  </div>

                  {/* QR Code and Kit collection info */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pt-1">
                    <div className="sm:col-span-5 flex justify-center">
                      <QRCodeDisplay
                        value={`${result.id}|${result.bibNumber}|${result.fullName || result.teamName}`}
                        size={140}
                        label={result.id}
                      />
                    </div>

                    <div className="sm:col-span-7 space-y-2 text-xs text-slate-600">
                      <div className="font-heading font-bold text-xs uppercase text-slate-900 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-orange-600" />
                        HƯỚNG DẪN NHẬN RACE KIT:
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>Khu đô thị Sala, TP. Thủ Đức, TP.HCM</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>05/03 & 06/03/2027 (Expo nhận vật phẩm)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Xuất trình mã QR này và CCCD/VNeID khi nhận Race Kit.</span>
                      </div>
                    </div>
                  </div>

                  {/* Family Members list */}
                  {result.type === 'family' && result.familyMembers && (
                    <div className="pt-3 border-t border-slate-200">
                      <span className="text-xs font-bold text-slate-800 uppercase block mb-2">
                        Thành viên đội tiếp sức ({result.familyMembers.length} người):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {result.familyMembers.map((m, idx) => (
                          <div
                            key={m.id}
                            className="p-2.5 rounded-lg bg-white border border-slate-200"
                          >
                            <div className="font-bold text-slate-900">
                              #{idx + 1}. {m.fullName || `Thành viên ${idx + 1}`}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {m.relationship} • Size Áo: {m.shirtSize}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Print */}
                  <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In xác nhận / Tải PDF</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-heading font-black text-base text-slate-900">
                      Không tìm thấy thông tin đăng ký
                    </h5>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Vui lòng kiểm tra lại số điện thoại, email hoặc mã đăng ký. Nếu bạn chưa đăng ký, hãy tham gia cùng Biti's ngay hôm nay!
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenRegister();
                    }}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-heading font-extrabold uppercase rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    ĐĂNG KÝ THAM GIA NGAY
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
