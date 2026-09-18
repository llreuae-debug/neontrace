import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and Conditions of Use for the NEONTRACE location platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary noise-bg text-text-primary">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-cyan-400 text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" /> Legal & Governance
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-text-secondary text-sm">Effective Date: September 18, 2026</p>
        </div>

        <div className="space-y-8 glass p-6 sm:p-10 rounded-2xl border border-white/10 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the NEONTRACE platform, mobile application, or web services, you agree to be
              bound by these Terms of Service. If you do not agree with any part of these terms, you may not access
              or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">2. User Privacy & Location Sharing</h2>
            <p>
              NEONTRACE is built on the fundamental principle that your location data belongs entirely to you. Location
              sharing only occurs upon explicit, voluntary activation by the user. You retain the right to terminate
              any active sharing session or activate Ghost Mode at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">3. Acceptable Use Policy</h2>
            <p>
              You agree not to use NEONTRACE for any unlawful purpose, including stalking, harassment, non-consensual
              tracking of individuals, or any action that violates the legal rights of others. Unauthorized tracking or
              tampering with device permissions is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">4. Security & Authentication</h2>
            <p>
              Users are responsible for safeguarding their login credentials and devices. NEONTRACE employs cryptographic
              token validation and encrypted transmission channels to protect active sessions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">5. Disclaimer of Warranties</h2>
            <p>
              NEONTRACE provides location coordination on an &quot;as is&quot; and &quot;as available&quot; basis. GPS
              accuracy and telemetry depend on device hardware, cellular networks, and environmental factors. NEONTRACE
              is not a primary substitute for emergency dispatch services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">6. Contact Information</h2>
            <p>
              For legal inquiries or questions regarding these Terms, please contact our legal team at{" "}
              <a href="mailto:legal@neontrace.app" className="text-cyan-400 hover:underline">
                legal@neontrace.app
              </a>.
            </p>
          </section>
        </div>

        <footer className="mt-12 flex justify-between items-center text-xs text-text-muted">
          <p>© 2026 NEONTRACE. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-cyan-400">Privacy Policy</Link>
            <Link href="/security" className="hover:text-cyan-400">Security</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
