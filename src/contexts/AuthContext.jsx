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
import { FullPageLoader } from "@/components/FullPageLoader";
import { deleteCookie, setCookie } from "cookies-next";

export const Context = createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && user?.emailVerified) {

            const token = await user?.getIdToken()

            setCookie("firebase_token", token, {
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
              secure: true,
              sameSite: "lax",
            });

            setCurrentUser({ ...user, ...userDoc.data() });
          } else {
            deleteCookie("firebase_token", { path: "/" })
            setCurrentUser(user);
          }
        } catch (error) {
          deleteCookie("firebase_token", { path: "/" })
          setCurrentUser(user);
        }
      } else {
        deleteCookie("firebase_token", { path: "/" })
        setCurrentUser(null);
      }
      setIsAuthReady(true)
    })

    return () => unsubscribe();
  }, []);

  if (!isAuthReady) {
    return <FullPageLoader />;
  }

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
