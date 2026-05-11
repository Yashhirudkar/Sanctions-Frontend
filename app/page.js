'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserRoundX, 
  Activity, 
  TrendingUp,
  Database,
  Globe,
  Clock,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_BASE}/api/stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-900"></div>
    </div>
  );

  const statItems = [
    { name: 'Total Database', value: stats?.total || 0, icon: Database, color: 'text-slate-900', trend: '+1.2%', up: true },
    { name: 'Sanctioned Nodes', value: stats?.consolidated || 0, icon: ShieldCheck, color: 'text-rose-600', trend: '+0.8%', up: true },
    { name: 'PEP Intelligence', value: stats?.pep || 0, icon: Users, color: 'text-amber-600', trend: '+2.4%', up: true },
    { name: 'Criminal Records', value: stats?.criminal || 0, icon: UserRoundX, color: 'text-indigo-600', trend: '-0.3%', up: false },
  ];

  return (
    <div className="space-y-10 py-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Dashboard</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1 max-w-2xl">
            Real-time screening telemetry across global enforcement networks and watchlists.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-600 flex items-center gap-2 shadow-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                NETWORK SECURE
            </div>
            <button className="px-3 py-1.5 bg-[#2A9433] text-white border border-[#2A9433] rounded text-[11px] font-bold flex items-center gap-2 hover:bg-[#237c2a] transition-colors shadow-lg shadow-black/5">
                <RefreshCw className="h-3 w-3" />
                SYNC DATA
            </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item) => (
          <div key={item.name} className="bg-white p-5 border border-slate-200/80 rounded shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">
                        {item.name}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 tabular-nums">
                        {item.value.toLocaleString()}
                    </p>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <item.icon className={cn("h-4 w-4", item.color)} strokeWidth={2.5} />
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <span className={cn(
                    "text-[10px] font-black px-1.5 py-0.5 rounded border leading-none flex items-center gap-1",
                    item.up ? "text-emerald-600 bg-emerald-50/50 border-emerald-100" : "text-rose-600 bg-rose-50/50 border-rose-100"
                )}>
                    {item.up ? '↑' : '↓'} {item.trend}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">vs Last Session</span>
            </div>
            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-3 w-3 text-slate-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Latest Feed */}
        <div className="lg:col-span-2 bg-white rounded border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              Live Ingest Stream
            </h3>
            <div className="flex items-center gap-4">
                 <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Global Distribution
                 </div>
                 <button className="text-[10px] font-black text-slate-900 uppercase tracking-tighter hover:text-blue-600 transition-colors">View All Stream</button>
            </div>
          </div>
          <div className="divide-y divide-slate-50 overflow-hidden">
            {stats?.recent_records?.map((record, idx) => (
              <div key={idx} className="px-6 py-4 hover:bg-slate-50/50 transition-colors group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                      "h-8 w-8 rounded flex items-center justify-center border",
                      record.type === 'pep' ? "bg-amber-50 border-amber-100 text-amber-600" :
                      record.type === 'consolidated' ? "bg-rose-50 border-rose-100 text-rose-600" :
                      "bg-indigo-50 border-indigo-100 text-indigo-600"
                  )}>
                    {record.type === 'pep' ? <Users className="h-4 w-4" /> : record.type === 'consolidated' ? <ShieldCheck className="h-4 w-4" /> : <UserRoundX className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900 leading-tight">{record.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {(record.countries || []).join(', ') || 'Internal Registry'} • {record.dataset_list_name || 'System Feed'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-300 uppercase tabular-nums">14:28:02</span>
                    <button className="p-1.5 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded transition-all opacity-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
              </div>
            ))}
            {(!stats?.recent_records || stats.recent_records.length === 0) && (
              <div className="px-6 py-20 text-center text-slate-400">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Live Telemetry...</p>
              </div>
            )}
          </div>
        </div>

        {/* Source Hierarchy */}
        <div className="bg-white rounded border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              Data Provenance
            </h3>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
             <div className="space-y-8 mt-2">
                {stats?.top_sources?.map((source, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-[10px] mb-2 font-black uppercase tracking-widest">
                      <span className="text-slate-500 truncate max-w-[140px]">{source.name}</span>
                      <span className="text-emerald-600">{((source.count / stats.total) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(source.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-auto pt-10">
                <div className="bg-slate-50 p-5 rounded border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Global Index Status</p>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-xl font-bold text-slate-900 tabular-nums tracking-tighter">190+</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Regions Protected</p>
                        </div>
                        <div className="h-10 w-[0.5px] bg-slate-200" />
                        <div className="flex-1">
                            <p className="text-xl font-bold text-emerald-600 tabular-nums tracking-tighter">Active</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Guard Monitoring</p>
                        </div>
                    </div>
                    <button className="w-full mt-6 py-2 bg-white hover:bg-slate-50 text-slate-900 text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded transition-all flex items-center justify-center gap-2 group">
                        System Integrity Check
                        <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
