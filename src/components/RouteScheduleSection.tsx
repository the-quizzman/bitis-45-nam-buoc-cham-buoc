import React, { useState } from 'react';
import { DistanceType } from '../types';
import { ROUTE_DATA, RACE_KIT_SCHEDULE, RACE_DAY_TIMELINE } from '../data/mockData';
import {
  MapPin,
  Clock,
  Compass,
  Download,
  Flame,
  PackageCheck,
  Droplets,
  HeartPulse,
  Flag,
  FileCode,
  CheckCircle,
} from 'lucide-react';

export const RouteScheduleSection: React.FC = () => {
  const [mainTab, setMainTab] = useState<'route' | 'schedule'>('route');
  const [activeDistance, setActiveDistance] = useState<DistanceType>('5KM');
  const [scheduleSubTab, setScheduleSubTab] = useState<'raceday' | 'racekit'>('raceday');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const route = ROUTE_DATA[activeDistance];

  const handleDownloadGpx = () => {
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Bitis45YearsRun">
  <metadata>
    <name>Biti's 45 Năm - Cung Đường ${activeDistance} Sala</name>
  </metadata>
  <trk>
    <name>Biti's 45 Năm ${activeDistance}</name>
    <trkseg>
      <trkpt lat="10.7712" lon="106.7214"><ele>5.0</ele></trkpt>
      <trkpt lat="10.7725" lon="106.7228"><ele>5.1</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;
    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bitis45Years_Sala_${activeDistance}_Route.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <section
      id="route-schedule"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] py-12 lg:py-0 flex flex-col justify-center bg-white text-[#18233A] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header with Segmented Tab */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 lg:mb-6">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#F26522] mb-1 block">
              HÀNH TRÌNH & LỊCH TRÌNH
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#18233A] leading-tight">
              Cung đường & Lịch thi đấu
            </h2>
          </div>

          {/* Master View Switcher */}
          <div className="inline-flex p-1 bg-[#F3F7FA] rounded-xl border border-[#E8EDF2] self-start md:self-auto shrink-0">
            <button
              onClick={() => setMainTab('route')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                mainTab === 'route'
                  ? 'bg-[#18233A] text-white shadow-xs'
                  : 'text-[#526077] hover:text-[#18233A]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Sơ đồ cung đường</span>
            </button>

            <button
              onClick={() => setMainTab('schedule')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                mainTab === 'schedule'
                  ? 'bg-[#18233A] text-white shadow-xs'
                  : 'text-[#526077] hover:text-[#18233A]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Lịch trình chi tiết</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: ROUTE MAP */}
        {mainTab === 'route' && (
          <div className="rounded-2xl border border-[#E8EDF2] bg-[#FAF7F1] p-5 lg:p-6 shadow-sm flex flex-col justify-between max-h-[500px] lg:max-h-[520px]">
            {/* Sub-bar: Distance filter + GPX download */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EEE5D7]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8C9BAE] uppercase">Cự ly:</span>
                <div className="inline-flex p-1 bg-white rounded-lg border border-[#EEE5D7]">
                  {(['5KM', '10KM', '21KM'] as DistanceType[]).map((dist) => (
                    <button
                      key={dist}
                      onClick={() => setActiveDistance(dist)}
                      className={`px-3.5 py-1 rounded-md text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                        activeDistance === dist
                          ? 'bg-[#F26522] text-white shadow-xs'
                          : 'text-[#526077] hover:text-[#18233A]'
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#526077]">
                <span>Xuất phát: <strong className="text-[#18233A]">{route.startTime}</strong></span>
                <span>Cut-off: <strong className="text-[#18233A]">{route.cutOffTime}</strong></span>
                <button
                  onClick={handleDownloadGpx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EEE5D7] hover:border-[#18233A] text-[#18233A] font-sans font-bold text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>{downloadSuccess ? 'Đã tải GPX!' : 'Tải file GPX'}</span>
                </button>
              </div>
            </div>

            {/* Map Canvas & Checkpoints */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 py-4 items-center">
              
              {/* Route Interactive SVG Visual: 8 cols */}
              <div className="lg:col-span-8 relative h-[240px] sm:h-[260px] bg-white rounded-xl border border-[#EEE5D7] p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#8C9BAE]">
                  <span className="font-heading font-bold text-[#005EB8]">{route.name}</span>
                  <span className="font-mono">Độ dốc tối đa: +3m (Bằng phẳng)</span>
                </div>

                {/* Stylized Track Vector */}
                <div className="relative my-auto flex items-center justify-center">
                  <svg className="w-full h-32" viewBox="0 0 600 120" fill="none">
                    {/* Background Loop */}
                    <path
                      d="M 40 70 C 120 20, 200 100, 320 40 C 420 -10, 520 80, 560 60 C 580 50, 560 110, 460 100 C 340 90, 240 110, 140 100 Z"
                      stroke="#EEE5D7"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Active Track */}
                    <path
                      d="M 40 70 C 120 20, 200 100, 320 40 C 420 -10, 520 80, 560 60"
                      stroke="#F26522"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Checkpoints */}
                    <circle cx="40" cy="70" r="7" fill="#005EB8" />
                    <circle cx="200" cy="85" r="5" fill="#10B981" />
                    <circle cx="320" cy="40" r="5" fill="#3B82F6" />
                    <circle cx="460" cy="45" r="5" fill="#F59E0B" />
                    <circle cx="560" cy="60" r="7" fill="#F26522" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#526077]">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#005EB8]" /> Cổng Xuất phát / Đích (Hoàng Thế Thiện)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Trạm Nước & Điện giải</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F26522]" /> Điểm quay đầu</span>
                </div>
              </div>

              {/* Route Summary Checklist: 4 cols */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-[#EEE5D7] p-4 text-xs space-y-2.5">
                <div className="font-heading font-bold text-sm text-[#18233A] pb-2 border-b border-[#EEE5D7]">
                  Điểm nhấn kỹ thuật
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#005EB8] shrink-0 mt-0.5" />
                  <span>Mặt đường nhựa phẳng 100%, không dốc cao, đón gió sông Sài Gòn.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#005EB8] shrink-0 mt-0.5" />
                  <span>3 Trạm tiếp nước tiêu chuẩn cứ mỗi 2km (Pocari Sweat & chuối).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#005EB8] shrink-0 mt-0.5" />
                  <span>2 Trạm y tế cố định & xe cứu thương lưu động toàn tuyến.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F26522] shrink-0 mt-0.5" />
                  <span>Pacer dẫn tốc độ cho cự ly 10KM và 21KM.</span>
                </div>
              </div>

            </div>

            {/* Bottom street list */}
            <div className="pt-3 border-t border-[#EEE5D7] flex items-center justify-between text-[11px] text-[#526077]">
              <span>Tuyến đường: <strong>Hoàng Thế Thiện → Nguyễn Cơ Thạch → Mai Chí Thọ → Cầu Ba Son</strong></span>
              <span className="text-[#005EB8] font-bold">Chứng nhận đường chạy tiêu chuẩn</span>
            </div>
          </div>
        )}

        {/* VIEW 2: RACE DAY & EXPO SCHEDULE */}
        {mainTab === 'schedule' && (
          <div className="rounded-2xl border border-[#E8EDF2] bg-[#FAF7F1] p-5 lg:p-6 shadow-sm flex flex-col justify-between max-h-[500px] lg:max-h-[520px]">
            {/* Sub-bar: Schedule Switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EEE5D7]">
              <div className="inline-flex p-1 bg-white rounded-lg border border-[#EEE5D7]">
                <button
                  onClick={() => setScheduleSubTab('raceday')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                    scheduleSubTab === 'raceday'
                      ? 'bg-[#F26522] text-white shadow-xs'
                      : 'text-[#526077] hover:text-[#18233A]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Chủ nhật (07/03) · Ngày đua chính</span>
                </button>
                <button
                  onClick={() => setScheduleSubTab('racekit')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                    scheduleSubTab === 'racekit'
                      ? 'bg-[#18233A] text-white shadow-xs'
                      : 'text-[#526077] hover:text-[#18233A]'
                  }`}
                >
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>Thứ 6 & Thứ 7 (05-06/03) · Expo nhận Kit</span>
                </button>
              </div>

              <span className="text-xs font-mono text-[#8C9BAE] hidden sm:inline">
                Địa điểm: Công viên Sala, TP. Thủ Đức
              </span>
            </div>

            {/* Timeline Content */}
            <div className="py-4 overflow-y-auto max-h-[360px] pr-2">
              {scheduleSubTab === 'raceday' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {RACE_DAY_TIMELINE.map((item, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        item.highlight
                          ? 'bg-white border-[#F26522] shadow-xs'
                          : 'bg-white border-[#EEE5D7]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs text-[#F26522] bg-[#FAF7F1] px-2 py-1 rounded">
                          {item.time}
                        </span>
                        <div>
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-[#18233A]">
                            {item.activity}
                          </h4>
                          <span className="text-[11px] text-[#526077]">{item.desc}</span>
                        </div>
                      </div>
                      {item.highlight && (
                        <span className="px-2 py-0.5 rounded bg-[#F26522] text-white text-[9px] font-bold uppercase">
                          Trọng tâm
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {RACE_KIT_SCHEDULE.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white border border-[#EEE5D7] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#005EB8]">{item.date}</span>
                        <h4 className="font-heading font-bold text-sm text-[#18233A] mt-0.5">{item.time}</h4>
                        <p className="text-xs text-[#526077] mt-1">{item.activity} · {item.location}</p>
                      </div>
                      <span className="text-xs font-bold text-[#F26522] bg-[#FFF8F3] px-3 py-1.5 rounded-lg border border-[#F26522]/30">
                        {item.note}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom note */}
            <div className="pt-3 border-t border-[#EEE5D7] text-[11px] text-[#8C9BAE]">
              Vui lòng mang theo CCCD/VNeID và mã QR xác nhận khi đến nhận Race Kit tại Expo Sala.
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
