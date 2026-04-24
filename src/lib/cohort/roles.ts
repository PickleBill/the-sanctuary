/**
 * v3.6 — Shared archetypes for the Cohort constellation.
 *
 * Rewritten as "the X who…" sentences — peers you'd want at the dinner table,
 * not job titles. Same anonymity (no names), but the room reads as human.
 *
 * Order is permanent. New roles append to the end. Re-ordering would shift
 * the "matched node" semantics for visitors who saved an intent earlier.
 *
 * See mem://design/cohort-as-peers
 */
export const COHORT_ROLES = [
  "The founder who finally took the trip",            // 0
  "The surgeon who started painting again",           // 1
  "The judge who learned to fish here",               // 2
  "The trustee who stopped sleeping with his phone",  // 3 — safe neutral default
  "The retired Olympian, slow-cooking",               // 4
  "The operator between exits",                       // 5
  "The author halfway through her second book",       // 6
  "The parent of two who reads at night again",       // 7
  "The trial lawyer learning to lose",                // 8
  "The public servant who plants tomatoes",           // 9
  "The investor who calls her father every morning",  // 10
  "The CEO who kept the dog and lost the meeting",    // 11
  "The chief of staff who started running",           // 12
  "The cardiologist who still plays piano",           // 13
  "The headmaster who took a sabbatical",             // 14
  "The chairman who learned to cook one thing well",  // 15
  "The conductor who walks before sunrise",           // 16
  "The foundation president who said no to a board",  // 17
  "The architect who builds birdhouses now",          // 18
  "The diplomat tending an old garden",               // 19
  "The producer who finished the screenplay",         // 20
  "The fund manager who took up woodworking",         // 21
  "The chief justice who reads poetry at lunch",      // 22
  "The second-time founder, this time slower",        // 23
  "The editor who started writing letters by hand",   // 24
  "The early-stage investor learning to nap",         // 25
  "The doctor halfway through her second novel",      // 26
  "The rector who fly-fishes alone",                  // 27
  "The hedge fund founder who keeps chickens",        // 28
  "The anesthesiologist who hikes pre-dawn",          // 29
  "The tech CEO who finally took the call",           // 30
  "The general who keeps bees",                       // 31
  "The scientist who paints watercolors on weekends", // 32
  "The pianist who plays for no one",                 // 33
  "The Olympic coach who teaches her grandkids",      // 34
  "The general counsel who learned bread",            // 35
  "The restaurateur who eats simply now",             // 36
  "The surgeon who came for his daughter",            // 37
  "The developer who plants trees on Sundays",        // 38
  "The philanthropist who wakes for the birds",       // 39
] as const;

export type CohortRoleIndex = number;
