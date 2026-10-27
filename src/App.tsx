import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { DashboardScreen } from './components/DashboardScreen';
import { InventoryScreen } from './components/InventoryScreen';
import { ScannerScreen } from './components/ScannerScreen';
import { ComplianceScreen } from './components/ComplianceScreen';
import { StickerModal } from './components/StickerModal';
import { StockCardModal } from './components/StockCardModal';
import { NHSOReportModal } from './components/NHSOReportModal';
import { AddReagentModal } from './components/AddReagentModal';
import { ColdChainModal } from './components/ColdChainModal';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';
import { PurchaseRequestModal } from './components/PurchaseRequestModal';
import { PhysicalCountModal } from './components/PhysicalCountModal';
import { INITIAL_REAGENTS, INITIAL_TRANSACTIONS, INITIAL_SENSORS } from './data/initialData';
import { ReagentItem, TransactionRecord } from './types/inventory';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [reagents, setReagents] = useState<ReagentItem[]>(INITIAL_REAGENTS);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [sensors] = useState(INITIAL_SENSORS);

  // Today flow stats
  const [todayStats, setTodayStats] = useState({
    dispensed: 320,
    received: 500,
    completedRequests: 14,
  });

  // Selected reagent for scanning/dispense
  const [selectedScannerReagent, setSelectedScannerReagent] = useState<ReagentItem>(INITIAL_REAGENTS[0]);

  // Modals state
  const [activeStickerReagent, setActiveStickerReagent] = useState<ReagentItem | null>(null);
  const [showStockCardModal, setShowStockCardModal] = useState(false);
  const [showNHSOReportModal, setShowNHSOReportModal] = useState(false);
  const [showAddReagentModal, setShowAddReagentModal] = useState(false);
  const [showColdChainModal, setShowColdChainModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [purchaseRequestItem, setPurchaseRequestItem] = useState<string | null>(null);
  const [showPhysicalCountModal, setShowPhysicalCountModal] = useState(false);
  const [inventoryInitialFilter, setInventoryInitialFilter] = useState<string>('all');

  // Handle Dispense
  const handleConfirmDispense = ({
    reagent,
    quantity,
    department,
  }: {
    reagent: ReagentItem;
    quantity: number;
    department: string;
    purpose: string;
  }) => {
    // 1. Update stock
    setReagents((prev) =>
      prev.map((r) => {
        if (r.id === reagent.id) {
          const updatedStock = Math.max(0, r.currentStock - quantity);
          return {
            ...r,
            currentStock: updatedStock,
            status: updatedStock <= r.safetyStock ? 'low_stock' : r.status,
          };
        }
        return r;
      })
    );

    // 2. Add transaction
    const newTx: TransactionRecord = {
      id: `DIS-2568/${String(Math.floor(50 + Math.random() * 50)).padStart(3, '0')}`,
      type: 'issue',
      typeLabel: 'เบิกจ่ายออก',
      statusBadge: 'ตัดสต๊อกสำเร็จ (Stock Deducted)',
      reagentId: reagent.id,
      reagentName: reagent.name,
      lotNo: reagent.lotNo,
      quantity,
      unit: reagent.unit,
      totalValue: quantity * reagent.unitPrice,
      department,
      approver: 'ภก. ดร. วิชัย (หน.กลุ่มงานเทคนิคการแพทย์)',
      timeStr: 'เพิ่งทำรายการ, วันนี้',
    };
    setTransactions((prev) => [newTx, ...prev]);

    // 3. Update stats
    setTodayStats((prev) => ({
      ...prev,
      dispensed: prev.dispensed + quantity,
      completedRequests: prev.completedRequests + 1,
    }));
  };

  // Handle Intake
  const handleConfirmIntake = ({
    reagent,
    quantity,
    vendor,
    lotNo,
  }: {
    reagent: ReagentItem;
    quantity: number;
    vendor: string;
    lotNo: string;
    expiryDateStr: string;
  }) => {
    setReagents((prev) =>
      prev.map((r) => {
        if (r.id === reagent.id) {
          return {
            ...r,
            currentStock: r.currentStock + quantity,
            status: 'normal',
          };
        }
        return r;
      })
    );

    const newTx: TransactionRecord = {
      id: `REC-2568/${String(Math.floor(20 + Math.random() * 40)).padStart(3, '0')}`,
      type: 'receive',
      typeLabel: 'รับเข้าคลัง',
      statusBadge: 'ตรวจรับพัสดุแล้ว',
      reagentId: reagent.id,
      reagentName: reagent.name,
      lotNo,
      quantity,
      unit: reagent.unit,
      totalValue: quantity * reagent.unitPrice,
      vendor,
      inspector: 'คณะกรรมการตรวจรับพัสดุเวชภัณฑ์แล้ว',
      timeStr: 'เพิ่งตรวจรับ, วันนี้',
    };
    setTransactions((prev) => [newTx, ...prev]);

    setTodayStats((prev) => ({
      ...prev,
      received: prev.received + quantity,
      completedRequests: prev.completedRequests + 1,
    }));
  };

  // Handle Add New Reagent
  const handleAddNewReagent = (newReagent: ReagentItem) => {
    setReagents((prev) => [newReagent, ...prev]);

    const newTx: TransactionRecord = {
      id: `REC-2568/${String(Math.floor(30 + Math.random() * 30)).padStart(3, '0')}`,
      type: 'receive',
      typeLabel: 'รับเข้าคลัง',
      statusBadge: 'ตรวจรับพัสดุใหม่',
      reagentId: newReagent.id,
      reagentName: newReagent.name,
      lotNo: newReagent.lotNo,
      quantity: newReagent.currentStock,
      unit: newReagent.unit,
      totalValue: newReagent.currentStock * newReagent.unitPrice,
      vendor: newReagent.manufacturer,
      inspector: 'ทนพญ. นลินี วงศ์สุวรรณ',
      timeStr: 'เพิ่งลงทะเบียน, วันนี้',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Flow triggers
  const handleSelectReagentForDispense = (reagent: ReagentItem) => {
    setSelectedScannerReagent(reagent);
    setCurrentTab('scanner');
  };

  const handleFilterFEFO = () => {
    setInventoryInitialFilter('expiring');
    setCurrentTab('inventory');
  };

  // Export Audit Trail
  const handleExportAuditTrail = () => {
    const auditData = {
      reportTitle: 'Audit Trail การบริหารพัสดุและคลังน้ำยาชันสูตร HIV LabStock',
      hospital: 'รพ.ศูนย์ / ศูนย์วิจัยทางคลินิก',
      department: 'กลุ่มงานเทคนิคการแพทย์และชันสูตร',
      fiscalYear: '2568-Q3',
      exportTimestamp: new Date().toISOString(),
      digitalSignatureHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      recordsCount: transactions.length,
      records: transactions,
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Audit_Trail_HIV_LabStock_FY2568_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] flex flex-col antialiased selection:bg-secondary-container selection:text-primary">
      {/* Top Header */}
      <Header
        onOpenNotifications={() => setShowNotificationModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        unreadCount={2}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto pt-16 pb-20">
        {currentTab === 'dashboard' && (
          <DashboardScreen
            reagents={reagents}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onSelectReagentForDispense={handleSelectReagentForDispense}
            onOpenColdChain={() => setShowColdChainModal(true)}
            onOpenPurchaseRequest={(name) => setPurchaseRequestItem(name || 'Abbott RealTiME HIV-1')}
            onOpenPhysicalCount={() => setShowPhysicalCountModal(true)}
            onOpenStockCard={() => setShowStockCardModal(true)}
            onFilterFEFO={handleFilterFEFO}
            todayStats={todayStats}
          />
        )}

        {currentTab === 'inventory' && (
          <InventoryScreen
            reagents={reagents}
            onSelectReagentForDispense={handleSelectReagentForDispense}
            onOpenStickerModal={(r) => setActiveStickerReagent(r)}
            onOpenAddReagentModal={() => setShowAddReagentModal(true)}
            onOpenColdChain={() => setShowColdChainModal(true)}
            initialFilter={inventoryInitialFilter}
          />
        )}

        {currentTab === 'scanner' && (
          <ScannerScreen
            reagents={reagents}
            selectedReagent={selectedScannerReagent}
            onSelectReagent={setSelectedScannerReagent}
            onConfirmDispense={handleConfirmDispense}
            onConfirmIntake={handleConfirmIntake}
          />
        )}

        {currentTab === 'compliance' && (
          <ComplianceScreen
            transactions={transactions}
            onOpenStockCard={() => setShowStockCardModal(true)}
            onOpenNHSOReport={() => setShowNHSOReportModal(true)}
            onExportAuditTrail={handleExportAuditTrail}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Interactive Modals */}
      {activeStickerReagent && (
        <StickerModal
          reagent={activeStickerReagent}
          onClose={() => setActiveStickerReagent(null)}
        />
      )}

      {showStockCardModal && (
        <StockCardModal
          transactions={transactions}
          onClose={() => setShowStockCardModal(false)}
        />
      )}

      {showNHSOReportModal && (
        <NHSOReportModal onClose={() => setShowNHSOReportModal(false)} />
      )}

      {showAddReagentModal && (
        <AddReagentModal
          onClose={() => setShowAddReagentModal(false)}
          onAddReagent={handleAddNewReagent}
        />
      )}

      {showColdChainModal && (
        <ColdChainModal
          sensors={sensors}
          onClose={() => setShowColdChainModal(false)}
        />
      )}

      {showNotificationModal && (
        <NotificationModal
          onClose={() => setShowNotificationModal(false)}
          onNavigateToFEFO={() => {
            setInventoryInitialFilter('expiring');
            setCurrentTab('inventory');
          }}
          onNavigateToPurchase={() => {
            setPurchaseRequestItem('Abbott RealTiME HIV-1 Viral Load Kit');
          }}
        />
      )}

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}

      {purchaseRequestItem && (
        <PurchaseRequestModal
          initialItemName={purchaseRequestItem}
          onClose={() => setPurchaseRequestItem(null)}
        />
      )}

      {showPhysicalCountModal && (
        <PhysicalCountModal
          reagents={reagents}
          onClose={() => setShowPhysicalCountModal(false)}
        />
      )}
    </div>
  );
}
