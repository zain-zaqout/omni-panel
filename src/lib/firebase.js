import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN1x4-JCHKmmk1LzLWiueBlmWQ4BgXNg4",
  authDomain: "omni-panel-2-1.firebaseapp.com",
  projectId: "omni-panel-2-1",
  storageBucket: "omni-panel-2-1.firebasestorage.app",
  messagingSenderId: "796438216857",
  appId: "1:796438216857:web:5da8df1f5557d261857808",
  measurementId: "G-2ZDBJRJSWD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);