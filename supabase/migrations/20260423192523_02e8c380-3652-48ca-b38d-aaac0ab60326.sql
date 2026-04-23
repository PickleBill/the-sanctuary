-- Phase 3: Prospectus requests + Resonance Readings (no PHI per HIPAA brief §4.1)
CREATE TABLE public.prospectus_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('Email', 'Phone', 'Signal')),
  contact_value TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Principal', 'Executive Assistant', 'Medical Professional', 'Trusted Advisor')),
  source TEXT,
  message TEXT,
  resonance_text TEXT,
  resonance_reading TEXT,
  intent_signal TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.resonance_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  input_text TEXT NOT NULL,
  reading TEXT NOT NULL,
  intent_signal TEXT,
  client_fingerprint TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prospectus_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resonance_readings ENABLE ROW LEVEL SECURITY;

-- Anonymous public can INSERT their own request (no read access). Server functions
-- use service-role and bypass RLS for admin reads later (Phase 5 concierge backstage).
CREATE POLICY "anon_can_submit_prospectus"
  ON public.prospectus_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anon_can_log_resonance"
  ON public.resonance_readings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Index for future concierge dashboard
CREATE INDEX prospectus_requests_created_at_idx ON public.prospectus_requests (created_at DESC);
CREATE INDEX resonance_readings_created_at_idx ON public.resonance_readings (created_at DESC);