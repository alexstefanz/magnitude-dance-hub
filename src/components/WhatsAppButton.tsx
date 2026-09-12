import { Button, type ButtonProps } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";

type Props = {
  message?: string;
  label?: string;
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

export function WhatsAppButton({
  message,
  label = "Contactează-ne pe WhatsApp",
  className,
  size = "lg",
  variant = "whatsapp",
}: Props) {
  const { wa } = useSettings();
  return (
    <Button asChild size={size} variant={variant} className={cn("gap-2", className)}>
      <a href={wa(message)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="size-5" />
        {label}
      </a>
    </Button>
  );
}

export function WhatsAppFloating() {
  const { wa } = useSettings();
  return (
    <a
      href={wa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrie-ne pe WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.8L2 22l5.34-1.4A9.96 9.96 0 1 0 12.04 2Zm0 17.92a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.17.83.85-3.09-.2-.32A8.04 8.04 0 1 1 12.04 19.92Zm4.42-6.04c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.25-.62.8-.76.96-.14.17-.28.19-.52.07-.24-.12-1.02-.38-1.94-1.2a7.2 7.2 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.5.11-.1.25-.28.37-.42.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.02s.86 2.34.98 2.5c.12.17 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
