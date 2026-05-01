import React from 'react';
import { Compass, BookOpen, Target, ArrowLeft, CheckCircle2, TrendingUp } from 'lucide-react';
import { mockCourses } from '../data';

export default function GuidanceView({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">المستشار المهني</h1>
        <p className="text-slate-500 text-sm mt-1">لا تعرف من أين تبدأ؟ دعنا نكتشف ميولك ونوجهك للمهارات المطلوبة في سوق العمل.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assessment Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <Compass className="w-12 h-12 mb-4 text-indigo-200" />
            <h2 className="text-2xl font-bold mb-2">اكتشف مسارك المهني</h2>
            <p className="text-indigo-100 mb-6 leading-relaxed">
              أجب عن ٥ أسئلة صوتية بسيطة حول ما تحب فعله، وسنقترح لك الوظائف التي تناسب شخصيتك والمطلوبة بقوة في منطقتك.
            </p>
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors inline-block shadow-sm">
              ابدأ الاختبار الصوتي الآن
            </button>
          </div>
          <Compass className="absolute -left-10 -bottom-10 w-64 h-64 text-white opacity-10 pointer-events-none" />
        </div>

        {/* Market Trends */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              المهارات الأكثر طلباً حالياً
            </h3>
          </div>
          <div className="space-y-4">
            <TrendItem title="تركيب وصيانة طاقة شمسية" jobs={124} growth={+15} />
            <TrendItem title="التسويق الإلكتروني وإدارة الحملات" jobs={86} growth={+30} />
            <TrendItem title="إرشاد زراعي حديث" jobs={45} growth={+5} />
            <TrendItem title="برمجة تطبيقات الهاتف" jobs={62} growth={+40} />
          </div>
        </div>
      </div>

      {/* Suggested Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">فرص تدريب ينصح بها لك</h2>
          <button className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:text-primary-700">
            المزيد من الدورات <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCourses.map((course) => (
             <div key={course.id} className="bg-white border text-right border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
               <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                 <BookOpen className="w-7 h-7 text-primary-600" />
               </div>
               <div>
                 <h4 className="font-bold text-lg text-slate-800 mb-1">{course.title}</h4>
                 <p className="text-sm text-slate-500 mb-3">{course.provider} • {course.type}</p>
                 <div className="flex items-center gap-3">
                   <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">المدة: {course.duration}</span>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

function TrendItem({ title, jobs, growth }: { title: string, jobs: number, growth: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        <span className="font-medium text-slate-700">{title}</span>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0 w-full justify-between sm:w-auto">
        <span className="text-sm text-slate-500">{jobs} فرصة متاحة</span>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
          +{growth}% نمو
        </span>
      </div>
    </div>
  )
}
