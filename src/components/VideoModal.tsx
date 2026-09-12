import { useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function toEmbedUrl(url: string) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  if (url.includes("instagram.com")) return url.replace(/\/?$/, "/embed");
  if (url.includes("facebook.com")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
  }
  return url;
}

export function VideoModal({
  url,
  title,
  trigger,
}: {
  url?: string | null;
  title: string;
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
        [Reel – va fi adăugat ulterior]
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="group flex aspect-video w-full items-center justify-center rounded-2xl bg-[image:var(--gradient-ink)] text-ink-foreground transition-transform hover:scale-[1.01]"
            aria-label={`Redă videoclipul: ${title}`}
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/90 transition-transform group-hover:scale-110">
              <Play className="size-6" aria-hidden="true" />
            </span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-ink">
          {open && (
            <iframe
              src={toEmbedUrl(url)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="size-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
