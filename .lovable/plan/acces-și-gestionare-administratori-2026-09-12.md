# Acces și gestionare administratori

Panoul de administrare există deja și acoperă tot ce ai cerut: formulare (înscrieri și feedback), orar, prețuri, plus cursuri, evenimente, party, campanii, recenzii și setări. Problema reală: nu există încă niciun cont, deci nimeni nu poate intra. Planul rezolvă accesul și adaugă gestionarea colegilor din panou.

## 1. Primul cont de administrator

- Se activează conectarea cu email și parolă (momentan oprită, deci orice încercare de login ar eșua).
- Se creează contul pentru `z.alexstefan@gmail.com`, confirmat, cu drepturi complete de administrator. Îți transmit în chat o parolă temporară pe care o schimbi la prima intrare.
- Un singur nivel de acces: oricine primește acces poate modifica tot.

## 2. Secțiune nouă „Utilizatori" în panou

- Listă cu toate persoanele care au acces: email, dacă are drepturi de administrator, data creării.
- Invitație pe email pentru un coleg nou; la acceptare își setează parola.
- Acordare și retragere de drepturi de administrator dintr-un singur click.
- Protecție: nu îți poți retrage propriile drepturi și nu poate rămâne site-ul fără niciun administrator.

## 3. Schimbare parolă

- În panou apare „Schimbă parola", cu parola actuală și cea nouă.
- Pe pagina de autentificare apare „Ai uitat parola?", care trimite un email de resetare și duce la o pagină dedicată de setare a parolei noi.

## 4. Curățare la pagina de autentificare

Opțiunea „Creează cont" se elimină, ca să nu se poată înregistra oricine din exterior. Conturile se creează doar prin invitație din panou.

## Detalii tehnice

- `enable_email_auth`, apoi creare user + rând `admin` în `user_roles` (INSERT direct, nu prin cod public).
- Migrare: politici RLS pe `user_roles` — SELECT pentru administratori (pe lângă „own roles read" existentă); fără INSERT/UPDATE/DELETE din client. Trigger care blochează ștergerea ultimului admin.
- `src/lib/admin-users.functions.ts`: server functions cu `.middleware([requireSupabaseAuth])`, care verifică rolul de admin prin `context.supabase.rpc('has_role', ...)` înainte de a încărca `supabaseAdmin` (import dinamic în handler) pentru `auth.admin.inviteUserByEmail` și listare useri.
- Panou nou `UsersPanel` + tab „Utilizatori" în `src/routes/_authenticated/admin.tsx`; formular parolă cu `updateUser({ password, current_password })`.
- Rută publică nouă `src/routes/reset-password.tsx` (`noindex`), `resetPasswordForEmail` cu `redirectTo`.
- Se verifică `src/start.ts` pentru middleware-ul de bearer token înainte de a folosi funcțiile protejate.
