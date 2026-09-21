"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { StatBar } from "@/components/ui/StatBar";
import { produits, formatMontantCom } from "@/lib/mock/commercial";
import {
  Tag, Package, TrendingUp, AlertTriangle,
  Plus, ChevronRight, Edit, Boxes,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Categorie = {
  nom: string;
  description: string;
  emoji: string;
  type: "produit" | "service";
  filiale: string;
  couleur: string;
};

const categoriesConfig: Categorie[] = [
  {
    nom: "Équipements industriels",
    description: "Pompes, groupes électrogènes, compresseurs et matériels de production",
    emoji: "⚙️",
    type: "produit",
    filiale: "Distribution",
    couleur: "bg-orange-500",
  },
  {
    nom: "Maintenance industrielle",
    description: "Contrats de maintenance, pièces de rechange et interventions techniques",
    emoji: "🔧",
    type: "produit",
    filiale: "Industrie",
    couleur: "bg-amber-500",
  },
  {
    nom: "Formation & Conseil",
    description: "Sessions de formation certifiantes, audits et accompagnements",
    emoji: "🎓",
    type: "service",
    filiale: "Technologies & Digital",
    couleur: "bg-violet-500",
  },
  {
    nom: "Développement logiciel",
    description: "Applications mobiles, plateformes web et solutions sur mesure",
    emoji: "💻",
    type: "service",
    filiale: "Technologies & Digital",
    couleur: "bg-blue-500",
  },
  {
    nom: "Fintech Solutions",
    description: "API bancaires, solutions KYC, paiements mobiles et conformité UEMOA",
    emoji: "📱",
    type: "service",
    filiale: "Fintech",
    couleur: "bg-emerald-500",
  },
  {
    nom: "Conseil & Stratégie",
    description: "Accompagnement stratégique, veille sectorielle et rapports marché",
    emoji: "📊",
    type: "service",
    filiale: "Stratégie & Influence",
    couleur: "bg-indigo-500",
  },
];

const SERVICE_CATS = ["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"];

function buildStats(nom: string) {
  const items = produits.filter((p) => p.categorie === nom);
  const actifs = items.filter((p) => p.actif);
  const caTotal = actifs.reduce((s, p) => s + p.prixUnitaire, 0);
  const prixMoyen = actifs.length ? Math.round(caTotal / actifs.length) : 0;
  const enAlerte = actifs.filter(
    (p) => !SERVICE_CATS.includes(p.categorie) && p.stock <= 3
  ).length;
  const stockTotal = SERVICE_CATS.includes(nom)
    ? null
    : actifs.reduce((s, p) => s + p.stock, 0);
  return { items, actifs, caTotal, prixMoyen, enAlerte, stockTotal };
}

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"tous" | "produit" | "service">("tous");

  const totalProduits = produits.filter((p) => p.actif).length;
  const totalCategories = categoriesConfig.length;
  const totalAlertes = produits.filter(
    (p) => p.actif && !SERVICE_CATS.includes(p.categorie) && p.stock <= 3
  ).length;
  const maxCA = Math.max(...categoriesConfig.map((c) => buildStats(c.nom).caTotal));

  const displayed = categoriesConfig.filter(
    (c) => filterType === "tous" || c.type === filterType
  );

  const selectedCat = selected ? categoriesConfig.find((c) => c.nom === selected) : null;
  const selectedStats = selectedCat ? buildStats(selectedCat.nom) : null;

  return (
    <ERPLayout title="Commercial — Catégories">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Catégories du catalogue"
          subtitle="Organisation des produits et services par famille"
          icon={Boxes}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouvelle catégorie
            </button>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Catégories actives" value={String(totalCategories)} icon={Tag} color="blue" />
          <KpiCard title="Produits & services" value={String(totalProduits)} icon={Package} color="green" />
          <KpiCard
            title="Alertes stock"
            value={String(totalAlertes)}
            subtitle="produits physiques ≤ 3"
            icon={AlertTriangle}
            color={totalAlertes > 0 ? "red" : "green"}
          />
          <KpiCard
            title="Valeur catalogue"
            value={formatMontantCom(produits.filter((p) => p.actif).reduce((s, p) => s + p.prixUnitaire, 0))}
            subtitle="cumul prix catalogue"
            icon={TrendingUp}
            color="gold"
          />
        </div>

        {/* Filtre type */}
        <div className="flex items-center gap-2">
          {(["tous", "produit", "service"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                filterType === t
                  ? "bg-[color:var(--color-primary)] text-white"
                  : "bg-white border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:bg-gray-50"
              )}
            >
              {t === "tous" ? "Toutes" : t === "produit" ? "Produits physiques" : "Services"}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Liste catégories */}
          <div className="flex-1 min-w-0 space-y-3">
            {displayed.map((cat) => {
              const stats = buildStats(cat.nom);
              const isSelected = selected === cat.nom;

              return (
                <div
                  key={cat.nom}
                  onClick={() => setSelected(isSelected ? null : cat.nom)}
                  className={cn(
                    "bg-white rounded-xl border cursor-pointer transition-all hover:shadow-sm",
                    isSelected
                      ? "border-[color:var(--color-primary)] ring-1 ring-[color:var(--color-primary)]"
                      : "border-[color:var(--color-border)]"
                  )}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0", cat.couleur + "/10")}>
                          {cat.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <p className="font-semibold text-sm text-[color:var(--color-foreground)]">{cat.nom}</p>
                            <Badge className={cn("text-xs", cat.type === "produit" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700")}>
                              {cat.type === "produit" ? "Produit physique" : "Service"}
                            </Badge>
                            {stats.enAlerte > 0 && (
                              <Badge className="text-xs bg-red-100 text-red-500">
                                <AlertTriangle size={10} className="inline mr-0.5" />
                                {stats.enAlerte} alerte{stats.enAlerte > 1 ? "s" : ""}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-[color:var(--color-muted)] leading-snug">{cat.description}</p>
                          <p className="text-xs text-[color:var(--color-primary)] font-medium mt-1">{cat.filiale}</p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-4 text-right">
                        <div>
                          <p className="text-lg font-bold text-[color:var(--color-foreground)]">{stats.actifs.length}</p>
                          <p className="text-xs text-[color:var(--color-muted)]">produit{stats.actifs.length > 1 ? "s" : ""}</p>
                        </div>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Barre CA */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[color:var(--color-muted)]">Valeur catalogue</span>
                        <span className="text-xs font-semibold text-[color:var(--color-foreground)]">{formatMontantCom(stats.caTotal)}</span>
                      </div>
                      <StatBar value={stats.caTotal} max={maxCA} color={cat.couleur.replace("bg-", "#").replace("-500", "")} />
                    </div>

                    {/* Produits inline */}
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-[color:var(--color-border)]">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-[color:var(--color-muted)] uppercase">Produits de cette catégorie</p>
                          <span className="text-xs text-[color:var(--color-muted)]">{stats.actifs.length} référence{stats.actifs.length > 1 ? "s" : ""}</span>
                        </div>
                        <div className="space-y-2">
                          {stats.actifs.map((p) => (
                            <div key={p.id} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{p.nom}</p>
                                <p className="text-xs font-mono text-[color:var(--color-muted)]">{p.reference}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm font-bold text-[color:var(--color-primary)]">{formatMontantCom(p.prixUnitaire)}</p>
                                <p className="text-xs text-[color:var(--color-muted)]">/ {p.unite}</p>
                              </div>
                              {!SERVICE_CATS.includes(p.categorie) && (
                                <div className={cn("text-right w-16 shrink-0", p.stock <= 3 ? "text-red-500" : p.stock <= 10 ? "text-amber-600" : "text-emerald-600")}>
                                  <p className="text-sm font-semibold">{p.stock}</p>
                                  <p className="text-xs text-[color:var(--color-muted)]">stock</p>
                                </div>
                              )}
                              <button className="w-7 h-7 rounded-lg hover:bg-white flex items-center justify-center text-[color:var(--color-muted)] transition-colors shrink-0">
                                <ChevronRight size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panneau synthèse */}
          <div className="hidden xl:block w-72 shrink-0 space-y-4">
            {/* Répartition */}
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Répartition par filiale</h3>
              <div className="space-y-3">
                {[...new Set(categoriesConfig.map((c) => c.filiale))].map((filiale) => {
                  const cats = categoriesConfig.filter((c) => c.filiale === filiale);
                  const nbProduits = cats.reduce((s, c) => s + buildStats(c.nom).actifs.length, 0);
                  return (
                    <div key={filiale}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[color:var(--color-foreground)] font-medium truncate flex-1">{filiale}</span>
                        <span className="text-xs text-[color:var(--color-muted)] ml-2 shrink-0">{nbProduits} réf.</span>
                      </div>
                      <StatBar value={nbProduits} max={totalProduits} color="#DC5E13" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Type produits/services */}
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Produits vs Services</h3>
              <div className="space-y-3">
                {(["produit", "service"] as const).map((type) => {
                  const cats = categoriesConfig.filter((c) => c.type === type);
                  const nb = cats.reduce((s, c) => s + buildStats(c.nom).actifs.length, 0);
                  return (
                    <div key={type} className={cn("rounded-xl p-3", type === "produit" ? "bg-orange-50" : "bg-blue-50")}>
                      <p className={cn("text-xl font-bold", type === "produit" ? "text-orange-700" : "text-blue-700")}>{nb}</p>
                      <p className={cn("text-xs font-medium", type === "produit" ? "text-orange-600" : "text-blue-600")}>
                        {type === "produit" ? "Produits physiques" : "Services & licences"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{cats.length} catégorie{cats.length > 1 ? "s" : ""}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top prix */}
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Top prix par catégorie</h3>
              <div className="space-y-2">
                {categoriesConfig.map((cat) => {
                  const stats = buildStats(cat.nom);
                  return (
                    <div key={cat.nom} className="flex items-center gap-2">
                      <span className="text-sm w-6 text-center shrink-0">{cat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[color:var(--color-foreground)] truncate">{cat.nom}</p>
                      </div>
                      <p className="text-xs font-semibold text-[color:var(--color-primary)] shrink-0">
                        {formatMontantCom(stats.prixMoyen)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
