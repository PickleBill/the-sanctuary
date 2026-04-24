/**
 * Shared ROLES list for the Cohort constellation.
 *
 * Used by:
 *  - <Cohort /> to render the 40-node constellation.
 *  - matchPeer server function to return a structured index that points back
 *    to the same role label client-side (so server stays anonymous).
 *
 * Order is permanent. New roles append to the end. Re-ordering would shift
 * the "matched node" semantics for visitors who saved an intent earlier.
 */
export const COHORT_ROLES = [
  "Founder · raised Series C",       // 0
  "Surgeon · Mayo",                  // 1
  "Federal Judge",                   // 2
  "Trustee · family office",         // 3 — safe neutral default
  "Olympian · retired",              // 4
  "Operator · two exits",            // 5
  "Author · NYT bestseller",         // 6
  "Parent · principal of two",       // 7
  "Managing Partner · law",          // 8
  "Public Official",                 // 9
  "Venture GP",                      // 10
  "CEO · public company",            // 11
  "Chief of Staff",                  // 12
  "Cardiologist",                    // 13
  "Headmaster",                      // 14
  "Chairman · holding co.",          // 15
  "Conductor",                       // 16
  "Foundation President",            // 17
  "Architect · principal",           // 18
  "Diplomat · former",               // 19
  "Producer · feature film",         // 20
  "Fund Manager",                    // 21
  "Chief Justice · state",           // 22
  "Founder · second time",           // 23
  "Editor-in-Chief",                 // 24
  "Investor · early-stage",          // 25
  "Pediatric Oncologist",            // 26
  "Rector",                          // 27
  "Hedge Fund Founder",              // 28
  "Anesthesiologist · chief",        // 29
  "Tech CEO · pre-IPO",              // 30
  "Three-Star General · retired",    // 31
  "Research Scientist · NIH",        // 32
  "Concert Pianist",                 // 33
  "Olympic Coach",                   // 34
  "GC · Fortune 100",                // 35
  "Restaurateur · Michelin",         // 36
  "Surgeon · Cleveland Clinic",      // 37
  "Real Estate Developer",           // 38
  "Philanthropist",                  // 39
] as const;

export type CohortRoleIndex = number;
