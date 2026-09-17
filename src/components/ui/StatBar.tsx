import { cn } from "@/lib/cn";

type StatBarProps = {
  value: number;
  max: number;
  color?: string;
  className?: string;
};

export function StatBar({ value, max, color = "var(--color-primary)", className }: StatBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn("h-1.5 w-full bg-gray-100 rounded-full overflow-hidden", className)}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}
