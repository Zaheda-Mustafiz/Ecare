import React, { useState } from 'react';
import { View } from './src/types';
import { LandingView } from './src/components/views/LandingView';
import { AboutView } from './src/components/views/AboutView';
import { PrivacyView } from './src/components/views/PrivacyView';
import { CareersView } from './src/components/views/CareersView';
import { AdminView } from './src/components/views/AdminView';
<div className="bg-green-600 text-white p-10 text-2xl">
  Tailwind ACTIVE
</div>

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  // Navigation handler
  const navigate = (view: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingView onNavigate={navigate} />
      )}
      
      {currentView === 'about' && (
        <AboutView onBack={() => navigate('landing')} />
      )}

      {currentView === 'privacy' && (
        <PrivacyView onBack={() => navigate('landing')} />
      )}

      {currentView === 'careers' && (
        <CareersView onBack={() => navigate('landing')} />
      )}

      {currentView === 'admin' && (
        <AdminView onBack={() => navigate('landing')} />
      )}
    </>
  );
}