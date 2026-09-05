import { NextResponse } from "next/server";
import { achievements } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { leadership } from "@/data/leadership";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const context = JSON.stringify({ profile, education, experiences, projects, skillGroups, certifications, achievements, leadership });

function localAnswer(question: string) {
  const normalized = question.toLowerCase();
  if (/(trick|bill|project|built|work)/.test(normalized)) return projects.map((project) => `${project.name}: ${project.description} Technologies: ${project.technologies.join(", ")}.`).join("\n\n");
  if (/(skill|technolog|stack|good at)/.test(normalized)) return skillGroups.map((group) => `${group.title}: ${group.items.join(", ")}`).join("\n");
  if (/(contact|email|reach|phone|linkedin|github)/.test(normalized)) return `You can contact Jeevan at ${profile.email} or ${profile.phone}. He is based in ${profile.location}. GitHub: ${profile.githubUrl}\nLinkedIn: ${profile.linkedinUrl}`;
  if (/(experience|intern|career)/.test(normalized)) return experiences.map((experience) => `${experience.role} at ${experience.company} (${experience.startDate} - ${experience.endDate}). ${experience.description[0]}`).join("\n\n");
  if (/(who|about|jee[v]?an|background|study|education)/.test(normalized)) return `${profile.name} is a ${profile.title} focused on ${profile.focus}. ${profile.intro}`;
  return "I can answer questions about Jeevan's projects, skills, experience, education, and contact details. Try asking what he has built or what technologies he uses.";
}

export async function POST(request: Request) {
  let question = "";
  try {
    const body = await request.json() as { messages?: { role: "user" | "assistant"; content: string }[] };
    const messages = body.messages?.slice(-10) ?? [];
    question = messages.at(-1)?.content?.trim() ?? "";
    if (!question || question.length > 600) return NextResponse.json({ error: "Please ask a shorter question." }, { status: 400 });

    const key = process.env.AI_API_KEY;
    const url = process.env.AI_API_URL ?? "https://api.groq.com/openai/v1/chat/completions";
    const model = process.env.AI_MODEL ?? "openai/gpt-oss-120b";
    if (!key) return NextResponse.json({ answer: localAnswer(question), fallback: true });

    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: .2,
        max_tokens: 300,
        messages: [{ role: "system", content: `You are the official AI assistant for Jeevan K's portfolio. Answer only with verified information in this context. If unavailable, say you don't have that information. Never invent projects, companies, technologies, achievements, dates, links, or personal information. Do not claim unlisted professional experience. Keep answers concise and natural. Use short paragraphs or bullet points only. Do not use markdown tables. Context: ${context}` }, ...messages],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const providerStatus = response.status;
      console.error("AI provider request failed", providerStatus, (await response.text()).slice(0, 500));
      if (providerStatus === 401 || providerStatus === 403) return NextResponse.json({ answer: localAnswer(question), fallback: true });
      return NextResponse.json({ error: "The assistant could not respond. Please try again shortly." }, { status: 502 });
    }

    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    return NextResponse.json({ answer: data.choices?.[0]?.message?.content?.trim() || localAnswer(question) });
  } catch {
    return NextResponse.json({ answer: localAnswer(question), fallback: true });
  }
}