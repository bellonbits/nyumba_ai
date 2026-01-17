
import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ChatPreview } from './pages/ChatPreview';

type Page = 'landing' | 'admin' | 'chat';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans text-slate-900 bg-white">
      {currentPage === 'landing' && (
        <LandingPage onAdminClick={() => navigateTo('admin')} />
      )}
      {currentPage === 'admin' && (
        <AdminDashboard 
          onLogout={() => navigateTo('landing')} 
          onChatClick={() => navigateTo('chat')}
        />
      )}
      {currentPage === 'chat' && (
        <ChatPreview onBack={() => navigateTo('admin')} />
      )}
    </div>
  );
};

export default App;
