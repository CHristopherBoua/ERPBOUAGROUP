"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { produits, formatMontantCom, type Produit } from "@/lib/mock/commercial";
import {
  Package, Tag, Boxes, TrendingUp, AlertTriangle,
  Plus, Download, LayoutGrid, List, Edit, Eye,
} from "lucide-react";
import { cn } from "@/lib/cn";

const categorieOptions = [
  { label: "Toutes catégories", value: "" },
  { label: "Équipements industriels", value: "Équipements industriels" },
  { label: "Maintenance industrielle", value: "Maintenance industrielle" },
  { label: "Formation & Conseil", value: "Formation & Conseil" },
  { label: "Développement logiciel", value: "Développement logiciel" },
  { label: "Fintech Solutions", value: "Fintech Solutions" },
  { label: "Conseil & Stratégie", value: "Conseil & Stratégie" },
];

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "Distribution", value: "Distribution" },
  { label: "Industrie", value: "Industrie" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
  { label: "Fintech", value: "Fintech" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
];

const categorieIcons: Record<string, string> = {
  "Équipements industriels": "⚙️",
  "Maintenance industrielle": "🔧",
  "Formation & Conseil": "🎓",
  "Développement logiciel": "💻",
  "Fintech Solutions": "📱",
  "Conseil & Stratégie": "📊",
};

function stockColor(stock: number, categorie: string): string {
  if (["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"].includes(categorie)) return "text-[color:var(--color-muted)]";
  if (stock <= 3) return "text-red-600";
  if (stock <= 10) return "text-amber-600";
  return "text-emerald-600";
}

function ProduitCard({ p }: { p: Produit }) {
  return (
    <div className={cn("bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow", !p.actif && "opacity-60", "border-[color:var(--color-border)]")}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{categorieIcons[p.categorie] ?? "📦"}</div>
        <div className="flex items-center gap-1">
          {!p.actif && (
            <Badge className="text-xs bg-gray-100 text-gray-500">Inactif</Badge>
          )}
          {p.stock <= 3 && !["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"].includes(p.categorie) && (
            <AlertTriangle size={13} className="text-amber-500" />
          )}
        </div>
      </div>
      <p className="text-xs font-mono text-[color:var(--color-muted)] mb-1">{p.reference}</p>
      <p className="font-semibold text-sm text-[color:var(--color-foreground)] mb-1 leading-snug">{p.nom}</p>
      <p className="text-xs text-[color:var(--color-muted)] mb-3 line-clamp-2">{p.description}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-lg font-bold text-[color:var(--color-primary)]">{formatMontantCom(p.prixUnitaire)}</p>
          <p className="text-xs text-[color:var(--color-muted)]">/ {p.unite}</p>
        </div>
        <div className="text-right">
          <p className={cn("text-sm font-semibold", stockColor(p.stock, p.categorie))}>
            {["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"].includes(p.categorie) ? "∞" : p.stock}
          </p>
          <p className="text-xs text-[color:var(--color-muted)]">stock</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] flex items-center justify-between">
        <Badge className="text-xs bg-gray-100 text-gray-600">{p.categorie}</Badge>
        <span className="text-xs text-[color:var(--color-primary)] font-medium">{p.filiale}</span>
      </div>
    </div>
  );
}

function ProduitRow({ p }: { p: Produit }) {
  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors", !p.actif && "opacity-60")}>
      <div className="text-xl w-8 text-center shrink-0">{categorieIcons[p.categorie] ?? "📦"}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{p.nom}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-mono text-[color:var(--color-muted)]">{p.reference}</span>
          <span className="text-xs text-[color:var(--color-muted)]">{p.categorie}</span>
        </div>
      </div>
      <div className="hidden lg:block text-right w-36">
        <p className="text-sm font-bold text-[color:var(--color-primary)]">{formatMontantCom(p.prixUnitaire)}</p>
        <p className="text-xs text-[color:var(--color-muted)]">/ {p.unite}</p>
      </div>
      <div className="hidden md:block w-20 text-center">
        <span className={cn("text-sm font-semibold", stockColor(p.stock, p.categorie))}>
          {["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"].includes(p.categorie) ? "∞" : p.stock}
        </span>
        {p.stock <= 3 && !["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"].includes(p.categorie) && (
          <p className="text-xs text-amber-600">Alerte stock</p>
        )}
      </div>
      <div className="hidden xl:block w-36 text-xs text-[color:var(--color-primary)] font-medium">{p.filiale}</div>
      <Badge className={cn("text-xs w-16 justify-center shrink-0", p.actif ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500")}>
        {p.actif ? "Actif" : "Inactif"}
      </Badge>
      <div className="flex items-center gap-1 shrink-0">
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Voir">
          <Eye size={13} />
        </button>
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Modifier">
          <Edit size={13} />
        </button>
      </div>
    </div>
  );
}

export default function ProduitsPage() {
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [filiale, setFiliale] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const totalProduits = produits.filter((p) => p.actif).length;
  const enAlerte = produits.filter((p) => p.actif && p.stock <= 3 && !["Formation & Conseil", "Développement logiciel", "Fintech Solutions", "Conseil & Stratégie"].includes(p.categorie)).length;
  const categories = [...new Set(produits.map((p) => p.categorie))].length;
  const prixMoyen = Math.round(produits.filter((p) => p.actif).reduce((s, p) => s + p.prixUnitaire, 0) / totalProduits);

  const filtered = produits.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.nom.toLowerCase().includes(q) || p.reference.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCat = !categorie || p.categorie === categorie;
    const matchFil = !filiale || p.filiale === filiale;
    return matchSearch && matchCat && matchFil;
  });

  const grouped = filtered.reduce<Record<string, Produit[]>>((acc, p) => {
    if (!acc[p.categorie]) acc[p.categorie] = [];
    acc[p.categorie].push(p);
    return acc;
  }, {});

  return (
    <ERPLayout title="Commercial — Catalogue produits">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Catalogue produits & services"
          subtitle="Référentiel commercial — Toutes filiales"
          icon={Package}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Nouveau produit
              </button>
            </>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Produits actifs" value={String(totalProduits)} icon={Package} color="green" />
          <KpiCard title="Catégories" value={String(categories)} icon={Tag} color="blue" />
          <KpiCard title="Alertes stock" value={String(enAlerte)} subtitle="stock ≤ 3 unités" icon={AlertTriangle} color={enAlerte > 0 ? "red" : "green"} />
          <KpiCard title="Prix moyen" value={formatMontantCom(prixMoyen)} subtitle="catalogue" icon={TrendingUp} color="gold" />
        </div>

        {/* Filtres + vue */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Produit, référence..." className="w-72" />
          <FilterSelect value={categorie} onChange={setCategorie} options={categorieOptions} />
          <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1 border border-[color:var(--color-border)] rounded-lg p-0.5">
            <button onClick={() => setView("grid")} className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", view === "grid" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)] hover:bg-gray-100")}>
              <LayoutGrid size={14} />
            </button>
            <button onClick={() => setView("list")} className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", view === "list" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)] hover:bg-gray-100")}>
              <List size={14} />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="space-y-6">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">{categorieIcons[cat] ?? "📦"}</span>
                  <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">{cat}</h3>
                  <span className="text-xs text-[color:var(--color-muted)] bg-gray-100 px-2 py-0.5 rounded-full">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {items.map((p) => <ProduitCard key={p.id} p={p} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="w-8 shrink-0" />
              <div className="flex-1">Produit / Référence</div>
              <div className="hidden lg:block w-36 text-right">Prix unitaire</div>
              <div className="hidden md:block w-20 text-center">Stock</div>
              <div className="hidden xl:block w-36 text-center">Filiale</div>
              <div className="w-16 text-center">Statut</div>
              <div className="w-16 shrink-0" />
            </div>
            {filtered.map((p) => <ProduitRow key={p.id} p={p} />)}
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <Package size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-[color:var(--color-muted)]">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ERPLayout>
  );
}
