import salsaImg from "@/assets/course-salsa.jpg.asset.json";
import bachataImg from "@/assets/course-bachata.jpg.asset.json";
import kizombaImg from "@/assets/course-kizomba.jpg.asset.json";

export type CoursePoint = { title: string; text: string };
export type CourseContent = {
  heading: string;
  intro: string;
  image: string;
  whyTitle: string;
  why: CoursePoint[];
  learnTitle: string;
  learnIntro: string;
  learn: CoursePoint[];
  closingTitle: string;
  closing: string;
};

// Content migrated from the previous magnitudedance.ro course pages (text only).
export const COURSE_CONTENT: Record<string, CourseContent> = {
  salsa: {
    heading: "Dansează Salsa în Iași",
    intro:
      "Salsa nu este doar un stil de dans, ci o expresie vibrantă a pasiunii, energiei și bucuriei de a trăi. Originară din ritmurile afro-caraibiene, salsa combină mișcări rapide și spontane cu o eleganță și grație inconfundabile. Este un dans care creează conexiuni autentice între dansatori, printr-o chimie plină de dinamism și fluiditate.",
    image: salsaImg.url,
    whyTitle: "De ce să dansezi Salsa în Iași la Magnitude?",
    why: [
      { title: "Exprimă-ți emoțiile", text: "Pe ritmurile sale contagioase, salsa permite transmiterea emoțiilor intense." },
      { title: "Energie pură", text: "Fiecare mișcare este o explozie de energie și libertate." },
      { title: "Conexiune unică", text: "Vei simți o legătură specială cu partenerul de dans și cu muzica." },
    ],
    learnTitle: "Ce vei învăța la cursurile de salsa din Iași?",
    learnIntro: "În cadrul cursurilor de salsa de la Magnitude Dance, vei descoperi:",
    learn: [
      { title: "Pași de bază și tehnici avansate", text: "Pentru toate nivelurile, de la începători la avansați." },
      { title: "Coordonare și grație", text: "Vei deprinde mișcări fluide și elegante." },
      { title: "Ritm și spontaneitate", text: "Vei dansa cu încredere pe muzică captivantă." },
    ],
    closingTitle: "Te așteptăm să dansezi cu noi!",
    closing:
      "Alătură-te comunității noastre și lasă-te purtat de magia dansului salsa. Este momentul să te exprimi prin mișcări hotărâte, pline de viață și ritmuri pasionale!",
  },
  bachata: {
    heading: "Dansează Bachata în Iași",
    intro:
      "Bachata este un dans romantic și plin de farmec, originar din Republica Dominicană, cunoscut pentru mișcările sale fluide și pentru ritmurile pasionale care ating sufletul. Cu un stil jucăuș și emoțional, bachata te invită să explorezi conexiunea dintre tine și partenerul tău, într-un dans ce îmbină eleganța cu apropierea intimă.",
    image: bachataImg.url,
    whyTitle: "De ce să dansezi Bachata în Iași la Magnitude?",
    why: [
      { title: "Conexiune romantică", text: "Creează momente magice împreună cu partenerul tău." },
      { title: "Pași expresivi", text: "Mișcări ușor de învățat, dar pline de emoție." },
      { title: "Ritmuri pasionale", text: "Muzica evocă sentimente de iubire și dor." },
    ],
    learnTitle: "Ce vei învăța la cursurile de bachata din Iași?",
    learnIntro: "La cursurile de bachata de la Magnitude Dance, vei descoperi:",
    learn: [
      { title: "Tehnici de bază și avansate", text: "Deprinde pași fluizi și mișcări elegante." },
      { title: "Conexiune și emoție", text: "Cum să transmiți pasiunea prin dans." },
      { title: "Stil personalizat", text: "Descoperă cum să-ți creezi propriul stil pe ringul de dans." },
    ],
    closingTitle: "Te așteptăm să dansezi cu noi!",
    closing:
      "Vino să descoperi frumusețea bachatei și să creezi momente unice pe ritmuri romantice. Este timpul să te lași purtat de pasiunea și emoția acestui dans minunat!",
  },
  kizomba: {
    heading: "Dansează Kizomba în Iași",
    intro:
      "Kizomba este un dans senzual și fluid, originar din Angola, care se remarcă prin apropierea partenerilor și atmosfera intimă pe care o creează. Spre deosebire de alte stiluri de dans latino, kizomba pune accent pe conexiune, subtilitatea mișcărilor și eleganța pașilor.",
    image: kizombaImg.url,
    whyTitle: "De ce să dansezi Kizomba în Iași la Magnitude?",
    why: [
      { title: "Conexiune profundă", text: "Simte armonia perfectă cu partenerul tău." },
      { title: "Mișcări elegante", text: "Bucură-te de subtilitatea și fluiditatea dansului." },
      { title: "Atmosferă relaxantă", text: "Ritmul calm și melancolic creează o poveste emoționantă." },
    ],
    learnTitle: "Ce vei învăța la cursurile de kizomba din Iași?",
    learnIntro: "La cursurile de kizomba de la Magnitude Dance, vei descoperi:",
    learn: [
      { title: "Tehnici de conexiune", text: "Cum să te sincronizezi cu partenerul tău." },
      { title: "Pași și mișcări elegante", text: "Deprinde subtilitatea caracteristică kizombei." },
      { title: "Relaxare și complicitate", text: "Dansul devine o experiență plină de armonie." },
    ],
    closingTitle: "Te așteptăm să dansezi cu noi!",
    closing:
      "Descoperă frumusețea kizombei într-o atmosferă plină de complicitate și relaxare. Este momentul să te lași purtat de povestea unui dans profund și emoționant!",
  },
};
