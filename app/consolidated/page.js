'use client';

import DataTable from '@/components/DataTable';

const columns = [
  {
    key: 'name',
    label: 'ENTITY NAME',
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-600 leading-none truncate max-w-[300px] block">{item.name}</span>
        {item.reference_number && <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Ref: {item.reference_number}</span>}
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
      <div className="flex flex-wrap gap-1">
        {(item.countries || []).map((c, i) => (
          <span key={i} className="text-[10px] font-bold text-slate-500">{c}{i < item.countries.length - 1 ? ',' : ''}</span>
        ))}
        {(!item.countries || item.countries.length === 0) && <span className="text-slate-300">Global</span>}
      </div>
    )
  },
  {
    key: 'passport_number',
    label: 'PASSPORT / ID',
    render: (item) => <span className="font-mono text-[11px] text-slate-500">{item.passport_number || 'N/A'}</span>
  },
  {
    key: 'dataset_list_name',
    label: 'SOURCE LIST',
    render: (item) => (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[200px]">
        {item.dataset_list_name || 'Standard'}
      </span>
    )
  },
  {
    key: 'action',
    label: 'ACTION',
    render: () => null // Handled by DataTable component internal logic
  }
];

export default function SanctionsPage() {
  return (
    <DataTable
      title="Consolidated Sanctions Registry"
      subtitle="Comprehensive registry of entities under regulatory enforcement and monitoring."
      endpoint="/api/consolidated"
      columns={columns}
    />
  );
}
