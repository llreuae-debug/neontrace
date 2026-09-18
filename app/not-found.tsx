import Link from "next/link";
import { Zap, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary noise-bg flex items-center justify-center px-4 py-12 text-text-primary">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-600 mb-8 shadow-2xl shadow-cyan-500/20">
          <Zap className="w-10 h-10 text-white" />
        </div>

        <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Error 404
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-3">
            Coordinate <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Not Found</span>
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mb-8">
            The signal was lost or this sector does not exist in the NEONTRACE network.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Base
            </Link>
            <Link
              href="/main/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-primary text-sm font-semibold transition-all"
            >
              <Compass className="w-4 h-4 text-cyan-400" /> Open Radar
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-xs text-text-muted">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/security" className="hover:text-cyan-400 transition-colors">Security</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
