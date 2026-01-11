import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/// <reference types="vite/client" />

// Get environment variables (Vite automatically injects them)
// In Vite, process.env.VITE_* variables are available directly
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Log for debugging (remove later)
console.log('🔥 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  apiKeyLength: firebaseConfig.apiKey?.length || 0
});

// Check if config is valid
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase config incomplete! Check your .env file');
  console.error('Expected env variables:', {
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? '✓ set' : '✗ missing',
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✓ set' : '✗ missing',
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓ set' : '✗ missing',
    VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✓ set' : '✗ missing',
    VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✓ set' : '✗ missing',
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID ? '✓ set' : '✗ missing'
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);