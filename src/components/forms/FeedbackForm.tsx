import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { feedbackSchema, submitFeedback } from "@/lib/forms.functions";
import { danceStylesQuery, instructorsQuery } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeedbackForm() {
  const submit = useServerFn(submitFeedback);
  const { data: instructors } = useQuery(instructorsQuery);
  const { data: styles } = useQuery(danceStylesQuery);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const mutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => submit({ data: feedbackSchema.parse(values) }),
    onSuccess: () => {
      setDone(true);
      toast.success("Mulțumim pentru feedback!");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const instructorId = String(form.get("instructorId") ?? "");
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      instructorId: instructorId || null,
      instructorLabel:
        ((instructors ?? []) as { id: string; name: string }[]).find((i) => i.id === instructorId)
          ?.name ?? "",
      courseLabel: String(form.get("courseLabel") ?? ""),
      rating,
      message: String(form.get("message") ?? ""),
      allowTestimonial: form.get("allowTestimonial") === "on",
      honeypot: String(form.get("website") ?? ""),
    };

    const parsed = feedbackSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
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
        <h3 className="mt-4 font-display text-2xl font-bold">Feedback trimis!</h3>
        <p className="mt-2 text-muted-foreground">
          Îți mulțumim că ne ajuți să devenim mai buni. Părerea ta contează enorm pentru noi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-elevated space-y-5 p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nume (opțional)</Label>
          <Input id="name" name="name" maxLength={80} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email (opțional)</Label>
          <Input id="email" name="email" type="email" maxLength={255} />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructorId">Instructor</Label>
          <select
            id="instructorId"
            name="instructorId"
            defaultValue=""
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            <option value="">Alege instructorul</option>
            {((instructors ?? []) as { id: string; name: string }[]).map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="courseLabel">Curs</Label>
          <select
            id="courseLabel"
            name="courseLabel"
            defaultValue=""
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            <option value="">Alege cursul</option>
            {((styles ?? []) as { id: string; name: string }[]).map((style) => (
              <option key={style.id} value={style.name}>
                {style.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">
          Rating <span className="text-destructive">*</span>
        </legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`${value} din 5 stele`}
              aria-pressed={rating === value}
              className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <Star
                className={cn(
                  "size-8",
                  value <= rating ? "fill-accent text-accent" : "text-border",
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="message">
          Mesajul tău <span className="text-destructive">*</span>
        </Label>
        <Textarea id="message" name="message" rows={5} maxLength={2000} required />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
        <Checkbox id="allowTestimonial" name="allowTestimonial" className="mt-0.5" />
        <Label htmlFor="allowTestimonial" className="text-sm font-normal leading-relaxed">
          Sunt de acord ca mesajul meu să fie publicat pe site ca testimonial.
        </Label>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending && <Loader2 className="animate-spin" aria-hidden="true" />}
        Trimite feedback
      </Button>
    </form>
  );
}
