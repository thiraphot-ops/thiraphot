export type ReagentCategory = 'rapid' | 'viralload' | 'cd4' | 'consumable';

export interface ReagentItem {
  id: string; // e.g., 'REAG-HIV-001'
  name: string; // e.g., 'Determine HIV-1/2 Ag/Ab Combo (20T)'
  description: string; // e.g., 'ชุดทดสอบคัดกรองรวดเร็ว 4th Generation Rapid Test'
  category: ReagentCategory;
  categoryLabel: string;
  storageTemp: '2-8°C' | '-20°C แช่แข็ง' | '15-30°C อุณหภูมิห้อง';
  storageLocation: string; // e.g., 'ตู้แช่ C-02'
  manufacturer: string; // e.g., 'Abbott Diagnostics'
  lotNo: string; // e.g., 'D7821A'
  expiryDateStr: string; // e.g., '28 เม.ย. 2025'
  daysRemaining: number;
  currentStock: number;
  maxStock: number;
  unit: string; // 'กล่อง' | 'ชุด' | 'แพ็ค'
  unitPrice: number;
  safetyStock: number;
  status: 'critical_expiry' | 'low_stock' | 'warning' | 'normal';
  statusLabel: string;
  urgentNote?: string;
}

export type TransactionType = 'issue' | 'receive' | 'dispose' | 'transfer';

export interface TransactionRecord {
  id: string; // e.g., 'DIS-2568/042'
  type: TransactionType;
  typeLabel: string;
  statusBadge: string;
  statusBadgeColor?: string;
  reagentId: string;
  reagentName: string;
  lotNo: string;
  quantity: number;
  unit: string;
  totalValue: number;
  department?: string;
  approver?: string;
  vendor?: string;
  inspector?: string;
  reason?: string;
  timeStr: string;
}

export interface ColdChainSensor {
  id: string;
  name: string;
  targetRange: string;
  currentTemp: number;
  status: 'stable' | 'warning' | 'critical';
  statusLabel: string;
  lastUpdated: string;
}
