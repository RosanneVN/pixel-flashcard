import { useState } from "react";
import { Button } from "@/components/ui/8bit/button";
import ModalCard from "@/components/flashcards/ModalCard";
import CreateNewCard from "@/components/flashcards/CreateNewCard";

export default function BoxesActions() {
  const [chooserOpen, setChooserOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section className="flex justify-between gap-4" aria-label="Boxes actions">
        <Button
          type="button"
          onClick={() => window.location.assign("/app/review")}
        >
          review today cards
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setChooserOpen(true)}
        >
          Create new card
        </Button>
      </section>

      <ModalCard
        open={chooserOpen}
        onOpenChange={setChooserOpen}
        onTypeOwn={() => setFormOpen(true)}
      />

      <CreateNewCard open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
}
