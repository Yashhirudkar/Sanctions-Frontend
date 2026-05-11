'use client';

import { X, ShieldCheck, Globe, Mail, Phone, MapPin, ExternalLink, Calendar, User, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DetailsModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2A9433] bg-[#E9F5EA] px-2 py-1 rounded">
              Sanctioned Entity Identification
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left: Avatar & Quick Info */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="h-48 w-40 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden mb-4 shadow-inner relative group">
                <User className="h-20 w-20 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 backdrop-blur-md text-white text-[9px] font-bold py-1 uppercase tracking-widest">
                  Official Record
                </div>
              </div>
              
              <div className="w-full space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Record Type</span>
                  <span className="text-sm font-bold text-[#2A9433] uppercase">{item.type || 'Entity'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span className="text-xs font-bold uppercase tracking-tighter">Verified Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Fields */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Primary Legal Name</span>
                <h2 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                  {item.name}
                </h2>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <DetailItem 
                  label="Full Name" 
                  value={item.name} 
                  icon={User} 
                />
                <DetailItem 
                  label="Email Addresses" 
                  value={(item.emails || []).filter(e => e !== '-').join(', ') || 'None registered'} 
                  icon={Mail} 
                />
                <DetailItem 
                  label="Contact / Phone" 
                  value={(item.phones || []).filter(p => p !== '-').join(', ') || item.passport_number || 'N/A'} 
                  icon={Phone} 
                />
                <DetailItem 
                  label="Locations / Countries" 
                  value={(item.countries || []).filter(c => c !== '-').join(', ') || 'Global'} 
                  icon={Globe} 
                />
                <DetailItem 
                  label="Full Addresses" 
                  value={(item.addresses || []).filter(a => a !== '-').join(', ') || '—'} 
                  icon={MapPin} 
                  className="col-span-2"
                />
              </div>

              {/* Source Info */}
              <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Source Dataset</span>
                  <span className="text-[13px] font-bold text-slate-700">{item.dataset_list_name || 'Global Registry'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Listing Reason</span>
                  <span className="text-[13px] font-bold text-slate-700">{item.reason || 'Compliance Protocol'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Source URL</span>
                  <div className="flex items-center gap-1 text-[#2A9433] text-[12px] font-bold hover:underline cursor-pointer">
                    <span className="truncate max-w-[150px]">{item.source_url || 'https://www.sanctions-db.ai/info...'}</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Aliases</span>
                  <span className="text-[13px] font-bold text-slate-700 truncate block">{(item.aliases || []).filter(a => a !== '-').join(', ') || '—'}</span>
                </div>
              </div>

              {/* System Metadata */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Metadata (Extra Data)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Type" value={item.type || 'Person'} icon={ShieldCheck} />
                  <DetailItem label="Date of Birth" value={item.date_of_birth || item.extra_data?.['Date of Birth DD-MM-YYYY'] || 'N/A'} icon={Calendar} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-[10px] font-bold text-slate-400">Generated on {new Date().toLocaleDateString()}</span>
          <button className="bg-[#2A9433] text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#2A9433]/20 hover:scale-105 active:scale-95 transition-all">
            <ShieldCheck className="h-4 w-4" />
            Verified Record
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon: Icon, className }) {
  return (
    <div className={cn("space-y-1", className)}>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{label}</span>
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-slate-300" />
        <span className="text-[12.5px] font-bold text-slate-700 leading-tight truncate">{value}</span>
      </div>
    </div>
  );
}
