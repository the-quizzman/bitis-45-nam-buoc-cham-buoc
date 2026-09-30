import React from 'react';

export const BigIdeaSection: React.FC = () => {
  const steps = [
    {
      year: '1982',
      generation: 'Thế Hệ Ông Bà',
      role: 'Nền Móng Bền Bỉ',
      desc: 'Bền bỉ khai phá, đặt nền móng với tinh thần kiên trì và bàn tay người thợ Việt từ những xưởng thủ công đầu tiên.',
      borderAccent: 'border-slate-200 hover:border-amber-400',
      badgeBg: 'bg-amber-50 text-amber-800',
    },
    {
      year: '2000',
      generation: 'Thế Hệ Cha Mẹ',
      role: 'Trụ Cột Yêu Thương',
      desc: 'Nâng niu giá trị gia đình, đồng hành cùng sự phát triển của quê hương đất nước qua thông điệp “Nâng niu bàn chân Việt”.',
      borderAccent: 'border-slate-200 hover:border-orange-400',
      badgeBg: 'bg-orange-50 text-orange-800',
    },
    {
      year: '2027',
      generation: 'Thế Hệ Con Cháu',
      role: 'Tiếp Bước Tương Lai',
      desc: 'Tự tin sải bước khám phá thế giới, bứt phá năng động cùng Biti’s Hunter và cùng Biti’s kiến tạo tương lai xanh bền vững.',
      borderAccent: 'border-slate-200 hover:border-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-800',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FAFC] via-amber-50/20 to-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-heading font-black tracking-widest text-orange-600 uppercase mb-2 inline-block">
            Ý NGHĨA THÔNG ĐIỆP
          </span>

          <h2 className="text-balance font-heading font-black text-4xl sm:text-6xl uppercase tracking-tighter text-slate-900 leading-tight">
            BƯỚC <span className="text-amber-500 italic lowercase font-serif font-normal">chạm</span> BƯỚC
          </h2>

          <p className="mt-4 text-slate-700 text-base sm:text-lg font-medium">
            “Mỗi bước chân không chỉ là một chuyển động về phía trước, mà còn là sự tiếp nối thiêng liêng giữa các thế hệ.”
          </p>

          <p className="mt-2 text-slate-500 text-sm max-w-2xl mx-auto">
            Từ những bước chân đầu tiên của Biti’s năm 1982 đến bước chạy hôm nay, hành trình 45 năm được dệt nên bởi sự kiên định, lòng tự hào và tình cảm gia đình người Việt.
          </p>
        </div>

        {/* 3 Generation Step Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.generation}
              className={`p-7 rounded-2xl bg-white border ${step.borderAccent} transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${step.badgeBg}`}>
                    {step.year}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Giai đoạn 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl text-slate-900 mb-1">
                  {step.generation}
                </h3>
                <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-3">
                  {step.role}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
