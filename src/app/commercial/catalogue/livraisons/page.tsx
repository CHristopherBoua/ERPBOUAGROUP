"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Truck, Package, Clock, CheckCircle, AlertTriangle, MapPin, Plus, Eye } from "lucide-react";
import { cn } from "@/lib/cn";

type StatutLivraison = "en_cours" | "livree" | "en_attente" | "retard" | "annulee";

type Livraison = {
  id: string;
  numero: string;
  client: string;
  refCommande: string;
  dateCommande: string;
  datePrevue: string;
  dateLivraison?: string;
  articles: { designation: string; quantite: number; unite: string }[];
  destination: string;
  transporteur: string;
  statut: StatutLivraison;
  filiale: string;
};

const livraisons: Livraison[] = [
  {
    id: "L001", numero: "LIV-2026-0147", client: "SIEEP INDUSTRIE", refCommande: "CMD-2026-0892",
    dateCommande: "2026-09-10", datePrevue: "2026-09-18", destination: "Zone Industrielle de Yopougon",
    transporteur: "Translog CI", statut: "en_cours", filiale: "Distribution",
    articles: [{ designation: "Compresseur industriel 250 bar", quantite: 2, unite: "unité" }, { designation: "Tuyaux haute pression Ø50", quantite: 120, unite: "ml" }],
  },
  {
    id: "L002", numero: "LIV-2026-0146", client: "AGRO INVEST CI", refCommande: "CMD-2026-0887",
    dateCommande: "2026-09-05", datePrevue: "2026-09-12", dateLivraison: "2026-09-12",
    destination: "Entrepôt Abidjan-Port — Bloc C",
    transporteur: "BOLLORÉ LOGISTICS", statut: "livree", filiale: "Distribution",
    articles: [{ designation: "Groupe électrogène 500 kVA", quantite: 1, unite: "unité" }, { designation: "Câblage électrique sectionnel", quantite: 500, unite: "ml" }],
  },
  {
    id: "L003", numero: "LIV-2026-0148", client: "COTIVOIRE ENERGY", refCommande: "CMD-2026-0895",
    dateCommande: "2026-09-12", datePrevue: "2026-09-20", destination: "Siège social Plateau — Abidjan",
    transporteur: "En attente attribution", statut: "en_attente", filiale: "Industrie",
    articles: [{ designation: "Régulateur de pression gaz", quantite: 5, unite: "unité" }],
  },
  {
    id: "L004", numero: "LIV-2026-0145", client: "DIGICORP SA", refCommande: "CMD-2026-0879",
    dateCommande: "2026-09-01", datePrevue: "2026-09-08", destination: "Cocody — Tour CITEC",
    transporteur: "DHL Express CI", statut: "retard", filiale: "Technologies & Transformation Digitale",
    articles: [{ designation: "Serveur rack Dell PowerEdge R750", quantite: 3, unite: "unité" }, { designation: "Switch réseau 48 ports", quantite: 2, unite: "unité" }],
  },
  {
    id: "L005", numero: "LIV-2026-0144", client: "MTCI — Marchés publics", refCommande: "CMD-2026-0875",
    dateCommande: "2026-08-28", datePrevue: "2026-09-05", dateLivraison: "2026-09-04",
    destination: "Ministère des TCI — Plateau",
    transporteur: "Translog CI", statut: "livree", filiale: "Technologies & Transformation Digitale",
    articles: [{ designation: "Onduleurs APC 3000VA", quantite: 20, unite: "unité" }, { designation: "Câbles réseau Cat6A 1m", quantite: 200, unite: "unité" }],
  },
  {
    id: "L006", numero: "LIV-2026-0143", client: "PHARMACI DIST.", refCommande: "CMD-2026-0872",
    dateCommande: "2026-08-25", datePrevue: "2026-09-01", dateLivraison: "2026-09-02",
    destination: "Entrepôt Adjamé — Rue 12",
    transporteur: "SDV Panalpina", statut: "livree", filiale: "Distribution",
    articles: [{ designation: "Rayonnages métalliques 2m", quantite: 50, unite: "unité" }, { designation: "Transpalette manuel 2T", quantite: 4, unite: "unité" }],
  },
];

const statutConfig: Record<StatutLivraison, { label: string; color: string; icon: React.ElementType }> = {
  en_cours: { label: "En cours", color: "bg-blue-100 text-blue-700", icon: Truck },
  livree: { label: "Livrée", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  en_attente: { label: "En attente", color: "bg-gray-100 text-gray-500", icon: Clock },
  retard: { label: "En retard", color: "bg-red-100 text-red-500", icon: AlertTriangle },
  annulee: { label: "Annulée", color: "bg-red-50 text-red-400", icon: AlertTriangle },
};

export default function LivraisonsPage() {
  const [activeTab, setActiveTab] = useState("tous");

  const enCours = livraisons.filter(l => l.statut === "en_cours");
  const livrees = livraisons.filter(l => l.statut === "livree");
  const retard = livraisons.filter(l => l.statut === "retard");
  const enAttente = livraisons.filter(l => l.statut === "en_attente");

  const tabs = [
    { label: "Toutes", value: "tous" },
    { label: `En cours (${enCours.length})`, value: "en_cours" },
    { label: `En retard (${retard.length})`, value: "retard" },
    { label: "Livrées", value: "livree" },
    { label: "En attente", value: "en_attente" },
  ];

  const displayed = livraisons.filter(l => activeTab === "tous" || l.statut === activeTab);

  return (
    <ERPLayout title="Commercial — Livraisons">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Livraisons & Expéditions"
          subtitle="Suivi des livraisons clients — catalogue équipements"
          icon={Truck}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouvelle livraison
            </button>
          }
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="En cours" value={String(enCours.length)} subtitle="expéditions actives" icon={Truck} color="blue" />
          <KpiCard title="Livrées ce mois" value={String(livrees.length)} icon={CheckCircle} color="green" />
          <KpiCard title="En retard" value={String(retard.length)} subtitle="à traiter en urgence" icon={AlertTriangle} color={retard.length > 0 ? "red" : "green"} />
          <KpiCard title="En attente" value={String(enAttente.length)} subtitle="transporteur non assigné" icon={Clock} color="orange" />
        </div>

        {/* Alerte retards */}
        {retard.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <AlertTriangle size={16} className="shrink-0 text-red-500" />
            <p className="text-sm font-medium">
              {retard.length} livraison{retard.length > 1 ? "s" : ""} en retard — action requise immédiatement pour éviter les pénalités contractuelles.
            </p>
          </div>
        )}

        {/* Liste */}
        <div className="space-y-3">
          {displayed.map((l) => {
            const cfg = statutConfig[l.statut];
            const Icon = cfg.icon;
            const joursRetard = l.statut === "retard"
              ? Math.round((new Date("2026-09-17").getTime() - new Date(l.datePrevue).getTime()) / (1000 * 60 * 60 * 24))
              : 0;

            return (
              <div key={l.id} className={cn(
                "bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow",
                l.statut === "retard" ? "border-red-200" : "border-[color:var(--color-border)]"
              )}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      l.statut === "livree" ? "bg-emerald-100" :
                      l.statut === "retard" ? "bg-red-100" :
                      l.statut === "en_cours" ? "bg-blue-100" : "bg-gray-100"
                    )}>
                      <Icon size={18} className={cn(
                        l.statut === "livree" ? "text-emerald-600" :
                        l.statut === "retard" ? "text-red-500" :
                        l.statut === "en_cours" ? "text-blue-600" : "text-gray-400"
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="font-mono text-xs font-bold text-[color:var(--color-primary)]">{l.numero}</p>
                        <Badge className={cn("text-xs", cfg.color)}>{cfg.label}</Badge>
                        {l.statut === "retard" && (
                          <span className="text-xs font-bold text-red-500">+{joursRetard}j de retard</span>
                        )}
                      </div>
                      <p className="font-semibold text-[color:var(--color-foreground)]">{l.client}</p>
                      <p className="text-xs text-[color:var(--color-muted)] mt-0.5">Commande {l.refCommande} · {l.filiale}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[color:var(--color-muted)]">
                      {l.statut === "livree" ? "Livré le" : "Prévu le"}
                    </p>
                    <p className={cn("text-sm font-bold", l.statut === "retard" ? "text-red-500" : "text-[color:var(--color-foreground)]")}>
                      {l.dateLivraison ?? l.datePrevue}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Articles */}
                  <div className="md:col-span-1">
                    <p className="text-xs font-semibold text-[color:var(--color-muted)] uppercase mb-1.5">Articles</p>
                    <div className="space-y-1">
                      {l.articles.map((a, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Package size={11} className="shrink-0 text-[color:var(--color-muted)]" />
                          <p className="text-xs text-[color:var(--color-foreground)]">
                            <span className="font-medium">{a.quantite} {a.unite}</span> — {a.designation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <p className="text-xs font-semibold text-[color:var(--color-muted)] uppercase mb-1.5">Destination</p>
                    <div className="flex items-start gap-1.5">
                      <MapPin size={12} className="shrink-0 text-[color:var(--color-muted)] mt-0.5" />
                      <p className="text-xs text-[color:var(--color-foreground)]">{l.destination}</p>
                    </div>
                  </div>

                  {/* Transporteur + actions */}
                  <div>
                    <p className="text-xs font-semibold text-[color:var(--color-muted)] uppercase mb-1.5">Transporteur</p>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Truck size={12} className="shrink-0 text-[color:var(--color-muted)]" />
                      <p className="text-xs text-[color:var(--color-foreground)]">{l.transporteur}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[color:var(--color-border)] text-xs text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                        <Eye size={11} />
                        Détail
                      </button>
                      {l.statut === "en_cours" && (
                        <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-colors">
                          <CheckCircle size={11} />
                          Confirmer livraison
                        </button>
                      )}
                      {l.statut === "retard" && (
                        <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors">
                          <AlertTriangle size={11} />
                          Relancer
                        </button>
                      )}
                      {l.statut === "en_attente" && (
                        <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
                          <Truck size={11} />
                          Assigner
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ERPLayout>
  );
}
