import React, { useState } from 'react';
import { FAQ_LIST } from '../data/mockData';
import { ChevronDown, ChevronUp, Mail, ShieldCheck } from 'lucide-react';

export const FaqSponsorsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Top 4 critical FAQs
  const primaryFaqs = FAQ_LIST.slice(0, 4);

  return (
    <section
      id="faq-sponsors"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] py-12 lg:py-0 flex flex-col justify-center bg-[#FAF7F1] text-[#18233A] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 lg:mb-8">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#F26522] mb-1.5 block">
            HỎI ĐÁP & ĐỐI TÁC ĐỒNG HÀNH
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#18233A] leading-tight">
            Giải đáp & Đối tác
          </h2>
          <p className="mt-1.5 text-[#526077] text-xs sm:text-sm lg:text-base leading-relaxed">
            Các thông tin quan trọng dành cho vận động viên và các đơn vị đồng hành cùng giải chạy.
          </p>
        </div>

        {/* 12-Column Split: FAQ (7 cols) + Sponsors & Contact (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* LEFT: Accordion FAQ (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EEE5D7] p-5 sm:p-6 shadow-sm flex flex-col justify-between max-h-[460px] lg:max-h-[480px]">
            <div className="space-y-2.5 overflow-y-auto pr-1">
              {primaryFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-all ${
                      isOpen ? 'border-[#F26522] bg-[#FFF8F3]' : 'border-[#EEE5D7] bg-white'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="font-heading font-bold text-xs sm:text-sm text-[#18233A]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#F26522] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C9BAE] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-[#526077] leading-relaxed border-t border-[#F26522]/20 pt-2.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#EEE5D7] mt-3 flex items-center justify-between text-xs text-[#526077]">
              <span>Cần thêm trợ giúp? Đội ngũ hỗ trợ phản hồi trong 2 giờ.</span>
              <span className="font-bold text-[#005EB8]">Hotline: 1900 xxxx</span>
            </div>
          </div>

          {/* RIGHT: Sponsors & Organizer (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Organizer Card: Biti's */}
            <div className="p-5 rounded-2xl bg-[#18233A] text-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#F26522] uppercase">
                  ĐƠN VỊ TỔ CHỨC
                </span>
                <span className="text-xs font-mono text-white/60">1982 – 2027</span>
              </div>
              <h3 className="font-heading font-black text-xl text-white">
                CÔNG TY TNHH SX HTD BÌNH TIÊN (BITI’S)
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                45 năm đồng hành cùng bước chân triệu gia đình Việt Nam. Sứ mệnh nâng niu sức khỏe thể chất và tình thân thế hệ.
              </p>
            </div>

            {/* Partner Brands Grid */}
            <div className="p-5 rounded-2xl bg-white border border-[#EEE5D7] shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#8C9BAE] block mb-3">
                  ĐỐI TÁC ĐỒNG HÀNH TIÊU BIỂU
                </span>
                
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#FAF7F1] border border-[#EEE5D7] text-center flex flex-col items-center justify-center">
                    <span className="font-heading font-black text-xs text-[#005EB8]">POCARI</span>
                    <span className="text-[9px] text-[#8C9BAE]">Điện giải</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F1] border border-[#EEE5D7] text-center flex flex-col items-center justify-center">
                    <span className="font-heading font-black text-xs text-[#10B981]">SALA</span>
                    <span className="text-[9px] text-[#8C9BAE]">Địa điểm</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F1] border border-[#EEE5D7] text-center flex flex-col items-center justify-center">
                    <span className="font-heading font-black text-xs text-[#F26522]">VINMEC</span>
                    <span className="text-[9px] text-[#8C9BAE]">Y tế chính</span>
                  </div>
                </div>
              </div>

              {/* Support contact strip */}
              <div className="pt-3 border-t border-[#EEE5D7] flex items-center justify-between text-xs text-[#526077]">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>support@bitis.vn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#005EB8]" />
                  <span>Bảo hiểm Bảo Việt</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
