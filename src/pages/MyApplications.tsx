import React from 'react';
import { useApplications } from '../context/ApplicationContext';
import { Send, FileText, CheckCircle, Video, XCircle, Clock, MapPin, Eye, FileAudio, AlertTriangle, Paperclip } from 'lucide-react';
import { ApplicationStatus } from '../types';

export default function MyApplicationsView({ onViewJob }: { onViewJob: (id: string) => void }) {
  const { applications, withdrawApplication } = useApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">طلبات التقديم الخاصة بي</h1>
        <p className="text-slate-500 text-sm mt-1">تتبع حالة الوظائف التي قدمت عليها عبر بصمتك الصوتية.</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-lg font-bold text-slate-700">لا توجد طلبات تقديم حالية</h2>
          <p className="text-slate-500 mt-2">ابدأ بالبحث عن الفرص المناسبة وقدم عليها بسهولة.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <ApplicationCard 
              key={app.id} 
              app={app} 
              onWithdraw={() => withdrawApplication(app.id)} 
              onViewJob={() => onViewJob(app.jobId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicationCard({ app, onWithdraw, onViewJob }: { app: any, onWithdraw: () => void, onViewJob: () => void }) {
  // Define full statuses flow
  const statusFlow = ['تم الإرسال', 'قيد المراجعة', 'تمت مشاهدة ملفك'];
  const isRejected = app.status === 'نعتذر منك';
  const isWithdrawn = app.status === 'تم السحب';
  const isInterview = app.status === 'تم الترشيح لمقابلة';

  const currentStepIndex = isRejected || isWithdrawn || isInterview 
    ? 3 
    : statusFlow.indexOf(app.status);

  return (
    <div className={`bg-white rounded-3xl border p-6 md:p-8 transition-shadow shadow-sm ${isWithdrawn ? 'border-slate-200 opacity-70' : 'border-slate-200 hover:shadow-md'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="text-xs text-slate-400 mb-1">تمت الإضافة: {app.appliedAt}</div>
          <h2 
            onClick={onViewJob}
            className="text-xl font-bold text-slate-800 hover:text-primary-600 cursor-pointer transition-colors"
          >
            {app.jobTitle}
          </h2>
          <div className="text-slate-500 mt-1 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {app.entity}
          </div>
        </div>

        {/* Action Button: Withdraw */}
        {!isWithdrawn && !isRejected && (
          <button 
            onClick={onWithdraw}
            className="text-red-500 bg-red-50 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            سحب الطلب <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Status Stepper */}
      <div className="bg-slate-50 p-6 rounded-2xl">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
           تعقب مسار الطلب
           {isWithdrawn && <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-md ml-2">ملغى</span>}
        </h3>
        
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 bg-slate-200 h-1 z-0"></div>
          {/* Progress bar fill */}
          <div 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 h-1 z-0 transition-all ${
              isRejected ? 'bg-red-400' : isWithdrawn ? 'bg-slate-400' : 'bg-primary-500'
            }`}
            style={{ width: currentStepIndex === 3 ? '100%' : `${(currentStepIndex / 3) * 100}%` }}
          />

          {[
            { label: 'تم الإرسال', icon: Send },
            { label: 'قيد المراجعة', icon: Clock },
            { label: 'مراجعة الملف', icon: Eye },
            { 
              label: isRejected ? 'نعتذر منك' : isWithdrawn ? 'تم السحب' : 'تم الترشيح', 
              icon: isRejected ? XCircle : isWithdrawn ? XCircle : CheckCircle,
              color: isRejected ? 'text-red-600 bg-red-100' : isWithdrawn ? 'text-slate-600 bg-slate-100' : 'text-primary-600 bg-primary-100'
            }
          ].map((step, idx) => {
            const isActive = currentStepIndex >= idx;
            const Icon = step.icon;
            
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border-4 border-slate-50 ${
                  isActive 
                    ? (step.color || 'bg-primary-600 text-white') 
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs md:text-sm font-medium hidden sm:block ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Required: Interview */}
      {isInterview && app.interviewDetails && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              {app.interviewDetails.type === 'صوتي/مرئي عبر التطبيق' ? <Video className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-lg mb-1">تم قبولك للمقابلة!</h4>
              <p className="text-blue-800 leading-relaxed text-sm mb-4">
                 جهة العمل مهتمة بملفك، يرجى التجهيز للمقابلة في الموعد المحدد.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white p-3 rounded-xl text-sm">
                  <span className="text-slate-400 block mb-1">الموعد:</span>
                  <span className="font-bold text-slate-800">{app.interviewDetails.date}</span>
                </div>
                <div className="bg-white p-3 rounded-xl text-sm">
                  <span className="text-slate-400 block mb-1">النوع / الموقع:</span>
                  <span className="font-bold text-slate-800">{app.interviewDetails.location}</span>
                </div>
              </div>

              {app.interviewDetails.type === 'صوتي/مرئي عبر التطبيق' && (
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm w-full md:w-auto justify-center">
                  <Video className="w-4 h-4" />
                  الانضمام للمقابلة داخل التطبيق
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
