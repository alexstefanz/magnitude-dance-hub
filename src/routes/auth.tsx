import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Autentificare administrare – Magnitude Dance" },
      { name: "description", content: "Zonă privată de administrare Magnitude Dance." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      toast.error("Date de autentificare incorecte.");
      return;
    }
    navigate({ to: "/admin" });
  }

  async function onForgotPassword() {
    if (!email.trim()) {
      toast.error("Completează adresa de email, apoi apasă din nou.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Ți-am trimis un email cu link pentru resetarea parolei.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 text-ink-foreground">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="font-display text-lg font-extrabold">
          MAGNITUDE<span className="text-accent"> DANCE</span>
        </p>
        <h1 className="mt-4 flex items-center gap-2 text-2xl">
          <ShieldCheck className="size-6 text-accent" aria-hidden="true" />
          Administrare
        </h1>
        <p className="mt-2 text-sm text-ink-foreground/75">
          Zonă privată. Conturile se creează doar prin invitație din panoul de administrare.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Parolă</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={8}
              required
            />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
            Intră în cont
          </Button>
        </form>

        <button
          type="button"
          onClick={onForgotPassword}
          disabled={loading}
          className="mt-5 text-sm text-accent underline"
        >
          Ai uitat parola?
        </button>
      </div>
    </div>
  );
}
