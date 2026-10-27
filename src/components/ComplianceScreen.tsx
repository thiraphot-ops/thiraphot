import React, { useState, useMemo } from 'react';
import { TransactionRecord } from '../types/inventory';

interface ComplianceScreenProps {
  transactions: TransactionRecord[];
  onOpenStockCard: () => void;
  onOpenNHSOReport: () => void;
  onExportAuditTrail: () => void;
}

export const ComplianceScreen: React.FC<ComplianceScreenProps> = ({
  transactions,
  onOpenStockCard,
  onOpenNHSOReport,
  onExportAuditTrail,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredTransactions = useMemo(() => {
    if (selectedFilter === 'issue') {
      return transactions.filter((t) => t.type === 'issue');
    }
    if (selectedFilter === 'receive') {
      return transactions.filter((t) => t.type === 'receive');
    }
    if (selectedFilter === 'dispose') {
      return transactions.filter((t) => t.type === 'dispose');
    }
    if (selectedFilter === 'transfer') {
      return transactions.filter((t) => t.type === 'transfer');
    }
    return transactions;
  }, [transactions, selectedFilter]);

  return (
    <div className="flex flex-col w-full pb-24">
      <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-md">
        {/* Header Section with Breadcrumb & Fiscal Year */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified_user
              </span>
              <span className="font-caption text-caption tracking-wide uppercase">
                ระบบกำกับการตรวจสอบพัสดุและระเบียบราชการ
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              ประวัติธุรกรรม & ทะเบียนพัสดุ
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              ปีงบประมาณ 2568 • กลุ่มงานเทคนิคการแพทย์และชันสูตร
            </p>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1.5 rounded-full flex-shrink-0 border border-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
            <span className="font-label-code-sm text-label-code-sm text-primary font-semibold">
              FY2568-Q3
            </span>
          </div>
        </div>

        {/* Monthly Summary Bento Cards */}
        <div className="grid grid-cols-1 gap-space-sm">
          {/* Primary Monthly Metric Card */}
          <div className="bg-primary text-on-primary rounded-2xl p-space-md shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between relative z-10">
              <div className="flex flex-col">
                <span className="font-caption text-caption text-primary-fixed-dim uppercase tracking-wider">
                  สรุปผลงานพัสดุประจำเดือน
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-white mt-0.5">
                  ยอดเบิกจ่ายสะสมเดือนนี้
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest/20 flex items-center justify-center text-secondary-container">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
            </div>

            <div className="my-space-sm relative z-10 flex items-baseline gap-space-xs">
              <span className="font-label-code-lg text-label-code-lg text-secondary-container font-semibold">
                ฿
              </span>
              <span className="font-display-lg text-display-lg font-bold tracking-tight text-white">
                482,500
              </span>
              <span className="font-caption text-caption text-primary-fixed-dim ml-1 bg-surface-container-highest/15 px-2 py-0.5 rounded-full border border-white/10">
                31 รายการ
              </span>
            </div>

            {/* Progress Mini-Bar for Budget Usage */}
            <div className="relative z-10 flex flex-col gap-1 pt-space-xs">
              <div className="flex justify-between items-center font-caption text-caption text-primary-fixed-dim">
                <span>อัตราการเบิกจ่ายเทียบงบจัดสรร</span>
                <span className="font-label-code-sm text-label-code-sm text-white">54.2%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest/20 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container rounded-full" style={{ width: '54.2%' }} />
              </div>
            </div>
          </div>

          {/* Split Sub-Metrics: Receipt Budget & Annual Compliance Match */}
          <div className="grid grid-cols-2 gap-space-sm">
            {/* Receipt Budget Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  ยอดรับเข้าพัสดุใหม่
                </span>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  inventory_2
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-label-code-sm text-label-code-sm text-secondary font-bold">
                    ฿
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    890,000
                  </span>
                </div>
                <span className="font-caption text-caption text-on-surface-variant mt-0.5 line-clamp-1">
                  งบ สปสช. / กองทุนเอดส์
                </span>
              </div>
              <div className="mt-space-sm pt-space-xs flex items-center gap-1 text-on-tertiary-container font-caption text-caption">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span className="font-medium">รับตรวจครบ 100%</span>
              </div>
            </div>

            {/* Annual Stock Count Status Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  ตรวจนับพัสดุประจำปี
                </span>
                <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
                  fact_check
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  100%
                </span>
                <span className="font-caption text-caption text-on-tertiary-container font-semibold mt-0.5">
                  ผ่านการตรวจรับ
                </span>
              </div>
              <div className="mt-space-sm pt-space-xs flex items-center gap-1 text-on-surface-variant font-caption text-caption">
                <span className="font-label-code-sm text-label-code-sm text-primary font-medium">
                  Stock Match
                </span>
                <span>• ไร้ผลต่าง</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Reports & Export Tools Bar */}
        <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm shadow-sm border border-surface-container-high">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[20px] text-primary">description</span>
              <span className="font-headline-sm text-[15px] font-bold text-primary">
                เครื่องมือจัดทำรายงานพัสดุราชการ
              </span>
            </div>
            <span className="font-caption text-caption text-on-surface-variant">ระเบียบ สตง.</span>
          </div>

          <div className="grid grid-cols-1 gap-space-xs">
            {/* Button 1: Stock Card PDF/Excel */}
            <button
              onClick={onOpenStockCard}
              className="w-full h-11 bg-surface-container-lowest text-primary rounded-lg px-space-md flex items-center justify-between hover:bg-surface-container-high transition-colors shadow-sm text-left cursor-pointer border border-surface-container"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <span className="material-symbols-outlined text-[20px] text-secondary flex-shrink-0">
                  table_view
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-ui text-label-ui text-primary truncate font-semibold">
                    ใบ Stock Card บัญชีคุมวัสดุวิทยาศาสตร์
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    รูปแบบ .PDF / .Excel ประจำงวด
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0">
                download
              </span>
            </button>

            {/* Button 2: NHSO Reagent Report */}
            <button
              onClick={onOpenNHSOReport}
              className="w-full h-11 bg-surface-container-lowest text-primary rounded-lg px-space-md flex items-center justify-between hover:bg-surface-container-high transition-colors shadow-sm text-left cursor-pointer border border-surface-container"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <span className="material-symbols-outlined text-[20px] text-on-tertiary-container flex-shrink-0">
                  health_and_safety
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-ui text-label-ui text-primary truncate font-semibold">
                    รายงานพัสดุคงเหลือ สปสช. / กองทุนเอดส์
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    สรุปน้ำยาตรวจ HIV Viral Load & Rapid Test
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0">
                forward
              </span>
            </button>

            {/* Button 3: State Audit Export */}
            <button
              onClick={onExportAuditTrail}
              className="w-full h-11 bg-primary text-on-primary rounded-lg px-space-md flex items-center justify-between hover:bg-primary-container transition-colors shadow-sm text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <span className="material-symbols-outlined text-[20px] text-secondary-container flex-shrink-0">
                  gavel
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-ui text-label-ui text-white truncate font-semibold">
                    Export Audit Trail สำหรับการตรวจสอบ สตง.
                  </span>
                  <span className="font-caption text-caption text-primary-fixed-dim">
                    บันทึกลงลายมือชื่อดิจิทัลและแฮชความถูกต้อง
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-white flex-shrink-0">
                file_download
              </span>
            </button>
          </div>
        </div>

        {/* Filter Chips for Transaction Stream */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              บันทึกธุรกรรมพัสดุ (Audit Log)
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              แสดง {filteredTransactions.length} รายการ
            </span>
          </div>

          {/* Horizontal Scrolling Filter Chips */}
          <div className="flex items-center gap-space-xs overflow-x-auto py-1 scrollbar-none no-scrollbar">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-full font-label-ui text-label-ui whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-surface-container'
              }`}
              type="button"
            >
              ทั้งหมด (142)
            </button>

            <button
              onClick={() => setSelectedFilter('issue')}
              className={`px-3 py-1.5 rounded-full font-label-ui text-label-ui whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'issue'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-surface-container'
              }`}
              type="button"
            >
              รายการจ่ายออก
            </button>

            <button
              onClick={() => setSelectedFilter('receive')}
              className={`px-3 py-1.5 rounded-full font-label-ui text-label-ui whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'receive'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-surface-container'
              }`}
              type="button"
            >
              รายการรับเข้า
            </button>

            <button
              onClick={() => setSelectedFilter('transfer')}
              className={`px-3 py-1.5 rounded-full font-label-ui text-label-ui whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'transfer'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-surface-container'
              }`}
              type="button"
            >
              ใบบันทึกโอนย้าย
            </button>

            <button
              onClick={() => setSelectedFilter('dispose')}
              className={`px-3 py-1.5 rounded-full font-label-ui text-label-ui whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'dispose'
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-surface-container'
              }`}
              type="button"
            >
              รายการตัดทิ้ง/ชำรุด
            </button>
          </div>
        </div>

        {/* Timeline Cards / Audit Log Workhorse Stream */}
        <div className="flex flex-col gap-space-sm" id="audit-card-container">
          {filteredTransactions.map((tx) => {
            const isIssue = tx.type === 'issue';
            const isReceive = tx.type === 'receive';
            const isDispose = tx.type === 'dispose';

            return (
              <div
                key={tx.id}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm hover:shadow-md transition-shadow"
              >
                {/* Card Top Bar: Type Badge & Reference ID */}
                <div className="flex items-start justify-between gap-space-xs">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span
                      className={`px-2.5 py-1 rounded-full font-label-ui text-label-ui font-bold flex items-center gap-1 ${
                        isIssue
                          ? 'bg-surface-container text-secondary'
                          : isReceive
                          ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isIssue ? 'output' : isReceive ? 'input' : 'delete_forever'}
                      </span>
                      {tx.typeLabel}
                    </span>
                    <span
                      className={`font-label-code-md text-label-code-md font-bold ${
                        isDispose ? 'text-error' : 'text-primary'
                      }`}
                    >
                      {tx.id}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full font-caption text-caption font-semibold flex items-center gap-1 ${
                      isIssue
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : isReceive
                        ? 'bg-surface-container text-on-surface'
                        : 'bg-error-container/50 text-error'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isIssue ? 'done_all' : isReceive ? 'fact_check' : 'warning'}
                    </span>
                    {tx.statusBadge}
                  </span>
                </div>

                {/* Item Identity & Meta Specs */}
                <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-1 border border-surface-container/60">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-[15px] font-bold text-primary truncate">
                      {tx.reagentName}
                    </span>
                    <span
                      className={`font-label-code-md text-label-code-md font-bold ${
                        isDispose ? 'text-error' : 'text-primary'
                      }`}
                    >
                      {tx.quantity} {tx.unit}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs mt-1 pt-1 font-body-sm text-body-sm text-on-surface-variant border-t border-surface-container/40">
                    <div className="flex items-center gap-1">
                      <span className="text-outline">Lot:</span>
                      <span className="font-label-code-sm text-label-code-sm font-semibold text-on-surface">
                        {tx.lotNo}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-outline">
                        {isDispose ? 'มูลค่าสูญ:' : 'มูลค่ารวม:'}
                      </span>
                      <span
                        className={`font-label-code-sm text-label-code-sm font-bold ${
                          isDispose
                            ? 'text-error'
                            : isReceive
                            ? 'text-secondary'
                            : 'text-primary'
                        }`}
                      >
                        ฿{tx.totalValue.toLocaleString('th-TH')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audit Context: Requester, Approver, Timestamp */}
                <div className="grid grid-cols-1 gap-1 text-on-surface-variant font-caption text-caption pt-0.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 min-w-0">
                      <span
                        className={`material-symbols-outlined text-[15px] flex-shrink-0 ${
                          isDispose ? 'text-error' : 'text-secondary'
                        }`}
                      >
                        {isIssue
                          ? 'local_hospital'
                          : isReceive
                          ? 'local_shipping'
                          : 'report'}
                      </span>
                      <span className="truncate">
                        {isIssue && (
                          <>
                            หน่วยเบิก:{' '}
                            <strong className="text-on-surface font-semibold">
                              {tx.department}
                            </strong>
                          </>
                        )}
                        {isReceive && (
                          <>
                            ผู้จัดส่ง:{' '}
                            <strong className="text-on-surface font-semibold">
                              {tx.vendor}
                            </strong>
                          </>
                        )}
                        {isDispose && (
                          <>
                            เหตุผล:{' '}
                            <strong className="text-on-surface font-semibold">
                              {tx.reason}
                            </strong>
                          </>
                        )}
                      </span>
                    </div>
                    <span className="font-label-code-sm text-label-code-sm text-outline flex-shrink-0">
                      {tx.timeStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        isDispose ? 'text-primary' : 'text-on-tertiary-container'
                      }`}
                    >
                      {isIssue ? 'verified' : isReceive ? 'how_to_reg' : 'policy'}
                    </span>
                    <span className="truncate">
                      {isIssue && (
                        <>
                          ผู้อนุมัติ: <strong className="text-on-surface">{tx.approver}</strong>
                        </>
                      )}
                      {isReceive && (
                        <>
                          การตรวจรับ:{' '}
                          <strong className="text-on-surface">{tx.inspector}</strong>
                        </>
                      )}
                      {isDispose && (
                        <>
                          บันทึกอนุมัติ:{' '}
                          <strong className="text-on-surface">{tx.approver}</strong>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Compliance Endorsement Banner */}
        <div className="p-space-md rounded-xl bg-surface-container flex items-center gap-space-sm shadow-sm border border-surface-container-high">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary flex-shrink-0 border border-surface-container">
            <span className="material-symbols-outlined text-[24px]">security</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-[14px] font-bold text-primary">
              รับรองความถูกต้องของระบบพัสดุ
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              สอดคล้องระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
