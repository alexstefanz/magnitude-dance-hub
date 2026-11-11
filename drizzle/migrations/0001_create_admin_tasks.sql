CREATE TABLE public.admin_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  notes text,
  category text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'de_facut',
  due_date date,
  assignee text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_tasks TO authenticated;
GRANT ALL ON public.admin_tasks TO service_role;
ALTER TABLE public.admin_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage tasks" ON public.admin_tasks FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());