"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { StatBar } from "@/components/ui/StatBar";
import {
  evaluations, statutEvalColors, statutEvalLabels, type Evaluation,
} from "@/lib/mock/rh-extra";
import {
  Star, TrendingUp, Users, Award, ChevronRight, Plus,
  CheckCircle, Target,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from "recharts";

function StarRating({ note, max = 5 }: { note: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={cn(
            i < Math.round(note)
              ? "fill-[color:var(--color-accent)] text-[color:var(--color-accent)]"
              : "text-gray-200"
          )}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-[color:var(--color-foreground)]">{note > 0 ? note.toFixed(1) : "—"}</span>
    </div>
  );
}

function EvalCard({ e }: { e: Evaluation }) {
  const done = e.statut === "valide" || e.statut === "finalise";
  const radarData = done
    ? [
        { axis: "Objectifs", value: e.noteObjectifs * 20 },
        { axis: "Compétences", value: e.noteCompetences * 20 },
        { axis: "Comportement", value: e.noteComportement * 20 },
      ]
    : [];

  return (
    <div className={cn(
      "bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow",
      e.promotion ? "border-[color:var(--color-accent)]" : "border-[color:var(--color-border)]"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar prenom={e.employe.split(" ")[0] ?? ""} nom={e.employe.split(" ").slice(1).join(" ") || e.employe} size="md" />
          <div>
            <p className="font-semibold text-sm text-[color:var(--color-foreground)]">{e.employe}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{e.poste}</p>
            <p className="text-xs text-[color:var(--color-primary)] font-medium">{e.filiale}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={cn("text-xs", statutEvalColors[e.statut])}>
            {statutEvalLabels[e.statut]}
          </Badge>
          {e.promotion && (
            <span className="flex items-center gap-0.5 text-xs text-[color:var(--color-accent)] font-semibold">
              <Award size={10} />
              Promotion
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-[color:var(--color-muted)] mb-3">{e.periode} · Éval. par {e.evaluateur}</p>

      {done ? (
        <>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[color:var(--color-muted)]">Note globale</span>
              <StarRating note={e.noteGlobale} />
            </div>
            <div className="space-y-2">
              {[
                { label: "Objectifs", note: e.noteObjectifs },
                { label: "Compétences", note: e.noteCompetences },
                { label: "Comportement", note: e.noteComportement },
              ].map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-[color:var(--color-muted)]">{c.label}</span>
                    <span className="font-medium text-[color:var(--color-foreground)]">{c.note}/5</span>
                  </div>
                  <StatBar value={c.note} max={5} color={c.note >= 4 ? "#DC5E13" : c.note >= 3 ? "#D4A017" : "#EF5350"} />
                </div>
              ))}
            </div>
          </div>
          {e.commentaire && (
            <p className="text-xs text-[color:var(--color-muted)] italic border-l-2 border-[color:var(--color-border)] pl-2 line-clamp-2">
              &ldquo;{e.commentaire}&rdquo;
            </p>
          )}
        </>
      ) : (
        <div className="py-4 text-center">
          <p className="text-xs text-[color:var(--color-muted)]">Évaluation en cours — résultats à venir</p>
        </div>
      )}
    </div>
  );
}

export default function EvaluationsPage() {
  const [activeTab, setActiveTab] = useState("fiches");

  const valides = evaluations.filter((e) => e.statut === "valide").length;
  const promotions = evaluations.filter((e) => e.promotion).length;
  const notesMoyenne = evaluations
    .filter((e) => e.noteGlobale > 0)
    .reduce((s, e, _, a) => s + e.noteGlobale / a.length, 0);

  const radarMoyen = [
    { axis: "Objectifs", value: evaluations.filter(e => e.noteObjectifs > 0).reduce((s, e, _, a) => s + (e.noteObjectifs / a.length) * 20, 0) },
    { axis: "Compétences", value: evaluations.filter(e => e.noteCompetences > 0).reduce((s, e, _, a) => s + (e.noteCompetences / a.length) * 20, 0) },
    { axis: "Comportement", value: evaluations.filter(e => e.noteComportement > 0).reduce((s, e, _, a) => s + (e.noteComportement / a.length) * 20, 0) },
  ];

  return (
    <ERPLayout title="RH — Évaluations">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Évaluations de performance"
          subtitle="Campagne semestrielle S1 2026"
          icon={Star}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouvelle campagne
            </button>
          }
          tabs={[
            { label: "Fiches", value: "fiches" },
            { label: "Synthèse", value: "synthese" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Évaluations validées" value={String(valides)} subtitle={`sur ${evaluations.length}`} icon={CheckCircle} color="green" />
          <KpiCard title="Note moyenne groupe" value={notesMoyenne.toFixed(2) + " / 5"} icon={Star} color="gold" highlight />
          <KpiCard title="Propositions promotion" value={String(promotions)} icon={Award} color="blue" />
          <KpiCard title="En cours / planifiées" value={String(evaluations.filter(e => e.statut !== "valide").length)} icon={Target} color="orange" />
        </div>

        {activeTab === "fiches" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {evaluations.map((e) => <EvalCard key={e.id} e={e} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Radar moyen */}
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-1">Profil moyen du groupe</h3>
              <p className="text-xs text-[color:var(--color-muted)] mb-4">Score sur 100 (basé sur les évaluations finalisées)</p>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarMoyen}>
                  <PolarGrid stroke="#E2E8E2" />
                  <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: "#6B7B6B" }} />
                  <Radar dataKey="value" stroke="#DC5E13" fill="#DC5E13" fillOpacity={0.25} dot={{ r: 4, fill: "#DC5E13" }} />
                  <Tooltip
                    contentStyle={{ background: "white", border: "1px solid #E2E8E2", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v) => [`${Number(v).toFixed(0)}/100`, "Score"]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Classement */}
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Classement — Note globale</h3>
              <div className="space-y-2">
                {evaluations
                  .filter((e) => e.noteGlobale > 0)
                  .sort((a, b) => b.noteGlobale - a.noteGlobale)
                  .map((e, i) => (
                    <div key={e.id} className="flex items-center gap-3 py-2 border-b border-[color:var(--color-border)] last:border-0">
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        i === 0 ? "bg-[color:var(--color-accent)] text-white" :
                        i === 1 ? "bg-gray-300 text-gray-700" :
                        i === 2 ? "bg-amber-700/20 text-amber-800" :
                        "bg-gray-100 text-gray-500"
                      )}>
                        {i + 1}
                      </span>
                      <Avatar prenom={e.employe.split(" ")[0] ?? ""} nom={e.employe.split(" ").slice(1).join(" ") || e.employe} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{e.employe}</p>
                        <p className="text-xs text-[color:var(--color-muted)]">{e.poste}</p>
                      </div>
                      <div className="text-right">
                        <StarRating note={e.noteGlobale} />
                        {e.promotion && (
                          <span className="text-xs text-[color:var(--color-accent)] font-medium">Promotion</span>
                        )}
                      </div>
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
