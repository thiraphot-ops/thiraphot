import React from 'react';
import { ColdChainSensor } from '../types/inventory';

interface ColdChainModalProps {
  sensors: ColdChainSensor[];
  onClose: () => void;
}

export const ColdChainModal: React.FC<ColdChainModalProps> = ({ sensors, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">thermostat</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">
                ระบบตรวจวัดอุณหภูมิ Cold Chain แบบ Real-time
              </h3>
              <p className="font-caption text-xs text-on-surface-variant">
                ตรวจจับตลอด 24 ชั่วโมง • มาตรฐาน ISO 15189
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

        {/* Status Callout */}
        <div className="bg-tertiary-fixed/40 p-3 rounded-xl border border-tertiary-container/20 flex items-center gap-2 text-xs text-on-tertiary-container">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="font-semibold">
            เซ็นเซอร์ทั้งหมด 4 จุดทำงานปกติ ไม่พบการเบี่ยงเบนอุณหภูมิ (No Excursion)
          </span>
        </div>

        {/* Sensor List */}
        <div className="flex flex-col gap-2.5">
          {sensors.map((s) => (
            <div
              key={s.id}
              className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container flex items-center justify-between"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-label-ui font-bold text-primary text-xs truncate">
                  {s.name}
                </span>
                <span className="font-caption text-[11px] text-on-surface-variant mt-0.5">
                  ช่วงเกณฑ์มาตรฐาน: {s.targetRange}
                </span>
                <span className="text-[10px] text-outline font-mono mt-0.5">
                  อัปเดต: {s.lastUpdated}
                </span>
              </div>

              <div className="text-right flex-shrink-0 bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-surface-container">
                <span className="font-label-code-lg text-sm font-bold text-secondary block">
                  {s.currentTemp > 0 ? `+${s.currentTemp.toFixed(1)}°C` : `${s.currentTemp.toFixed(1)}°C`}
                </span>
                <span className="font-caption text-[10px] font-semibold text-on-tertiary-container flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container inline-block"></span>
                  {s.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Calibration & Audit Info */}
        <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface-variant flex flex-col gap-1 border border-surface-container-high">
          <div className="flex justify-between">
            <span>ผู้สอบเทียบเซ็นเซอร์:</span>
            <strong className="text-primary">สถาบันมาตรวิทยาแห่งชาติ (NIMT)</strong>
          </div>
          <div className="flex justify-between">
            <span>รอบการสอบเทียบถัดไป:</span>
            <strong className="text-primary font-mono">15 พ.ย. 2568</strong>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 bg-primary text-white font-label-ui text-xs font-semibold rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
        >
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};
