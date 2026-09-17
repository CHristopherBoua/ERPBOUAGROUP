"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import {
  transactions, statutTxColors, statutTxLabels, formatMontant,
} from "@/lib/mock/finance";
import { DollarSign, Plus, Download, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

const journalColors: Record<string, string> = {
  Achats: "bg-orange-100 text-orange-700",
  Ventes: "bg-emerald-100 text-emerald-700",
  Banque: "bg-blue-100 text-blue-700",
  Caisse: "bg-purple-100 text-purple-700",
  OD: "bg-gray-100 text-gray-600",
  Paie: "bg-pink-100 text-pink-700",
};

const journalOptions = [
  { label: "Tous journaux", value: "" },
  { label: "Achats", value: "Achats" },
  { label: "Ventes", value: "Ventes" },
  { label: "Banque", value: "Banque" },
  { label: "Caisse", value: "Caisse" },
  { label: "OD", value: "OD" },
  { label: "Paie", value: "Paie" },
];

const statutOptions = [
  { label: "Tous statuts", value: "" },
  { label: "Validé", value: "valide" },
  { label: "En attente", value: "en_attente" },
  { label: "Rapproché", value: "rapproche" },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [journal, setJournal] = useState("");
  const [statut, setStatut] = useState("");

  const totalDebits = transactions.reduce((s, t) => s + t.debit, 0);
  const totalCredits = transactions.reduce((s, t) => s + t.credit, 0);
  const enAttente = transactions.filter((t) => t.statut === "en_attente").length;

  const filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.libelle.toLowerCase().includes(q) ||
      t.tiers.toLowerCase().includes(q) ||
      t.reference.toLowerCase().includes(q);
    const matchJournal = !journal || t.journal === journal;
    const matchStatut = !statut || t.statut === statut;
    return matchSearch && matchJournal && matchStatut;
  });

  return (
    <ERPLayout title="Finance — Transactions">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Transactions comptables"
          subtitle="Journal des écritures — Plan comptable SYSCOHADA"
          icon={DollarSign}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Saisie manuelle
              </button>
            </>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total débits" value={formatMontant(totalDebits)} icon={ArrowDownLeft} color="red" />
          <KpiCard title="Total crédits" value={formatMontant(totalCredits)} icon={ArrowUpRight} color="green" />
          <KpiCard title="Solde période" value={formatMontant(totalCredits - totalDebits)} icon={DollarSign} color="blue" />
          <KpiCard title="En attente validation" value={String(enAttente)} icon={RefreshCw} color="orange" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Libellé, tiers, référence..." className="w-72" />
          <FilterSelect value={journal} onChange={setJournal} options={journalOptions} />
          <FilterSelect value={statut} onChange={setStatut} options={statutOptions} />
          <input
            type="month"
            defaultValue="2026-09"
            className="px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm bg-white outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} écriture{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-0 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div>Libellé / Tiers</div>
            <div className="hidden sm:block w-20 text-center">Date</div>
            <div className="hidden md:block w-20 text-center">Journal</div>
            <div className="hidden lg:block w-28 text-right">Débit</div>
            <div className="hidden lg:block w-28 text-right">Crédit</div>
            <div className="hidden xl:block w-24 text-center">Filiale</div>
            <div className="w-24 text-center">Statut</div>
          </div>

          {filtered.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-0 items-center px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{t.libelle}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-[color:var(--color-muted)]">{t.tiers}</p>
                  <span className="text-xs font-mono text-[color:var(--color-muted)] bg-gray-100 px-1 rounded">{t.reference}</span>
                </div>
              </div>
              <div className="hidden sm:block w-20 text-center text-xs text-[color:var(--color-muted)]">
                {new Date(t.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
              </div>
              <div className="hidden md:block w-20 text-center">
                <Badge className={cn("text-xs", journalColors[t.journal] ?? "bg-gray-100 text-gray-600")}>
                  {t.journal}
                </Badge>
              </div>
              <div className="hidden lg:block w-28 text-right text-sm">
                {t.debit > 0 ? (
                  <span className="font-semibold text-red-600">{formatMontant(t.debit)}</span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </div>
              <div className="hidden lg:block w-28 text-right text-sm">
                {t.credit > 0 ? (
                  <span className="font-semibold text-emerald-600">{formatMontant(t.credit)}</span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </div>
              <div className="hidden xl:block w-24 text-center">
                <span className="text-xs text-[color:var(--color-muted)] truncate">{t.filiale}</span>
              </div>
              <div className="w-24 text-center">
                <Badge className={cn("text-xs", statutTxColors[t.statut])}>
                  {statutTxLabels[t.statut]}
                </Badge>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-[color:var(--color-muted)]">Aucune transaction trouvée</div>
          )}
        </div>

        {/* Totaux */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Débits (filtrés)", value: formatMontant(filtered.reduce((s, t) => s + t.debit, 0)), color: "text-red-600" },
              { label: "Total Crédits (filtrés)", value: formatMontant(filtered.reduce((s, t) => s + t.credit, 0)), color: "text-emerald-600" },
              {
                label: "Solde (filtrés)",
                value: formatMontant(Math.abs(filtered.reduce((s, t) => s + t.credit - t.debit, 0))),
                color: filtered.reduce((s, t) => s + t.credit - t.debit, 0) >= 0 ? "text-emerald-600" : "text-red-600",
              },
            ].map((row) => (
              <div key={row.label} className="text-center">
                <p className="text-xs text-[color:var(--color-muted)] mb-1">{row.label}</p>
                <p className={`text-lg font-bold ${row.color}`}>{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
