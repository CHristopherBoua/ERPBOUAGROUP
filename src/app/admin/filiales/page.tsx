"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { StatBar } from "@/components/ui/StatBar";
import {
  Building2, Users, TrendingUp, DollarSign, MapPin, Globe,
  ChevronRight, Plus, Edit, Settings,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Filiale = {
  id: string;
  nom: string;
  sigle: string;
  secteur: string;
  pays: string;
  ville: string;
  directeur: string;
  effectif: number;
  caAnnuel: number;
  caObjectif: number;
  dateCreation: string;
  statut: "active" | "en_creation" | "suspendue";
  color: string;
};

const filiales: Filiale[] = [
  { id: "F1", nom: "Stratégie & Influence", sigle: "S&I", secteur: "Conseil & Communication", pays: "Côte d'Ivoire", ville: "Abidjan", directeur: "DG Stratégie", effectif: 48, caAnnuel: 420000000, caObjectif: 400000000, dateCreation: "2019-03-15", statut: "active", color: "bg-blue-500" },
  { id: "F2", nom: "Technologies & Transformation Digitale", sigle: "T&D", secteur: "Tech & Digital", pays: "Côte d'Ivoire", ville: "Abidjan", directeur: "DG Technologies", effectif: 134, caAnnuel: 680000000, caObjectif: 700000000, dateCreation: "2018-06-01", statut: "active", color: "bg-violet-500" },
  { id: "F3", nom: "Fintech", sigle: "FIN", secteur: "Services financiers mobiles", pays: "Côte d'Ivoire", ville: "Abidjan", directeur: "DG Fintech", effectif: 89, caAnnuel: 510000000, caObjectif: 550000000, dateCreation: "2020-01-10", statut: "active", color: "bg-emerald-500" },
  { id: "F4", nom: "Industrie", sigle: "IND", secteur: "Maintenance & Production industrielle", pays: "Côte d'Ivoire", ville: "Abidjan-Nord", directeur: "DG Industrie", effectif: 312, caAnnuel: 890000000, caObjectif: 850000000, dateCreation: "2017-09-20", statut: "active", color: "bg-amber-500" },
  { id: "F5", nom: "Distribution d'équipements industriels", sigle: "DIST", secteur: "Commerce & Logistique", pays: "Côte d'Ivoire", ville: "Abidjan-Port", directeur: "DG Distribution", effectif: 387, caAnnuel: 1250000000, caObjectif: 1200000000, dateCreation: "2016-04-05", statut: "active", color: "bg-orange-500" },
];

const holding = {
  nom: "BOUA Group — Holding",
  sigle: "BOUA",
  directeur: "Directeur Général",
  effectif: 28,
  caConsolide: filiales.reduce((s, f) => s + f.caAnnuel, 0),
  dateCreation: "2015-01-01",
  pays: "Côte d'Ivoire",
  ville: "Abidjan — Plateau",
};

function fmt(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} Mrd FCFA`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)} M FCFA`;
  return `${n.toLocaleString("fr-FR")} FCFA`;
}

const statutColors = {
  active: "bg-emerald-100 text-emerald-700",
  en_creation: "bg-blue-100 text-blue-700",
  suspendue: "bg-red-100 text-red-500",
};
const statutLabels = {
  active: "Active",
  en_creation: "En création",
  suspendue: "Suspendue",
};

export default function FilialesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const totalEffectif = filiales.reduce((s, f) => s + f.effectif, 0) + holding.effectif;

  return (
    <ERPLayout title="Admin — Filiales & Structure">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Filiales & Structure du Groupe"
          subtitle="Organisation et gouvernance — BOUA Group"
          icon={Building2}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouvelle filiale
            </button>
          }
        />

        {/* KPIs groupe */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Filiales actives" value={String(filiales.filter(f => f.statut === "active").length)} icon={Building2} color="green" />
          <KpiCard title="Effectif total groupe" value={String(totalEffectif)} subtitle="collaborateurs" icon={Users} color="blue" />
          <KpiCard title="CA consolidé" value={fmt(holding.caConsolide)} icon={TrendingUp} color="gold" highlight />
          <KpiCard title="Pays de présence" value="1" subtitle="Côte d'Ivoire — extension prévue" icon={Globe} color="green" />
        </div>

        {/* Holding card */}
        <div className="bg-[color:var(--color-sidebar-bg)] rounded-xl p-5 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--color-accent)] flex items-center justify-center text-white font-bold text-lg">
                {holding.sigle}
              </div>
              <div>
                <p className="font-bold text-base">{holding.nom}</p>
                <p className="text-sm opacity-70 mt-0.5">Créée en {new Date(holding.dateCreation).getFullYear()} · {holding.ville}</p>
              </div>
            </div>
            <Badge className="bg-[color:var(--color-accent)]/20 text-[color:var(--color-accent)]">Holding</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-xs opacity-50">CA Consolidé</p>
              <p className="text-lg font-bold text-[color:var(--color-accent)]">{fmt(holding.caConsolide)}</p>
            </div>
            <div>
              <p className="text-xs opacity-50">Effectif total</p>
              <p className="text-lg font-bold">{totalEffectif} collaborateurs</p>
            </div>
            <div>
              <p className="text-xs opacity-50">Siège social</p>
              <p className="text-base font-semibold">{holding.ville}</p>
            </div>
          </div>
        </div>

        {/* Filiales grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filiales.map((f) => {
            const taux = Math.round((f.caAnnuel / f.caObjectif) * 100);
            const isSelected = selected === f.id;
            return (
              <div
                key={f.id}
                onClick={() => setSelected(isSelected ? null : f.id)}
                className={cn(
                  "bg-white rounded-xl border cursor-pointer transition-all hover:shadow-md",
                  isSelected ? "border-[color:var(--color-primary)] ring-1 ring-[color:var(--color-primary)]" : "border-[color:var(--color-border)]"
                )}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0", f.color)}>
                        {f.sigle}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[color:var(--color-foreground)] leading-snug">{f.nom}</p>
                        <p className="text-xs text-[color:var(--color-muted)]">{f.secteur}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-xs", statutColors[f.statut])}>{statutLabels[f.statut]}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-[color:var(--color-muted)]">Effectif</p>
                      <p className="text-sm font-bold text-[color:var(--color-foreground)]">{f.effectif}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[color:var(--color-muted)]">CA annuel</p>
                      <p className="text-sm font-bold text-[color:var(--color-primary)]">{fmt(f.caAnnuel)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[color:var(--color-muted)]">Vs objectif</p>
                      <p className={cn("text-sm font-bold", taux >= 100 ? "text-emerald-600" : "text-amber-600")}>{taux}%</p>
                    </div>
                  </div>

                  <StatBar value={f.caAnnuel} max={f.caObjectif} color={taux >= 100 ? "#1B5E20" : "#D4A017"} />

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[color:var(--color-border)]">
                    <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
                      <MapPin size={11} />
                      <span>{f.ville}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
                      <span>Depuis {new Date(f.dateCreation).getFullYear()}</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="px-4 pb-4 pt-1 bg-gray-50 rounded-b-xl border-t border-[color:var(--color-border)]">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-[color:var(--color-muted)] space-y-1">
                        <p><span className="font-medium">Directeur :</span> {f.directeur}</p>
                        <p><span className="font-medium">Objectif CA :</span> {fmt(f.caObjectif)}</p>
                        <p><span className="font-medium">Écart :</span> <span className={f.caAnnuel >= f.caObjectif ? "text-emerald-600" : "text-amber-600"}>{fmt(Math.abs(f.caAnnuel - f.caObjectif))} {f.caAnnuel >= f.caObjectif ? "au-dessus" : "en dessous"}</span></p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[color:var(--color-border)] text-xs text-[color:var(--color-muted)] hover:bg-white transition-colors">
                          <Edit size={12} /> Modifier
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[color:var(--color-primary)] text-white text-xs hover:bg-[color:var(--color-primary-light)] transition-colors">
                          <ChevronRight size={12} /> Voir détail
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Répartition CA */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Répartition du CA par filiale</h3>
          <div className="space-y-3">
            {filiales.sort((a, b) => b.caAnnuel - a.caAnnuel).map((f) => {
              const pct = Math.round((f.caAnnuel / holding.caConsolide) * 100);
              return (
                <div key={f.id} className="flex items-center gap-3">
                  <div className={cn("w-3 h-3 rounded-full shrink-0", f.color)} />
                  <span className="text-sm text-[color:var(--color-foreground)] w-64 truncate">{f.nom}</span>
                  <div className="flex-1">
                    <StatBar value={f.caAnnuel} max={holding.caConsolide} color={f.color.replace("bg-", "#").replace("-500", "")} />
                  </div>
                  <span className="text-sm font-semibold text-[color:var(--color-foreground)] w-10 text-right">{pct}%</span>
                  <span className="text-xs text-[color:var(--color-muted)] w-28 text-right">{fmt(f.caAnnuel)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
