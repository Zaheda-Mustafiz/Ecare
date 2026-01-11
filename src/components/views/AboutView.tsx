
import React from 'react';
import { BackButton } from '../ui/BackButton';
import { Users, Zap, Lock, CheckCircle } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      <BackButton onClick={onBack} className="top-24 lg:top-8" />
      
      {/* About Hero */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=2070" 
          alt="Electronics workshop" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Ecare</h1>
            <p className="text-xl text-slate-200 font-light">Restoring connections, one device at a time.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded in 2018, Ecare began with a simple mission: to provide transparent, high-quality mobile repair services in a market flooded with unreliability. We noticed that customers often had to choose between expensive official centers or risky local shops.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, we've grown into a team of certified experts who treat every device as if it were their own. We use only top-grade parts and offer doorstep convenience because we value your time as much as your trust.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/20">
             <img 
              src="https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=1000" 
              alt="Technician repairing phone" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-24">
           <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Why We Are Different</h2>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-4">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Expert Team</h3>
                <p className="text-slate-500 text-sm">Our technicians undergo rigorous training and background checks.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Genuine Parts</h3>
                <p className="text-slate-500 text-sm">We never compromise on quality. We use OEM or equivalent grade parts.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lock size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Data Privacy</h3>
                <p className="text-slate-500 text-sm">Your data stays yours. We follow strict protocols to ensure data safety.</p>
              </div>
           </div>
        </div>

         {/* Quality Promise */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/20 md:order-2">
             <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" 
              alt="Electronic components" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Quality Promise</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We stand behind our work. That's why every repair comes with a warranty on parts and labor. If something isn't right, we'll make it right.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={20} className="text-green-500" />
                <span>6-Month Warranty on Screens</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={20} className="text-green-500" />
                <span>3-Month Warranty on Batteries</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle size={20} className="text-green-500" />
                <span>No Fix, No Fee Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
