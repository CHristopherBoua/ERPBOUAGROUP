"use client";

import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, AlertTriangle, BarChart3, RefreshCw } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";

const fluxMensuels = [
  { mois: "Avr", entrees: 2100, sorties: 1750, solde: 350 },
  { mois: "Mai", entrees: 2400, sorties: 1900, solde: 500 },
  { mois: "Jun", entrees: 2250, sorties: 2050, solde: 200 },
  { mois: "Jul", entrees: 2700, sorties: 1980, solde: 720 },
  { mois: "Aoû", entrees: 2500, sorties: 2200, solde: 300 },
  { mois: "Sep", entrees: 2900, sorties: 2100, solde: 800 },
];

const previsions = [
  { semaine: "S1 Oct", prevu: 680, confirme: 520, risque: 160 },
  { semaine: "S2 Oct", prevu: 740, confirme: 480, risque: 260 },
  { semaine: "S3 Oct", prevu: 590, confirme: 590, risque: 0 },
  { semaine: "S4 Oct", prevu: 820, confirme: 310, risque: 510 },
  { semaine: "S1 Nov", prevu: 650, confirme: 200, risque: 450 },
  { semaine: "S2 Nov", prevu: 770, confirme: 100, risque: 670 },
];

const banques = [
  { nom: "SGBCI — Compte principal", numero: "****4521", solde: 1842000000, variation: 2.4, devise: "FCFA" },
  { nom: "BICICI — Opérations", numero: "****8834", solde: 950000000, variation: -1.1, devise: "FCFA" },
  { nom: "Ecobank — Filiales", numero: "****2290", solde: 687000000, variation: 4.8, devise: "FCFA" },
  { nom: "Société Générale — Fintech", numero: "****6617", solde: 363000000, variation: 1.2, devise: "FCFA" },
];

function fmt(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} Mrd`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)} M`;
  return `${n.toLocaleString("fr-FR")}`;
}

export default function TresoreriePage() {
  const totalSolde = banques.reduce((s, b) => s + b.solde, 0);

  return (
    <ERPLayout title="Finance — Tableau de trésorerie">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Tableau de trésorerie"
          subtitle="Soldes bancaires, flux et prévisions consolidés"
          icon={Wallet}
          actions={
            <button className="p-2 rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
              <RefreshCw size={15} />
            </button>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Trésorerie nette" value={`${fmt(totalSolde)} FCFA`} icon={Wallet} color="green" trend={2.1} highlight />
          <KpiCard title="Entrées (Sept)" value="2 900 M FCFA" icon={ArrowUpRight} color="green" trend={16} />
          <KpiCard title="Sorties (Sept)" value="2 100 M FCFA" icon={ArrowDownLeft} color="red" trend={-5} />
          <KpiCard title="Solde net Sept" value="800 M FCFA" subtitle="Flux mensuel" icon={TrendingUp} color="blue" trend={166} />
        </div>

        {/* Comptes bancaires */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-[color:var(--color-foreground)] mb-3">Comptes bancaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {banques.map((b) => (
              <div key={b.nom} className="rounded-xl border border-[color:var(--color-border)] p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs font-semibold text-[color:var(--color-foreground)]">{b.nom}</p>
                    <p className="text-xs text-[color:var(--color-muted)] font-mono mt-0.5">{b.numero}</p>
                  </div>
                  <span className={`text-xs font-medium ${b.variation >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {b.variation >= 0 ? "+" : ""}{b.variation}%
                  </span>
                </div>
                <p className="text-lg font-bold text-[color:var(--color-foreground)]">{fmt(b.solde)}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{b.devise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Flux mensuel */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <h3 className="font-semibold text-[color:var(--color-foreground)] mb-1">Flux mensuels</h3>
            <p className="text-xs text-[color:var(--color-muted)] mb-4">6 derniers mois — Millions FCFA</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={fluxMensuels} barGap={2} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #E2E8E2", borderRadius: "8px", fontSize: 12 }}
                  formatter={(v, n) => [`${Number(v)}M FCFA`, n === "entrees" ? "Entrées" : n === "sorties" ? "Sorties" : "Solde net"]}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                  formatter={(v) => v === "entrees" ? "Entrées" : v === "sorties" ? "Sorties" : "Solde net"} />
                <Bar dataKey="entrees" fill="#DC5E13" radius={[3, 3, 0, 0]} maxBarSize={22} />
                <Bar dataKey="sorties" fill="#EF5350" radius={[3, 3, 0, 0]} maxBarSize={22} />
                <Bar dataKey="solde" fill="#D4A017" radius={[3, 3, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Prévisions 6 semaines */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[color:var(--color-foreground)]">Prévisions de trésorerie</h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">6 semaines</span>
            </div>
            <p className="text-xs text-[color:var(--color-muted)] mb-4">Entrées prévues — Millions FCFA</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={previsions} barGap={1} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="semaine" tick={{ fontSize: 10, fill: "#6B7B6B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #E2E8E2", borderRadius: "8px", fontSize: 12 }}
                  formatter={(v, n) => [`${Number(v)}M FCFA`, n === "confirme" ? "Confirmé" : "Risqué"]}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                  formatter={(v) => v === "confirme" ? "Confirmé" : "Risqué"} />
                <Bar dataKey="confirme" fill="#DC5E13" radius={[3, 3, 0, 0]} maxBarSize={30} stackId="a" />
                <Bar dataKey="risque" fill="#FFB74D" radius={[3, 3, 0, 0]} maxBarSize={30} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertes trésorerie */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={15} className="text-amber-500" />
            <h3 className="font-semibold text-[color:var(--color-foreground)] text-sm">Points d&apos;attention</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Factures en retard", value: "75 M FCFA", sub: "1 facture — SGBCI", color: "text-red-600", bg: "bg-red-50" },
              { label: "Échéances à 30 jours", value: "125 M FCFA", sub: "3 factures — à encaisser", color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Charges fixes Oct", value: "213 M FCFA", sub: "Loyers + salaires estimés", color: "text-blue-600", bg: "bg-blue-50" },
            ].map((a) => (
              <div key={a.label} className={`rounded-xl p-3 ${a.bg}`}>
                <p className="text-xs text-[color:var(--color-muted)]">{a.label}</p>
                <p className={`text-xl font-bold mt-1 ${a.color}`}>{a.value}</p>
                <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
