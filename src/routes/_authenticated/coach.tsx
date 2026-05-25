import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Sparkles, Plus, MessageSquare } from "lucide-react";
import { chatService } from "@/services/chat.service";
import { mockChatSessions } from "@/lib/mock-data";
import type { ChatMessage, ChatSession } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChatHistory } from "@/hooks/useDashboard";

export const Route = createFileRoute("/_authenticated/coach")({
  head: () => ({ meta: [{ title: "AI Coach — AIFit" }] }),
  component: CoachPage,
});

const suggestions = [
  "How do I break my bench press plateau?",
  "Plan a high-protein breakfast under 500 kcal",
  "I missed yesterday's leg day — what now?",
  "Best stretches for tight hips",
];

function CoachPage() {
  const queryClient = useQueryClient();
  const { data: history } = useChatHistory();
  const [sessions, setSessions] = useState<ChatSession[]>(mockChatSessions);
  const [activeId, setActiveId] = useState<string>(sessions[0]?.id || "c1");
  const active = sessions.find((s) => s.id === activeId) || mockChatSessions[0];
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync backend history to state
  useEffect(() => {
    if (history && history.length > 0) {
      const backendSessions: ChatSession[] = history.map((h) => {
        const existing = sessions.find((s) => s.id === h.id);
        return {
          id: h.id,
          title: h.title || "Untitled Conversation",
          created_at: h.created_at,
          messages: existing?.messages || [],
        };
      });
      setSessions(backendSessions);
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeId)) {
        setActiveId(backendSessions[0].id);
      }
    }
  }, [history]);

  // Load messages for active session if it is a real session UUID
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeId);
  const { data: dbMessages } = useQuery({
    queryKey: ["chat", "session", activeId],
    queryFn: () => chatService.session(activeId),
    enabled: isUUID,
  });

  useEffect(() => {
    if (dbMessages && isUUID) {
      setSessions((prev) =>
        prev.map((s) => (s.id === activeId ? { ...s, messages: dbMessages } : s))
      );
    }
  }, [dbMessages, activeId, isUUID]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages?.length, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(), role: "user", content: text, created_at: new Date().toISOString(),
    };
    setSessions((ss) => ss.map((s) => s.id === activeId ? { ...s, messages: [...s.messages, userMsg] } : s));
    setInput(""); setTyping(true);

    let reply = "Got it — let me design a quick plan around that. (Backend reply will appear here once connected.)";
    try {
      const res = (await chatService.send(text, isUUID ? activeId : undefined)) as any;
      reply = res.reply.content;
      const newSessionId = res.session_id;
      if (newSessionId && newSessionId !== activeId) {
        setSessions((ss) => ss.map((s) => s.id === activeId ? { ...s, id: newSessionId } : s));
        setActiveId(newSessionId);
      }
      queryClient.invalidateQueries({ queryKey: ["chat", "history"] });
      queryClient.invalidateQueries({ queryKey: ["chat", "session", newSessionId || activeId] });
    } catch (e) {
      console.error(e);
      /* mock fallback */
    }

    setTyping(false);
    const botMsg: ChatMessage = {
      id: crypto.randomUUID(), role: "assistant", content: reply, created_at: new Date().toISOString(),
    };
    setSessions((ss) => ss.map((s) => s.id === activeId ? { ...s, messages: [...s.messages, botMsg] } : s));
  };

  const newChat = () => {
    const s: ChatSession = { id: crypto.randomUUID(), title: "New conversation", created_at: new Date().toISOString(), messages: [] };
    setSessions((x) => [s, ...x]); setActiveId(s.id);
  };

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 h-[calc(100vh-8rem)]">
      <aside className="glass rounded-2xl p-3 hidden md:flex flex-col">
        <button onClick={newChat}
          className="rounded-xl bg-gradient-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-glow flex items-center justify-center gap-2">
          <Plus className="size-4" /> New chat
        </button>
        <div className="mt-3 overflow-y-auto space-y-1">
          {sessions.map((s) => (
            <button key={s.id} onClick={() => setActiveId(s.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate flex items-center gap-2 ${activeId === s.id ? "bg-white/10" : "hover:bg-white/5 text-muted-foreground"}`}>
              <MessageSquare className="size-3.5 shrink-0" /> {s.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="glass-strong rounded-2xl flex flex-col overflow-hidden">
        <header className="px-5 py-4 border-b border-border flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-display font-semibold">AI Coach</div>
            <div className="text-xs text-muted-foreground">Personalized to your plan</div>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          {active.messages.length === 0 && (
            <div className="text-center py-10">
              <div className="mx-auto size-12 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
                <Sparkles className="size-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mt-4">Ask your coach anything</h3>
              <p className="text-sm text-muted-foreground mt-1">Form checks, meal swaps, recovery — all yours.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-2 max-w-xl mx-auto">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="glass rounded-xl px-4 py-3 text-sm text-left hover:bg-white/5">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {active.messages.map((m) => <Bubble key={m.id} m={m} />)}
          {typing && <TypingBubble />}
        </div>

        <div className="p-4 border-t border-border">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 glass rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-ring">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Message your coach…"
              className="flex-1 bg-transparent outline-none text-sm py-2" />
            <button type="button" className="size-9 rounded-xl hover:bg-white/5 grid place-items-center text-muted-foreground" aria-label="Voice">
              <Mic className="size-4" />
            </button>
            <button type="submit" className="size-9 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Bubble({ m }: { m: ChatMessage }) {
  const isUser = m.role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="size-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
          <Sparkles className="size-4 text-primary-foreground" />
        </div>
      )}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${isUser ? "bg-gradient-primary text-primary-foreground" : "glass"}`}>
        {m.content}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-3">
      <div className="size-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
        <Sparkles className="size-4 text-primary-foreground" />
      </div>
      <div className="glass rounded-2xl px-4 py-3 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} className="size-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </div>
    </div>
  );
}
