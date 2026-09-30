import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, PackageCheck, Flame, Trophy, Info } from 'lucide-react';
import { RACE_KIT_SCHEDULE, RACE_DAY_TIMELINE } from '../data/mockData';

export const RaceSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'raceday' | 'racekit'>('raceday');

  return (
    <section id="schedule" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            MỐC THỜI GIAN SỰ KIỆN
          </span>
          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            LỊCH TRÌNH RACE DAY & EXPO
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Chi tiết các mốc thời gian nhận Race Kit và chương trình ngày hội chạy bộ 07/03/2027.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveTab('raceday')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'raceday'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>NGÀY ĐUA (07/03/2027)</span>
            </button>

            <button
              onClick={() => setActiveTab('racekit')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'racekit'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PackageCheck className="w-4 h-4 text-sky-400" />
              <span>NHẬN RACE KIT (EXPO D-2 & D-1)</span>
            </button>
          </div>
        </div>

        {/* Content Tab 1: Race Day Timeline */}
        {activeTab === 'raceday' && (
          <div className="bg-white rounded-3xl border-2 border-orange-100 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 uppercase">
                  LỊCH TRÌNH CHỦ NHẬT – 07/03/2027
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Địa điểm: Trục đường Hoàng Thế Thiện, Khu đô thị Sala, TP. Thủ Đức
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200">
                <Clock className="w-4 h-4" />
                <span>03:30 – 09:00</span>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-300 space-y-6">
              {RACE_DAY_TIMELINE.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-white transition-transform group-hover:scale-125 ${
                      item.highlight
                        ? 'bg-orange-500 ring-4 ring-orange-200'
                        : item.category === 'relay'
                        ? 'bg-amber-500 ring-4 ring-amber-100'
                        : 'bg-slate-400'
                    }`}
                  />

                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      item.highlight
                        ? 'bg-red-50/70 border-red-200 shadow-sm'
                        : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="font-mono font-black text-sm sm:text-base text-red-600">
                        {item.time}
                      </span>
                      {item.highlight && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white self-start">
                          TIÊU ĐIỂM
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-extrabold text-base text-neutral-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Tab 2: Race Kit Collection Schedule */}
        {activeTab === 'racekit' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto space-y-8">
            <div className="pb-6 border-b border-stone-100">
              <h3 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 uppercase">
                LỊCH PHÁT RACE KIT & THỜI GIAN BIỂU
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Vui lòng đến đúng khung giờ đã phân bổ để đảm bảo tiến độ và tránh xếp hàng đông đúc.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {RACE_KIT_SCHEDULE.map((kit, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 hover:border-orange-400 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-heading font-bold text-sm text-slate-900">
                      {kit.day}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-mono font-bold border border-orange-200">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      {kit.time}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-slate-800">
                    Đối tượng: {kit.target}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Ghi chú: {kit.notes}
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Documents Checklist */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0d3156] to-[#081e33] text-white shadow-xl border border-sky-400/20">
              <div className="font-heading font-bold text-sm uppercase text-amber-400 mb-3 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-amber-400" />
                Giấy tờ bắt buộc khi nhận Race Kit
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span><strong>Mã xác nhận điện tử hoặc mã QR:</strong> Được gửi qua email hoặc tra cứu trực tuyến trên website này.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span><strong>Bản gốc CCCD / Hộ chiếu</strong> hoặc định danh điện tử <strong>VNeID Mức 2</strong> còn hiệu lực.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Trường hợp nhận thay: Bắt buộc có Giấy ủy quyền theo mẫu và bản photo CCCD của người chạy.</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-semibold">
                * Đúng 20:00 ngày D-1 (06/03/2027), Ban Tổ chức đóng toàn bộ quầy phát Kit. Sẽ không phát Kit vào sáng Race Day.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
