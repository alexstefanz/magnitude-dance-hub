-- =========================================================
-- Magnitude Dance – clean schema
-- =========================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ---------- roles ----------
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin');
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------- dance styles ----------
CREATE TABLE public.dance_styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  benefits TEXT[] NOT NULL DEFAULT '{}',
  learning_points TEXT[] NOT NULL DEFAULT '{}',
  faq JSONB NOT NULL DEFAULT '[]',
  image_url TEXT,
  hero_image_url TEXT,
  reel_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER dance_styles_updated BEFORE UPDATE ON public.dance_styles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- instructors ----------
CREATE TABLE public.instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role_title TEXT,
  image_url TEXT,
  short_description TEXT,
  biography TEXT,
  dance_history TEXT,
  achievements TEXT,
  dance_meaning TEXT,
  styles TEXT[] NOT NULL DEFAULT '{}',
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER instructors_updated BEFORE UPDATE ON public.instructors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- schedule ----------
CREATE TABLE public.schedule_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time TIME NOT NULL,
  end_time TIME,
  dance_style_id UUID REFERENCES public.dance_styles(id) ON DELETE SET NULL,
  style_label TEXT NOT NULL,
  instructor_ids UUID[] NOT NULL DEFAULT '{}',
  instructor_names TEXT,
  room TEXT NOT NULL DEFAULT 'Sala 1',
  level TEXT,
  status TEXT NOT NULL DEFAULT 'activ' CHECK (status IN ('activ','inscrieri_deschise','complet','anulat')),
  is_special BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER schedule_updated BEFORE UPDATE ON public.schedule_entries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- pricing ----------
CREATE TABLE public.pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'grup',
  price NUMERIC(10,2) NOT NULL,
  discounted_price NUMERIC(10,2),
  price_unit TEXT NOT NULL DEFAULT 'RON',
  sessions_count INT,
  description TEXT,
  eligibility_notes TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER pricing_updated BEFORE UPDATE ON public.pricing_packages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- events ----------
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  image_url TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  short_description TEXT,
  event_type TEXT,
  facebook_event_url TEXT,
  external_url TEXT,
  registration_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- party events ----------
CREATE TABLE public.party_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  party_date DATE,
  image_url TEXT,
  short_description TEXT,
  facebook_album_url TEXT,
  external_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER party_updated BEFORE UPDATE ON public.party_events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- choreographies ----------
CREATE TABLE public.choreographies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Ștefan',
  description TEXT,
  video_url TEXT,
  reel_url TEXT,
  thumbnail_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER choreo_updated BEFORE UPDATE ON public.choreographies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- why magnitude ----------
CREATE TABLE public.why_magnitude_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  reel_url TEXT,
  video_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER why_updated BEFORE UPDATE ON public.why_magnitude_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- enrollment campaigns ----------
CREATE TABLE public.enrollment_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  dance_style_id UUID REFERENCES public.dance_styles(id) ON DELETE SET NULL,
  style_label TEXT,
  start_date DATE,
  end_date DATE,
  whatsapp_message TEXT,
  cta_label TEXT NOT NULL DEFAULT 'Înscrie-te prin WhatsApp',
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER campaigns_updated BEFORE UPDATE ON public.enrollment_campaigns FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- reviews ----------
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  avatar_url TEXT,
  source TEXT NOT NULL DEFAULT 'google',
  review_date DATE,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- site settings ----------
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  label TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- registrations (private) ----------
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  who_am_i TEXT,
  selected_course TEXT,
  message TEXT,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  gdpr_consent_at TIMESTAMPTZ,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'nou' CHECK (status IN ('nou','contactat','inscris','nu_raspunde','inchis')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER registrations_updated BEFORE UPDATE ON public.registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
GRANT SELECT, UPDATE, DELETE ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage registrations" ON public.registrations FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ---------- feedback (private) ----------
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL,
  instructor_label TEXT,
  course_label TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  message TEXT,
  allow_testimonial BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'nou' CHECK (status IN ('nou','verificat','aprobat_testimonial','arhivat')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER feedback_updated BEFORE UPDATE ON public.feedback FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
GRANT SELECT, UPDATE, DELETE ON public.feedback TO authenticated;
GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage feedback" ON public.feedback FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ---------- rate limiting (server-side only) ----------
CREATE TABLE public.form_submission_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX form_submission_log_idx ON public.form_submission_log (ip_hash, form_type, created_at DESC);
GRANT ALL ON public.form_submission_log TO service_role;
ALTER TABLE public.form_submission_log ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- Public content: anon + authenticated read (active only), admin write
-- =========================================================
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['dance_styles','instructors','schedule_entries','pricing_packages','events','party_events','choreographies','why_magnitude_items','enrollment_campaigns','reviews']
  LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "public read active" ON public.%I FOR SELECT USING (is_active = true)', t);
    EXECUTE format('CREATE POLICY "admins read all" ON public.%I FOR SELECT TO authenticated USING (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admins insert" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admins update" ON public.%I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t);
    EXECUTE format('CREATE POLICY "admins delete" ON public.%I FOR DELETE TO authenticated USING (public.is_admin())', t);
  END LOOP;
END $$;

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "admins insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admins update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- =========================================================
-- Seed content
-- =========================================================
INSERT INTO public.site_settings (key, value, label) VALUES
  ('site_name', 'Magnitude Dance', 'Nume site'),
  ('tagline', 'We are emotion in motion', 'Slogan'),
  ('hero_title', 'Magnitude Dance', 'Titlu hero'),
  ('hero_subtitle', 'Comunitatea de dans latino din Iași – salsa, bachata, kizomba, petreceri și oameni faini.', 'Subtitlu hero'),
  ('phone', '+40 758 515 946', 'Telefon'),
  ('whatsapp_stefan', '+40758515946', 'WhatsApp Ștefan'),
  ('whatsapp_default_message', 'Bună! Aș dori mai multe informații despre cursurile Magnitude Dance.', 'Mesaj WhatsApp presetat'),
  ('email', 'magnitudedance@gmail.com', 'Email'),
  ('address', 'Aleea Vasile Petrescu 5, Iași', 'Adresă'),
  ('facebook_url', 'https://www.facebook.com/magnitudedance', 'Facebook'),
  ('instagram_url', '', 'Instagram'),
  ('tiktok_url', '', 'TikTok'),
  ('youtube_url', '', 'YouTube'),
  ('google_maps_url', 'https://www.google.com/maps/search/?api=1&query=Aleea+Vasile+Petrescu+5+Iasi', 'Google Maps'),
  ('google_maps_embed_url', 'https://www.google.com/maps?q=Aleea%20Vasile%20Petrescu%205%2C%20Ia%C8%99i&output=embed', 'Google Maps embed'),
  ('google_analytics_id', '', 'Google Analytics ID'),
  ('google_reviews_rating', '4.7', 'Rating Google'),
  ('google_reviews_count', '248', 'Număr recenzii Google'),
  ('google_review_url', 'https://www.google.com/search?q=magnitude+dance+ia%C8%99i', 'Link recenzii Google'),
  ('hero_video_url', '', 'Video hero'),
  ('social_party_time', '22:30', 'Ora Social Party'),
  ('social_party_enabled', 'true', 'Social Party activ');

INSERT INTO public.dance_styles (slug, name, short_description, long_description, benefits, learning_points, display_order, seo_title, seo_description) VALUES
  ('salsa','Salsa','Ritm, energie și conexiune – dansul care te scoate din rutină.','[Descriere Salsa – de completat]', ARRAY['Condiție fizică','Coordonare','Încredere în sine','Comunitate'], ARRAY['Pași de bază','Conducere și urmărire','Muzicalitate','Figuri sociale'],1,'Cursuri Salsa Iași | Magnitude Dance','Cursuri de salsa în Iași pentru începători și avansați, la Magnitude Dance. Grupe noi, instructori dedicați și petreceri săptămânale.'),
  ('bachata','Bachata','Senzualitate, muzicalitate și mișcare fluidă.','[Descriere Bachata – de completat]', ARRAY['Relaxare','Muzicalitate','Conexiune în cuplu','Stil personal'], ARRAY['Pași de bază','Bachata sensual','Body movement','Figuri sociale'],2,'Cursuri Bachata Iași | Magnitude Dance','Cursuri de bachata în Iași, de la începători la avansați. Înscrie-te la Magnitude Dance.'),
  ('kizomba','Kizomba','Conexiune profundă și mișcare lentă, elegantă.','[Descriere Kizomba – de completat]', ARRAY['Conexiune','Echilibru','Eleganță','Relaxare'], ARRAY['Pași de bază','Conexiune și postură','Saidas','Muzicalitate'],3,'Cursuri Kizomba Iași | Magnitude Dance','Cursuri de kizomba în Iași la Magnitude Dance. Grupe pentru începători și intermediari.'),
  ('dansul-mirilor','Dansul Mirilor','Coregrafie personalizată pentru cea mai importantă zi.','[Descriere Dansul Mirilor – de completat]', ARRAY['Coregrafie unică','Ședințe private','Program flexibil','Siguranță pe ringul de dans'], ARRAY['Alegerea melodiei','Coregrafie personalizată','Ținută și atitudine','Repetiții'],4,'Dansul Mirilor Iași | Magnitude Dance','Cursuri private pentru dansul mirilor în Iași. Coregrafie personalizată la Magnitude Dance.'),
  ('rueda-de-casino','Rueda de Casino','Salsa în cerc, cu comenzi și multă distracție.','[Descriere Rueda de Casino – de completat]', ARRAY['Lucru în echipă','Reacție rapidă','Distracție','Socializare'], ARRAY['Comenzi de bază','Schimburi de partener','Sincronizare','Rueda socială'],5,'Rueda de Casino Iași | Magnitude Dance','Cursuri și workshopuri de Rueda de Casino în Iași la Magnitude Dance.'),
  ('dans-modern-copii','Dans Modern Copii','Mișcare, joacă și încredere pentru cei mici.','[Descriere Dans Modern Copii – de completat]', ARRAY['Coordonare','Disciplină','Încredere','Prietenii noi'], ARRAY['Tehnică de bază','Ritm și muzicalitate','Coregrafii de grup','Prezență scenică'],6,'Dans Modern Copii Iași | Magnitude Dance','Cursuri de dans modern pentru copii în Iași la Magnitude Dance.'),
  ('lady-styling','Lady Styling','Stil, feminitate și atitudine – salsa & bachata.','[Descriere Lady Styling – de completat]', ARRAY['Stil personal','Postură','Feminitate','Încredere'], ARRAY['Body movement','Brațe și mâini','Turații','Atitudine scenică'],7,'Lady Styling Iași | Magnitude Dance','Cursuri Lady Styling salsa și bachata în Iași la Magnitude Dance.');

INSERT INTO public.instructors (slug, name, role_title, short_description, biography, styles, display_order) VALUES
  ('stefan-cosmin-ioneasa','Ștefan Cosmin Ioneasa','Fondator & instructor','Un om simplu, din Iași, care a descoperit dansul pe la 5 ani și n-a mai vrut să se oprească.','Hei! Eu sunt Ștefan Cosmin Ioneasa. Un om simplu, din Iași, care a descoperit dansul pe la 5 ani și n-a mai vrut să se oprească. La vârsta aia, habar n-aveam ce-i cu mine, dar știam că muzica mă mișcă — la propriu. Cu timpul, joaca s-a transformat într-un drum clar. Astăzi, dansul e felul meu de a spune cine sunt: cu energie, emoție și mult suflet.', ARRAY['Salsa','Bachata','Kizomba'],1),
  ('stefania','Ștefania','Instructor','[Descriere instructor – de completat]','[Biografie – de completat]', ARRAY['Salsa','Bachata','Lady Styling'],2),
  ('adelina','Adelina','Instructor','[Descriere instructor – de completat]','[Biografie – de completat]', ARRAY['Kizomba'],3),
  ('alle','Alle','Instructor','[Descriere instructor – de completat]','[Biografie – de completat]', ARRAY['Salsa','Bachata'],4),
  ('vlad','Vlad','Instructor','[Descriere instructor – de completat]','[Biografie – de completat]', ARRAY['Salsa','Bachata'],5);

-- schedule
INSERT INTO public.schedule_entries (day_of_week, start_time, end_time, dance_style_id, style_label, instructor_names, room, level, display_order)
SELECT v.dow, v.st::time, v.et::time, ds.id, v.style, v.instr, v.room, v.lvl, v.ord
FROM (VALUES
  (1,'18:00','19:00','kizomba','Kizomba','Ștefan & Adelina','Sala 1','Începători',1),
  (1,'19:00','20:00','salsa','Salsa','Ștefan & Alle','Sala 1','Intermediari 2',2),
  (1,'19:00','20:00','salsa','Salsa','Vlad & Adelina','Sala 2','Improvers',3),
  (1,'20:00','21:00','bachata','Bachata','Ștefan & Alle','Sala 1','Intermediari 2',4),
  (1,'20:00','21:00','bachata','Bachata','Vlad & Adelina','Sala 2','Improvers',5),
  (1,'21:00','22:00','kizomba','Kizomba','Ștefan & Adelina','Sala 1','Intermediari',6),
  (2,'18:45','20:15','salsa','Salsa','Ștefan & Ștefania','Sala 1','Avansați',1),
  (2,'20:15','21:15','salsa','Salsa','Ștefan & Ștefania','Sala 1','Intermediari 1',2),
  (3,'18:00','19:00','kizomba','Kizomba','Ștefan & Adelina','Sala 1','Începători',1),
  (3,'19:00','20:00','salsa','Salsa','Ștefan & Alle','Sala 1','Intermediari 2',2),
  (3,'19:00','20:00','salsa','Salsa','Vlad & Adelina','Sala 2','Improvers',3),
  (3,'20:00','21:00','bachata','Bachata','Ștefan & Alle','Sala 1','Intermediari 2',4),
  (3,'20:00','21:00','bachata','Bachata','Vlad & Adelina','Sala 2','Improvers',5),
  (3,'21:00','22:00','kizomba','Kizomba','Ștefan & Adelina','Sala 1','Intermediari',6),
  (4,'18:45','20:15','bachata','Bachata','Ștefan & Ștefania','Sala 1','Avansați',1),
  (4,'20:15','21:15','salsa','Salsa','Ștefan & Ștefania','Sala 1','Intermediari 1',2),
  (4,'21:15','22:15','bachata','Bachata','Ștefan & Ștefania','Sala 1','Intermediari 1',3),
  (5,'19:00','20:00','salsa','Salsa','Vlad & Ștefania','Sala 1','Începători',1),
  (5,'19:00','20:00','salsa','Tehnică Salsa & Bachata','Ștefan','Sala 2','All levels',2),
  (5,'20:00','21:00','bachata','Bachata','Vlad & Ștefania','Sala 1','Începători',3),
  (5,'21:00','22:00','lady-styling','Bachata Lady Styling','Ștefania','Sala 1','Începători',4)
) AS v(dow, st, et, slug, style, instr, room, lvl, ord)
LEFT JOIN public.dance_styles ds ON ds.slug = v.slug;

INSERT INTO public.schedule_entries (day_of_week, start_time, end_time, style_label, room, level, is_special, notes, display_order)
VALUES (6,'22:30','03:00','Social Party','Sala 1','Toate nivelurile', true, 'Petrecerea săptămânală Magnitude – muzică latino, oameni faini și dans până dimineață.',1);

INSERT INTO public.pricing_packages (name, category, price, discounted_price, sessions_count, description, eligibility_notes, display_order, is_featured) VALUES
  ('Salsa / Bachata – 8 ședințe','grup',240,NULL,8,'Abonament lunar pentru un stil, 2 ședințe pe săptămână.','Al doilea abonament eligibil de Salsa/Bachata costă 160 RON. Oferta nu include Kizomba.',1,true),
  ('Al doilea abonament Salsa / Bachata','grup',160,NULL,8,'Reducere pentru al doilea abonament de Salsa sau Bachata.','Valabil doar pentru Salsa și Bachata, nu pentru Kizomba.',2,false),
  ('Un stil – 1 dată pe săptămână','grup',160,NULL,4,'Un stil de dans, o ședință pe săptămână.',NULL,3,false),
  ('Două stiluri – 1 dată pe săptămână','grup',270,NULL,8,'Două stiluri de dans, câte o ședință pe săptămână.',NULL,4,false),
  ('Ședință singulară','grup',40,NULL,1,'Plata per ședință.',NULL,5,false),
  ('Dansul Mirilor – ședință','privat',240,NULL,1,'Ședință privată pentru dansul mirilor.',NULL,6,false),
  ('Dansul Mirilor – pachet 7 ședințe','privat',200,NULL,7,'200 RON / ședință în pachetul de 7 ședințe.',NULL,7,true),
  ('Privat Salsa / Bachata / Kizomba – ședință','privat',220,NULL,1,'Ședință privată individuală sau de cuplu.',NULL,8,false),
  ('Privat Salsa / Bachata / Kizomba – pachet 5','privat',180,NULL,5,'180 RON / ședință în pachetul de 5 ședințe.',NULL,9,false);

INSERT INTO public.why_magnitude_items (title, description, icon, display_order) VALUES
  ('Comunitate','Peste toate, Magnitude e o comunitate de oameni care se bucură împreună de dans.','users',1),
  ('Socializare','Petreceri săptămânale, ieșiri la terasă, munte și Activity Day. [Galerie – în curs de actualizare]','party-popper',2),
  ('Evoluție','Grupe pe niveluri, coregrafii și scene. [Reel – va fi adăugat ulterior]','trending-up',3),
  ('Pasiune','Dansăm pentru că ne place. Simplu.','heart',4),
  ('Profesionalism','Instructori dedicați, structură clară pe niveluri și săli amenajate.','graduation-cap',5),
  ('Distracție','Râdem mult, greșim relaxat și învățăm cu zâmbetul pe față.','sparkles',6);

INSERT INTO public.reviews (reviewer_name, rating, review_text, review_date, display_order) VALUES
  ('Miky Raileanu',5,'Recomand cu drag – o echipă foarte plăcută, care te face să te simți inclus și să vrei să revii, cu instructori foarte înțelegători.', '2025-10-01',1),
  ('Neculai I. Fantanaru',5,'Bun','2025-03-01',2),
  ('Catalin Butacu',5,'[Recenzie fără text]','2025-06-01',3);

INSERT INTO public.party_events (title, short_description, display_order) VALUES
  ('Social Party Magnitude','Sâmbătă, de la 22:30 – petrecerea săptămânală Magnitude. [Galerie foto – în curs de actualizare]',1);

INSERT INTO public.choreographies (title, category, description, display_order) VALUES
  ('Coregrafie Ștefan','Ștefan','[Reel – va fi adăugat ulterior]',1),
  ('Echipa de instructori','Echipe instructori','[Video – de adăugat ulterior]',2),
  ('Ladies Group','Ladies','[Reel – va fi adăugat ulterior]',3),
  ('Bachata Advanced','Bachata Advanced','[Video – de adăugat ulterior]',4),
  ('Show aniversar','Aniversări','[Video – de adăugat ulterior]',5);
