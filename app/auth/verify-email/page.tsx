"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setError("");

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
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
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digits[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-11 h-13 text-center text-xl font-bold bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-text-primary transition-all"
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
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                onClick={() => setDigits(["1", "2", "3", "4", "5", "6"])}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Auto-fill demo code
              </button>
            </p>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}

