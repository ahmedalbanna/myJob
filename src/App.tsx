import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import DashboardView from './pages/Dashboard';
import JobsView from './pages/Jobs';
import ProfileView from './pages/Profile';
import GuidanceView from './pages/Guidance';
import ProjectsView from './pages/Projects';
import JobDetailsView from './pages/JobDetails';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const viewJobDetails = (id: string) => {
    setSelectedJobId(id);
    setCurrentView('job-details');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView navigateTo={setCurrentView} onViewJob={viewJobDetails} />;
      case 'jobs': return <JobsView onViewJob={viewJobDetails} />;
      case 'job-details': return selectedJobId ? <JobDetailsView jobId={selectedJobId} onBack={() => setCurrentView('jobs')} /> : <DashboardView navigateTo={setCurrentView} onViewJob={viewJobDetails} />;
      case 'profile': return <ProfileView />;
      case 'guidance': return <GuidanceView navigateTo={setCurrentView} />;
      case 'projects': return <ProjectsView />;
      default: return <DashboardView navigateTo={setCurrentView} onViewJob={viewJobDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-primary-200" dir="rtl">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="lg:pr-64 flex flex-col min-h-screen transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
