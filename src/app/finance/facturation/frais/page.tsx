"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Receipt, Clock, CheckCircle, XCircle, Plus, Download, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";

type Frais = {
  id: string;
  employe: { prenom: string; nom: string; poste: string };
  date: string;
  categorie: "transport" | "repas" | "hebergement" | "fournitures" | "formation" | "autre";
  description: string;
  montant: number;
  justificatif: boolean;
  statut: "en_attente" | "approuve" | "rejete" | "rembourse";
  filiale: string;
};

const frais: Frais[] = [
  { id: "NF001", employe: { prenom: "Adjoua", nom: "KOFFI", poste: "Commercial Senior" }, date: "2026-09-15", categorie: "transport", description: "Déplacement client Yamoussoukro — aller-retour taxi", montant: 45_000, justificatif: true, statut: "en_attente", filiale: "Distribution" },
  { id: "NF002", employe: { prenom: "Boubacar", nom: "SIDIBÉ", poste: "Consultant Stratégie" }, date: "2026-09-14", categorie: "hebergement", description: "Hôtel Sofitel Abidjan — mission client 2 nuits", montant: 380_000, justificatif: true, statut: "approuve", filiale: "Stratégie & Influence" },
  { id: "NF003", employe: { prenom: "Khadija", nom: "OUATTARA", poste: "Développeuse Full-Stack" }, date: "2026-09-13", categorie: "formation", description: "Conférence Cloud Africa 2026 — inscription + transport", montant: 245_000, justificatif: true, statut: "approuve", filiale: "Technologies & Transformation Digitale" },
  { id: "NF004", employe: { prenom: "Mamadou", nom: "COULIBALY", poste: "Directeur Industrie" }, date: "2026-09-12", categorie: "repas", description: "Déjeuner de travail avec délégation partenaire (8 personnes)", montant: 185_000, justificatif: false, statut: "rejete", filiale: "Industrie" },
  { id: "NF005", employe: { prenom: "Aïssatou", nom: "DIALLO", poste: "Responsable Finances", }, date: "2026-09-10", categorie: "fournitures", description: "Fournitures de bureau — cartouches imprimantes + ramettes", montant: 32_500, justificatif: true, statut: "rembourse", filiale: "BOUA Group" },
  { id: "NF006", employe: { prenom: "Yao", nom: "ASSI", poste: "Ingénieur Maintenance" }, date: "2026-09-09", categorie: "transport", description: "Carburant déplacements chantier industriel Abidjan-Nord", montant: 78_000, justificatif: true, statut: "approuve", filiale: "Industrie" },
  { id: "NF007", employe: { prenom: "Adjoua", nom: "KOFFI", poste: "Commercial Senior" }, date: "2026-09-08", categorie: "repas", description: "Déjeuner client SIEEP Industrie (2 couverts)", montant: 42_000, justificatif: true, statut: "rembourse", filiale: "Distribution" },
  { id: "NF008", employe: { prenom: "Sékou", nom: "TRAORÉ", poste: "Chef de Projet Digital" }, date: "2026-09-07", categorie: "autre", description: "Licence logiciel Figma annuelle — renouvellement", montant: 156_000, justificatif: true, statut: "en_attente", filiale: "Technologies & Transformation Digitale" },
];

const categorieIcons: Record<Frais["categorie"], string> = {
  transport: "🚗",
  repas: "🍽️",
  hebergement: "🏨",
  fournitures: "📦",
  formation: "🎓",
  autre: "📌",
};

const statutConfig = {
  en_attente: { label: "En attente", color: "bg-amber-100 text-amber-700", icon: Clock },
  approuve: { label: "Approuvé", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  rejete: { label: "Rejeté", color: "bg-red-100 text-red-500", icon: XCircle },
  rembourse: { label: "Remboursé", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
};

export default function FraisPage() {
  const [activeTab, setActiveTab] = useState("tous");
  const [selected, setSelected] = useState<string | null>(null);

  const enAttente = frais.filter(f => f.statut === "en_attente");
  const approuves = frais.filter(f => f.statut === "approuve");
  const rembourses = frais.filter(f => f.statut === "rembourse");
  const rejetes = frais.filter(f => f.statut === "rejete");

  const totalMontant = frais.reduce((s, f) => s + f.montant, 0);
  const totalEnAttente = enAttente.reduce((s, f) => s + f.montant, 0);
  const totalRembourse = rembourses.reduce((s, f) => s + f.montant, 0);
  const sansjustif = frais.filter(f => !f.justificatif && f.statut !== "rejete").length;

  const tabs = [
    { label: "Toutes", value: "tous", data: frais },
    { label: `En attente (${enAttente.length})`, value: "en_attente", data: enAttente },
    { label: "Approuvées", value: "approuve", data: approuves },
    { label: "Remboursées", value: "rembourse", data: rembourses },
    { label: "Rejetées", value: "rejete", data: rejetes },
  ];

  const displayed = tabs.find(t => t.value === activeTab)?.data ?? frais;

  return (
    <ERPLayout title="Finance — Notes de frais">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Notes de frais"
          subtitle="Gestion et remboursement des dépenses professionnelles"
          icon={Receipt}
          actions={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Nouvelle note
              </button>
            </div>
          }
          tabs={tabs.map(t => ({ label: t.label, value: t.value }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total soumis" value={`${(totalMontant / 1000).toFixed(0)} K FCFA`} subtitle={`${frais.length} notes`} icon={Receipt} color="blue" />
          <KpiCard title="En attente" value={`${(totalEnAttente / 1000).toFixed(0)} K FCFA`} subtitle={`${enAttente.length} notes`} icon={Clock} color="orange" />
          <KpiCard title="Remboursé" value={`${(totalRembourse / 1000).toFixed(0)} K FCFA`} subtitle="ce mois" icon={CheckCircle} color="green" />
          <KpiCard title="Sans justificatif" value={String(sansjustif)} subtitle="à régulariser" icon={AlertTriangle} color={sansjustif > 0 ? "red" : "green"} />
        </div>

        {/* Alert sans justificatifs */}
        {sansjustif > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
            <AlertTriangle size={16} className="shrink-0 text-amber-500" />
            <p className="text-sm">{sansjustif} note{sansjustif > 1 ? "s" : ""} de frais sans justificatif — des pièces supplémentaires sont requises avant validation.</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-8 shrink-0" />
            <div className="flex-1">Employé</div>
            <div className="hidden md:block w-24">Date</div>
            <div className="hidden lg:block w-24">Catégorie</div>
            <div className="flex-1 hidden xl:block">Description</div>
            <div className="w-20 text-center">Justif.</div>
            <div className="w-32 text-right">Montant</div>
            <div className="w-24 text-center">Statut</div>
            <div className="w-24 shrink-0" />
          </div>
          {displayed.map((f) => {
            const cfg = statutConfig[f.statut];
            const Icon = cfg.icon;
            return (
              <div
                key={f.id}
                onClick={() => setSelected(selected === f.id ? null : f.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 cursor-pointer hover:bg-gray-50 transition-colors",
                  selected === f.id && "bg-[color:var(--color-primary)]/5"
                )}
              >
                <Avatar prenom={f.employe.prenom} nom={f.employe.nom} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[color:var(--color-foreground)]">{f.employe.prenom} {f.employe.nom}</p>
                  <p className="text-xs text-[color:var(--color-muted)]">{f.employe.poste} · {f.filiale}</p>
                </div>
                <div className="hidden md:block w-24 text-xs text-[color:var(--color-muted)]">{f.date}</div>
                <div className="hidden lg:block w-24">
                  <span className="text-sm" title={f.categorie}>{categorieIcons[f.categorie]}</span>
                  <span className="text-xs text-[color:var(--color-muted)] ml-1 capitalize">{f.categorie}</span>
                </div>
                <div className="flex-1 hidden xl:block text-sm text-[color:var(--color-foreground)] truncate">{f.description}</div>
                <div className="w-20 text-center">
                  {f.justificatif ? (
                    <CheckCircle size={14} className="mx-auto text-emerald-500" />
                  ) : (
                    <AlertTriangle size={14} className="mx-auto text-amber-500" />
                  )}
                </div>
                <div className="w-32 text-right">
                  <p className="text-sm font-bold text-[color:var(--color-foreground)]">{f.montant.toLocaleString("fr-FR")}</p>
                  <p className="text-xs text-[color:var(--color-muted)]">FCFA</p>
                </div>
                <div className="w-24 text-center">
                  <Badge className={cn("text-xs", cfg.color)}>{cfg.label}</Badge>
                </div>
                <div className="flex items-center gap-1 w-24 justify-end shrink-0">
                  {f.statut === "en_attente" && (
                    <>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors"
                      >
                        <CheckCircle size={11} />
                        OK
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 transition-colors"
                      >
                        <XCircle size={11} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {displayed.length === 0 && (
            <div className="py-12 text-center text-sm text-[color:var(--color-muted)]">Aucune note de frais dans cette catégorie</div>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
