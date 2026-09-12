import { cn } from "@/lib/utils";

/**
 * Renders an image when available, otherwise a branded placeholder box.
 * Keeps layout stable (no CLS) while real photos are still missing.
 */
export function ImageOrPlaceholder({
  src,
  alt,
  label = "[Fotografie – de înlocuit]",
  className,
  imageClassName,
}: {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("size-full object-cover", imageClassName, className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-[image:var(--gradient-ink)] p-4 text-center text-xs font-medium text-ink-foreground/70",
        className,
      )}
      aria-hidden="true"
    >
      {label}
    </div>
  );
}
