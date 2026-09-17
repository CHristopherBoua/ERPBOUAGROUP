"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const presenceData = [
  { name: "Présents", value: 843, color: "#1B5E20" },
  { name: "Absents", value: 67, color: "#EF5350" },
  { name: "Congés", value: 42, color: "#D4A017" },
  { name: "Formation", value: 18, color: "#1565C0" },
];

const total = presenceData.reduce((s, d) => s + d.value, 0);

export function RHStats() {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-[color:var(--color-foreground)]">Présences RH</h3>
        <p className="text-xs text-[color:var(--color-muted)] mt-0.5">Aujourd&apos;hui — {total} effectifs</p>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={100} height={100}>
          <PieChart>
            <Pie
              data={presenceData}
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={46}
              paddingAngle={2}
              dataKey="value"
            >
              {presenceData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #E2E8E2",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {presenceData.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: d.color }}
                />
                <span className="text-[color:var(--color-muted)] text-xs">{d.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-[color:var(--color-foreground)] text-xs">
                  {d.value}
                </span>
                <span className="text-[color:var(--color-muted)] text-xs ml-1">
                  ({Math.round((d.value / total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
