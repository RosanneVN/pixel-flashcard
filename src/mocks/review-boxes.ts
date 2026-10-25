export type ReviewBoxIcon =
  | "clock"
  | "calendar-days"
  | "calendar-range"
  | "calendar-clock"
  | "hourglass";

export interface ReviewBox {
  id: string;
  intervalLabel: string;
  icon: ReviewBoxIcon;
  color: string;
  totalCards: number;
}

export const mockReviewBoxes: ReviewBox[] = [
  {
    id: "box-1-day",
    intervalLabel: "1 day",
    icon: "clock",
    color: "bg-purple-500",
    totalCards: 12,
  },
  {
    id: "box-3-days",
    intervalLabel: "3 days",
    icon: "calendar-days",
    color: "bg-red-500",
    totalCards: 18,
  },
  {
    id: "box-1-week",
    intervalLabel: "1 week",
    icon: "calendar-range",
    color: "bg-yellow-500",
    totalCards: 25,
  },
  {
    id: "box-2-weeks",
    intervalLabel: "2 weeks",
    icon: "calendar-clock",
    color: "bg-green-500",
    totalCards: 30,
  },
  {
    id: "box-4-weeks",
    intervalLabel: "4 weeks",
    icon: "hourglass",
    color: "bg-blue-500",
    totalCards: 8,
  },
];
