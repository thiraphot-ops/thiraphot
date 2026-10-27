import React from 'react';

export type NavTab = 'dashboard' | 'inventory' | 'scanner' | 'compliance';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    {
      id: 'dashboard' as NavTab,
      label: 'แดชบอร์ด',
      icon: 'analytics',
    },
    {
      id: 'inventory' as NavTab,
      label: 'คลังน้ำยา',
      icon: 'science',
    },
    {
      id: 'scanner' as NavTab,
      label: 'สแกน QR',
      icon: 'qr_code_scanner',
    },
    {
      id: 'compliance' as NavTab,
      label: 'งานพัสดุ',
      icon: 'assignment_turned_in',
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,45,74,0.06)] border-t border-surface-container-high/60">
      <div className="h-16 px-space-xs grid grid-cols-4 items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-all group cursor-pointer ${
                isActive
                  ? 'text-secondary font-bold scale-[1.02]'
                  : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] mb-0.5 transition-transform ${
                  isActive ? 'text-secondary scale-110 font-bold' : 'group-hover:text-secondary'
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-caption text-caption tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
