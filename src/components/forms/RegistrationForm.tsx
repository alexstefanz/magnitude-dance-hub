import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { registrationSchema, submitRegistration } from "@/lib/forms.functions";
import { danceStylesQuery } from "@/lib/content";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const WHO_OPTIONS = ["Cursant nou", "Cursant Magnitude", "Vin cu partener", "Vin singur/ă", "Altul"];

type FieldErrors = Partial<Record<string, string>>;

export function RegistrationForm({
  defaultCourse,
  sourcePage,
}: {
  defaultCourse?: string;
  sourcePage?: string;
}) {
  const submit = useServerFn(submitRegistration);
  const { data: styles } = useQuery(danceStylesQuery);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);

  const mutation = useMutation({
    mutationFn: (values: Record<string, unknown>) =>
      submit({ data: registrationSchema.parse(values) }),
    onSuccess: () => {
      setDone(true);
      toast.success("Mulțumim! Te contactăm în cel mai scurt timp.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      whoAmI: String(form.get("whoAmI") ?? ""),
      selectedCourse: String(form.get("selectedCourse") ?? ""),
      message: String(form.get("message") ?? ""),
      gdprConsent: form.get("gdprConsent") === "on",
      sourcePage: sourcePage ?? "",
      honeypot: String(form.get("company") ?? ""),
    };

    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Te rugăm să verifici câmpurile marcate.");
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data);
  }

  if (done) {
    return (
      <div className="card-elevated p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-bold">Formular trimis cu succes!</h3>
        <p className="mt-2 text-muted-foreground">
          Îți mulțumim pentru înscriere. Te contactăm telefonic sau pe email cu toate detaliile.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton label="Scrie-ne pe WhatsApp" />
          <Button asChild variant="outline">
            <Link to="/orar">Vezi orarul</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-elevated space-y-5 p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume" error={errors.firstName} htmlFor="firstName" required>
          <Input id="firstName" name="firstName" autoComplete="family-name" maxLength={80} required />
        </Field>
        <Field label="Prenume" error={errors.lastName} htmlFor="lastName" required>
          <Input id="lastName" name="lastName" autoComplete="given-name" maxLength={80} required />
        </Field>
        <Field label="Telefon" error={errors.phone} htmlFor="phone" required>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            required
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="email" required>
          <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} required />
        </Field>
        <Field label="Cine sunt" error={errors.whoAmI} htmlFor="whoAmI">
          <select
            id="whoAmI"
            name="whoAmI"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
            defaultValue=""
          >
            <option value="">Alege o opțiune</option>
            {WHO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Cursul dorit" error={errors.selectedCourse} htmlFor="selectedCourse">
          <select
            id="selectedCourse"
            name="selectedCourse"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
            defaultValue={defaultCourse ?? ""}
          >
            <option value="">Alege cursul</option>
            {((styles ?? []) as { id: string; name: string }[]).map((style) => (
              <option key={style.id} value={style.name}>
                {style.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Mesaj (opțional)" error={errors.message} htmlFor="message">
        <Textarea id="message" name="message" rows={4} maxLength={2000} />
      </Field>

      {/* Honeypot – ascuns pentru utilizatori, folosit împotriva spamului */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Companie</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
        <Checkbox id="gdprConsent" name="gdprConsent" className="mt-0.5" />
        <Label htmlFor="gdprConsent" className="text-sm font-normal leading-relaxed">
          Sunt de acord cu prelucrarea datelor mele personale în scopul contactării mele, conform{" "}
          <Link to="/politica-confidentialitate" className="font-medium text-primary underline">
            Politicii de Confidențialitate
          </Link>
          .
        </Label>
      </div>
      {errors.gdprConsent && <p className="text-sm text-destructive">{errors.gdprConsent}</p>}

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending && <Loader2 className="animate-spin" aria-hidden="true" />}
        Trimite înscrierea
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
