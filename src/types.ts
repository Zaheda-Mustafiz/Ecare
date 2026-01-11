
export enum ServiceType {
  SCREEN_REPLACEMENT = "Screen Replacement",
  BATTERY_CHANGE = "Battery Change",
  WATER_DAMAGE = "Water Damage Repair",
  CHARGING_PORT = "Charging Port Repair",
  SOFTWARE_ISSUE = "Software & Unlocking",
  CAMERA_REPAIR = "Camera Lens Repair",
  OTHER = "Other Diagnosis"
}

export enum BookingStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled"
}

export interface Booking {
  id: string;
  orderId: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  serviceType: ServiceType;
  preferredDate: string; // ISO string or simple date string
  preferredTime: string;
  address: string;
  notes?: string;
  status: BookingStatus;
  createdAt: number;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  device: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string; // e.g., Technical, Support, Sales
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  postedAt: number;
  isActive: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeLink: string; // Simulating a file URL
  appliedAt: number;
}

export type View = 'landing' | 'admin' | 'about' | 'privacy' | 'careers';
