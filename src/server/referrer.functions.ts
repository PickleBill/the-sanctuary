import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { REFERRER_SYSTEM_PROMPT } from "@/lib/referrer/prompt";

/**
 * v3.5 — composeReferralNote
 *
 * Server function for the /professionals page. A clinician types a single
 * sentence about their client; we return a HIPAA-clean intro paragraph they
 * can paste into an email to our intake team.
 *
 * NO PHI is stored. The input is never persisted to a database — it is sent
 * to the AI gateway, the response returned, and both are dropped. The
 * system prompt enforces stripping any identifiers the clinician accidentally
 * pasted.
 */

const Input = z.object({
  context: z.string().trim().min(8).max(800),
  callbackChannel: z.string().trim().max(40).optional(),
  callbackWindow: z.string().trim().max(80).optional(),
});

function fallbackNote(channel?: string, window?: string): string {
  const ch = channel?.trim() || "phone";
  const w = window?.trim() || "the next two business days";
  return `I'm writing privately to introduce a prospective resident — a high-functioning principal carrying a complex picture that has not been well held in standard settings. The texture is consistent with someone who would benefit from a small, peered environment, with named clinical leadership and the discretion your program is known for.

I'd welcome a brief peer call before any introduction is made. ${ch.charAt(0).toUpperCase() + ch.slice(1)} is the easiest channel for me; I'm available ${w}.`;
}

export const composeReferralNote = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Input.parse(raw))
  .handler(async ({ data }): Promise<{ note: string; fallback: boolean }> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      console.error("[referrer] LOVABLE_API_KEY missing — using fallback");
      return { note: fallbackNote(data.callbackChannel, data.callbackWindow), fallback: true };
    }

    const userPayload = JSON.stringify({
      context: data.context,
      callbackChannel: data.callbackChannel ?? "",
      callbackWindow: data.callbackWindow ?? "",
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
            { role: "system", content: REFERRER_SYSTEM_PROMPT },
            { role: "user", content: userPayload },
          ],
          temperature: 0.5,
        }),
      });

      if (res.status === 429 || res.status === 402) {
        console.warn(`[referrer] Gateway returned ${res.status} — using fallback`);
        return { note: fallbackNote(data.callbackChannel, data.callbackWindow), fallback: true };
      }
      if (!res.ok) {
        console.error("[referrer] Gateway error", res.status, await res.text().catch(() => ""));
        return { note: fallbackNote(data.callbackChannel, data.callbackWindow), fallback: true };
      }

      const json = await res.json();
      const raw = json?.choices?.[0]?.message?.content;
      if (typeof raw !== "string" || raw.trim().length < 40) {
        return { note: fallbackNote(data.callbackChannel, data.callbackWindow), fallback: true };
      }

      const trimmed = raw.trim().split(/\s+/).slice(0, 180).join(" ");
      return { note: trimmed, fallback: false };
    } catch (err) {
      console.error("[referrer] unexpected error", err);
      return { note: fallbackNote(data.callbackChannel, data.callbackWindow), fallback: true };
    }
  });
