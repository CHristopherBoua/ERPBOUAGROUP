"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import {
  demandesConge,
  statutCongeLabels,
  statutCongeColors,
  type DemandeConge,
} from "@/lib/mock/conges";
import {
  CalendarDays,
  Plus,
  Check,
  X,
  Clock,
  CalendarCheck,
  CalendarX,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/cn";

const typeOptions = [
  { label: "Tous types", value: "" },
  { label: "Annuel", value: "Annuel" },
  { label: "Maladie", value: "Maladie" },
  { label: "Maternité/Paternité", value: "Maternité" },
  { label: "Formation", value: "Formation" },
  { label: "RTT", value: "RTT" },
];

const statutOptions = [
  { label: "Tous statuts", value: "" },
  { label: "En attente", value: "en_attente" },
  { label: "Approuvé", value: "approuve" },
  { label: "Refusé", value: "refuse" },
];

function CongeRow({
  d,
  onApprove,
  onRefuse,
}: {
  d: DemandeConge;
  onApprove: (id: string) => void;
  onRefuse: (id: string) => void;
}) {
  const [prenom, nom] = d.employeNom.split(" ");
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <Avatar prenom={prenom ?? ""} nom={nom ?? ""} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)]">{d.employeNom}</p>
        <p className="text-xs text-[color:var(--color-muted)]">{d.employePoste}</p>
      </div>
      <div className="hidden sm:block w-24">
        <Badge className="bg-gray-100 text-gray-600">{d.type}</Badge>
      </div>
      <div className="hidden md:block w-40 text-xs text-[color:var(--color-muted)]">
        {new Date(d.dateDebut).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
        {" → "}
        {new Date(d.dateFin).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
      <div className="hidden lg:block w-16 text-xs font-semibold text-center text-[color:var(--color-foreground)]">
        {d.jours} j
      </div>
      <div className="hidden xl:block w-24 text-xs text-[color:var(--color-muted)]">{d.filiale}</div>
      <Badge className={cn("shrink-0 w-24 justify-center", statutCongeColors[d.statut])}>
        {statutCongeLabels[d.statut]}
      </Badge>
      {d.statut === "en_attente" && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onApprove(d.id)}
            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
            title="Approuver"
          >
            <Check size={14} />
          </button>
          <button
            onClick={() => onRefuse(d.id)}
            className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
            title="Refuser"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {d.statut !== "en_attente" && <div className="w-16 shrink-0" />}
    </div>
  );
}

export default function CongesPage() {
  const [demandes, setDemandes] = useState(demandesConge);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [statut, setStatut] = useState("");
  const [activeTab, setActiveTab] = useState("toutes");

  function approve(id: string) {
    setDemandes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, statut: "approuve" as const } : d))
    );
  }

  function refuse(id: string) {
    setDemandes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, statut: "refuse" as const } : d))
    );
  }

  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;
  const approuves = demandes.filter((d) => d.statut === "approuve").length;
  const refuses = demandes.filter((d) => d.statut === "refuse").length;
  const totalJours = demandes
    .filter((d) => d.statut === "approuve")
    .reduce((s, d) => s + d.jours, 0);

  const filtered = demandes.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.employeNom.toLowerCase().includes(q) || d.filiale.toLowerCase().includes(q);
    const matchType = !type || d.type === type;
    const matchStatut = !statut || d.statut === statut;
    const matchTab =
      activeTab === "toutes" ||
      (activeTab === "attente" && d.statut === "en_attente") ||
      (activeTab === "approuve" && d.statut === "approuve") ||
      (activeTab === "refuse" && d.statut === "refuse");
    return matchSearch && matchType && matchStatut && matchTab;
  });

  return (
    <ERPLayout title="RH — Congés & Absences">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Gestion des congés & absences"
          subtitle="Suivi et validation des demandes de congés"
          icon={CalendarDays}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={15} />
              Nouvelle demande
            </button>
          }
          tabs={[
            { label: "Toutes", value: "toutes" },
            { label: "En attente", value: "attente", badge: String(enAttente) },
            { label: "Approuvées", value: "approuve" },
            { label: "Refusées", value: "refuse" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="En attente" value={String(enAttente)} icon={Clock} color="orange" />
          <KpiCard title="Approuvées" value={String(approuves)} icon={CalendarCheck} color="green" />
          <KpiCard title="Refusées" value={String(refuses)} icon={CalendarX} color="red" />
          <KpiCard title="Jours approuvés" value={String(totalJours)} subtitle="Ce mois" icon={CalendarDays} color="blue" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Rechercher par employé, filiale..."
            className="w-64"
          />
          <FilterSelect value={type} onChange={setType} options={typeOptions} />
          <FilterSelect value={statut} onChange={setStatut} options={statutOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} demande{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          {/* En-tête */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-7 shrink-0" />
            <div className="flex-1">Employé</div>
            <div className="hidden sm:block w-24">Type</div>
            <div className="hidden md:block w-40">Période</div>
            <div className="hidden lg:block w-16 text-center">Jours</div>
            <div className="hidden xl:block w-24">Filiale</div>
            <div className="w-24">Statut</div>
            <div className="w-16 shrink-0">Actions</div>
          </div>

          {filtered.map((d) => (
            <CongeRow key={d.id} d={d} onApprove={approve} onRefuse={refuse} />
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <CalendarDays size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-[color:var(--color-muted)]">Aucune demande trouvée</p>
            </div>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
