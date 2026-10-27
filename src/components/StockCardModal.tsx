import React, { useState } from 'react';
import { TransactionRecord } from '../types/inventory';

interface StockCardModalProps {
  transactions: TransactionRecord[];
  onClose: () => void;
}

export const StockCardModal: React.FC<StockCardModalProps> = ({ transactions, onClose }) => {
  const [exportingType, setExportingType] = useState<'pdf' | 'excel' | null>(null);
  const [successExport, setSuccessExport] = useState<string | null>(null);

  const handleExport = (type: 'pdf' | 'excel') => {
    setExportingType(type);
    setTimeout(() => {
      setExportingType(null);
      setSuccessExport(`สร้างไฟล์ Stock_Card_FY2568.${type === 'pdf' ? 'pdf' : 'xlsx'} สำเร็จแล้ว`);
      setTimeout(() => setSuccessExport(null), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high max-h-[90vh] overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">table_view</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">
                ใบ Stock Card บัญชีคุมวัสดุวิทยาศาสตร์
              </h3>
              <p className="font-caption text-xs text-on-surface-variant">
                แบบ พ.ด. ๔ • ระเบียบการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐
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

        {/* Stock Card Meta */}
        <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-on-surface-variant block">หน่วยงาน:</span>
            <strong className="text-primary">กลุ่มงานเทคนิคการแพทย์และชันสูตร</strong>
          </div>
          <div>
            <span className="text-on-surface-variant block">รหัสคลังหลัก:</span>
            <strong className="text-primary font-mono">WH-LAB-IMMUNO-01</strong>
          </div>
          <div>
            <span className="text-on-surface-variant block">งวดบัญชี:</span>
            <strong className="text-primary">ไตรมาส 3 / 2568 (Q3)</strong>
          </div>
          <div>
            <span className="text-on-surface-variant block">มาตรฐานการจัดเก็บ:</span>
            <strong className="text-on-tertiary-container">FEFO First-Expired-First-Out</strong>
          </div>
        </div>

        {/* Table of Ledger Entries */}
        <div className="flex flex-col flex-1 overflow-y-auto border border-surface-container rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-surface-container sticky top-0 font-semibold text-primary border-b border-surface-container-highest">
              <tr>
                <th className="p-2">เลขที่เอกสาร</th>
                <th className="p-2">รายการน้ำยา</th>
                <th className="p-2 text-center">รับ</th>
                <th className="p-2 text-center">จ่าย</th>
                <th className="p-2 text-right">มูลค่า (฿)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low/60">
                  <td className="p-2 font-mono font-bold text-primary whitespace-nowrap">
                    {tx.id}
                  </td>
                  <td className="p-2">
                    <span className="font-semibold block truncate max-w-[120px]">{tx.reagentName}</span>
                    <span className="text-[10px] text-on-surface-variant font-mono">Lot: {tx.lotNo}</span>
                  </td>
                  <td className="p-2 text-center font-bold text-on-tertiary-container">
                    {tx.type === 'receive' ? `+${tx.quantity}` : '-'}
                  </td>
                  <td className="p-2 text-center font-bold text-error">
                    {tx.type === 'issue' || tx.type === 'dispose' ? `-${tx.quantity}` : '-'}
                  </td>
                  <td className="p-2 text-right font-mono font-semibold">
                    ฿{tx.totalValue.toLocaleString('th-TH')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feedback Alert */}
        {successExport && (
          <div className="bg-tertiary-fixed text-on-tertiary-fixed p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{successExport}</span>
          </div>
        )}

        {/* Actions Export */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-surface-container">
          <button
            onClick={() => handleExport('pdf')}
            disabled={exportingType !== null}
            className="h-10 px-3 bg-primary text-white rounded-xl font-label-ui text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primary-container cursor-pointer active:scale-95 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>{exportingType === 'pdf' ? 'กำลังดาวน์โหลด...' : 'ส่งออกเป็น PDF'}</span>
          </button>
          <button
            onClick={() => handleExport('excel')}
            disabled={exportingType !== null}
            className="h-10 px-3 bg-surface-container text-primary rounded-xl font-label-ui text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high cursor-pointer active:scale-95 transition-all border border-surface-container-highest disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">table_chart</span>
            <span>{exportingType === 'excel' ? 'กำลังประมวลผล...' : 'ส่งออกเป็น Excel'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
