"use client";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import Security from "@/components/Security ";
import PersonalDetails from "@/components/PersonalDetails";
import { MoveLeft, Bell, Pen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useData } from "@/contexts/UserContext";
import Preferences from "@/components/Preferences";

const Page = () => {
  const router = useRouter();
  const { displayName, showActions, setShowActions, seteditName, changeData } =
    useData();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <header className="bg-white dark:bg-slate-800 w-full h-[9vh] flex border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="w-[90%] max-w-6xl m-auto flex items-center justify-between">
          <div className="text-slate-800 dark:text-slate-300 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center border border-slate-200 dark:border-slate-500 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 cursor-pointer transition-all duration-200 w-8 h-7 rounded text-slate-600 dark:text-slate-200"
            >
              <MoveLeft size={22} />
            </button>
            <div className="flex flex-col">
              <span className="text-lg leading-tight font-medium">Profile</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Account overview
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center relative border border-slate-200 dark:border-slate-500 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 cursor-pointer transition-all duration-200 w-8 h-8 rounded text-slate-600 dark:text-slate-200">
              <Bell size={20} />
              <span className="absolute top-1 right-2 bg-violet-500 w-2 h-2 rounded-full border-2 border-white dark:border-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="w-[90%] max-w-6xl m-auto py-6">
        <AnimationWrapper delay={0.1}>
          <section className="relative flex flex-col md:flex-row md:justify-between items-center overflow-hidden w-full bg-white dark:bg-slate-800 px-6 py-7 rounded-[20px] shadow-sm dark:shadow-none border border-slate-100 dark:border-transparent transition-colors duration-300">
            <div className="relative flex flex-col items-center md:flex-row text-center gap-4">
              <div className="relative">
                <Image
                  src="/assets/Images/avatar of profile.jpg"
                  alt="avatar"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-sm"
                />
                <button className="absolute -right-1 -bottom-1 cursor-pointer bg-violet-500 hover:bg-violet-600 w-7 h-7 rounded-full flex items-center justify-center transition-colors">
                  <Pen size={14} className="text-white" />
                </button>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold md:text-start">
                  {displayName}
                </p>
                <span className="text-slate-500 dark:text-slate-400 text-[15px] md:text-start">
                  E-commerce Manager
                </span>
                <div className="flex justify-center items-center md:justify-start gap-1.5 pt-2 text-xs text-slate-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Joined Mar, 2026</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex pt-6 gap-3">
                {!showActions ? (
                  <button
                    type="button"
                    className="bg-violet-500 hover:bg-violet-600 transition-all text-white font-semibold px-6 py-2 rounded-full cursor-pointer shadow-md shadow-violet-500/20 active:scale-95"
                    onClick={() => setShowActions(true)}
                  >
                    Change Data
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold px-6 py-2 rounded-full cursor-pointer transition-all"
                      onClick={() => {
                        setShowActions(false);
                        seteditName(displayName);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-8 py-2 rounded-full cursor-pointer transition-all shadow-md shadow-violet-500/20 active:scale-95"
                      onClick={changeData}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </AnimationWrapper>

        <div className="mt-5 grid grid-cols-1 gap-5">
          <AnimationWrapper delay={0.2}>
            <PersonalDetails />
          </AnimationWrapper>

          <AnimationWrapper delay={0.3}>
            <div className="flex flex-col gap-5">
              <Security />
              <Preferences />
            </div>
          </AnimationWrapper>
        </div>
      </main>
    </div>
  );
};

export default Page;
