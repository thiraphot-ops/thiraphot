import React, { useState } from 'react';
import { ReagentItem } from '../types/inventory';

interface ScannerScreenProps {
  reagents: ReagentItem[];
  selectedReagent: ReagentItem;
  onSelectReagent: (reagent: ReagentItem) => void;
  onConfirmDispense: (params: {
    reagent: ReagentItem;
    quantity: number;
    department: string;
    purpose: string;
  }) => void;
  onConfirmIntake: (params: {
    reagent: ReagentItem;
    quantity: number;
    vendor: string;
    lotNo: string;
    expiryDateStr: string;
  }) => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({
  reagents,
  selectedReagent,
  onSelectReagent,
  onConfirmDispense,
  onConfirmIntake,
}) => {
  const [activeMode, setActiveMode] = useState<'checkout' | 'checkin'>('checkout');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Dispense Form state
  const [dispenseQty, setDispenseQty] = useState(10);
  const [department, setDepartment] = useState('คลินิกนิรนาม / VCT Clinic (ศูนย์วิจัยทางคลินิก)');
  const [purpose, setPurpose] = useState('ตรวจคัดกรองผู้รับบริการกลุ่มเสี่ยงสูงประจำรอบสัปดาห์');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Intake Form state
  const [intakeQty, setIntakeQty] = useState(20);
  const [vendor, setVendor] = useState('Abbott Diagnostics (Thailand) Co., Ltd.');
  const [intakeLot, setIntakeLot] = useState('D7822B');
  const [intakeExp, setIntakeExp] = useState('30 มิ.ย. 2026');

  // Stepper limits
  const maxAvailable = selectedReagent.currentStock;
  const unitPrice = selectedReagent.unitPrice;
  const totalCost = dispenseQty * unitPrice;
  const totalIntakeCost = intakeQty * unitPrice;

  const handleMinus = () => {
    if (dispenseQty > 1) {
      setDispenseQty((prev) => prev - 1);
    }
  };

  const handlePlus = () => {
    if (dispenseQty < maxAvailable) {
      setDispenseQty((prev) => prev + 1);
    }
  };

  const handleSubmitDispense = () => {
    if (dispenseQty > maxAvailable) {
      alert('จำนวนที่ขอเบิกมากกว่ายอดคงเหลือในคลัง');
      return;
    }

    setIsSubmitting(true);
    onConfirmDispense({
      reagent: selectedReagent,
      quantity: dispenseQty,
      department,
      purpose,
    });

    const newStock = maxAvailable - dispenseQty;
    setToastMessage(`ตัดสต๊อกเรียบร้อยแล้ว: คงเหลือในระบบ ${newStock} ${selectedReagent.unit}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setTimeout(() => setToastMessage(null), 3500);
    }, 400);
  };

  const handleSubmitIntake = () => {
    setIsSubmitting(true);
    onConfirmIntake({
      reagent: selectedReagent,
      quantity: intakeQty,
      vendor,
      lotNo: intakeLot,
      expiryDateStr: intakeExp,
    });

    setToastMessage(`ตรวจรับเข้าคลังเรียบร้อยแล้ว: เพิ่มจำนวน +${intakeQty} ${selectedReagent.unit}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setTimeout(() => setToastMessage(null), 3500);
    }, 400);
  };

  const handleScanNext = () => {
    const currentIndex = reagents.findIndex((r) => r.id === selectedReagent.id);
    const nextIndex = (currentIndex + 1) % reagents.length;
    const nextReagent = reagents[nextIndex];
    onSelectReagent(nextReagent);
    setDispenseQty(Math.min(10, Math.max(1, Math.floor(nextReagent.currentStock / 2))));
    setToastMessage(null);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-space-md">
        {/* Segmented Mode Control */}
        <div className="w-full bg-surface-container-high p-1 rounded-xl flex items-center justify-between shadow-sm border border-surface-container-highest">
          <button
            onClick={() => {
              setActiveMode('checkin');
              setToastMessage(null);
            }}
            className={`flex-1 py-2.5 px-space-sm rounded-lg flex items-center justify-center gap-space-xs font-label-ui text-label-ui transition-all duration-200 cursor-pointer ${
              activeMode === 'checkin'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">move_to_inbox</span>
            <span>รับเข้าคลัง (Check-In)</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('checkout');
              setToastMessage(null);
            }}
            className={`flex-1 py-2.5 px-space-sm rounded-lg flex items-center justify-center gap-space-xs font-label-ui text-label-ui transition-all duration-200 cursor-pointer ${
              activeMode === 'checkout'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">outbox</span>
            <span>เบิกจ่ายออก (Dispense)</span>
          </button>
        </div>

        {/* Scanner Viewfinder Card */}
        <div
          className={`relative w-full rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-center min-h-[260px] p-space-md transition-all duration-300 ${
            flashlightOn ? 'bg-primary/95 ring-4 ring-amber-400/40' : 'bg-primary'
          }`}
        >
          {/* Simulated Camera Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-container to-primary opacity-95 pointer-events-none" />

          {/* Ambient Laser Scan Line */}
          <div className="absolute inset-x-8 top-1/4 h-0.5 bg-tertiary-fixed shadow-[0_0_14px_#85f8c4] animate-pulse pointer-events-none z-10" />

          {/* Viewfinder Target HUD */}
          <div className="relative z-10 w-48 h-48 rounded-xl bg-surface-container-lowest/10 backdrop-blur-sm flex items-center justify-center p-3 border border-white/10">
            {/* Corner Reticles */}
            <span className="absolute top-2 left-2 w-4 h-4 rounded-tl-sm bg-tertiary-fixed" />
            <span className="absolute top-2 right-2 w-4 h-4 rounded-tr-sm bg-tertiary-fixed" />
            <span className="absolute bottom-2 left-2 w-4 h-4 rounded-bl-sm bg-tertiary-fixed" />
            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-br-sm bg-tertiary-fixed" />

            {/* QR Code Simulation */}
            <div className="w-36 h-36 bg-surface-container-lowest rounded-lg p-2.5 flex flex-col justify-between items-center shadow-lg relative">
              <div className="w-full flex justify-between">
                <div className="w-7 h-7 bg-primary rounded-sm p-1 flex items-center justify-center">
                  <div className="w-3 h-3 bg-surface-container-lowest" />
                </div>
                <div className="w-7 h-7 bg-primary rounded-sm p-1 flex items-center justify-center">
                  <div className="w-3 h-3 bg-surface-container-lowest" />
                </div>
              </div>

              <div className="flex items-center gap-1 py-1">
                <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                <span className="font-label-code-sm text-label-code-sm text-primary tracking-tighter font-bold">
                  {selectedReagent.id}
                </span>
              </div>

              <div className="w-full flex justify-between items-end">
                <div className="w-7 h-7 bg-primary rounded-sm p-1 flex items-center justify-center">
                  <div className="w-3 h-3 bg-surface-container-lowest" />
                </div>
                <div className="w-5 h-5 bg-tertiary-container rounded-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container text-[14px]">
                    done
                  </span>
                </div>
              </div>

              {/* Pulsing Success Badge */}
              <div className="absolute -bottom-3 inset-x-2 bg-tertiary-container text-on-tertiary-container py-0.5 rounded-full flex items-center justify-center gap-1 shadow-md border border-tertiary-fixed/30">
                <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                <span className="font-caption text-caption font-bold">สแกนรหัสสำเร็จ</span>
              </div>
            </div>
          </div>

          {/* Scanner Floating Controls */}
          <div className="relative z-10 mt-space-md flex items-center gap-space-sm">
            <button
              onClick={() => setFlashlightOn(!flashlightOn)}
              className={`h-10 px-space-md rounded-full backdrop-blur-md flex items-center gap-space-xs transition-colors cursor-pointer border border-white/20 ${
                flashlightOn
                  ? 'bg-amber-300 text-primary font-bold shadow-md'
                  : 'bg-surface-container-lowest/20 text-white hover:bg-surface-container-lowest/30'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {flashlightOn ? 'flash_off' : 'flash_on'}
              </span>
              <span className="font-label-ui text-label-ui">
                {flashlightOn ? 'ปิดไฟฉาย' : 'เปิดไฟฉาย'}
              </span>
            </button>

            <button
              onClick={() => setShowManualModal(true)}
              className="h-10 px-space-md rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-white flex items-center gap-space-xs hover:bg-surface-container-lowest/30 transition-colors cursor-pointer border border-white/20"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">keyboard</span>
              <span className="font-label-ui text-label-ui">พิมพ์รหัสเอง</span>
            </button>
          </div>
        </div>

        {/* Live Scanned Batch Summary Card */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-caption font-bold">
                  <span className="material-symbols-outlined text-[13px]">biotech</span>
                  {selectedReagent.categoryLabel}
                </span>
                {selectedReagent.daysRemaining <= 30 && (
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-bold">
                    <span className="material-symbols-outlined text-[13px]">priority_high</span>
                    FEFO Priority
                  </span>
                )}
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold truncate">
                {selectedReagent.name}
              </h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {selectedReagent.description}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-secondary border border-surface-container-highest">
              <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
          </div>

          {/* Scanned Batch Metrics Grid */}
          <div className="grid grid-cols-2 gap-space-xs mt-1">
            <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border border-surface-container/60">
              <span className="font-caption text-caption text-on-surface-variant">
                หมายเลขล็อต (Lot No.)
              </span>
              <span className="font-label-code-md text-label-code-md text-primary font-bold">
                {selectedReagent.lotNo}
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border border-surface-container/60">
              <span className="font-caption text-caption text-on-surface-variant">
                วันหมดอายุ (Expiry)
              </span>
              <span
                className={`font-label-code-md text-label-code-md font-bold flex items-center gap-1 ${
                  selectedReagent.daysRemaining <= 30 ? 'text-error' : 'text-primary'
                }`}
              >
                {selectedReagent.expiryDateStr}
                <span className="material-symbols-outlined text-[15px]">event_busy</span>
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border border-surface-container/60">
              <span className="font-caption text-caption text-on-surface-variant">
                ราคาอ้างอิงพัสดุ
              </span>
              <span className="font-label-code-md text-label-code-md text-on-surface font-semibold">
                ฿{selectedReagent.unitPrice.toLocaleString('th-TH')} / {selectedReagent.unit}
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border border-surface-container/60">
              <span className="font-caption text-caption text-on-surface-variant">
                คงเหลือในคลังแล็บ
              </span>
              <span className="font-label-code-md text-label-code-md text-secondary font-bold">
                {selectedReagent.currentStock} {selectedReagent.unit}
              </span>
            </div>
          </div>

          {/* FEFO Guideline Callout */}
          <div className="bg-surface-container-highest/60 p-space-sm rounded-lg flex items-center gap-space-xs border border-surface-container-highest">
            <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">
              info
            </span>
            <p className="font-body-sm text-body-sm text-on-secondary-container leading-tight">
              แนะนำตามหลัก FEFO: ล็อต{' '}
              <span className="font-label-code-sm text-label-code-sm font-bold">
                {selectedReagent.lotNo}
              </span>{' '}
              {selectedReagent.daysRemaining <= 30
                ? 'หมดอายุเร็วที่สุด ควรตัดจ่ายให้คลินิกใช้งานก่อน'
                : 'ตรวจสอบสถานะความพร้อมใช้งานและอุณหภูมิควบคุมปกติ'}
            </p>
          </div>
        </div>

        {/* Dynamic Mode Form */}
        {activeMode === 'checkout' ? (
          /* Dispense Form */
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">
                assignment_turned_in
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                บันทึกการเบิกจ่าย
              </h3>
            </div>

            {/* Destination Department Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-label-ui text-label-ui text-on-surface font-semibold"
                htmlFor="dept-select"
              >
                หน่วยงานผู้ขอเบิก
              </label>
              <div className="relative w-full">
                <select
                  className="w-full h-11 px-space-md pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:bg-surface-container-high transition-colors border border-surface-container"
                  id="dept-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="คลินิกนิรนาม / VCT Clinic (ศูนย์วิจัยทางคลินิก)">
                    คลินิกนิรนาม / VCT Clinic (ศูนย์วิจัยทางคลินิก)
                  </option>
                  <option value="ห้องปฏิบัติการกลาง (Central Clinical Lab)">
                    ห้องปฏิบัติการกลาง (Central Clinical Lab)
                  </option>
                  <option value="คลินิกผู้ป่วยนอก ARV (Adult HIV Care)">
                    คลินิกผู้ป่วยนอก ARV (Adult HIV Care)
                  </option>
                  <option value="แผนกอุบัติเหตุและฉุกเฉิน (ER Triage)">
                    แผนกอุบัติเหตุและฉุกเฉิน (ER Triage)
                  </option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>

            {/* Purpose of Usage */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-label-ui text-label-ui text-on-surface font-semibold"
                htmlFor="purpose-input"
              >
                วัตถุประสงค์การใช้
              </label>
              <div className="relative w-full">
                <input
                  className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-colors border border-surface-container"
                  id="purpose-input"
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>
            </div>

            {/* Quantity Stepper & Cost Calculation */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-label-ui text-label-ui text-on-surface font-semibold">
                  จำนวนที่ขอเบิก
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  สูงสุดที่เบิกได้: {maxAvailable} {selectedReagent.unit}
                </span>
              </div>
              <div className="flex items-center justify-between gap-space-md">
                {/* Stepper */}
                <div className="flex items-center bg-surface-container-lowest rounded-lg p-1 shadow-sm border border-surface-container">
                  <button
                    aria-label="ลดจำนวน"
                    className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-primary active:scale-95 transition-transform cursor-pointer"
                    onClick={handleMinus}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <div className="w-16 text-center font-label-code-lg text-label-code-lg text-primary font-bold">
                    {dispenseQty}
                  </div>
                  <button
                    aria-label="เพิ่มจำนวน"
                    className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-primary active:scale-95 transition-transform cursor-pointer"
                    onClick={handlePlus}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                {/* Total Calculation */}
                <div className="flex flex-col items-end min-w-0">
                  <span className="font-caption text-caption text-on-surface-variant">
                    มูลค่ารวมที่เบิกจ่าย
                  </span>
                  <span className="font-label-code-lg text-label-code-lg text-secondary font-bold">
                    ฿{totalCost.toLocaleString('th-TH')}
                  </span>
                </div>
              </div>
            </div>

            {/* Officer in Charge Card */}
            <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low border border-surface-container">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-caption text-on-surface-variant">
                  เจ้าหน้าที่ผู้รับผิดชอบทำรายการ
                </span>
                <span className="font-body-md text-body-md font-semibold text-primary truncate">
                  ทนพญ. นลินี วงศ์สุวรรณ
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  จนท.พัสดุและคลังชีวเคมีแล็บ
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <button
                onClick={handleSubmitDispense}
                disabled={isSubmitting || maxAvailable <= 0}
                className="w-full h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-ui text-label-ui flex items-center justify-center gap-space-xs shadow-md active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                id="btn-submit"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                <span>ยืนยันการเบิกจ่ายและตัดสต๊อกทันที</span>
              </button>

              <button
                onClick={handleScanNext}
                className="w-full h-11 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-ui text-label-ui flex items-center justify-center gap-space-xs active:scale-[0.99] transition-all cursor-pointer border border-surface-container-highest"
                id="btn-scan-next"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                <span>สแกนรายการถัดไป</span>
              </button>
            </div>

            {/* Toast */}
            {toastMessage && (
              <div className="p-space-sm rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-space-xs shadow-md animate-fade-in border border-tertiary-container/20">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="font-body-sm text-body-sm font-semibold">{toastMessage}</span>
              </div>
            )}
          </div>
        ) : (
          /* Check-In / Intake Form */
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">input</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                บันทึกการตรวจรับเข้าคลัง (Check-In)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-space-xs">
              <div className="flex flex-col gap-1">
                <label className="font-label-ui text-label-ui text-on-surface font-semibold">
                  เลขล็อตใหม่ (Lot No.)
                </label>
                <input
                  type="text"
                  value={intakeLot}
                  onChange={(e) => setIntakeLot(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-body-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-ui text-label-ui text-on-surface font-semibold">
                  วันหมดอายุ (EXP)
                </label>
                <input
                  type="text"
                  value={intakeExp}
                  onChange={(e) => setIntakeExp(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-body-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-ui text-label-ui text-on-surface font-semibold">
                บริษัทผู้จำหน่าย / นำส่ง (Vendor)
              </label>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-body-sm"
              />
            </div>

            {/* Stepper for intake */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-label-ui text-label-ui text-on-surface font-semibold">
                  จำนวนตรวจรับเข้า
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  ราคาต่อหน่วย: ฿{unitPrice.toLocaleString('th-TH')}
                </span>
              </div>
              <div className="flex items-center justify-between gap-space-md">
                <div className="flex items-center bg-surface-container-lowest rounded-lg p-1 shadow-sm border border-surface-container">
                  <button
                    onClick={() => setIntakeQty((q) => Math.max(1, q - 5))}
                    className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-primary cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <div className="w-16 text-center font-label-code-lg text-label-code-lg text-primary font-bold">
                    {intakeQty}
                  </div>
                  <button
                    onClick={() => setIntakeQty((q) => q + 5)}
                    className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-primary cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-caption text-caption text-on-surface-variant">
                    มูลค่าพัสดุรับเข้า
                  </span>
                  <span className="font-label-code-lg text-label-code-lg text-on-tertiary-container font-bold">
                    +฿{totalIntakeCost.toLocaleString('th-TH')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs pt-space-xs">
              <button
                onClick={handleSubmitIntake}
                disabled={isSubmitting}
                className="w-full h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-ui text-label-ui flex items-center justify-center gap-space-xs shadow-md active:scale-[0.99] transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>ยืนยันการตรวจรับและเพิ่มสต๊อก</span>
              </button>
            </div>

            {toastMessage && (
              <div className="p-space-sm rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-space-xs shadow-md animate-fade-in border border-tertiary-container/20">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="font-body-sm text-body-sm font-semibold">{toastMessage}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Code Selection Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-2xl">barcode</span>
                <h3 className="font-headline-sm font-bold text-primary">เลือกน้ำยาเพื่อสแกน</h3>
              </div>
              <button
                onClick={() => setShowManualModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
              {reagents.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onSelectReagent(r);
                    setShowManualModal(false);
                    setDispenseQty(Math.min(10, Math.max(1, Math.floor(r.currentStock / 2))));
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    r.id === selectedReagent.id
                      ? 'bg-primary-container text-white border-primary'
                      : 'bg-surface-container-low hover:bg-surface-container border-surface-container text-on-surface'
                  }`}
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-label-code-sm text-xs opacity-80">{r.id} • Lot: {r.lotNo}</span>
                    <span className="font-body-md font-bold truncate">{r.name}</span>
                    <span className="font-caption text-xs opacity-75">คงเหลือ {r.currentStock} {r.unit} • หมดอายุ {r.expiryDateStr}</span>
                  </div>
                  <span className="material-symbols-outlined text-xl flex-shrink-0">
                    {r.id === selectedReagent.id ? 'check_circle' : 'chevron_right'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
