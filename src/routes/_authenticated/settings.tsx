import { createFileRoute } from "@tanstack/react-router";
import { User, Bell, Shield, CreditCard, LogOut } from "lucide-react";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — AIFit" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-primary">Account</p>
        <h1 className="font-display text-3xl font-semibold mt-1">Settings</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard>
          <SectionHeader title="Profile" />
          <div className="flex items-center gap-3 mb-4">
            <div className="size-14 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground text-xl font-display font-bold">
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <div className="font-display font-semibold truncate">{user?.name}</div>
              <div className="text-sm text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
          <button className="w-full rounded-xl glass-strong px-4 py-2 text-sm flex items-center justify-center gap-2">
            <User className="size-4" /> Edit profile
          </button>
        </GlassCard>

        <GlassCard>
          <SectionHeader title="Notifications" />
          {["Workout reminders", "Meal nudges", "Hydration", "Weekly summary"].map((l) => (
            <label key={l} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <span className="text-sm flex items-center gap-2"><Bell className="size-3.5 text-muted-foreground" /> {l}</span>
              <input type="checkbox" defaultChecked className="accent-primary" />
            </label>
          ))}
        </GlassCard>

        <GlassCard>
          <SectionHeader title="Security & billing" />
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 py-2"><Shield className="size-4 text-muted-foreground" /> Change password</li>
            <li className="flex items-center gap-2 py-2"><CreditCard className="size-4 text-muted-foreground" /> Manage subscription</li>
          </ul>
          <button onClick={logout}
            className="mt-4 w-full rounded-xl border border-destructive/40 text-destructive px-4 py-2 text-sm flex items-center justify-center gap-2 hover:bg-destructive/10">
            <LogOut className="size-4" /> Sign out
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
