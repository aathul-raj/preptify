import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "preptify-7467a.firebaseapp.com",
  projectId: "preptify-7467a",
  storageBucket: "preptify-7467a.appspot.com",
  messagingSenderId: "1020172948335",
  appId: "1:1020172948335:web:9af58a097d45c0edb40e9a",
  measurementId: "G-0F5C99EEPZ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };