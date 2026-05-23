// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Exercise, WorkoutSession } from "@/types";

export const workoutService = {
  today: () => api.get<WorkoutSession>(endpoints.workouts.today),
  week: () => api.get<WorkoutSession[]>(endpoints.workouts.week),
  history: () => api.get<WorkoutSession[]>(endpoints.workouts.history),
  exercise: (id: string) => api.get<Exercise>(endpoints.workouts.exercise(id)),
  generate: () => api.post<WorkoutSession>(endpoints.workouts.generate),
  complete: (id: string) => api.post<{ ok: true }>(endpoints.workouts.complete(id)),
};
