import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Hidden on mobile, handled by mobile sidebar header */}
        <div className="hidden lg:flex items-center gap-2 text-primary-600 font-bold text-xl">
           <span className="bg-primary-600 text-white p-1 rounded-md text-sm px-2">إصدار تجريبي</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full z-10 box-content border-2 border-white"></span>
        </button>
        <div className="hidden sm:flex items-center gap-3 border-r border-slate-200 pr-4">
          <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
            خ.ع
          </div>
        </div>
      </div>
    </header>
  );
}
