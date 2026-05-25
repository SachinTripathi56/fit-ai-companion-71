// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { DietPlan } from "@/types";

export const dietService = {
  today: () => api.get<DietPlan>(endpoints.diet.today),
  week: () => api.get<DietPlan[]>(endpoints.diet.week),
  grocery: () => api.get<{ items: { name: string; qty: string }[] }>(endpoints.diet.grocery),
  generate: (options?: { plan_name?: string; days?: number; calorie_override?: number; budget_preference?: string; cuisine_preference?: string }) =>
    api.post<DietPlan>(endpoints.diet.generate, options ?? {}),
  replaceMeal: (mealId: string) =>
    api.post<{ ok: true }>(endpoints.diet.replace, { meal_id: mealId }),
  logMeal: (mealId: string) =>
    api.post<{ success: boolean }>(`${endpoints.diet.logMeal}?meal_id=${mealId}`),
};
