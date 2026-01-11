
import React, { useState } from 'react';
import { BackButton } from '../ui/BackButton';
import { AdminDashboard } from '../AdminDashboard';
import { Button } from '../ui/Button';
import { Lock } from 'lucide-react';

interface AdminViewProps {
  onBack: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onBack }) => {
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'ecareadmin123') {
      setIsAdminAuthenticated(true);
      setAdminPass('');
    } else {
      alert('Invalid Access Code');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <BackButton onClick={onBack} className="top-4 left-4" />
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-600 p-3 rounded-xl">
              <Lock className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">Admin Access</h2>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Access Code</label>
              <input 
                type="password" 
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="Enter passphrase"
              />
            </div>
            <Button type="submit" className="w-full">Unlock Dashboard</Button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <BackButton onClick={onBack} className="top-4 left-4" />
      <AdminDashboard onLogout={() => setIsAdminAuthenticated(false)} />
    </div>
  );
};
