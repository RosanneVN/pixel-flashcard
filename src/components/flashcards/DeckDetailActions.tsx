import { useState } from "react";
import { Button } from "@/components/ui/8bit/button";
import ModalCard from "@/components/flashcards/ModalCard";
import CreateNewCard from "@/components/flashcards/CreateNewCard";

export default function DeckDetailActions() {
  const [chooserOpen, setChooserOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section className="flex gap-4" aria-label="Deck actions">
        <Button type="button" onClick={() => window.location.assign("/app/review")}>study all</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setChooserOpen(true)}
        >
          create new card
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
