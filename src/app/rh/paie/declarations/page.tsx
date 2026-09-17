"use client";

import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import {
  Receipt, CheckCircle, Clock, AlertTriangle, Download, Send, Eye,
} from "lucide-react";
import { cn } from "@/lib/cn";

type TypeDeclaration = "CNPS" | "ITS" | "TS" | "FDFP";
type StatutDecl = "a_soumettre" | "soumise" | "validee" | "en_retard";

type Declaration = {
  id: string;
  type: TypeDeclaration;
  libelle: string;
  periode: string;
  echeance: string;
  montant: number;
  statut: StatutDecl;
  filiale: string;
  reference?: string;
};

const declarations: Declaration[] = [
  { id: "D001", type: "CNPS", libelle: "Cotisations sociales CNPS", periode: "Septembre 2026", echeance: "2026-10-15", montant: 87420000, statut: "a_soumettre", filiale: "BOUA Group" },
  { id: "D002", type: "ITS", libelle: "Impôt sur les Traitements et Salaires", periode: "Septembre 2026", echeance: "2026-10-10", montant: 64800000, statut: "a_soumettre", filiale: "BOUA Group" },
  { id: "D003", type: "TS", libelle: "Taxe sur les Salaires", periode: "Septembre 2026", echeance: "2026-10-10", montant: 12600000, statut: "a_soumettre", filiale: "BOUA Group" },
  { id: "D004", type: "FDFP", libelle: "Formation professionnelle (FDFP)", periode: "Septembre 2026", echeance: "2026-10-15", montant: 9350000, statut: "a_soumettre", filiale: "BOUA Group" },
  { id: "D005", type: "CNPS", libelle: "Cotisations sociales CNPS", periode: "Août 2026", echeance: "2026-09-15", montant: 85100000, statut: "validee", filiale: "BOUA Group", reference: "CNPS-2026-08-BOUA" },
  { id: "D006", type: "ITS", libelle: "Impôt sur les Traitements et Salaires", periode: "Août 2026", echeance: "2026-09-10", montant: 62400000, statut: "validee", filiale: "BOUA Group", reference: "ITS-2026-08-BOUA" },
  { id: "D007", type: "TS", libelle: "Taxe sur les Salaires", periode: "Août 2026", echeance: "2026-09-10", montant: 11200000, statut: "validee", filiale: "BOUA Group", reference: "TS-2026-08-BOUA" },
  { id: "D008", type: "FDFP", libelle: "Formation professionnelle (FDFP)", periode: "Juillet 2026", echeance: "2026-08-15", montant: 8900000, statut: "en_retard", filiale: "Technologies & Digital" },
];

const typeColors: Record<TypeDeclaration, string> = {
  CNPS: "bg-blue-100 text-blue-700",
  ITS: "bg-violet-100 text-violet-700",
  TS: "bg-amber-100 text-amber-700",
  FDFP: "bg-cyan-100 text-cyan-700",
};

const statutColors: Record<StatutDecl, string> = {
  a_soumettre: "bg-gray-100 text-gray-600",
  soumise: "bg-blue-100 text-blue-700",
  validee: "bg-emerald-100 text-emerald-700",
  en_retard: "bg-red-100 text-red-600",
};
const statutLabels: Record<StatutDecl, string> = {
  a_soumettre: "À soumettre",
  soumise: "Soumise",
  validee: "Validée",
  en_retard: "En retard",
};

function fmt(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} M FCFA`;
  return n.toLocaleString("fr-FR") + " FCFA";
}

function joursEcheance(date: string) {
  const today = new Date("2026-09-17");
  return Math.round((new Date(date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DeclarationsPage() {
  const aSoumettre = declarations.filter((d) => d.statut === "a_soumettre");
  const enRetard = declarations.filter((d) => d.statut === "en_retard");
  const totalADeclarerMois = aSoumettre.reduce((s, d) => s + d.montant, 0);
  const totalValidees = declarations.filter((d) => d.statut === "validee").reduce((s, d) => s + d.montant, 0);

  return (
    <ERPLayout title="RH — Déclarations sociales & fiscales">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Déclarations sociales & fiscales"
          subtitle="CNPS · ITS · TS · FDFP — Côte d'Ivoire"
          icon={Receipt}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
              <Download size={14} />
              Exporter état
            </button>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="À soumettre ce mois" value={String(aSoumettre.length)} subtitle={fmt(totalADeclarerMois)} icon={Clock} color="orange" />
          <KpiCard title="En retard" value={String(enRetard.length)} icon={AlertTriangle} color={enRetard.length > 0 ? "red" : "green"} />
          <KpiCard title="Déclarées & validées" value={fmt(totalValidees)} icon={CheckCircle} color="green" />
          <KpiCard title="Total obligations" value={String(declarations.length)} subtitle="toutes périodes" icon={Receipt} color="blue" />
        </div>

        {/* Alertes retard */}
        {enRetard.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={15} className="text-red-500" />
              <p className="font-semibold text-sm text-red-700">{enRetard.length} déclaration{enRetard.length > 1 ? "s" : ""} en retard — action immédiate requise</p>
            </div>
            {enRetard.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-red-200 last:border-0">
                <div>
                  <span className="text-sm font-medium text-red-700">{d.libelle}</span>
                  <span className="text-xs text-red-500 ml-2">{d.periode} · {d.filiale}</span>
                </div>
                <span className="text-sm font-bold text-red-700">{fmt(d.montant)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Déclarations octobre */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-[color:var(--color-border)]">
            <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">Obligations — Toutes périodes</h3>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-0 px-4 py-2 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-16">Type</div>
            <div>Déclaration</div>
            <div className="hidden sm:block w-28 text-center">Période</div>
            <div className="hidden md:block w-28 text-center">Échéance</div>
            <div className="hidden lg:block w-28 text-right">Montant</div>
            <div className="w-24 text-center">Statut</div>
            <div className="w-20 shrink-0" />
          </div>

          {declarations.map((d) => {
            const jours = joursEcheance(d.echeance);
            return (
              <div
                key={d.id}
                className={cn(
                  "grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-0 items-center px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors",
                  d.statut === "en_retard" && "bg-red-50/40"
                )}
              >
                <div className="w-16">
                  <Badge className={cn("text-xs font-bold", typeColors[d.type])}>{d.type}</Badge>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{d.libelle}</p>
                  {d.reference && (
                    <p className="text-xs font-mono text-[color:var(--color-muted)]">{d.reference}</p>
                  )}
                  <p className="text-xs text-[color:var(--color-primary)]">{d.filiale}</p>
                </div>
                <div className="hidden sm:block w-28 text-center text-xs text-[color:var(--color-muted)]">{d.periode}</div>
                <div className="hidden md:block w-28 text-center">
                  <p className="text-xs text-[color:var(--color-muted)]">
                    {new Date(d.echeance).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </p>
                  {d.statut === "a_soumettre" && (
                    <p className={cn("text-xs font-medium", jours <= 7 ? "text-amber-600" : jours <= 0 ? "text-red-500" : "text-[color:var(--color-muted)]")}>
                      {jours > 0 ? `J-${jours}` : `${Math.abs(jours)}j dépassé`}
                    </p>
                  )}
                </div>
                <div className="hidden lg:block w-28 text-right">
                  <span className="text-sm font-bold text-[color:var(--color-foreground)]">{fmt(d.montant)}</span>
                </div>
                <div className="w-24 text-center">
                  <Badge className={cn("text-xs", statutColors[d.statut])}>
                    {statutLabels[d.statut]}
                  </Badge>
                </div>
                <div className="w-20 flex items-center justify-end gap-1">
                  <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Voir">
                    <Eye size={13} />
                  </button>
                  {(d.statut === "a_soumettre") && (
                    <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-[color:var(--color-muted)] hover:text-blue-600 transition-colors" title="Soumettre">
                      <Send size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Récapitulatif annuel */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Récapitulatif par type — 2026</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["CNPS", "ITS", "TS", "FDFP"] as TypeDeclaration[]).map((type) => {
              const lignes = declarations.filter((d) => d.type === type);
              const total = lignes.reduce((s, d) => s + d.montant, 0);
              return (
                <div key={type} className={cn("rounded-xl p-3", typeColors[type])}>
                  <p className="text-lg font-bold">{type}</p>
                  <p className="text-xs mt-0.5 font-medium">{fmt(total)}</p>
                  <p className="text-xs mt-0.5 opacity-75">{lignes.length} déclaration{lignes.length > 1 ? "s" : ""}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
