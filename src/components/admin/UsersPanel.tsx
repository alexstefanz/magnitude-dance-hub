import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { KeyRound, Loader2, ShieldCheck, ShieldOff, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  deleteAdminUser,
  inviteAdminUser,
  listAdminUsers,
  setAdminAccess,
  type AdminUser,
} from "@/lib/admin-users.functions";

export function UsersPanel({ currentUserId }: { currentUserId: string }) {
  const queryClient = useQueryClient();
  const fetchUsers = useServerFn(listAdminUsers);
  const invite = useServerFn(inviteAdminUser);
  const setAccess = useServerFn(setAdminAccess);
  const removeUser = useServerFn(deleteAdminUser);
  const [email, setEmail] = useState("");

  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => fetchUsers() as Promise<AdminUser[]>,
  });

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
  }

  const inviteMutation = useMutation({
    mutationFn: async (value: string) =>
      invite({ data: { email: value, redirectTo: `${window.location.origin}/reset-password` } }),
    onSuccess: async () => {
      toast.success("Invitația a fost trimisă pe email.");
      setEmail("");
      await refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const accessMutation = useMutation({
    mutationFn: async (input: { userId: string; isAdmin: boolean }) =>
      setAccess({ data: input }),
    onSuccess: async () => {
      toast.success("Drepturi actualizate.");
      await refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => removeUser({ data: { userId } }),
    onSuccess: async () => {
      toast.success("Cont șters.");
      await refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const users = usersQuery.data ?? [];
  const adminCount = users.filter((user) => user.is_admin).length;

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-xl font-bold">Invită un administrator</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            inviteMutation.mutate(email);
          }}
          className="flex flex-wrap items-end gap-3"
        >
          <div className="min-w-64 flex-1 space-y-2">
            <Label htmlFor="invite-email">Adresă de email</Label>
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nume@exemplu.ro"
              required
            />
          </div>
          <Button type="submit" disabled={inviteMutation.isPending}>
            {inviteMutation.isPending ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <UserPlus aria-hidden="true" />
            )}
            Trimite invitația
          </Button>
        </form>
        <p className="text-sm text-muted-foreground">
          Persoana invitată primește un email, își setează parola și obține automat drepturi de
          administrare.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold">Utilizatori ({users.length})</h2>
        {usersQuery.isLoading && <Skeleton className="h-40 w-full rounded-xl" />}
        {usersQuery.isError && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            {(usersQuery.error as Error).message}
          </p>
        )}
        <ul className="space-y-3">
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const lastAdmin = user.is_admin && adminCount <= 1;
            return (
              <li key={user.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display font-bold">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Creat: {new Date(user.created_at).toLocaleDateString("ro-RO")}
                      {user.last_sign_in_at
                        ? ` · Ultima intrare: ${new Date(user.last_sign_in_at).toLocaleDateString("ro-RO")}`
                        : " · Nu s-a autentificat încă"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user.is_admin ? (
                        <Badge>Administrator</Badge>
                      ) : (
                        <Badge variant="secondary">Fără drepturi</Badge>
                      )}
                      {isSelf && <Badge variant="outline">Contul tău</Badge>}
                      {!user.confirmed && <Badge variant="outline">Invitație în așteptare</Badge>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isSelf || lastAdmin || accessMutation.isPending}
                      onClick={() =>
                        accessMutation.mutate({ userId: user.id, isAdmin: !user.is_admin })
                      }
                    >
                      {user.is_admin ? (
                        <ShieldOff aria-hidden="true" />
                      ) : (
                        <ShieldCheck aria-hidden="true" />
                      )}
                      {user.is_admin ? "Retrage accesul" : "Acordă acces"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isSelf || lastAdmin || deleteMutation.isPending}
                      onClick={() => {
                        if (window.confirm(`Ștergi definitiv contul ${user.email}?`)) {
                          deleteMutation.mutate(user.id);
                        }
                      }}
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <PasswordPanel />
    </div>
  );
}

function PasswordPanel() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get("current") ?? "");
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");
    if (password !== confirm) {
      toast.error("Parolele noi nu coincid.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password,
      current_password: currentPassword,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Parola a fost schimbată.");
    form.reset();
  }

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-5">
      <h2 className="font-display text-xl font-bold">Schimbă parola</h2>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="current">Parola actuală</Label>
          <Input id="current" name="current" type="password" autoComplete="current-password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Parola nouă</Label>
          <Input
            id="new-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmă parola</Label>
          <Input
            id="confirm-password"
            name="confirm"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="sm:col-span-3">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <KeyRound aria-hidden="true" />}
            Salvează parola
          </Button>
        </div>
      </form>
    </section>
  );
}
