import React from 'react';

interface NotificationModalProps {
  onClose: () => void;
  onNavigateToFEFO: () => void;
  onNavigateToPurchase: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  onNavigateToFEFO,
  onNavigateToPurchase,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-2xl">notifications_active</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">การแจ้งเตือนงานคลังแล็บ</h3>
              <p className="font-caption text-xs text-on-surface-variant">2 รายการเร่งด่วนที่ต้องดำเนินการ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-2.5">
          {/* Notification 1 */}
          <div className="bg-error-container/30 border border-error/30 p-3.5 rounded-xl flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-xl">event_busy</span>
                <span className="font-label-ui font-bold text-error text-xs">เตือนวันหมดอายุเร่งด่วน (FEFO)</span>
              </div>
              <span className="font-caption text-[10px] text-outline">10 นาทีที่แล้ว</span>
            </div>
            <p className="font-body-sm text-xs text-on-surface">
              ชุดตรวจ <strong>Determine HIV-1/2 Combo (Lot: D7821A)</strong> จะหมดอายุในอีก 18 วัน (28 เม.ย. 2025) คงเหลือ 45 กล่อง
            </p>
            <button
              onClick={() => {
                onClose();
                onNavigateToFEFO();
              }}
              className="self-end px-3 py-1 bg-error text-white text-xs font-semibold rounded-lg hover:bg-error/90 cursor-pointer active:scale-95"
            >
              ดูรายการ FEFO
            </button>
          </div>

          {/* Notification 2 */}
          <div className="bg-secondary-fixed/40 border border-secondary/30 p-3.5 rounded-xl flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">production_quantity_limits</span>
                <span className="font-label-ui font-bold text-secondary text-xs">ระดับสต๊อกต่ำกว่าเกณฑ์สั่งซื้อ</span>
              </div>
              <span className="font-caption text-[10px] text-outline">1 ชั่วโมงที่แล้ว</span>
            </div>
            <p className="font-body-sm text-xs text-on-surface">
              น้ำยา <strong>Abbott RealTiME HIV-1 Viral Load Kit</strong> คงเหลือ 4 ชุด ต่ำกว่า Re-Order Point (10 ชุด)
            </p>
            <button
              onClick={() => {
                onClose();
                onNavigateToPurchase();
              }}
              className="self-end px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-lg hover:bg-secondary/90 cursor-pointer active:scale-95"
            >
              เปิดใบขอซื้อทันที
            </button>
          </div>

          {/* Notification 3 (Informational) */}
          <div className="bg-surface-container-low border border-surface-container p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-tertiary-container text-xl">cloud_sync</span>
              <div className="flex flex-col">
                <span className="font-label-ui font-semibold text-primary text-xs">สำรองข้อมูลอัตโนมัติสำเร็จ</span>
                <span className="font-caption text-[11px] text-on-surface-variant">สำรองข้อมูลทะเบียนพัสดุและ Stock Card เรียบร้อย</span>
              </div>
            </div>
            <span className="text-[10px] text-outline font-mono">08:00 น.</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 bg-surface-container text-primary font-label-ui text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-highest"
        >
          ปิด
        </button>
      </div>
    </div>
  );
};
