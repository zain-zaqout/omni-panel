"use client";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const Context = createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubsctibe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          setCurrentUser({ ...user, ...userData });
        } else {
          setCurrentUser(null);
        }
      }
    });
    setIsAuthReady(true);
    return () => unsubsctibe();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          currentUser,
          setCurrentUser,
          setIsAuthReady,
          isAuthReady
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
export const useAuth = () => useContext(Context);
