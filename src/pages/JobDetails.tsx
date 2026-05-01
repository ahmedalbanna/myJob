import React, { useState } from 'react';
import { Send, FileText, CheckCircle, Video, XCircle, Clock, MapPin, Eye, FileAudio, AlertTriangle, Paperclip } from 'lucide-react';
import { mockJobs, currentUser } from '../data';
import { useApplications } from '../context/ApplicationContext';
import { Job } from '../types';

interface JobDetailsProps {
  jobId: string;
  onBack: () => void;
}

export default function JobDetailsView({ jobId, onBack }: JobDetailsProps) {
  const job = mockJobs.find(j => j.id === jobId);
  const { applyForJob, hasAppliedForJob, getWeeklyCount } = useApplications();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  
  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800">الوظيفة غير موجودة</h2>
        <button onClick={onBack} className="mt-4 text-primary-600 font-medium flex items-center gap-2 mx-auto">
           العودة للرئيسية
        </button>
      </div>
    );
  }

  const isApplied = hasAppliedForJob(job.id);
  const hasAudioProfile = !!currentUser.profileText || !!currentUser.audioProfileUrl;
  const matchScoreSufficient = job.matchScore >= 50;
  const weeklyCount = getWeeklyCount();
  const canApplyWeekly = weeklyCount < 3; // Maximum 3 applications per week for mock purposes

  const handleApplyClick = () => {
    setShowApplyModal(true);
  };

  const handleConfirmApply = () => {
    applyForJob(job, attachments.length > 0 ? attachments : undefined);
    setShowApplyModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-slate-600 hover:text-primary-600 font-medium transition-colors"
        >
          <span>العودة للوظائف</span>
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
                    تطابق {job.matchScore}%
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 mt-3">
                <div className="flex items-center gap-1.5">
                  <span>{job.entity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
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
                {job.description} هذه الفرصة مقدمة لتعزيز التنمية المحلية في {job.location}.
              </p>
            </section>
          </div>

          <div className="mt-12">
            {!hasAudioProfile && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-800">الملف الصوتي مفقود</h4>
                  <p className="text-amber-700 text-sm mt-1">يجب عليك إنشاء ملف تعريف صوتي في صفحة "الملف المهني" قبل التقديم على الوظائف.</p>
                </div>
              </div>
            )}
            
            {!matchScoreSufficient && hasAudioProfile && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 mb-4">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-800">التطابق غير كافٍ</h4>
                  <p className="text-red-700 text-sm mt-1">تتطلب هذه الوظيفة مهارات لا تتوافق كلياً مع ملفك الحالي (أقل من 50%). قم بتحديث مهاراتك إذا كنت تعتقد أنك مؤهل.</p>
                </div>
              </div>
            )}

            {!canApplyWeekly && matchScoreSufficient && hasAudioProfile && !isApplied && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-orange-800">تم بلوغ الحد الأقصى الأسبوعي</h4>
                  <p className="text-orange-700 text-sm mt-1">لقد استنفذت الحد المسموح به من التقديمات (3) لهذا الأسبوع لمنع التقديم العشوائي. حاول مجدداً الأسبوع القادم.</p>
                </div>
              </div>
            )}

            <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center gap-6 ${isApplied ? 'bg-slate-50 border-slate-200' : 'bg-primary-50 border-primary-100'}`}>
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-2 ${isApplied ? 'text-slate-800' : 'text-primary-900'}`}>
                  {isApplied ? 'قمت بالتقديم على هذه الفرصة' : 'تقديم الطلب بصوتك'}
                </h3>
                <p className={`text-sm leading-relaxed ${isApplied ? 'text-slate-500' : 'text-primary-700'}`}>
                  {isApplied 
                    ? 'يمكنك متابعة حالة طلبك من قسم "طلباتي" في القائمة الرئيسية.'
                    : `سيتم إرسال ملفك الصوتي الحالي مع بياناتك الأساسية إلى جهة التوظيف مباشرة.`
                  }
                </p>
              </div>
              
              <button 
                onClick={handleApplyClick}
                disabled={isApplied || !hasAudioProfile || !matchScoreSufficient || !canApplyWeekly}
                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap ${
                  isApplied 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : (!hasAudioProfile || !matchScoreSufficient || !canApplyWeekly)
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isApplied ? <CheckCircle className="w-5 h-5" /> : <FileAudio className="w-5 h-5" />}
                {isApplied ? 'تم الإرسال بنجاح' : 'إرسال الطلب الصوتي الآن'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
             <button onClick={() => setShowApplyModal(false)} className="absolute top-4 left-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
               <XCircle className="w-6 h-6" />
             </button>
             
             <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <Send className="w-7 h-7" />
             </div>
             
             <h2 className="text-2xl font-bold text-slate-800 mb-2">تأكيد إرسال الطلب</h2>
             <p className="text-slate-600 mb-6">سيتم إرسال بطاقتك الصوتية وبياناتك المستخرجة من هويتي للتقدم لوظيفة "{job.title}".</p>
             
             <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200">
               <label className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                 <Paperclip className="w-4 h-4 text-slate-500" />
                 مرفقات إضافية (اختياري)
               </label>
               <p className="text-xs text-slate-500 mb-3">هل تتطلب هذه الفرصة أي شهادات خاصة أو نماذج أعمال؟ يمكنك إرفاقها هنا.</p>
               
               <div className="flex gap-2">
                 <button 
                  onClick={() => setAttachments(prev => [...prev, `مستند_مرفق_${prev.length + 1}.pdf`])}
                  className="bg-white border border-dashed border-slate-300 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors w-full"
                 >
                   + إضافة ملف
                 </button>
               </div>
               {attachments.length > 0 && (
                 <ul className="mt-3 space-y-2">
                   {attachments.map((att, i) => (
                     <li key={i} className="flex items-center justify-between bg-white px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700">
                       <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary-500"/> {att}</span>
                       <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 hover:bg-red-50 p-1 rounded">حذف</button>
                     </li>
                   ))}
                 </ul>
               )}
             </div>

             <div className="flex gap-3 mt-8">
               <button onClick={handleConfirmApply} className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                 إرسال الطلب <Send className="w-4 h-4" />
               </button>
               <button onClick={() => setShowApplyModal(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                 تراجع
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
