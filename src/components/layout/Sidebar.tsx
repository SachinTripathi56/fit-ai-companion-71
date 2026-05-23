import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Dumbbell, Salad, MessageSquare, Calendar,
  TrendingUp, Settings, Shield, LogOut, Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/diet", label: "Diet", icon: Salad },
  { to: "/coach", label: "AI Coach", icon: MessageSquare },
  { to: "/schedule", label: "Schedule", icon: Calendar },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-4 p-4 sticky top-0 h-screen">
      <Link to="/dashboard" className="flex items-center gap-2 px-2 pt-2 pb-4">
        <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
          <Sparkles className="size-5 text-primary-foreground" />
        </div>
        <div className="font-display text-lg font-semibold tracking-tight">
          AI<span className="text-gradient">Fit</span>
        </div>
      </Link>

      <nav className="glass rounded-2xl p-2 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {nav.map((n) => {
            const active = path.startsWith(n.to);
            const Icon = n.icon;
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                    active
                      ? "bg-primary/15 text-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{n.label}</span>
                </Link>
              </li>
            );
          })}
          {user?.role === "admin" && (
            <li>
              <Link
                to="/admin"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                  path.startsWith("/admin")
                    ? "bg-accent/15 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                <Shield className="size-4" />
                <span>Admin</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="glass rounded-2xl p-3 flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-semibold">
          {user?.name?.[0] ?? "A"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{user?.name ?? "Guest"}</div>
          <div className="text-xs text-muted-foreground truncate">{user?.email ?? "—"}</div>
        </div>
        <button
          onClick={logout}
          className="size-9 rounded-xl hover:bg-white/5 grid place-items-center text-muted-foreground hover:text-foreground"
          aria-label="Log out"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </aside>
  );
}
