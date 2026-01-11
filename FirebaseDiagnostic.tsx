import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function FirebaseDiagnostic() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    const newResults: Record<string, any> = {};

    try {
      // Test 1: Check if Firebase is imported
      newResults.firebaseImport = 'Testing...';
      const { db } = await import('./firebaseConfig');
      newResults.firebaseImport = db ? '✅ Firebase initialized' : '❌ Firebase not initialized';

      // Test 2: Check Firestore connection
      newResults.firestoreConnection = 'Testing...';
      const { collection, addDoc, getDocs } = await import('firebase/firestore');
      
      // Try to create a test document
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'This is a test document from diagnostic'
      };

      const docRef = await addDoc(collection(db, 'test_diagnostic'), testData);
      newResults.firestoreConnection = `✅ Document created! ID: ${docRef.id}`;
      newResults.documentId = docRef.id;

      // Test 3: Try to read it back
      newResults.firestoreRead = 'Testing...';
      const snapshot = await getDocs(collection(db, 'test_diagnostic'));
      newResults.firestoreRead = `✅ Read ${snapshot.size} documents from Firestore`;
      newResults.documentCount = snapshot.size;

      // Test 4: Check environment variables
      const apiKey = (import.meta as any).env.VITE_FIREBASE_API_KEY;
      const projectId = (import.meta as any).env.VITE_FIREBASE_PROJECT_ID;
      const authDomain = (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN;
      
      newResults.envVars = {
        apiKey: apiKey ? '✅ Present' : '❌ Missing',
        projectId: projectId ? '✅ Present' : '❌ Missing',
        authDomain: authDomain ? '✅ Present' : '❌ Missing'
      };

    } catch (error: any) {
      newResults.error = {
        code: error.code,
        message: error.message,
        details: error.toString()
      };
      
      // Detailed error analysis
      if (error.code === 'permission-denied') {
        newResults.solution = '❌ FIRESTORE SECURITY RULES BLOCKING WRITES. Check your Firebase Console → Firestore → Rules. Temporarily set to: allow read, write: if true;';
      } else if (error.code === 'failed-precondition') {
        newResults.solution = '❌ Firestore not enabled. Go to Firebase Console and enable Firestore Database.';
      } else if (error.code === 'unauthenticated') {
        newResults.solution = '❌ Authentication required. Your security rules require authentication.';
      } else {
        newResults.solution = `❌ ${error.message}`;
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">🔍 Firebase Diagnostic Test</h2>
      
      <button
        onClick={runDiagnostics}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" size={20} />
            Running Tests...
          </>
        ) : (
          'Run Diagnostic Tests'
        )}
      </button>

      <div className="mt-8 space-y-4">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="border rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            
            {typeof value === 'string' ? (
              <p className={`text-sm font-mono ${
                value.includes('✅') ? 'text-green-600' : 
                value.includes('❌') ? 'text-red-600' : 
                'text-slate-600'
              }`}>
                {value}
              </p>
            ) : typeof value === 'object' ? (
              <pre className="bg-white p-3 rounded text-xs overflow-auto max-h-64 border border-slate-200">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-slate-600">{String(value)}</p>
            )}
          </div>
        ))}

        {results.solution && (
          <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
            <div className="flex gap-2 items-start">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Solution:</h3>
                <p className="text-sm text-red-800">{results.solution}</p>
              </div>
            </div>
          </div>
        )}

        {results.firestoreConnection && results.firestoreConnection.includes('✅') && !results.error && (
          <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
            <div className="flex gap-2 items-start">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">✅ Success!</h3>
                <p className="text-sm text-green-800">
                  Firebase is working correctly! Your booking form should now save data to Firestore.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-900">
        <p className="font-semibold mb-2">📋 After running tests:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If all tests pass ✅: Your booking form should work</li>
          <li>If you see "permission-denied" ❌: Go to Firebase Console → Firestore → Rules → Change to allow read, write: if true;</li>
          <li>Check Firebase Console → Firestore Database → "test_diagnostic" collection to see created documents</li>
        </ul>
      </div>
    </div>
  );
}