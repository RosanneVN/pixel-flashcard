import {
  Calculator,
  Code,
  FlaskConical,
  Globe,
  Languages,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Deck, DeckIcon } from "@/types/types";

const deckIconMap = {
  languages: Languages,
  calculator: Calculator,
  flask: FlaskConical,
  globe: Globe,
  code: Code,
} as const;

function getDeckIcon(icon: DeckIcon) {
  return deckIconMap[icon] ?? Languages;
}

interface DeckCardProps {
  deck: Deck;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function DeckCard({
  deck,
  onEdit,
  onDelete,
}: DeckCardProps) {
  const Icon = getDeckIcon(deck.icon);
  const total = deck.totalCards;
  const studied = Math.min(deck.studiedCards, total);
  const progress = total > 0 ? studied / total : 0;
  const percent = Math.round(progress * 100);

  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center bg-muted text-foreground"
        >
          <Icon className="size-5" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-medium">{deck.name}</p>
              <p className="text-sm text-muted-foreground">
                {total} {total === 1 ? "card" : "cards"}
              </p>
            </div>

            <Popover>
              <PopoverTrigger
                aria-label={`Deck options for ${deck.name}`}
                render={
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Deck options for ${deck.name}`}
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                }
              />
              <PopoverContent align="end" className="w-40 gap-1 p-1.5">
                <button
                  type="button"
                  onClick={() => onEdit?.(deck.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                >
                  <Pencil className="size-4" aria-hidden="true" />
                  edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(deck.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  delete
                </button>
              </PopoverContent>
            </Popover>
          </div>

          <div
            role="progressbar"
            aria-label={`Progress for ${deck.name}`}
            aria-valuenow={studied}
            aria-valuemin={0}
            aria-valuemax={total}
            className="h-2 w-full bg-muted"
          >
            <div
              className={cn("h-full bg-primary")}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {studied} of {total} studied ({percent}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
