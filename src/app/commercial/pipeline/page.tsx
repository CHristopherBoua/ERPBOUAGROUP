"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { FilterSelect } from "@/components/ui/SearchBar";
import {
  opportunites, etapeColors, etapeLabels, formatMontantCom, type Opportunite, type EtapePipeline,
} from "@/lib/mock/commercial";
import {
  TrendingUp, Target, DollarSign, Clock, ChevronRight, Plus, LayoutGrid, List,
} from "lucide-react";
import { cn } from "@/lib/cn";

const ETAPES: EtapePipeline[] = ["prospection", "qualification", "proposition", "negociation", "closing"];

const commercialOptions = [
  { label: "Tous commerciaux", value: "" },
  { label: "Adjoua KOFFI", value: "Adjoua KOFFI" },
  { label: "Boubacar SIDIBÉ", value: "Boubacar SIDIBÉ" },
  { label: "Seydou TRAORÉ", value: "Seydou TRAORÉ" },
];

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "Fintech", value: "Fintech" },
  { label: "Distribution", value: "Distribution" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
  { label: "Industrie", value: "Industrie" },
];

function probColor(p: number) {
  if (p >= 80) return "text-emerald-600";
  if (p >= 50) return "text-amber-600";
  return "text-red-500";
}

function OpportuniteCard({ o }: { o: Opportunite }) {
  const jours = Math.round(
    (new Date(o.dateCloturePrevue).getTime() - new Date("2026-09-17").getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-medium text-[color:var(--color-foreground)] leading-snug">{o.titre}</p>
        <Badge className={cn("text-xs shrink-0", etapeColors[o.etape])}>
          {etapeLabels[o.etape]}
        </Badge>
      </div>
      <p className="text-xs text-[color:var(--color-muted)] mb-3">{o.client}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[color:var(--color-foreground)]">{o.valeur > 0 ? formatMontantCom(o.valeur) : "—"}</p>
          <p className={cn("text-xs font-medium", probColor(o.probabilite))}>{o.probabilite}% prob.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[color:var(--color-muted)]">{o.commercial}</p>
          <p className={cn("text-xs font-medium", jours < 0 ? "text-red-500" : jours <= 14 ? "text-amber-600" : "text-[color:var(--color-muted)]")}>
            {jours < 0 ? `${Math.abs(jours)}j dépassé` : `${jours}j`}
          </p>
        </div>
      </div>
      <div className="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-[color:var(--color-primary)]"
          style={{ width: `${o.probabilite}%` }}
        />
      </div>
    </div>
  );
}

function KanbanColumn({ etape, opps }: { etape: EtapePipeline; opps: Opportunite[] }) {
  const total = opps.reduce((s, o) => s + o.valeur, 0);
  return (
    <div className="flex-1 min-w-[200px] max-w-[260px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold", etapeColors[etape])}>
            {etapeLabels[etape]}
          </span>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{opps.length} opp. · {formatMontantCom(total)}</p>
        </div>
        <button className="w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)]">
          <Plus size={13} />
        </button>
      </div>
      <div className="space-y-2">
        {opps.map((o) => <OpportuniteCard key={o.id} o={o} />)}
        {opps.length === 0 && (
          <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
            <p className="text-xs text-gray-300">Aucune opportunité</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OpportuniteRow({ o }: { o: Opportunite }) {
  const jours = Math.round(
    (new Date(o.dateCloturePrevue).getTime() - new Date("2026-09-17").getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{o.titre}</p>
        <p className="text-xs text-[color:var(--color-muted)]">{o.client} · {o.filiale}</p>
      </div>
      <Badge className={cn("text-xs shrink-0", etapeColors[o.etape])}>{etapeLabels[o.etape]}</Badge>
      <div className="hidden md:block w-28 text-right">
        <p className="text-sm font-bold text-[color:var(--color-foreground)]">{o.valeur > 0 ? formatMontantCom(o.valeur) : "—"}</p>
      </div>
      <div className="hidden lg:block w-16 text-center">
        <span className={cn("text-sm font-semibold", probColor(o.probabilite))}>{o.probabilite}%</span>
      </div>
      <div className="hidden lg:block w-20 text-xs text-[color:var(--color-muted)] text-center">{o.commercial}</div>
      <div className="hidden xl:block w-20 text-center">
        <span className={cn("text-xs font-medium", jours < 0 ? "text-red-500" : jours <= 14 ? "text-amber-600" : "text-[color:var(--color-muted)]")}>
          {jours < 0 ? `${Math.abs(jours)}j dépassé` : `J-${jours}`}
        </span>
      </div>
      <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)]">
        <ChevronRight size={13} />
      </button>
    </div>
  );
}

export default function PipelinePage() {
  const [commercial, setCommercial] = useState("");
  const [filiale, setFiliale] = useState("");
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const filtered = opportunites.filter((o) => {
    const matchCom = !commercial || o.commercial === commercial;
    const matchFil = !filiale || o.filiale === filiale;
    return matchCom && matchFil;
  });

  const pipelineActif = filtered.filter((o) => !["gagne", "perdu"].includes(o.etape));
  const valeurTotale = pipelineActif.reduce((s, o) => s + o.valeur, 0);
  const valeurPonderee = pipelineActif.reduce((s, o) => s + (o.valeur * o.probabilite) / 100, 0);
  const enClosing = pipelineActif.filter((o) => o.etape === "closing").length;

  return (
    <ERPLayout title="Commercial — Pipeline">
      <div className="max-w-[1600px] space-y-5">
        <PageHeader
          title="Pipeline commercial"
          subtitle="Suivi des opportunités — Toutes filiales"
          icon={TrendingUp}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouvelle opportunité
            </button>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Pipeline total" value={formatMontantCom(valeurTotale)} icon={DollarSign} color="blue" />
          <KpiCard title="Valeur pondérée" value={formatMontantCom(valeurPonderee)} subtitle="par probabilité" icon={Target} color="gold" highlight />
          <KpiCard title="Opportunités actives" value={String(pipelineActif.length)} icon={TrendingUp} color="green" />
          <KpiCard title="En closing" value={String(enClosing)} subtitle="à conclure" icon={Clock} color="orange" />
        </div>

        {/* Filtres + vue */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={commercial} onChange={setCommercial} options={commercialOptions} />
          <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {pipelineActif.length} opportunité{pipelineActif.length > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1 border border-[color:var(--color-border)] rounded-lg p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors text-xs font-bold", view === "kanban" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)] hover:bg-gray-100")}
            >
              K
            </button>
            <button
              onClick={() => setView("list")}
              className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", view === "list" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)] hover:bg-gray-100")}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {view === "kanban" ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {ETAPES.map((etape) => (
              <KanbanColumn
                key={etape}
                etape={etape}
                opps={pipelineActif.filter((o) => o.etape === etape)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="flex-1">Titre / Client</div>
              <div className="w-24 text-center">Étape</div>
              <div className="hidden md:block w-28 text-right">Valeur</div>
              <div className="hidden lg:block w-16 text-center">Prob.</div>
              <div className="hidden lg:block w-20 text-center">Commercial</div>
              <div className="hidden xl:block w-20 text-center">Échéance</div>
              <div className="w-8" />
            </div>
            {pipelineActif.map((o) => <OpportuniteRow key={o.id} o={o} />)}
            {pipelineActif.length === 0 && (
              <div className="py-12 text-center text-[color:var(--color-muted)]">Aucune opportunité dans le pipeline</div>
            )}
          </div>
        )}

        {/* Résumé pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {ETAPES.map((etape) => {
            const opps = filtered.filter((o) => o.etape === etape);
            const val = opps.reduce((s, o) => s + o.valeur, 0);
            return (
              <div key={etape} className="bg-white rounded-xl border border-[color:var(--color-border)] p-3">
                <Badge className={cn("text-xs mb-2", etapeColors[etape])}>{etapeLabels[etape]}</Badge>
                <p className="text-lg font-bold text-[color:var(--color-foreground)]">{opps.length}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{val > 0 ? formatMontantCom(val) : "—"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ERPLayout>
  );
}
