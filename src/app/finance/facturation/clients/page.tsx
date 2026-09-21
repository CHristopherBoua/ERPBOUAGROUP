"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatBar } from "@/components/ui/StatBar";
import {
  factures, statutFactureColors, statutFactureLabels, formatMontant, type Facture,
} from "@/lib/mock/finance";
import {
  Receipt, Plus, Download, Send, Eye, AlertTriangle, CheckCircle,
  Clock, FileText, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";

const statutOptions = [
  { label: "Tous statuts", value: "" },
  { label: "Brouillon", value: "brouillon" },
  { label: "Envoyée", value: "envoyee" },
  { label: "Partiellement payée", value: "partiellement_payee" },
  { label: "Payée", value: "payee" },
  { label: "En retard", value: "en_retard" },
];

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
  { label: "Distribution", value: "Distribution" },
  { label: "Fintech", value: "Fintech" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Industrie", value: "Industrie" },
];

function jourRestants(echeance: string): number {
  const today = new Date("2026-09-17");
  const d = new Date(echeance);
  return Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function FactureRow({ f }: { f: Facture }) {
  const jours = jourRestants(f.echeance);
  const tauxPaiement = f.montantTTC > 0
    ? Math.round(((f.montantTTC - f.soldeRestant) / f.montantTTC) * 100)
    : 100;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <FileText size={13} className="text-[color:var(--color-muted)]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[color:var(--color-muted)]">{f.numero}</span>
          {f.statut === "en_retard" && <AlertTriangle size={11} className="text-red-500" />}
        </div>
        <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{f.client}</p>
        <p className="text-xs text-[color:var(--color-muted)] truncate">{f.description}</p>
      </div>
      <div className="hidden sm:block w-20 text-xs text-[color:var(--color-muted)] text-center">
        {new Date(f.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
      </div>
      <div className="hidden md:block w-24 text-center">
        <p className={cn("text-xs font-medium", jours < 0 ? "text-red-600" : jours <= 7 ? "text-amber-600" : "text-[color:var(--color-muted)]")}>
          {jours < 0 ? `${Math.abs(jours)}j dépassé` : jours === 0 ? "Aujourd'hui" : `${jours}j restants`}
        </p>
      </div>
      <div className="hidden lg:block text-right w-32">
        <p className="text-sm font-bold text-[color:var(--color-foreground)]">{formatMontant(f.montantTTC)}</p>
        {f.soldeRestant > 0 && f.soldeRestant < f.montantTTC && (
          <p className="text-xs text-amber-600">Restant : {formatMontant(f.soldeRestant)}</p>
        )}
      </div>
      {f.statut !== "brouillon" && f.statut !== "payee" && (
        <div className="hidden xl:block w-24">
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-[color:var(--color-muted)]">Payé</span>
            <span className="font-medium">{tauxPaiement}%</span>
          </div>
          <StatBar value={tauxPaiement} max={100} color={tauxPaiement === 100 ? "#DC5E13" : tauxPaiement > 50 ? "#D4A017" : "#EF5350"} />
        </div>
      )}
      {(f.statut === "brouillon" || f.statut === "payee") && <div className="hidden xl:block w-24" />}
      <div className="hidden xl:block w-24 text-center text-xs text-[color:var(--color-muted)] truncate">
        {f.filiale}
      </div>
      <Badge className={cn("shrink-0 w-20 justify-center", statutFactureColors[f.statut])}>
        {statutFactureLabels[f.statut]}
      </Badge>
      <div className="flex items-center gap-1 shrink-0">
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] transition-colors" title="Voir">
          <Eye size={13} />
        </button>
        {f.statut === "brouillon" && (
          <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-[color:var(--color-muted)] hover:text-blue-600 transition-colors" title="Envoyer">
            <Send size={13} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function FacturationPage() {
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [filiale, setFiliale] = useState("");
  const [activeTab, setActiveTab] = useState("toutes");

  const totalEmis = factures.reduce((s, f) => s + f.montantTTC, 0);
  const totalEncaisse = factures.reduce((s, f) => s + (f.montantTTC - f.soldeRestant), 0);
  const totalEnRetard = factures.filter((f) => f.statut === "en_retard").reduce((s, f) => s + f.soldeRestant, 0);
  const enAttenteCount = factures.filter((f) => f.statut === "envoyee" || f.statut === "partiellement_payee").length;

  const filtered = factures.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch = !q || f.client.toLowerCase().includes(q) || f.numero.toLowerCase().includes(q) || f.description.toLowerCase().includes(q);
    const matchStatut = !statut || f.statut === statut;
    const matchFiliale = !filiale || f.filiale === filiale;
    const matchTab =
      activeTab === "toutes" ||
      (activeTab === "encaissement" && ["envoyee", "partiellement_payee", "en_retard"].includes(f.statut)) ||
      (activeTab === "payees" && f.statut === "payee") ||
      (activeTab === "brouillons" && f.statut === "brouillon");
    return matchSearch && matchStatut && matchFiliale && matchTab;
  });

  return (
    <ERPLayout title="Finance — Facturation clients">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Facturation clients"
          subtitle="Devis, factures, avoirs et suivi des encaissements"
          icon={Receipt}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Nouvelle facture
              </button>
            </>
          }
          tabs={[
            { label: "Toutes", value: "toutes" },
            { label: "À encaisser", value: "encaissement", badge: String(enAttenteCount) },
            { label: "Payées", value: "payees" },
            { label: "Brouillons", value: "brouillons" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total émis" value={formatMontant(totalEmis)} icon={FileText} color="blue" />
          <KpiCard title="Encaissé" value={formatMontant(totalEncaisse)} icon={CheckCircle} color="green"
            trend={Math.round((totalEncaisse / totalEmis) * 100)} trendLabel="taux encaissement" />
          <KpiCard title="En retard" value={formatMontant(totalEnRetard)} icon={AlertTriangle} color="red" />
          <KpiCard title="À encaisser" value={String(enAttenteCount)} subtitle="factures en cours" icon={Clock} color="orange" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Client, numéro, description..." className="w-72" />
          <FilterSelect value={statut} onChange={setStatut} options={statutOptions} />
          <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} facture{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-7 shrink-0" />
            <div className="flex-1">Client / Description</div>
            <div className="hidden sm:block w-20 text-center">Émission</div>
            <div className="hidden md:block w-24 text-center">Échéance</div>
            <div className="hidden lg:block w-32 text-right">Montant TTC</div>
            <div className="hidden xl:block w-24 text-center">Paiement</div>
            <div className="hidden xl:block w-24 text-center">Filiale</div>
            <div className="w-20 text-center">Statut</div>
            <div className="w-16" />
          </div>

          {filtered.map((f) => (
            <FactureRow key={f.id} f={f} />
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Receipt size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-[color:var(--color-muted)]">Aucune facture trouvée</p>
            </div>
          )}
        </div>

        {/* Tableau de vieillissement */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-4">
            Tableau d&apos;âge des créances
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Non échu", value: 95000000, color: "bg-emerald-100 text-emerald-700", pct: 60 },
              { label: "0 – 30 jours", value: 30000000, color: "bg-amber-100 text-amber-700", pct: 19 },
              { label: "31 – 60 jours", value: 20000000, color: "bg-orange-100 text-orange-700", pct: 13 },
              { label: "+ 60 jours", value: 13000000, color: "bg-red-100 text-red-700", pct: 8 },
            ].map((col) => (
              <div key={col.label} className={cn("rounded-xl p-3", col.color)}>
                <p className="text-xs font-medium">{col.label}</p>
                <p className="text-lg font-bold mt-1">{formatMontant(col.value)}</p>
                <p className="text-xs mt-0.5">{col.pct}% du total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
