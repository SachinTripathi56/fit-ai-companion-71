import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-w-0 px-4 lg:px-8 py-6 lg:py-8 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
