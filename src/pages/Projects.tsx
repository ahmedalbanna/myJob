import React from 'react';
import { Lightbulb, Rocket, HandCoins, Building2, Store } from 'lucide-react';

export default function ProjectsView() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center pt-8 pb-4">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lightbulb className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">بوابة المشاريع الصغيرة والعمل الحر</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          الوظيفة ليست الخيار الوحيد. إذا كانت لديك فكرة أو مهارة، يمكننا توجيهك للموارد، التمويل، والإرشاد لتبدأ مشروعك الخاص.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Startup Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-amber-300 hover:shadow-xl transition-all group cursor-pointer text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">أريد فتح مشروع صغير</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            سجل فكرتك أو مشروعك المقترح بصوتك. سنقوم بمراجعتها وربطك بجهات التمويل الأصغر وتوفير دراسات جدوى مبسطة.
          </p>
          <button className="bg-slate-900 text-white w-full py-3 rounded-xl font-medium group-hover:bg-blue-600 transition-colors">
            سجل فكرتك الآن
          </button>
        </div>

        {/* Freelance Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-primary-300 hover:shadow-xl transition-all group cursor-pointer text-center">
          <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">العمل الحر الدائم (صنايعي/مستقل)</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            العمل الحر الدائم يوفر لك دخلاً متنامياً. انضم إلى منصات الشركاء لتقديم خدماتك مباشرة للزبائن (صيانة، برمجة، تصميم).
          </p>
          <button className="bg-slate-900 text-white w-full py-3 rounded-xl font-medium group-hover:bg-primary-600 transition-colors">
            استكشف منصات العمل الحر
          </button>
        </div>
        
      </div>

      {/* Partners Section */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mt-12">
        <h3 className="font-bold text-slate-800 text-center mb-8 text-lg">الجهات الداعمة والتمويلية الشريكة</h3>
        <div className="flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Mock Logos */}
           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 font-bold text-slate-600">
             <Building2 className="w-5 h-5 text-indigo-600" />
             بنك الأمل للتمويل الأصغر
           </div>
           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 font-bold text-slate-600">
             <HandCoins className="w-5 h-5 text-emerald-600" />
             صندوق تمويل الصناعات الصغيرة
           </div>
           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 font-bold text-slate-600">
             <Rocket className="w-5 h-5 text-blue-600" />
             مؤسسة تنمية القيادات الشابة
           </div>
        </div>
      </div>
    </div>
  );
}
