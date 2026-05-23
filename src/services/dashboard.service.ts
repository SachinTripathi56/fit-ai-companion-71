// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { DashboardOverview } from "@/types";

export const dashboardService = {
  overview: () => api.get<DashboardOverview>(endpoints.dashboard.overview),
};
