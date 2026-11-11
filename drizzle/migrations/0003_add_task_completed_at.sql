ALTER TABLE public.admin_tasks ADD COLUMN completed_at timestamptz;
UPDATE public.admin_tasks SET completed_at = updated_at WHERE status = 'finalizat';