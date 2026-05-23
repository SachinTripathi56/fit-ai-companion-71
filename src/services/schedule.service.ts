// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { ScheduleItem } from "@/types";

export const scheduleService = {
  today: () => api.get<ScheduleItem[]>(endpoints.schedule.today),
  week: () => api.get<ScheduleItem[]>(endpoints.schedule.week),
  update: (item: ScheduleItem) => api.put<ScheduleItem>(endpoints.schedule.update, item),
  reschedule: (id: string, start: string) =>
    api.post<ScheduleItem>(endpoints.schedule.reschedule, { id, start }),
};
