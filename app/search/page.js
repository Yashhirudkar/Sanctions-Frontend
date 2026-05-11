'use client';

import DataTable from '@/components/DataTable';

const columns = [
  {
    key: 'name',
    label: 'ENTITY NAME',
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-600 truncate max-w-[300px] block">{item.name}</span>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">{item.type} Intelligence</span>
      </div>
    )
  },
  {
    key: 'type',
    label: 'TYPE',
    render: (item) => (
      <span className="text-[11px] font-bold text-slate-500 uppercase">
        {item.extra_data?.Type || item.type || 'Entity'}
      </span>
    )
  },
  {
    key: 'countries',
    label: 'COUNTRY',
    render: (item) => (
      <span className="text-[11px] font-medium text-slate-600">
        {(item.countries || []).join(', ') || 'Global Scope'}
      </span>
    )
  },
  {
    key: 'dataset_list_name',
    label: 'SOURCE LIST',
    render: (item) => (
      <span className="text-[11px] font-semibold text-slate-500 italic truncate max-w-[200px] block">
        {item.dataset_list_name || 'System Registry'}
      </span>
    )
  },
  {
    key: 'action',
    label: 'ACTION'
  }
];

export default function SearchPage() {
  return (
    <DataTable
      title="Master Intelligence Search"
      subtitle="Consolidated cross-database search across all screening registries."
      endpoint="/api/data?random=true"
      columns={columns}
    />
  );
}
