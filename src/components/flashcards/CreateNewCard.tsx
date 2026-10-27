import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/8bit/dialog";
import { Input } from "@/components/ui/8bit/input";
import { Button } from "@/components/ui/8bit/button";

interface CreateNewCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateNewCard({
  open,
  onOpenChange,
}: CreateNewCardProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Create a new flashcard">
        <DialogHeader>
          <DialogTitle>create a new flashcard</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-4">
            <Input placeholder="question" name="question" required />
            <Input placeholder="answer" name="answer" required />
            <Input placeholder="example" name="example" />
            <Input placeholder="notes" name="notes" />
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
