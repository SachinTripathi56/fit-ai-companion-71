// Backend APIs are developed separately using FastAPI.
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { workoutService } from "@/services/workout.service";
import { dietService } from "@/services/diet.service";
import { scheduleService } from "@/services/schedule.service";
import { progressService } from "@/services/progress.service";
import { chatService } from "@/services/chat.service";
import { adminService } from "@/services/admin.service";

export const useOverview = () =>
  useQuery({ queryKey: ["dashboard", "overview"], queryFn: dashboardService.overview });

export const useTodayWorkout = () =>
  useQuery({ queryKey: ["workouts", "today"], queryFn: workoutService.today });

export const useWeekWorkouts = () =>
  useQuery({ queryKey: ["workouts", "week"], queryFn: workoutService.week });

export const useTodayDiet = () =>
  useQuery({ queryKey: ["diet", "today"], queryFn: dietService.today });

export const useGrocery = () =>
  useQuery({ queryKey: ["diet", "grocery"], queryFn: dietService.grocery });

export const useTodaySchedule = () =>
  useQuery({ queryKey: ["schedule", "today"], queryFn: scheduleService.today });

export const useProgressSummary = () =>
  useQuery({ queryKey: ["progress", "summary"], queryFn: progressService.summary });

export const useChatHistory = () =>
  useQuery({ queryKey: ["chat", "history"], queryFn: chatService.history });

export const useChatSuggestions = () =>
  useQuery({ queryKey: ["chat", "suggestions"], queryFn: chatService.suggestions });

export const useAdminAnalytics = () =>
  useQuery({ queryKey: ["admin", "analytics"], queryFn: adminService.analytics });

export const useAdminUsers = () =>
  useQuery({ queryKey: ["admin", "users"], queryFn: adminService.users });
