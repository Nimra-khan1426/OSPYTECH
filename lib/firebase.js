import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAvl6eFQAmjkV-4as8zikbZ0gsV40Z1k5I",
  authDomain: "ospytech.firebaseapp.com",
  projectId: "ospytech",
  storageBucket: "ospytech.firebasestorage.app",
  messagingSenderId: "1087402674461",
  appId: "1:1087402674461:web:776f1b21f9d65811c239f4",
  measurementId: "G-XZ5P8LTJ7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;