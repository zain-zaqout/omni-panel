"use client"
import Link from "next/link";
import { setCookie } from "cookies-next";

const Page = () => {
  const login = (e: any) => {
    e.preventDefault();
setCookie('auth_token', 'your_token_here', { 
  maxAge: 60 * 60 * 24, 
  path: '/' 
});      window.location.href = "/";
  };

  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center text-gray-900 transition-colors duration-300">
      <div className="bg-white w-100 rounded-xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-center text-3xl font-bold select-none">Login</h2>

        <hr className="my-6 border-gray-200" />

        <form onSubmit={login} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              className="w-full p-2.5 rounded-lg outline outline-gray-200 bg-transparent focus:outline-blue-500 focus:outline-2 transition-all"
              placeholder="Email..."
              defaultValue="alex.thompson@shopadmin.com"
              readOnly
            />
          </div>

          <div>
            <input
              id="password"
              type="password"
              className="w-full p-2.5 rounded-lg outline outline-gray-200 bg-transparent focus:outline-blue-500 focus:outline-2 transition-all"
              placeholder="Password..."
              defaultValue="********"
              readOnly
            />
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-blue-500 w-4 h-4" />
              <span>Remember Me</span>
            </label>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-2 rounded-lg bg-blue-600 cursor-pointer text-white font-bold hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[14px] font-medium text-gray-500">
            Don't have an account?{" "}
            <Link href="#" className="text-blue-500 hover:underline">
              Register!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
