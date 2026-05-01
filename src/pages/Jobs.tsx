import React, { useState } from 'react';
import { Search, Filter, MapPin, Building, Star, Clock, LayoutGrid, List } from 'lucide-react';
import { mockJobs, Job } from '../data';

export default function JobsView({ onViewJob }: { onViewJob: (id: string) => void }) {
  const [filter, setFilter] = useState('all'); // all, matched, gov, private

  const filteredJobs = mockJobs.filter(job => {
    if (filter === 'matched') return job.matchScore >= 80;
    if (filter === 'gov') return job.entityType === 'ناحية حكومية';
    if (filter === 'private') return job.entityType === 'قطاع خاص';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">فرص العمل المتاحة</h1>
          <p className="text-slate-500 text-sm mt-1">تصفح وقدم على الوظائف بصوتك وبطغطة زر.</p>
        </div>
        
        <div className="w-full md:w-auto relative">
          <input 
            type="text" 
            placeholder="ابحث عن مهنة، مهارة، أو مدينة..."
            className="w-full md:w-80 pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>الكل</FilterButton>
        <FilterButton active={filter === 'matched'} onClick={() => setFilter('matched')}>
          <Star className="w-4 h-4" /> مقترحة لك
        </FilterButton>
        <FilterButton active={filter === 'gov'} onClick={() => setFilter('gov')}>حكومي</FilterButton>
        <FilterButton active={filter === 'private'} onClick={() => setFilter('private')}>قطاع خاص</FilterButton>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-sm font-medium whitespace-nowrap">
          <Filter className="w-4 h-4" /> فلاتر أخرى
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredJobs.map(job => (
             <JobCard key={job.id} job={job} onClick={() => onViewJob(job.id)} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active 
          ? 'bg-primary-600 text-white shadow-md' 
          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
}

function JobCard({ job, onClick }: { job: Job, onClick: () => void }) {
  const [applied, setApplied] = useState(false);

  return (
    <div 
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer ${applied ? 'border-primary-300 ring-1 ring-primary-300 shadow-md' : 'border-slate-200 shadow-sm hover:shadow-md'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-slate-800">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-slate-500 text-sm mt-2">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-xs">
              <Building className="w-3 h-3" />
              {job.entity}
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-xs">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-xs">
              <Clock className="w-3 h-3" />
              {job.type}
            </span>
          </div>
        </div>
        {job.matchScore >= 80 && (
          <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
            <Star className="w-3 h-3 fill-current" />
            تطابق {job.matchScore}%
          </div>
        )}
      </div>
      
      <p className="text-slate-600 text-sm my-4 leading-relaxed">{job.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <div className="text-sm font-bold text-slate-800">{job.salary}</div>
          <div className="text-xs text-slate-400 mt-1">ينتهي التقديم في: {job.deadline}</div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setApplied(true);
          }}
          disabled={applied}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
            applied 
              ? 'bg-primary-50 text-primary-700' 
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm cursor-pointer'
          }`}
        >
          {applied ? 'تم التقديم' : 'تقديم بصوتي'}
          {!applied && <MicIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

// Reusing generic mic
import { Mic as MicIcon } from 'lucide-react';
