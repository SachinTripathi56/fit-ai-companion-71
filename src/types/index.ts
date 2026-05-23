// Backend APIs are developed separately using FastAPI.
// Shared TypeScript contracts that mirror the expected API payloads.

export type Role = "user" | "admin" | "coach";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar_url?: string;
  onboarded: boolean;
}

export interface AuthTokens { access_token: string; refresh_token: string; }
export interface AuthResponse { user: User; tokens: AuthTokens; }

export type Gender = "male" | "female" | "other";
export type FitnessGoal = "lose_fat" | "build_muscle" | "endurance" | "general_health" | "athletic";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type DietPref = "omnivore" | "vegetarian" | "vegan" | "keto" | "jain" | "pescatarian";
export type WorkoutPlace = "gym" | "home" | "hybrid";
export type Experience = "beginner" | "intermediate" | "advanced";

export interface OnboardingPayload {
  age: number; gender: Gender; height_cm: number; weight_kg: number;
  goal: FitnessGoal; activity_level: ActivityLevel;
  diet_preferences: DietPref[]; allergies: string[]; medical_conditions: string[];
  workout_place: WorkoutPlace; equipment: string[]; experience: Experience;
  daily_schedule: { wake_time: string; sleep_time: string };
}

export interface Exercise {
  id: string; name: string; muscle_group: string; equipment: string;
  sets: number; reps: string; rest_seconds: number;
  difficulty: "easy" | "medium" | "hard"; instructions?: string; video_url?: string;
}

export interface WorkoutSession {
  id: string; date: string; title: string; focus: string;
  estimated_minutes: number; calories_burn: number;
  exercises: Exercise[]; warmup: Exercise[]; cooldown: Exercise[]; completed: boolean;
}

export interface Macro { protein: number; carbs: number; fat: number; }
export interface Meal {
  id: string; name: string; type: "breakfast" | "lunch" | "dinner" | "snack";
  time: string; calories: number; macros: Macro; image_url?: string; ingredients: string[];
}
export interface DietPlan { date: string; meals: Meal[]; total_calories: number; macros: Macro; water_target_ml: number; }

export interface ChatMessage { id: string; role: "user" | "assistant"; content: string; created_at: string; }
export interface ChatSession { id: string; title: string; created_at: string; messages: ChatMessage[]; }

export interface ScheduleItem {
  id: string; type: "workout" | "meal" | "hydration" | "sleep" | "habit";
  title: string; start: string; end: string; completed: boolean;
}

export interface ProgressPoint { date: string; value: number; }
export interface DashboardOverview {
  weight: ProgressPoint[]; calories_today: number; calories_target: number;
  water_ml: number; water_target_ml: number; steps: number; steps_target: number;
  sleep_hours: number; workout_completion_pct: number;
  weekly_workouts: { day: string; completed: number; target: number }[];
  insights: { id: string; title: string; body: string; tone: "positive" | "neutral" | "warning" }[];
}
