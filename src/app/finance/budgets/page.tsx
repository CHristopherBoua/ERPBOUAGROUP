"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatBar } from "@/components/ui/StatBar";
import { budgets, formatMontant, type LigneBudget } from "@/lib/mock/finance";
import { PiggyBank, AlertTriangle, CheckCircle, TrendingUp, Download, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

const categorieOptions = [
  { label: "Toutes catégories", value: "" },
  { label: "Charges de personnel", value: "Charges de personnel" },
  { label: "Frais généraux", value: "Frais généraux" },
  { label: "Marketing & Commercial", value: "Marketing & Commercial" },
  { label: "Opérations industrielles", value: "Opérations industrielles" },
  { label: "Finance & Fiscal", value: "Finance & Fiscal" },
];

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "BOUA Group", value: "BOUA Group" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
  { label: "Distribution", value: "Distribution" },
  { label: "Industrie", value: "Industrie" },
  { label: "Fintech", value: "Fintech" },
];

function tauxExec(b: LigneBudget) {
  return b.budgetRevise > 0 ? Math.round((b.realise / b.budgetRevise) * 100) : 0;
}

function tauxEngage(b: LigneBudget) {
  return b.budgetRevise > 0 ? Math.round((b.engage / b.budgetRevise) * 100) : 0;
}

function statusBudget(b: LigneBudget): "ok" | "alerte" | "depassement" {
  const t = tauxEngage(b);
  if (t > 100) return "depassement";
  if (t > 90) return "alerte";
  return "ok";
}

export default function BudgetsPage() {
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [filialeFilter, setFilialeFilter] = useState("");
  const [activeTab, setActiveTab] = useState("execution");

  const totalBudget = budgets.reduce((s, b) => s + b.budgetRevise, 0);
  const totalEngage = budgets.reduce((s, b) => s + b.engage, 0);
  const totalRealise = budgets.reduce((s, b) => s + b.realise, 0);
  const enDepassement = budgets.filter((b) => tauxEngage(b) > 100).length;

  const filtered = budgets.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.poste.toLowerCase().includes(q) || b.departement.toLowerCase().includes(q);
    const matchCat = !categorie || b.categorie === categorie;
    const matchFiliale = !filialeFilter || b.filiale === filialeFilter;
    return matchSearch && matchCat && matchFiliale;
  });

  // Grouper par catégorie
  const grouped = filtered.reduce<Record<string, LigneBudget[]>>((acc, b) => {
    if (!acc[b.categorie]) acc[b.categorie] = [];
    acc[b.categorie].push(b);
    return acc;
  }, {});

  return (
    <ERPLayout title="Finance — Budgets">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Budgets & Engagements"
          subtitle="Suivi d'exécution budgétaire — Exercice 2026"
          icon={PiggyBank}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Rapport
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Nouvelle ligne
              </button>
            </>
          }
          tabs={[
            { label: "Exécution", value: "execution" },
            { label: "Par filiale", value: "filiale" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard
            title="Budget total révisé"
            value={formatMontant(totalBudget)}
            icon={PiggyBank}
            color="blue"
          />
          <KpiCard
            title="Engagé"
            value={`${Math.round((totalEngage / totalBudget) * 100)}%`}
            subtitle={formatMontant(totalEngage)}
            icon={TrendingUp}
            color="gold"
          />
          <KpiCard
            title="Réalisé"
            value={`${Math.round((totalRealise / totalBudget) * 100)}%`}
            subtitle={formatMontant(totalRealise)}
            icon={CheckCircle}
            color="green"
          />
          <KpiCard
            title="Dépassements"
            value={String(enDepassement)}
            subtitle="Lignes > 100%"
            icon={AlertTriangle}
            color={enDepassement > 0 ? "red" : "green"}
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Poste, département..." className="w-60" />
          <FilterSelect value={categorie} onChange={setCategorie} options={categorieOptions} />
          <FilterSelect value={filialeFilter} onChange={setFilialeFilter} options={filialeOptions} />
        </div>

        {/* Tableau par catégorie */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([cat, lignes]) => {
            const catBudget = lignes.reduce((s, b) => s + b.budgetRevise, 0);
            const catRealise = lignes.reduce((s, b) => s + b.realise, 0);
            const catEngage = lignes.reduce((s, b) => s + b.engage, 0);

            return (
              <div key={cat} className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
                {/* En-tête catégorie */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-[color:var(--color-border)]">
                  <div>
                    <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">{cat}</h3>
                    <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
                      Budget : {formatMontant(catBudget)} · Réalisé : {formatMontant(catRealise)} · {Math.round((catRealise / catBudget) * 100)}%
                    </p>
                  </div>
                  <div className="w-32">
                    <div className="text-xs text-right text-[color:var(--color-muted)] mb-1">
                      {Math.round((catEngage / catBudget) * 100)}% engagé
                    </div>
                    <StatBar
                      value={catEngage}
                      max={catBudget}
                      color={catEngage > catBudget ? "#D32F2F" : "#1B5E20"}
                    />
                  </div>
                </div>

                {/* Lignes */}
                {lignes.map((b) => {
                  const tx = tauxExec(b);
                  const txE = tauxEngage(b);
                  const st = statusBudget(b);
                  return (
                    <div
                      key={b.id}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors",
                        st === "depassement" && "bg-red-50/40 hover:bg-red-50/60"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[color:var(--color-foreground)]">{b.poste}</p>
                          {st === "depassement" && (
                            <AlertTriangle size={13} className="text-red-500 shrink-0" />
                          )}
                          {st === "alerte" && (
                            <AlertTriangle size={13} className="text-amber-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-[color:var(--color-muted)]">
                          {b.departement} · {b.filiale}
                        </p>
                      </div>
                      <div className="hidden md:block text-right w-28">
                        <p className="text-xs text-[color:var(--color-muted)]">Budget révisé</p>
                        <p className="text-sm font-semibold text-[color:var(--color-foreground)]">{formatMontant(b.budgetRevise)}</p>
                      </div>
                      <div className="hidden lg:block text-right w-28">
                        <p className="text-xs text-[color:var(--color-muted)]">Engagé</p>
                        <p className={cn("text-sm font-semibold", txE > 100 ? "text-red-600" : txE > 90 ? "text-amber-600" : "text-[color:var(--color-foreground)]")}>
                          {formatMontant(b.engage)}
                        </p>
                      </div>
                      <div className="hidden xl:block text-right w-28">
                        <p className="text-xs text-[color:var(--color-muted)]">Réalisé</p>
                        <p className="text-sm font-semibold text-emerald-600">{formatMontant(b.realise)}</p>
                      </div>
                      <div className="w-36">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[color:var(--color-muted)]">Exécution</span>
                          <span className={cn("font-bold", tx > 100 ? "text-red-600" : tx > 80 ? "text-emerald-600" : "text-[color:var(--color-muted)]")}>
                            {tx}%
                          </span>
                        </div>
                        <StatBar
                          value={b.realise}
                          max={b.budgetRevise}
                          color={tx > 100 ? "#D32F2F" : tx > 80 ? "#1B5E20" : "#D4A017"}
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-[color:var(--color-muted)]">Engagé</span>
                          <span className={cn("font-medium", txE > 100 ? "text-red-500" : "text-[color:var(--color-muted)]")}>
                            {txE}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </ERPLayout>
  );
}
