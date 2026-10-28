import { useState } from "react";
import { Button } from "@/components/ui/8bit/button";
import CreateNewDeck from "@/components/decks/CreateNewDeck";

export default function DashboardActions() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section className="flex justify-end gap-4" aria-label="Dashboard actions">
        <Button type="button" onClick={() => setFormOpen(true)}>
          create new deck
        </Button>
      </section>

      <CreateNewDeck open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
}
