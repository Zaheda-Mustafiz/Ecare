import React, { useState } from 'react';
import { View } from './types';
import { LandingView } from './components/views/LandingView';
import { AboutView } from './components/views/AboutView';
import { PrivacyView } from './components/views/PrivacyView';
import { CareersView } from './components/views/CareersView';
import { AdminView } from './components/views/AdminView';

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