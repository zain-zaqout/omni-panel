"use client"
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Mail, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { sendEmailVerification } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useAuth } from "@/contexts/AuthContext";
import { setCookie } from "cookies-next";
import { FullPageLoader } from "@/components/FullPageLoader";

const Page = () => {
    const router = useRouter()

    const COOLDOWN = 90
    const [cooldown, setCooldown] = useState(0)
    const [isResending, setIsResending] = useState(false)
    const [resendStatus, setResendStatus] = useState(null)
    const [isChecking, setIsChecking] = useState(false)

    const { isAuthReady, currentUser, setCurrentUser } = useAuth()

    useEffect(() => {
        if (cooldown <= 0) return
        const interval = setTimeout(() => setCooldown((c) => c - 1), 1000)
        return () => clearTimeout(interval)
    }, [cooldown])

    useEffect(() => {
        const lastResend = localStorage.getItem("lastVerificationSent");

        if (lastResend) {
            const elapsed = Math.floor(
                (Date.now() - Number(lastResend)) / 1000
            );

            if (elapsed < 90) {
                setCooldown(90 - elapsed);
                return;
            }
        }

        const firstSent = localStorage.getItem("firstVerificationSent");

        if (firstSent) {
            const elapsed = Math.floor(
                (Date.now() - Number(firstSent)) / 1000
            );

            if (elapsed < 60) {
                setCooldown(60 - elapsed);
            }
        }
    }, []);

    const handleResend = async () => {
        if (cooldown > 0 || isResending) return;

        const lastSent = Number(localStorage.getItem("lastVerificationSent"));
        if (lastSent && Date.now() - lastSent < COOLDOWN * 1000) {
            toast.error("Please wait before resending.");
            return;
        }

        setIsResending(true);

        try {
            const freshUser = auth.currentUser;

            if (!freshUser) {
                toast.error("Please sign in again.");
                return;
            }

            await sendEmailVerification(freshUser);

            localStorage.setItem("lastVerificationSent", Date.now());
            localStorage.removeItem("firstVerificationSent")
            setCooldown(COOLDOWN);
            setResendStatus("success");

        } catch (error) {
            setResendStatus("failed");

            if (error.code === "auth/too-many-requests") {
                toast.error("Too many requests. Try later.");
            }
            if (error.code === "auth/network-request-failed") {
                toast.error("Network error. Please check your internet connection and try again.");
            }

        } finally {
            setIsResending(false);
        }
    };

    const handleCheckVerified = async () => {
        if (isChecking) return;

        setIsChecking(true);

        try {
            const freshUser = auth.currentUser;

            if (!freshUser) {
                toast.error("Please sign in again.");
                return;
            }

            await freshUser.reload();

            const updatedUser = freshUser;

            if (updatedUser.emailVerified) {

                const token = await updatedUser.getIdToken();
                setCookie("firebase_token", token, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                    secure: true,
                    sameSite: "lax",
                });

                const userDoc = await getDoc(doc(db, "users", updatedUser.uid));

                if (userDoc.exists()) {
                    setCurrentUser({ ...updatedUser, ...userDoc.data() });
                }

                localStorage.removeItem("lastVerificationSent");
                localStorage.removeItem("firstVerificationSent");
                toast.success("Email verified successfully. Welcome!");
                router.replace("/")

            } else {
                toast.error("Email not verified yet.");
            }

        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsChecking(false);
        }
    };

    useEffect(() => {
        if (!isAuthReady) return;

        if (!currentUser) {
            router.replace("/signin");
            return;
        }

        if (currentUser.emailVerified) {
            router.replace("/");
            return;
        }
    }, [isAuthReady, currentUser, router]);

    if (!isAuthReady || !currentUser) {
        return <FullPageLoader />;
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 bg-white dark:bg-white'>

            <div className="fixed top-0 left-0 mx-10 flex items-center py-5">
                <button
                    onClick={() => router.push("/login")}
                    className="flex items-center group gap-0.75 cursor-pointer duration-200 py-1 rounded-md"
                >
                    <ArrowLeft size={16} className="text-gray-500 group-hover:text-slate-900 group-hover:-translate-x-1 duration-100" />
                    <span className="text-sm text-gray-500 group-hover:text-slate-900 duration-100">
                        Back
                    </span>
                </button>
            </div>

            <main className="max-w-100 w-full flex flex-col items-center justify-center">

                <div className='relative bg-violet-200/80 rounded-3xl w-25.5 h-25.5 flex items-center justify-center group'>
                    <a href="https://mail.google.com" target="_blank">
                        <span
                            className="absolute bottom-full mb-2 scale-0 pointer-events-none 
             transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275) origin-bottom
             [@media(hover:hover)]:group-hover:scale-100
             bg-violet-600 text-white dark:bg-violet-500 text-[14px] font-semibold 
             px-3.5 py-2 rounded-full shadow-md shadow-indigo-200 dark:shadow-none group-hover:-translate-x-18 group-hover:-rotate-25
             whitespace-nowrap"
                        >Click to open Gmail</span>
                        <div
                            className='flex items-center justify-center rounded-2xl w-21.5 h-21.5 bg-violet-500/90 group-hover:bg-violet-600 transition-colors duration-200 text-white'
                            style={{ boxShadow: "0 4px 6px -1px rgba(0, 127, 123, 0.3), 0 2px 4px -2px rgba(0, 127, 123, 0.3)" }}
                        >
                            <Mail size={39} className='group-hover:scale-125 group-hover:-rotate-30 transition duration-200 cursor-pointer' />
                        </div>
                        <div className='absolute -bottom-2.5 -right-2 flex items-center justify-center bg-green-600 rounded-full p-1.5 border-2 border-white'>
                            <CheckCircle2 className='text-white' size={18} />
                        </div>
                    </a>
                </div>

                <div className='text-center mb-5 mt-4'>
                    <h1 className='text-4xl pb-3 font-semibold text-slate-950'>Check your inbox</h1>
                    <p className='text-[14.5px] text-gray-500'>We sent a verification link to</p>
                    <span className='text-sm text-slate-950' style={{ fontWeight: 700 }}>
                        {currentUser?.email}
                    </span>
                </div>

                <div className='w-full'>

                    <button
                        onClick={handleCheckVerified}
                        disabled={isChecking || isResending}
                        className='text-white font-bold flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-900/50 rounded-2xl shadow-sm w-full h-12 text-sm duration-200 ease-in-out cursor-pointer'
                    // style={{ boxShadow: "0 4px 6px -1px rgba(0, 127, 123, 0.3), 0 2px 4px -2px rgba(0, 127, 123, 0.3)" }}
                    >
                        {isChecking ? (
                            <span><Loader2 className="animate-spin text-white" /></span>
                        ) : (
                            <>
                                <CheckCircle2 size={17} />
                                I verified — Sign me in
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => handleResend()}
                        disabled={isResending || cooldown > 0}
                        className="w-full h-12 mt-3 flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 text-foreground font-semibold text-sm transition-all duration-200 hover:border-violet-700 hover:text-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RotateCcw className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`} strokeWidth={2.5} />
                        {isResending
                            ? "Sending..."
                            : cooldown > 0
                                ? `Resend in ${cooldown}s`
                                : "Resend link"
                        }
                    </button>

                    {resendStatus === "success" && (
                        <div className='flex items-center justify-center text-[13px] text-green-600 font-bold mt-3.5 gap-1.5 h-11 rounded-full w-full bg-green-500/10'>
                            <CheckCircle2 size={16.5} />
                            Verification email sent! Check your inbox
                        </div>
                    )}
                    {resendStatus === "failed" && (
                        <div className="mt-3 flex items-center gap-2 justify-center text-xs font-bold text-red-500 bg-red-500/10 rounded-xl py-2.5 px-4">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Something went wrong. Try again.
                        </div>
                    )}

                </div>

                <p className='text-gray-500 font-semibold text-[13px] mt-3'>
                    Can&apos;t find it? Check your{" "}
                    <span className='text-slate-950 font-semibold'>Spam</span>
                    {" "}or{" "}
                    <span className='text-slate-950 font-semibold'>Promotions</span>
                    {" "}folder
                </p>

            </main>
        </div>
    )
}

export default Page