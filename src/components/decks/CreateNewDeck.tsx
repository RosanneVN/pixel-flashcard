import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Button } from "@/components/ui/8bit/button";
import type { DeckIcon } from "@/types/types";
import DeckIconSelector from "./DeckIconSelector";
import { DEFAULT_DECK_ICON } from "./deck-icons";

interface CreateNewDeckProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateNewDeck({
  open,
  onOpenChange,
}: CreateNewDeckProps) {
  const [icon, setIcon] = useState<DeckIcon>(DEFAULT_DECK_ICON);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIcon(DEFAULT_DECK_ICON);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-label="Create a new deck">
        <DialogHeader>
          <DialogTitle>Create a new deck</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIcon(DEFAULT_DECK_ICON);
            onOpenChange(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="deck-name" className="text-sm text-foreground">
              name
            </label>
            <Input
              id="deck-name"
              placeholder="type your deck name"
              name="name"
              required
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
