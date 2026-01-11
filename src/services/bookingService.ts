import { db } from '../config/firebaseConfig';

import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  getDocs, 
  deleteDoc 
} from 'firebase/firestore';
import { Booking, BookingStatus, JobOpening, JobApplication } from '../types';
import { config } from 'process';
import firebase from 'firebase/compat/app';

// EmailJS is loaded via CDN in index.html
declare global {
  interface Window {
    emailjs: any;
  }
}

const BOOKINGS_COLLECTION = 'bookings';
const JOBS_COLLECTION = 'jobs';
const APPS_COLLECTION = 'applications';

// Get EmailJS config from environment
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Helper: Generate Order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(100 + Math.random() * 900);
  return `BK-${timestamp}-${random}`;
};

// --- BOOKINGS ---

export const createBooking = async (data: Omit<Booking, 'id' | 'orderId' | 'status' | 'createdAt'>): Promise<Booking> => {
  console.log('📝 createBooking called with:', data);
  
  try {
    const orderId = generateOrderId();
    const timestamp = Date.now();

    const bookingData = {
      ...data,
      orderId,
      status: BookingStatus.PENDING,
      createdAt: timestamp
    };

    console.log('📤 Writing to Firestore:', bookingData);

    // 1. Save to Firestore
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), bookingData);
    
    console.log('✅ Booking saved! Document ID:', docRef.id);

    const savedBooking: Booking = { 
      id: docRef.id, 
      ...bookingData 
    };

    // 2. Send Email via EmailJS (fire and forget)
    if (window.emailjs) {
      const templateParams = {
        order_id: orderId,
        customer_name: data.customerName,
        service_type: data.serviceType,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        phone_number: data.phoneNumber,
        address: data.address,
        email: data.email,
        reply_to: data.email
      };

      // Only attempt to send if keys are present
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        window.emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ).then(
          (response: any) => console.log('📧 Email sent!', response.status),
          (err: any) => console.log('⚠️ Email failed (booking still saved):', err)
        );
      } else {
        console.warn('⚠️ EmailJS credentials missing in .env');
      }
    } else {
      console.warn('⚠️ EmailJS SDK not loaded in index.html');
    }

    return savedBooking;

  } catch (error: any) {
    console.error('❌ Error creating booking:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};

export const subscribeToBookings = (callback: (bookings: Booking[]) => void): () => void => {
  const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as Booking);
    });
    callback(bookings);
  }, (error) => {
    console.error('Error listening to bookings:', error);
  });

  return unsubscribe;
};

export const updateBookingStatus = async (id: string, status: BookingStatus): Promise<void> => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(bookingRef, { status });
    console.log('✅ Booking status updated:', status);
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

// --- CAREERS ---

export const getJobs = async (): Promise<JobOpening[]> => {
  try {
    const q = query(collection(db, JOBS_COLLECTION), orderBy('postedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobOpening));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const createJob = async (job: Omit<JobOpening, 'id' | 'postedAt' | 'isActive'>): Promise<JobOpening> => {
  try {
    const jobData = {
      ...job,
      postedAt: Date.now(),
      isActive: true
    };
    const docRef = await addDoc(collection(db, JOBS_COLLECTION), jobData);
    console.log('✅ Job created:', docRef.id);
    return { id: docRef.id, ...jobData };
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const deleteJob = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, JOBS_COLLECTION, id));
    console.log('✅ Job deleted:', id);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const submitApplication = async (app: Omit<JobApplication, 'id' | 'appliedAt'>): Promise<void> => {
  try {
    const appData = {
      ...app,
      appliedAt: Date.now()
    };
    await addDoc(collection(db, APPS_COLLECTION), appData);
    console.log('✅ Application submitted');
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getApplications = async (): Promise<JobApplication[]> => {
  try {
    const q = query(collection(db, APPS_COLLECTION), orderBy('appliedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobApplication));
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};