"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => { setSent(false); setName(""); setEmail(""); setMessage(""); }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-20 px-4 sm:px-6 pb-20 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-text-secondary mb-8">We&apos;d love to hear from you</p>

        <GlassCard className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">@</span>
              <span className="text-text-secondary">hello@neontrace.app</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">☎</span>
              <span className="text-text-secondary">+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">✉</span>
              <span className="text-text-secondary">support@neontrace.app</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-display font-semibold mb-4">Send a Message</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary placeholder:text-text-muted"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary placeholder:text-text-muted"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              rows={4}
              className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 transition-all text-text-primary placeholder:text-text-muted resize-none"
            />
            <NeonButton variant="primary" className="w-full" onClick={handleSend}>
              {sent ? <CheckCircle2 className="w-4 h-4" /> : null}
              {sent ? "Sent!" : "Send Message"}
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
