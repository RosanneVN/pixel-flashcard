import {
  Atom,
  BookOpen,
  Calculator,
  ChefHat,
  Code,
  Cpu,
  Dna,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  Music,
  Palette,
  PenTool,
  Plane,
  Stethoscope,
  TestTube2,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { DeckIcon } from "@/types/types";

export interface DeckIconOption {
  value: DeckIcon;
  label: string;
  Icon: LucideIcon;
}

export const DEFAULT_DECK_ICON: DeckIcon = "languages";

export const DECK_ICON_OPTIONS: DeckIconOption[] = [
  { value: "languages", label: "Languages", Icon: Languages },
  { value: "calculator", label: "Mathematics", Icon: Calculator },
  { value: "flask", label: "Science", Icon: FlaskConical },
  { value: "globe", label: "Geography", Icon: Globe },
  { value: "code", label: "Programming", Icon: Code },
  { value: "history", label: "History", Icon: Landmark },
  { value: "art", label: "Art", Icon: Palette },
  { value: "music", label: "Music", Icon: Music },
  { value: "biology", label: "Biology", Icon: Dna },
  { value: "physics", label: "Physics", Icon: Atom },
  { value: "literature", label: "Literature", Icon: BookOpen },
  { value: "sports", label: "Sports", Icon: Trophy },
  { value: "tech", label: "Technology", Icon: Cpu },
  { value: "design", label: "Design", Icon: PenTool },
  { value: "medicine", label: "Medicine", Icon: Stethoscope },
  { value: "food", label: "Cooking", Icon: ChefHat },
  { value: "travel", label: "Travel", Icon: Plane },
  { value: "chemistry", label: "Chemistry", Icon: TestTube2 },
];

export const DECK_ICON_MAP: Record<DeckIcon, LucideIcon> = Object.fromEntries(
  DECK_ICON_OPTIONS.map((option) => [option.value, option.Icon]),
) as Record<DeckIcon, LucideIcon>;
