/**
 * Deterministic fallback used when the AI gateway is unavailable.
 * Same shape as a real Resonance Reading so the UI never breaks.
 */
import type { ResonanceReading } from "@/lib/resonance/prompt";

const RESERVE_LINES = [
  {
    reading:
      "What you describe asks for a clinical anchor and an embodied counterweight in equal measure. Our Integrative Psychiatry team would hold the first; quiet work on the equestrian grounds would hold the second.",
    clinical: "Integrative Psychiatry",
    holistic: "Equestrian & Nature Therapy",
  },
  {
    reading:
      "Restoration of this kind is rarely accomplished by a single instrument. Personalized Pharmacology, informed by a genome panel, paired with Private Chef Cuisine designed by a metabolic dietitian — these are the two we would compose first.",
    clinical: "Genetic Testing & Personalized Pharmacology",
    holistic: "Private Chef Cuisine",
  },
  {
    reading:
      "We hear in your words a nervous system that has been asked to carry too much for too long. Neuro-Feedback recalibration in the morning, Cold Plunge & Sauna ritual at dusk — a clinical and somatic pair, considered together.",
    clinical: "Neuro-Feedback",
    holistic: "Cold Plunge & Sauna",
  },
];

export function fallbackResonance(input: string): ResonanceReading {
  // Pseudo-stable selection so identical inputs return identical fallbacks.
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) | 0;
  const pick = RESERVE_LINES[Math.abs(hash) % RESERVE_LINES.length];
  return {
    echo: input.slice(0, 80),
    ...pick,
    intent_signal: "contemplating",
  };
}
