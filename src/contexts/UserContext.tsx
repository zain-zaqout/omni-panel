"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const UserContextInstance = createContext();

export const UserContext = ({ children }) => {
    const [displayName, setdisplayName] = useState("User");
  const [editName, seteditName] = useState("Alex Thompson");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const sevedName = localStorage.getItem("name") || "Alex Thompson"
    const sevedPhone = localStorage.getItem("phone");

    if (sevedName) {
      setdisplayName(sevedName);
      seteditName(sevedName);
    }
    if (sevedPhone) setPhone(sevedPhone);
  }, []);

  const changeData = () => {
    if (editName.length <= 3) return;
    const promise = new Promise((resolve) => setTimeout(resolve, 2300)); 
    
    toast.promise(promise, {
      loading: 'Loading',
      success: () => {
        
        setShowActions(false);
        setdisplayName(editName);
      localStorage.setItem("name", editName);
        localStorage.setItem("phone", phone);
      return `Changes saved successfully.`;
    },
    error: 'Unable to save changes. Something went wrong.',
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
        seteditName,
        phone,
        setPhone,
      }}
    >
      {children}
    </UserContextInstance.Provider>
  );
};
export const useData = () => useContext(UserContextInstance);
