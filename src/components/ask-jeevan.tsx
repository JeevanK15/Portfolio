"use client";

import { Bot, ChevronDown, RotateCcw, Send, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = ["What has Jeevan built?", "What are his strongest skills?", "Tell me about TrickBills", "How can I contact him?"];

function AssistantText({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const output: ReactNode[] = [];
  let tableHeaderSkipped = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      output.push(<span className="message-spacer" key={`space-${index}`} />);
      return;
    }

    if (/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(trimmed)) return;

    const clean = (value: string) => value.replace(/\*\*/g, "").replace(/`/g, "").replace(/^#+\s*/, "").replace(/^[*_]|[*_]$/g, "").trim();
    if (trimmed.startsWith("|")) {
      const cells = trimmed.split("|").map(clean).filter(Boolean);
      if (!tableHeaderSkipped) {
        tableHeaderSkipped = true;
        return;
      }
      output.push(<p className="message-table-row" key={`table-${index}`}><strong>{cells[0]}</strong>{cells.slice(1).join(" · ")}</p>);
      return;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)/);
    output.push(bullet ? <p className="message-bullet" key={`line-${index}`}>• {clean(bullet[1])}</p> : <p key={`line-${index}`}>{clean(trimmed)}</p>);
  });

  return <div className="message-copy">{output}</div>;
}

export function AskJeevan() {
  const [open, setOpen] = useState(false); const [input, setInput] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "I’m the portfolio intelligence layer. Ask me about Jeevan’s work, skills, experience, or background." }]);
  async function ask(event?: React.FormEvent, suggested?: string, history = messages) { event?.preventDefault(); const question = (suggested ?? input).trim(); if (!question || busy) return; setInput(""); setError(""); const next = [...history, { role: "user" as const, content: question }]; setMessages(next); setBusy(true); try { const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setMessages([...next, { role: "assistant", content: data.answer }]); } catch (cause) { setError(cause instanceof Error ? cause.message : "The assistant is temporarily unavailable."); } finally { setBusy(false); } }
  async function retry() { const previous = messages.at(-1); if (previous?.role === "user") await ask(undefined, previous.content, messages.slice(0, -1)); }
  function clear() { setMessages([{ role: "assistant", content: "Conversation cleared. What would you like to know about Jeevan?" }]); setError(""); }
  return <div id="ask-jeevan" className="assistant-dock" aria-label="Ask Jeevan portfolio assistant"><button type="button" className="assistant-toggle" aria-expanded={open} onClick={() => setOpen(!open)}><Bot size={15} /> Ask Jeevan {open ? <ChevronDown size={14} /> : <span className="text-secondary-accent">●</span>}</button>{open && <div className="assistant-panel clear-both"><header className="flex items-center justify-between border-b border-border p-4"><div><p className="technical-label">Ask Jeevan</p><p className="mt-1 text-xs text-muted">Portfolio intelligence</p></div><div className="flex gap-2"><button type="button" aria-label="Clear conversation" onClick={clear} className="icon-button"><RotateCcw size={13} /></button><button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="icon-button"><X size={13} /></button></div></header><div className="assistant-messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}>{message.role === "assistant" ? <AssistantText content={message.content} /> : message.content}</div>)}{busy && <div className="message assistant" role="status">Thinking...</div>}{error && <div className="flex items-center gap-3 text-xs text-rose-300" role="alert"><span>{error}</span><button type="button" onClick={retry} className="text-foreground underline underline-offset-4">Retry</button></div>}</div><div className="flex flex-wrap gap-2 px-4 pb-3">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(undefined, suggestion)} className="border border-border px-2 py-1 text-left text-[10px] text-muted hover:border-accent hover:text-foreground">{suggestion}</button>)}</div><form onSubmit={ask} className="flex gap-2 border-t border-border p-3"><input value={input} onChange={(event) => setInput(event.target.value)} maxLength={600} aria-label="Ask Jeevan a question" placeholder="Ask about the portfolio..." className="min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none" /><button disabled={busy} aria-label="Send question" className="icon-button" type="submit"><Send size={14} /></button></form></div>}</div>;
}
