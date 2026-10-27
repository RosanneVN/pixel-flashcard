import { Dialog, DialogContent } from "@/components/ui/8bit/dialog";
import { Button } from "@/components/ui/8bit/button";

interface ModalCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTypeOwn: () => void;
  onImport?: () => void;
}

export default function ModalCard({
  open,
  onOpenChange,
  onTypeOwn,
  onImport,
}: ModalCardProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Create card options">
        <div className="flex flex-col gap-4">
          <Button type="button" onClick={onTypeOwn}>
            type your own cards
          </Button>
          <p className="text-center text-sm text-muted-foreground">or</p>
          <Button type="button" variant="secondary" onClick={() => onImport?.()}>
            import your cards
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
