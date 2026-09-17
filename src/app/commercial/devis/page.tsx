"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import {
  devis, statutDevisColors, statutDevisLabels, formatMontantCom, type Devis,
} from "@/lib/mock/commercial";
import {
  ShoppingCart, FileText, CheckCircle, Clock, AlertTriangle,
  Plus, Download, Eye, Send, Copy,
} from "lucide-react";
import { cn } from "@/lib/cn";

const statutOptions = [
  { label: "Tous statuts", value: "" },
  { label: "Brouillon", value: "brouillon" },
  { label: "Envoyé", value: "envoye" },
  { label: "Accepté", value: "accepte" },
  { label: "Refusé", value: "refuse" },
  { label: "Expiré", value: "expire" },
];

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "Fintech", value: "Fintech" },
  { label: "Distribution", value: "Distribution" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
  { label: "Industrie", value: "Industrie" },
];

function jourRestants(dateValidite: string): number {
  const today = new Date("2026-09-17");
  const d = new Date(dateValidite);
  return Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function DevisRow({ d }: { d: Devis }) {
  const jours = jourRestants(d.dateValidite);
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <FileText size={14} className="text-[color:var(--color-muted)]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[color:var(--color-muted)]">{d.numero}</span>
        </div>
        <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{d.objet}</p>
        <p className="text-xs text-[color:var(--color-muted)]">{d.client}</p>
      </div>
      <div className="hidden sm:block w-20 text-xs text-[color:var(--color-muted)] text-center">
        {new Date(d.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
      </div>
      <div className="hidden md:block w-24 text-center">
        {d.statut === "expire" || d.statut === "refuse" ? (
          <span className="text-xs text-red-500 font-medium">—</span>
        ) : (
          <span className={cn("text-xs font-medium", jours < 0 ? "text-red-600" : jours <= 7 ? "text-amber-600" : "text-[color:var(--color-muted)]")}>
            {jours < 0 ? `${Math.abs(jours)}j dépassé` : `${jours}j restants`}
          </span>
        )}
      </div>
      <div className="hidden lg:block text-right w-32">
        <p className="text-sm font-bold text-[color:var(--color-foreground)]">{formatMontantCom(d.montantTTC)}</p>
        <p className="text-xs text-[color:var(--color-muted)]">HT : {formatMontantCom(d.montantHT)}</p>
      </div>
      <div className="hidden xl:block w-32 text-xs text-[color:var(--color-muted)] truncate">{d.commercial}</div>
      <div className="hidden xl:block w-28 text-xs text-[color:var(--color-primary)] font-medium truncate">{d.filiale}</div>
      <Badge className={cn("shrink-0 w-20 justify-center text-xs", statutDevisColors[d.statut])}>
        {statutDevisLabels[d.statut]}
      </Badge>
      <div className="flex items-center gap-1 shrink-0">
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Voir">
          <Eye size={13} />
        </button>
        {d.statut === "brouillon" && (
          <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-[color:var(--color-muted)] hover:text-blue-600 transition-colors" title="Envoyer">
            <Send size={13} />
          </button>
        )}
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Dupliquer">
          <Copy size={13} />
        </button>
      </div>
    </div>
  );
}

export default function DevisPage() {
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [filiale, setFiliale] = useState("");
  const [activeTab, setActiveTab] = useState("tous");

  const totalDevis = devis.length;
  const totalMontant = devis.reduce((s, d) => s + d.montantTTC, 0);
  const acceptes = devis.filter((d) => d.statut === "accepte");
  const enAttente = devis.filter((d) => d.statut === "envoye").length;
  const tauxConversion = Math.round((acceptes.length / totalDevis) * 100);

  const filtered = devis.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.client.toLowerCase().includes(q) || d.numero.toLowerCase().includes(q) || d.objet.toLowerCase().includes(q);
    const matchStatut = !statut || d.statut === statut;
    const matchFiliale = !filiale || d.filiale === filiale;
    const matchTab =
      activeTab === "tous" ||
      (activeTab === "en_attente" && d.statut === "envoye") ||
      (activeTab === "acceptes" && d.statut === "accepte") ||
      (activeTab === "brouillons" && d.statut === "brouillon");
    return matchSearch && matchStatut && matchFiliale && matchTab;
  });

  return (
    <ERPLayout title="Commercial — Devis & Commandes">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Devis & Commandes"
          subtitle="Gestion des propositions commerciales"
          icon={ShoppingCart}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Nouveau devis
              </button>
            </>
          }
          tabs={[
            { label: "Tous", value: "tous" },
            { label: "En attente", value: "en_attente", badge: String(enAttente) },
            { label: "Acceptés", value: "acceptes" },
            { label: "Brouillons", value: "brouillons" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total devis" value={String(totalDevis)} icon={FileText} color="blue" />
          <KpiCard title="Montant total" value={formatMontantCom(totalMontant)} icon={ShoppingCart} color="gold" highlight />
          <KpiCard title="Taux de conversion" value={`${tauxConversion}%`} subtitle={`${acceptes.length} acceptés`} icon={CheckCircle} color="green" />
          <KpiCard title="En attente réponse" value={String(enAttente)} subtitle="devis envoyés" icon={Clock} color="orange" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Client, numéro, objet..." className="w-72" />
          <FilterSelect value={statut} onChange={setStatut} options={statutOptions} />
          <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} devis
          </span>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-8 shrink-0" />
            <div className="flex-1">Objet / Client</div>
            <div className="hidden sm:block w-20 text-center">Date</div>
            <div className="hidden md:block w-24 text-center">Validité</div>
            <div className="hidden lg:block w-32 text-right">Montant TTC</div>
            <div className="hidden xl:block w-32 text-center">Commercial</div>
            <div className="hidden xl:block w-28 text-center">Filiale</div>
            <div className="w-20 text-center">Statut</div>
            <div className="w-20 shrink-0" />
          </div>
          {filtered.map((d) => <DevisRow key={d.id} d={d} />)}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <ShoppingCart size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-[color:var(--color-muted)]">Aucun devis trouvé</p>
            </div>
          )}
        </div>

        {/* Récapitulatif par statut */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(["brouillon", "envoye", "accepte", "refuse", "expire"] as const).map((s) => {
            const lignes = devis.filter((d) => d.statut === s);
            const montant = lignes.reduce((acc, d) => acc + d.montantTTC, 0);
            return (
              <div key={s} className="bg-white rounded-xl border border-[color:var(--color-border)] p-3">
                <Badge className={cn("text-xs mb-2", statutDevisColors[s])}>{statutDevisLabels[s]}</Badge>
                <p className="text-xl font-bold text-[color:var(--color-foreground)]">{lignes.length}</p>
                <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{montant > 0 ? formatMontantCom(montant) : "—"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ERPLayout>
  );
}
