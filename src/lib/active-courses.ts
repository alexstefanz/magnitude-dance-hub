import kizombaPoster from "@/assets/inscrieri-kizomba.png.asset.json";
import salsaBachataPoster from "@/assets/inscrieri-salsa-bachata.png.asset.json";

export type ActiveCourse = {
  slug: string;
  formCourse: string;
  name: string;
  level: string;
  image: string;
  start: string;
  schedule: string;
  price: string;
  instructors: string;
  title: string;
  description: string;
  headline: string;
  paragraphs: string[];
  location?: string;
  format?: string[];
  offerTitle?: string;
  offers?: { old: string; price: string; note?: string }[];
  sections?: { title: string; text: string }[];
  closing?: string;
};

export const ACTIVE_COURSES: ActiveCourse[] = [
  {
    slug: "kizomba-incepatori",
    formCourse: "Kizomba",
    name: "Kizomba",
    level: "Începător",
    image: kizombaPoster.url,
    start: "16 noiembrie",
    schedule: "Luni și miercuri, de la 21:00",
    price: "200 RON",
    instructors: "Ștefan Cosmin & Alle",
    title: "Înscrieri Curs Kizomba Iași – Începători | Magnitude Dance",
    description:
      "Curs Kizomba pentru începători în Iași, start 16 noiembrie. Luni și miercuri de la 21:00, cost 200 RON. Instructori Ștefan Cosmin & Alle.",
    headline: "💃 Descoperă Kizomba – dansul conexiunii și al ritmului!",
    paragraphs: [
      "Originară din Angola, Kizomba este un dans de pereche elegant și fluid, cu mișcări line, ritmuri senzuale și o conexiune aparte între parteneri. ❤️",
      "✨ Vrei să înveți să dansezi de la zero? Te așteptăm la cursurile de începători de la Magnitude Dance, unde vei descoperi pas cu pas frumusețea acestui stil de dans.",
      "Nu ai nevoie de experiență, ci doar de dorința de a învăța și de a te bucura de dans!",
    ],
  },
  {
    slug: "salsa-bachata-incepatori",
    formCourse: "Salsa",
    name: "Salsa & Bachata",
    level: "Începător",
    image: salsaBachataPoster.url,
    start: "23 noiembrie",
    schedule: "Luni & miercuri, 19:00 – 21:00",
    price: "350 lei/lună (Black Friday)",
    instructors: "Ștefan Cosmin & Alle",
    title: "Înscrieri Curs Salsa & Bachata Iași – Începători | Magnitude Dance",
    description:
      "Salsa & Bachata pentru începători de la zero în Iași. Start 23 noiembrie, luni & miercuri 19:00–21:00. Reduceri de Black Friday: 350 lei/lună, 300 lei pentru studenți.",
    headline: "Salsa & Bachata pentru începători — de la ZERO!",
    paragraphs: [
      "Ai vrut mereu să înveți să dansezi, dar nu ai știut de unde să începi? Acum e momentul!",
      "Dacă simți că ai nevoie de ceva nou, de mai multă energie, încredere și oameni cu care să te simți bine, ai găsit locul potrivit.",
    ],
    location: "Magnitude Dance Iași (Aleea Vasile Petrescu nr. 5 – lângă Iulius Mall)",
    format: ["8 ședințe/lună", "2 ședințe pe săptămână", "2 ore de dans la fiecare întâlnire"],
    offerTitle: "Reduceri de Black Friday",
    offers: [
      { old: "400 lei", price: "350 lei/lună" },
      { old: "350 lei", price: "300 lei/lună", note: "Preț preferențial pentru studenții la licență" },
    ],
    sections: [
      { title: "O comunitate plină de viață", text: "Intri într-o comunitate plină de viață, unde oamenii dansează, socializează, ies în oraș, merg la petreceri, festivaluri și excursii. Și, bineînțeles, în fiecare sâmbătă avem petrecere — locul perfect să pui în practică ce ai învățat și să dansezi cu oameni din toată comunitatea." },
      { title: "Nu ai partener? Nicio problemă!", text: "La cursuri dansăm cu toată lumea, astfel încât să cunoști cât mai mulți oameni și să te simți confortabil. Iar dacă vii în cuplu și vrei să dansezi doar cu partenerul tău, respectăm asta." },
      { title: "Nu ai mai dansat niciodată? Perfect.", text: "Așa și trebuie. Te luăm pas cu pas și te învățăm totul de la zero." },
    ],
    closing: "Poți să vii doar să încerci — dacă nu îți place, nu trebuie să achiți nimic la plecare!",
  },
];

export function findActiveCourse(slug: string) {
  return ACTIVE_COURSES.find((c) => c.slug === slug);
}
