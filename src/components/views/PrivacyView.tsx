
import React from 'react';
import { BackButton } from '../ui/BackButton';

interface PrivacyViewProps {
  onBack: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      <BackButton onClick={onBack} className="top-24 lg:top-8" />
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate">
          <p className="text-slate-600 mb-4">Last updated: October 2023</p>
          <p className="text-slate-600 mb-4">At Ecare, we take your privacy seriously. This policy describes how we collect and use your data.</p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Information We Collect</h3>
          <p className="text-slate-600 mb-4">We collect information you provide directly to us, such as when you book a repair, including your name, phone number, email address, and home address.</p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">How We Use Information</h3>
          <p className="text-slate-600 mb-4">We use your information to provide, maintain, and improve our services, specifically to contact you regarding your repair appointments.</p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Data Security</h3>
          <p className="text-slate-600 mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.</p>
        </div>
      </div>
    </div>
  );
};
