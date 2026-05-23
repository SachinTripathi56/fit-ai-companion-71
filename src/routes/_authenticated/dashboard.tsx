import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Flame, Droplets, Footprints, Moon, Sparkles, TrendingDown, TrendingUp,
} from "lucide-react";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useOverview } from "@/hooks/useDashboard";
import { mockOverview } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AIFit" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data } = useOverview();
  const overview = data ?? mockOverview; // mock fallback while backend not wired
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Today</p>
          <h1 className="font-display text-3xl font-semibold mt-1">
            Hi, {user?.name?.split(" ")[0] ?? "there"} <span className="text-gradient">— let's move</span>
          </h1>
        </div>
        <div className="glass rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
          <Sparkles className="size-4 text-primary" /> Plan adapted 2h ago
        </div>
      </header>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Flame} tone="primary" label="Calories"
          value={`${overview.calories_today}`} sub={`/ ${overview.calories_target} kcal`}
          pct={overview.calories_today / overview.calories_target} />
        <StatCard icon={Droplets} tone="accent" label="Water"
          value={`${(overview.water_ml / 1000).toFixed(1)}L`} sub={`/ ${overview.water_target_ml / 1000}L`}
          pct={overview.water_ml / overview.water_target_ml} />
        <StatCard icon={Footprints} tone="primary" label="Steps"
          value={overview.steps.toLocaleString()} sub={`/ ${overview.steps_target.toLocaleString()}`}
          pct={overview.steps / overview.steps_target} />
        <StatCard icon={Moon} tone="accent" label="Sleep"
          value={`${overview.sleep_hours}h`} sub="Last night" pct={overview.sleep_hours / 8} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Weight progress" subtitle="Last 8 weeks" />
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={overview.weight}>
                <defs>
                  <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.18 155)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.78 0.18 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="date" stroke="oklch(0.7 0.03 256)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.03 256)" fontSize={12} domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip contentStyle={{ background: "oklch(0.2 0.025 262 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.78 0.18 155)" strokeWidth={2} fill="url(#gw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-primary">
            <TrendingDown className="size-4" /> -4.1 kg in 8 weeks
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeader title="Workouts this week" subtitle={`${overview.workout_completion_pct}% complete`} />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={overview.weekly_workouts}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="day" stroke="oklch(0.7 0.03 256)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.03 256)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.2 0.025 262 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Bar dataKey="completed" fill="oklch(0.78 0.18 155)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" fill="oklch(1 0 0 / 0.1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* AI Insights */}
      <GlassCard>
        <SectionHeader title="AI insights" subtitle="What your coach noticed this week" />
        <div className="grid md:grid-cols-3 gap-3">
          {overview.insights.map((ins) => (
            <motion.div key={ins.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-4">
              <div className={`text-xs uppercase tracking-widest mb-2 ${
                ins.tone === "positive" ? "text-primary" :
                ins.tone === "warning" ? "text-warning" : "text-muted-foreground"
              }`}>
                {ins.tone === "positive" ? <TrendingUp className="inline size-3 mr-1" /> :
                 ins.tone === "warning" ? <TrendingDown className="inline size-3 mr-1" /> :
                 <Sparkles className="inline size-3 mr-1" />}
                {ins.tone}
              </div>
              <div className="font-display font-semibold">{ins.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{ins.body}</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function StatCard({ icon: Icon, tone, label, value, sub, pct }: {
  icon: any; tone: "primary" | "accent"; label: string; value: string; sub: string; pct: number;
}) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <div className={`size-8 rounded-lg grid place-items-center ${tone === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-2xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full ${tone === "primary" ? "bg-gradient-primary" : "bg-accent"}`}
          style={{ width: `${Math.min(100, pct * 100)}%` }} />
      </div>
    </GlassCard>
  );
}
