import React from 'react';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
            <h3 className="font-headline-sm font-bold text-primary text-base">ข้อมูลผู้ปฏิบัติงานแล็บ</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center text-center p-3 bg-surface-container-low rounded-xl border border-surface-container">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-md mb-2">
            นศ
          </div>
          <h4 className="font-headline-sm font-bold text-primary text-sm">ทนพญ. นลินี วงศ์สุวรรณ</h4>
          <span className="font-caption text-xs text-secondary font-medium">นักเทคนิคการแพทย์ปฏิบัติการ (ชำนาญการ)</span>
          <span className="text-[11px] text-on-surface-variant mt-0.5">ใบอนุญาต ทน.พ. เลขที่ 14592</span>
        </div>

        {/* Details list */}
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between py-1 border-b border-surface-container">
            <span className="text-on-surface-variant">หน่วยงานสังกัด:</span>
            <strong className="text-primary">กลุ่มงานเทคนิคการแพทย์และชันสูตร</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-surface-container">
            <span className="text-on-surface-variant">ความรับผิดชอบ:</span>
            <strong className="text-primary">งานพัสดุและคลังชีวเคมี/ภูมิคุ้มกันวิทยา</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-surface-container">
            <span className="text-on-surface-variant">สิทธิ์การใช้งาน:</span>
            <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded font-semibold text-[10px]">
              ผู้เบิกจ่ายและตรวจรับพัสดุ (Authorized)
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-on-surface-variant">สถานะเวรปฏิบัติการ:</span>
            <span className="text-on-tertiary-container font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
              เวรเช้า (08:30 - 16:30 น.)
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 bg-primary text-white font-label-ui text-xs font-semibold rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
};
