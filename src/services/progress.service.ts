// Backend APIs are developed separately using FastAPI.
import { api, apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { ProgressPoint } from "@/types";

export const progressService = {
  summary: () =>
    api.get<{
      current_weight: number | null;
      starting_weight: number | null;
      weight_change: number | null;
      goal_weight: number | null;
      progress_percentage: number | null;
      avg_daily_steps: number | null;
      avg_sleep_hours: number | null;
      avg_water_intake_ml: number | null;
      workouts_this_week: number;
      streak_days: number;
      total_workouts: number;
    }>(endpoints.progress.summary),
  weight: (days?: number) =>
    api.get<{ date: string; weight_kg: number }[]>(
      `${endpoints.progress.weight}${days ? `?days=${days}` : ""}`
    ),
  logWeight: (weight_kg: number) =>
    api.post(endpoints.progress.log, { weight_kg }),
  logProgress: (data: {
    weight_kg?: number;
    steps?: number;
    calories_consumed?: number;
    water_intake_ml?: number;
    sleep_hours?: number;
    mood?: number;
    energy_level?: number;
    workout_completed?: boolean;
    notes?: string;
  }) =>
    api.post(endpoints.progress.log, data),
  measurements: (days?: number) =>
    api.get(
      `${endpoints.progress.measurements}${days ? `?days=${days}` : ""}`
    ),
  photos: () => api.get(endpoints.progress.photos),
  uploadPhoto: (file: File, photo_type?: string) => {
    const form = new FormData();
    form.append("file", file);
    return apiClient
      .post<{ message: string }>(
        `${endpoints.progress.uploadPhoto}${photo_type ? `?photo_type=${photo_type}` : ""}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((r) => r.data);
  },
};
