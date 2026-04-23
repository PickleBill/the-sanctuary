import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { RESONANCE_SYSTEM_PROMPT, type ResonanceReading } from "@/lib/resonance/prompt";
import { fallbackResonance } from "@/lib/email/resonance-fallback";

const ResonanceInput = z.object({
  text: z.string().trim().min(8, "Please share at least a sentence.").max(600, "Please keep this to a single sentence."),
});

const inputSchema = z.object({
  text: z.string().trim().min(2).max(600),
});

/**
 * Generate a Resonance Reading via Lovable AI Gateway (Gemini 2.5 Flash).
 * - Validates and trims input
 * - Calls AI with strict JSON-only contract
 * - Falls back to a hand-written reading on any error or rate-limit
 * - Logs every call to `resonance_readings` for QA — no PII collected
 */
export const generateResonance = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => inputSchema.parse(raw))
  .handler(async ({ data }): Promise<ResonanceReading & { fallback: boolean }> => {
    const validated = ResonanceInput.safeParse({ text: data.text });
    if (!validated.success) {
      const fb = fallbackResonance(data.text);
      return { ...fb, fallback: true };
    }

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      console.error("[resonance] LOVABLE_API_KEY missing — using fallback");
      const fb = fallbackResonance(validated.data.text);
      await logReading(validated.data.text, fb, true);
      return { ...fb, fallback: true };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: RESONANCE_SYSTEM_PROMPT },
            { role: "user", content: validated.data.text },
          ],
          temperature: 0.6,
          response_format: { type: "json_object" },
        }),
      });

      if (res.status === 429 || res.status === 402) {
        console.warn(`[resonance] Gateway returned ${res.status} — using fallback`);
        const fb = fallbackResonance(validated.data.text);
        await logReading(validated.data.text, fb, true);
        return { ...fb, fallback: true };
      }

      if (!res.ok) {
        console.error("[resonance] Gateway error", res.status, await res.text().catch(() => ""));
        const fb = fallbackResonance(validated.data.text);
        await logReading(validated.data.text, fb, true);
        return { ...fb, fallback: true };
      }

      const json = await res.json();
      const raw = json?.choices?.[0]?.message?.content;
      if (!raw) throw new Error("Empty completion");
      const parsed = JSON.parse(raw) as ResonanceReading;

      // Defensive shape check
      if (
        typeof parsed.echo !== "string" ||
        typeof parsed.reading !== "string" ||
        typeof parsed.clinical !== "string" ||
        typeof parsed.holistic !== "string"
      ) {
        throw new Error("Malformed completion");
      }

      await logReading(validated.data.text, parsed, false);
      return { ...parsed, fallback: false };
    } catch (err) {
      console.error("[resonance] Unexpected error", err);
      const fb = fallbackResonance(validated.data.text);
      await logReading(validated.data.text, fb, true);
      return { ...fb, fallback: true };
    }
  });

async function logReading(input: string, reading: ResonanceReading, isFallback: boolean) {
  try {
    await supabaseAdmin.from("resonance_readings").insert({
      input_text: input.slice(0, 600),
      reading: reading.reading.slice(0, 1000),
      intent_signal: isFallback ? "fallback" : reading.intent_signal,
    });
  } catch (e) {
    console.error("[resonance] log insert failed", e);
  }
}

/* ------------------------------------------------------------------ */
/* Prospectus submission                                              */
/* ------------------------------------------------------------------ */

const ProspectusInput = z.object({
  name: z.string().trim().min(1).max(100),
  contactMethod: z.enum(["Email", "Phone", "Signal"]),
  contactValue: z.string().trim().min(3).max(120),
  role: z.enum(["Principal", "Executive Assistant", "Medical Professional", "Trusted Advisor"]),
  source: z.string().trim().max(80).optional(),
  message: z.string().trim().max(1500).optional(),
  resonanceText: z.string().trim().max(600).optional(),
  resonanceReading: z.string().trim().max(1500).optional(),
  intentSignal: z.string().trim().max(40).optional(),
});

export const submitProspectus = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => ProspectusInput.parse(raw))
  .handler(async ({ data }) => {
    try {
      const { error } = await supabaseAdmin.from("prospectus_requests").insert({
        name: data.name,
        contact_method: data.contactMethod,
        contact_value: data.contactValue,
        role: data.role,
        source: data.source ?? null,
        message: data.message ?? null,
        resonance_text: data.resonanceText ?? null,
        resonance_reading: data.resonanceReading ?? null,
        intent_signal: data.intentSignal ?? null,
      });
      if (error) {
        console.error("[prospectus] insert error", error);
        return { ok: false as const, error: "Submission could not be recorded. Please call our 24/7 line." };
      }
      return { ok: true as const, dossierUrl: "/clinical-dossier.pdf" };
    } catch (err) {
      console.error("[prospectus] unexpected", err);
      return { ok: false as const, error: "Submission could not be recorded. Please call our 24/7 line." };
    }
  });
