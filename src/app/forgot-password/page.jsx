"use client"
import { useState, useEffect, useRef } from "react"
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ArrowLeft, KeyRound, Settings, Loader2, Mail, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
    const [emailInputValue, setEmailInputValue] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [status, setStatus] = useState(false)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const valid = !emailRegex.test(emailInputValue)

    const router = useRouter()

    useEffect(() => {
        if (countdown <= 0) return
        const interval = setTimeout(() => setCountdown((c) => c - 1), 1000)
        return () => clearTimeout(interval)
    }, [countdown])

    useEffect(() => {
        const lastResend = localStorage.getItem("lastResetPasswordSent");

        if (lastResend) {
            const elapsed = Math.floor(
                (Date.now() - Number(lastResend)) / 1000
            );

            if (elapsed < 60) {
                setCountdown(60 - elapsed);
                return;
            }
        }
    }, []);

    const handleSendLink = async () => {
        setIsLoading(true)
        try {
            await sendPasswordResetEmail(auth, emailInputValue)
            setCountdown(60)
            localStorage.setItem("lastResetPasswordSent", Date.now())
            setStatus(true)
            toast.success(`Email sent successfully! We sent a reset link to ${emailInputValue}. check your inbox and click the link to continue.`)
        } catch {
            toast.error("Something went wrong. Please check your connection and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const InputFocus = useRef(null);
    useEffect(() => {
        InputFocus.current?.focus();
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center px-4 bg-white dark:bg-white'>

            <div className="fixed top-0 left-0 mx-10 flex items-center py-5">
                <button
                    onClick={() => router.push("/signin")}
                    className="flex items-center group gap-0.75 cursor-pointer duration-200 py-1 rounded-md"
                >
                    <ArrowLeft size={16} className="text-gray-500 group-hover:text-slate-900 group-hover:-translate-x-1 duration-100" />
                    <span className="text-sm text-gray-500 group-hover:text-slate-900 duration-100">
                        Back
                    </span>
                </button>
            </div>

            <main className="max-w-110 w-full flex flex-col items-center justify-center">
                <div className='flex items-center gap-1.5'>
                    <div className='bg-violet-600 w-8.5 h-8.5 rounded-xl flex items-center justify-center'>
                        <Settings className='text-white' size={22} />
                    </div>
                    <span className='text-xl font-bold text-slate-800'>
                        Omni
                        <span className="text-violet-600">
                            Panel
                        </span>
                    </span>
                </div>
                <div className='bg-violet-500/10 mt-5 rounded-full w-20.5 h-20.5 flex items-center justify-center'>
                    <KeyRound size={40} className="text-violet-700" />
                </div>

                <div className='text-center mb-2.5 mt-2'>
                    <h1 className='text-[30px] pb-2 text-slate-950 font-bold'>Forgot password?</h1>
                    <p className='text-[14.5px] text-gray-500 max-w-100 font-semibold'>No worrise. Enter your email and we&apos;ll send you a link to reset your password.</p>
                </div>

                <div className="flex flex-col space-y-2.5 py-2 px-5 w-full ">
                    <div className="relative">
                        <Mail className='absolute left-4 top-1/2 translate-y-[-30%] text-gray-400' size={19} />
                        <input
                            id='email'
                            type="email"
                            placeholder='your@example.com'
                            className="h-11 w-full rounded-xl mt-1.5 border pl-11.5 pr-4 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.15)] text-sm transition-all duration-200 outline-none border-slate-200 bg-white text-slate-800 focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                            disabled={isLoading || countdown > 0}
                            autoComplete="one-time-code"
                            value={emailInputValue}
                            ref={InputFocus}
                            onChange={(e) => setEmailInputValue(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading || !emailInputValue || countdown > 0 || valid}
                        className='text-white disabled:opacity-50 font-bold tracking-[0.09rem] disabled:cursor-not-allowed disabled:bg-violet-900/80 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 rounded-2xl shadow-sm w-full h-12 text-sm duration-200 ease-in-out cursor-pointer'
                        // style={{ boxShadow: "0 4px 6px -1px rgba(0, 127, 123, 0.3), 0 2px 4px -2px rgba(0, 127, 123, 0.3)" }}
                        onClick={() => handleSendLink()}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={19} />
                                <span className="font-bold">Sending...</span>
                            </>
                        ) : countdown > 0 ? (
                            `Resend In ${countdown}s`
                        ) : (
                            <>
                                <Send size={18} />
                                {status ? `Resend reset link` : `Send reset link`}
                            </>
                        )

                        }
                    </button>

                </div>
                <p className='text-gray-500 font-semibold text-[13px] mt-1'>
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
