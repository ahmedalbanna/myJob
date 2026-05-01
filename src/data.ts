import { Job, Course } from './types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'فني طاقة شمسية',
    entity: 'شركة النور للطاقة',
    entityType: 'قطاع خاص',
    location: 'صنعاء',
    salary: '١٥٠,٠٠٠ ريال / شهر',
    description: 'مطلوب فني تركيب وصيانة منظومات طاقة شمسية للمنازل والمزارع، خبرة لا تقل عن سنة.',
    matchScore: 95,
    type: 'دوام كامل',
    postedAt: 'منذ يومين',
    deadline: '٢٠٢٤-١٢-٠١'
  },
  {
    id: '2',
    title: 'سائق توزيع إغاثة',
    entity: 'منظمة الغذاء العالمية',
    entityType: 'منظمة',
    location: 'الحديدة',
    salary: '٣٠٠ دولار / شهر',
    description: 'مطلوب سائق نقل ثقيل لتوزيع المساعدات في مديريات الحديدة.',
    matchScore: 85,
    type: 'عقد مؤقت',
    postedAt: 'منذ ٥ ساعات',
    deadline: '٢٠٢٤-١١-٢٠'
  },
  {
    id: '3',
    title: 'عامل زراعي',
    entity: 'مشروع التشجير الوطني',
    entityType: 'ناحية حكومية',
    location: 'مأرب',
    salary: 'يومي',
    description: 'مشروع تشجير، مطلوب عمال يومية لمدة ٣ أشهر.',
    matchScore: 60,
    type: 'مياومة',
    postedAt: 'منذ أسبوع',
    deadline: '٢٠٢٤-١١-١٥'
  },
  {
    id: '4',
    title: 'مساعد إداري',
    entity: 'وزارة الخدمة المدنية',
    entityType: 'ناحية حكومية',
    location: 'تعز',
    salary: 'حسب اللائحة',
    description: 'مطلوب مساعد إداري يتقن استخدام الحاسب الآلي وبرامج الأوفيس.',
    matchScore: 40,
    type: 'دوام كامل',
    postedAt: 'منذ ٣ أيام',
    deadline: '٢٠٢٤-١٢-١٠'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'صيانة مضخات المياه الشمسية',
    provider: 'معهد التدريب المهني',
    duration: 'شهر واحد',
    location: 'صنعاء',
    type: 'حضوري'
  },
  {
    id: '2',
    title: 'أساسيات التجارة الإلكترونية',
    provider: 'منصة يمن كودر',
    duration: 'أسبوعين',
    location: 'الإنترنت',
    type: 'عن بعد'
  }
];

export const currentUser = {
  id: 'u1',
  name: 'خالد علي',
  phone: '77XXXXXXX',
  location: 'تعز',
  skills: ['قيادة سيارة', 'أساسيات كهرباء'],
  educationLevel: 'ثانوية عامة',
  profileText: 'أنا خالد علي، خريج ثانوية، عمري 22 سنة، من تعز. أجيد قيادة السيارة، وأعرف أساسيات الكهرباء. أبحث عن أي فرصة تدريب أو عمل، أفضل شيء في تعز أو قريب منها.'
};
