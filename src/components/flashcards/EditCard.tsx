import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Button } from "@/components/ui/8bit/button";
import type { Flashcard } from "@/types/types";

interface EditCardProps {
  card: Flashcard | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditCard({ card, open, onOpenChange }: EditCardProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Edit flashcard">
        <DialogHeader>
          <DialogTitle>edit flashcard</DialogTitle>
        </DialogHeader>
        <form
          key={card?.id ?? "empty"}
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="question"
              name="question"
              required
              defaultValue={card?.question ?? ""}
            />
            <Input
              placeholder="answer"
              name="answer"
              required
              defaultValue={card?.answer ?? ""}
            />
            <Input
              placeholder="example"
              name="example"
              defaultValue={card?.example ?? ""}
            />
            <Input
              placeholder="notes"
              name="notes"
              defaultValue={card?.note ?? ""}
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
