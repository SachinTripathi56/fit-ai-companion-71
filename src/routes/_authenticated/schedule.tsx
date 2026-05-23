import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell, Salad, Droplets, Moon, Sun, Check } from "lucide-react";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useTodaySchedule } from "@/hooks/useDashboard";
import { mockSchedule } from "@/lib/mock-data";
import type { ScheduleItem } from "@/types";

export const Route = createFileRoute("/_authenticated/schedule")({
  head: () => ({ meta: [{ title: "Schedule — AIFit" }] }),
  component: SchedulePage,
});

const iconFor: Record<ScheduleItem["type"], any> = {
  workout: Dumbbell, meal: Salad, hydration: Droplets, sleep: Moon, habit: Sun,
};

function SchedulePage() {
  const { data } = useTodaySchedule();
  const items = data ?? mockSchedule;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-primary">Today</p>
        <h1 className="font-display text-3xl font-semibold mt-1">Your adaptive schedule</h1>
      </header>

      <GlassCard>
        <SectionHeader title="Timeline" subtitle="Drag-to-reschedule coming with backend" />
        <ol className="relative space-y-3 ml-3 border-l border-border pl-6">
          {items.map((it) => {
            const Icon = iconFor[it.type];
            return (
              <li key={it.id} className="relative">
                <span className={`absolute -left-[31px] top-3 size-3 rounded-full shadow-glow ${it.completed ? "bg-primary" : "bg-white/10"}`} />
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                  <div className={`size-10 rounded-xl grid place-items-center shrink-0 ${it.completed ? "bg-primary/15 text-primary" : "bg-white/5 text-muted-foreground"}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold">{it.title}</div>
                    <div className="text-xs text-muted-foreground capitalize">{it.type} · {it.start}–{it.end}</div>
                  </div>
                  {it.completed ? (
                    <span className="size-8 rounded-full bg-primary/20 grid place-items-center">
                      <Check className="size-4 text-primary" />
                    </span>
                  ) : (
                    <button className="rounded-lg glass-strong px-3 py-1.5 text-xs font-medium">Mark done</button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </GlassCard>
    </div>
  );
}
