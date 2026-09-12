import { MessageCircle } from "lucide-react";
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
        <MessageCircle className="size-5" aria-hidden="true" />
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
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
