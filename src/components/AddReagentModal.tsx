import React, { useState } from 'react';
import { ReagentItem, ReagentCategory } from '../types/inventory';

interface AddReagentModalProps {
  onClose: () => void;
  onAddReagent: (reagent: ReagentItem) => void;
}

export const AddReagentModal: React.FC<AddReagentModalProps> = ({ onClose, onAddReagent }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReagentCategory>('rapid');
  const [manufacturer, setManufacturer] = useState('');
  const [lotNo, setLotNo] = useState('');
  const [expiryDateStr, setExpiryDateStr] = useState('');
  const [currentStock, setCurrentStock] = useState<number>(20);
  const [unit, setUnit] = useState('กล่อง');
  const [unitPrice, setUnitPrice] = useState<number>(1500);
  const [storageTemp, setStorageTemp] = useState<'2-8°C' | '-20°C แช่แข็ง' | '15-30°C อุณหภูมิห้อง'>('2-8°C');
  const [storageLocation, setStorageLocation] = useState('ตู้แช่ C-02');
  const [safetyStock, setSafetyStock] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !lotNo.trim()) {
      alert('กรุณากรอกชื่อน้ำยาและหมายเลข Lot No.');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const categoryLabels: Record<ReagentCategory, string> = {
      rapid: 'ตรวจคัดกรอง (Rapid Test)',
      viralload: 'ตรวจยืนยัน (Viral Load/PCR)',
      cd4: 'ตรวจติดตาม CD4',
      consumable: 'วัสดุสิ้นเปลือง',
    };

    const newReagent: ReagentItem = {
      id: `REAG-${category.toUpperCase().slice(0, 3)}-${randomSuffix}`,
      name: name.trim(),
      description: description.trim() || 'เวชภัณฑ์ตรวจวิเคราะห์ทางห้องปฏิบัติการ',
      category,
      categoryLabel: categoryLabels[category],
      storageTemp,
      storageLocation: storageLocation.trim() || 'ตู้แช่ C-01',
      manufacturer: manufacturer.trim() || 'ผู้ผลิตมาตรฐานสากล',
      lotNo: lotNo.trim(),
      expiryDateStr: expiryDateStr.trim() || '31 ธ.ค. 2025',
      daysRemaining: 180,
      currentStock,
      maxStock: currentStock * 2,
      unit,
      unitPrice,
      safetyStock,
      status: currentStock <= safetyStock ? 'low_stock' : 'normal',
      statusLabel: 'ปกติ (พร้อมใช้งาน)',
    };

    onAddReagent(newReagent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-surface-container-high max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">add_box</span>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base">รับเข้าน้ำยา / เวชภัณฑ์ใหม่</h3>
              <p className="font-caption text-xs text-on-surface-variant">ลงทะเบียนเข้าสู่ระบบบริหารคลังและติดสติกเกอร์ LOT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-primary">ประเภทเวชภัณฑ์ / น้ำยา</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'rapid', label: 'ตรวจคัดกรอง (Rapid)' },
                { id: 'viralload', label: 'Viral Load / PCR' },
                { id: 'cd4', label: 'ตรวจติดตาม CD4' },
                { id: 'consumable', label: 'วัสดุสิ้นเปลือง' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id as ReagentCategory)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                    category === c.id
                      ? 'bg-primary text-white font-bold border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Manufacturer */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-primary">ชื่อน้ำยา / ชุดตรวจ</label>
            <input
              type="text"
              required
              placeholder="เช่น Alere Determine™ HIV-1/2 Combo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">บริษัทผู้ผลิต / นำเข้า</label>
              <input
                type="text"
                placeholder="เช่น Abbott Diagnostics"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">คำอธิบายย่อ</label>
              <input
                type="text"
                placeholder="เช่น 4th Gen Rapid Test"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              />
            </div>
          </div>

          {/* Lot & Expiry */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">หมายเลข Lot No.</label>
              <input
                type="text"
                required
                placeholder="เช่น D7821A"
                value={lotNo}
                onChange={(e) => setLotNo(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container font-mono text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">วันหมดอายุ (EXP Date)</label>
              <input
                type="text"
                placeholder="เช่น 28 เม.ย. 2026"
                value={expiryDateStr}
                onChange={(e) => setExpiryDateStr(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              />
            </div>
          </div>

          {/* Quantity, Unit, Price */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">จำนวนรับเข้า</label>
              <input
                type="number"
                min="1"
                value={currentStock}
                onChange={(e) => setCurrentStock(parseInt(e.target.value) || 1)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container font-mono text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">หน่วยนับ</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="h-9 px-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              >
                <option value="กล่อง">กล่อง</option>
                <option value="ชุด">ชุด</option>
                <option value="แพ็ค">แพ็ค</option>
                <option value="ขวด">ขวด</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">ราคา/หน่วย (฿)</label>
              <input
                type="number"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container font-mono text-xs"
              />
            </div>
          </div>

          {/* Storage Temp & Location */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">อุณหภูมิควบคุม (Cold Chain)</label>
              <select
                value={storageTemp}
                onChange={(e) => setStorageTemp(e.target.value as any)}
                className="h-9 px-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              >
                <option value="2-8°C">2-8°C (ตู้แช่เย็น)</option>
                <option value="-20°C แช่แข็ง">-20°C แช่แข็ง (ตู้แช่แข็ง PCR)</option>
                <option value="15-30°C อุณหภูมิห้อง">15-30°C อุณหภูมิห้อง</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-primary">ตำแหน่งจัดเก็บ (Location)</label>
              <input
                type="text"
                placeholder="เช่น ตู้แช่ C-02"
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface border border-surface-container text-xs"
              />
            </div>
          </div>

          {/* Submit */}
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
              className="flex-1 h-10 rounded-xl bg-primary text-white font-semibold hover:bg-primary-container transition-colors shadow-md cursor-pointer"
            >
              บันทึกรับเข้าน้ำยา
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
