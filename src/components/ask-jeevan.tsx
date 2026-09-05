"use client";

import { Bot, ChevronDown, Mic, RotateCcw, Send, Square, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Message = { role: "user" | "assistant"; content: string };
type SpeechRecognitionResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRecognitionInstance = { lang: string; interimResults: boolean; continuous: boolean; onresult: ((event: SpeechRecognitionResultEvent) => void) | null; onend: (() => void) | null; onerror: (() => void) | null; start: () => void; stop: () => void };
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor; }
}

const suggestions = ["What has Jeevan built?", "What are his strongest skills?", "Tell me about TrickBills", "How can I contact him?"];

function AssistantText({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const output: ReactNode[] = [];
  let tableHeaderSkipped = false;
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) { output.push(<span className="message-spacer" key={`space-${index}`} />); return; }
    if (/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(trimmed)) return;
    const clean = (value: string) => value.replace(/\*\*/g, "").replace(/`/g, "").replace(/^#+\s*/, "").replace(/^[*_]|[*_]$/g, "").trim();
    if (trimmed.startsWith("|")) {
      const cells = trimmed.split("|").map(clean).filter(Boolean);
      if (!tableHeaderSkipped) { tableHeaderSkipped = true; return; }
      output.push(<p className="message-table-row" key={`table-${index}`}><strong>{cells[0]}</strong>{cells.slice(1).join(" · ")}</p>);
      return;
    }
    const bullet = trimmed.match(/^[-*]\s+(.+)/);
    output.push(bullet ? <p className="message-bullet" key={`line-${index}`}>• {clean(bullet[1])}</p> : <p key={`line-${index}`}>{clean(trimmed)}</p>);
  });
  return <div className="message-copy">{output}</div>;
}

export function AskJeevan() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "I’m the portfolio intelligence layer. Ask me about Jeevan’s work, skills, experience, or background." }]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => { if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [messages, busy, error, open]);
  useEffect(() => () => { recognitionRef.current?.stop(); window.speechSynthesis?.cancel(); }, []);

  async function ask(event?: React.FormEvent, suggested?: string, history = messages) {
    event?.preventDefault();
    const question = (suggested ?? input).trim();
    if (!question || busy) return;
    setInput(""); setError("");
    const next = [...history, { role: "user" as const, content: question }];
    setMessages(next); setBusy(true);
    try {
      const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessages([...next, { role: "assistant", content: data.answer }]);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "The assistant is temporarily unavailable."); }
    finally { setBusy(false); }
  }

  async function retry() { const previous = messages.at(-1); if (previous?.role === "user") await ask(undefined, previous.content, messages.slice(0, -1)); }
  function clear() { setMessages([{ role: "assistant", content: "Conversation cleared. What would you like to know about Jeevan?" }]); setError(""); }

  function toggleListening() {
    if (listening) { recognitionRef.current?.stop(); return; }
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) { setError("Speech input is not supported in this browser."); return; }
    const recognition = new Recognition(); recognition.lang = "en-US"; recognition.interimResults = true; recognition.continuous = false;
    recognition.onresult = (event) => setInput(Array.from(event.results).map((result) => result[0].transcript).join(""));
    recognition.onend = () => { setListening(false); recognitionRef.current = null; };
    recognition.onerror = () => { setListening(false); setError("I could not hear that. Please try again."); recognitionRef.current = null; };
    recognitionRef.current = recognition; setError(""); setListening(true); recognition.start();
  }

  function stopSpeaking() { window.speechSynthesis?.cancel(); setSpeaking(null); }

  async function getFemaleVoice() {
    const synthesis = window.speechSynthesis;
    const findVoice = () => {
      const voices = synthesis.getVoices();
      return voices.find((voice) => /female|samantha|zira|hazel|susan|karen|victoria|linda|google uk english female/i.test(voice.name) && /^en(-|_)/i.test(voice.lang)) ?? voices.find((voice) => /^en(-|_)/i.test(voice.lang));
    };
    const existingVoice = findVoice();
    if (existingVoice) return existingVoice;
    return new Promise<SpeechSynthesisVoice | undefined>((resolve) => {
      let finished = false;
      const finish = () => { if (finished) return; finished = true; synthesis.removeEventListener("voiceschanged", finish); resolve(findVoice()); };
      synthesis.addEventListener("voiceschanged", finish, { once: true });
      window.setTimeout(finish, 700);
    });
  }

  async function toggleSpeaking(content: string, index: number) {
    if (!window.speechSynthesis) { setError("Answer playback is not supported in this browser."); return; }
    if (speaking === index) { stopSpeaking(); return; }
    stopSpeaking();
    const femaleVoice = await getFemaleVoice();
    const utterance = new SpeechSynthesisUtterance(content);
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.lang = femaleVoice?.lang ?? "en-US"; utterance.rate = .95;
    utterance.onend = () => setSpeaking(null); utterance.onerror = () => setSpeaking(null);
    setSpeaking(index); window.speechSynthesis.speak(utterance);
  }

  return <div id="ask-jeevan" className="assistant-dock" aria-label="Ask Jeevan portfolio assistant">
    <button type="button" className="assistant-toggle" aria-expanded={open} onClick={() => setOpen(!open)}><Bot size={15} /> <span className="assistant-toggle-label">Ask Jeevan</span> {open ? <ChevronDown size={14} /> : <span className="text-secondary-accent">●</span>}</button>
    {open && <div className="assistant-panel clear-both">
      <header className="flex items-center justify-between border-b border-border p-4"><div><p className="technical-label">Ask Jeevan</p><p className="mt-1 text-xs text-muted">Portfolio intelligence</p></div><div className="flex gap-2"><button type="button" aria-label="Clear conversation" onClick={clear} className="icon-button"><RotateCcw size={13} /></button><button type="button" aria-label="Close assistant" onClick={() => { stopSpeaking(); setOpen(false); }} className="icon-button"><X size={13} /></button></div></header>
      <div className="assistant-messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}>{message.role === "assistant" ? <><AssistantText content={message.content} /><div className="assistant-voice-controls"><button type="button" className="assistant-voice-button" aria-label="Read answer aloud" onClick={() => toggleSpeaking(message.content, index)}><Volume2 size={13} /></button>{speaking === index && <button type="button" className="assistant-stop-button" aria-label="Stop reading answer" onClick={stopSpeaking}><Square size={12} /><span>Stop reading</span></button>}</div></> : message.content}</div>)}{busy && <div className="message assistant" role="status">Thinking...</div>}{error && <div className="flex items-center gap-3 text-xs text-rose-300" role="alert"><span>{error}</span><button type="button" onClick={retry} className="text-foreground underline underline-offset-4">Retry</button></div>}<div ref={messagesEndRef} aria-hidden="true" /></div>
      <div className="flex flex-wrap gap-2 px-4 pb-3">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(undefined, suggestion)} className="border border-border px-2 py-1 text-left text-[10px] text-muted hover:border-accent hover:text-foreground">{suggestion}</button>)}</div>
      <form onSubmit={ask} className="flex gap-2 border-t border-border p-3"><input value={input} onChange={(event) => setInput(event.target.value)} maxLength={600} aria-label="Ask Jeevan a question" placeholder={listening ? "Listening..." : "Ask about the portfolio..."} className="min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none" /><button type="button" className={`icon-button ${listening ? "assistant-listening" : ""}`} aria-label={listening ? "Stop speech input" : "Start speech input"} onClick={toggleListening}><Mic size={14} /></button><button disabled={busy} aria-label="Send question" className="icon-button" type="submit"><Send size={14} /></button></form>
    </div>}
  </div>;
}