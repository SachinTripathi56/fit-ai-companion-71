// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { DietPlan } from "@/types";

export const dietService = {
  today: () => api.get<DietPlan>(endpoints.diet.today),
  week: () => api.get<DietPlan[]>(endpoints.diet.week),
  grocery: () => api.get<{ items: { name: string; qty: string }[] }>(endpoints.diet.grocery),
  generate: () => api.post<DietPlan>(endpoints.diet.generate),
  replaceMeal: (mealId: string) =>
    api.post<{ ok: true }>(endpoints.diet.replace, { meal_id: mealId }),
};
