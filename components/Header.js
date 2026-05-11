'use client';

import { Search, Bell, Menu, LayoutGrid, Clock, ShieldCheck } from 'lucide-react';

export default function Header({ onMenuClick }) {
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

        {/* <div className="h-4 w-px bg-zinc-200 hidden sm:block" aria-hidden="true" /> */}

        {/* <form className="relative flex flex-1 max-w-sm" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">Search database</label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-4 text-zinc-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-7 pr-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 text-[13px] font-medium"
            placeholder="Search records, passports or names..."
            type="search"
            name="search"
          />
        </form> */}

        <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-50 border border-zinc-100">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[11px] font-bold text-zinc-600">Last Sync: 12:44 UTC</span>
          </div>

          <button type="button" className="relative p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <span className="sr-only">View notifications</span>
            <Bell className="h-4.5 w-4.5" aria-hidden="true" strokeWidth={1.5} />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
          </button>

          <div className="h-6 w-px bg-zinc-200" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-[11px] font-bold text-zinc-900 leading-none">Global Compliance</span>
              <span className="text-[10px] font-medium text-emerald-600 mt-1 uppercase tracking-tighter">Verified Session</span>
            </div>
            <div className="h-8 w-8 rounded bg-[#2A9433] flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-black/10">
              SC
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
