"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import {
  postes, candidats,
  statutPosteColors, statutPosteLabels,
  statutCandidatColors, statutCandidatLabels,
  type Poste,
} from "@/lib/mock/rh-extra";
import {
  UserPlus, Briefcase, Users, Clock, CheckCircle,
  MapPin, Building2, Calendar, ChevronRight, Plus, Star,
} from "lucide-react";
import { cn } from "@/lib/cn";

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "BOUA Group", value: "BOUA Group" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Fintech", value: "Fintech" },
  { label: "Industrie", value: "Industrie" },
  { label: "Distribution", value: "Distribution" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
];

const typeOptions = [
  { label: "Tous types", value: "" },
  { label: "CDI", value: "CDI" },
  { label: "CDD", value: "CDD" },
  { label: "Stage", value: "Stage" },
];

function PosteCard({ p }: { p: Poste }) {
  const candsPoste = candidats.filter((c) => c.posteId === p.id);
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[color:var(--color-foreground)] leading-snug">{p.titre}</p>
          <p className="text-xs text-[color:var(--color-primary)] font-medium mt-0.5">{p.filiale}</p>
        </div>
        <Badge className={cn("text-xs shrink-0 ml-2", statutPosteColors[p.statut])}>
          {statutPosteLabels[p.statut]}
        </Badge>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Briefcase size={11} />
          <span>{p.departement} · <span className="font-medium text-[color:var(--color-foreground)]">{p.type}</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <MapPin size={11} />
          <span>{p.lieu}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Calendar size={11} />
          <span>Ouvert le {new Date(p.dateOuverture).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}</span>
        </div>
        {p.salaire && (
          <div className="text-xs font-medium text-[color:var(--color-accent)]">{p.salaire}</div>
        )}
      </div>

      <div className="pt-3 border-t border-[color:var(--color-border)] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Users size={11} />
          <span className="font-semibold text-[color:var(--color-foreground)]">{p.nbCandidatures}</span>
          <span>candidature{p.nbCandidatures > 1 ? "s" : ""}</span>
        </div>
        {candsPoste.length > 0 && (
          <div className="flex -space-x-1">
            {candsPoste.slice(0, 3).map((c) => (
              <Avatar key={c.id} prenom={c.prenom} nom={c.nom} size="sm" className="ring-2 ring-white" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecrutementPage() {
  const [search, setSearch] = useState("");
  const [filiale, setFiliale] = useState("");
  const [type, setType] = useState("");
  const [activeTab, setActiveTab] = useState("postes");

  const ouverts = postes.filter((p) => p.statut === "ouvert").length;
  const enCours = postes.filter((p) => p.statut === "en_cours").length;
  const totalCandidatures = postes.reduce((s, p) => s + p.nbCandidatures, 0);
  const pourvu = postes.filter((p) => p.statut === "pourvu").length;

  const filteredPostes = postes.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.titre.toLowerCase().includes(q) || p.departement.toLowerCase().includes(q);
    const matchFiliale = !filiale || p.filiale === filiale;
    const matchType = !type || p.type === type;
    return matchSearch && matchFiliale && matchType;
  });

  const filteredCandidats = candidats.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.nom.toLowerCase().includes(q) || c.prenom.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <ERPLayout title="RH — Recrutement">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Recrutement"
          subtitle="Gestion des postes ouverts et des candidatures"
          icon={UserPlus}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouveau poste
            </button>
          }
          tabs={[
            { label: "Postes", value: "postes", badge: String(ouverts + enCours) },
            { label: "Candidatures", value: "candidatures", badge: String(totalCandidatures) },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Postes ouverts" value={String(ouverts)} icon={Briefcase} color="green" />
          <KpiCard title="En cours de recrutement" value={String(enCours)} icon={Clock} color="blue" />
          <KpiCard title="Total candidatures" value={String(totalCandidatures)} icon={Users} color="gold" highlight />
          <KpiCard title="Postes pourvus" value={String(pourvu)} subtitle="ce trimestre" icon={CheckCircle} color="green" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder={activeTab === "postes" ? "Titre, département..." : "Nom, prénom, email..."} className="w-72" />
          {activeTab === "postes" && (
            <>
              <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
              <FilterSelect value={type} onChange={setType} options={typeOptions} />
            </>
          )}
        </div>

        {activeTab === "postes" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPostes.map((p) => <PosteCard key={p.id} p={p} />)}
            {filteredPostes.length === 0 && (
              <div className="col-span-full py-12 text-center text-[color:var(--color-muted)]">Aucun poste trouvé</div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="w-8 shrink-0" />
              <div className="flex-1">Candidat</div>
              <div className="hidden sm:block w-48">Poste</div>
              <div className="hidden md:block w-24 text-center">Date</div>
              <div className="hidden lg:block w-20 text-center">Note</div>
              <div className="hidden lg:block w-24 text-center">Source</div>
              <div className="w-28 text-center">Étape</div>
              <div className="w-8" />
            </div>
            {filteredCandidats.map((c) => {
              const poste = postes.find((p) => p.id === c.posteId);
              return (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
                  <Avatar prenom={c.prenom} nom={c.nom} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[color:var(--color-foreground)]">{c.prenom} {c.nom}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{c.email}</p>
                  </div>
                  <div className="hidden sm:block w-48 text-xs text-[color:var(--color-foreground)] truncate">
                    <p className="font-medium truncate">{poste?.titre ?? "—"}</p>
                    <p className="text-[color:var(--color-muted)]">{poste?.filiale}</p>
                  </div>
                  <div className="hidden md:block w-24 text-xs text-[color:var(--color-muted)] text-center">
                    {new Date(c.datePostulation).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  </div>
                  <div className="hidden lg:block w-20 text-center">
                    {c.note != null ? (
                      <div className="flex items-center justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className={i < c.note! ? "fill-[color:var(--color-accent)] text-[color:var(--color-accent)]" : "text-gray-200"} />
                        ))}
                      </div>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </div>
                  <div className="hidden lg:block w-24 text-center text-xs text-[color:var(--color-muted)]">{c.source}</div>
                  <div className="w-28 text-center">
                    <Badge className={cn("text-xs", statutCandidatColors[c.statut])}>
                      {statutCandidatLabels[c.statut]}
                    </Badge>
                  </div>
                  <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)]">
                    <ChevronRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Funnel rapide */}
        {activeTab === "postes" && (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Entonnoir de recrutement — Total portefeuille</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Candidatures reçues", count: totalCandidatures, color: "bg-blue-50 text-blue-700" },
                { label: "CV présélectionnés", count: Math.round(totalCandidatures * 0.35), color: "bg-violet-50 text-violet-700" },
                { label: "Entretiens réalisés", count: Math.round(totalCandidatures * 0.15), color: "bg-amber-50 text-amber-700" },
                { label: "Offres émises", count: Math.round(totalCandidatures * 0.04), color: "bg-emerald-50 text-emerald-700" },
              ].map((s) => (
                <div key={s.label} className={cn("rounded-xl p-3", s.color)}>
                  <p className="text-2xl font-bold">{s.count}</p>
                  <p className="text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ERPLayout>
  );
}
