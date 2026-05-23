// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { OnboardingPayload, User } from "@/types";

export const userService = {
  getProfile: () => api.get<User>(endpoints.user.profile),
  updateProfile: (p: Partial<User>) => api.put<User>(endpoints.user.updateProfile, p),
  submitOnboarding: (p: OnboardingPayload) =>
    api.post<{ ok: true }>(endpoints.user.onboarding, p),
};
