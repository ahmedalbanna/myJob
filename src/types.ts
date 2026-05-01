// src/types.ts
export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  skills: string[];
  educationLevel: string;
  audioProfileUrl?: string;
  profileText?: string;
}

export interface Job {
  id: string;
  title: string;
  entity: string;
  entityType: 'ناحية حكومية' | 'قطاع خاص' | 'منظمة';
  location: string;
  salary: string;
  description: string;
  matchScore: number;
  type: string;
  postedAt: string;
  deadline: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  location: string;
  type: 'حضوري' | 'عن بعد';
}

export type ApplicationStatus = 'تم الإرسال' | 'قيد المراجعة' | 'تمت مشاهدة ملفك' | 'تم الترشيح لمقابلة' | 'نعتذر منك' | 'تم السحب';

export interface InterviewDetails {
  date: string;
  location: string;
  type: 'حضوري' | 'صوتي/مرئي عبر التطبيق';
  link?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  entity: string;
  appliedAt: string;
  status: ApplicationStatus;
  interviewDetails?: InterviewDetails;
  attachments?: string[];
}
