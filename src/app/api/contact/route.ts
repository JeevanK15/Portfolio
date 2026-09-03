import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; message?: string; website?: string };
    const name = body.name?.trim() ?? ""; const email = body.email?.trim() ?? ""; const message = body.message?.trim() ?? "";
    if (body.website || name.length < 2 || name.length > 80 || !emailPattern.test(email) || message.length < 10 || message.length > 4000) return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
    const key = process.env.RESEND_API_KEY?.trim(); const recipient = process.env.CONTACT_EMAIL?.trim(); const sender = process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev";
    if (!key || !recipient) return NextResponse.json({ error: "Contact service is not configured." }, { status: 503 });
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: sender, to: [recipient], reply_to: email, subject: `Portfolio message from ${name}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) { console.error("Email provider request failed", response.status, (await response.text()).slice(0, 500)); return NextResponse.json({ error: "Unable to deliver message." }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to process message." }, { status: 500 }); }
}
