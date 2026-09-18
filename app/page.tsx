"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { DemoUser } from "@/types";
import {
  MapPin,
  Shield,
  Users,
  Zap,
  ArrowRight,
  Play,
  Compass,
  Lock,
} from "lucide-react";

const DEMO_USERS: DemoUser[] = [
  { id: "1", name: "Amina", lat: 40.7128, lng: -74.006, distance: 120, battery: 84, status: "live" },
  { id: "2", name: "Marcus", lat: 40.758, lng: -73.9855, distance: 340, battery: 67, status: "live" },
  { id: "3", name: "Sofia", lat: 40.7484, lng: -73.9857, distance: 890, battery: 45, status: "away" },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Share only when you choose. Stop anytime. Your location belongs to you.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Trust Circle",
    description: "Share with the people you trust. Not the whole world.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Real-Time",
    description: "Live location updates with battery-conscious tracking modes.",
    color: "pink",
  },
  {
    icon: MapPin,
    title: "Safe Arrival",
    description: "Let trusted contacts know when you've reached safely.",
    color: "green",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.6)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary noise-bg overflow-x-hidden">
      {/* Mesh gradient background */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0" />

      {/* Animated particle canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />

      {/* Top Floating Landing Navigation */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-4 backdrop-blur-md bg-bg-primary/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">NEONTRACE</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            <a href="/features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="/how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="/download" className="hover:text-cyan-400 transition-colors">Download</a>
            <a href="/security" className="hover:text-cyan-400 transition-colors">Security</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/auth/login"
              className="text-xs sm:text-sm font-semibold text-text-secondary hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </a>
            <NeonButton
              size="sm"
              variant="primary"
              onClick={() => router.push("/main/dashboard")}
              className="cursor-pointer"
            >
              <Compass className="w-4 h-4" /> Open Dashboard
            </NeonButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live location sharing, reimagined
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
              >
                <span className="text-text-primary">Track your world.</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Without losing your privacy.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-text-secondary max-w-lg mb-10"
              >
                Share your live location with the people you trust. See them on
                the map. Stay in control with end-to-end encryption.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <NeonButton size="xl" onClick={() => router.push("/main/dashboard")}>
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </NeonButton>
                <NeonButton
                  size="xl"
                  variant="ghost"
                  onClick={() => router.push("/auth/login")}
                >
                  <Lock className="w-5 h-5" /> Sign In with Google
                </NeonButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-6 mt-10 text-sm text-text-muted"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" /> No hidden tracking
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> Trusted circle only
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  <defs>
                    <radialGradient id="radarGrad" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="rgba(0,240,255,0.1)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(0,240,255,0.3)" />
                      <stop offset="100%" stopColor="rgba(168,85,247,0.3)" />
                    </linearGradient>
                  </defs>

                  {/* Radar circles */}
                  <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="1" />
                  <circle cx="250" cy="250" r="120" fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="1" />
                  <circle cx="250" cy="250" r="60" fill="none" stroke="rgba(0,240,255,0.1)" strokeWidth="1" />
                  <circle cx="250" cy="250" r="180" fill="url(#radarGrad)" />

                  {/* Radar sweep */}
                  <line x1="250" y1="250" x2="250" y2="50" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="4s" repeatCount="indefinite" />
                  </line>

                  {/* Grid lines */}
                  <line x1="0" y1="250" x2="500" y2="250" stroke="rgba(255,255,255,0.03)" />
                  <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.03)" />

                  {/* Location nodes */}
                  {[
                    { cx: 250, cy: 250, color: "#00f0ff", size: 12 },
                    { cx: 150, cy: 180, color: "#a855f7", size: 8 },
                    { cx: 350, cy: 200, color: "#f472b6", size: 10 },
                    { cx: 200, cy: 350, color: "#22c55e", size: 7 },
                    { cx: 380, cy: 340, color: "#facc15", size: 9 },
                  ].map((node, i) => (
                    <g key={i}>
                      <circle cx={node.cx} cy={node.cy} r={node.size + 15} fill="none" stroke={node.color} strokeWidth="1" opacity="0.3">
                        <animate attributeName="r" values={`${node.size};${node.size + 25};${node.size}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                      </circle>
                      <circle cx={node.cx} cy={node.cy} r={node.size} fill={node.color} opacity="0.9">
                        <animate attributeName="r" values={`${node.size};${node.size + 2};${node.size}`} dur="2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  ))}

                  {/* Connection lines */}
                  <line x1="250" y1="250" x2="150" y2="180" stroke="rgba(0,240,255,0.15)" strokeWidth="1">
                    <animate attributeName="stroke-opacity" values="0.15;0.4;0.15" dur="3s" repeatCount="indefinite" />
                  </line>
                  <line x1="250" y1="250" x2="350" y2="200" stroke="rgba(168,85,247,0.15)" strokeWidth="1">
                    <animate attributeName="stroke-opacity" values="0.15;0.4;0.15" dur="3.5s" repeatCount="indefinite" />
                  </line>
                </svg>

                {/* Floating cards overlay */}
                <div className="absolute inset-0">
                  {DEMO_USERS.map((user, i) => (
                    <div
                      key={user.id}
                      className="absolute"
                      style={{
                        top: `${20 + i * 20}%`,
                        left: i % 2 === 0 ? "5%" : "60%",
                      }}
                    >
                      <div className="animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                        <GlassCard className="w-36 py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${user.status === "live" ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
                            <span className="text-xs font-medium truncate">{user.name}</span>
                            <span className="text-[10px] text-text-muted ml-auto">{user.distance}m</span>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Privacy is the new <span className="text-cyan-400">premium</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Everything you need for secure, controlled location sharing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const borderColor = {
                cyan: "border-cyan-500/20 hover:border-cyan-500/40",
                purple: "border-purple-500/20 hover:border-purple-500/40",
                pink: "border-pink-500/20 hover:border-pink-500/40",
                green: "border-green-500/20 hover:border-green-500/40",
              };
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className={`border ${borderColor[feature.color as keyof typeof borderColor]} h-full`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${borderColor[feature.color as keyof typeof borderColor].replace("border", "bg")} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
            <span className="font-display font-bold">NEONTRACE</span>
          </div>
          <p className="text-xs text-text-muted">© 2026 NEONTRACE. Your people. Your places. Your world — live.</p>
          <div className="flex gap-4 text-sm text-text-muted">
            <a href="/privacy" className="hover:text-text-primary transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-text-primary transition-colors">Terms</a>
            <a href="/security" className="hover:text-text-primary transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
