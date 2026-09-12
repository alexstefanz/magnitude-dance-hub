import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  is_admin: boolean;
};

type AuthedContext = {
  supabase: {
    from: (table: string) => {
      select: (columns: string) => {
        eq: (
          column: string,
          value: string,
        ) => Promise<{ data: { role: string }[] | null; error: { message: string } | null }>;
      };
    };
  };
  userId: string;
};

async function assertAdmin(context: AuthedContext) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId);
  if (error) throw new Error(error.message);
  if (!(data ?? []).some((row) => row.role === "admin")) {
    throw new Error("Nu ai drepturi de administrare.");
  }
}

async function adminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export const listAdminUsers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminUser[]> => {
    await assertAdmin(context as unknown as AuthedContext);
    const admin = await adminClient();

    const { data: authData, error: authError } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (authError) throw new Error(authError.message);

    const { data: roles, error: rolesError } = await admin
      .from("user_roles")
      .select("user_id, role");
    if (rolesError) throw new Error(rolesError.message);

    const adminIds = new Set(
      (roles ?? []).filter((row) => row.role === "admin").map((row) => row.user_id),
    );

    return authData.users.map((user) => ({
      id: user.id,
      email: user.email ?? "",
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at ?? null,
      confirmed: Boolean(user.email_confirmed_at),
      is_admin: adminIds.has(user.id),
    }));
  });

export const inviteAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string; redirectTo: string }) => {
    const email = String(input.email ?? "")
      .trim()
      .toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Adresa de email nu este validă.");
    const redirectTo = String(input.redirectTo ?? "");
    if (!/^https?:\/\//.test(redirectTo)) throw new Error("Link de redirecționare invalid.");
    return { email, redirectTo };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as AuthedContext);
    const admin = await adminClient();

    const { data: invited, error } = await admin.auth.admin.inviteUserByEmail(data.email, {
      redirectTo: data.redirectTo,
    });
    if (error) throw new Error(error.message);
    if (!invited.user) throw new Error("Invitația nu a putut fi trimisă.");

    const { error: roleError } = await admin
      .from("user_roles")
      .insert({ user_id: invited.user.id, role: "admin" });
    if (roleError && !roleError.message.includes("duplicate")) throw new Error(roleError.message);

    return { ok: true, email: data.email };
  });

export const setAdminAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string; isAdmin: boolean }) => ({
    userId: String(input.userId),
    isAdmin: Boolean(input.isAdmin),
  }))
  .handler(async ({ data, context }) => {
    const ctx = context as unknown as AuthedContext;
    await assertAdmin(ctx);
    if (data.userId === ctx.userId) {
      throw new Error("Nu îți poți modifica propriile drepturi.");
    }
    const admin = await adminClient();

    if (data.isAdmin) {
      const { error } = await admin
        .from("user_roles")
        .insert({ user_id: data.userId, role: "admin" });
      if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    } else {
      const { error } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", "admin");
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string }) => ({ userId: String(input.userId) }))
  .handler(async ({ data, context }) => {
    const ctx = context as unknown as AuthedContext;
    await assertAdmin(ctx);
    if (data.userId === ctx.userId) {
      throw new Error("Nu îți poți șterge propriul cont.");
    }
    const admin = await adminClient();
    const { error } = await admin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
