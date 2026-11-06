ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT true;
DROP POLICY IF EXISTS "public read settings" ON public.site_settings;
CREATE POLICY "public read public settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (is_public = true);
CREATE POLICY "admins read all settings" ON public.site_settings FOR SELECT TO authenticated USING (public.is_admin());