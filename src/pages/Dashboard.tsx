import React, { useState } from 'react';
import { Mic, Search, ChevronLeft, MapPin, Building, Star, Clock, FileAudio, Play } from 'lucide-react';
import { mockJobs, currentUser } from '../data';

export default function DashboardView({ navigateTo, onViewJob }: { navigateTo: (view: string) => void, onViewJob: (id: string) => void }) {
  const matchedJobs = mockJobs.filter(j => j.matchScore >= 80);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10 w-full md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">مرحباً خالد!</h1>
          <p className="text-primary-100 mb-6 text-lg">لقد وجدنا لك ٣ فرص عمل تتطابق مع مهاراتك اليوم.</p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigateTo('jobs')}
              className="bg-white text-primary-700 px-6 py-2.5 rounded-full font-medium hover:bg-primary-50 transition-colors shadow-sm"
            >
              استعراض الفرص المقترحة
            </button>
            <button 
              onClick={() => navigateTo('profile')}
              className="bg-primary-700 border border-primary-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              تحديث ملفي الصوتي
            </button>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none transform -translate-x-12 translate-y-12">
          <BriefcaseWatermark className="w-64 h-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Snapshot */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
            <UserIcon className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-1">{currentUser.name}</h3>
          <p className="text-slate-500 text-sm mb-4">{currentUser.educationLevel} | {currentUser.location}</p>
          <div className="w-full bg-slate-50 p-4 rounded-xl flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
               <FileAudio className="w-5 h-5" />
             </div>
             <div className="flex-1 text-right">
               <div className="text-sm font-medium text-slate-700">الملف الصوتي مفعل</div>
               <div className="text-xs text-slate-400 mt-1">آخر تحديث: قبل يومين</div>
             </div>
             <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
               <Play className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Quick Stats/Actions */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
          <DashboardCard 
            title="فرص مقترحة" 
            value={matchedJobs.length.toString()} 
            icon={<BriefcaseIcon className="w-6 h-6 text-emerald-600" />}
            color="bg-emerald-50"
            onClick={() => navigateTo('jobs')}
          />
          <DashboardCard 
            title="طلباتي" 
            value="٢" 
            icon={<SendIcon className="w-6 h-6 text-blue-600" />}
            color="bg-blue-50"
            onClick={() => navigateTo('applications')}
          />
          <DashboardCard 
            title="دورات تدريبية" 
            value="٢" 
            icon={<BookOpenIcon className="w-6 h-6 text-purple-600" />}
            color="bg-purple-50"
            onClick={() => navigateTo('guidance')}
          />
          <DashboardCard 
            title="العمل الحر" 
            value="جديد" 
            icon={<LightbulbIcon className="w-6 h-6 text-amber-600" />}
            color="bg-amber-50"
            onClick={() => navigateTo('projects')}
          />
        </div>
      </div>

      {/* Top Matched Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">أقوى الترشيحات لك</h2>
          <button onClick={() => navigateTo('jobs')} className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
            عرض الكل <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {matchedJobs.slice(0, 2).map(job => (
            <div 
              key={job.id} 
              onClick={() => onViewJob(job.id)}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{job.title}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                    <Building className="w-4 h-4" />
                    <span>{job.entity}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
                  <Star className="w-3 h-3 fill-current" />
                  {job.matchScore}% تطابق
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{job.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <div className="text-sm font-semibold text-slate-800">{job.salary}</div>
                <button className="bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  تقديم بصوتي
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icons extracted to prevent huge imports, using basic SVG for specific look or Lucide
import { Briefcase as BriefcaseIcon, User as UserIcon, Send as SendIcon, BookOpen as BookOpenIcon, Lightbulb as LightbulbIcon } from 'lucide-react';

const BriefcaseWatermark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
  </svg>
);

function DashboardCard({ title, value, icon, color, onClick }: { title: string, value: string, icon: React.ReactNode, color: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-right flex flex-col h-full"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <div className="text-slate-500 text-sm font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
    </button>
  );
}
