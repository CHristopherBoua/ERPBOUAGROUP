"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import {
  bulletins, statutBulletinColors, statutBulletinLabels, type BulletinPaie,
} from "@/lib/mock/rh-extra";
import {
  FileText, DollarSign, Users, CheckCircle, Send, Download, Eye, Plus,
} from "lucide-react";
import { cn } from "@/lib/cn";

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

const periodeOptions = [
  { label: "Septembre 2026", value: "Septembre 2026" },
  { label: "Août 2026", value: "Août 2026" },
];

const filialeOptions = [
  { label: "Toutes filiales", value: "" },
  { label: "BOUA Group", value: "BOUA Group" },
  { label: "Distribution", value: "Distribution" },
  { label: "Stratégie & Influence", value: "Stratégie & Influence" },
  { label: "Industrie", value: "Industrie" },
  { label: "Fintech", value: "Fintech" },
  { label: "Technologies & Digital", value: "Technologies & Digital" },
];

function BulletinRow({ b }: { b: BulletinPaie }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <Avatar prenom={b.prenom} nom={b.nom} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)]">{b.prenom} {b.nom}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-mono text-[color:var(--color-muted)]">{b.matricule}</span>
          <span className="text-xs text-[color:var(--color-muted)]">{b.poste}</span>
        </div>
      </div>
      <div className="hidden lg:block text-xs text-[color:var(--color-primary)] font-medium w-32 truncate">{b.filiale}</div>
      <div className="hidden md:block text-right w-36">
        <p className="text-xs text-[color:var(--color-muted)]">Brut</p>
        <p className="text-sm font-semibold text-[color:var(--color-foreground)]">{fmt(b.salaireBrut)}</p>
      </div>
      <div className="hidden lg:block text-right w-32">
        <p className="text-xs text-[color:var(--color-muted)]">Cotisations</p>
        <p className="text-sm font-semibold text-red-500">-{fmt(b.cotisations)}</p>
      </div>
      <div className="text-right w-36">
        <p className="text-xs text-[color:var(--color-muted)]">Net à payer</p>
        <p className="text-base font-bold text-[color:var(--color-primary)]">{fmt(b.salaireNet)}</p>
      </div>
      <Badge className={cn("shrink-0 w-20 justify-center text-xs", statutBulletinColors[b.statut])}>
        {statutBulletinLabels[b.statut]}
      </Badge>
      <div className="flex items-center gap-1 shrink-0">
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Voir le bulletin">
          <Eye size={13} />
        </button>
        {b.statut === "valide" && (
          <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-[color:var(--color-muted)] hover:text-blue-600 transition-colors" title="Envoyer">
            <Send size={13} />
          </button>
        )}
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title="Télécharger PDF">
          <Download size={13} />
        </button>
      </div>
    </div>
  );
}

export default function BulletinsPaiePage() {
  const [search, setSearch] = useState("");
  const [filiale, setFiliale] = useState("");
  const [periode, setPeriode] = useState("Septembre 2026");
  const [activeTab, setActiveTab] = useState("tous");

  const totalMasseSalariale = bulletins.reduce((s, b) => s + b.salaireNet, 0);
  const totalBrut = bulletins.reduce((s, b) => s + b.salaireBrut, 0);
  const envoyes = bulletins.filter((b) => b.statut === "envoye").length;
  const brouillons = bulletins.filter((b) => b.statut === "brouillon").length;

  const filtered = bulletins.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.nom.toLowerCase().includes(q) || b.prenom.toLowerCase().includes(q) || b.matricule.toLowerCase().includes(q);
    const matchFiliale = !filiale || b.filiale === filiale;
    const matchTab =
      activeTab === "tous" ||
      (activeTab === "brouillons" && b.statut === "brouillon") ||
      (activeTab === "valides" && b.statut === "valide") ||
      (activeTab === "envoyes" && b.statut === "envoye");
    return matchSearch && matchFiliale && matchTab;
  });

  return (
    <ERPLayout title="RH — Bulletins de paie">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Bulletins de paie"
          subtitle="Édition, validation et envoi des bulletins"
          icon={FileText}
          actions={
            <>
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-lg border border-[color:var(--color-border)] text-sm bg-white outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
              >
                {periodeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Générer bulletins
              </button>
            </>
          }
          tabs={[
            { label: "Tous", value: "tous" },
            { label: "Brouillons", value: "brouillons", badge: String(brouillons) },
            { label: "Validés", value: "valides" },
            { label: "Envoyés", value: "envoyes", badge: String(envoyes) },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Masse salariale nette" value={fmt(totalMasseSalariale)} icon={DollarSign} color="green" highlight />
          <KpiCard title="Total brut" value={fmt(totalBrut)} icon={FileText} color="blue" />
          <KpiCard title="Bulletins envoyés" value={String(envoyes)} subtitle={`sur ${bulletins.length}`} icon={CheckCircle} color="green" />
          <KpiCard title="À valider" value={String(brouillons)} subtitle="brouillons en attente" icon={Users} color="orange" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Nom, matricule..." className="w-60" />
          <FilterSelect value={filiale} onChange={setFiliale} options={filialeOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} bulletin{filtered.length > 1 ? "s" : ""}
          </span>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
            <Download size={14} />
            Tout exporter
          </button>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-8 shrink-0" />
            <div className="flex-1">Employé / Matricule</div>
            <div className="hidden lg:block w-32">Filiale</div>
            <div className="hidden md:block w-36 text-right">Salaire brut</div>
            <div className="hidden lg:block w-32 text-right">Cotisations</div>
            <div className="w-36 text-right">Net à payer</div>
            <div className="w-20 text-center">Statut</div>
            <div className="w-24 shrink-0" />
          </div>
          {filtered.map((b) => <BulletinRow key={b.id} b={b} />)}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <FileText size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-[color:var(--color-muted)]">Aucun bulletin trouvé</p>
            </div>
          )}

          {/* Ligne totaux */}
          {filtered.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#E8F5E9] border-t-2 border-[color:var(--color-primary)] font-semibold text-sm">
              <div className="w-8 shrink-0" />
              <div className="flex-1 text-[color:var(--color-foreground)]">Totaux ({filtered.length} bulletins)</div>
              <div className="hidden lg:block w-32" />
              <div className="hidden md:block w-36 text-right text-[color:var(--color-foreground)]">
                {fmt(filtered.reduce((s, b) => s + b.salaireBrut, 0))}
              </div>
              <div className="hidden lg:block w-32 text-right text-red-600">
                -{fmt(filtered.reduce((s, b) => s + b.cotisations, 0))}
              </div>
              <div className="w-36 text-right text-[color:var(--color-primary)] font-bold">
                {fmt(filtered.reduce((s, b) => s + b.salaireNet, 0))}
              </div>
              <div className="w-20" />
              <div className="w-24" />
            </div>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
