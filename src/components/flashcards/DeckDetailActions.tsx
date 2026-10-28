import { Button } from "@/components/ui/8bit/button";

export default function DeckDetailActions() {
  return (
    <section className="flex justify-end gap-4" aria-label="Deck actions">
      <Button
        type="button"
        onClick={() => window.location.assign("/app/review")}
      >
        study all
      </Button>
    </section>
  );
}
