ECare - Premium Device Repair
A modern React + TypeScript web application for booking premium repair services for mobile phones, laptops, tablets, and other electronic devices with real-time admin dashboard.
Overview
eCare is a full-featured booking platform that allows customers to schedule repair services for various devices including smartphones, laptops, tablets, and other electronics. With a mobile-first responsive design, it works seamlessly across all devices while featuring an integrated admin dashboard for managing bookings, tracking repairs, and monitoring service requests. Built with React, TypeScript, and Firebase.
Features

📱 Easy-to-use booking system for multi-device repairs (phones, laptops, tablets, etc.)
💻 Fully responsive design - mobile-first, works on all screen sizes
👨‍💼 Real-time admin dashboard for managing bookings
🔐 Firebase authentication and real-time database
📧 Email notifications for bookings
💼 Multiple device categories and service types
🎨 Modern UI with Tailwind CSS
📊 Booking analytics and tracking

Tech Stack

Frontend: React 18, TypeScript, Vite
Styling: Tailwind CSS, PostCSS
Backend: Firebase (Authentication, Firestore, Realtime Database)
Build Tool: Vite
Package Manager: npm

Project Structure
ecare---premium-mobile-repair/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BackButton.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Section.tsx
│   │   ├── views/
│   │   │   ├── AboutView.tsx
│   │   │   ├── AdminView.tsx
│   │   │   ├── CareersView.tsx
│   │   │   ├── LandingView.tsx
│   │   │   └── PrivacyView.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── BookingForm.tsx
│   ├── config/
│   │   └── firebaseConfig.ts
│   ├── services/
│   │   └── bookingService.ts
│   ├── styles/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── public/
│   └── images/
│       ├── devices/
│       └── hero/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
└── README.md
Installation
Prerequisites

Node.js (v16 or higher)
npm or yarn
Firebase account

Setup

Clone the repository:

bashgit clone https://github.com/yourusername/ecare---premium-mobile-repair.git
cd ecare---premium-mobile-repair

Install dependencies:

bashnpm install

Create a .env.local file in the root directory with your Firebase credentials:

envVITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Start the development server:

bashnpm run dev
The app will open at http://localhost:3000 and works across all devices (mobile, tablet, desktop).
Usage
For Customers

Navigate to the landing page
Click "Book Now" to access the booking form
Fill in service details and select preferred date/time
Receive confirmation and tracking updates

For Admins

Access the admin dashboard at /admin
View all bookings in real-time
Update booking status and notes
Track repair progress

Roadmap
Phase 1: MVP (Current)

 Landing page with service info
 Booking form integration
 Admin dashboard
 Firebase integration
 Email notifications
 User authentication/profiles

Phase 2: SEO & Performance

 Meta tags optimization
 Open Graph tags for social sharing
 Sitemap generation
 Robots.txt configuration
 Image optimization & lazy loading
 Mobile performance improvements
 Schema markup for local business

Phase 3: Features

 Payment gateway integration
 Customer tracking dashboard
 SMS notifications
 Service reviews & ratings
 Multi-location support
 Appointment reminders

Environment Variables
Create a .env.local file:
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
Building for Production
bashnpm run build
Output will be in the dist/ folder.
Contributing
Contributions are welcome! Please feel free to submit pull requests for bugs or features.
License
This project is licensed under the MIT License.
Contact

GitHub: https://github.com/Zaheda-Mustafiz
Email: mustafiz1127@gmail.com

Acknowledgments

Built with React + TypeScript
Styled with Tailwind CSS
Backend powered by Firebase