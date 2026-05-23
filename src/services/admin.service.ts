// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { User } from "@/types";

export const adminService = {
  users: () => api.get<User[]>(endpoints.admin.users),
  analytics: () =>
    api.get<{
      total_users: number;
      active_users: number;
      workouts_generated: number;
      meals_planned: number;
      revenue: number;
      growth: { date: string; users: number }[];
    }>(endpoints.admin.analytics),
};
