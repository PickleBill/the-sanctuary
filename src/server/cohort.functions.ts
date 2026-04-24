import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { COHORT_MATCH_SYSTEM_PROMPT } from "@/lib/cohort/prompt";
import { COHORT_ROLES } from "@/lib/cohort/roles";

/**
 * v3.4 — The Cohort Whisper
 *
 * Given a Resonance reflection (and optional intent signal), pick exactly ONE
 * anonymous peer role from COHORT_ROLES whose archetype thematically resonates.
 * Returns the index — the client lights that node on the Cohort constellation.
 *
 * Uses tool calling for structured output (no JSON-parsing risk). Gemini Flash
 * for sub-500ms latency. Falls back to index 3 (Trustee · family office) on any
 * failure — never refuses.
 *
 * No PHI involved: input is the visitor's own free-text reflection, output is
 * an integer between 0 and 39.
 */

const Input = z.object({
  text: z.string().trim().min(2).max(600),
  intentSignal: z.string().trim().max(40).optional(),
});

const SAFE_DEFAULT = 3; // "Trustee · family office"

function buildRolesList(): string {
  return COHORT_ROLES.map((r, i) => `${i}. ${r}`).join("\n");
}

export const matchPeer = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Input.parse(raw))
  .handler(
    async ({ data }): Promise<{ roleIndex: number; roleLabel: string; rationale: string; fallback: boolean }> => {
      const apiKey = process.env.LOVABLE_API_KEY;
      if (!apiKey) {
        return {
          roleIndex: SAFE_DEFAULT,
          roleLabel: COHORT_ROLES[SAFE_DEFAULT],
          rationale: "A trusted advisor often sits in this seat — quietly, on behalf of someone they love.",
          fallback: true,
        };
      }

      const userPayload = `Visitor reflection:\n"""${data.text}"""\n\nIntent signal: ${data.intentSignal ?? "unknown"}\n\nAvailable peer roles:\n${buildRolesList()}\n\nPick the one role whose archetype most resonates.`;

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
              { role: "system", content: COHORT_MATCH_SYSTEM_PROMPT },
              { role: "user", content: userPayload },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "select_peer",
                  description: "Select exactly one peer role index from the provided list.",
                  parameters: {
                    type: "object",
                    properties: {
                      roleIndex: {
                        type: "integer",
                        minimum: 0,
                        maximum: COHORT_ROLES.length - 1,
                        description: "The index of the chosen role.",
                      },
                      rationale: {
                        type: "string",
                        description: "One quiet sentence (10-18 words) on why this archetype resonates. No second person, no promises.",
                      },
                    },
                    required: ["roleIndex", "rationale"],
                    additionalProperties: false,
                  },
                },
              },
            ],
            tool_choice: { type: "function", function: { name: "select_peer" } },
            temperature: 0.4,
          }),
        });

        if (!res.ok) {
          console.warn(`[matchPeer] Gateway returned ${res.status}`);
          return {
            roleIndex: SAFE_DEFAULT,
            roleLabel: COHORT_ROLES[SAFE_DEFAULT],
            rationale: "A quieter pattern — a trusted advisor often sits in this seat.",
            fallback: true,
          };
        }

        const json = await res.json();
        const tc = json?.choices?.[0]?.message?.tool_calls?.[0];
        const argsRaw = tc?.function?.arguments;
        if (!argsRaw) throw new Error("No tool call returned");
        const parsed = JSON.parse(argsRaw) as { roleIndex: number; rationale: string };
        const idx =
          Number.isInteger(parsed.roleIndex) &&
          parsed.roleIndex >= 0 &&
          parsed.roleIndex < COHORT_ROLES.length
            ? parsed.roleIndex
            : SAFE_DEFAULT;
        const rationale =
          typeof parsed.rationale === "string" && parsed.rationale.trim().length > 0
            ? parsed.rationale.trim().slice(0, 180)
            : "An archetype that quietly resonates with what was written.";
        return {
          roleIndex: idx,
          roleLabel: COHORT_ROLES[idx],
          rationale,
          fallback: false,
        };
      } catch (err) {
        console.error("[matchPeer] unexpected error", err);
        return {
          roleIndex: SAFE_DEFAULT,
          roleLabel: COHORT_ROLES[SAFE_DEFAULT],
          rationale: "A trusted advisor often sits in this seat — quietly, on behalf of someone they love.",
          fallback: true,
        };
      }
    },
  );
