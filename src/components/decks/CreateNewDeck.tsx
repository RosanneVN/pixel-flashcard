import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Button } from "@/components/ui/8bit/button";

interface CreateNewDeckProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateNewDeck({
  open,
  onOpenChange,
}: CreateNewDeckProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Create a new deck">
        <DialogHeader>
          <DialogTitle>Create a new deck</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
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
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
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
