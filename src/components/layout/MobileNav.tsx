import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Dumbbell, Salad, MessageSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/workouts", label: "Train", icon: Dumbbell },
  { to: "/coach", label: "Coach", icon: MessageSquare },
  { to: "/diet", label: "Diet", icon: Salad },
  { to: "/progress", label: "Stats", icon: TrendingUp },
];

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-3 inset-x-3 z-40 glass-strong rounded-2xl px-2 py-2 flex justify-between shadow-elegant">
      {items.map((i) => {
        const active = path.startsWith(i.to);
        const Icon = i.icon;
        return (
          <Link
            key={i.to}
            to={i.to}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl text-xs transition-colors",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="size-5" />
            <span>{i.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
