// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { AuthResponse, User } from "@/types";

export const authService = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>(endpoints.auth.login, { email, password }),
  register: (payload: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>(endpoints.auth.register, payload),
  forgotPassword: (email: string) =>
    api.post<{ ok: true }>(endpoints.auth.forgotPassword, { email }),
  me: () => api.get<User>(endpoints.auth.me),
  logout: () => api.post<{ ok: true }>(endpoints.auth.logout),
};
