'use client';

import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  MoreVertical,
  ArrowUpRight,
  Database,
  ArrowDown,
  X
} from 'lucide-react';
import DetailsModal from './DetailsModal';
import { cn } from '@/lib/utils';

export default function DataTable({ title, subtitle, endpoint, columns }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  const fetchData = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const separator = endpoint.includes('?') ? '&' : '?';
      let url = `${API_BASE}${endpoint}${separator}limit=${limit}&offset=${offset}`;
      if (debouncedSearch) url += `&name=${encodeURIComponent(debouncedSearch)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      setData(json.data || []);
      setCount(json.count || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch data when page, endpoint, or debounced search changes
  useEffect(() => {
    fetchData();
  }, [page, endpoint, debouncedSearch]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // No need to manually fetch, the useEffect on debouncedSearch will handle it
  };

  const handleClearFilters = () => {
    setSearch('');
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(count / limit));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {search && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-bold transition-all border border-rose-200 shadow-sm"
            >
              <X className="h-3 w-3" />
              CLEAR FILTERS
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Compact Table Toolbar */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs group">
            <Search className="absolute inset-y-0 left-3 h-full w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
            <input
              type="text"
              className="block w-full  py-1.5 pl-10 pr-10 text-[13px] font-medium border border-slate-200 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400  hover:border-slate-400"
              placeholder="Filter records by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="absolute inset-y-0 right-3 flex items-center h-full text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-slate-300" />
              <span>Advanced View</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5 text-blue-600">
              <Database className="h-3.5 w-3.5" />
              <span>Total Count: {count.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={cn("px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200/60", col.key === 'action' ? "text-center" : "text-left")}>
                    <div className={cn("flex items-center gap-1", col.key === 'action' ? "justify-center" : "justify-start")}>
                      {col.label}
                      {col.key !== 'action' && <ArrowDown className="h-2.5 w-2.5 text-slate-300" />}
                    </div>
                  </th>
                ))}
                {!columns.find(c => c.key === 'action' || c.key === 'actions') && (
                  <th className="px-4 py-2.5 border-b border-slate-200/60 w-10"></th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-4"><div className="h-3 bg-slate-50 rounded w-full"></div></td>
                    ))}
                    <td className="px-4 py-4"></td>
                  </tr>
                ))
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    {columns.map((col) => (
                      <td key={col.key} className={cn("px-4 py-3.5 text-[12.5px] font-medium text-slate-600 leading-tight", col.key === 'action' ? "text-center" : "text-left")}>
                        {col.key === 'action' ? (
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setIsModalOpen(true);
                              }}
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : col.render ? col.render(item) : item[col.key] || <span className="text-slate-300">N/A</span>}
                      </td>
                    ))}
                    {!columns.find(c => c.key === 'action' || c.key === 'actions') && (
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setIsModalOpen(true);
                            }}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center grayscale opacity-60">
                      <Search className="h-8 w-8 text-slate-300 mb-2" />
                      <p className="text-sm font-bold text-slate-500">No telemetry matches</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Verify filters or connection</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Minimal Pagination */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Displaying <span className="text-slate-900">{(page - 1) * limit + 1} - {Math.min(page * limit, count)}</span> of <span className="text-slate-900">{count.toLocaleString()}</span> nodes
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center px-3 text-[11px] font-black text-slate-600 tracking-widest">
              PAGE {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <DetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
