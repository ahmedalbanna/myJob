import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Application, Job } from '../types';

interface ApplicationContextType {
  applications: Application[];
  applyForJob: (job: Job, attachments?: string[]) => void;
  withdrawApplication: (applicationId: string) => void;
  hasAppliedForJob: (jobId: string) => boolean;
  getWeeklyCount: () => number;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const mockInitialApplications: Application[] = [
  {
    id: 'app1',
    jobId: '2',
    jobTitle: 'سائق توزيع إغاثة',
    entity: 'منظمة الغذاء العالمية',
    appliedAt: '2024-10-25',
    status: 'قيد المراجعة',
  },
  {
    id: 'app2',
    jobId: '4',
    jobTitle: 'مساعد إداري',
    entity: 'وزارة الخدمة المدنية',
    appliedAt: '2024-10-15',
    status: 'تم الترشيح لمقابلة',
    interviewDetails: {
      date: '2024-11-05 الساعة 10:00 صباحاً',
      location: 'مبنى الوزارة، تعز',
      type: 'صوتي/مرئي عبر التطبيق'
    }
  }
];

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>(mockInitialApplications);

  const applyForJob = (job: Job, attachments?: string[]) => {
    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      entity: job.entity,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'تم الإرسال',
      attachments,
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: 'تم السحب' } : app
    ));
  };

  const hasAppliedForJob = (jobId: string) => {
    return applications.some(app => app.jobId === jobId && app.status !== 'تم السحب');
  };

  const getWeeklyCount = () => {
    // Mocking finding count from last 7 days.
    // For prototype simplicity, count all standard recent apps. We will just return 1 for now unless they apply.
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return applications.filter(app => new Date(app.appliedAt) > oneWeekAgo && app.status !== 'تم السحب').length;
  };

  return (
    <ApplicationContext.Provider value={{ applications, applyForJob, withdrawApplication, hasAppliedForJob, getWeeklyCount }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
