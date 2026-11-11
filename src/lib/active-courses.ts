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
    schedule: "Luni și miercuri, 19:00 – 21:00",
    price: "200 RON",
    instructors: "Ștefan Cosmin & Alle",
    title: "Înscrieri Curs Salsa & Bachata Iași – Începători | Magnitude Dance",
    description:
      "Curs Salsa & Bachata pentru începători în Iași, start 23 noiembrie. Luni și miercuri 19:00–21:00, cost 200 RON. Instructori Ștefan Cosmin & Alle.",
    headline: "🔥 Descoperă Salsa & Bachata – energie, pasiune și ritm latino!",
    paragraphs: [
      "Salsa, cu ritmurile ei afro-caraibiene pline de energie, și Bachata, dansul romantic din Republica Dominicană, sunt cele mai iubite dansuri latino de pereche. ❤️",
      "✨ Vrei să înveți să dansezi de la zero? Te așteptăm la cursurile de începători de la Magnitude Dance, unde vei învăța pas cu pas bazele ambelor stiluri, într-o atmosferă prietenoasă.",
      "Nu ai nevoie de experiență sau partener, ci doar de dorința de a învăța și de a te bucura de dans!",
    ],
  },
];

export function findActiveCourse(slug: string) {
  return ACTIVE_COURSES.find((c) => c.slug === slug);
}
