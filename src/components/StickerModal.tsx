import React, { useState } from 'react';
import { ReagentItem } from '../types/inventory';

interface StickerModalProps {
  reagent: ReagentItem | null;
  onClose: () => void;
}

export const StickerModal: React.FC<StickerModalProps> = ({ reagent, onClose }) => {
  const [printCopies, setPrintCopies] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printed, setPrinted] = useState(false);

  if (!reagent) return null;

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setPrinted(true);
      setTimeout(() => setPrinted(false), 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">qr_code_2</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">พิมพ์สติกเกอร์กำกับ LOT</h3>
              <p className="font-caption text-xs text-on-surface-variant">มาตรฐานห้องปฏิบัติการ ISO 15189</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Sticker Preview Box */}
        <div className="bg-white border-2 border-dashed border-primary/40 rounded-xl p-4 shadow-inner flex flex-col gap-2 relative">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-caption text-[10px] font-bold tracking-wider text-secondary uppercase">
                รพ.ศูนย์ / ศูนย์วิจัยทางคลินิก
              </span>
              <span className="font-label-ui text-xs font-bold text-primary mt-0.5 leading-tight">
                {reagent.name}
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-label-code-sm text-[10px] font-bold">
              {reagent.storageTemp}
            </span>
          </div>

          <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-lg my-1">
            <div className="flex flex-col gap-0.5">
              <span className="font-caption text-[10px] text-on-surface-variant">LOT NO:</span>
              <span className="font-label-code-md text-xs font-bold text-primary">{reagent.lotNo}</span>
              <span className="font-caption text-[10px] text-on-surface-variant mt-1">EXP DATE:</span>
              <span className={`font-label-code-md text-xs font-bold ${reagent.daysRemaining <= 30 ? 'text-error' : 'text-primary'}`}>
                {reagent.expiryDateStr}
              </span>
            </div>

            {/* Simulated 2D DataMatrix / QR */}
            <div className="w-16 h-16 bg-primary rounded p-1 flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-white p-0.5 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-3.5 h-3.5 bg-primary"></div>
                  <div className="w-3.5 h-3.5 bg-primary"></div>
                </div>
                <div className="text-[7px] font-mono font-bold text-center tracking-tighter text-primary">
                  {reagent.id.slice(0, 8)}
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-3.5 h-3.5 bg-primary"></div>
                  <div className="w-2.5 h-2.5 bg-secondary"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] text-on-surface-variant font-mono border-t border-gray-100 pt-1">
            <span>REF: {reagent.id}</span>
            <span>LOC: {reagent.storageLocation}</span>
          </div>
        </div>

        {/* Copy Controls */}
        <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
          <span className="font-label-ui text-sm font-semibold text-primary">จำนวนดวงที่พิมพ์:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrintCopies(Math.max(1, printCopies - 1))}
              className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary active:scale-95 cursor-pointer"
            >
              -
            </button>
            <span className="font-label-code-md text-sm font-bold w-6 text-center">{printCopies}</span>
            <button
              onClick={() => setPrintCopies(printCopies + 1)}
              className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary active:scale-95 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="w-full h-11 bg-primary hover:bg-primary-container text-white font-label-ui text-sm rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all disabled:opacity-50"
          >
            {isPrinting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
                <span>กำลังสั่งพิมพ์สติกเกอร์ Zebra ZD420...</span>
              </>
            ) : printed ? (
              <>
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">check_circle</span>
                <span>พิมพ์สำเร็จเรียบร้อย!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>ส่งพิมพ์สติกเกอร์บาร์โค้ด ({printCopies} ดวง)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
