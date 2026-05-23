import { createFileRoute } from "@tanstack/react-router";
import { Flame, Apple, ShoppingBasket, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GlassCard, SectionHeader } from "@/components/ui/glass-card";
import { useTodayDiet, useGrocery } from "@/hooks/useDashboard";
import { mockDiet } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/diet")({
  head: () => ({ meta: [{ title: "Diet — AIFit" }] }),
  component: DietPage,
});

function DietPage() {
  const { data } = useTodayDiet();
  const { data: grocery } = useGrocery();
  const plan = data ?? mockDiet;

  const macroData = [
    { name: "Protein", value: plan.macros.protein * 4, color: "oklch(0.78 0.18 155)" },
    { name: "Carbs", value: plan.macros.carbs * 4, color: "oklch(0.70 0.20 200)" },
    { name: "Fat", value: plan.macros.fat * 9, color: "oklch(0.70 0.20 290)" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-primary">Nutrition</p>
        <h1 className="font-display text-3xl font-semibold mt-1">AI Diet Planner</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Today's meal plan" subtitle={`${plan.total_calories} kcal · ${plan.meals.length} meals`}
            action={<button className="text-sm flex items-center gap-1.5 text-primary"><RefreshCw className="size-3.5" /> Regenerate</button>} />
          <ol className="relative space-y-3 ml-3 border-l border-border pl-6">
            {plan.meals.map((m) => (
              <li key={m.id} className="relative">
                <span className="absolute -left-[31px] top-2 size-3 rounded-full bg-gradient-primary shadow-glow" />
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.type} · {m.time}</div>
                      <div className="font-display font-semibold mt-1">{m.name}</div>
                      <div className="text-xs text-muted-foreground mt-1.5">{m.ingredients.join(" · ")}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-primary font-semibold"><Flame className="size-3.5" /> {m.calories}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        P{m.macros.protein} · C{m.macros.carbs} · F{m.macros.fat}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <SectionHeader title="Macros" subtitle={`${plan.total_calories} kcal target`} />
            <div className="h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={macroData} dataKey="value" innerRadius={50} outerRadius={75} stroke="none">
                    {macroData.map((m) => <Cell key={m.name} fill={m.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {macroData.map((m) => (
                <div key={m.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: m.color }} /> {m.name}
                  </span>
                  <span className="text-muted-foreground">{Math.round(m.value)} kcal</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeader title="Grocery list" subtitle="This week" />
            <div className="space-y-2">
              {(grocery?.items ?? [
                { name: "Chicken breast", qty: "1 kg" },
                { name: "Greek yogurt", qty: "500 g" },
                { name: "Quinoa", qty: "500 g" },
                { name: "Salmon", qty: "400 g" },
                { name: "Spinach", qty: "300 g" },
                { name: "Berries", qty: "250 g" },
              ]).map((it, i) => (
                <label key={i} className="flex items-center gap-3 text-sm">
                  <input type="checkbox" className="rounded accent-primary" />
                  <span className="flex-1">{it.name}</span>
                  <span className="text-muted-foreground text-xs">{it.qty}</span>
                </label>
              ))}
            </div>
            <button className="mt-4 w-full rounded-xl glass-strong px-4 py-2 text-sm flex items-center justify-center gap-2">
              <ShoppingBasket className="size-4" /> Export list
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
