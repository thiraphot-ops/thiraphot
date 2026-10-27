import React, { useState, useMemo } from 'react';
import { ReagentItem, ReagentCategory } from '../types/inventory';

interface InventoryScreenProps {
  reagents: ReagentItem[];
  onSelectReagentForDispense: (reagent: ReagentItem) => void;
  onOpenStickerModal: (reagent: ReagentItem) => void;
  onOpenAddReagentModal: () => void;
  onOpenColdChain: () => void;
  initialFilter?: string;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({
  reagents,
  onSelectReagentForDispense,
  onOpenStickerModal,
  onOpenAddReagentModal,
  onOpenColdChain,
  initialFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>(initialFilter);
  const [sortByFEFO, setSortByFEFO] = useState<boolean>(true);

  // Filter & sort reagents
  const filteredReagents = useMemo(() => {
    return reagents
      .filter((item) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            item.name.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            item.lotNo.toLowerCase().includes(q) ||
            item.manufacturer.toLowerCase().includes(q) ||
            item.storageLocation.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Status filter
        if (statusFilter === 'expiring') {
          return item.daysRemaining <= 60;
        }
        if (statusFilter === 'critical') {
          return item.status === 'low_stock' || item.currentStock <= item.safetyStock;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortByFEFO) {
          return a.daysRemaining - b.daysRemaining;
        }
        return b.currentStock - a.currentStock;
      });
  }, [reagents, searchQuery, selectedCategory, statusFilter, sortByFEFO]);

  // Total value of currently visible items
  const totalVisibleValue = useMemo(() => {
    return filteredReagents.reduce((sum, item) => sum + item.currentStock * item.unitPrice, 0);
  }, [filteredReagents]);

  const hasExpiringLot = filteredReagents.some((r) => r.daysRemaining <= 30);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Cold Chain Telemetry Alert Bar */}
      <div className="px-margin pt-space-sm pb-space-xs">
        <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between shadow-sm border border-surface-container">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">ac_unit</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-caption text-caption text-on-surface-variant truncate">
                ตู้แช่หลัก คลังน้ำยา 1 (2°C - 8°C)
              </span>
              <span className="font-label-code-md text-label-code-md text-on-surface font-semibold flex items-center gap-1">
                +4.2°C{' '}
                <span className="text-on-tertiary-container font-body-sm text-[11px] font-normal flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container inline-block"></span>{' '}
                  เสถียรปกติ
                </span>
              </span>
            </div>
          </div>
          <button
            onClick={onOpenColdChain}
            className="px-space-sm py-1 bg-surface-container rounded-lg text-primary text-caption font-caption hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 border border-surface-container-highest"
            type="button"
          >
            เซ็นเซอร์ (4)
          </button>
        </div>
      </div>

      {/* Search & Barcode Scan Bar */}
      <div className="px-margin py-space-xs flex flex-col gap-space-xs">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-11 pl-10 pr-20 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all shadow-sm border border-surface-container-high/60"
            id="inventory-search"
            placeholder="ค้นหาชื่อน้ำยา, Lot No., รหัสพัสดุ..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-7 h-7 flex items-center justify-center rounded-md text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
            <button
              aria-label="สแกนบาร์โค้ดทันที"
              onClick={() => {
                const sample = reagents[0];
                if (sample) onSelectReagentForDispense(sample);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container-high text-primary hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer"
              type="button"
              title="เปิดกล้องสแกนบาร์โค้ด"
            >
              <span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Horizontal Scroll) */}
        <div className="flex items-center gap-space-xs overflow-x-auto py-1 scrollbar-none no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full font-caption text-caption font-semibold flex-shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container'
            }`}
            type="button"
          >
            <span>ทั้งหมด</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCategory === 'all'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-high text-on-surface'
              }`}
            >
              38
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('rapid')}
            className={`px-3 py-1.5 rounded-full font-caption text-caption flex-shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'rapid'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container'
            }`}
            type="button"
          >
            <span>ตรวจคัดกรอง (Rapid Test)</span>
          </button>

          <button
            onClick={() => setSelectedCategory('viralload')}
            className={`px-3 py-1.5 rounded-full font-caption text-caption flex-shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'viralload'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container'
            }`}
            type="button"
          >
            <span>ตรวจยืนยัน (Viral Load/PCR)</span>
          </button>

          <button
            onClick={() => setSelectedCategory('cd4')}
            className={`px-3 py-1.5 rounded-full font-caption text-caption flex-shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'cd4'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container'
            }`}
            type="button"
          >
            <span>ตรวจติดตาม CD4</span>
          </button>

          <button
            onClick={() => setSelectedCategory('consumable')}
            className={`px-3 py-1.5 rounded-full font-caption text-caption flex-shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
              selectedCategory === 'consumable'
                ? 'bg-primary text-on-primary font-semibold shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container'
            }`}
            type="button"
          >
            <span>วัสดุสิ้นเปลือง</span>
          </button>
        </div>

        {/* Status & Stock Level Filter Row */}
        <div className="flex items-center justify-between gap-space-xs pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-caption text-caption font-medium flex items-center gap-1 cursor-pointer transition-all ${
                statusFilter === 'all'
                  ? 'bg-surface-container-highest text-primary font-bold border border-secondary/30'
                  : 'bg-surface-container text-on-surface'
              }`}
              type="button"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              ทุกสถานะ
            </button>

            <button
              onClick={() => setStatusFilter(statusFilter === 'expiring' ? 'all' : 'expiring')}
              className={`px-2.5 py-1 rounded-lg font-caption text-caption flex items-center gap-1 cursor-pointer transition-all ${
                statusFilter === 'expiring'
                  ? 'bg-error text-white font-bold'
                  : 'bg-error-container/40 text-on-error-container hover:bg-error-container/60'
              }`}
              type="button"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  statusFilter === 'expiring' ? 'bg-white' : 'bg-error'
                }`}
              />
              ใกล้หมดอายุ (&lt;60 วัน)
            </button>

            <button
              onClick={() => setStatusFilter(statusFilter === 'critical' ? 'all' : 'critical')}
              className={`px-2.5 py-1 rounded-lg font-caption text-caption flex items-center gap-1 cursor-pointer transition-all ${
                statusFilter === 'critical'
                  ? 'bg-outline text-white font-bold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
              type="button"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  statusFilter === 'critical' ? 'bg-white' : 'bg-outline'
                }`}
              />
              สต๊อกวิกฤต
            </button>
          </div>

          <button
            aria-label="เรียงลำดับ FEFO"
            onClick={() => setSortByFEFO(!sortByFEFO)}
            className={`h-7 px-2 rounded-lg text-caption font-caption flex items-center gap-1 flex-shrink-0 shadow-sm cursor-pointer border transition-colors ${
              sortByFEFO
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-lowest text-on-surface-variant border-surface-container hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">sort</span>
            FEFO {sortByFEFO ? '✓' : ''}
          </button>
        </div>
      </div>

      {/* Reagent Inventory Cards List */}
      <div className="px-margin pt-space-xs pb-space-lg flex flex-col gap-space-sm" id="reagent-list">
        {filteredReagents.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center border border-surface-container flex flex-col items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2 text-outline">
              search_off
            </span>
            <span className="font-headline-sm font-semibold text-primary">ไม่พบรายการน้ำยา</span>
            <p className="font-body-sm mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p>
          </div>
        ) : (
          filteredReagents.map((item) => {
            const isExpiring = item.daysRemaining <= 30;
            const isWarning = item.daysRemaining > 30 && item.daysRemaining <= 90;
            const isLowStock = item.currentStock <= item.safetyStock;

            // Accent bar color
            const barColor = isExpiring
              ? 'bg-error'
              : isLowStock
              ? 'bg-secondary'
              : isWarning
              ? 'bg-secondary'
              : 'bg-on-tertiary-container';

            // Percent capacity
            const percent = Math.min(100, Math.round((item.currentStock / item.maxStock) * 100));

            return (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm transition-all hover:shadow-md relative overflow-hidden"
              >
                {/* Top Urgency Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${barColor}`} />

                <div className="flex items-start justify-between gap-space-xs">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded bg-surface-container font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">
                        {item.id}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-caption text-caption flex items-center gap-0.5 font-medium">
                        <span className="material-symbols-outlined text-[12px]">
                          device_thermostat
                        </span>{' '}
                        {item.storageTemp}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-caption text-caption">
                        {item.storageLocation}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight mt-1 truncate">
                      {item.name}
                    </h2>
                    <span className="font-caption text-caption text-on-surface-variant truncate">
                      {item.description}
                    </span>
                  </div>

                  <button
                    aria-label="พิมพ์สติกเกอร์ LOT"
                    onClick={() => onOpenStickerModal(item)}
                    className="text-outline hover:text-primary p-1 cursor-pointer transition-colors"
                    type="button"
                    title="ตัวเลือกเพิ่มเติม / พิมพ์บาร์โค้ด"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>

                {/* Lot & Expiration Metadata Box */}
                <div className="bg-surface-container-low rounded-lg p-space-sm grid grid-cols-2 gap-space-xs border border-surface-container/60">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant">
                      Lot No.
                    </span>
                    <span className="font-label-code-md text-label-code-md text-on-surface font-semibold">
                      {item.lotNo}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-caption text-caption text-on-surface-variant">
                      วันหมดอายุ (EXP)
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`font-label-code-md text-label-code-md font-bold ${
                          isExpiring ? 'text-error' : 'text-on-surface'
                        }`}
                      >
                        {item.expiryDateStr}
                      </span>
                    </div>
                    {isExpiring ? (
                      <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-caption text-[10px] font-bold mt-0.5">
                        เตือน: หมดอายุใน {item.daysRemaining} วัน (FEFO เร่งด่วน)
                      </span>
                    ) : isWarning ? (
                      <span className="px-1.5 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-caption text-[10px] font-semibold mt-0.5">
                        เฝ้าระวัง ({item.daysRemaining} วัน)
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-[10px] font-semibold mt-0.5">
                        ปลอดภัย ({item.daysRemaining} วัน)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantities & Financials */}
                <div className="grid grid-cols-2 gap-space-sm pt-0.5">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-md text-headline-md text-on-surface font-bold">
                        {item.currentStock}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {item.unit}
                      </span>
                      <span className="font-caption text-caption text-outline">
                        / {item.maxStock}
                      </span>
                    </div>
                    <span
                      className={`font-caption text-caption ${
                        isLowStock ? 'text-error font-medium' : 'text-on-surface-variant'
                      }`}
                    >
                      ระดับสต๊อก:{' '}
                      {isLowStock
                        ? `จุดสั่งซื้อซ้ำ (ROP: ${item.safetyStock})`
                        : item.currentStock <= item.safetyStock + 5
                        ? 'เฝ้าระวัง'
                        : 'เพียงพอ'}
                    </span>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                    <span className="font-label-code-sm text-label-code-sm text-on-surface font-medium">
                      ฿{item.unitPrice.toLocaleString('th-TH')} / {item.unit}
                    </span>
                    <span className="font-label-code-md text-label-code-md text-secondary font-bold">
                      ฿{(item.currentStock * item.unitPrice).toLocaleString('th-TH')}
                    </span>
                  </div>
                </div>

                {/* Stock Meter Gauge */}
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isExpiring
                          ? 'bg-error'
                          : isLowStock
                          ? 'bg-secondary'
                          : 'bg-on-tertiary-container'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-caption font-caption text-on-surface-variant">
                    <span>ความจุคลังคงเหลือ {percent}%</span>
                    {isLowStock ? (
                      <span className="text-error font-medium">
                        ต่ำกว่า Safety Stock ({item.safetyStock})
                      </span>
                    ) : (
                      <span className="text-on-tertiary-container font-medium">
                        ระดับพร้อมให้บริการ
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex items-center gap-space-xs pt-1">
                  <button
                    onClick={() => onSelectReagentForDispense(item)}
                    className="flex-1 h-9 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-caption text-caption font-semibold flex items-center justify-center gap-1 shadow-sm active:opacity-90 transition-all cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">outbox</span>
                    เบิกใช้น้ำยาตรวจ
                  </button>
                  <button
                    onClick={() => onOpenStickerModal(item)}
                    className="h-9 px-3 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-caption text-caption font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer border border-surface-container-highest"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    พิมพ์สติกเกอร์
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Footer Card */}
      <div className="px-margin pb-6">
        <div className="bg-surface-container-high/60 backdrop-blur rounded-xl p-space-md flex items-center justify-between shadow-sm border border-surface-container-highest">
          <div className="flex flex-col">
            <span className="font-caption text-caption text-on-surface-variant">
              รายการที่แสดงในคลัง
            </span>
            <span className="font-label-code-md text-label-code-md text-on-surface font-bold">
              {filteredReagents.length} จาก 38 รายการ
            </span>
            {hasExpiringLot && (
              <span className="font-caption text-[11px] text-error flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">warning</span> มีล็อตใกล้หมดอายุ (เร่งใช้ตาม FEFO)
              </span>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className="font-caption text-caption text-on-surface-variant">
              มูลค่ารวมชุดตัวอย่าง
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              ฿{totalVisibleValue.toLocaleString('th-TH')}
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              งบประมาณเบิกจ่าย สปสช.
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB): Add / Intake Reagent */}
      <div className="fixed right-4 bottom-20 z-30 max-w-lg">
        <button
          onClick={onOpenAddReagentModal}
          className="h-12 px-4 bg-primary text-on-primary rounded-full shadow-xl flex items-center gap-2 hover:bg-secondary active:scale-95 transition-all cursor-pointer border border-white/20"
          id="btn-intake-reagent"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">add</span>
          <span className="font-label-ui text-label-ui font-semibold">รับเข้าน้ำยาใหม่</span>
        </button>
      </div>
    </div>
  );
};
