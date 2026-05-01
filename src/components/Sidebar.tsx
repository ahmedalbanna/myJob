import React from 'react';
import { Briefcase, Compass, FileAudio, Home, LayoutDashboard, Lightbulb, LogOut, Menu, Settings, X, User, Send } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Home },
    { id: 'jobs', label: 'فرص العمل', icon: Briefcase },
    { id: 'applications', label: 'طلباتي', icon: Send },
    { id: 'guidance', label: 'المستشار المهني', icon: Compass },
    { id: 'projects', label: 'دعم المشاريع', icon: Lightbulb },
    { id: 'profile', label: 'الملف المهني', icon: User },
    // { id: 'admin', label: 'مرصد سوق العمل', icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full w-64 bg-white border-l border-slate-200 shadow-sm z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-primary-600">
            <Briefcase className="w-8 h-8" />
            <span className="text-xl font-bold">وظيفتك</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors w-full text-right ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-right text-slate-600 hover:bg-slate-50">
            <LogOut className="w-5 h-5 text-slate-400" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
