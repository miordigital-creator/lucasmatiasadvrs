CREATE TABLE public.triagem_envios (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.triagem_envios TO service_role;
ALTER TABLE public.triagem_envios ENABLE ROW LEVEL SECURITY;
CREATE INDEX triagem_envios_ip_created_idx ON public.triagem_envios (ip_hash, created_at DESC);