'use client';

import DataTable from '@/components/DataTable';

const columns = [
  {
    key: 'name',
    label: 'ENTITY NAME',
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-600 truncate max-w-[300px] block">{item.name}</span>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">Enforcement Record</span>
      </div>
    )
  },
  {
    key: 'type',
    label: 'TYPE',
    render: (item) => (
      <span className="text-[11px] font-bold text-red-600 uppercase">
        {item.extra_data?.Type || 'Company'}
      </span>
    )
  },
  {
    key: 'countries',
    label: 'COUNTRY',
    render: (item) => (
      <span className="text-[11px] font-medium text-slate-600">
        {(item.countries || []).join(', ') || '—'}
      </span>
    )
  },
  {
    key: 'passport_number',
    label: 'PASSPORT / ID',
    render: (item) => <span className="font-mono text-[11px] text-slate-500 uppercase">{item.passport_number || '—'}</span>
  },
  {
    key: 'dataset_list_name',
    label: 'SOURCE LIST',
    render: (item) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 uppercase tracking-tighter truncate max-w-[200px]">
        {item.dataset_list_name || 'Criminal Warrant'}
      </span>
    )
  },
  {
    key: 'action',
    label: 'ACTION'
  }
];

export default function CriminalPage() {
  return (
    <DataTable
      title="Enforcement & Criminal Records"
      subtitle="Monitoring of active warrants and documented criminal enforcement actions."
      endpoint="/api/criminal"
      columns={columns}
    />
  );
}
