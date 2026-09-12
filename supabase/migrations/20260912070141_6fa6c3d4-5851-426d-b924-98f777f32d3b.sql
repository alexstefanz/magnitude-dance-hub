-- is_admin only reads the caller's own role rows, so it does not need elevated rights
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin');
$$;

REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;