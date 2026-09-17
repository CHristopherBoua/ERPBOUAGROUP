"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Calendar, Users, Clock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type TypePresence = "present" | "conge" | "formation" | "mission" | "absent" | "weekend" | "ferie";

type Employe = {
  id: string;
  prenom: string;
  nom: string;
  poste: string;
  filiale: string;
  planning: Record<string, TypePresence>;
};

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const typeConfig: Record<TypePresence, { label: string; bg: string; text: string; abbr: string }> = {
  present: { label: "Présent", bg: "bg-emerald-100", text: "text-emerald-700", abbr: "P" },
  conge: { label: "Congé", bg: "bg-blue-100", text: "text-blue-700", abbr: "C" },
  formation: { label: "Formation", bg: "bg-violet-100", text: "text-violet-700", abbr: "F" },
  mission: { label: "Mission ext.", bg: "bg-amber-100", text: "text-amber-700", abbr: "M" },
  absent: { label: "Absent", bg: "bg-red-100", text: "text-red-500", abbr: "A" },
  weekend: { label: "Week-end", bg: "bg-gray-100", text: "text-gray-400", abbr: "—" },
  ferie: { label: "Férié", bg: "bg-gray-200", text: "text-gray-500", abbr: "JF" },
};

// Semaine du 15 septembre 2026 (Lun-Dim)
const DATES = ["15", "16", "17", "18", "19", "20", "21"];

const employes: Employe[] = [
  {
    id: "E1", prenom: "Adjoua", nom: "KOFFI", poste: "Commercial Senior", filiale: "Distribution",
    planning: { "15": "present", "16": "present", "17": "mission", "18": "mission", "19": "present", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E2", prenom: "Boubacar", nom: "SIDIBÉ", poste: "Consultant Stratégie", filiale: "Stratégie & Influence",
    planning: { "15": "present", "16": "present", "17": "present", "18": "conge", "19": "conge", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E3", prenom: "Khadija", nom: "OUATTARA", poste: "Développeuse Full-Stack", filiale: "Technologies",
    planning: { "15": "present", "16": "formation", "17": "formation", "18": "present", "19": "present", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E4", prenom: "Mamadou", nom: "COULIBALY", poste: "Directeur Industrie", filiale: "Industrie",
    planning: { "15": "present", "16": "present", "17": "present", "18": "present", "19": "absent", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E5", prenom: "Aïssatou", nom: "DIALLO", poste: "Responsable Finances", filiale: "BOUA Group",
    planning: { "15": "present", "16": "present", "17": "present", "18": "present", "19": "present", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E6", prenom: "Yao", nom: "ASSI", poste: "Ingénieur Maintenance", filiale: "Industrie",
    planning: { "15": "present", "16": "present", "17": "present", "18": "mission", "19": "mission", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E7", prenom: "Fatou", nom: "BAMBA", poste: "Responsable RH", filiale: "BOUA Group",
    planning: { "15": "present", "16": "present", "17": "present", "18": "conge", "19": "conge", "20": "weekend", "21": "weekend" },
  },
  {
    id: "E8", prenom: "Sékou", nom: "TRAORÉ", poste: "Chef de Projet Digital", filiale: "Technologies",
    planning: { "15": "absent", "16": "present", "17": "present", "18": "present", "19": "present", "20": "weekend", "21": "weekend" },
  },
];

function countType(type: TypePresence) {
  return employes.filter(e => Object.values(e.planning).includes(type)).length;
}

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState("planning");
  const [semaine] = useState("Semaine 38 — 15 au 21 septembre 2026");

  const presentsAujourdHui = employes.filter(e => e.planning["17"] === "present").length;
  const congesSemaine = employes.filter(e => Object.values(e.planning).includes("conge")).length;
  const missionsActives = employes.filter(e => Object.values(e.planning).includes("mission")).length;
  const absences = employes.filter(e => Object.values(e.planning).includes("absent")).length;

  return (
    <ERPLayout title="RH — Planning des présences">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Planning des présences"
          subtitle={semaine}
          icon={Calendar}
          actions={
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border border-[color:var(--color-border)] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-medium text-[color:var(--color-foreground)] px-1">Sem. 38</span>
              <button className="w-8 h-8 rounded-lg border border-[color:var(--color-border)] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          }
          tabs={[
            { label: "Grille hebdomadaire", value: "planning" },
            { label: "Récapitulatif", value: "recap" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Présents aujourd'hui" value={String(presentsAujourdHui)} subtitle={`/${employes.length} collaborateurs`} icon={Users} color="green" />
          <KpiCard title="En congé cette semaine" value={String(congesSemaine)} icon={Calendar} color="blue" />
          <KpiCard title="En mission externe" value={String(missionsActives)} icon={Clock} color="orange" />
          <KpiCard title="Absences injustifiées" value={String(absences)} icon={AlertTriangle} color={absences > 0 ? "red" : "green"} />
        </div>

        {activeTab === "planning" ? (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-[color:var(--color-border)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[color:var(--color-muted)] uppercase w-56">Collaborateur</th>
                  {JOURS.map((j, i) => (
                    <th key={j} className={cn("px-2 py-3 text-center w-24", (i === 5 || i === 6) && "opacity-40")}>
                      <p className="text-xs font-semibold text-[color:var(--color-muted)] uppercase">{j}</p>
                      <p className={cn("text-base font-bold mt-0.5", DATES[i] === "17" ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-foreground)]")}>{DATES[i]}</p>
                      {DATES[i] === "17" && <div className="w-1 h-1 rounded-full bg-[color:var(--color-primary)] mx-auto mt-0.5" />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employes.map((e) => (
                  <tr key={e.id} className="border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar prenom={e.prenom} nom={e.nom} size="sm" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{e.prenom} {e.nom}</p>
                          <p className="text-xs text-[color:var(--color-muted)] truncate">{e.poste}</p>
                        </div>
                      </div>
                    </td>
                    {DATES.map((d, i) => {
                      const type = e.planning[d] ?? (i >= 5 ? "weekend" : "present");
                      const cfg = typeConfig[type];
                      return (
                        <td key={d} className="px-2 py-3 text-center">
                          <div className={cn("inline-flex items-center justify-center w-9 h-9 rounded-xl text-xs font-bold mx-auto", cfg.bg, cfg.text)}>
                            {cfg.abbr}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Légende */}
            <div className="flex flex-wrap gap-3 px-4 py-3 border-t border-[color:var(--color-border)] bg-gray-50/50">
              {(Object.entries(typeConfig) as [TypePresence, typeof typeConfig[TypePresence]][])
                .filter(([k]) => k !== "weekend" && k !== "ferie")
                .map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className={cn("w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center", cfg.bg, cfg.text)}>{cfg.abbr}</span>
                    <span className="text-xs text-[color:var(--color-muted)]">{cfg.label}</span>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats par type */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {(["present", "conge", "formation", "mission", "absent"] as TypePresence[]).map((type) => {
                const cfg = typeConfig[type];
                const count = employes.filter(e => DATES.some(d => (e.planning[d] ?? "present") === type)).length;
                return (
                  <div key={type} className={cn("rounded-xl p-3 border", cfg.bg)}>
                    <p className={cn("text-2xl font-bold", cfg.text)}>{count}</p>
                    <p className={cn("text-xs font-medium mt-0.5", cfg.text)}>{cfg.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">collaborateurs concernés</p>
                  </div>
                );
              })}
            </div>

            {/* Absences à surveiller */}
            {absences > 0 && (
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
                <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-500" />
                  Absences injustifiées
                </h3>
                <div className="space-y-2">
                  {employes.filter(e => Object.values(e.planning).includes("absent")).map((e) => {
                    const joursAbsents = DATES.filter(d => e.planning[d] === "absent");
                    return (
                      <div key={e.id} className="flex items-center gap-3 px-3 py-2 bg-red-50 rounded-xl">
                        <Avatar prenom={e.prenom} nom={e.nom} size="sm" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[color:var(--color-foreground)]">{e.prenom} {e.nom}</p>
                          <p className="text-xs text-[color:var(--color-muted)]">{e.poste}</p>
                        </div>
                        <Badge className="bg-red-100 text-red-500 text-xs">
                          {joursAbsents.length} jour{joursAbsents.length > 1 ? "s" : ""} — {joursAbsents.map(d => `${d}/09`).join(", ")}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Missions & formations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
                <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">En mission externe</h3>
                {employes.filter(e => Object.values(e.planning).includes("mission")).map((e) => (
                  <div key={e.id} className="flex items-center gap-3 py-2 border-b border-[color:var(--color-border)] last:border-0">
                    <Avatar prenom={e.prenom} nom={e.nom} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[color:var(--color-foreground)]">{e.prenom} {e.nom}</p>
                      <p className="text-xs text-[color:var(--color-muted)]">{e.poste} · {e.filiale}</p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Mission</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
                <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">En formation</h3>
                {employes.filter(e => Object.values(e.planning).includes("formation")).map((e) => (
                  <div key={e.id} className="flex items-center gap-3 py-2 border-b border-[color:var(--color-border)] last:border-0">
                    <Avatar prenom={e.prenom} nom={e.nom} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[color:var(--color-foreground)]">{e.prenom} {e.nom}</p>
                      <p className="text-xs text-[color:var(--color-muted)]">{e.poste} · {e.filiale}</p>
                    </div>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">Formation</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ERPLayout>
  );
}
