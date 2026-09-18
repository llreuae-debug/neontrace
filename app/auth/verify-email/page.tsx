"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    router.push("/main/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg-primary noise-bg flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 mb-6">
            <span className="text-2xl">✉️</span>
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Verify your email</h1>
          <p className="text-text-secondary">Enter the 6-digit code sent to your inbox</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={code[i] || ""}
                    readOnly
                    className="w-12 h-14 text-center text-xl font-bold bg-bg-primary border border-white/10 rounded-xl outline-none text-text-primary"
                  />
                ))}
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/90 to-purple-500/90 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold transition-all active:scale-[0.97]"
            >
              Verify
            </button>
            <p className="text-center text-sm text-text-muted">
              Didn't receive a code?{" "}
              <button type="button" className="text-cyan-400 hover:underline">
                Resend
              </button>
            </p>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
