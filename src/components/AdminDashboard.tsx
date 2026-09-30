import React, { useState, useEffect, useMemo } from 'react';
import { getRegistrations, resetRegistrationsToSample } from '../services/storage';
import { RegistrationRecord } from '../types';
import { QRCodeDisplay } from './QRCodeDisplay';
import {
  Users,
  Trophy,
  DollarSign,
  CheckCircle,
  Clock,
  Search,
  Download,
  Filter,
  Eye,
  RefreshCw,
  X,
  FileSpreadsheet,
  PieChart,
  BarChart3,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToLanding: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToLanding }) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistance, setFilterDistance] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);

  const reloadData = () => {
    setRegistrations(getRegistrations());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleResetData = () => {
    if (confirm('Khôi phục toàn bộ danh sách đăng ký về dữ liệu mẫu ban đầu?')) {
      const reset = resetRegistrationsToSample();
      setRegistrations(reset);
    }
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = registrations.length;
    const count5K = registrations.filter((r) => r.distance === '5KM').length;
    const count10K = registrations.filter((r) => r.distance === '10KM').length;
    const count21K = registrations.filter((r) => r.distance === '21KM').length;
    const countFamily = registrations.filter((r) => r.type === 'family').length;
    const paidCount = registrations.filter((r) => r.paymentStatus === 'PAID').length;
    const pendingCount = registrations.filter((r) => r.paymentStatus === 'PENDING').length;
    const revenue = registrations
      .filter((r) => r.paymentStatus === 'PAID')
      .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    return {
      total,
      count5K,
      count10K,
      count21K,
      countFamily,
      paidCount,
      pendingCount,
      revenue,
    };
  }, [registrations]);

  // Filtering
  const filteredList = useMemo(() => {
    return registrations.filter((r) => {
      const matchSearch =
        searchTerm === '' ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.fullName && r.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.teamName && r.teamName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.phone && r.phone.includes(searchTerm)) ||
        (r.bibNumber && r.bibNumber.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchDist =
        filterDistance === 'ALL' ||
        (filterDistance === 'FAMILY_RELAY'
          ? r.type === 'family'
          : r.distance === filterDistance);

      const matchType = filterType === 'ALL' || r.type === filterType;
      const matchStatus =
        filterStatus === 'ALL' || r.paymentStatus === filterStatus;

      return matchSearch && matchDist && matchType && matchStatus;
    });
  }, [registrations, searchTerm, filterDistance, filterType, filterStatus]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Mã Đăng Ký',
      'Số BIB',
      'Hình Thức',
      'Cự Ly',
      'Họ Tên / Tên Đội',
      'Số Điện Thoại',
      'Email',
      'Size Áo',
      'Trạng Thái Thanh Toán',
      'Tổng Tiền (VNĐ)',
      'Thời Gian Đăng Ký',
    ];

    const rows = filteredList.map((r) => [
      r.id,
      r.bibNumber,
      r.type === 'personal' ? 'Cá nhân' : 'Gia đình tiếp sức',
      r.distance,
      r.type === 'personal' ? r.fullName || '' : r.teamName || '',
      r.phone || r.representativePhone || '',
      r.email || r.representativeEmail || '',
      r.shirtSize || 'N/A',
      r.paymentStatus === 'PAID' ? 'ĐÃ THANH TOÁN' : 'CHỜ THANH TOÁN',
      r.totalAmount,
      r.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join(
        '\n'
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Bitis45_Runners_${new Date().toISOString().substring(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-16 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs uppercase tracking-wider border border-orange-200">
                ADMIN PORTAL
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Hệ thống quản lý giải chạy Biti's 45 Năm
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              BẢNG ĐIỀU KHIỂN & QUẢN LÝ ĐĂNG KÝ
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={reloadData}
              className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetData}
              className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer shadow-2xs"
            >
              Dữ liệu mẫu
            </button>

            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về trang chủ</span>
            </button>
          </div>
        </div>

        {/* 4 Core Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Tổng vận động viên</span>
              <Users className="w-4 h-4 text-orange-500" />
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
              {metrics.total}
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
              <span>5K: <strong>{metrics.count5K}</strong></span>
              <span>•</span>
              <span>10K: <strong>{metrics.count10K}</strong></span>
              <span>•</span>
              <span>21K: <strong>{metrics.count21K}</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Gia đình tiếp sức</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
              {metrics.countFamily}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Đội 3 thế hệ (Ông/bà - Cha/mẹ - Con)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Trạng thái thanh toán</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-3xl sm:text-4xl text-emerald-600">
                {metrics.paidCount}
              </span>
              <span className="text-xs font-bold text-slate-400">/ {metrics.total}</span>
            </div>
            <div className="text-xs text-amber-600 font-medium mt-2">
              {metrics.pendingCount} đơn chờ thanh toán
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50 border-2 border-orange-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">Doanh thu tạm tính</span>
              <DollarSign className="w-4 h-4 text-orange-600" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-slate-900 truncate" title={formatCurrency(metrics.revenue)}>
              {formatCurrency(metrics.revenue)}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Dữ liệu mô phỏng theo số đăng ký
            </div>
          </div>

        </div>

        {/* Visual Analytics Overview Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* By Distance Chart */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-heading font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-orange-600" />
                Phân bố theo cự ly
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">{metrics.total} tổng</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-700">5KM</span>
                  <span className="font-bold text-slate-900">{metrics.count5K} ({metrics.total ? Math.round((metrics.count5K / metrics.total) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full transition-all" style={{ width: `${metrics.total ? (metrics.count5K / metrics.total) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-700">10KM</span>
                  <span className="font-bold text-slate-900">{metrics.count10K} ({metrics.total ? Math.round((metrics.count10K / metrics.total) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${metrics.total ? (metrics.count10K / metrics.total) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-700">21KM</span>
                  <span className="font-bold text-slate-900">{metrics.count21K} ({metrics.total ? Math.round((metrics.count21K / metrics.total) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-600 h-full rounded-full transition-all" style={{ width: `${metrics.total ? (metrics.count21K / metrics.total) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* By Type Chart */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-heading font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <PieChart className="w-4 h-4 text-amber-500" />
                  Hình thức tham gia
                </span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    <span className="font-medium text-slate-700">Cá nhân:</span>
                  </div>
                  <span className="font-bold text-slate-900">{metrics.total - metrics.countFamily} runner</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span className="font-medium text-slate-700">Gia đình tiếp sức:</span>
                  </div>
                  <span className="font-bold text-slate-900">{metrics.countFamily} đội</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Hạng mục Gia đình chiếm {metrics.total ? Math.round((metrics.countFamily / metrics.total) * 100) : 0}% tổng đăng ký.
            </div>
          </div>

          {/* By Payment Chart */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-heading font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Tỷ lệ thanh toán
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {metrics.total ? Math.round((metrics.paidCount / metrics.total) * 100) : 0}% đã thanh toán
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex my-3">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${metrics.total ? (metrics.paidCount / metrics.total) * 100 : 0}%` }}
                />
                <div
                  className="bg-amber-400 h-full"
                  style={{ width: `${metrics.total ? (metrics.pendingCount / metrics.total) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Đã trả: <strong>{metrics.paidCount}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Chờ: <strong>{metrics.pendingCount}</strong>
                </span>
              </div>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 mt-2">
              Tỷ lệ thanh toán hoàn tất đạt mức cao và ổn định.
            </div>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm mã đơn, BIB, họ tên, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 outline-none transition-all"
              />
            </div>

            {/* Filter Distance */}
            <div className="lg:col-span-2">
              <select
                value={filterDistance}
                onChange={(e) => setFilterDistance(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:bg-white focus:border-orange-500 outline-none cursor-pointer"
              >
                <option value="ALL">Mọi cự ly</option>
                <option value="5KM">5KM</option>
                <option value="10KM">10KM</option>
                <option value="21KM">21KM</option>
                <option value="FAMILY_RELAY">Gia đình tiếp sức</option>
              </select>
            </div>

            {/* Filter Type */}
            <div className="lg:col-span-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:bg-white focus:border-orange-500 outline-none cursor-pointer"
              >
                <option value="ALL">Mọi hình thức</option>
                <option value="personal">Cá nhân</option>
                <option value="family">Gia đình</option>
              </select>
            </div>

            {/* Filter Status */}
            <div className="lg:col-span-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:bg-white focus:border-orange-500 outline-none cursor-pointer"
              >
                <option value="ALL">Mọi trạng thái</option>
                <option value="PAID">Đã thanh toán</option>
                <option value="PENDING">Chờ thanh toán</option>
              </select>
            </div>

            {/* Export Button */}
            <div className="lg:col-span-2">
              <button
                onClick={handleExportCSV}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất CSV</span>
              </button>
            </div>

          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Hiển thị <strong className="text-slate-800">{filteredList.length}</strong> kết quả đăng ký
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-heading font-bold uppercase tracking-wider border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Số BIB</th>
                  <th className="py-3.5 px-4">Mã đơn</th>
                  <th className="py-3.5 px-4">Họ tên / Đội</th>
                  <th className="py-3.5 px-4">Cự ly</th>
                  <th className="py-3.5 px-4">Liên hệ</th>
                  <th className="py-3.5 px-4">Số tiền</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Không tìm thấy kết quả phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((r) => {
                    const isFamily = r.type === 'family';
                    const name = isFamily ? r.teamName : r.fullName;
                    const phone = isFamily ? r.representativePhone : r.phone;
                    const isPaid = r.paymentStatus === 'PAID';

                    return (
                      <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                            {r.bibNumber}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {r.id}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {name}
                          {isFamily && (
                            <span className="block text-[10px] text-amber-600 font-normal">
                              Đại diện: {r.representativeName}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-slate-100 text-slate-800">
                            {r.distance}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <div>{phone}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                          {formatCurrency(r.totalAmount)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPaid
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {isPaid ? 'ĐÃ THANH TOÁN' : 'CHỜ XỬ LÝ'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedRecord(r)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-slate-900">
            
            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm uppercase tracking-wide">
                  Chi tiết đăng ký VĐV
                </span>
                <span className="px-2 py-0.5 bg-white/20 rounded font-mono text-xs">
                  {selectedRecord.bibNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Mã số đăng ký</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{selectedRecord.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Cự ly thi đấu</span>
                  <span className="font-heading font-black text-orange-600 text-base">{selectedRecord.distance}</span>
                </div>
              </div>

              {/* Personal / Family Info */}
              {selectedRecord.type === 'personal' ? (
                <div className="space-y-2">
                  <div className="font-bold text-slate-800 text-sm">Thông tin cá nhân</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>Họ và tên: <strong className="text-slate-900">{selectedRecord.fullName}</strong></div>
                    <div>Số điện thoại: <strong className="text-slate-900">{selectedRecord.phone}</strong></div>
                    <div>Email: <strong className="text-slate-900">{selectedRecord.email}</strong></div>
                    <div>Size áo: <strong className="text-slate-900">{selectedRecord.shirtSize || 'N/A'}</strong></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="font-bold text-slate-800 text-sm">Thông tin đội tiếp sức 3 thế hệ</div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <div>Tên đội: <strong className="text-slate-900">{selectedRecord.teamName}</strong></div>
                    <div>Đại diện: <strong className="text-slate-900">{selectedRecord.representativeName}</strong></div>
                    <div>SĐT đại diện: <strong className="text-slate-900">{selectedRecord.representativePhone}</strong></div>
                  </div>
                  {selectedRecord.familyMembers && (
                    <div className="space-y-1.5">
                      <div className="font-semibold text-slate-700">3 thành viên tiếp sức:</div>
                      {selectedRecord.familyMembers.map((m, i) => (
                        <div key={m.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex justify-between">
                          <span>Chặng 0{i + 1}: <strong>{m.fullName}</strong> ({m.relationship})</span>
                          <span>Size: {m.shirtSize}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Mã QR Check-in Expo</span>
                <QRCodeDisplay value={selectedRecord.id} size={130} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
