// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { ScheduleItem } from "@/types";

export const scheduleService = {
  today: () => api.get<ScheduleItem[]>(endpoints.schedule.today),
  week: () => api.get<Record<string, unknown>>(endpoints.schedule.week),
  update: (eventId: string, data: { title?: string; start_time?: string; end_time?: string; is_completed?: boolean }) =>
    api.patch<{ id: string; message: string }>(`${endpoints.schedule.update}?event_id=${eventId}`, data),
  reschedule: (event_type: string, context?: Record<string, unknown>) =>
    api.post<Record<string, unknown>>(`${endpoints.schedule.reschedule}?event_type=${event_type}`, context ?? {}),
};
