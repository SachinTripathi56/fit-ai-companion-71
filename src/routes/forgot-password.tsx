import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthShell, Field } from "./login";
import { useForgotPassword } from "@/hooks/useAuth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — AIFit" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const m = useForgotPassword();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try { await m.mutateAsync(email); } catch { /* mock */ }
    setSent(true);
  };

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a reset link.">
      {sent ? (
        <div className="text-center py-6">
          <CheckCircle2 className="size-10 text-primary mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">
            If <b>{email}</b> exists, a reset link is on the way.
          </p>
          <Link to="/login" className="mt-6 inline-block text-sm text-primary hover:underline">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field icon={Mail} type="email" placeholder="Your email" value={email} onChange={setEmail} />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-medium text-primary-foreground shadow-glow"
          >
            Send reset link <ArrowRight className="size-4" />
          </button>
        </form>
      )}
    </AuthShell>
  );
}
