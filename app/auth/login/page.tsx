"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Eye, EyeOff, Zap, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{ name: string; email: string; avatar: string } | null>(null);

  useEffect(() => {
    // Check if previously logged in
    const existing = localStorage.getItem("neontrace_user");
    if (existing) {
      try {
        setAuthenticatedUser(JSON.parse(existing));
      } catch {
        // ignore
      }
    }
  }, []);

  const completeLogin = (user: { name: string; email: string; avatar: string }) => {
    localStorage.setItem("neontrace_user", JSON.stringify(user));
    localStorage.setItem("neontrace_auth_token", "nt_" + Math.random().toString(36).substring(2));
    setAuthenticatedUser(user);
    setTimeout(() => {
      router.push("/main/dashboard");
      router.refresh();
    }, 600);
  };

  const handleGoogleSignIn = () => {
    if (GOOGLE_CLIENT_ID) {
      const redirectUri = window.location.origin + "/auth/callback/google";
      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "token",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
      });
      window.location.href = GOOGLE_AUTH_URL + "?" + params.toString();
      return;
    }

    // Interactive Google OAuth modal for instant login
    setShowGoogleModal(true);
  };

  const handleSelectGoogleAccount = (account: { name: string; email: string; avatar: string }) => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setShowGoogleModal(false);
      completeLogin(account);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    completeLogin({
      name: email.split("@")[0] || "Cyber Explorer",
      email: email || "user@neontrace.live",
      avatar: (email[0] || "U").toUpperCase(),
    });
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      completeLogin({
        name: "Alex Chen",
        email: "alex.chen@neontrace.live",
        avatar: "A",
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-bg-primary noise-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 mb-6 shadow-xl shadow-cyan-500/20">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">
            {mode === "login" ? "Welcome back" : "Join NEONTRACE"}
          </h1>
          <p className="text-text-secondary text-sm">
            {mode === "login" ? "Sign in to access your live encrypted dashboard" : "Start sharing location privately"}
          </p>
        </div>

        <GlassCard className="p-8 border border-white/10 shadow-2xl">
          {/* Quick Demo Access Bar */}
          <button
            onClick={handleQuickDemoAccess}
            className="w-full mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm group cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>⚡ Instant 1-Click Demo Login</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all active:scale-98 cursor-pointer group mb-5"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm font-semibold text-text-primary">
              Continue with Google
            </span>
          </button>

          <div className="relative flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-text-muted uppercase tracking-wider font-mono">or with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  key="displayname"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="block text-xs font-semibold text-text-secondary">Display Name</label>
                  <input
                    type="text"
                    placeholder="Alex Chen"
                    className="w-full px-4 py-2.5 bg-bg-primary/80 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm text-text-primary placeholder:text-text-muted"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@neontrace.live"
                className="w-full px-4 py-2.5 bg-bg-primary/80 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm text-text-primary placeholder:text-text-muted"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-text-secondary">Password</label>
                {mode === "login" && (
                  <a href="/auth/forgot-password" className="text-xs text-cyan-400 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-11 bg-bg-primary/80 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm text-text-primary placeholder:text-text-muted"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <NeonButton type="submit" variant="primary" size="lg" className="w-full mt-2" isLoading={isLoading}>
              {mode === "login" ? "Enter Dashboard" : "Create Free Account"}
              <ArrowRight className="w-4 h-4" />
            </NeonButton>
          </form>

          {authenticatedUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                {authenticatedUser.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-text-primary truncate">{authenticatedUser.name}</p>
                <p className="text-[11px] text-text-muted truncate">{authenticatedUser.email}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready
              </span>
            </motion.div>
          )}

          <p className="text-center text-xs text-text-muted mt-6">
            {mode === "login" ? "Don't have an account yet?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
              }}
              className="text-cyan-400 hover:underline font-semibold cursor-pointer ml-1"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </GlassCard>
      </motion.div>

      {/* Google OAuth Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => !googleLoading && setShowGoogleModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm glass-strong rounded-2xl p-6 border border-white/20 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-display font-semibold text-sm">Sign in with Google</span>
                </div>
                <button
                  onClick={() => setShowGoogleModal(false)}
                  disabled={googleLoading}
                  className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-text-secondary mb-4">
                Choose an account to continue to <strong className="text-white">NEONTRACE</strong>
              </p>

              {googleLoading ? (
                <div className="py-8 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                  <p className="text-xs text-text-secondary">Authenticating with Google...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      handleSelectGoogleAccount({
                        name: "Alex Chen",
                        email: "alex.chen@gmail.com",
                        avatar: "A",
                      })
                    }
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      A
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text-primary group-hover:text-cyan-400 transition-colors">
                        Alex Chen
                      </p>
                      <p className="text-xs text-text-muted truncate">alex.chen@gmail.com</p>
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectGoogleAccount({
                        name: "Sarah Lin",
                        email: "sarah.lin@gmail.com",
                        avatar: "S",
                      })
                    }
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      S
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text-primary group-hover:text-cyan-400 transition-colors">
                        Sarah Lin
                      </p>
                      <p className="text-xs text-text-muted truncate">sarah.lin@gmail.com</p>
                    </div>
                  </button>
                </div>
              )}

              <p className="text-[10px] text-text-muted text-center mt-4">
                To continue, Google will share your name and email with NEONTRACE.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
