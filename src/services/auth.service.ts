// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { tokenStorage } from "@/api/client";
import type { AuthResponse, User } from "@/types";

export const authService = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>(endpoints.auth.login, { email, password }),
  register: (payload: { name: string; email: string; password: string }) => {
    const emailPrefix = payload.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const username = emailPrefix.length >= 3 ? emailPrefix : `${emailPrefix}user`;
    return api.post<AuthResponse>(endpoints.auth.register, {
      email: payload.email,
      username: username,
      password: payload.password,
      full_name: payload.name,
    });
  },
  forgotPassword: (email: string) =>
    api.post<{ message: string }>(endpoints.auth.forgotPassword, { email }),
  me: () => api.get<User>(endpoints.auth.me),
  logout: () => {
    const refreshToken = tokenStorage.getRefresh();
    return api.post<{ message: string }>(endpoints.auth.logout, {
      refresh_token: refreshToken || "",
    });
  },
};
