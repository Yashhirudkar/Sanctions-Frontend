'use client';

import DataTable from '@/components/DataTable';

const columns = [
  {
    key: 'name',
    label: 'PERSON IDENTIFIER',
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-600 truncate max-w-[300px] block">{item.name}</span>
        {item.title && <span className="text-[10px] text-slate-400 italic font-medium mt-0.5">{item.title}</span>}
      </div>
    )
  },
  {
    key: 'type',
    label: 'TYPE',
    render: (item) => (
      <span className="text-[11px] font-bold text-blue-600 uppercase">
        {item.extra_data?.Type || 'Person'}
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
    key: 'date_of_birth',
    label: 'BIRTH METRIC',
    render: (item) => <span className="font-mono text-[11px] text-slate-500">{item.date_of_birth || '—'}</span>
  },
  {
    key: 'dataset_list_name',
    label: 'SOURCE LIST',
    render: (item) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 uppercase tracking-tighter truncate max-w-[200px]">
        {item.dataset_list_name || 'PEP IDENTIFIED'}
      </span>
    )
  },
  {
    key: 'action',
    label: 'ACTION'
  }
];

export default function PEPPage() {
  return (
    <DataTable
      title="Politically Exposed Persons"
      subtitle="Identification and screening of individuals with significant political exposure."
      endpoint="/api/pep"
      columns={columns}
    />
  );
}
