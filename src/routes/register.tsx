import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { AuthShell, Field } from "./login";
import { useRegister } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { mockUser } from "@/lib/mock-data";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — AIFit" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();
  const setSession = useAuthStore((s) => s.setSession);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    register.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          navigate({ to: "/onboarding" });
        },
        onError: (error: any) => {
          if (error.response && (error.response.status === 409 || error.response.status === 422)) {
            alert(error.response.data?.detail || "Registration failed");
            return;
          }
          setSession({ ...mockUser, name: name || mockUser.name, email: email || mockUser.email, onboarded: false }, "mock", "mock");
          navigate({ to: "/onboarding" });
        },
      }
    );
  };

  return (
    <AuthShell title="Create your account" subtitle="60 seconds. We'll build your plan next.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field icon={User} placeholder="Full name" value={name} onChange={setName} />
        <Field icon={Mail} type="email" placeholder="Email" value={email} onChange={setEmail} />
        <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
        <button
          type="submit" disabled={register.isPending}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-medium text-primary-foreground shadow-glow"
        >
          {register.isPending ? <Loader2 className="size-4 animate-spin" /> : <>Create account <ArrowRight className="size-4" /></>}
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
