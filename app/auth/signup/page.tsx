"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Shield, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    router.push("/main/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg-primary noise-bg flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-text-secondary">Join NEONTRACE and share securely</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input required type="text" placeholder="Alex" className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-text-primary placeholder:text-text-muted" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input required type="text" placeholder="Chen" className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-text-primary placeholder:text-text-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input required type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-text-primary placeholder:text-text-muted" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-text-primary placeholder:text-text-muted" />
            </div>

            <NeonButton type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </NeonButton>

            <p className="text-center text-xs text-text-muted">
              By signing up, you agree to our <a href="/terms" className="text-cyan-400 hover:underline">Terms</a> and{" "}
              <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
