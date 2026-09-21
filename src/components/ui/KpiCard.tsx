import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type KpiCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  color?: "green" | "gold" | "blue" | "red" | "orange";
  highlight?: boolean;
};

const colorMap = {
  green: {
    bg: "bg-[#FFF0E8]",
    icon: "bg-[color:var(--color-primary)] text-white",
    border: "border-[#FFD0B0]",
  },
  gold: {
    bg: "bg-[#FFF8E1]",
    icon: "bg-[color:var(--color-accent)] text-white",
    border: "border-[#FFE082]",
  },
  blue: {
    bg: "bg-[#E3F2FD]",
    icon: "bg-[#1565C0] text-white",
    border: "border-[#BBDEFB]",
  },
  red: {
    bg: "bg-[#FFEBEE]",
    icon: "bg-[#C62828] text-white",
    border: "border-[#FFCDD2]",
  },
  orange: {
    bg: "bg-[#FFF3E0]",
    icon: "bg-[#E65100] text-white",
    border: "border-[#FFE0B2]",
  },
};

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon: Icon,
  color = "green",
  highlight = false,
}: KpiCardProps) {
  const colors = colorMap[color];

  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
      ? TrendingUp
      : TrendingDown;

  const trendColor =
    trend === undefined || trend === 0
      ? "text-[color:var(--color-muted)]"
      : trend > 0
      ? "text-[color:var(--color-success)]"
      : "text-[color:var(--color-danger)]";

  return (
    <div
      className={cn(
        "bg-white rounded-xl border p-4 flex flex-col gap-3 transition-shadow hover:shadow-md",
        highlight && "ring-2 ring-[color:var(--color-accent)]",
        colors.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", colors.icon)}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", trendColor)}>
            <TrendIcon size={13} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-[color:var(--color-foreground)] leading-tight">
          {value}
        </p>
        <p className="text-sm text-[color:var(--color-muted)] mt-0.5">{title}</p>
        {(subtitle || trendLabel) && (
          <p className="text-xs text-[color:var(--color-muted)] mt-1 opacity-70">
            {trendLabel ?? subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
