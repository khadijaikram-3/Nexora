import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#080B12] px-4 py-12 sm:px-6 lg:px-8">
      {/* Subtle background detail */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 w-full sm:max-w-md">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#38BDF8]/20 bg-[#38BDF8]/10">
            <LogIn className="h-6 w-6 text-[#38BDF8]" />
          </div>

          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#38BDF8]">
            Welcome back
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#F5F7FA]">
            Sign in to Nexora
          </h2>

          <p className="mt-3 text-sm text-[#64748B]">
            Access your account and continue shopping.
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="rounded-xl border border-[#1E293B] bg-[#121824] p-6 shadow-xl sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#9AA4B2]"
              >
                Email address
              </label>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail
                    className="h-5 w-5 text-[#64748B]"
                    aria-hidden="true"
                  />
                </div>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 pl-10 text-sm text-[#F5F7FA] placeholder-[#475569] transition-all duration-200 focus:border-[#38BDF8]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#9AA4B2]"
              >
                Password
              </label>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock
                    className="h-5 w-5 text-[#64748B]"
                    aria-hidden="true"
                  />
                </div>

                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 pl-10 text-sm text-[#F5F7FA] placeholder-[#475569] transition-all duration-200 focus:border-[#38BDF8]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/10"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </motion.button>
          </form>

          {/* Signup */}
          <div className="mt-7 border-t border-[#1E293B] pt-6 text-center">
            <p className="text-sm text-[#64748B]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="inline-flex items-center font-medium text-[#38BDF8] transition-colors duration-200 hover:text-[#7DD3FC]"
              >
                Sign up now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;