"use client";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export const UserContextInstance = createContext();

export const UserContext = ({ children }) => {
  const [displayName, setdisplayName] = useState("Loading User...");
  const [editName, seteditName] = useState("Loading User...");
  const [showActions, setShowActions] = useState(false);

  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const currentName = currentUser?.user || "User";
    setdisplayName(currentName);
    seteditName(currentName);
  }, [currentUser]);

  const changeData = () => {
    const oldName = displayName;

    if (!editName?.trim()) return toast.error("Username cannot be empty");
    if (editName.trim().length <= 3) return toast.error("Username must be more than 3 characters");
    if (editName.trim() === displayName) return toast.error("This is already your username");
    if (editName.trim() === "User" || editName.trim() === "user") return toast.error("Username cannot be 'User'");

    const editUserNameProcess = async () => {
      const q = query(collection(db, "users"), where("user", "==", editName.trim()));
      const snapShot = await getDocs(q);

      if (!snapShot.empty) {
        throw new Error("This username is already taken");
      }

      await updateDoc(doc(db, "users", currentUser.uid), {
        user: editName.trim()
      });

      setdisplayName(editName.trim());
      if (setCurrentUser) {
        setCurrentUser(prev => ({
          ...prev,
          user: editName.trim()
        }));
      }
    };

    toast.promise(editUserNameProcess(), {
      loading: 'Securing your new handle...',
      success: () => {
        `Changes saved successfully.`
        setShowActions(false);
      },
      error: () => {
        setShowActions(false);
        seteditName(oldName);
        setdisplayName(oldName);
        return 'Unable to save changes. Something went wrong.';
      },
    });

  };

  return (
    <UserContextInstance.Provider
      value={{
        displayName,
        setShowActions,
        showActions,
        changeData,
        setdisplayName,
        editName,
        seteditName
      }}
    >
      {children}
    </UserContextInstance.Provider>
  );
};

export const useData = () => useContext(UserContextInstance);