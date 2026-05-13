import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKz6OBCm_iHqdzFobhyT6KdFHV7nyYGdI",
  authDomain: "omni-panel-dashboard.firebaseapp.com",
  projectId: "omni-panel-dashboard",
  storageBucket: "omni-panel-dashboard.firebasestorage.app",
  messagingSenderId: "1007200075768",
  appId: "1:1007200075768:web:33fb568152a0615a6aa00d",
  measurementId: "G-NZ81YCGE01"
};

const app = initializeApp(firebaseConfig);

// 2. تعريف محرك قاعدة البيانات
export const db = getFirestore(app);

// 3. تعريف محرك الهوية (هاد اللي بيصنع الـ UID وبيحفظ الجلسة في المتصفح)
export const auth = getAuth(app);