export type DeckIcon =
  | "languages"
  | "calculator"
  | "flask"
  | "globe"
  | "code";

export interface Deck {
  id: string;
  name: string;
  icon: DeckIcon;
  totalCards: number;
  studiedCards: number;
}

export type DeckPopoverAction = "edit" | "delete";

export type FlashcardType = "production" | "recognition";

export interface Flashcard {
  id: string;
  type: FlashcardType;
  question: string;
  answer: string;
  example: string;
  note: string | null;
}

export const mockDecks: Deck[] = [
  {
    id: "deck-japanese-basics",
    name: "Japanese Basics",
    icon: "languages",
    totalCards: 40,
    studiedCards: 0,
  },
  {
    id: "deck-mental-math",
    name: "Mental Math",
    icon: "calculator",
    totalCards: 50,
    studiedCards: 22,
  },
  {
    id: "deck-web-dev",
    name: "Web Dev",
    icon: "code",
    totalCards: 30,
    studiedCards: 30,
  },
  {
    id: "deck-world-capitals",
    name: "World Capitals",
    icon: "globe",
    totalCards: 25,
    studiedCards: 10,
  },
];
