import React from 'react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f8f9ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,45,74,0.04)] border-b border-[#e5eeff]/60">
      <div className="h-16 px-gutter flex items-center justify-between gap-space-sm max-w-lg mx-auto">
        <div className="flex items-center gap-space-sm min-w-0">
          <img
            alt="HIV LabStock Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXqeUq9_2WQFmDlmj0je-xW8cvcNCvgkJYyhsCE0GjKlJpfzTWvZDh4RXnvoDgEVumh2eMdEIXuK55XNbCJj-YPzQb---wLLQRsWkTKS51g_2Z18iQdRJ4sjWgPZa2VmcpkBXR3VeCx2hT3QxFHHmUuv54daWrcXce98Gf6yJW_RbA2NsrhXazXqEWnGW2EdLIIxFqYmqniFy7nW0kF8AF1oHDsAQmrzReGZqRyi9zhqg61Zweo00uxg"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight truncate">
                HIV LabStock
              </span>
            </div>
            <span className="font-caption text-caption text-on-surface-variant truncate">
              รพ.ศูนย์ / ศูนย์วิจัยทางคลินิก
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs flex-shrink-0">
          <button
            aria-label="การแจ้งเตือน"
            className="relative w-11 h-11 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40 transition-colors cursor-pointer"
            type="button"
            onClick={onOpenNotifications}
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full animate-pulse" />
            )}
          </button>

          <button
            aria-label="โปรไฟล์ผู้ใช้งาน"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
            type="button"
            onClick={onOpenProfile}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
