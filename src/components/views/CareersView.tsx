
import React, { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { Button } from '../ui/Button';
import { getJobs, submitApplication } from '../../services/bookingService';
import { JobOpening } from '../../types';
import { X, CheckCircle, Upload } from 'lucide-react';

interface CareersViewProps {
  onBack: () => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onBack }) => {
  const [jobList, setJobList] = useState<JobOpening[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicationForm, setApplicationForm] = useState({ name: '', email: '', phone: '', resumeLink: '' });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSuccess, setAppSuccess] = useState(false);

  // Fetch Jobs when mounting
  useEffect(() => {
    getJobs().then(setJobList);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedJob]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedJob(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    setIsSubmittingApp(true);
    try {
      await submitApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        applicantName: applicationForm.name,
        email: applicationForm.email,
        phone: applicationForm.phone,
        resumeLink: applicationForm.resumeLink
      });
      setAppSuccess(true);
    } catch (error) {
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmittingApp(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BackButton onClick={onBack} className="top-24 lg:top-8" />
      
      {/* Careers Hero */}
      <div className="relative h-[40vh] min-h-[350px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000" alt="Team working" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-4">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Ecare Team</h1>
           <p className="text-xl text-slate-300 font-light">Help us revolutionize the mobile repair industry.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Current Openings</h2>
            <p className="text-slate-600">We are always looking for talented technicians and support staff.</p>
         </div>

         <div className="grid gap-6">
            {jobList.length === 0 ? (
               <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-500">No open positions at the moment. Check back later!</p>
               </div>
            ) : (
              jobList.map(job => (
                <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-all duration-300">
                   <div className="mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-600 mb-4">
                         <span className="bg-slate-100 px-3 py-1 rounded-full">{job.department}</span>
                         <span className="bg-slate-100 px-3 py-1 rounded-full">{job.type}</span>
                         <span className="bg-slate-100 px-3 py-1 rounded-full">{job.location}</span>
                      </div>
                      <p className="text-slate-500 max-w-2xl leading-relaxed">{job.description}</p>
                   </div>
                   <Button onClick={() => { setSelectedJob(job); setAppSuccess(false); setApplicationForm({name:'',email:'',phone:'',resumeLink:''}); }}>
                      Apply Now
                   </Button>
                </div>
              ))
            )}
         </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4" role="dialog">
           <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedJob(null)}></div>
           <div className="relative bg-white w-full sm:max-w-lg rounded-2xl shadow-2xl overflow-hidden m-4">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-lg text-slate-900">Apply for {selectedJob.title}</h3>
                 <button onClick={() => setSelectedJob(null)}><X className="text-slate-400 hover:text-slate-600" /></button>
              </div>
              
              <div className="p-6">
                 {appSuccess ? (
                   <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                         <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Application Sent!</h4>
                      <p className="text-slate-500 mb-6">Thanks for applying. We will review your profile and get back to you.</p>
                      <Button onClick={() => setSelectedJob(null)} variant="outline">Close</Button>
                   </div>
                 ) : (
                   <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                         <input 
                            required type="text" placeholder="John Doe"
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            value={applicationForm.name} onChange={e => setApplicationForm({...applicationForm, name: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                         <input 
                            required type="email" placeholder="john@example.com"
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            value={applicationForm.email} onChange={e => setApplicationForm({...applicationForm, email: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                         <input 
                            required type="tel" placeholder="1234567890"
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            value={applicationForm.phone} onChange={e => setApplicationForm({...applicationForm, phone: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Resume Link (LinkedIn / Drive)</label>
                         <div className="relative">
                            <Upload className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                            <input 
                               required type="url" placeholder="https://linkedin.com/in/johndoe"
                               className="w-full pl-10 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
                               value={applicationForm.resumeLink} onChange={e => setApplicationForm({...applicationForm, resumeLink: e.target.value})}
                            />
                         </div>
                         <p className="text-xs text-slate-400 mt-1">Please provide a URL to your resume or profile.</p>
                      </div>
                      <Button type="submit" className="w-full mt-2" isLoading={isSubmittingApp}>Submit Application</Button>
                   </form>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
