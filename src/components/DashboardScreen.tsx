import React from 'react';
import { ReagentItem } from '../types/inventory';
import { NavTab } from './BottomNav';

interface DashboardScreenProps {
  reagents: ReagentItem[];
  onNavigateTab: (tab: NavTab) => void;
  onSelectReagentForDispense: (reagent: ReagentItem) => void;
  onOpenColdChain: () => void;
  onOpenPurchaseRequest: (reagentName?: string) => void;
  onOpenPhysicalCount: () => void;
  onOpenStockCard: () => void;
  onFilterFEFO: () => void;
  todayStats: {
    dispensed: number;
    received: number;
    completedRequests: number;
  };
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  reagents,
  onNavigateTab,
  onSelectReagentForDispense,
  onOpenColdChain,
  onOpenPurchaseRequest,
  onOpenPhysicalCount,
  onOpenStockCard,
  onFilterFEFO,
  todayStats,
}) => {
  // Determine HIV reagent (Lot D7821A)
  const determineItem = reagents.find((r) => r.lotNo === 'D7821A') || reagents[0];
  // Abbott RealTime HIV-1 reagent (Lot AB-902)
  const abbottItem = reagents.find((r) => r.lotNo === 'AB-902') || reagents[4];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Status & Greeting Banner */}
      <div className="px-margin pt-space-md pb-space-sm flex items-center justify-between gap-space-sm">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            <span className="font-label-ui text-label-ui text-on-surface-variant font-semibold uppercase tracking-wider">
              ห้องปฏิบัติการตรวจภูมิคุ้มกันวิทยา (HIV/AIDS)
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight truncate mt-0.5">
            ภาพรวมคลังเวชภัณฑ์ & น้ำยา
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-high px-space-sm py-1 rounded-full text-on-surface flex-shrink-0 shadow-sm border border-surface-container-highest">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            verified_user
          </span>
          <span className="font-caption text-caption font-semibold">ISO 15189</span>
        </div>
      </div>

      {/* Main Valuation Hero Card */}
      <div className="px-margin mb-space-md">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container via-primary to-primary-container p-space-lg text-on-primary shadow-xl">
          {/* Decorative Micro Grid Background Accent */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary/15 blur-2xl pointer-events-none" />
          <div className="absolute right-3 top-3 opacity-10 flex pointer-events-none">
            <span className="material-symbols-outlined text-[100px]">inventory_2</span>
          </div>

          <div className="relative z-10 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-on-primary-container">
                <span className="material-symbols-outlined text-[18px]">
                  account_balance_wallet
                </span>
                <span className="font-label-ui text-label-ui tracking-wide">
                  มูลค่าสต๊อกคลังคงเหลือสุทธิ
                </span>
              </div>
              <span className="inline-flex items-center gap-1 bg-surface-container-lowest/15 backdrop-blur-md px-2 py-0.5 rounded-full text-tertiary-fixed font-label-code-sm text-label-code-sm font-semibold border border-white/10">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +3.2% MoM
              </span>
            </div>

            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-extrabold tracking-tight text-white">
                ฿2,485,600
              </span>
              <span className="font-caption text-caption text-primary-fixed-dim font-medium">
                THB
              </span>
            </div>

            {/* Metric split footer */}
            <div className="pt-space-sm mt-space-xs bg-white/10 -mx-space-lg -mb-space-lg px-space-lg py-space-sm grid grid-cols-2 gap-space-md backdrop-blur-sm rounded-b-2xl">
              <div className="flex flex-col">
                <span className="font-caption text-caption text-primary-fixed-dim">
                  จำนวนเวชภัณฑ์ที่เปิดใช้งาน
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-white">
                    38
                  </span>
                  <span className="font-caption text-caption text-on-primary-container">
                    รายการ (Active SKUs)
                  </span>
                </div>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-space-md">
                <span className="font-caption text-caption text-primary-fixed-dim">
                  ยอดปริมาณรวมทั้งหมด
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-label-code-lg text-label-code-lg font-bold text-white">
                    4,820
                  </span>
                  <span className="font-caption text-caption text-on-primary-container">
                    Tests / หน่วย
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Activity Digest (Today's In/Out Flow) */}
      <div className="px-margin mb-space-md">
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-ui text-label-ui text-on-surface font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-secondary">
                swap_horiz
              </span>
              สรุปการหมุนเวียนเบิก-จ่าย วันนี้
            </span>
            <span className="font-caption text-caption text-on-surface-variant font-medium">
              {todayStats.completedRequests} คำขอเสร็จสมบูรณ์
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-container/60">
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-caption text-on-surface-variant">
                  เบิกจ่ายออกจากคลัง
                </span>
                <span className="font-label-code-lg text-label-code-lg font-bold text-error mt-0.5">
                  -{todayStats.dispensed}{' '}
                  <span className="font-caption text-caption text-on-surface-variant font-normal">
                    ชุด
                  </span>
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-error-container/60 flex items-center justify-center text-error flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">output</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-container/60">
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-caption text-on-surface-variant">
                  ตรวจรับเข้าคลัง
                </span>
                <span className="font-label-code-lg text-label-code-lg font-bold text-on-tertiary-container mt-0.5">
                  +{todayStats.received}{' '}
                  <span className="font-caption text-caption text-on-surface-variant font-normal">
                    ชุด
                  </span>
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed/50 flex items-center justify-center text-on-tertiary-fixed-variant flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">input</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Alert Cards Carousel / Stack */}
      <div className="px-margin mb-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-error text-[22px]">warning</span>
            การแจ้งเตือนสำคัญ (Alerts)
          </span>
          <span className="font-caption text-caption font-semibold bg-error-container text-on-error-container px-2 py-0.5 rounded-full border border-error/20">
            2 หมวดหมู่เร่งด่วน
          </span>
        </div>

        {/* FEFO Expiry Warning Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-error-container/70 flex items-center justify-center text-error flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">event_busy</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    3 รายการ
                  </span>
                  <span className="font-caption text-caption px-1.5 py-0.5 bg-error-container text-on-error-container rounded font-bold">
                    ≤ 30 วัน
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  เวชภัณฑ์เข้าใกล้เกณฑ์วันหมดอายุ (FEFO)
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-label-code-md text-label-code-md font-bold text-error">
                ฿142,500
              </span>
              <span className="block font-caption text-caption text-on-surface-variant">
                มูลค่าเสี่ยง
              </span>
            </div>
          </div>

          <div className="bg-error-container/20 rounded-xl p-space-sm flex items-center justify-between gap-2 border border-error/15">
            <div className="flex items-center gap-1.5 text-on-error-container font-caption text-caption font-medium min-w-0">
              <span className="material-symbols-outlined text-[16px] flex-shrink-0 text-error">
                priority_high
              </span>
              <span className="truncate">เร่งจ่ายคลังตามลำดับ First-Expired First-Out</span>
            </div>
            <button
              onClick={onFilterFEFO}
              className="bg-error text-on-error hover:bg-error/90 font-label-ui text-label-ui px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95 flex-shrink-0 cursor-pointer"
              type="button"
            >
              <span>ดูและเร่งระบาย FEFO</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Safety Stock Shortage Warning Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  production_quantity_limits
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    2 รายการ
                  </span>
                  <span className="font-caption text-caption px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-bold">
                    สต๊อกต่ำ
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  ต่ำกว่าจุดสั่งซื้อความปลอดภัย (Safety Stock)
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenPurchaseRequest('แผ่นตรวจ 4th Gen Rapid Test & Viral Load Lysis Buffer')}
              className="h-9 px-3 bg-secondary text-on-secondary rounded-lg font-label-ui text-label-ui font-semibold flex items-center gap-1 self-center shadow-sm hover:bg-secondary/90 transition-all cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>เปิดใบขอซื้อ</span>
            </button>
          </div>
          <div className="text-on-surface-variant font-caption text-caption bg-surface-container-low px-space-sm py-1.5 rounded-lg border border-surface-container">
            ตัวอย่าง: แผ่นตรวจ 4th Gen Rapid Test & Viral Load Lysis Buffer
          </div>
        </div>
      </div>

      {/* Reagent Category Distribution Breakdown */}
      <div className="px-margin mb-space-md">
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-ui text-label-ui font-bold text-primary">
                สัดส่วนมูลค่าตามประเภทน้ำยาและเวชภัณฑ์
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                การกระจายตัวของสต๊อกในห้องปฏิบัติการ
              </span>
            </div>
            <span className="font-label-code-sm text-label-code-sm font-bold text-secondary">
              100% สรุปผล
            </span>
          </div>

          {/* Segmented Bar Visualization */}
          <div className="w-full flex flex-col gap-1.5">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-surface-container-highest">
              <div className="h-full bg-secondary" style={{ width: '45%' }} title="คัดกรอง 45%" />
              <div
                className="h-full bg-primary-container"
                style={{ width: '30%' }}
                title="Viral Load 30%"
              />
              <div
                className="h-full bg-tertiary-fixed-dim"
                style={{ width: '15%' }}
                title="CD4 Monitoring 15%"
              />
              <div
                className="h-full bg-outline-variant"
                style={{ width: '10%' }}
                title="วัสดุสิ้นเปลือง 10%"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-space-md gap-y-space-sm pt-space-xs">
              {/* 1. Rapid Screening */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-caption text-caption text-on-surface truncate">
                      ชุดตรวจคัดกรอง (Rapid)
                    </span>
                    <span className="font-label-code-sm text-label-code-sm font-bold text-on-surface">
                      45%
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant truncate">
                    ฿1,118,520 (2,169 Tests)
                  </span>
                </div>
              </div>

              {/* 2. Viral Load / PCR */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-caption text-caption text-on-surface truncate">
                      น้ำยา Viral Load / PCR
                    </span>
                    <span className="font-label-code-sm text-label-code-sm font-bold text-on-surface">
                      30%
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant truncate">
                    ฿745,680 (1,446 Tests)
                  </span>
                </div>
              </div>

              {/* 3. CD4 Monitoring */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-caption text-caption text-on-surface truncate">
                      CD4 Monitoring Kits
                    </span>
                    <span className="font-label-code-sm text-label-code-sm font-bold text-on-surface">
                      15%
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant truncate">
                    ฿372,840 (723 Tests)
                  </span>
                </div>
              </div>

              {/* 4. Consumables */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-outline-variant flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-caption text-caption text-on-surface truncate">
                      วัสดุสิ้นเปลือง / หลอด EDTA
                    </span>
                    <span className="font-label-code-sm text-label-code-sm font-bold text-on-surface">
                      10%
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant truncate">
                    ฿248,560 (482 ชุด)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Cold Chain Integrity Status Widget */}
      <div className="px-margin mb-space-md">
        <button
          onClick={onOpenColdChain}
          className="w-full text-left bg-surface-container rounded-2xl p-space-md shadow-sm border border-surface-container-highest flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer group"
          type="button"
        >
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">thermostat</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-label-ui text-label-ui font-bold text-primary truncate">
                  ตู้แช่น้ำยาคลังหลัก (Cold Chain)
                </span>
                <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
              </div>
              <span className="font-caption text-caption text-on-surface-variant">
                อุณหภูมิควบคุมกำหนด: 2°C ถึง 8°C
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0 bg-surface-container-lowest px-space-sm py-1.5 rounded-xl shadow-sm border border-surface-container">
            <span className="font-label-code-lg text-label-code-lg font-bold text-secondary">
              4.2°C
            </span>
            <span className="block font-caption text-caption text-on-tertiary-container font-semibold">
              ปกติ (Stable)
            </span>
          </div>
        </button>
      </div>

      {/* Action Required List (Critical Stock Level / FEFO) */}
      <div className="px-margin mb-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              assignment_late
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
              รายการที่ต้องจัดการทันที
            </h2>
          </div>
          <span className="font-caption text-caption text-on-surface-variant">
            อัปเดตล่าสุด: 10 นาทีที่แล้ว
          </span>
        </div>

        {/* Item 1: Expiring Soon (Alere Determine) */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-caption text-caption font-bold">
                  ใกล้หมดอายุ
                </span>
                <span className="font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">
                  Lot: {determineItem.lotNo}
                </span>
              </div>
              <h3 className="font-label-ui text-label-ui font-bold text-on-surface leading-tight">
                Alere Determine™ HIV-1/2 Ag/Ab Combo
              </h3>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5">
                ผู้ผลิต: {determineItem.manufacturer} • ตำแหน่ง: {determineItem.storageLocation}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-label-code-md text-label-code-md font-bold text-primary">
                {determineItem.currentStock} กล่อง
              </span>
              <span className="block font-caption text-caption text-on-surface-variant">
                มูลค่า ฿{(determineItem.currentStock * determineItem.unitPrice).toLocaleString('th-TH')}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm border border-surface-container">
            <div className="flex items-center gap-1.5 text-error font-body-sm text-body-sm font-semibold min-w-0">
              <span className="material-symbols-outlined text-[18px] flex-shrink-0">timer</span>
              <span className="truncate">หมดอายุ 28 เม.ย. 2025 (เหลือ 18 วัน)</span>
            </div>
            <button
              onClick={() => onSelectReagentForDispense(determineItem)}
              className="h-8 px-3 bg-primary text-on-primary rounded-lg font-label-ui text-label-ui font-medium flex items-center gap-1 flex-shrink-0 hover:bg-primary-container transition-colors cursor-pointer active:scale-95 shadow-sm"
              type="button"
            >
              <span>เบิกก่อน (FEFO)</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Item 2: Re-order threshold reached (Abbott RealTiME HIV-1) */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-caption text-caption font-bold">
                  ต่ำกว่าจุดสั่งซื้อ
                </span>
                <span className="font-label-code-sm text-label-code-sm text-on-surface-variant font-medium">
                  Lot: {abbottItem.lotNo}
                </span>
              </div>
              <h3 className="font-label-ui text-label-ui font-bold text-on-surface leading-tight">
                Abbott RealTiME HIV-1 Viral Load Kit
              </h3>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5">
                ชุดตรวจสารพันธุกรรม PCR 96 Tests/Kit • ตู้แช่แข็ง A-01
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-label-code-md text-label-code-md font-bold text-error">
                เหลือ {abbottItem.currentStock} ชุด
              </span>
              <span className="block font-caption text-caption text-on-surface-variant">
                ROP: 10 ชุด
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-sm border border-surface-container">
            <div className="flex items-center gap-1.5 text-secondary font-body-sm text-body-sm font-semibold min-w-0">
              <span className="material-symbols-outlined text-[18px] flex-shrink-0">
                inventory
              </span>
              <span className="truncate">หมดอายุ 15 พ.ย. 2025 (ยังคงสภาพปกติ)</span>
            </div>
            <button
              onClick={() => onOpenPurchaseRequest(abbottItem.name)}
              className="h-8 px-3 bg-secondary text-on-secondary rounded-lg font-label-ui text-label-ui font-medium flex items-center gap-1 flex-shrink-0 hover:bg-secondary/90 transition-colors cursor-pointer active:scale-95 shadow-sm"
              type="button"
            >
              <span>สั่งเพิ่มทันที</span>
              <span className="material-symbols-outlined text-[14px]">
                shopping_cart_checkout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Grid (Hospital Inventory Workflows) */}
      <div className="px-margin mb-space-lg">
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <span className="font-label-ui text-label-ui font-bold text-on-surface">
            ปุ่มลัดงานพัสดุและคลังเวชภัณฑ์ (Quick Actions)
          </span>
          <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
            {/* Action 1: Fast Barcode/QR Scan */}
            <button
              onClick={() => onNavigateTab('scanner')}
              className="flex flex-col items-center justify-center p-space-sm bg-surface-container-low hover:bg-surface-container rounded-xl text-center transition-all active:scale-95 group cursor-pointer border border-surface-container"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
              </div>
              <span className="font-label-ui text-label-ui text-primary font-bold leading-tight">
                สแกนด่วน
              </span>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5">
                รับ/จ่าย LOT
              </span>
            </button>

            {/* Action 2: Monthly Stock Count */}
            <button
              onClick={onOpenPhysicalCount}
              className="flex flex-col items-center justify-center p-space-sm bg-surface-container-low hover:bg-surface-container rounded-xl text-center transition-all active:scale-95 group cursor-pointer border border-surface-container"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">fact_check</span>
              </div>
              <span className="font-label-ui text-label-ui text-primary font-bold leading-tight">
                ตรวจนับสิ้นงวด
              </span>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5">
                Physical Count
              </span>
            </button>

            {/* Action 3: Stock Card Report Export */}
            <button
              onClick={onOpenStockCard}
              className="flex flex-col items-center justify-center p-space-sm bg-surface-container-low hover:bg-surface-container rounded-xl text-center transition-all active:scale-95 group cursor-pointer border border-surface-container"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container-highest text-primary flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              <span className="font-label-ui text-label-ui text-primary font-bold leading-tight">
                Stock Card
              </span>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5">
                ออกรายงาน พ.ด.
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lab Compliance & Audit Stamp Notice */}
      <div className="px-margin mb-space-lg flex items-center justify-center gap-space-xs text-on-surface-variant pb-space-sm text-center">
        <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">
          verified
        </span>
        <span className="font-caption text-caption">
          ระบบบริหารเวชภัณฑ์มาตรฐานกรมวิทยาศาสตร์การแพทย์ • สำรองข้อมูลอัตโนมัติ
        </span>
      </div>
    </div>
  );
};
