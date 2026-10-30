import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Button } from "@/components/ui/8bit/button";
import type { Deck, DeckIcon } from "@/types/types";
import DeckIconSelector from "./DeckIconSelector";
import { DEFAULT_DECK_ICON } from "./deck-icons";

interface EditDeckProps {
  deck: Deck | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditDeck({ deck, open, onOpenChange }: EditDeckProps) {
  const [name, setName] = useState(deck?.name ?? "");
  const [icon, setIcon] = useState<DeckIcon>(deck?.icon ?? DEFAULT_DECK_ICON);

  useEffect(() => {
    setName(deck?.name ?? "");
    setIcon(deck?.icon ?? DEFAULT_DECK_ICON);
  }, [deck?.id, deck?.name, deck?.icon]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && deck) {
      setName(deck.name);
      setIcon(deck.icon);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-label="Edit deck">
        <DialogHeader>
          <DialogTitle>Edit deck</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="edit-deck-name" className="text-sm text-foreground">
              name
            </label>
            <Input
              id="edit-deck-name"
              placeholder="type your deck name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DeckIconSelector value={icon} onChange={setIcon} />
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOpenChange(false)}
            >
              cancel
            </Button>
            <Button type="submit">save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
