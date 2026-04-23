-- Replace overly permissive WITH CHECK (true) with explicit shape constraints.
-- Public insert is intentional (inquiry forms), but we cap field sizes at the DB layer
-- as a second line of defense beyond the Zod validators in the server functions.

DROP POLICY IF EXISTS "anon_can_submit_prospectus" ON public.prospectus_requests;
DROP POLICY IF EXISTS "anon_can_log_resonance" ON public.resonance_readings;

CREATE POLICY "anon_submit_prospectus_bounded"
  ON public.prospectus_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(contact_value) BETWEEN 3 AND 120
    AND (message IS NULL OR char_length(message) <= 1500)
    AND (resonance_text IS NULL OR char_length(resonance_text) <= 600)
    AND (resonance_reading IS NULL OR char_length(resonance_reading) <= 1500)
  );

CREATE POLICY "anon_log_resonance_bounded"
  ON public.resonance_readings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(input_text) BETWEEN 2 AND 600
    AND char_length(reading) BETWEEN 1 AND 1000
  );