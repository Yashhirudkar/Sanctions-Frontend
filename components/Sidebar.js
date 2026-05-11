'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  ShieldCheck,
  Users,
  UserMinus,
  Search,
  Database,
  Settings,
  HelpCircle,
  Command,
  ChevronRight,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from './AuthContext';

const navigation = [
  { name: 'Analytics', href: '/', icon: BarChart3 },
  { name: 'Sanctions List', href: '/search', icon: Search },
  { name: 'Consolidated List', href: '/consolidated', icon: ShieldCheck },
  { name: 'PEPs', href: '/pep', icon: Users },
  { name: 'Criminal Records', href: '/criminal', icon: UserMinus },
  { name: 'Warrants', href: '/warrants', icon: Database },
];

const secondaryNavigation = [
  { name: 'Database', href: '/database', icon: Database },
  { name: 'System Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, mobile }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={cn(
      "relative flex h-full flex-col bg-white text-slate-500 border-r border-slate-200 transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-64",
      mobile && "w-64"
    )}>
      {/* Brand Header */}
      <div className={cn(
        "flex h-16 shrink-0 items-center border-b border-slate-100 transition-all",
        collapsed ? "justify-center px-0" : "px-6"
      )}>
        <div className="flex items-center gap-2.5">
          <img
            src="/Sanctions%20Database.png"
            alt="Sanctions Database"
            className={cn("h-8 w-auto object-contain transition-all", collapsed && "mx-auto")}
          />
        </div>
      </div>

      {/* Collapse Toggle Button (Desktop Only) */}
      {!mobile && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-400 bg-white text-slate-400 hover:text-slate-600 shadow-sm z-50 transition-transform duration-300"
          style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col px-3 py-6 overflow-y-auto scrollbar-hide">
        {!collapsed && (
          <div className="mb-4 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Main Console
          </div>
        )}
        <ul role="list" className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    isActive
                      ? 'bg-[#E9F5EA] text-[#2A9433] border border-[#2A9433]/30 shadow-sm shadow-[#2A9433]/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent',
                    'group relative flex items-center rounded-md p-2.5 text-[13px] font-semibold transition-all duration-200',
                    collapsed ? "justify-center" : "justify-between"
                  )}
                  title={collapsed ? item.name : ""}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      isActive ? 'text-[#2A9433]' : 'text-slate-400 group-hover:text-slate-600',
                      'h-5 w-5 transition-colors shrink-0'
                    )} strokeWidth={isActive ? 2.5 : 2} />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {isActive && !collapsed && <div className="h-1 w-1 rounded-full bg-[#2A9433]" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile - Pinned Bottom */}
      <div className={cn(
        "mt-auto p-4 border-t border-slate-100 bg-slate-50/50 transition-all",
        collapsed ? "items-center" : ""
      )}>
        <div className={cn(
          "flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100/50 transition-colors cursor-pointer group",
          collapsed ? "justify-center px-0" : ""
        )}>
          <div className="relative shrink-0">
            <div className="h-9 w-9 rounded bg-white flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">
              {getInitials(user?.full_name)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-900 truncate capitalize">{user?.full_name || 'Guest User'}</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <Link href="/help" className="mt-4 flex items-center gap-2 px-2 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
            <HelpCircle className="h-4 w-4" />
            Technical Support
          </Link>
        )}
      </div>
    </div>
  );
}
