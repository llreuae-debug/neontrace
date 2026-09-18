"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft, Shield } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Reset password</h1>
          <p className="text-text-secondary">Enter your email and we'll send a reset link</p>
        </div>

        <GlassCard className="p-8">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-xl">✓</span>
              </div>
              <p className="font-medium mb-2">Check your inbox</p>
              <p className="text-sm text-text-muted">
                If an account exists for {email}, you'll receive a reset link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-text-primary placeholder:text-text-muted"
                />
              </div>
              <button type="submit" className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/90 to-purple-500/90 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold transition-all active:scale-[0.97]">
                Send Reset Link
              </button>
            </form>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
