import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { mockUser } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AIFit" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const setSession = useAuthStore((s) => s.setSession);
  const [email, setEmail] = useState("demo@aifit.app");
  const [password, setPassword] = useState("demo1234");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); setErr(null);
    try {
      await login.mutateAsync({ email, password });
      navigate({ to: "/dashboard" });
    } catch {
      // Backend not connected yet — sign in with mock session so UI is explorable.
      setSession(mockUser, "mock.access.token", "mock.refresh.token");
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your program.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
        <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="rounded accent-primary" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <button
          type="submit" disabled={login.isPending}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-medium text-primary-foreground shadow-glow disabled:opacity-60"
        >
          {login.isPending ? <Loader2 className="size-4 animate-spin" /> : <>Sign in <ArrowRight className="size-4" /></>}
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-muted-foreground">
        New here? <Link to="/register" className="text-primary hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative items-end p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-30" />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-aurora)" }} />
        <div className="relative z-10 max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">AI<span className="text-gradient">Fit</span></span>
          </Link>
          <h2 className="font-display text-4xl font-semibold leading-tight">
            Your AI coach is ready when you are.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Workouts, nutrition and recovery — all engineered around you.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-8 w-full max-w-md shadow-elegant"
        >
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

export function Field({
  icon: Icon, type = "text", placeholder, value, onChange,
}: {
  icon: any; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 glass rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
      <Icon className="size-4 text-muted-foreground" />
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </label>
  );
}
