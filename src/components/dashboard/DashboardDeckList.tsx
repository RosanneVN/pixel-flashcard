import { useState } from "react";
import DeckCard from "@/components/decks/DeckCard";
import EditDeck from "@/components/decks/EditDeck";
import type { Deck } from "@/types/types";

interface DashboardDeckListProps {
  decks: Deck[];
}

export default function DashboardDeckList({ decks }: DashboardDeckListProps) {
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);

  const handleEdit = (id: string) => {
    const deck = decks.find((d) => d.id === id) ?? null;
    setEditingDeck(deck);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingDeck(null);
    }
  };

  return (
    <>
      <section aria-label="Deck list">
        {decks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No decks yet</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {decks.map((deck) => (
              <li key={deck.id}>
                <DeckCard deck={deck} href="/app/deck" onEdit={handleEdit} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <EditDeck
        key={editingDeck?.id ?? "none"}
        deck={editingDeck}
        open={editingDeck !== null}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
