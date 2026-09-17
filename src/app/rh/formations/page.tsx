"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { FilterSelect } from "@/components/ui/SearchBar";
import { StatBar } from "@/components/ui/StatBar";
import {
  formations, statutFormationColors, statutFormationLabels, type Formation,
} from "@/lib/mock/rh-extra";
import {
  GraduationCap, Users, DollarSign, Award, Calendar, MapPin,
  Building2, Plus, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";

function fmt(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} M FCFA`;
  return n.toLocaleString("fr-FR") + " FCFA";
}

const categorieOptions = [
  { label: "Toutes catégories", value: "" },
  { label: "Management", value: "Management" },
  { label: "Technique", value: "Technique" },
  { label: "Conformité", value: "Conformité" },
  { label: "Outils bureautiques", value: "Outils bureautiques" },
  { label: "Commercial", value: "Commercial" },
];

const statutOptions = [
  { label: "Tous statuts", value: "" },
  { label: "Planifiée", value: "planifiee" },
  { label: "En cours", value: "en_cours" },
  { label: "Terminée", value: "terminee" },
];

function FormationCard({ f }: { f: Formation }) {
  const taux = f.maxParticipants > 0 ? Math.round((f.nbParticipants / f.maxParticipants) * 100) : 0;
  const dateDebut = new Date(f.dateDebut).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  const dateFin = new Date(f.dateFin).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", statutFormationColors[f.statut])}>
            {statutFormationLabels[f.statut]}
          </Badge>
          {f.certifiante && (
            <span className="flex items-center gap-0.5 text-xs bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] px-2 py-0.5 rounded-full font-medium">
              <Award size={10} />
              Certifiante
            </span>
          )}
        </div>
      </div>
      <p className="font-semibold text-sm text-[color:var(--color-foreground)] leading-snug mb-1">{f.titre}</p>
      <p className="text-xs text-[color:var(--color-muted)] mb-3">{f.categorie} · {f.dureeJours}j · {f.formateur}</p>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Calendar size={11} />
          <span>{dateDebut} – {dateFin}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <MapPin size={11} />
          <span>{f.lieu}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Building2 size={11} />
          <span className="text-[color:var(--color-primary)] font-medium">{f.filiale}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[color:var(--color-muted)]">Participants</span>
          <span className="font-semibold text-[color:var(--color-foreground)]">
            {f.nbParticipants} / {f.maxParticipants}
          </span>
        </div>
        <StatBar value={f.nbParticipants} max={f.maxParticipants} color={taux >= 100 ? "#1B5E20" : taux >= 75 ? "#D4A017" : "#64B5F6"} />
      </div>

      <div className="pt-3 border-t border-[color:var(--color-border)] flex items-center justify-between">
        <span className="text-sm font-bold text-[color:var(--color-primary)]">{fmt(f.cout)}</span>
        <button className="flex items-center gap-1 text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] transition-colors">
          Détails <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

export default function FormationsPage() {
  const [categorie, setCategorie] = useState("");
  const [statut, setStatut] = useState("");
  const [activeTab, setActiveTab] = useState("toutes");

  const totalBudget = formations.reduce((s, f) => s + f.cout, 0);
  const totalParticipants = formations.reduce((s, f) => s + f.nbParticipants, 0);
  const certifiantes = formations.filter((f) => f.certifiante).length;
  const enCours = formations.filter((f) => f.statut === "en_cours").length;

  const filtered = formations.filter((f) => {
    const matchCat = !categorie || f.categorie === categorie;
    const matchStat = !statut || f.statut === statut;
    const matchTab =
      activeTab === "toutes" ||
      (activeTab === "planifiees" && f.statut === "planifiee") ||
      (activeTab === "en_cours" && f.statut === "en_cours") ||
      (activeTab === "terminees" && f.statut === "terminee");
    return matchCat && matchStat && matchTab;
  });

  return (
    <ERPLayout title="RH — Formations">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Formations"
          subtitle="Plan de développement des compétences"
          icon={GraduationCap}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Planifier une formation
            </button>
          }
          tabs={[
            { label: "Toutes", value: "toutes" },
            { label: "Planifiées", value: "planifiees" },
            { label: "En cours", value: "en_cours", badge: String(enCours) },
            { label: "Terminées", value: "terminees" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Budget formations" value={fmt(totalBudget)} icon={DollarSign} color="gold" highlight />
          <KpiCard title="Participants formés" value={String(totalParticipants)} icon={Users} color="green" />
          <KpiCard title="Certifiantes" value={String(certifiantes)} subtitle="formations qualifiantes" icon={Award} color="blue" />
          <KpiCard title="En cours" value={String(enCours)} icon={GraduationCap} color="orange" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={categorie} onChange={setCategorie} options={categorieOptions} />
          <FilterSelect value={statut} onChange={setStatut} options={statutOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} formation{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Grille formations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((f) => <FormationCard key={f.id} f={f} />)}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-[color:var(--color-muted)]">
              <GraduationCap size={32} className="mx-auto text-gray-300 mb-2" />
              <p>Aucune formation trouvée</p>
            </div>
          )}
        </div>

        {/* Stats catégories */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Répartition par catégorie</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {["Management", "Technique", "Conformité", "Outils bureautiques", "Commercial"].map((cat) => {
              const items = formations.filter((f) => f.categorie === cat);
              const budget = items.reduce((s, f) => s + f.cout, 0);
              return (
                <div key={cat} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-medium text-[color:var(--color-foreground)] mb-1">{cat}</p>
                  <p className="text-xl font-bold text-[color:var(--color-foreground)]">{items.length}</p>
                  <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{budget > 0 ? fmt(budget) : "—"}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
