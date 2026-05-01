import React from 'react';
import { ChevronRight, MapPin, Building, Star, Clock, FileAudio, Briefcase, Calendar, DollarSign, Share2, Info, CheckCircle2 } from 'lucide-react';
import { mockJobs } from '../data';

interface JobDetailsProps {
  jobId: string;
  onBack: () => void;
}

export default function JobDetailsView({ jobId, onBack }: JobDetailsProps) {
  const job = mockJobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800">الوظيفة غير موجودة</h2>
        <button onClick={onBack} className="mt-4 text-primary-600 font-medium flex items-center gap-2 mx-auto">
          <ChevronRight className="w-4 h-4" /> العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-slate-600 hover:text-primary-600 font-medium transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
          <span>العودة للوظائف</span>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  job.entityType === 'ناحية حكومية' ? 'bg-blue-100 text-blue-700' : 
                  job.entityType === 'قطاع خاص' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {job.entityType}
                </span>
                {job.matchScore >= 80 && (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    تطابق {job.matchScore}%
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 mt-3">
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  <span>{job.entity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">الراتب المتوقع</div>
                <div className="text-sm font-bold text-slate-800">{job.salary}</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">تاريخ النشر</div>
                <div className="text-sm font-bold text-slate-800">{job.postedAt}</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">آخر موعد للتقديم</div>
                <div className="text-sm font-bold text-slate-800">{job.deadline}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
                وصف الفرصة
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {job.description} هذه الفرصة مقدمة لتعزيز التنمية المحلية في {job.location}. نحن نبحث عن أشخاص طموحين يمتلكون المهارات الأساسية والرغبة في التعلم والتطور.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
                المتطلبات والمهارات
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RequirementItem text="الالتزام بمواعيد العمل والجدية" />
                <RequirementItem text="مهارات تواصل جيدة" />
                <RequirementItem text="القدرة على العمل ضمن فريق" />
                <RequirementItem text="صحة بدنية جيدة للمهام الميدانية" />
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-100 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-primary-900 text-lg mb-2">تقديم الطلب بصوتك</h3>
              <p className="text-primary-700 text-sm leading-relaxed">
                سيتم إرسال ملفك الصوتي الحالي ("خالد علي - ثانوية عامة") مع بياناتك الأساسية إلى جهة التوظيف مباشرة.
              </p>
            </div>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-shadow shadow-lg flex items-center gap-2 whitespace-nowrap">
              <FileAudio className="w-5 h-5" />
              ارسال الطلب الصوتي الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequirementItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-slate-700 text-sm">
      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      <span>{text}</span>
    </li>
  );
}
