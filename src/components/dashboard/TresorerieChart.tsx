"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  { semaine: "S-8", entrees: 850, sorties: -620 },
  { semaine: "S-7", entrees: 720, sorties: -780 },
  { semaine: "S-6", entrees: 940, sorties: -590 },
  { semaine: "S-5", entrees: 680, sorties: -710 },
  { semaine: "S-4", entrees: 1020, sorties: -640 },
  { semaine: "S-3", entrees: 890, sorties: -820 },
  { semaine: "S-2", entrees: 750, sorties: -680 },
  { semaine: "S-1", entrees: 1150, sorties: -740 },
];

export function TresorerieChart() {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[color:var(--color-foreground)]">
            Flux de trésorerie
          </h3>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
            8 dernières semaines — en millions FCFA
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[color:var(--color-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-2 rounded-sm bg-[color:var(--color-primary)]" />
            Entrées
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-2 rounded-sm bg-[color:var(--color-danger)]" />
            Sorties
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
          <XAxis
            dataKey="semaine"
            tick={{ fontSize: 11, fill: "#6B7B6B" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6B7B6B" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
          />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid #E2E8E2",
              borderRadius: "8px",
              fontSize: 12,
            }}
            formatter={(value, name) => [
              `${Math.abs(Number(value ?? 0))}M FCFA`,
              String(name ?? "") === "entrees" ? "Entrées" : "Sorties",
            ]}
          />
          <ReferenceLine y={0} stroke="#E2E8E2" />
          <Bar dataKey="entrees" fill="#1B5E20" radius={[3, 3, 0, 0]} maxBarSize={20} />
          <Bar dataKey="sorties" fill="#EF5350" radius={[0, 0, 3, 3]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
