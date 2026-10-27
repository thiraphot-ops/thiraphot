import React, { useState } from 'react';
import { ReagentItem } from '../types/inventory';

interface PhysicalCountModalProps {
  reagents: ReagentItem[];
  onClose: () => void;
}

export const PhysicalCountModal: React.FC<PhysicalCountModalProps> = ({ reagents, onClose }) => {
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    reagents.forEach((r) => {
      initial[r.id] = r.currentStock;
    });
    return initial;
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCountChange = (id: string, val: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, val),
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high max-h-[90vh] overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">fact_check</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">ตรวจนับพัสดุสิ้นงวด (Physical Count)</h3>
              <p className="font-caption text-xs text-on-surface-variant">บันทึกตรวจนับยอดคงเหลือจริงเทียบทะเบียนคุม</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Status Match Banner */}
        <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container flex items-center justify-between text-xs">
          <div>
            <span className="text-on-surface-variant block">สถานะการกระทบยอด:</span>
            <strong className="text-on-tertiary-container font-semibold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-base">check_circle</span>
              100% Stock Match (ไร้ผลต่าง)
            </strong>
          </div>
          <div className="text-right">
            <span className="text-on-surface-variant block">กรรมการตรวจนับ:</span>
            <strong className="text-primary">3 ท่าน ลงนามครบ</strong>
          </div>
        </div>

        {/* Items List */}
        <div className="flex flex-col flex-1 overflow-y-auto border border-surface-container rounded-xl divide-y divide-surface-container/60">
          {reagents.map((r) => {
            const counted = counts[r.id] ?? r.currentStock;
            const diff = counted - r.currentStock;

            return (
              <div key={r.id} className="p-3 flex items-center justify-between gap-2 hover:bg-surface-container-low/50">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="font-label-code-sm text-[11px] text-outline font-mono">{r.id} • Lot: {r.lotNo}</span>
                  <span className="font-body-md font-bold text-primary text-xs truncate">{r.name}</span>
                  <span className="font-caption text-[11px] text-on-surface-variant">
                    ยอดในระบบ: <strong className="font-mono text-primary">{r.currentStock} {r.unit}</strong> • ที่ตั้ง: {r.storageLocation}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="flex items-center bg-surface-container-lowest rounded-lg border border-surface-container p-0.5">
                    <button
                      onClick={() => handleCountChange(r.id, counted - 1)}
                      className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary font-bold active:scale-95 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={counted}
                      onChange={(e) => handleCountChange(r.id, parseInt(e.target.value) || 0)}
                      className="w-12 text-center font-mono font-bold text-xs bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={() => handleCountChange(r.id, counted + 1)}
                      className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary font-bold active:scale-95 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span
                    className={`font-label-code-sm text-xs font-bold px-1.5 py-0.5 rounded ${
                      diff === 0
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-error-container text-error'
                    }`}
                  >
                    {diff === 0 ? 'ตรง' : `${diff > 0 ? '+' : ''}${diff}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {saved && (
          <div className="p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>บันทึกผลการตรวจนับพัสดุสิ้นงวดและลงลายมือชื่อดิจิทัลสำเร็จแล้ว</span>
          </div>
        )}

        {/* Action */}
        <div className="pt-2 border-t border-surface-container flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 rounded-xl bg-surface-container text-primary font-semibold hover:bg-surface-container-high transition-colors cursor-pointer text-xs"
          >
            ปิด
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-10 rounded-xl bg-primary text-white font-semibold hover:bg-primary-container transition-colors shadow-md cursor-pointer text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {saving ? (
              <span>กำลังบันทึก...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>ยืนยันผลการตรวจนับ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
