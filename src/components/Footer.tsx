"use client"
import { Github, Linkedin, MessageCircle, BriefcaseBusiness } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const socialLinks = [
    { 
      id: "github",
      icon: <Github size={18} />, 
      href: "https://github.com/zain-zaqout", 
      hover: "hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/50",
    },
    { 
      id: "whatsapp",   
      icon: <MessageCircle size={18} />, 
      href: "tel:+970593906089", 
      hover: "hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50",
    },
    { 
      id: "linkedin",
      icon: <Linkedin size={18} />, 
      href: "#", 
      hover: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50",
    },
    { 
      id: "portfolio",
      icon: <BriefcaseBusiness size={18} />, 
      href: "#", 
      hover: "hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/50",
    },
  ];

  const path = usePathname()
  const isProfilePage = path === "/profile"

  return (
    <footer className={`
      h-16 flex items-center transition-all duration-300
      bg-white dark:bg-slate-800 ${isProfilePage ? "ml-0" : "min-[376px]:ml-15 lg:ml-55"}
      border-t border-slate-200 dark:border-slate-700 
      text-slate-600 dark:text-white shadow-lg
    `}>
      <div className="w-[90%] m-auto flex flex-col min-[490px]:flex-row min-[490px]:py-0 items-center justify-between md:gap-4">
        
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <p className="text-[13px] sm:text-[14px] text-slate-500 dark:text-slate-400 font-medium">
            Designed & built by <span className="text-violet-600 dark:text-violet-600">Zain</span> | 2026
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                p-2 rounded-full transition-all duration-300 ease-out 
                border border-transparent text-slate-400 dark:text-slate-500
                hover:-translate-y-1 
                ${link.hover}
              `}
            >
              {link.icon}
            </a>
          ))}
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;