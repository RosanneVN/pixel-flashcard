import { Card, CardContent } from "@/components/ui/8bit/card";
import { ScrollArea } from "@/components/ui/8bit/scroll-area";
import { cn } from "@/lib/utils";
import type { DeckIcon } from "@/types/types";
import { DECK_ICON_OPTIONS, DEFAULT_DECK_ICON } from "./deck-icons";

interface DeckIconSelectorProps {
  value?: DeckIcon;
  defaultValue?: DeckIcon;
  onChange?: (icon: DeckIcon) => void;
  label?: string;
}

export default function DeckIconSelector({
  value,
  defaultValue = DEFAULT_DECK_ICON,
  onChange,
  label = "icon",
}: DeckIconSelectorProps) {
  const selected = value ?? defaultValue;

  return (
    <div className="flex flex-col gap-2">
      <span id="deck-icon-label" className="text-sm text-foreground">
        {label}
      </span>
      <Card className="h-28 w-full">
        <CardContent className="h-full p-3 pr-5">
          <ScrollArea
            className="h-full w-full"
            aria-label="Deck icon options"
          >
            <div
              role="radiogroup"
              aria-labelledby="deck-icon-label"
              className="grid grid-cols-6 gap-2"
            >
              {DECK_ICON_OPTIONS.map(({ value: optionValue, label, Icon }) => {
                const isSelected = optionValue === selected;
                return (
                  <button
                    key={optionValue}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={label}
                    title={label}
                    onClick={() => onChange?.(optionValue)}
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center transition-colors focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1 focus-visible:outline-none",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
