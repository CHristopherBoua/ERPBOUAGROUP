import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/cn";

type FilialeRow = {
  name: string;
  ca: string;
  caNum: number;
  trend: number;
  employes: number;
  taux: number;
  color: string;
};

const filiales: FilialeRow[] = [
  {
    name: "Stratégie & Influence",
    ca: "720M",
    caNum: 720,
    trend: 12.4,
    employes: 124,
    taux: 94,
    color: "#DC5E13",
  },
  {
    name: "Technologies & Digital",
    ca: "540M",
    caNum: 540,
    trend: 8.1,
    employes: 211,
    taux: 91,
    color: "#1565C0",
  },
  {
    name: "Fintech",
    ca: "490M",
    caNum: 490,
    trend: -3.2,
    employes: 87,
    taux: 89,
    color: "#D4A017",
  },
  {
    name: "Industrie",
    ca: "325M",
    caNum: 325,
    trend: 5.7,
    employes: 342,
    taux: 96,
    color: "#6A1B9A",
  },
  {
    name: "Distribution",
    ca: "400M",
    caNum: 400,
    trend: 9.3,
    employes: 206,
    taux: 93,
    color: "#00695C",
  },
];

const maxCa = Math.max(...filiales.map((f) => f.caNum));

export function FilialeSummary() {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[color:var(--color-foreground)]">Performance par filiale</h3>
        <span className="text-xs text-[color:var(--color-muted)]">Sept 2026</span>
      </div>
      <div className="space-y-3">
        {filiales.map((f) => (
          <div key={f.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: f.color }}
                />
                <span className="text-xs font-medium text-[color:var(--color-foreground)] truncate">
                  {f.name}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <span className="text-xs font-bold text-[color:var(--color-foreground)]">
                  {f.ca} FCFA
                </span>
                <div
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    f.trend >= 0 ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"
                  )}
                >
                  {f.trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {Math.abs(f.trend)}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(f.caNum / maxCa) * 100}%`,
                    background: f.color,
                  }}
                />
              </div>
              <span className="text-xs text-[color:var(--color-muted)] shrink-0">
                {f.employes} emp.
              </span>
              <span className="text-xs text-[color:var(--color-muted)] shrink-0">
                {f.taux}% présence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
