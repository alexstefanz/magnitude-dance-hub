export const SITE_URL = "https://magnitudedance.ro";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type SeoEntry = { title: string; description: string };

export const SEO = {
  "/": {
    title: "Cursuri de Dans Iași – Salsa, Bachata, Kizomba | Magnitude Dance",
    description:
      "Cursuri de salsa, bachata și kizomba în Iași, pentru toate nivelurile. Social party-uri, workshopuri și o comunitate plină de energie. Vino la o lecție!",
  },
  "/despre-noi/": {
    title: "Despre Noi – Instructori de Dans în Iași | Magnitude Dance",
    description:
      "Cunoaște echipa Magnitude Dance din Iași, condusă de Ștefan Cosmin Ioneasa. Povestea noastră și comunitatea pe care o construim prin dans.",
  },
  "/salsa/": {
    title: "Cursuri Salsa Iași – Începători și Avansați | Magnitude Dance",
    description:
      "Cursuri de salsa în Iași pentru începători, intermediari și avansați. Pași de bază, tehnică și muzicalitate, într-o atmosferă plină de energie. Înscrie-te!",
  },
  "/bachata/": {
    title: "Cursuri Bachata Iași – Toate Nivelurile | Magnitude Dance",
    description:
      "Cursuri de bachata în Iași pentru toate nivelurile. Mișcări fluide, conexiune și muzicalitate, cu instructori dedicați. Înscrie-te la Magnitude Dance!",
  },
  "/kizomba/": {
    title: "Cursuri Kizomba Iași – Începători și Avansați | Magnitude Dance",
    description:
      "Cursuri de kizomba în Iași: dans elegant din Angola, axat pe conexiune și muzicalitate, în grupe mici. Înscrie-te la Magnitude Dance!",
  },
  "/contact/": {
    title: "Contact și Înscrieri – Școală de Dans Iași | Magnitude Dance",
    description:
      "Contactează Magnitude Dance Iași pentru înscrieri la cursuri sau lecții private. Studio pe Aleea Vasile Petrescu 5. Telefon: 0758 515 946.",
  },
  // Not built yet — ready for when the pages exist.
  "/inscrieri-curs-de-dans-pentru-copii/": {
    title: "Cursuri de Dans pentru Copii Iași – Înscrieri | Magnitude Dance",
    description:
      "Înscrieri la cursul de dans pentru copii începători, în Iași. Grupe pe vârste, instructori răbdători și multă distracție. Rezervă un loc la Magnitude Dance!",
  },
  "/magnitude-anniversary/": {
    title: "Magnitude Anniversary – Petrecere Aniversară | Magnitude Dance",
    description:
      "Sărbătorim aniversarea Magnitude Dance cu social, workshopuri și invitați speciali. Detalii, program și bilete pentru evenimentul din Iași.",
  },
} satisfies Record<string, SeoEntry>;

export const NOT_FOUND_TITLE = "Pagina nu a fost găsită | Magnitude Dance";

/** Builds the full head() payload for a route defined in SEO. */
export function seoHead(path: keyof typeof SEO, image: string = DEFAULT_OG_IMAGE) {
  const { title, description } = SEO[path];
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: "Magnitude Dance" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
