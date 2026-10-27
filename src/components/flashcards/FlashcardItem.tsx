import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Flashcard } from "@/types/types";

interface FlashcardItemProps {
  card: Flashcard;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function FlashcardItem({
  card,
  onEdit,
  onDelete,
}: FlashcardItemProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-4">
        <p className="min-w-0 flex-1 font-medium">{card.question}</p>

        <Popover>
          <PopoverTrigger
            aria-label={`Card options for ${card.id}`}
            render={
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Card options for ${card.id}`}
              >
                <MoreVertical className="size-4" />
              </Button>
            }
          />
          <PopoverContent align="end" className="w-40 gap-1 p-1.5">
            <button
              type="button"
              onClick={() => onEdit?.(card.id)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
            >
              <Pencil className="size-4" aria-hidden="true" />
              edit
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(card.id)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              delete
            </button>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
