import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONCIERGE_SYSTEM_PROMPT } from "@/lib/concierge/prompt";

/**
 * v3.4 — Concierge AI Handoff
 *
 * After a visitor submits the inquiry, we compose a personalized two-paragraph
 * acknowledgment via Lovable AI Gateway (Gemini 2.5 Pro for tone fidelity).
 *
 * Non-streaming on purpose: the client streams it word-by-word using the same
 * cinematic reveal as the Resonance Reading. This is far more reliable through
 * the TanStack server-fn RPC layer than SSE forwarding, and the visitor still
 * sees the letter compose itself.
 *
 * No PHI is sent — only what the visitor already chose to write. No medical
 * advice or diagnosis is requested or returned (system prompt enforced).
 */

const Input = z.object({
  firstName: z.string().trim().min(1).max(100),
  role: z.string().trim().min(1).max(80),
  contactMethod: z.string().trim().min(1).max(20),
  message: z.string().trim().max(1500).optional(),
  resonanceText: z.string().trim().max(600).optional(),
  resonanceReading: z.string().trim().max(1500).optional(),
  intentSignal: z.string().trim().max(40).optional(),
});

function fallbackReply(firstName: string, contactMethod: string): string {
  const channel = contactMethod.toLowerCase();
  return `${firstName}, your note arrived in the right hands. We read it slowly — the way it was written. There is no form behind this reply, only a clinician thinking about what you described and which of our team should be the one to call.

You will hear from us by ${channel} within four hours, often sooner. Nothing is recorded until you instruct us to proceed. Whatever happens next is yours to set the pace of.`;
}

export const composePrivateReply = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Input.parse(raw))
  .handler(async ({ data }): Promise<{ reply: string; fallback: boolean }> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      console.error("[concierge] LOVABLE_API_KEY missing — using fallback");
      return { reply: fallbackReply(data.firstName, data.contactMethod), fallback: true };
    }

    const userPayload = JSON.stringify({
      firstName: data.firstName,
      role: data.role,
      contactMethod: data.contactMethod,
      message: data.message ?? "",
      resonanceText: data.resonanceText ?? "",
      resonanceReading: data.resonanceReading ?? "",
      intentSignal: data.intentSignal ?? "",
    });

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: CONCIERGE_SYSTEM_PROMPT },
            { role: "user", content: userPayload },
          ],
          temperature: 0.55,
        }),
      });

      if (res.status === 429 || res.status === 402) {
        console.warn(`[concierge] Gateway returned ${res.status} — using fallback`);
        return { reply: fallbackReply(data.firstName, data.contactMethod), fallback: true };
      }
      if (!res.ok) {
        console.error("[concierge] Gateway error", res.status, await res.text().catch(() => ""));
        return { reply: fallbackReply(data.firstName, data.contactMethod), fallback: true };
      }

      const json = await res.json();
      const raw = json?.choices?.[0]?.message?.content;
      if (typeof raw !== "string" || raw.trim().length < 40) {
        return { reply: fallbackReply(data.firstName, data.contactMethod), fallback: true };
      }

      // Defensive trim — never let the model return more than ~220 words.
      const trimmed = raw.trim().split(/\s+/).slice(0, 220).join(" ");
      return { reply: trimmed, fallback: false };
    } catch (err) {
      console.error("[concierge] unexpected error", err);
      return { reply: fallbackReply(data.firstName, data.contactMethod), fallback: true };
    }
  });
