"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Scale, TrendingUp, TrendingDown, DollarSign, Download } from "lucide-react";
import { cn } from "@/lib/cn";

type PosteBilan = {
  code: string;
  libelle: string;
  montant: number;
  precedent: number;
  sousPostes?: PosteBilan[];
};

const actif: PosteBilan[] = [
  {
    code: "A",
    libelle: "ACTIF IMMOBILISÉ",
    montant: 1_842_000_000,
    precedent: 1_690_000_000,
    sousPostes: [
      { code: "A1", libelle: "Immobilisations incorporelles", montant: 124_000_000, precedent: 98_000_000 },
      { code: "A2", libelle: "Immobilisations corporelles", montant: 1_580_000_000, precedent: 1_450_000_000 },
      { code: "A3", libelle: "Immobilisations financières", montant: 138_000_000, precedent: 142_000_000 },
    ],
  },
  {
    code: "B",
    libelle: "ACTIF CIRCULANT",
    montant: 1_356_000_000,
    precedent: 1_210_000_000,
    sousPostes: [
      { code: "B1", libelle: "Stocks et en-cours", montant: 487_000_000, precedent: 412_000_000 },
      { code: "B2", libelle: "Créances clients et comptes rattachés", montant: 645_000_000, precedent: 580_000_000 },
      { code: "B3", libelle: "Autres créances", montant: 224_000_000, precedent: 218_000_000 },
    ],
  },
  {
    code: "C",
    libelle: "TRÉSORERIE ACTIVE",
    montant: 552_000_000,
    precedent: 480_000_000,
    sousPostes: [
      { code: "C1", libelle: "Banques, chèques postaux", montant: 498_000_000, precedent: 430_000_000 },
      { code: "C2", libelle: "Caisse", montant: 54_000_000, precedent: 50_000_000 },
    ],
  },
];

const passif: PosteBilan[] = [
  {
    code: "P",
    libelle: "CAPITAUX PROPRES",
    montant: 2_104_000_000,
    precedent: 1_890_000_000,
    sousPostes: [
      { code: "P1", libelle: "Capital social", montant: 1_200_000_000, precedent: 1_200_000_000 },
      { code: "P2", libelle: "Réserves", montant: 687_000_000, precedent: 534_000_000 },
      { code: "P3", libelle: "Résultat de l'exercice", montant: 217_000_000, precedent: 156_000_000 },
    ],
  },
  {
    code: "Q",
    libelle: "DETTES FINANCIÈRES",
    montant: 985_000_000,
    precedent: 1_050_000_000,
    sousPostes: [
      { code: "Q1", libelle: "Emprunts et dettes financières", montant: 785_000_000, precedent: 860_000_000 },
      { code: "Q2", libelle: "Dettes de crédit-bail", montant: 200_000_000, precedent: 190_000_000 },
    ],
  },
  {
    code: "R",
    libelle: "PASSIF CIRCULANT",
    montant: 661_000_000,
    precedent: 440_000_000,
    sousPostes: [
      { code: "R1", libelle: "Fournisseurs et comptes rattachés", montant: 412_000_000, precedent: 280_000_000 },
      { code: "R2", libelle: "Dettes fiscales et sociales", montant: 189_000_000, precedent: 120_000_000 },
      { code: "R3", libelle: "Autres dettes", montant: 60_000_000, precedent: 40_000_000 },
    ],
  },
];

function fmt(n: number) {
  if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(3)} Mrd`;
  if (Math.abs(n) >= 1e6) return `${Math.round(n / 1e6)} M`;
  return n.toLocaleString("fr-FR");
}

function fmtFull(n: number) {
  return n.toLocaleString("fr-FR");
}

function VariationBadge({ current, previous }: { current: number; previous: number }) {
  const diff = current - previous;
  const pct = previous !== 0 ? Math.round((diff / previous) * 100) : 0;
  if (diff === 0) return <span className="text-xs text-gray-400">=</span>;
  return (
    <span className={cn("text-xs font-medium", diff > 0 ? "text-emerald-600" : "text-red-500")}>
      {diff > 0 ? "+" : ""}{pct}%
    </span>
  );
}

function BilanSection({ poste, expanded, onToggle }: { poste: PosteBilan; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer hover:bg-gray-50 transition-colors border-b border-[color:var(--color-border)]"
      >
        <td className="px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-xs font-bold flex items-center justify-center shrink-0">
              {poste.code}
            </span>
            <span className="text-sm font-bold text-[color:var(--color-foreground)] uppercase tracking-wide">{poste.libelle}</span>
          </div>
        </td>
        <td className="px-4 py-2.5 text-right text-sm font-bold text-[color:var(--color-foreground)]">{fmtFull(poste.montant)}</td>
        <td className="px-4 py-2.5 text-right text-sm text-[color:var(--color-muted)]">{fmtFull(poste.precedent)}</td>
        <td className="px-4 py-2.5 text-right"><VariationBadge current={poste.montant} previous={poste.precedent} /></td>
      </tr>
      {expanded && poste.sousPostes?.map((sp) => (
        <tr key={sp.code} className="bg-gray-50/50 border-b border-[color:var(--color-border)]">
          <td className="px-4 py-2 pl-12">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[color:var(--color-muted)] font-mono w-8">{sp.code}</span>
              <span className="text-sm text-[color:var(--color-foreground)]">{sp.libelle}</span>
            </div>
          </td>
          <td className="px-4 py-2 text-right text-sm text-[color:var(--color-foreground)]">{fmtFull(sp.montant)}</td>
          <td className="px-4 py-2 text-right text-sm text-[color:var(--color-muted)]">{fmtFull(sp.precedent)}</td>
          <td className="px-4 py-2 text-right"><VariationBadge current={sp.montant} previous={sp.precedent} /></td>
        </tr>
      ))}
    </>
  );
}

export default function BilanPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["A", "P"]));
  const [exercice, setExercice] = useState("2025");

  const totalActif = actif.reduce((s, p) => s + p.montant, 0);
  const totalPassif = passif.reduce((s, p) => s + p.montant, 0);
  const fonds = passif.find(p => p.code === "P")?.montant ?? 0;
  const resultat = passif.find(p => p.code === "P")?.sousPostes?.find(sp => sp.code === "P3")?.montant ?? 0;

  function toggle(code: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  return (
    <ERPLayout title="Finance — Bilan SYSCOHADA">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Bilan Comptable — SYSCOHADA Révisé"
          subtitle="États financiers annuels — BOUA Group consolidé"
          icon={Scale}
          actions={
            <div className="flex items-center gap-2">
              <select
                value={exercice}
                onChange={(e) => setExercice(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm bg-white outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
              >
                <option value="2025">Exercice 2025</option>
                <option value="2024">Exercice 2024</option>
                <option value="2023">Exercice 2023</option>
              </select>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Exporter PDF
              </button>
            </div>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total Actif" value={fmt(totalActif) + " FCFA"} icon={Scale} color="blue" highlight />
          <KpiCard title="Fonds propres" value={fmt(fonds) + " FCFA"} subtitle="capitaux propres" icon={TrendingUp} color="green" />
          <KpiCard title="Résultat net" value={fmt(resultat) + " FCFA"} subtitle="exercice 2025" icon={DollarSign} color="gold" />
          <KpiCard title="Équilibre bilan" value={totalActif === totalPassif ? "Équilibré" : "Écart"} subtitle={totalActif === totalPassif ? "Actif = Passif" : fmt(Math.abs(totalActif - totalPassif))} icon={totalActif === totalPassif ? TrendingUp : TrendingDown} color={totalActif === totalPassif ? "green" : "red"} />
        </div>

        {/* Bilan two-column */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* ACTIF */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="px-4 py-3 bg-blue-50 border-b border-[color:var(--color-border)]">
              <h3 className="font-bold text-sm text-blue-900 uppercase tracking-wide">ACTIF</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase">
                  <th className="px-4 py-2 text-left">Poste</th>
                  <th className="px-4 py-2 text-right">N (FCFA)</th>
                  <th className="px-4 py-2 text-right">N-1</th>
                  <th className="px-4 py-2 text-right">Var.</th>
                </tr>
              </thead>
              <tbody>
                {actif.map((p) => (
                  <BilanSection key={p.code} poste={p} expanded={expanded.has(p.code)} onToggle={() => toggle(p.code)} />
                ))}
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td className="px-4 py-3 text-sm font-bold text-blue-900 uppercase">TOTAL ACTIF</td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-blue-900">{fmtFull(totalActif)}</td>
                  <td className="px-4 py-3 text-right text-sm text-blue-700">{fmtFull(actif.reduce((s, p) => s + p.precedent, 0))}</td>
                  <td className="px-4 py-3 text-right"><VariationBadge current={totalActif} previous={actif.reduce((s, p) => s + p.precedent, 0)} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PASSIF */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="px-4 py-3 bg-emerald-50 border-b border-[color:var(--color-border)]">
              <h3 className="font-bold text-sm text-emerald-900 uppercase tracking-wide">PASSIF</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase">
                  <th className="px-4 py-2 text-left">Poste</th>
                  <th className="px-4 py-2 text-right">N (FCFA)</th>
                  <th className="px-4 py-2 text-right">N-1</th>
                  <th className="px-4 py-2 text-right">Var.</th>
                </tr>
              </thead>
              <tbody>
                {passif.map((p) => (
                  <BilanSection key={p.code} poste={p} expanded={expanded.has(p.code)} onToggle={() => toggle(p.code)} />
                ))}
                <tr className="bg-emerald-50 border-t-2 border-emerald-200">
                  <td className="px-4 py-3 text-sm font-bold text-emerald-900 uppercase">TOTAL PASSIF</td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-emerald-900">{fmtFull(totalPassif)}</td>
                  <td className="px-4 py-3 text-right text-sm text-emerald-700">{fmtFull(passif.reduce((s, p) => s + p.precedent, 0))}</td>
                  <td className="px-4 py-3 text-right"><VariationBadge current={totalPassif} previous={passif.reduce((s, p) => s + p.precedent, 0)} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Note bas de page */}
        <p className="text-xs text-[color:var(--color-muted)] text-center pb-2">
          Valeurs en FCFA — Normes SYSCOHADA Révisé — Exercice clos au 31 décembre {exercice} — Cliquer sur une rubrique pour développer le détail
        </p>
      </div>
    </ERPLayout>
  );
}
