"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sfx } from "@/lib/sfx";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Tokenizer & Parser Markdown Inline yang sangat handal
function formatInlineMarkdown(text: string): React.ReactNode[] {
  // Regex untuk bold (**...**), italic (*...* atau _..._), dan inline code (`...`)
  const regex = /(\*\*[^\*]+?\*\*|\*[^\*]+?\*|`[^`]+?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2 && !part.startsWith("**")) {
      return (
        <em key={i} className="italic text-muted-foreground">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Helper untuk memformat pesan AI menjadi layout yang rapi
function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // List item bullet (*, -, +, 1.) dengan toleransi berbagai spasi
        const bulletMatch = trimmed.match(/^([\*\-\+\•]|\d+\.)\s+(.+)$/);
        if (bulletMatch) {
          const bulletSymbol = bulletMatch[1];
          const text = bulletMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 my-1">
              <span className="text-emerald-500 font-bold text-xs shrink-0 mt-0.5">
                {bulletSymbol.endsWith(".") ? bulletSymbol : "•"}
              </span>
              <span className="flex-1 leading-normal">{formatInlineMarkdown(text)}</span>
            </div>
          );
        }

        // Heading (###, ##, #)
        if (trimmed.startsWith("### ")) {
          return (
            <p key={idx} className="font-bold text-foreground text-xs mt-2.5 mb-1 border-b border-border/40 pb-0.5">
              {formatInlineMarkdown(trimmed.slice(4))}
            </p>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <p key={idx} className="font-bold text-primary text-sm mt-3 mb-1.5">
              {formatInlineMarkdown(trimmed.slice(3))}
            </p>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <p key={idx} className="font-display font-bold text-primary text-base mt-3 mb-1.5">
              {formatInlineMarkdown(trimmed.slice(2))}
            </p>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {formatInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
}

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Assalamu'alaikum! I'm Zad Mentor. Ready to level up bekal ibadahmu hari ini? Ada yang ingin ditanyakan seputar Al-Qur'an atau ibadah?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);
    sfx.playTap();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses pesan.");

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      sfx.playSuccess();
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Mohon maaf, terjadi kendala saat terhubung. Coba tanyakan kembali beberapa saat lagi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            sfx.playTap();
            setIsOpen(!isOpen);
          }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl hover:shadow-emerald-500/25"
          aria-label="Tanya Zad Mentor AI"
        >
          <span className="absolute -inset-1 animate-ping rounded-full bg-emerald-500/30" />
          <Bot className="relative h-7 w-7 text-white" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl md:bottom-24 md:right-6"
          >
            <div className="flex items-center justify-between border-b bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold">Zad Mentor</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-gold" /> AI Companion : Zadify
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => {
                  sfx.playTap();
                  setIsOpen(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-muted/60 text-foreground border"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <FormattedMessage content={m.content} />
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted/60 p-3 text-muted-foreground border">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                    <span>Zad Mentor sedang merangkum bekal...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-3 bg-card">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanya tafsir, doa, atau hukum..."
                  className="h-10 rounded-xl text-xs"
                />
                <Button type="submit" disabled={loading || !input.trim()} className="h-10 w-10 rounded-xl p-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
