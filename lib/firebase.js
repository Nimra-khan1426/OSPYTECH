import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvl6eFQAmjkV-4as8zikbZ0gsV40Z1k5I",
  authDomain: "ospytech.firebaseapp.com",
  projectId: "ospytech",
  storageBucket: "ospytech.firebasestorage.app",
  messagingSenderId: "1087402674461",
  appId: "1:1087402674461:web:776f1b21f9d65811c239f4",
  measurementId: "G-XZ5P8LTJ7W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };

export default app;