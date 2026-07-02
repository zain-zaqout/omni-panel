"use client"
import { Loader2, Lock, Mail, User2, } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { setCookie } from 'cookies-next';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, getDocs, collection, query, where, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useProduct } from '@/contexts/EditProductContext';
import { useData } from '@/contexts/UserContext';
import { toast } from 'sonner';

const SigninForm = () => {
    const [LoadingGoogle, setLoadingGoogle] = useState(false)
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Loading, setLoading] = useState(false)

    const { setCurrentUser } = useAuth()
    const { setProducts } = useProduct()
    const { setdisplayName, seteditName } = useData()

    const router = useRouter()

    const signUp = async () => {
        const userValue = userName?.trim();
        const emailValue = email?.trim();
        const passwordValue = password?.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (userValue.length < 3) {
            return toast.error("Name must be at least 3 characters");
        }
        if (!emailRegex.test(emailValue)) {
            return toast.error("Invalid email address! Please check the format (name@mail.com).");
        }
        if (passwordValue.length < 8) {
            return toast.error("Password must be exactly 8 characters");
        }
        if (userValue.trim() === "User" || userValue.trim() === "user") {
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

            const user = userCredential.user;
            const userData = {
                user: userValue,
                email: emailValue.toLowerCase(),
                productsUser: data,
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, "users", user.uid), userData);
            setProducts(data);
            await sendEmailVerification(user)
            localStorage.setItem("firstVerificationSent", Date.now())
            toast.success("Verification email sent! Check your inbox at " + user.email)

            router.push("/verify-email");

        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    toast.error("This email address is already registered. Try logging in instead.");
                    break;
                case "auth/invalid-email":
                    toast.error("The email address provided is badly formatted.");
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
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoadingGoogle(true)
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);

            const user = userCredential.user;

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            const res = await fetch("/productsUser.json");
            const data = await res.json();
            setProducts(data);

            const userData = {
                user: user.displayName || "Anonymous",
                email: user.email.toLowerCase(),
                productsUser: data,
                createdAt: new Date().toISOString(),
            };

            if (!userDoc.exists()) {
                await setDoc(userRef, userData);
            }

            setCurrentUser({ ...user, ...userData });

            setdisplayName(userData.user);
            seteditName(userData.user);

            const token = await user.getIdToken(true);

            setCookie("firebase_token", token, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
                secure: true,
                sameSite: "lax",
            });

            router.replace("/")
        } catch (error) {
            const code = error?.code;

            if (
                code === "auth/popup-closed-by-user" ||
                code === "auth/cancelled-popup-request"
            ) {
                return
            }
            if (code === "auth/network-request-failed") {
                toast.error("Network error. Please check your internet connection and try again.");
            } else if (code === "auth/user-disabled") {
                toast.error("This account has been disabled. Please contact support.");
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        } finally {
            setLoadingGoogle(false)
        }
    }

    function GoogleIcon() {
        return (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
        )
    }

    const inputFocus = useRef(null);
    useEffect(() => {
        inputFocus.current?.focus();
    }, []);

    return (
        <div className='max-[1000px]:w-full min-w-1/2 w-full h-screen bg-white flex items-center justify-center'>
            <div className='max-w-100 max-[550px]:max-w-90 max-[400px]:max-w-75 max-[345px]:max-w-65 w-full'>
                <h1 className='text-[26px] font-bold text-slate-800'>Create new account</h1>
                <p className='text-sm font-semibold text-gray-500'>Start Managing your in minutes. No credit card required.</p>
                <form onSubmit={(e) => { e.preventDefault(); signUp() }}>
                    <div className=' flex flex-col space-y-2 mt-3.5' disabled={LoadingGoogle || Loading}>

                        <div className=" relative group">
                            <User2 className='absolute left-3.5 top-1/2 translate-y-[24%] text-gray-500' size={20} />
                            <label htmlFor="user" className='font-semibold tracking-[0.02rem]'>Username</label>
                            <input
                                id='user'
                                type="text"
                                placeholder='Full name'
                                className="h-11 w-full rounded-xl mt-1.5 border pl-10 pr-4 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.15)] text-sm transition-all duration-200 outline-none border-slate-200 bg-white text-slate-800 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                                maxLength={17}
                                autoComplete="one-time-code"
                                ref={inputFocus}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className='relative group'>
                            <Mail className='absolute left-3.5 top-1/2 translate-y-[33%] text-gray-500' size={19} />
                            <label htmlFor="email" className='font-semibold text-slate-800 tracking-[0.02rem]'>Email address</label>
                            <input
                                id='email'
                                type="email"
                                placeholder='your@example.com'
                                className="h-11 w-full rounded-xl mt-1.5 border pl-10 pr-4 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.15)] text-sm transition-all duration-200 outline-none border-slate-200 bg-white text-slate-800 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                                autoComplete="one-time-code"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='relative group'>
                            <Lock className='absolute left-3.5 top-1/2 translate-y-[33%] text-gray-500' size={19} />
                            <label htmlFor="password" className='font-semibold text-slate-800 tracking-[0.02rem]'>Password</label>
                            <input
                                id='password'
                                type="password"
                                placeholder='Create a strong password'
                                className="h-11 w-full rounded-xl mt-1.5 border pl-10 pr-4 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.15)] text-sm transition-all duration-200 outline-none border-slate-200 bg-white text-slate-800 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                                maxLength={30}
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={LoadingGoogle || Loading}
                            className={`w-full active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-violet-500/70 mt-2 shadow-sm shadow-violet-500 bg-violet-600 hover:bg-violet-800 font-semibold rounded-xl cursor-pointer h-11 text-white text-sm tracking-[0.06rem] transition-all duration-300`}
                        >
                            {Loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                </span>
                            ) : (
                                <>
                                    Create account
                                </>
                            )}
                        </button>

                    </div>
                </form>
                <div className="pb-4 relative w-full flex pt-4.5 items-center">
                    <div className="grow border-t border-gray-300"></div>

                    <span className="shrink mx-3 text-xs tracking-widest text-gray-600 uppercase select-none">
                        or
                    </span>

                    <div className="grow border-t border-gray-300"></div>
                </div>
                <button
                    type='button'
                    className="w-full h-11 pl-12 pr-4 text-slate-800 active:translate-y-0.5 shadow-md font-semibold flex items-center justify-center gap-2 rounded-xl outline outline-gray-300 bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed text-sm cursor-pointer transition-all duration-300"
                    disabled={Loading || LoadingGoogle}
                    onClick={() => handleGoogle()}
                >
                    <GoogleIcon />
                    Contnue with Google
                </button>
                <div className="flex justify-center py-4 text-center">
                    <p className="text-sm font-semibold text-gray-500">
                        Already have an account
                        <Link href="/login" className={`${Loading || LoadingGoogle ? 'pointer-events-none opacity-60 transition-opacity duration-200' : ''} text-violet-500 hover:underline font-bold`}> Sign in?</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SigninForm