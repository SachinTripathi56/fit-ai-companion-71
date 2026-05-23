import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Dumbbell, Salad, MessageSquare, Calendar, TrendingUp,
  ArrowRight, Activity, Brain, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Fit — Your AI fitness coach, nutritionist & lifestyle planner" },
      { name: "description", content: "Personalized AI workouts, diet plans, smart schedules and a 24/7 coach. Built for real results." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Dumbbell, title: "AI Workout Planner", body: "Adaptive splits with progressive overload, tuned to your goal, equipment and recovery." },
  { icon: Salad, title: "AI Diet Engine", body: "Macro-perfect meal plans with grocery lists. Indian, vegan, keto, jain — all covered." },
  { icon: MessageSquare, title: "AI Coach 24/7", body: "Conversational coaching that remembers your context. Ask anything, anytime." },
  { icon: Calendar, title: "Smart Schedule", body: "Wake, train, eat, recover — your day, replanned automatically when life gets in the way." },
  { icon: TrendingUp, title: "Progress Intelligence", body: "Beautiful analytics, plateau detection, and recommendations that actually move the needle." },
  { icon: Brain, title: "Personal Memory", body: "The system remembers your injuries, prefs, and patterns — so every plan keeps getting smarter." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold">AI<span className="text-gradient">Fit</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-sm px-4 py-2 text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow"
          >
            Start free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-12 lg:pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6">
            <Zap className="size-3.5 text-primary" />
            Built with adaptive AI · Updated for 2026
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-[1.05]">
            Your personal{" "}
            <span className="text-gradient">AI coach</span>,<br />
            built for real results.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Workouts, nutrition, schedules and a 24/7 coach — engineered around your body,
            your goal and your life. No more cookie-cutter plans.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow"
            >
              Start your plan
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-medium"
            >
              I have an account
            </Link>
          </div>
        </motion.div>

        {/* Hero preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 glass-strong rounded-3xl p-4 md:p-6 max-w-5xl mx-auto shadow-elegant"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Today's plan", value: "Push Day", sub: "55 min · 420 kcal", icon: Dumbbell },
              { label: "Macros hit", value: "165g protein", sub: "On track for muscle goal", icon: Activity },
              { label: "Coach insight", value: "Push intensity +5%", sub: "Recovery looks great", icon: Brain },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="glass rounded-2xl p-5 text-left">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {c.label}
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 font-display text-2xl font-semibold">{c.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-primary mb-3">Everything you need</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">A complete operating system for your body</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow"
                >
                  <div className="size-10 rounded-xl bg-primary/15 grid place-items-center mb-4">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="px-6 lg:px-12 pb-24">
        <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <h2 className="font-display text-3xl md:text-5xl font-semibold">
            Train smarter. <span className="text-gradient">Starting today.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Free to start. No credit card. Cancel anytime.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow"
          >
            Create my plan <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="px-6 lg:px-12 py-8 text-center text-xs text-muted-foreground border-t border-border">
        © 2026 AIFit · Built for performance
      </footer>
    </div>
  );
}
