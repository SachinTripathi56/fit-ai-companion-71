// Backend APIs are developed separately using FastAPI.
// Temporary in-memory mock data so the UI renders before the FastAPI backend is wired up.
// All real reads go through the API service layer; this only fills useQuery defaults via fallback.

import type {
  ChatSession, DashboardOverview, DietPlan, ScheduleItem,
  User, WorkoutSession,
} from "@/types";

export const mockUser: User = {
  id: "u_demo", email: "demo@aifit.app", name: "Alex Morgan",
  role: "user", avatar_url: undefined, onboarded: true,
};

export const mockOverview: DashboardOverview = {
  weight: [
    { date: "W1", value: 82 }, { date: "W2", value: 81.4 },
    { date: "W3", value: 80.7 }, { date: "W4", value: 80.1 },
    { date: "W5", value: 79.6 }, { date: "W6", value: 79.0 },
    { date: "W7", value: 78.4 }, { date: "W8", value: 77.9 },
  ],
  calories_today: 1840, calories_target: 2200,
  water_ml: 1800, water_target_ml: 3000,
  steps: 7420, steps_target: 10000,
  sleep_hours: 7.2, workout_completion_pct: 78,
  weekly_workouts: [
    { day: "Mon", completed: 1, target: 1 }, { day: "Tue", completed: 1, target: 1 },
    { day: "Wed", completed: 0, target: 1 }, { day: "Thu", completed: 1, target: 1 },
    { day: "Fri", completed: 1, target: 1 }, { day: "Sat", completed: 0, target: 1 },
    { day: "Sun", completed: 0, target: 0 },
  ],
  insights: [
    { id: "i1", title: "Recovery looks great", body: "HRV up 8% this week — push intensity by ~5%.", tone: "positive" },
    { id: "i2", title: "Protein under target", body: "Avg 1.4g/kg. Target 1.8g/kg for muscle goal.", tone: "warning" },
    { id: "i3", title: "Sleep consistency", body: "Bedtime within 30min — keep it up for adaptation.", tone: "neutral" },
  ],
};

export const mockWorkout: WorkoutSession = {
  id: "w_today", date: new Date().toISOString(),
  title: "Push Day — Chest & Triceps", focus: "Hypertrophy",
  estimated_minutes: 55, calories_burn: 420, completed: false,
  warmup: [
    { id: "wu1", name: "Arm circles", muscle_group: "shoulders", equipment: "bodyweight", sets: 1, reps: "30s", rest_seconds: 0, difficulty: "easy" },
    { id: "wu2", name: "Band pull-aparts", muscle_group: "back", equipment: "band", sets: 2, reps: "15", rest_seconds: 30, difficulty: "easy" },
  ],
  exercises: [
    { id: "e1", name: "Barbell Bench Press", muscle_group: "chest", equipment: "barbell", sets: 4, reps: "6-8", rest_seconds: 120, difficulty: "hard" },
    { id: "e2", name: "Incline Dumbbell Press", muscle_group: "chest", equipment: "dumbbell", sets: 3, reps: "10", rest_seconds: 90, difficulty: "medium" },
    { id: "e3", name: "Cable Fly", muscle_group: "chest", equipment: "cable", sets: 3, reps: "12", rest_seconds: 60, difficulty: "medium" },
    { id: "e4", name: "Tricep Rope Pushdown", muscle_group: "triceps", equipment: "cable", sets: 3, reps: "12", rest_seconds: 60, difficulty: "easy" },
    { id: "e5", name: "Overhead Tricep Extension", muscle_group: "triceps", equipment: "dumbbell", sets: 3, reps: "10", rest_seconds: 60, difficulty: "medium" },
  ],
  cooldown: [
    { id: "cd1", name: "Chest stretch", muscle_group: "chest", equipment: "bodyweight", sets: 1, reps: "45s", rest_seconds: 0, difficulty: "easy" },
  ],
};

export const mockDiet: DietPlan = {
  date: new Date().toISOString(),
  total_calories: 2180, water_target_ml: 3000,
  macros: { protein: 165, carbs: 230, fat: 65 },
  meals: [
    { id: "m1", name: "Greek yogurt bowl", type: "breakfast", time: "08:00", calories: 420, macros: { protein: 32, carbs: 48, fat: 10 }, ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"] },
    { id: "m2", name: "Grilled chicken & quinoa", type: "lunch", time: "13:00", calories: 640, macros: { protein: 52, carbs: 70, fat: 18 }, ingredients: ["Chicken breast", "Quinoa", "Spinach", "Olive oil"] },
    { id: "m3", name: "Protein shake + banana", type: "snack", time: "17:00", calories: 320, macros: { protein: 30, carbs: 42, fat: 5 }, ingredients: ["Whey", "Banana", "Almond milk"] },
    { id: "m4", name: "Salmon, rice & broccoli", type: "dinner", time: "20:30", calories: 800, macros: { protein: 51, carbs: 70, fat: 32 }, ingredients: ["Salmon", "Brown rice", "Broccoli", "Lemon"] },
  ],
};

export const mockSchedule: ScheduleItem[] = [
  { id: "s1", type: "habit", title: "Wake up & hydrate", start: "06:30", end: "06:45", completed: true },
  { id: "s2", type: "meal", title: "Breakfast", start: "08:00", end: "08:30", completed: true },
  { id: "s3", type: "workout", title: "Push Day", start: "10:00", end: "11:00", completed: false },
  { id: "s4", type: "meal", title: "Lunch", start: "13:00", end: "13:30", completed: false },
  { id: "s5", type: "hydration", title: "1L water", start: "15:00", end: "15:05", completed: false },
  { id: "s6", type: "meal", title: "Dinner", start: "20:30", end: "21:00", completed: false },
  { id: "s7", type: "sleep", title: "Sleep", start: "23:00", end: "06:30", completed: false },
];

export const mockChatSessions: ChatSession[] = [
  {
    id: "c1", title: "How to break a plateau", created_at: new Date().toISOString(),
    messages: [
      { id: "m1", role: "user", content: "I've been stuck at 80kg bench for weeks.", created_at: new Date().toISOString() },
      { id: "m2", role: "assistant", content: "Plateaus usually come from stagnant volume. Let's add a heavy/light split and one accessory variation.", created_at: new Date().toISOString() },
    ],
  },
  { id: "c2", title: "Best post-workout meal", created_at: new Date(Date.now() - 86400000).toISOString(), messages: [] },
  { id: "c3", title: "Sleep & recovery tips", created_at: new Date(Date.now() - 2 * 86400000).toISOString(), messages: [] },
];
