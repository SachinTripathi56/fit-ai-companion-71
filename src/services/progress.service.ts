// Backend APIs are developed separately using FastAPI.
import { api, apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { ProgressPoint } from "@/types";

export const progressService = {
  summary: () =>
    api.get<{
      weight: ProgressPoint[];
      measurements: { date: string; chest: number; waist: number; arms: number; thighs: number }[];
      photos: { id: string; url: string; date: string }[];
    }>(endpoints.progress.summary),
  logWeight: (value: number, date: string) =>
    api.post<ProgressPoint>(endpoints.progress.weight, { value, date }),
  uploadPhoto: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return apiClient
      .post<{ id: string; url: string }>(endpoints.progress.uploadPhoto, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
};
