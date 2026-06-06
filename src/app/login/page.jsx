"use client";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { auth, db } from "@/lib/firebase";
import { setCookie } from "cookies-next";
import { useData } from "@/contexts/UserContext";
import { useForm } from "@/contexts/FormsContext";

const page = () => {

  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth()
  const { seteditName, setdisplayName } = useData()
  const { Data, dispatch } = useForm()

  async function logIn() {
    const emailValue = Data.email?.trim();
    const passwordValue = Data.password?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      return toast.error("Invalid email address!");
    }
    if (passwordValue.length < 8) {
      return toast.error("Password must be exactly 8 characters");
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email first.");
        router.push("/verify-email")
        return
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCurrentUser({ ...user, ...userData });

        if (userData.user) {
          setdisplayName(userData.user);
          seteditName(userData.user);
        }
      }

      dispatch({ type: "email", val: "" });
      dispatch({ type: "password", val: "" });

      const token = await user.getIdToken()

      setCookie("firebase_token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        secure: true,
        sameSite: "lax",
      });

      setTimeout(() => router.replace("/"), 100)
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Incorrect email or password. Please try again.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email address.");
          break;
        case "auth/user-disabled":
          toast.error("This account has been disabled by the administrator. Please contact support.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many failed login attempts. Access to this account has been temporarily blocked. Please try again later.");
          break;
        case "auth/network-request-failed":
          toast.error("Network connection failure. Please check your internet connection.");
          break;
        case "auth/invalid-email":
          toast.error("The email address provided is badly formatted.");
          break;
        default:
          toast.error("An unexpected error occurred during login. Please try again.");
          break;
      }
    } finally {
      setLoading(false);
    }
  }

  const InputFocus = useRef(null);
  useEffect(() => {
    InputFocus.current?.focus();
  }, []);

  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center text-gray-900">
      <div className="bg-white w-100 rounded-xl shadow-xl transition-shadow">
        <div>
          <h2 className="text-center text-3xl font-bold pt-6 select-none">
            Login
          </h2>
        </div>
        <hr className="mb-6 mt-5 w-80 m-auto border-gray-200" />
        <div className="w-[80%] m-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <div className="flex items-center gap-2 pb-4">
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full p-2 rounded-lg
                  focus:shadow-lg
             outline outline-gray-200
             text-lg
             focus:outline-blue-400
             focus:outline-2
             transition-colors duration-400"
                  placeholder="Email..."
                  value={Data.email}
                  autoComplete="one-time-code"
                  onChange={(e) =>
                    dispatch({ type: "email", val: e.target.value })
                  }
                  ref={InputFocus}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full p-2 rounded-lg
                  focus:shadow-lg
             outline outline-gray-200
             text-lg
             focus:outline-blue-400
             focus:outline-2
             focus:border-none
             transition-colors duration-400"
                  minLength={8}
                  maxLength={30}
                  placeholder="password..."
                  value={Data.password}
                  autoComplete="new-password"
                  onChange={(e) =>
                    dispatch({ type: "password", val: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="pt-3">
              <div className="flex justify-between">
                <div>
                  <input id="check" type="checkbox" className="mr-1" />
                  <label htmlFor="check" className="select-none bg-white">
                    Remeber Me
                  </label>
                </div>
                <div>
                  <p className="text-gray-600 hover:text-gray-700 cursor-default font-medium">
                    Forgrt Your{" "}
                    <Link
                      href=""
                      className="hover:underline hover:text-blue-600 duration-150"
                    >
                      Password?
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                disabled={Loading}
                className="p-2 mt-2.5 flex justify-center w-full rounded-lg bg-[#3b82f6] text-white text-[15px] font-bold cursor-pointer duration-200 hover:bg-[#2563eb]"
                onClick={logIn}
              >
                {Loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center w-[80%] m-auto py-4">
          <p className="text-[15px] font-semibold text-gray-600">
            You Dont Have Acount{" "}
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Register!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default page;
