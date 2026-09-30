import React, { useState } from 'react';

interface MilestoneStory {
  year: string;
  tagline: string;
  title: string;
  desc: string;
  detail: string;
  image: string;
  quote: string;
}

export const HistoryTimeline: React.FC = () => {
  const milestones: MilestoneStory[] = [
    {
      year: '1982',
      tagline: 'KHỞI NGUYÊN BỀN BỈ',
      title: 'Những bước chân đầu tiên',
      desc: 'Khởi đầu từ cơ sở sản xuất Vạn Thành – Bình Tiên với 20 công nhân thủ công kiên trì và bàn tay người thợ Việt.',
      detail: 'Trong giai đoạn đầy thử thách, mỗi đôi dép cao su được làm ra bằng sự tỉ mỉ, trung thực và ý chí vượt khó.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
      quote: '“Bền bỉ từng mũi khâu, đặt nền móng cho thương hiệu quốc gia.”',
    },
    {
      year: '2000s',
      tagline: 'THƯƠNG HIỆU QUỐC DÂN',
      title: 'Nâng niu bàn chân Việt',
      desc: 'Chiến dịch truyền thông lịch sử ghi dấu ấn sâu đậm trong tâm trí hàng chục triệu người con đất Việt.',
      detail: 'Biti’s đồng hành cùng tuổi thơ cắp sách đến trường, cùng những chuyến đi xa lập nghiệp của bao thế hệ gia đình.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      quote: '“Mỗi gia đình Việt Nam đều có ít nhất một đôi giày gắn bó kỷ niệm.”',
    },
    {
      year: 'Hôm nay',
      tagline: 'SÁNG TẠO & NET ZERO',
      title: 'Bứt phá cùng thế hệ trẻ',
      desc: 'Kỷ nguyên Biti’s Hunter chuyển mình rực rỡ, đưa văn hóa bản địa vào thời trang đường phố và cam kết phát triển bền vững.',
      detail: 'Ứng dụng vật liệu tái chế, tối ưu dấu chân carbon và truyền cảm hứng vận động tích cực cho giới trẻ năng động.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      quote: '“Đi để trở về, bước đi để yêu thương và bảo vệ hành tinh xanh.”',
    },
    {
      year: '2027',
      tagline: 'HỘI TỤ 45 NĂM',
      title: 'Bước Chạm Bước',
      desc: 'Giải chạy kỷ niệm 45 năm tại Sala – ngày hội thể thao nơi ba thế hệ cùng sải bước và kết nối tình thân gia đình.',
      detail: 'Không chỉ là cuộc đua thể thao, đây là dịp để tri ân chặng đường đã qua và mở lối cho những triệu bước chân mai sau.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
      quote: '“Ghi dấu hiện tại, cùng tiếp bước tương lai tươi sáng.”',
    },
  ];

  const [activeIdx, setActiveIdx] = useState<number>(3); // Default to 2027

  return (
    <section
      id="heritage"
      className="relative min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] lg:max-h-[calc(100vh-76px)] py-8 lg:py-0 flex flex-col justify-center bg-[#F3F7FA] text-[#18233A] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-3 lg:mb-4">
          <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#005EB8] mb-1 block">
            HÀNH TRÌNH DI SẢN · 1982–2027
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#18233A] leading-tight">
            45 năm · Một hành trình qua nhiều thế hệ
          </h2>
          <p className="mt-1 text-[#526077] text-xs sm:text-sm leading-relaxed line-clamp-1">
            Từ những bước chân thủ công kiên trì đầu tiên đến triệu bước chân tiếp nối hôm nay.
          </p>
        </div>

        {/* Horizontal Milestone Bar: 1982 → 2000s → Today → 2027 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-3 lg:mb-4">
          {milestones.map((item, index) => {
            const isCurrent = activeIdx === index;
            return (
              <button
                key={item.year}
                onClick={() => setActiveIdx(index)}
                className={`p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                  isCurrent
                    ? 'bg-[#18233A] text-white border-[#18233A] shadow-md'
                    : 'bg-white text-[#18233A] border-[#E8EDF2] hover:border-[#F26522]/50 hover:bg-[#FAF7F1]'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`font-heading font-black text-lg sm:text-xl tracking-tight ${
                      isCurrent ? 'text-[#F26522]' : 'text-[#005EB8]'
                    }`}
                  >
                    {item.year}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isCurrent ? 'bg-white/10 text-white' : 'bg-black/5 text-[#526077]'
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
                <div className={`text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider line-clamp-1 ${isCurrent ? 'text-white/80' : 'text-[#526077]'}`}>
                  {item.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Milestone Editorial Story Showcase */}
        {(() => {
          const current = milestones[activeIdx];
          return (
            <div className="rounded-2xl bg-white border border-[#E8EDF2] overflow-hidden shadow-[0_4px_20px_rgba(24,35,58,0.04)] grid grid-cols-1 lg:grid-cols-12 max-h-[340px] lg:max-h-[360px]">
              
              {/* Story Narrative: 7 cols */}
              <div className="lg:col-span-7 p-4 sm:p-6 lg:p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                    <span className="text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-widest text-[#F26522]">
                      {current.tagline} · NĂM {current.year}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-xl sm:text-2xl text-[#18233A] tracking-tight mb-1.5">
                    {current.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#18233A] font-medium leading-relaxed mb-1.5">
                    {current.desc}
                  </p>

                  <p className="text-[11px] sm:text-xs text-[#526077] leading-relaxed mb-3 line-clamp-2">
                    {current.detail}
                  </p>
                </div>

                {/* Editorial Quote Box */}
                <div className="pt-3 border-t border-[#EEE5D7] bg-[#FAF7F1] -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 lg:-mx-6 lg:-mb-6 p-3 sm:p-4">
                  <p className="font-serif italic text-xs sm:text-sm text-[#18233A]">
                    {current.quote}
                  </p>
                  <span className="block text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-[#005EB8] mt-1">
                    Tư liệu Biti's 45 năm · Di sản Việt Nam
                  </span>
                </div>
              </div>

              {/* Archival / Lifestyle Image: 5 cols */}
              <div className="lg:col-span-5 relative min-h-[160px] lg:min-h-full bg-[#18233A]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center filter saturate-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[10px] z-10">
                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 inline-block font-mono">
                    Tư liệu ảnh · {current.year}
                  </span>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};
