import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { userService } from "@/services/user.service";
import type { OnboardingPayload } from "@/types";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your plan — AIFit" }] }),
  component: OnboardingPage,
});

const steps = ["Basics", "Goal", "Lifestyle", "Diet", "Setup"] as const;

function OnboardingPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingPayload>>({
    gender: "male", goal: "build_muscle", activity_level: "moderate",
    diet_preferences: ["omnivore"], allergies: [], medical_conditions: [],
    workout_place: "gym", equipment: ["dumbbells", "barbell"], experience: "intermediate",
    daily_schedule: { wake_time: "06:30", sleep_time: "23:00" },
    age: 28, height_cm: 178, weight_kg: 78,
  });

  const update = <K extends keyof OnboardingPayload>(k: K, v: OnboardingPayload[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const finish = async () => {
    try { await userService.submitOnboarding(data as OnboardingPayload); } catch { /* mock */ }
    if (user) setUser({ ...user, onboarded: true });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="size-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold">AI<span className="text-gradient">Fit</span></span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`size-8 rounded-full grid place-items-center text-xs font-semibold transition
                ${i <= step ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass text-muted-foreground"}`}>
                {i < step ? <Check className="size-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div className="glass-strong rounded-3xl p-8 shadow-elegant"
          key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <AnimatePresence mode="wait">
            <div key={step}>
              <h1 className="font-display text-2xl font-semibold mb-1">{steps[step]}</h1>
              <p className="text-sm text-muted-foreground mb-6">
                {step === 0 && "Tell us about your body."}
                {step === 1 && "What are you training for?"}
                {step === 2 && "Where do you stand today?"}
                {step === 3 && "How do you eat?"}
                {step === 4 && "Workout setup & schedule."}
              </p>

              {step === 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <NumberField label="Age" value={data.age!} onChange={(v) => update("age", v)} suffix="yrs" />
                  <SelectField label="Gender" value={data.gender!} onChange={(v) => update("gender", v as any)}
                    options={[["male", "Male"], ["female", "Female"], ["other", "Other"]]} />
                  <NumberField label="Height" value={data.height_cm!} onChange={(v) => update("height_cm", v)} suffix="cm" />
                  <NumberField label="Weight" value={data.weight_kg!} onChange={(v) => update("weight_kg", v)} suffix="kg" />
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {(["lose_fat", "build_muscle", "endurance", "general_health", "athletic"] as const).map((g) => (
                    <PickCard key={g} active={data.goal === g} onClick={() => update("goal", g)}
                      title={g.replace("_", " ")} />
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <SelectField label="Activity level" value={data.activity_level!}
                    onChange={(v) => update("activity_level", v as any)}
                    options={[["sedentary","Sedentary"],["light","Light"],["moderate","Moderate"],["active","Active"],["very_active","Very active"]]} />
                  <SelectField label="Experience" value={data.experience!}
                    onChange={(v) => update("experience", v as any)}
                    options={[["beginner","Beginner"],["intermediate","Intermediate"],["advanced","Advanced"]]} />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <SelectField label="Diet preference" value={data.diet_preferences![0]}
                    onChange={(v) => update("diet_preferences", [v as any])}
                    options={[["omnivore","Omnivore"],["vegetarian","Vegetarian"],["vegan","Vegan"],["keto","Keto"],["jain","Jain"],["pescatarian","Pescatarian"]]} />
                  <TextField label="Allergies (comma separated)" value={data.allergies?.join(", ") ?? ""}
                    onChange={(v) => update("allergies", v.split(",").map((x) => x.trim()).filter(Boolean))} />
                  <TextField label="Medical conditions" value={data.medical_conditions?.join(", ") ?? ""}
                    onChange={(v) => update("medical_conditions", v.split(",").map((x) => x.trim()).filter(Boolean))} />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <SelectField label="Workout location" value={data.workout_place!}
                    onChange={(v) => update("workout_place", v as any)}
                    options={[["gym","Gym"],["home","Home"],["hybrid","Both"]]} />
                  <TextField label="Equipment available" value={data.equipment?.join(", ") ?? ""}
                    onChange={(v) => update("equipment", v.split(",").map((x) => x.trim()).filter(Boolean))} />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Wake time" value={data.daily_schedule!.wake_time}
                      onChange={(v) => update("daily_schedule", { ...data.daily_schedule!, wake_time: v })} />
                    <TextField label="Sleep time" value={data.daily_schedule!.sleep_time}
                      onChange={(v) => update("daily_schedule", { ...data.daily_schedule!, sleep_time: v })} />
                  </div>
                </div>
              )}
            </div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
                Continue <ArrowRight className="size-4" />
              </button>
            ) : (
              <button onClick={finish}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
                Generate my plan <Check className="size-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string }) {
  return (
    <label className="glass rounded-xl px-4 py-3 flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-1">
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
          className="bg-transparent outline-none text-xl font-display font-semibold w-full" />
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="glass rounded-xl px-4 py-3 flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-sm" />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="glass rounded-xl px-4 py-3 flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-sm appearance-none">
        {options.map(([v, l]) => <option key={v} value={v} className="bg-background">{l}</option>)}
      </select>
    </label>
  );
}

function PickCard({ active, onClick, title }: { active: boolean; onClick: () => void; title: string }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-xl px-4 py-5 text-left capitalize transition-all
        ${active ? "bg-primary/15 ring-2 ring-primary shadow-glow" : "glass hover:bg-white/5"}`}>
      <div className="font-display font-semibold">{title}</div>
    </button>
  );
}
