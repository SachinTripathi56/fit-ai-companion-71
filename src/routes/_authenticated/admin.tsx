import { createFileRoute } from "@tanstack/react-router";
import { Users, Dumbbell, Salad, Bell, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useAdminAnalytics, useAdminUsers } from "@/hooks/useDashboard";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — AIFit" }] }),
  component: AdminPage,
});

const mockAnalytics = {
  total_users: 12480, active_users: 8721, workouts_generated: 41205,
  meals_planned: 38990, revenue: 28450,
  growth: Array.from({ length: 12 }, (_, i) => ({ date: `M${i + 1}`, users: 200 + i * 90 + Math.round(Math.random() * 80) })),
};

function AdminPage() {
  const { data } = useAdminAnalytics();
  const { data: users } = useAdminUsers();
  const a = data ?? mockAnalytics;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-accent">Admin</p>
        <h1 className="font-display text-3xl font-semibold mt-1">Platform overview</h1>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI icon={Users} label="Total users" value={a.total_users.toLocaleString()} />
        <KPI icon={TrendingUp} label="Active" value={a.active_users.toLocaleString()} />
        <KPI icon={Dumbbell} label="Workouts" value={a.workouts_generated.toLocaleString()} />
        <KPI icon={Salad} label="Meals planned" value={a.meals_planned.toLocaleString()} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="User growth" subtitle="Last 12 months" />
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={a.growth}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.20 290)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.70 0.20 290)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="date" stroke="oklch(0.7 0.03 256)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.03 256)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.2 0.025 262 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="users" stroke="oklch(0.70 0.20 290)" strokeWidth={2} fill="url(#ga)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeader title="Quick actions" />
          <div className="space-y-2 text-sm">
            {[
              { icon: Users, label: "Manage users" },
              { icon: Dumbbell, label: "Exercise database" },
              { icon: Salad, label: "Food database" },
              { icon: Bell, label: "Send notification" },
            ].map((it) => {
              const Icon = it.icon;
              return (
                <button key={it.label} className="w-full glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/5">
                  <Icon className="size-4 text-accent" /> {it.label}
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <SectionHeader title="Recent users" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Email</th><th className="py-2 pr-4">Role</th><th className="py-2">Status</th></tr>
            </thead>
            <tbody>
              {(users ?? [
                { id: "1", name: "Alex Morgan", email: "alex@example.com", role: "user", onboarded: true },
                { id: "2", name: "Priya Sharma", email: "priya@example.com", role: "user", onboarded: true },
                { id: "3", name: "Coach Sam", email: "sam@aifit.app", role: "coach", onboarded: true },
              ] as any[]).map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="py-3 pr-4 font-medium">{u.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{u.email}</td>
                  <td className="py-3 pr-4 capitalize">{u.role}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

function KPI({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <div className="size-8 rounded-lg bg-accent/15 text-accent grid place-items-center"><Icon className="size-4" /></div>
      </div>
      <div className="mt-3 font-display text-2xl font-semibold">{value}</div>
    </GlassCard>
  );
}
