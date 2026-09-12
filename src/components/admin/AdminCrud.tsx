import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export type AdminField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select" | "date" | "time" | "list";
  options?: { value: string; label: string }[];
  required?: boolean;
  helper?: string;
};

type Row = Record<string, unknown>;

export function AdminCrud({
  table,
  title,
  fields,
  orderBy = "display_order",
  summary,
}: {
  table: string;
  title: string;
  fields: AdminField[];
  orderBy?: string;
  summary: (row: Row) => string;
}) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const listQuery = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order(orderBy);
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });

  const save = useMutation({
    mutationFn: async (values: Row) => {
      const id = values["id"] as string | undefined;
      const payload = { ...values };
      delete payload["id"];
      const result = id
        ? await supabase.from(table).update(payload).eq("id", id)
        : await supabase.from(table).insert(payload);
      if (result.error) throw new Error(result.error.message);
    },
    onSuccess: async () => {
      toast.success("Salvat cu succes.");
      setOpen(false);
      setEditing(null);
      await queryClient.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Șters.");
      await queryClient.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values: Row = {};
    if (editing?.["id"]) values["id"] = editing["id"];
    for (const field of fields) {
      const raw = form.get(field.key);
      if (field.type === "checkbox") values[field.key] = raw === "on";
      else if (field.type === "number")
        values[field.key] = raw === "" || raw === null ? null : Number(raw);
      else if (field.type === "list")
        values[field.key] = String(raw ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
      else values[field.key] = raw === "" ? null : String(raw);
    }
    save.mutate(values);
  }

  const rows = listQuery.data ?? [];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus aria-hidden="true" />
          Adaugă
        </Button>
      </div>

      {listQuery.isLoading && <Skeleton className="h-40 w-full rounded-xl" />}

      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {rows.map((row) => (
          <li
            key={String(row["id"])}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <span className="min-w-0 flex-1 text-sm">{summary(row)}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditing(row);
                  setOpen(true);
                }}
              >
                <Pencil aria-hidden="true" />
                Editează
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (window.confirm("Sigur vrei să ștergi această înregistrare?")) {
                    remove.mutate(String(row["id"]));
                  }
                }}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          </li>
        ))}
        {!listQuery.isLoading && rows.length === 0 && (
          <li className="p-6 text-center text-sm text-muted-foreground">Nicio înregistrare încă.</li>
        )}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? `Editează – ${title}` : `Adaugă – ${title}`}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <AdminInput field={field} value={editing?.[field.key]} />
                {field.helper && <p className="text-xs text-muted-foreground">{field.helper}</p>}
              </div>
            ))}
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending && <Loader2 className="animate-spin" aria-hidden="true" />}
                Salvează
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function AdminInput({ field, value }: { field: AdminField; value: unknown }) {
  const stringValue =
    field.type === "list"
      ? Array.isArray(value)
        ? (value as string[]).join("\n")
        : ""
      : value === null || value === undefined
        ? ""
        : String(value);

  if (field.type === "textarea" || field.type === "list") {
    return (
      <Textarea id={field.key} name={field.key} rows={4} defaultValue={stringValue} key={stringValue} />
    );
  }
  if (field.type === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <Checkbox id={field.key} name={field.key} defaultChecked={value === true} key={String(value)} />
        <span className="text-sm text-muted-foreground">Activ</span>
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <select
        id={field.key}
        name={field.key}
        defaultValue={stringValue}
        key={stringValue}
        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
      >
        <option value="">—</option>
        {(field.options ?? []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <Input
      id={field.key}
      name={field.key}
      type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
      step={field.type === "number" ? "any" : undefined}
      defaultValue={stringValue}
      key={stringValue}
      required={field.required}
    />
  );
}
