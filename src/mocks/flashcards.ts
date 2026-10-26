import type { Flashcard } from "@/types/types";

export const mockFlashcards: Flashcard[] = [
  {
    id: "card-neko",
    type: "recognition",
    question: "猫",
    answer: "neko — cat",
    example: "猫が好きです (I like cats)",
    note: "Kun reading; contrast with 犬 (inu, dog)",
  },
  {
    id: "card-tsuache",
    type: "production",
    question: "How do you say “thank you” in Japanese (casual)?",
    answer: "ありがとう (arigatou)",
    example: "ありがとう、手伝ってくれて (Thanks for helping me)",
    note: null,
  },
  {
    id: "card-mizu",
    type: "recognition",
    question: "水",
    answer: "mizu — water",
    example: "水を飲みます (I drink water)",
    note: null,
  },
  {
    id: "card-library",
    type: "production",
    question: "How do you say “library” in Japanese?",
    answer: "図書館 (toshokan)",
    example: "図書館で勉強します (I study at the library)",
    note: "Kanji: 図 (map) + 書 (write) + 館 (hall)",
  },
];
