import { useState } from "react";
import Flashcard from "@/components/flashcards/Flashcard";
import { Progress } from "@/components/ui/8bit/progress";
import type { Flashcard as FlashcardData } from "@/types/types";

interface ReviewSessionProps {
  cards: FlashcardData[];
}

export default function ReviewSession({ cards }: ReviewSessionProps) {
  const [gradedIds, setGradedIds] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = cards.length;
  const reviewedCount = gradedIds.length;
  const percent = total > 0 ? Math.round((reviewedCount / total) * 100) : 0;

  function handleGrade(cardId: string) {
    setGradedIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));
    const idx = cards.findIndex((c) => c.id === cardId);
    if (idx !== -1) {
      setActiveIndex(idx + 1);
    }
  }

  const activeCard = activeIndex < total ? cards[activeIndex] : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground">
          {reviewedCount} of {total} reviewed
        </p>
        <Progress
          variant="retro"
          value={percent}
          aria-label="Review progress"
          aria-valuenow={reviewedCount}
          aria-valuemin={0}
          aria-valuemax={total}
          className="mt-2"
        />
      </div>

      {total === 0 ? (
        <p className="text-sm text-muted-foreground">No cards to review yet</p>
      ) : activeCard ? (
        <Flashcard
          key={activeCard.id}
          card={activeCard}
          onGrade={() => handleGrade(activeCard.id)}
        />
      ) : (
        <p className="text-sm text-muted-foreground">All caught up!</p>
      )}
    </div>
  );
}
