'use client';

import { Bell, Menu, Clock, LogOut, User } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useState } from 'react';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-white/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-sm shadow-zinc-950/5">
      <button 
        type="button" 
        className="-m-2.5 p-2.5 text-zinc-500 lg:hidden hover:text-zinc-900 transition-colors"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-50 border border-zinc-100">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] font-bold text-zinc-600">Last Sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</span>
          </div>

          <button type="button" className="relative p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <span className="sr-only">View notifications</span>
            <Bell className="h-4.5 w-4.5" aria-hidden="true" strokeWidth={1.5} />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
          </button>

          <div className="h-6 w-px bg-zinc-200" aria-hidden="true" />

          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 hover:bg-zinc-50 p-1 rounded-lg transition-colors"
            >
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-[11px] font-bold text-zinc-900 leading-none capitalize">{user?.full_name || 'Guest User'}</span>
                <span className="text-[10px] font-medium text-emerald-600 mt-1 uppercase tracking-tighter">Verified Session</span>
              </div>
              <div className="h-8 w-8 rounded bg-[#2a9433] flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-[#2a9433]/20">
                {getInitials(user?.full_name)}
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white p-1 shadow-xl ring-1 ring-zinc-950/5 focus:outline-none animate-in fade-in zoom-in duration-100">
                <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                  <p className="text-[11px] font-bold text-zinc-900 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <LogOut className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

