# ECare – Premium Device Repair

A modern **React + TypeScript** web application for booking premium repair services for mobile phones, laptops, tablets, and other electronic devices.

This project follows an **MVP-first approach**, focusing on core booking functionality and user experience, with admin security, payments, SEO, and advanced features planned for future phases.

---

## 🚀 Overview

ECare is a customer-facing booking platform that allows users to schedule repair services for various electronic devices such as smartphones, laptops, and tablets.

The application is built with a **mobile-first responsive design** and includes an **admin access flow and dashboard UI** for managing bookings and career postings.  
Currently, admin authentication is client-side only and intended for demonstration purposes.

Built using **React, TypeScript, Vite, Tailwind CSS, and Firebase**.

---

## ✅ Current Features (Implemented & Working)

- 📱 Customer-facing booking system for device repair services  
- 🗂️ Multiple device categories (mobile, laptop, tablet, etc.)  
- 📅 Preferred service date & time selection  
- 📨 Real-time email confirmation on successful booking  
- 🆔 Auto-generated unique order ID  
- 🎨 Mobile-first, fully responsive UI  
- 🔐 Firebase Authentication (customers)  
- ☁️ Firebase integration (Firestore / Realtime Database)  

---

## 🚧 Admin Functionality (Current State)

### 🔐 Admin Access (Client-Side Only)

- Admin access button and login screen are available  
- Admin authentication uses a **client-side access code** (no backend security yet)  
- Admin dashboard UI is accessible after login  
- Booking management UI includes:
  - Search & filtering
  - Booking status updates
  - WhatsApp & Call actions
- Careers management UI (job postings & applications)

⚠️ **Important Note:**  
Admin authentication is currently **client-side only** and **not secured by backend authorization**.  
This implementation is meant for **UI flow and feature demonstration purposes**.  
Secure admin authentication, role-based access control, and backend protection will be implemented in future updates.

---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite

### Styling
- Tailwind CSS
- PostCSS

### Backend / Services
- Firebase Authentication
- Firebase Firestore
- Firebase Realtime Database

### Tooling
- npm
- Vite build system

---

## 📁 Project Structure

```bash
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
```
⚙️ **Installation & Setup**
**Prerequisites**

Node.js (v16 or higher)

npm

Firebase account

**Clone the Repository**
git clone https://github.com/Zaheda-Mustafiz/ecare---premium-mobile-repair.git
cd ecare---premium-mobile-repair

Install Dependencies
npm install

**Environment Variables**
```bash
Create a .env.local file in the root directory:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
**Start the Development Server**
npm run dev
The app will open at:
👉 http://localhost:5173

🧑‍💻 **Usage**
**For Customers**

Visit the landing page

Click Book Now to open the booking form

Select device type, service, date, and time

Receive email confirmation with order ID

**For Admins (Demo Only)**

Access admin page via /admin

Enter admin access code

View and manage bookings via dashboard UI

🗺️ **Roadmap**
Phase 1: MVP (Current)

🌐 Landing page with service information

📱 Customer-facing booking form

🗂️ Multiple device categories & service types

📨 Real-time email confirmation

🆔 Auto-generated unique order ID

🎨 Mobile-first responsive UI

🔐 Firebase authentication (customers)

☁️ Firebase integration (Firestore / Realtime Database)

Phase 2: **Admin & Payments (Planned)**

🔐 Secure admin authentication & backend integration

🔄 Booking status updates (admin → customer)

💳 Payment gateway integration

📊 Booking analytics and reporting

Phase 3: **SEO, Performance & Growth (Planned)**

🔍 SEO optimization (meta tags, Open Graph, sitemap)

🗺️ Robots.txt & sitemap generation

🖼️ Image optimization & lazy loading

⚡ Performance improvements (Core Web Vitals)

🧾 Schema markup for local business

⭐ Customer reviews & ratings

🔔 SMS / WhatsApp notifications

📍 Multi-location service support

This roadmap follows an MVP-first approach, prioritizing core booking functionality before expanding into admin tooling, payments, SEO, and growth features.

🧪 **Build for Production**
npm run build


Output will be generated in the dist/ folder.

🤝 **Contributing**

Contributions are welcome!
Please feel free to submit pull requests for bug fixes or feature enhancements.

📄 **License**

This project is licensed under the MIT License.

📬 **Contact**

GitHub: https://github.com/Zaheda-Mustafiz

Email: mustafiz1127@gmail.com

🙏 **Acknowledgments**

Built with React & TypeScript

Styled with Tailwind CSS

Backend powered by Firebase
