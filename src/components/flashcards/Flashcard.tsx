import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import type { Flashcard as FlashcardData } from "@/types/types";

const grades = [
  { level: 1, color: "bg-purple-500", caption: "not at all" },
  { level: 2, color: "bg-red-500", caption: null },
  { level: 3, color: "bg-yellow-500", caption: null },
  { level: 4, color: "bg-green-500", caption: null },
  { level: 5, color: "bg-blue-500", caption: "easy" },
] as const;

interface FlashcardProps {
  card: FlashcardData;
  onGrade?: (level: number) => void;
}

export default function Flashcard({ card, onGrade }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  if (!flipped) {
    return (
      <Card className="w-full">
        <CardHeader className="flex justify-start">
          <Badge>{card.type}</Badge>
        </CardHeader>
        <CardContent>
          <div className="border-2 p-4">
            <p className="text-xs uppercase text-muted-foreground">question</p>
            <p className="mt-1">{card.question}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="button" onClick={() => setFlipped(true)}>
            reverse
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-start">
        <Badge>{card.type}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 border-2 p-4">
          <div>
            <p className="text-xs uppercase text-muted-foreground">answer</p>
            <p className="mt-1">{card.answer}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">example</p>
            <p className="mt-1">{card.example}</p>
          </div>
          {card.note !== null ? (
            <div>
              <p className="text-xs uppercase text-muted-foreground">note</p>
              <p className="mt-1">{card.note}</p>
            </div>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start justify-between gap-2">
          {grades.map((grade) => (
            <div key={grade.level} className="flex flex-1 flex-col items-center gap-1">
              <Button
                type="button"
                aria-label={`Grade ${grade.level}`}
                className={grade.color}
                onClick={() => onGrade?.(grade.level)}
              >
                {grade.level}
              </Button>
              <span className="min-h-4 text-[8px] py-1 text-muted-foreground">
                {grade.caption ?? ""}
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
