"use client";

import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBar } from "@/components/ui/StatBar";
import { BarChart3, Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatMontant } from "@/lib/mock/finance";
import { cn } from "@/lib/cn";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";

const evol = [
  { mois: "Jan", produits: 1850, charges: 1620, resultat: 230 },
  { mois: "Fév", produits: 1720, charges: 1580, resultat: 140 },
  { mois: "Mar", produits: 2100, charges: 1790, resultat: 310 },
  { mois: "Avr", produits: 2050, charges: 1840, resultat: 210 },
  { mois: "Mai", produits: 2380, charges: 1960, resultat: 420 },
  { mois: "Jun", produits: 2260, charges: 2050, resultat: 210 },
  { mois: "Jul", produits: 2540, charges: 2100, resultat: 440 },
  { mois: "Aoû", produits: 2420, charges: 2180, resultat: 240 },
  { mois: "Sep", produits: 2900, charges: 2100, resultat: 800 },
];

type Ligne = {
  compte: string;
  libelle: string;
  n: number;
  n1: number;
  niveau?: number;
  isSousTotal?: boolean;
  isTotal?: boolean;
};

const lignesResultat: Ligne[] = [
  { compte: "70", libelle: "Chiffre d'affaires", n: 2475000000, n1: 2285000000 },
  { compte: "71", libelle: "Variation de stocks", n: 45000000, n1: 38000000 },
  { compte: "72", libelle: "Travaux faits par l'entreprise pour elle-même", n: 12000000, n1: 9500000 },
  { compte: "75", libelle: "Autres produits d'activités ordinaires", n: 28000000, n1: 22000000 },
  { compte: "", libelle: "TOTAL PRODUITS D'EXPLOITATION", n: 2560000000, n1: 2354500000, isSousTotal: true },

  { compte: "60", libelle: "Achats consommés", n: -812000000, n1: -748000000 },
  { compte: "61/62", libelle: "Autres charges externes", n: -285000000, n1: -262000000 },
  { compte: "63", libelle: "Impôts et taxes", n: -98000000, n1: -91000000 },
  { compte: "64", libelle: "Charges de personnel", n: -745000000, n1: -710000000 },
  { compte: "65", libelle: "Autres charges d'exploitation", n: -42000000, n1: -38000000 },
  { compte: "68", libelle: "Dotations aux amortissements", n: -124000000, n1: -118000000 },
  { compte: "", libelle: "TOTAL CHARGES D'EXPLOITATION", n: -2106000000, n1: -1967000000, isSousTotal: true },

  { compte: "", libelle: "RÉSULTAT D'EXPLOITATION", n: 454000000, n1: 387500000, isTotal: true },

  { compte: "77", libelle: "Produits financiers", n: 18000000, n1: 14200000 },
  { compte: "67", libelle: "Charges financières", n: -62000000, n1: -58000000 },
  { compte: "", libelle: "RÉSULTAT FINANCIER", n: -44000000, n1: -43800000, isSousTotal: true },

  { compte: "", libelle: "RÉSULTAT AVANT IMPÔT", n: 410000000, n1: 343700000, isTotal: true },

  { compte: "89", libelle: "Impôt sur les bénéfices (BIC)", n: -123000000, n1: -103000000 },
  { compte: "", libelle: "RÉSULTAT NET DE L'EXERCICE", n: 287000000, n1: 240700000, isTotal: true },
];

export default function CompteResultatPage() {
  return (
    <ERPLayout title="Finance — Compte de résultat">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Compte de résultat"
          subtitle="SYSCOHADA révisé — Janvier à Septembre 2026"
          icon={BarChart3}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Download size={14} />
              Exporter PDF
            </button>
          }
        />

        {/* Résumé */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Produits d'exploitation", value: 2560000000, color: "text-emerald-600", bg: "bg-emerald-50", icon: TrendingUp },
            { label: "Charges d'exploitation", value: 2106000000, color: "text-red-600", bg: "bg-red-50", icon: TrendingDown },
            { label: "Résultat net", value: 287000000, color: "text-[color:var(--color-primary)]", bg: "bg-[#E8F5E9]", icon: TrendingUp },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={cn("rounded-xl p-4 flex items-center gap-3", s.bg)}>
                <Icon size={20} className={s.color} />
                <div>
                  <p className="text-xs text-[color:var(--color-muted)]">{s.label}</p>
                  <p className={cn("text-xl font-bold", s.color)}>{formatMontant(Math.abs(s.value))}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Évolution graphique */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-[color:var(--color-foreground)] mb-1">Évolution mensuelle</h3>
          <p className="text-xs text-[color:var(--color-muted)] mb-4">Produits / Charges / Résultat — Millions FCFA</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={evol} barGap={2} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #E2E8E2", borderRadius: "8px", fontSize: 12 }}
                formatter={(v, n) => [`${Number(v)}M FCFA`, n === "produits" ? "Produits" : n === "charges" ? "Charges" : "Résultat"]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                formatter={(v) => v === "produits" ? "Produits" : v === "charges" ? "Charges" : "Résultat net"} />
              <ReferenceLine y={0} stroke="#E2E8E2" />
              <Bar dataKey="produits" fill="#1B5E20" radius={[3, 3, 0, 0]} maxBarSize={20} />
              <Bar dataKey="charges" fill="#EF5350" radius={[3, 3, 0, 0]} maxBarSize={20} />
              <Bar dataKey="resultat" fill="#D4A017" radius={[3, 3, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tableau compte de résultat */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-14">Compte</div>
            <div>Libellé</div>
            <div className="w-32 text-right hidden sm:block">N (FCFA)</div>
            <div className="w-32 text-right hidden md:block">N-1 (FCFA)</div>
            <div className="w-20 text-right hidden lg:block">Var. %</div>
          </div>

          {lignesResultat.map((l, i) => {
            const variation = l.n1 !== 0 ? Math.round(((l.n - l.n1) / Math.abs(l.n1)) * 100) : 0;
            return (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 items-center px-4 py-2.5 border-b border-[color:var(--color-border)] last:border-0",
                  l.isTotal && "bg-[#E8F5E9] font-bold",
                  l.isSousTotal && "bg-gray-50 font-semibold",
                  !l.isTotal && !l.isSousTotal && "hover:bg-gray-50 transition-colors"
                )}
              >
                <div className="w-14 text-xs font-mono text-[color:var(--color-muted)]">{l.compte}</div>
                <div className={cn("text-sm", (l.isTotal || l.isSousTotal) ? "text-[color:var(--color-foreground)]" : "text-[color:var(--color-foreground)]")}>
                  {l.libelle}
                </div>
                <div className={cn("w-32 text-right text-sm hidden sm:block", l.n < 0 ? "text-red-600" : l.n > 0 && l.isTotal ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-foreground)]")}>
                  {formatMontant(Math.abs(l.n))}
                </div>
                <div className="w-32 text-right text-sm text-[color:var(--color-muted)] hidden md:block">
                  {formatMontant(Math.abs(l.n1))}
                </div>
                <div className="w-20 text-right hidden lg:block">
                  {l.n !== 0 && l.n1 !== 0 && (
                    <span className={cn("text-xs font-medium", variation > 0 ? "text-emerald-600" : "text-red-500")}>
                      {variation > 0 ? "+" : ""}{variation}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ERPLayout>
  );
}
