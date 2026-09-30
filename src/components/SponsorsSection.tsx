import React, { useState } from 'react';
import { Handshake, Award, Shield, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';
import { OFFICIAL_SPONSORS, SponsorBrand } from '../data/mockData';

export const SponsorsSection: React.FC = () => {
  const [filterTier, setFilterTier] = useState<string>('ALL');

  const filteredSponsors = filterTier === 'ALL'
    ? OFFICIAL_SPONSORS
    : OFFICIAL_SPONSORS.filter(s => s.tier === filterTier);

  const diamondSponsors = OFFICIAL_SPONSORS.filter(s => s.tier === 'DIAMOND');
  const goldSponsors = OFFICIAL_SPONSORS.filter(s => s.tier === 'GOLD');
  const silverSponsors = OFFICIAL_SPONSORS.filter(s => s.tier === 'SILVER');
  const partnerSponsors = OFFICIAL_SPONSORS.filter(s => s.tier === 'PARTNER');

  return (
    <section id="sponsors" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            ĐỐI TÁC ĐỒNG HÀNH
          </span>
          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            ĐỒNG HÀNH CÙNG NHỮNG BƯỚC CHÂN
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base text-balance">
            Trân trọng cảm ơn các đơn vị đối tác đã đồng hành cùng Biti's trên hành trình kỷ niệm 45 năm.
          </p>
        </div>

        {/* 1. TITLE SPONSOR & ORGANIZER */}
        <div className="mb-14 text-center">
          <div className="max-w-xl mx-auto p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-center gap-6 hover:shadow-md transition-all">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white font-heading font-black text-4xl flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
              45
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-heading font-black text-3xl tracking-tight text-[#005BAC]">
                  BITI’S
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-bold uppercase border border-orange-200">
                  1982 – 2027
                </span>
              </div>
              <div className="text-xs font-bold text-orange-600 tracking-wide mt-1 uppercase">
                Nâng niu bàn chân Việt • Tiếp bước tương lai
              </div>
              <p className="text-xs text-slate-500 mt-2 max-w-sm">
                Đơn vị sáng lập và tổ chức giải chạy kỷ niệm 45 năm thành lập, kết nối cộng đồng và truyền cảm hứng lối sống tích cực.
              </p>
            </div>
          </div>
        </div>

        {/* 2. DIAMOND & VENUE PARTNERS */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs font-heading font-black tracking-widest text-slate-700 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              ĐỐI TÁC ĐỒNG HÀNH & ĐỊA ĐIỂM
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {diamondSponsors.map((sp) => (
              <div
                key={sp.name}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-emerald-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      Tài Trợ Đồng Hành
                    </span>
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {sp.name}
                  </h3>
                  <div className="text-xs font-bold text-slate-600 mt-1">
                    {sp.category}
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {sp.highlight}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                  <span>{sp.role}</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}

            {/* Venue: Đại Quang Minh */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-amber-400">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                    Tài Trợ Địa Điểm
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="font-heading font-black text-xl text-slate-900 group-hover:text-amber-700 transition-colors">
                  Đại Quang Minh
                </h3>
                <div className="text-xs font-bold text-slate-600 mt-1">
                  Khu đô thị sinh thái Sala
                </div>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                  Tài trợ toàn bộ mặt bằng cung đường chạy, quảng trường trung tâm và tiện ích đô thị Sala.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-700">
                <span>Nhà Tài Trợ Địa Điểm (Venue)</span>
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. GOLD SPONSORS */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs font-heading font-black tracking-widest text-slate-700 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              NHÀ TÀI TRỢ VÀNG (GOLD SPONSORS)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {goldSponsors.filter(s => s.name !== 'Công ty Cổ phần Đại Quang Minh').map((sp) => (
              <div
                key={sp.name}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-amber-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                      {sp.category}
                    </span>
                    <Award className="w-4 h-4 text-amber-500" />
                  </div>
                  <h4 className="font-heading font-black text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                    {sp.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {sp.highlight}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                  {sp.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. SILVER SPONSORS (Mineral Water & Electrolyte) */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs font-heading font-black tracking-widest text-slate-700 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              TÀI TRỢ NƯỚC KHOÁNG & ĐIỆN GIẢI
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {silverSponsors.map((sp) => (
              <div
                key={sp.name}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between text-center group hover:border-sky-400 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center font-black text-xs mb-2">
                    💧
                  </div>
                  <h5 className="font-heading font-black text-sm text-slate-900">
                    {sp.name}
                  </h5>
                  <span className="text-[10px] font-semibold text-sky-700 block mt-0.5">
                    {sp.role}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  {sp.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. OFFICIAL PARTNERS (Food, Tech, Logistics, Voucher) */}
        <div>
          <div className="text-center mb-6">
            <span className="text-xs font-heading font-black tracking-widest text-slate-700 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              ĐỐI TÁC DỊCH VỤ & HẬU CẦN
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 max-w-5xl mx-auto">
            {partnerSponsors.map((sp) => (
              <div
                key={sp.name}
                className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs hover:border-orange-300 transition-colors"
              >
                <div className="font-heading font-bold text-xs text-slate-900 mb-0.5">
                  {sp.name}
                </div>
                <span className="text-[10px] text-slate-500 block">
                  {sp.category}
                </span>
                <span className="inline-block mt-1 text-[9px] font-bold text-orange-600 px-1.5 py-0.5 bg-orange-50 rounded">
                  {sp.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Co-partnership Note */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 p-3 px-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600">
            <HeartHandshake className="w-4 h-4 text-orange-600" />
            <span>Ban Tổ chức Biti's trân trọng tri ân sự tin yêu và đồng hành của tất cả các thương hiệu đối tác!</span>
          </div>
        </div>

      </div>
    </section>
  );
};
