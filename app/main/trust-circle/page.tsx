"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TopNav } from "@/components/dashboard/TopNav";
import { NeonButton } from "@/components/ui/NeonButton";
import { TrustCircleCard } from "@/components/dashboard/TrustCircleCard";
import { UserAvatar } from "@/components/ui/UserAvatar";
import type { User } from "@/types";
import { Plus, Eye } from "lucide-react";

const DEMO_CONTACTS: User[] = [
  { id: "1", name: "Amina", status: "live", distance: 120, battery: 84 },
  { id: "2", name: "Marcus", status: "live", distance: 340, battery: 67 },
  { id: "3", name: "Sofia", status: "away", distance: 890, battery: 45 },
  { id: "4", name: "Kai", status: "ghost", distance: 1200, battery: 92 },
];

export default function TrustCirclePage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<User[]>(DEMO_CONTACTS);
  const [showAdd, setShowAdd] = useState(false);

  const remove = (id: string) => setContacts((c) => c.filter((x) => x.id !== id));
  const block = (id: string) => setContacts((c) => c.map((x) => (x.id === id ? { ...x, isBlocked: true } : x)));

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <TopNav currentPage="people" onNavigate={(p) => router.push(p === "people" ? "/main/people" : `/main/${p}`)} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold">Trust Circle</h1>
              <p className="text-text-muted text-sm">{contacts.filter((c) => !c.isBlocked).length} active contacts</p>
            </div>
            <NeonButton size="sm" variant="primary" onClick={() => setShowAdd(!showAdd)}>
              <Plus className="w-4 h-4" /> Add
            </NeonButton>
          </div>

          {showAdd && (
            <GlassCard className="mb-6">
              <p className="text-sm text-text-secondary mb-3">Invite someone to your trust circle</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Username or email" className="flex-1 px-4 py-2 bg-bg-primary border border-white/10 rounded-xl outline-none text-sm text-text-primary placeholder:text-text-muted" />
                <NeonButton size="sm">Send Invite</NeonButton>
              </div>
            </GlassCard>
          )}

          <div className="space-y-4">
            {contacts.filter((c) => !c.isBlocked).map((contact) => (
              <TrustCircleCard
                key={contact.id}
                user={contact}
                onRemove={() => remove(contact.id)}
                onBlock={() => block(contact.id)}
                onShare={() => router.push("/main/share")}
                onMessage={() => {}}
              />
            ))}
            {contacts.filter((c) => c.isBlocked).length > 0 && (
              <>
                <h3 className="font-display font-semibold text-sm text-text-muted pt-4">Blocked ({contacts.filter((c) => c.isBlocked).length})</h3>
                {contacts.filter((c) => c.isBlocked).map((blocked) => (
                  <GlassCard key={blocked.id} className="opacity-50">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={blocked} size="sm" showStatus={false} />
                      <div>
                        <p className="font-medium text-sm">{blocked.name}</p>
                        <p className="text-xs text-text-muted">Blocked</p>
                      </div>
                      <button onClick={() => block(blocked.id)} className="ml-auto text-sm text-text-muted hover:text-text-primary flex items-center gap-1">
                        <Eye className="w-4 h-4" /> Unblock
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
