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
