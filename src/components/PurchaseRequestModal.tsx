import React, { useState } from 'react';

interface PurchaseRequestModalProps {
  initialItemName?: string;
  onClose: () => void;
}

export const PurchaseRequestModal: React.FC<PurchaseRequestModalProps> = ({
  initialItemName = 'Abbott RealTiME HIV-1 Viral Load Kit',
  onClose,
}) => {
  const [itemName, setItemName] = useState(initialItemName);
  const [quantity, setQuantity] = useState(15);
  const [urgency, setUrgency] = useState<'urgent' | 'routine'>('urgent');
  const [notes, setNotes] = useState('ระดับสต๊อกคงเหลือต่ำกว่า Safety Stock ขอเร่งรัดกระบวนการจัดซื้อจัดจ้าง');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">add_shopping_cart</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">เปิดใบขอซื้อพัสดุ (PR)</h3>
              <p className="font-caption text-xs text-on-surface-variant">ระบบขออนุมัติจัดซื้อน้ำยาตรวจชันสูตร</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <h4 className="font-headline-sm font-bold text-primary">ส่งใบขอซื้อ (PR) สำเร็จแล้ว</h4>
            <p className="font-caption text-xs text-on-surface-variant">
              เลขที่เอกสาร <strong>PR-2568/088</strong> ส่งถึงหัวหน้ากลุ่มงานและฝ่ายพัสดุเรียบร้อยแล้ว
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">รายการเวชภัณฑ์ / น้ำยา</label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-primary">จำนวนที่ขอซื้อ</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container font-mono text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-primary">ระดับความเร่งด่วน</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="h-9 px-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
                >
                  <option value="urgent">เร่งด่วนมาก (สต๊อกต่ำกว่า ROP)</option>
                  <option value="routine">ตามรอบปกติ (Routine)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">งบประมาณที่ใช้</label>
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container flex items-center justify-between">
                <span>งบประมาณ สปสช. / กองทุนเอดส์</span>
                <strong className="text-secondary font-mono">คงเหลือ ฿407,500</strong>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">หมายเหตุ / เหตุผลความจำเป็น</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="p-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              />
            </div>

            <div className="pt-2 border-t border-surface-container flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-10 rounded-xl bg-surface-container text-primary font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-10 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {isSubmitting ? (
                  <span>กำลังส่ง...</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>ส่งใบขอซื้อ (PR)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
