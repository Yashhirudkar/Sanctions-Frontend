'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from './AuthContext';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isLoginPage = pathname === '/login';

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-400 font-medium animate-pulse">Initializing Security...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null; // AuthProvider will handle redirect
  }

  return (
    <div className="flex h-full overflow-hidden bg-slate-50">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-50 flex lg:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}
        role="dialog" 
        aria-modal="true"
      >
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-slate-900/80 transition-opacity duration-300 ease-linear ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className={`relative flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute right-0 top-0 flex w-16 justify-center pt-5 translate-x-full">
            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Sidebar mobile />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className={`hidden lg:flex lg:shrink-0 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 bg-slate-50/50">
          <div className="py-8">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

