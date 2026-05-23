import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell, Clock, Flame, Check, Play, Home, Building2 } from "lucide-react";
import { useState } from "react";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useTodayWorkout, useWeekWorkouts } from "@/hooks/useDashboard";
import { mockWorkout } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/workouts")({
  head: () => ({ meta: [{ title: "Workouts — AIFit" }] }),
  component: WorkoutsPage,
});

function WorkoutsPage() {
  const { data } = useTodayWorkout();
  const { data: week } = useWeekWorkouts();
  const workout = data ?? mockWorkout;
  const [tab, setTab] = useState<"today" | "week" | "history">("today");
  const [place, setPlace] = useState<"gym" | "home">("gym");

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Training</p>
          <h1 className="font-display text-3xl font-semibold mt-1">AI Workout Planner</h1>
        </div>
        <div className="glass rounded-xl p-1 flex">
          {(["gym", "home"] as const).map((p) => (
            <button key={p} onClick={() => setPlace(p)}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 capitalize ${place === p ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
              {p === "gym" ? <Building2 className="size-3.5" /> : <Home className="size-3.5" />}{p}
            </button>
          ))}
        </div>
      </header>

      <div className="glass rounded-xl p-1 inline-flex">
        {(["today", "week", "history"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm capitalize ${tab === t ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "today" && (
        <>
          <GlassCard>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">{workout.focus}</div>
                <h2 className="font-display text-2xl font-semibold mt-1">{workout.title}</h2>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="size-4" /> {workout.estimated_minutes} min</span>
                  <span className="flex items-center gap-1.5"><Flame className="size-4" /> ~{workout.calories_burn} kcal</span>
                  <span className="flex items-center gap-1.5"><Dumbbell className="size-4" /> {workout.exercises.length} exercises</span>
                </div>
              </div>
              <button className="rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow inline-flex items-center gap-2">
                <Play className="size-4" /> Start workout
              </button>
            </div>
          </GlassCard>

          <Section title="Warm-up" items={workout.warmup} tone="muted" />
          <Section title="Main set" items={workout.exercises} tone="primary" />
          <Section title="Cool-down" items={workout.cooldown} tone="muted" />
        </>
      )}

      {tab === "week" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(week ?? Array.from({ length: 6 }, (_, i) => ({ ...mockWorkout, id: `w${i}`, title: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"][i] + " Day", completed: i < 3 }))).map((w) => (
            <GlassCard key={w.id}>
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{w.focus}</div>
                {w.completed && <div className="size-6 rounded-full bg-primary/20 grid place-items-center"><Check className="size-3 text-primary" /></div>}
              </div>
              <div className="font-display text-lg font-semibold mt-2">{w.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{w.estimated_minutes} min · {w.exercises.length} exercises</div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "history" && (
        <GlassCard><p className="text-sm text-muted-foreground">Your completed workouts will appear here once the backend is connected.</p></GlassCard>
      )}
    </div>
  );
}

function Section({ title, items, tone }: { title: string; items: typeof mockWorkout.exercises; tone: "primary" | "muted" }) {
  if (!items.length) return null;
  return (
    <div>
      <SectionHeader title={title} />
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((ex) => (
          <GlassCard key={ex.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{ex.muscle_group} · {ex.equipment}</div>
                <div className="font-display font-semibold mt-1 truncate">{ex.name}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {ex.sets} × {ex.reps} · rest {ex.rest_seconds}s
                </div>
              </div>
              <DifficultyBadge level={ex.difficulty} tone={tone} />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function DifficultyBadge({ level, tone }: { level: "easy" | "medium" | "hard"; tone: "primary" | "muted" }) {
  const colors = {
    easy: "bg-primary/15 text-primary",
    medium: "bg-warning/15 text-warning",
    hard: "bg-destructive/15 text-destructive",
  };
  if (tone === "muted") return <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground capitalize">{level}</span>;
  return <span className={`text-xs px-2 py-1 rounded-md capitalize ${colors[level]}`}>{level}</span>;
}
