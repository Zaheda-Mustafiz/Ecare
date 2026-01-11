
import React, { useEffect, useState } from 'react';
import { Booking, BookingStatus, JobOpening, JobApplication } from '../types';
import { subscribeToBookings, updateBookingStatus, getJobs, createJob, deleteJob, getApplications } from '../services/bookingService';
import { MessageCircle, Phone, CheckCircle, Search, Filter, LogOut, Clock, MapPin, Briefcase, Plus, Trash2, FileText } from 'lucide-react';
import { Button } from './ui/Button';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'careers'>('bookings');

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Careers State
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '' });

  useEffect(() => {
    // Realtime subscription to Firestore
    const unsubscribe = subscribeToBookings((data) => {
      setBookings(data);
    });

    // Initial fetch for careers
    refreshCareersData();

    return () => unsubscribe();
  }, []);

  const refreshCareersData = async () => {
    const j = await getJobs();
    const a = await getApplications();
    setJobs(j);
    setApplications(a.sort((x, y) => y.appliedAt - x.appliedAt));
  };

  // --- BOOKING HANDLERS ---
  const handleWhatsApp = (booking: Booking) => {
    const message = `Hello ${booking.customerName}, this is regarding your Ecare order ${booking.orderId} for ${booking.serviceType}.`;
    window.open(`https://wa.me/${booking.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleComplete = async (id: string) => {
    if (confirm('Mark this order as completed?')) {
      await updateBookingStatus(id, BookingStatus.COMPLETED);
    }
  };

  // --- CAREER HANDLERS ---
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob(newJob as any);
    setIsPostingJob(false);
    setNewJob({ title: '', department: '', location: '', type: 'Full-time', description: '' });
    refreshCareersData();
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to remove this job posting?')) {
      await deleteJob(id);
      refreshCareersData();
    }
  };

  // --- RENDER HELPERS ---
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phoneNumber.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CONFIRMED: return 'bg-blue-100 text-blue-800';
      case BookingStatus.COMPLETED: return 'bg-green-100 text-green-800';
      case BookingStatus.CANCELLED: return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold text-slate-900">Ecare Admin</h1>
            </div>
            
            {/* Tab Switcher */}
            <div className="hidden md:flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'bookings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Bookings
              </button>
              <button 
                onClick={() => setActiveTab('careers')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'careers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Careers
              </button>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        
        {/* Mobile Tab Switcher */}
        <div className="md:hidden px-4 py-2 border-t border-slate-100 flex gap-2">
           <button 
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'bookings' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500'}`}
            >
              Bookings
            </button>
            <button 
              onClick={() => setActiveTab('careers')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'careers' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500'}`}
            >
              Careers
            </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'bookings' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === BookingStatus.PENDING).length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === BookingStatus.COMPLETED).length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500">Revenue (Est)</p>
                <p className="text-2xl font-bold text-brand-600">${bookings.filter(b => b.status === BookingStatus.COMPLETED).length * 50}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm w-full md:w-96">
                <Search className="text-slate-400 w-5 h-5 ml-2" />
                <input 
                  type="text" 
                  placeholder="Search by name, ID, phone..." 
                  className="bg-transparent outline-none w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <Filter className="text-slate-400 w-4 h-4" />
                {['All', 'Pending', 'Completed', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      filterStatus === status 
                        ? 'bg-brand-600 text-white' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-500">No bookings found matching criteria.</p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                          <span className="font-mono font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded text-xs">
                            {booking.orderId}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900">{booking.customerName}</h3>
                        <p className="text-slate-500 text-sm mb-3">{booking.serviceType}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {booking.preferredDate} at {booking.preferredTime}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="truncate max-w-[200px]">{booking.address}</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <p className="mt-3 text-sm text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="font-semibold text-slate-700">Note:</span> {booking.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 justify-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[160px]">
                        <button 
                          onClick={() => handleWhatsApp(booking)}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </button>
                        <button 
                          onClick={() => handleCall(booking.phoneNumber)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </button>
                        {booking.status !== BookingStatus.COMPLETED && (
                          <button 
                            onClick={() => handleComplete(booking.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* --- CAREERS TAB --- */
          <div className="space-y-12">
            {/* Post Job Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="text-brand-600" />
                  Active Job Postings
                </h2>
                <Button size="sm" onClick={() => setIsPostingJob(!isPostingJob)}>
                  {isPostingJob ? 'Cancel' : 'Post New Job'}
                </Button>
              </div>

              {isPostingJob && (
                <form onSubmit={handleCreateJob} className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">New Job Details</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input 
                      required placeholder="Job Title (e.g. Senior Technician)"
                      className="p-3 rounded-lg border border-slate-300 w-full"
                      value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})}
                    />
                    <input 
                      required placeholder="Department (e.g. Technical)"
                      className="p-3 rounded-lg border border-slate-300 w-full"
                      value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})}
                    />
                    <input 
                      required placeholder="Location (e.g. New York / Remote)"
                      className="p-3 rounded-lg border border-slate-300 w-full"
                      value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})}
                    />
                    <select 
                      className="p-3 rounded-lg border border-slate-300 w-full"
                      value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <textarea 
                    required placeholder="Job Description..."
                    className="p-3 rounded-lg border border-slate-300 w-full mb-4 h-32"
                    value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Publish Job</Button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {jobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900">{job.title}</h4>
                      <div className="text-sm text-slate-500 flex gap-2">
                        <span>{job.department}</span> &bull; <span>{job.type}</span> &bull; <span>{job.location}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Job"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {jobs.length === 0 && <p className="text-slate-500 text-center py-4">No active jobs.</p>}
              </div>
            </section>

            {/* Applications Section */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-brand-600" />
                Recent Applications
              </h2>
              <div className="grid gap-4">
                {applications.length === 0 ? (
                  <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
                    <p className="text-slate-500">No applications received yet.</p>
                  </div>
                ) : (
                  applications.map(app => (
                    <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900">{app.applicantName}</h4>
                          <p className="text-brand-600 font-medium text-sm mb-2">Applied for: {app.jobTitle}</p>
                          <div className="flex gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><MessageCircle size={14}/> {app.email}</span>
                            <span className="flex items-center gap-1"><Phone size={14}/> {app.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {app.resumeLink && (
                            <a 
                              href={app.resumeLink} target="_blank" rel="noreferrer"
                              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                            >
                              View Resume
                            </a>
                          )}
                          <button 
                             onClick={() => handleCall(app.phone)}
                             className="p-2 bg-brand-50 text-brand-600 rounded-lg hover:bg-brand-100"
                          >
                            <Phone size={18}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
