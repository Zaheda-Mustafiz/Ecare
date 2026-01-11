import React, { useState } from 'react';
import { createBooking } from '../services/bookingService';
import { ServiceType, Booking } from '../types';
import { Button } from './ui/Button';
import { CheckCircle, AlertCircle, MessageCircle, Phone } from 'lucide-react';

interface BookingFormProps {
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    serviceType: ServiceType.SCREEN_REPLACEMENT,
    preferredDate: '',
    preferredTime: '',
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<Booking | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    
    if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.preferredDate) newErrors.preferredDate = 'Date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Time is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required for home service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    console.log('📝 Form submit started');
    console.log('Form data:', formData);
    
    if (!validate()) {
      console.log('❌ Validation failed');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('🔄 Calling createBooking...');
      const result = await createBooking(formData);
      console.log('✅ Booking created:', result);
      setSuccessData(result);
    } catch (error: any) {
      console.error('❌ Booking error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Full error:', error);
      setSubmitError("Failed to connect to server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-2xl mx-auto border border-brand-100 ${className}`}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
        <p className="text-slate-600 mb-8">
          Thank you, {successData.customerName}. Your repair request has been received.
        </p>
        
        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500 font-medium">Order ID</span>
            <span className="text-lg font-mono font-bold text-brand-600">{successData.orderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 font-medium">Service</span>
            <span className="text-slate-900 font-medium">{successData.serviceType}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">We will contact you shortly at <strong>{successData.phoneNumber}</strong> to confirm the technician's arrival.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href={`https://wa.me/1234567890?text=Hi, I just booked order ${successData.orderId}.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
          <a 
            href="tel:+1234567890"
            className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
          >
            <Phone size={20} />
            Call Support
          </a>
        </div>
        
        <button 
          onClick={() => { setSuccessData(null); setFormData({ customerName: '', phoneNumber: '', email: '', serviceType: ServiceType.SCREEN_REPLACEMENT, preferredDate: '', preferredTime: '', address: '', notes: '' }); }}
          className="mt-6 text-slate-500 text-sm underline hover:text-slate-800"
        >
          Book another service
        </button>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-base";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-2xl shadow-brand-900/10 p-6 md:p-10 border border-slate-100 ${className}`}>
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Book a Repair</h3>
      
      <div className="space-y-5">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Full Name</label>
            <input 
              type="text" name="customerName" value={formData.customerName} onChange={handleChange} 
              className={`${inputClasses} ${errors.customerName ? 'border-red-300 bg-red-50' : ''}`}
              placeholder="John Doe"
              autoComplete="name"
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
          </div>
          <div>
            <label className={labelClasses}>Phone Number</label>
            <input 
              type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} 
              className={`${inputClasses} ${errors.phoneNumber ? 'border-red-300 bg-red-50' : ''}`}
              placeholder="98765 43210"
              inputMode="numeric"
              autoComplete="tel"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        <div>
          <label className={labelClasses}>Email Address</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange} 
            className={`${inputClasses} ${errors.email ? 'border-red-300 bg-red-50' : ''}`}
            placeholder="john@example.com"
            inputMode="email"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Service Details */}
        <div>
          <label className={labelClasses}>Service Needed</label>
          <select name="serviceType" value={formData.serviceType} onChange={handleChange} className={inputClasses}>
            {Object.values(ServiceType).map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Preferred Date</label>
            <input 
              type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} 
              className={`${inputClasses} ${errors.preferredDate ? 'border-red-300 bg-red-50' : ''}`}
            />
            {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
          </div>
          <div>
            <label className={labelClasses}>Preferred Time</label>
            <input 
              type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} 
              className={`${inputClasses} ${errors.preferredTime ? 'border-red-300 bg-red-50' : ''}`}
            />
            {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
          </div>
        </div>

        <div>
          <label className={labelClasses}>Address (for Home Service)</label>
          <textarea 
            name="address" value={formData.address} onChange={handleChange} rows={3}
            className={`${inputClasses} resize-none ${errors.address ? 'border-red-300 bg-red-50' : ''}`}
            placeholder="Flat No, Street Name, City..."
            autoComplete="street-address"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className={labelClasses}>Additional Notes (Optional)</label>
          <textarea 
            name="notes" value={formData.notes} onChange={handleChange} rows={2}
            className={`${inputClasses} resize-none`}
            placeholder="Device model, color, specific issue details..."
          />
        </div>
        
        {submitError && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            {submitError}
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" variant="primary" size="lg" className="w-full shadow-brand-500/40" isLoading={isSubmitting}>
            Confirm Booking
          </Button>
          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
            <AlertCircle size={14} />
            Payment is collected after service completion.
          </p>
        </div>
      </div>
    </form>
  );
};