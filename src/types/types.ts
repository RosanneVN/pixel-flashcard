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
