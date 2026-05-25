// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Exercise, WorkoutSession } from "@/types";

export const workoutService = {
  today: () => api.get<WorkoutSession>(endpoints.workouts.today),
  week: () => api.get<WorkoutSession[]>(endpoints.workouts.week),
  history: () => api.get<WorkoutSession[]>(endpoints.workouts.history),
  exercise: (id: string) => api.get<Exercise>(endpoints.workouts.exercise(id)),
  generate: (options?: { plan_name?: string; weeks?: number; focus_areas?: string[] }) =>
    api.post<WorkoutSession>(endpoints.workouts.generate, options ?? {}),
  complete: (id: string, data?: { duration_minutes?: number; calories_burned?: number; rating?: number; notes?: string }) =>
    api.post<{ message: string }>(endpoints.workouts.complete(id), data ?? {}),
};
