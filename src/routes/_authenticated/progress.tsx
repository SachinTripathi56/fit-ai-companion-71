import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Plus, Ruler } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useProgressSummary } from "@/hooks/useDashboard";
import { mockOverview } from "@/lib/mock-data";
import { progressService } from "@/services/progress.service";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({ meta: [{ title: "Progress — AIFit" }] }),
  component: ProgressPage,
});

function ProgressPage() {
  const { data } = useProgressSummary();
  const weight = data?.weight ?? mockOverview.weight;
  const [weightInput, setWeightInput] = useState("");

  const log = async () => {
    const n = Number(weightInput); if (!n) return;
    try { await progressService.logWeight(n, new Date().toISOString().slice(0, 10)); } catch {}
    setWeightInput("");
  };

  const onPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { await progressService.uploadPhoto(f); } catch {}
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-primary">Tracking</p>
        <h1 className="font-display text-3xl font-semibold mt-1">Your progress</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Weight" subtitle="Trend over time" />
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={weight}>
                <defs>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.20 290)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.70 0.20 290)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="date" stroke="oklch(0.7 0.03 256)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.03 256)" fontSize={12} domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip contentStyle={{ background: "oklch(0.2 0.025 262 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.70 0.20 290)" strokeWidth={2} fill="url(#gp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex gap-2">
            <input type="number" placeholder="Today's weight (kg)" value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="flex-1 glass rounded-xl px-4 py-2.5 text-sm bg-transparent outline-none" />
            <button onClick={log} className="rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow inline-flex items-center gap-1.5">
              <Plus className="size-4" /> Log
            </button>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <SectionHeader title="Measurements" />
            <div className="space-y-2 text-sm">
              {[
                { l: "Chest", v: "102 cm" }, { l: "Waist", v: "82 cm" },
                { l: "Arms", v: "37 cm" }, { l: "Thighs", v: "58 cm" },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="flex items-center gap-2"><Ruler className="size-3.5 text-muted-foreground" /> {r.l}</span>
                  <span className="font-display font-semibold">{r.v}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeader title="Progress photos" />
            <label className="block border-2 border-dashed border-border rounded-2xl p-6 text-center cursor-pointer hover:bg-white/5">
              <Camera className="size-6 mx-auto text-muted-foreground" />
              <div className="text-sm mt-2">Upload photo</div>
              <div className="text-xs text-muted-foreground">JPG · PNG · up to 10MB</div>
              <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
            </label>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
