import type { Genre } from "@/lib/types";
import { GENRE_LABELS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const GENRE_COLORS: Record<Genre, string> = {
  shooter_pc: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  console_shooter: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  mobile_shooter: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

export function GenreBadge({ genre }: { genre: Genre }) {
  return (
    <Badge variant="outline" className={`label-upper-sm ${GENRE_COLORS[genre]}`}>
      {GENRE_LABELS[genre]}
    </Badge>
  );
}
