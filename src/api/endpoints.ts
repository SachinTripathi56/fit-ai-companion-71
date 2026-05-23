// Backend APIs are developed separately using FastAPI.
// Centralized endpoint registry — single source of truth for every URL.

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
  "/api";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    me: "/auth/me",
  },
  user: {
    profile: "/user/profile",
    updateProfile: "/user/profile",
    onboarding: "/user/onboarding",
    preferences: "/user/preferences",
  },
  workouts: {
    generate: "/workouts/generate",
    today: "/workouts/today",
    week: "/workouts/week",
    history: "/workouts/history",
    exercise: (id: string) => `/workouts/exercises/${id}`,
    complete: (id: string) => `/workouts/${id}/complete`,
  },
  diet: {
    generate: "/diet/generate",
    today: "/diet/today",
    week: "/diet/week",
    grocery: "/diet/grocery",
    replace: "/diet/replace-meal",
    logMeal: "/diet/log",
  },
  chat: {
    message: "/chat/message",
    stream: "/chat/stream",
    history: "/chat/history",
    session: (id: string) => `/chat/sessions/${id}`,
    suggestions: "/chat/suggestions",
  },
  schedule: {
    today: "/schedule/today",
    week: "/schedule/week",
    update: "/schedule/update",
    reschedule: "/schedule/reschedule",
  },
  progress: {
    summary: "/progress/summary",
    log: "/progress/log",
    weight: "/progress/weight",
    measurements: "/progress/measurements",
    photos: "/progress/photos",
    uploadPhoto: "/progress/photos/upload",
  },
  dashboard: {
    overview: "/dashboard/overview",
    insights: "/dashboard/insights",
  },
  admin: {
    users: "/admin/users",
    workouts: "/admin/workouts",
    foods: "/admin/foods",
    analytics: "/admin/analytics",
    notifications: "/admin/notifications",
  },
} as const;
