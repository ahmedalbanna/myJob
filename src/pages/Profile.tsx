import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, FileText, Upload, Save, User, MapPin, GraduationCap, Wrench, FileAudio } from 'lucide-react';
import { currentUser } from '../data';

export default function ProfileView() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">الملف المهني والصوتي</h1>
        <p className="text-slate-500 text-sm mt-1">بطاقتك التعريفية لأصحاب العمل. تحدث عن نفسك ومهاراتك.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Recorder Section */}
          <div className="flex-1 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              
              <div className="mb-6 relative">
                {isRecording && (
                  <div className="absolute inset-0 bg-red-100 rounded-full animate-ping scale-150 opacity-50" />
                )}
                <button 
                  onClick={handleRecordToggle}
                  className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-10 h-10" />}
                </button>
              </div>

              {isRecording ? (
                <>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">...جاري التسجيل</h3>
                  <div className="text-red-500 font-mono text-xl">{formatTime(recordingTime)}</div>
                  <p className="text-slate-500 text-sm mt-4 max-w-xs leading-relaxed">
                    تحدث عن اسمك، مؤهلك، المهارات التي تتقنها، ونوع العمل الذي تبحث عنه.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">سجل ملفك الصوتي</h3>
                  <p className="text-slate-500 text-sm mb-4 max-w-xs leading-relaxed">
                    اضغط على الزر وتحدث بحرية لـ ٣ دقائق كحد أقصى. سيقوم نظامنا الذكي بتفريغ قدراتك تلقائياً.
                  </p>
                </>
              )}
            </div>

            {/* Current Audio Profile */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <FileAudio className="w-5 h-5 text-primary-600" />
                ملفك الصوتي الحالي
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm shrink-0 hover:bg-primary-50">
                  <Play className="w-5 h-5 fill-current ml-1" />
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full w-full overflow-hidden">
                     <div className="h-full bg-primary-500 w-1/3"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>0:00</span>
                    <span>1:45</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-primary-50 text-primary-800 text-sm rounded-xl leading-relaxed">
                <span className="font-bold">التفريغ الذكي للرسالة:</span> "{currentUser.profileText}"
              </div>
            </div>
          </div>

          {/* Extracted Details Section */}
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 mb-4 whitespace-nowrap">البيانات الأساسية (تسحب من هويتي عند الموافقة)</h3>
            <div className="space-y-4">
              <ProfileField icon={<User />} label="الاسم الكامل" value={currentUser.name} />
              <ProfileField icon={<MapPin />} label="المحافظة / المدينة" value={currentUser.location} />
              <ProfileField icon={<GraduationCap />} label="المستوى التعليمي" value={currentUser.educationLevel} />
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  المهارات (مستخرجة من الصوت)
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                  <button className="bg-slate-50 border border-dashed border-slate-300 text-slate-500 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-100">
                    + إضافة مهارة
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
               <Save className="w-5 h-5" />
               حفظ وتحديث الملف
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4 text-slate-400' })}
        {label}
      </label>
      <input 
        type="text" 
        defaultValue={value}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white text-slate-800"
      />
    </div>
  );
}
