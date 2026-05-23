// Backend APIs are developed separately using FastAPI.
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { ChatMessage, ChatSession } from "@/types";

export const chatService = {
  history: () => api.get<ChatSession[]>(endpoints.chat.history),
  session: (id: string) => api.get<ChatSession>(endpoints.chat.session(id)),
  send: (content: string, session_id?: string) =>
    api.post<ChatMessage>(endpoints.chat.message, { content, session_id }),
  suggestions: () => api.get<string[]>(endpoints.chat.suggestions),
};
