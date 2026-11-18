# Magnitude Dance Reimagined

Build a complete, modern, secure and production-ready website for a dance school called **Magnitude Dance**, based in Iași, Romania.

Current website reference:
https://magnitudedance.ro/

The current website is built in WordPress using Hello Elementor, Elementor, WPForms, PowerPack, Ultimate Addons, Yoast SEO, My Sticky Elements, cookie notification tools and Google Analytics.

The new website must NOT use WordPress.

The main reason for rebuilding the website is that the existing WordPress installation has been repeatedly compromised and malicious files keep reappearing even after removal.

This must therefore be a completely clean rebuild using a modern architecture.

Use:

* Lovable
* TypeScript
* Supabase
* Supabase Authentication
* Supabase Database
* Supabase Storage if needed
* Supabase Row Level Security
* Responsive frontend
* Secure admin dashboard

Do not migrate executable files, PHP files, WordPress plugins, WordPress themes or unknown JavaScript from the current website.

Only migrate reviewed content such as text, URLs, schedules and contact information.

Images, instructor descriptions, reels and some content will be updated later, so use placeholders where necessary.

All public website content must be in Romanian.

---

# PROJECT GOAL

Rebuild Magnitude Dance while keeping the general structure and identity of the current website, but improve:

* security
* administration
* visual design
* responsiveness
* speed
* SEO
* schedule management
* pricing management
* instructor management
* events management
* registrations
* feedback
* WhatsApp conversion

The website should communicate that Magnitude Dance is not only a dance school, but also a community focused on:

* dancing
* personal development
* socialization
* parties
* friendship
* events
* activities
* performance
* fun

The style should feel energetic, premium, modern, social and connected to Latin dance culture.

Do not make the website look like a generic SaaS website.

Use the current website as structural inspiration but modernize the overall UI.

---

# DESIGN

Preserve the current Magnitude Dance identity while improving the design.

Create a reusable design system with:

* primary color
* secondary color
* accent color
* dark background
* light background
* text colors
* borders
* buttons
* cards
* forms
* tabs
* badges
* filters
* modals
* admin UI components

Use:

* large typography
* clean spacing
* strong visual hierarchy
* modern cards
* subtle gradients
* subtle animations
* smooth hover effects
* modern transitions
* rounded corners where appropriate
* elegant dark sections where appropriate

The design should feel like a modern Latin dance academy and social dance community.

---

# RESPONSIVE DESIGN

The entire website must be fully responsive.

Optimize for:

* mobile
* tablet
* laptop
* desktop
* large desktop

Avoid horizontal scrolling.

Schedule, pricing cards and admin tables must remain usable on mobile.

Navigation must collapse into a clean mobile menu.

Buttons and form controls must be touch friendly.

---

# HEADER

Create a sticky modern header.

Navigation:

Acasă

Cursuri

* Salsa
* Bachata
* Kizomba
* Dansul Mirilor
* Rueda de Casino
* Dans Modern Copii
* Lady Styling

Orar

Instructori

Coregrafii

Evenimente

Party

Despre Noi

Contact

Primary CTA:

**Contactează-ne pe WhatsApp**

Add a WhatsApp icon.

Do not hardcode the WhatsApp number in multiple components.

Store it globally in site settings.

Create a configurable field:

WHATSAPP_STEFAN

Use this number initially:

+40 758 515 946

but make it editable from the admin dashboard.

---

# HOMEPAGE

Build the homepage using the following structure.

## HERO

Create a full-width video hero.

Use a video placeholder initially.

Content:

Magnitude Dance

Short tagline placeholder.

Primary CTA:

**Contactează-ne pe WhatsApp**

Secondary CTA:

**Vezi Orarul**

Also create an optional dynamic area for active enrollment campaigns:

**Înscrieri Active**

Example:

Înscrieri active – Salsa & Bachata Începători

Enrollment campaigns must come from the database and administrators must be able to enable or disable them.

---

# TODAY'S SCHEDULE

Immediately below the hero create:

**Astăzi la Magnitude**

Detect the current day automatically using the timezone:

Europe/Bucharest

Show only the classes scheduled for the current day.

The schedule must come from the same database used by the complete schedule.

Do not duplicate schedule data.

Example:

18:00 – Salsa – Începători – Ștefan – Sala 1

19:00 – Bachata – Intermediari – Ștefan & Instructor – Sala 1

Special rules:

Saturday:

Display:

**Social Party**

22:30

The administrator must be able to edit or disable this.

Sunday:

Display:

**Astăzi este liber. Ne vedem la următorul curs!**

Add a button:

**Vezi orarul complet**

---

# DANCE STYLE CARDS

Create a section:

**Descoperă cursurile Magnitude**

Create cards for:

Salsa

Bachata

Kizomba

Dansul Mirilor

Rueda de Casino

Dans Modern Copii

Lady Styling Salsa

Lady Styling Bachata

Each card should contain:

* image placeholder
* title
* short description placeholder
* button: Descoperă cursul

Each card should link to its dedicated page.

---

# INSTRUCTOR INTRODUCTION

Create a homepage section introducing the team.

Heading:

**Cunoaște echipa Magnitude**

Use instructor image placeholders for now.

Add a short placeholder description.

CTA:

**Despre noi**

---

# FULL SCHEDULE

Create a complete dynamic schedule.

Heading:

**Orar**

Use tabs for days:

Luni

Marți

Miercuri

Joi

Vineri

Sâmbătă

Duminică

Add filters:

* Zi
* Stil
* Instructor
* Nivel
* Sală

Each schedule entry should support:

* start time
* end time
* dance style
* instructor
* multiple instructors
* room
* level
* status

Statuses:

Activ

Înscrieri deschise

Complet

Anulat

Recreate the current website schedule initially as closely as possible.

The entire schedule must come from the database.

Do not hardcode schedule entries inside frontend components.

---

# PRICING

Create a homepage section:

**Abonamente & Prețuri**

All pricing must be editable from the admin dashboard.

Use modern pricing cards.

Initial pricing rules:

Salsa / Bachata:

8 ședințe:
240 RON

Second eligible Salsa/Bachata package:
160 RON

This combined offer applies only to Salsa and Bachata.

Kizomba must NOT be included.

One style once per week:
160 RON

Two styles once per week:
270 RON

Single class:
40 RON / ședință

Private lessons – Dansul Mirilor:

Single lesson:
240 RON

Package of 7:
200 RON / ședință

Private lessons – Salsa / Bachata / Kizomba:

Single lesson:
220 RON

Package of 5:
180 RON / ședință

Create a flexible pricing database.

Each pricing package must support:

* name
* category
* regular price
* discounted price
* number of sessions
* description
* eligibility notes
* display order
* active / inactive
* featured status

Do not hardcode the pricing structure.

---

# DE CE MAGNITUDE?

Create a section:

**De ce Magnitude?**

Use modern cards.

Suggested concepts:

Comunitate

Socializare

Evoluție

Pasiune

Profesionalism

Distracție

Each card should support:

* title
* description
* icon
* image
* optional reel URL
* optional video
* display order
* active status

Use placeholders for reels for now.

Future content examples:

Socializare:
photos/videos from terrace, mountains and Activity Day.

Evoluție:
competition videos, SalsaNama, shows or student performances.

Videos should open inside a modern modal/lightbox.

---

# GOOGLE REVIEWS

Create a Google Reviews slider.

Initially create the component and use placeholders.

Later the existing Google Reviews integration may be added after reviewing the script.

Do not blindly copy JavaScript from the compromised WordPress website.

Review cards should include:

* reviewer name
* rating
* review
* optional avatar
* navigation arrows
* pagination
* mobile swipe support

---

# INSTAGRAM / SOCIAL MEDIA

Create a section:

**Urmărește Magnitude**

Include:

Instagram

TikTok

Facebook

Create a placeholder Instagram/Reels feed.

Architecture should allow future integration with Instagram.

Add the new Instagram and TikTok links through global site settings.

---

# WHATSAPP

WhatsApp must be the primary conversion method.

Add a floating WhatsApp button.

Primary message:

**Contactează-ne pe WhatsApp**

Use a prefilled message:

**Bună! Aș dori mai multe informații despre cursurile Magnitude Dance.**

Do not create a large standalone registration section on the homepage.

WhatsApp should be the main CTA.

However, retain a registration/contact form accessible from:

* Contact page
* active enrollment campaigns
* optional modal

---

# REGISTRATION FORM

Recreate the current registration form.

Fields:

Nume*

Prenume*

Telefon*

Email*

Sunt: dropdown

Vreau să mă înscriu la: dropdown

Mesaj

GDPR checkbox:

**Accept ca datele de mai sus să fie folosite pentru a fi contactat(ă) în conformitate cu Politica de Confidențialitate.**

The GDPR checkbox must be required.

Store submissions securely inside Supabase.

Each registration should contain:

* id
* first name
* last name
* phone
* email
* selected course
* message
* GDPR consent
* GDPR consent timestamp
* submission date
* source page
* status
* admin notes

Registration statuses:

Nou

Contactat

Înscris

Nu răspunde

Închis

Public users must never be able to read submissions.

Only authorized administrators can access registrations.

---

# FEEDBACK FORM

Create a separate:

**Formular Feedback**

Fields:

* Nume – optional
* Email – optional
* Instructor
* Curs
* Rating 1–5
* Mesaj
* permission to use feedback as testimonial

Admin statuses:

Nou

Verificat

Aprobat testimonial

Arhivat

Store feedback inside the admin dashboard.

---

# INSTRUCTORS

Create:

/instructori

Heading:

**Instructorii Magnitude**

Create instructor cards.

Each instructor should support:

* name
* image
* short description
* full biography
* dance history
* palmares / achievements
* what dance represents for the instructor
* dance styles taught
* social media links
* display order
* active status

Use placeholders for images and biographies initially.

Do not invent achievements.

---

# DANCE STYLE PAGES

Create separate SEO-friendly pages:

/salsa

/bachata

/kizomba

/dansul-mirilor

/rueda-de-casino

/dans-modern-copii

/lady-styling

Each page should contain:

* hero
* introduction
* benefits
* what students learn
* instructor section
* automatically filtered schedule
* relevant pricing
* photo placeholders
* video/reel placeholders
* WhatsApp CTA
* FAQ

Use placeholders for descriptions that will be updated later.

---

# LADY STYLING

Include:

Salsa Lady Styling

Bachata Lady Styling

Allow administrators to create active enrollment campaigns.

CTA:

**Înscrie-te prin WhatsApp**

Use Stefan's configurable WhatsApp number.

---

# CHOREOGRAPHIES

Create:

/coregrafii

Heading:

**Coregrafii Magnitude**

Use placeholder introduction text.

Create video/reel cards grouped by:

* Ștefan
* instructor teams
* Ladies groups
* Bachata Advanced
* performances
* anniversaries
* special projects

All choreography entries must be manageable from the admin dashboard.

---

# PARTY PAGE

Create:

/party

Include:

* hero image placeholder
* description placeholder
* Social Party information
* gallery placeholders
* previous parties
* Facebook album links

Each party entry should support:

* title
* date
* image
* short description
* Facebook album URL
* external URL

Clicking the relevant CTA should open the Facebook album when available.

---

# EVENTS

Create:

/evenimente

Also create a homepage section:

**Evenimente viitoare**

Event cards should support:

* title
* image
* start date
* end date
* location
* short description
* event type
* Facebook event URL
* external URL
* registration URL
* featured status

Upcoming events should be shown automatically.

Past events should automatically appear under:

**Evenimente trecute**

Administrators must be able to create, edit, archive and feature events.

---

# ABOUT PAGE

Create:

/despre-noi

Include:

* Magnitude Dance story
* philosophy
* community
* instructors
* achievements
* testimonials
* gallery placeholders

Keep the current positioning:

**We are emotion in motion**

Use it elegantly within the page.

---

# CONTACT PAGE

Create:

/contact

Use the following initial contact information:

Magnitude Dance

Telefon:
+40 758 515 946

Email:
[magnitudedance@gmail.com](mailto:magnitudedance@gmail.com)

Adresă:
Aleea Vasile Petrescu 5, Iași

All these values must be editable through site settings.

Include:

* WhatsApp CTA
* phone CTA
* email
* registration form
* Google map
* social media links

---

# FOOTER

Create a large modern footer.

Column 1:

Magnitude Dance

Short description placeholder.

Column 2:

Link-uri rapide

Acasă

Despre noi

Instructori

Orar

Prețuri

Evenimente

Contact

Column 3:

Cursuri de dans

Salsa

Bachata

Kizomba

Dansul Mirilor

Rueda de Casino

Dans Modern Copii

Lady Styling

Column 4:

Contact

Phone

Email

Address

Social Media:

Facebook

Instagram

TikTok

Include the location/map.

Bottom row:

**Copyright Magnitude Dance – {CURRENT_YEAR}. Toate drepturile rezervate.**

The year must update automatically.

Never hardcode 2026.

Also include:

Politica de Confidențialitate

Politica Cookies

---

# ADMIN DASHBOARD

Create a secure admin dashboard:

/admin

The admin area must not be visible inside the public navigation.

Authentication is mandatory.

Use Supabase Authentication.

Create the following sections.

## Dashboard Overview

Display:

* registrations this month
* new registrations
* upcoming events
* active classes
* feedback waiting for review

## Orar

Administrators must be able to:

* create class
* edit class
* archive class
* delete class if appropriate
* duplicate class
* change time
* change day
* change instructor
* assign multiple instructors
* change room
* change level
* change status

## Prețuri

Allow administrators to:

* create package
* edit package
* update price
* update description
* reorder packages
* activate/deactivate packages

## Înscrieri

Create a table containing:

* date
* name
* phone
* email
* selected course
* status

Include:

* search
* filters
* sorting
* registration details
* admin notes
* status change

Add a quick action:

**Contactează pe WhatsApp**

This should open WhatsApp using the registration phone number.

## Instructori

Full CRUD management.

## Evenimente

Full CRUD management.

## Stiluri de dans

Full CRUD management.

## De ce Magnitude

Manage:

* title
* description
* icon
* image
* reel URL
* order
* active status

## Coregrafii

Manage video and reel entries.

## Feedback

Review and manage submitted feedback.

## Înscrieri active

Allow administrators to create enrollment campaigns.

Fields:

* title
* dance style
* start date
* end date
* active status
* WhatsApp message
* CTA label

## Setări

Editable global settings:

* phone
* WhatsApp number
* email
* address
* Facebook URL
* Instagram URL
* TikTok URL
* Google Maps URL
* Google Analytics ID

---

# DATABASE

Create a clean relational Supabase database.

Suggested tables:

profiles

instructors

dance_styles

schedule_entries

pricing_packages

registrations

feedback

events

enrollment_campaigns

why_magnitude_items

choreographies

party_events

site_settings

Use:

* UUIDs where appropriate
* created_at
* updated_at
* foreign keys
* status fields
* display order
* active/inactive status
* soft delete/archive where appropriate

---

# SECURITY

Security is extremely important because this project replaces a compromised WordPress installation.

Use Supabase Row Level Security.

Do not rely only on hidden admin routes.

Admin permissions must also be validated at database level.

Public users may only read explicitly public information.

Public users may submit forms.

Public users must NEVER be able to read:

* registrations
* phone numbers
* emails
* messages
* admin notes
* GDPR consent records
* private feedback

Never expose:

* service role keys
* database admin credentials
* private secrets
* backend secrets

Sanitize user input.

Validate forms server-side.

Add anti-spam protection.

Add reasonable form rate limiting.

Use secure error handling.

Do not expose database errors to visitors.

---

# OLD WEBSITE SECURITY

Treat the current WordPress installation as compromised.

Do not copy:

* PHP files
* themes
* plugins
* scripts
* unknown JavaScript
* unknown uploaded executable files

Only manually copy reviewed content.

Do not import the entire old WordPress database directly.

---

# GDPR

The website operates in Romania / European Union.

Create:

/politica-confidentialitate

/politica-cookies

Create a GDPR-compliant cookie consent system.

Cookie categories:

Necessary

Analytics

Marketing

Do not initialize non-essential tracking before appropriate consent.

Prepare Google Analytics integration.

Analytics must respect cookie consent.

---

# GOOGLE ANALYTICS

Prepare the website for GA4.

Google Analytics ID must be configurable from admin settings.

Do not hardcode it.

Do not load analytics before consent where required.

---

# SEO

SEO is important because the current website already has indexed pages.

Create for every page:

* SEO title
* meta description
* canonical URL
* OpenGraph title
* OpenGraph description
* OpenGraph image
* semantic HTML

Use one main H1 per page.

Use proper H2 and H3 hierarchy.

Generate:

* sitemap.xml
* robots.txt

Use structured data where appropriate:

* LocalBusiness
* Organization
* Event
* FAQ

Keep important existing URLs where possible.

Examples:

/

/salsa

/bachata

/kizomba

/despre-noi

/contact

If an existing URL changes, prepare a 301 redirect mapping.

---

# LOCAL SEO

Optimize naturally for:

cursuri dans Iași

salsa Iași

bachata Iași

kizomba Iași

cursuri dans latino Iași

dansul mirilor Iași

școală de dans Iași

Avoid keyword stuffing.

---

# PERFORMANCE

Optimize for Core Web Vitals.

Use:

* lazy loading
* optimized images
* responsive images
* compressed assets
* minimal unnecessary JavaScript
* limited heavy animations
* layout shift prevention

The hero video must not significantly reduce mobile performance.

For mobile devices allow an optimized poster image instead of immediately loading a large background video.

---

# ACCESSIBILITY

Use:

* semantic HTML
* alt text
* proper input labels
* keyboard accessibility
* accessible modals
* visible focus states
* good contrast

Validation errors must be written clearly in Romanian.

---

# PLACEHOLDERS

Some content will be updated later.

Do not invent detailed biographies or achievements.

Use placeholders such as:

[Fotografie instructor – de înlocuit]

[Descriere instructor – de completat]

[Reel – va fi adăugat ulterior]

[Galerie foto – în curs de actualizare]

[Video – de adăugat ulterior]

The website should still look polished while placeholders are present.

---

# REUSABLE COMPONENTS

Build reusable components.

Examples:

Header

MobileNavigation

Footer

HeroSection

WhatsAppCTA

TodaySchedule

ScheduleCard

ScheduleFilters

DanceStyleCard

InstructorCard

PricingCard

EventCard

WhyMagnitudeCard

ReviewSlider

VideoModal

RegistrationForm

FeedbackForm

CookieConsent

Do not unnecessarily duplicate components.

---

# DYNAMIC CONTENT

The following information must come from the backend/database:

* schedule
* pricing
* instructors
* dance styles
* active enrollment campaigns
* events
* registrations
* feedback
* choreography videos
* party entries
* De ce Magnitude cards
* global site settings

Do not build these only as static mock data.

Administrators must be able to change these items without editing source code.

---

# USER EXPERIENCE

Visitors must quickly understand:

1. What dance styles are available?
2. What classes happen today?
3. What is the complete schedule?
4. How much do the classes cost?
5. Who are the instructors?
6. What events are coming?
7. How can they contact Magnitude?

WhatsApp should always remain easy to access without being intrusive.

---

# INITIAL IMPLEMENTATION

Start by creating:

1. complete project architecture
2. Supabase database schema
3. authentication
4. admin role and permissions
5. Row Level Security policies
6. global design system
7. header
8. footer
9. homepage
10. Today Schedule
11. full schedule architecture
12. pricing architecture
13. admin dashboard structure

After this, implement:

* dance pages
* instructor pages
* events
* party
* choreographies
* forms
* feedback
* site settings
* GDPR
* SEO

For integrations such as Google Reviews, Instagram feed and Google Analytics, create prepared components/placeholders first.

Do not blindly copy scripts from the old WordPress website.

---

# FINAL QUALITY CHECK

Before considering the project complete, audit the application for:

* security vulnerabilities
* incorrect Supabase RLS policies
* public access to private information
* broken links
* broken routes
* mobile responsiveness
* form validation
* GDPR consent
* SEO metadata
* accessibility
* hardcoded dynamic content
* performance issues
* TypeScript errors
* console errors

Fix all critical issues discovered during the audit.
Note: Use images / videos / logos from the actual website. I've attached a PDF scan from the actual website as design guide.

The final result should be a modern, secure, fast and easy-to-administer replacement for the existing Magnitude Dance WordPress website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://magnitude-dance-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed61b234-0d9d-4b0c-88c1-3fa5ef38bc12).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
