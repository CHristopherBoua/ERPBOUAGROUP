"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { StatBar } from "@/components/ui/StatBar";
import {
  employes,
  statutLabels,
  statutColors,
  type Employe,
} from "@/lib/mock/employes";
import {
  Users,
  Plus,
  Download,
  LayoutGrid,
  LayoutList,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "BOUA Group", value: "BOUA Group" },
  { label: "Fintech", value: "Fintech" },
  { label: "Industrie", value: "Industrie" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Distribution", value: "Distribution" },
];

const statutOptions = [
  { label: "Tous les statuts", value: "" },
  { label: "Actif", value: "actif" },
  { label: "En congé", value: "conge" },
  { label: "Absent", value: "absent" },
  { label: "En formation", value: "formation" },
];

function EmployeCard({ emp }: { emp: Employe }) {
  return (
    <Link href={`/rh/employes/${emp.id}`}>
      <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4 hover:shadow-md hover:border-[color:var(--color-primary)] transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <Avatar prenom={emp.prenom} nom={emp.nom} size="lg" />
          <Badge className={statutColors[emp.statut]}>{statutLabels[emp.statut]}</Badge>
        </div>
        <h3 className="font-semibold text-[color:var(--color-foreground)] text-sm">
          {emp.prenom} {emp.nom}
        </h3>
        <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{emp.poste}</p>
        <p className="text-xs text-[color:var(--color-primary)] mt-1 font-medium">{emp.filiale}</p>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
            <MapPin size={11} />
            <span className="truncate">{emp.site}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
            <Mail size={11} />
            <span className="truncate">{emp.email}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[color:var(--color-border)]">
          <div className="flex items-center justify-between text-xs text-[color:var(--color-muted)] mb-1">
            <span>Congés</span>
            <span className="font-medium text-[color:var(--color-foreground)]">
              {emp.congesPris}/{emp.soldeConge} j
            </span>
          </div>
          <StatBar value={emp.congesPris} max={emp.soldeConge} />
        </div>
      </div>
    </Link>
  );
}

function EmployeRow({ emp }: { emp: Employe }) {
  return (
    <Link href={`/rh/employes/${emp.id}`}>
      <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-[color:var(--color-border)] last:border-0">
        <Avatar prenom={emp.prenom} nom={emp.nom} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-[color:var(--color-foreground)]">
            {emp.prenom} {emp.nom}
          </p>
          <p className="text-xs text-[color:var(--color-muted)]">{emp.poste}</p>
        </div>
        <div className="hidden sm:block w-32 text-xs text-[color:var(--color-muted)]">
          {emp.filiale}
        </div>
        <div className="hidden md:block w-28 text-xs text-[color:var(--color-muted)]">
          {emp.departement}
        </div>
        <div className="hidden lg:block w-32 text-xs text-[color:var(--color-muted)]">
          {emp.site}
        </div>
        <div className="hidden xl:flex items-center gap-1.5 w-28 text-xs text-[color:var(--color-muted)]">
          <Phone size={11} />
          <span>{emp.telephone}</span>
        </div>
        <Badge className={cn("shrink-0", statutColors[emp.statut])}>
          {statutLabels[emp.statut]}
        </Badge>
        <ChevronRight size={15} className="text-[color:var(--color-muted)] shrink-0" />
      </div>
    </Link>
  );
}

export default function EmployesPage() {
  const [search, setSearch] = useState("");
  const [filiale, setFiliale] = useState("");
  const [statut, setStatut] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = employes.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.prenom.toLowerCase().includes(q) ||
      e.nom.toLowerCase().includes(q) ||
      e.poste.toLowerCase().includes(q) ||
      e.matricule.toLowerCase().includes(q);
    const matchFiliale = !filiale || e.filiale === filiale;
    const matchStatut = !statut || e.statut === statut;
    return matchSearch && matchFiliale && matchStatut;
  });

  const stats = {
    total: employes.length,
    actifs: employes.filter((e) => e.statut === "actif").length,
    conges: employes.filter((e) => e.statut === "conge").length,
    absents: employes.filter((e) => e.statut === "absent").length,
  };

  return (
    <ERPLayout title="Ressources Humaines — Employés">
      <div className="max-w-[1600px] space-y-5">
        <PageHeader
          title="Gestion des employés"
          subtitle={`${stats.total} employés · ${stats.actifs} actifs · ${stats.conges} en congé · ${stats.absents} absents`}
          icon={Users}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={15} />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={15} />
                Nouvel employé
              </button>
            </>
          }
          tabs={[
            { label: "Liste", value: "liste" },
            { label: "Organigramme", value: "organigramme" },
          ]}
          activeTab="liste"
          onTabChange={(v) => {
            if (v === "organigramme") window.location.href = "/rh/organigramme";
          }}
        />

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Rechercher par nom, poste, matricule..."
            className="w-72"
          />
          <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
          <FilterSelect value={statut} onChange={setStatut} options={statutOptions} />
          <div className="ml-auto flex items-center gap-1 border border-[color:var(--color-border)] rounded-lg p-0.5">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === "grid"
                  ? "bg-[color:var(--color-primary)] text-white"
                  : "text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)]"
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === "list"
                  ? "bg-[color:var(--color-primary)] text-white"
                  : "text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)]"
              )}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        {/* Résultats */}
        <p className="text-sm text-[color:var(--color-muted)]">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </p>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((e) => (
              <EmployeCard key={e.id} emp={e} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            {/* Header tableau */}
            <div className="flex items-center gap-4 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="w-9 shrink-0" />
              <div className="flex-1">Employé</div>
              <div className="hidden sm:block w-32">Filiale</div>
              <div className="hidden md:block w-28">Département</div>
              <div className="hidden lg:block w-32">Site</div>
              <div className="hidden xl:block w-28">Téléphone</div>
              <div className="w-24">Statut</div>
              <div className="w-5 shrink-0" />
            </div>
            {filtered.map((e) => (
              <EmployeRow key={e.id} emp={e} />
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-[color:var(--color-muted)]">
                Aucun employé trouvé
              </div>
            )}
          </div>
        )}
      </div>
    </ERPLayout>
  );
}
