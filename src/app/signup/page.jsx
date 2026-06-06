"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useProduct } from "@/contexts/EditProductContext";
import { useForm } from "@/contexts/FormsContext";

const Page = () => {
  const router = useRouter();

  const [Loading, setLoading] = useState(false);
  const { Data, dispatch } = useForm()
  const { setProducts } = useProduct();

  const checkData = async () => {
    const passwordValue = Data.password?.trim();
    const userValue = Data.user?.trim();
    const emailValue = Data.email?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userValue.length < 3) {
      return toast.error("Name must be exactly 3 characters");
    } else if (!emailRegex.test(emailValue)) {
      return toast.error("Invalid email address! Please check the format (name@mail.com).");
    } else if (passwordValue.length < 8) {
      return toast.error("Password must be exactly 8 characters");
    } else if (userValue.trim() === "User" || userValue.trim() === "user") {
      return toast.error("Username cannot be 'User'")
    }

    setLoading(true);
    try {
      const userSnapshot = await getDocs(query(
        collection(db, "users"),
        where("user", "==", userValue),
      ));

      if (!userSnapshot.empty) {
        toast.error("This username is already taken");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

      const res = await fetch("/productsUser.json");
      const data = await res.json();
      setProducts(data);

      const user = userCredential.user;
      const userData = {
        user: userValue,
        email: emailValue.toLowerCase(),
        phoneNumber: "+1 (555) 1234",
        productsUser: data,
      };

      await setDoc(doc(db, "users", user.uid), userData);
      await sendEmailVerification(user)
      toast.success("Verification email sent! Check your inbox at " + user.email)

      dispatch({ type: "user", val: "" });
      dispatch({ type: "email", val: "" });
      dispatch({ type: "password", val: "" });

      router.push("/verify-email");

    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email address is already registered. Try logging in instead.");
          break;
        case "auth/invalid-email":
          toast.error("The email address provided is badly formatted.");
          break;
        case "auth/weak-password":
          toast.error("The password is too weak. Please use a stronger password.");
          break;
        case "auth/operation-not-allowed":
          toast.error("Email/Password accounts are not enabled. Please contact support.");
          break;
        case "auth/network-request-failed":
          toast.error("Network connection failure. Please check your internet connection.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many requests. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred during sign up. Please try again.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current?.focus();
  }, []);

  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center text-gray-900">
      <div className="bg-white w-100 relative rounded-xl shadow-xl transition-shadow">
        <h2 className="text-center text-3xl font-bold pt-6 select-none">Create Account</h2>
        <hr className="mb-6 mt-5 w-80 m-auto border-gray-200" />
        <div className="w-[80%] m-auto">
          <form onSubmit={(e) => { e.preventDefault(); checkData(); }}>
            <input type="text" style={{ display: "none" }} name="fake_user" />
            <input type="password" style={{ display: "none" }} name="fake_password" />
            <div className="flex flex-col gap-4">
              <input
                ref={inputFocus}
                type="text"
                required
                minLength={3}
                maxLength={8}
                placeholder="Name..."
                value={Data?.user}
                autoComplete="one-time-code"
                onChange={(e) => dispatch({ type: "user", val: e.target.value })}
                className="w-full p-2 rounded-lg outline outline-gray-200 focus:outline-blue-400 focus:shadow-lg text-md transition-colors duration-400"
              />
              <input
                type="email"
                required
                placeholder="Email..."
                value={Data?.email}
                autoComplete="one-time-code"
                onChange={(e) => dispatch({ type: "email", val: e.target.value })}
                className="w-full p-2 rounded-lg outline outline-gray-200 focus:outline-blue-400 focus:shadow-lg text-md transition-colors duration-400"
              />
              <input
                type="password"
                required
                placeholder="Password..."
                minLength={8}
                maxLength={30}
                value={Data?.password}
                autoComplete="new-password"
                onChange={(e) => dispatch({ type: "password", val: e.target.value })}
                className="w-full p-2 rounded-lg outline outline-gray-200 focus:outline-blue-400 focus:shadow-lg text-md transition-colors duration-400"
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="w-full p-2 flex justify-center rounded-lg bg-[#3b82f6] text-white text-[15px] font-bold cursor-pointer hover:bg-[#2563eb] duration-200 disabled:opacity-50"
                disabled={Loading}
              >
                {Loading ? <Loader2 className="animate-spin" /> : <>Create An Account</>}
              </button>
            </div>
            <div className="flex justify-center py-4 text-center">
              <p className="text-[15px] font-semibold text-gray-600">
                Already have an
                <Link href="/login" className="text-blue-500 hover:text-blue-600 underline"> Account?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;