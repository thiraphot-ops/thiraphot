import React, { useState } from 'react';

interface NHSOReportModalProps {
  onClose: () => void;
}

export const NHSOReportModal: React.FC<NHSOReportModalProps> = ({ onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitNHSO = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high max-h-[90vh] overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-2xl">
              health_and_safety
            </span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">
                รายงานพัสดุคงเหลือ สปสช. / กองทุนเอดส์
              </h3>
              <p className="font-caption text-xs text-on-surface-variant">
                ระบบเชื่อมโยงข้อมูล National AIDS Program (NAP Plus)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Overview Box */}
        <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-caption text-xs text-on-surface-variant">โควตาน้ำยาจัดสรรประจำปี 2568:</span>
            <span className="font-label-code-md text-xs font-bold text-primary">฿1,850,000 THB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-xs text-on-surface-variant">เบิกใช้ตรวจผู้ป่วยแล้ว:</span>
            <span className="font-label-code-md text-xs font-bold text-secondary">3,420 ราย (68.4%)</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden mt-1">
            <div className="bg-secondary h-full rounded-full" style={{ width: '68.4%' }}></div>
          </div>
        </div>

        {/* Quota Breakdown by category */}
        <div className="flex flex-col gap-2 text-xs">
          <span className="font-label-ui font-bold text-primary text-sm">การจัดสรรแยกตามประเภทการตรวจ:</span>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container flex items-center justify-between">
            <div>
              <strong className="block text-primary">1. การตรวจคัดกรองเร็ว (HIV Rapid Test)</strong>
              <span className="text-[11px] text-on-surface-variant">เป้าหมาย VCT & คัดกรองทั่วไป</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-primary">2,169 / 3,000</span>
              <span className="block text-[10px] text-on-tertiary-container font-semibold">เบิกใช้ 72.3%</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container flex items-center justify-between">
            <div>
              <strong className="block text-primary">2. การตรวจวัดระดับไวรัส (HIV Viral Load)</strong>
              <span className="text-[11px] text-on-surface-variant">ติดตามผลการรักษาด้วยยาต้านไวรัส (ARV)</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-primary">1,446 / 2,000</span>
              <span className="block text-[10px] text-on-tertiary-container font-semibold">เบิกใช้ 72.3%</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container flex items-center justify-between">
            <div>
              <strong className="block text-primary">3. การตรวจติดตามระบบภูมิคุ้มกัน (CD4 Count)</strong>
              <span className="text-[11px] text-on-surface-variant">ชุดโฟลไซโตเมทรี CD4/CD8</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-primary">723 / 1,200</span>
              <span className="block text-[10px] text-on-tertiary-container font-semibold">เบิกใช้ 60.2%</span>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">cloud_done</span>
            <span>ส่งข้อมูลรายงานรอบเดือนขึ้นระบบ NAP สปสช. สำเร็จแล้ว!</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-surface-container">
          <button
            onClick={handleSubmitNHSO}
            disabled={submitting}
            className="w-full h-11 bg-primary hover:bg-primary-container text-white font-label-ui text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>{submitting ? 'กำลังเชื่อมต่อ API สปสช. ...' : 'ส่งข้อมูลประจำงวดสู่ระบบ สปสช. (NAP Portal)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
