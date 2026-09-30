import React, { useState } from 'react';
import { DistanceType } from '../types';
import { ROUTE_DATA } from '../data/mockData';
import {
  MapPin,
  Flag,
  Droplets,
  HeartPulse,
  Sparkles,
  Clock,
  Compass,
  Download,
  CheckCircle,
  FileCode,
} from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeDistance, setActiveDistance] = useState<DistanceType>('5KM');
  const [showGpxModal, setShowGpxModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const route = ROUTE_DATA[activeDistance];

  const handleDownloadGpx = () => {
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Bitis45YearsRun">
  <metadata>
    <name>Biti's 45 Năm - Cung Đường ${activeDistance} Sala</name>
    <desc>Sơ đồ đường chạy chuẩn Sala UEH Handbook</desc>
  </metadata>
  <trk>
    <name>Biti's 45 Năm ${activeDistance}</name>
    <trkseg>
      <trkpt lat="10.7712" lon="106.7214"><ele>5.0</ele></trkpt>
      <trkpt lat="10.7725" lon="106.7228"><ele>5.1</ele></trkpt>
      <trkpt lat="10.7740" lon="106.7245"><ele>5.2</ele></trkpt>
      <trkpt lat="10.7712" lon="106.7214"><ele>5.0</ele></trkpt>
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
    setTimeout(() => {
      setDownloadSuccess(false);
      setShowGpxModal(false);
    }, 1500);
  };

  return (
    <section id="route" className="py-20 bg-gradient-to-b from-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            BẢN ĐỒ ĐƯỜNG CHẠY
          </span>
          <h2 className="text-balance font-heading font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
            CUNG ĐƯỜNG THI ĐẤU SALA
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base text-balance">
            Cung đường đạt chuẩn tại Khu đô thị sinh thái Sala & Đại lộ ven sông Sài Gòn, TP. Thủ Đức.
          </p>
        </div>

        {/* Distance Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            {(['5KM', '10KM', '21KM'] as DistanceType[]).map((dist) => {
              const isActive = activeDistance === dist;
              return (
                <button
                  key={dist}
                  onClick={() => setActiveDistance(dist)}
                  className={`px-6 sm:px-8 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {dist}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Route Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-slate-900">
          
          {/* Header Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-3xl text-orange-600">
                  {route.distance}
                </span>
                <span className="text-slate-800 font-heading font-bold text-lg">
                  {route.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Khu đô thị Sala, TP. Thủ Đức, TP. Hồ Chí Minh
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-orange-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px]">XUẤT PHÁT</span>
                <span className="text-slate-900 font-black">{route.startTime}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-orange-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px]">ĐÓNG ĐƯỜNG</span>
                <span className="text-orange-600 font-black">{route.closeTime}</span>
              </div>
              <button
                onClick={() => setShowGpxModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-md shadow-orange-500/20 transition-colors cursor-pointer font-bold"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>TẢI GPX</span>
              </button>
            </div>
          </div>

          {/* Grid Layout: Visual Map + Turn by Turn details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Interactive Vector Route Diagram accurately mapping UEH Sala course */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-orange-100">
              
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-sky-50/40 border-2 border-slate-200 p-4 overflow-hidden flex flex-col justify-between shadow-inner">
                
                {/* SVG Route Graphic with real Sala layout */}
                <div className="absolute inset-0 p-3">
                  <svg
                    viewBox="0 0 700 500"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Sông Sài Gòn waterfront in bright azure sky blue */}
                    <path
                      d="M 60 0 Q 30 180 50 340 Q 70 420 110 500 L 0 500 L 0 0 Z"
                      fill="#BAE6FD"
                      stroke="#0284C7"
                      strokeWidth="2"
                    />
                    <text x="35" y="240" fill="#0284C7" fontSize="12" fontWeight="bold" transform="rotate(-90 35 240)">
                      SÔNG SÀI GÒN (BỜ THỦ THIÊM)
                    </text>

                    {/* Cầu Ba Son indicator */}
                    <line x1="50" y1="40" x2="10" y2="20" stroke="#F59E0B" strokeWidth="5" strokeDasharray="4 2" />
                    <text x="15" y="60" fill="#B45309" fontSize="10" fontWeight="bold">
                      CẦU BA SON
                    </text>

                    {/* Mai Chí Thọ Avenue (Trục ngang phía Bắc) */}
                    <line x1="60" y1="90" x2="680" y2="90" stroke="#CBD5E1" strokeWidth="10" strokeDasharray="8 6" />
                    <text x="320" y="80" fill="#475569" fontSize="11" fontWeight="bold">
                      ĐẠI LỘ MAI CHÍ THỌ
                    </text>

                    {/* Đường Hoàng Thế Thiện (Trục Xuất phát/Đích thẳng đứng bên phải) */}
                    <line x1="520" y1="120" x2="520" y2="440" stroke="#94A3B8" strokeWidth="14" strokeLinecap="round" />
                    <text x="535" y="280" fill="#1E293B" fontSize="11" fontWeight="bold" transform="rotate(90 535 280)">
                      ĐƯỜNG HOÀNG THẾ THIỆN (START / FINISH)
                    </text>

                    {/* Đường số 07 (Nối từ Hoàng Thế Thiện sang Đường B2) */}
                    <line x1="520" y1="140" x2="420" y2="140" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
                    <text x="440" y="130" fill="#475569" fontSize="10" fontWeight="bold">
                      ĐƯỜNG SỐ 07
                    </text>

                    {/* Đường B2 (Trục song song) */}
                    <line x1="420" y1="130" x2="420" y2="380" stroke="#CBD5E1" strokeWidth="11" strokeLinecap="round" />
                    <text x="405" y="260" fill="#475569" fontSize="10" fontWeight="bold" transform="rotate(-90 405 260)">
                      ĐƯỜNG B2
                    </text>

                    {/* Đường số 11 (Nối từ Đường B2 sang Bùi Thiện Ngộ) */}
                    <line x1="420" y1="380" x2="280" y2="380" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
                    <text x="320" y="370" fill="#475569" fontSize="10" fontWeight="bold">
                      ĐƯỜNG SỐ 11
                    </text>

                    {/* Đường Bùi Thiện Ngộ (Trục bao bọc công viên Sala) */}
                    <path
                      d="M 280 390 L 280 180 Q 280 140 210 140 L 130 140"
                      stroke="#CBD5E1"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    <text x="265" y="280" fill="#475569" fontSize="10" fontWeight="bold" transform="rotate(-90 265 280)">
                      ĐƯỜNG BÙI THIỆN NGỘ
                    </text>

                    {/* Đường Nguyễn Thiện Thành (Đại lộ ven sông uốn lượn) */}
                    <path
                      d="M 130 460 Q 110 300 120 140 L 120 50"
                      stroke="#94A3B8"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <text x="100" y="320" fill="#0369A1" fontSize="10" fontWeight="bold" transform="rotate(-90 100 320)">
                      ĐẠI LỘ NGUYỄN THIỆN THÀNH (VEN SÔNG)
                    </text>

                    {/* Công viên Sala & Hồ cảnh quan ở trung tâm */}
                    <ellipse cx="350" cy="250" rx="45" ry="60" fill="#86EFAC" stroke="#15803D" strokeWidth="2" opacity="0.6" />
                    <text x="350" y="255" fill="#166534" fontSize="10" fontWeight="bold" textAnchor="middle">
                      CÔNG VIÊN SALA
                    </text>

                    {/* SPECIFIC RUNNING PATHS PER DISTANCE */}
                    {activeDistance === '5KM' && (
                      <g>
                        {/* 5KM: Start -> Đường 07 -> B2 -> Đường 11 -> Bùi Thiện Ngộ -> Turnaround KM 2.5 -> Return */}
                        <path
                          d="M 520 280 L 520 140 L 420 140 L 420 380 L 280 380 L 280 200"
                          stroke="#0284C7"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="filter drop-shadow-[0_2px_4px_rgba(2,132,199,0.5)]"
                        />
                        {/* Return loop line */}
                        <path
                          d="M 280 200 L 280 375 L 415 375 L 415 145 L 515 145 L 515 280"
                          stroke="#F59E0B"
                          strokeWidth="4"
                          strokeDasharray="6 3"
                        />
                        {/* Turnaround marker at Bùi Thiện Ngộ */}
                        <circle cx="280" cy="200" r="9" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                        <rect x="230" y="165" width="100" height="22" rx="5" fill="#D97706" />
                        <text x="280" y="180" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                          QUAY ĐẦU 5K (KM 2.5)
                        </text>
                      </g>
                    )}

                    {activeDistance === '10KM' && (
                      <g>
                        {/* 10KM: Start -> Đường 07 -> B2 -> Đường 11 -> Bùi Thiện Ngộ -> Nguyễn Thiện Thành (KM 5.2 Ba Son) -> Return */}
                        <path
                          d="M 520 280 L 520 140 L 420 140 L 420 380 L 280 380 L 280 180 Q 280 140 210 140 L 125 140 L 120 60"
                          stroke="#EA580C"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="filter drop-shadow-[0_2px_4px_rgba(234,88,12,0.5)]"
                        />
                        {/* Return line */}
                        <path
                          d="M 125 60 L 130 145 Q 210 145 275 145 L 275 375 L 415 375 L 415 145 L 515 145 L 515 280"
                          stroke="#F59E0B"
                          strokeWidth="4"
                          strokeDasharray="6 3"
                        />
                        <circle cx="120" cy="60" r="9" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
                        <rect x="55" y="30" width="135" height="22" rx="5" fill="#C2410C" />
                        <text x="122" y="45" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                          QUAY ĐẦU 10K (KM 5.2 - BA SON)
                        </text>
                      </g>
                    )}

                    {activeDistance === '21KM' && (
                      <g>
                        {/* 21KM: 2 Vòng lặp đầy đủ */}
                        <path
                          d="M 520 280 L 520 140 L 420 140 L 420 380 L 280 380 L 280 180 Q 280 140 210 140 L 125 140 L 120 60"
                          stroke="#DC2626"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="filter drop-shadow-[0_2px_6px_rgba(220,38,38,0.5)]"
                        />
                        <path
                          d="M 120 60 L 125 450"
                          stroke="#DC2626"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <circle cx="120" cy="60" r="9" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
                        <rect x="50" y="25" width="145" height="22" rx="5" fill="#991B1B" />
                        <text x="122" y="40" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                          QUAY ĐẦU 21K VÒNG 1 (CẦU BA SON)
                        </text>
                      </g>
                    )}

                    {/* START / FINISH MARKER ON HOÀNG THẾ THIỆN */}
                    <circle cx="520" cy="280" r="10" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
                    <rect x="440" y="270" width="70" height="22" rx="5" fill="#15803D" />
                    <text x="475" y="285" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                      START/FINISH
                    </text>

                    {/* Checkpoints & Water Stations along path */}
                    <circle cx="420" cy="140" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="420" cy="260" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="280" cy="380" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="210" cy="140" r="6" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Map Legend Overlay */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-orange-200 text-[11px] self-start max-w-xs space-y-1.5 shadow-md">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1 flex items-center justify-between">
                    <span>CHÚ THÍCH KỸ THUẬT (SALA)</span>
                    <span className="text-orange-600 font-mono font-bold">UEH</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shrink-0 shadow-xs" />
                    <span>Cổng Xuất phát & Về đích (Hoàng Thế Thiện)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shrink-0 shadow-xs" />
                    <span>Điểm quay đầu kiểm soát chip timing</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-sky-500 inline-block shrink-0 shadow-xs" />
                    <span>Trạm nước khoáng Lavie & Điện giải Pocari</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0 shadow-xs" />
                    <span>Trạm Y tế FPT Long Châu & BV Quốc Tế</span>
                  </div>
                </div>

                {/* Live Distance Indicator */}
                <div className="relative z-10 self-end bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-orange-200 text-xs font-mono text-slate-800 flex items-center gap-2 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Khu đô thị Sala • Bờ Sông Sài Gòn</span>
                </div>
              </div>

              {/* Station metrics count */}
              <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                <div className="p-3 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-black text-xl text-sky-600">
                    {route.stations.water}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Trạm nước</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-black text-xl text-amber-600">
                    {route.stations.electrolyte}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Điện giải</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-black text-xl text-orange-600">
                    {route.stations.medical}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Trạm Y tế</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="font-heading font-black text-xl text-emerald-600">
                    {route.stations.cheer}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cổ vũ & Nhạc</div>
                </div>
              </div>

            </div>

            {/* Turn by turn Navigation Panel (UEH Handbook Cue Sheet) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-black text-lg text-slate-900 uppercase text-balance">
                    Lộ trình chuẩn UEH Handbook
                  </h4>
                  <span className="text-xs font-mono text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    COT: {route.cutOffTime}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {route.description}
                </p>

                {/* Street by street step list */}
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {route.streets.map((st, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-orange-50/40 border border-orange-100 flex items-start gap-3 text-xs text-slate-700 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        {i + 1}
                      </div>
                      <span className="leading-snug font-medium">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights & elevation */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Điểm nhấn kỹ thuật cung đường:
                </div>
                <div className="space-y-1.5">
                  {route.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* GPX Modal Preview */}
      {showGpxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-black text-lg">Tải dữ liệu GPX ({activeDistance})</h4>
                <p className="text-xs text-slate-500">Dữ liệu định dạng chuẩn GPX cho đồng hồ Garmin, Coros, Strava</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 text-xs text-slate-700 space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Cự ly thi đấu:</span>
                <span className="font-bold text-slate-900">{activeDistance}</span>
              </div>
              <div className="flex justify-between">
                <span>Độ cao đạt được (Elevation):</span>
                <span className="font-bold text-slate-900">~15m (100% bằng phẳng, đường nhựa Sala)</span>
              </div>
              <div className="flex justify-between">
                <span>Tọa độ khu vực Sala:</span>
                <span className="font-mono text-slate-900 font-bold">10.7712° N, 106.7214° E</span>
              </div>
              <p className="text-[11px] text-orange-800 italic pt-1">
                * Tệp GPX sẵn sàng nạp trực tiếp vào đồng hồ chạy bộ để nhận cảnh báo rẽ đường thời gian thực.
              </p>
            </div>

            {downloadSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Đã tải thành công tệp GPX về thiết bị của bạn!</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadGpx}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>TẢI GPX FILE VỀ MÁY</span>
              </button>
              <button
                onClick={() => setShowGpxModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
