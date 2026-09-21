"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { mois: "Jan", strategie: 420, fintech: 310, industrie: 180, distribution: 250 },
  { mois: "Fév", strategie: 390, fintech: 345, industrie: 210, distribution: 270 },
  { mois: "Mar", strategie: 520, fintech: 380, industrie: 195, distribution: 290 },
  { mois: "Avr", strategie: 470, fintech: 420, industrie: 230, distribution: 310 },
  { mois: "Mai", strategie: 580, fintech: 460, industrie: 265, distribution: 340 },
  { mois: "Jun", strategie: 610, fintech: 490, industrie: 280, distribution: 355 },
  { mois: "Jul", strategie: 570, fintech: 510, industrie: 295, distribution: 370 },
  { mois: "Aoû", strategie: 640, fintech: 480, industrie: 310, distribution: 385 },
  { mois: "Sep", strategie: 720, fintech: 540, industrie: 325, distribution: 400 },
];

const filiales = [
  { key: "strategie", label: "Stratégie & Influence", color: "#DC5E13" },
  { key: "fintech", label: "Fintech", color: "#D4A017" },
  { key: "industrie", label: "Industrie", color: "#1565C0" },
  { key: "distribution", label: "Distribution", color: "#6A1B9A" },
];

function formatMillions(v: number) {
  return `${v}M FCFA`;
}

export function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[color:var(--color-foreground)]">
            Chiffre d&apos;affaires par filiale
          </h3>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
            9 derniers mois — en millions FCFA
          </p>
        </div>
        <select className="text-xs border border-[color:var(--color-border)] rounded-lg px-2 py-1.5 text-[color:var(--color-muted)] bg-white outline-none">
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            {filiales.map((f) => (
              <linearGradient key={f.key} id={`grad-${f.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={f.color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={f.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
          <XAxis
            dataKey="mois"
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
            formatter={(value, name) => {
              const key = String(name ?? "");
              const f = filiales.find((f) => f.key === key);
              return [formatMillions(Number(value ?? 0)), f?.label ?? key];
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={(value) => {
              const f = filiales.find((f) => f.key === value);
              return f?.label ?? value;
            }}
          />
          {filiales.map((f) => (
            <Area
              key={f.key}
              type="monotone"
              dataKey={f.key}
              stroke={f.color}
              strokeWidth={2}
              fill={`url(#grad-${f.key})`}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
