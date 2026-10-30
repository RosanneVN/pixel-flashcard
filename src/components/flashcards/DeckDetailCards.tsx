import { useState } from "react";
import FlashcardItem from "./FlashcardItem";
import EditCard from "./EditCard";
import { mockFlashcards } from "@/mocks/flashcards";

export default function DeckDetailCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    mockFlashcards.find((card) => card.id === selectedId) ?? null;

  return (
    <>
      {mockFlashcards.length === 0 ? (
        <p className="text-sm text-muted-foreground">No cards yet</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {mockFlashcards.map((card) => (
            <li key={card.id}>
              <FlashcardItem card={card} onEdit={setSelectedId} />
            </li>
          ))}
        </ul>
      )}
      <EditCard
        card={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null);
          }
        }}
      />
    </>
  );
}
