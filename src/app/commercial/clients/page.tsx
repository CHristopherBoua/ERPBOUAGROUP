"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import {
  clients, statutCrmColors, statutCrmLabels, formatMontantCom, type Client,
} from "@/lib/mock/commercial";
import {
  Users, Building2, TrendingUp, Star, MapPin, Phone, Mail,
  ChevronRight, LayoutGrid, List, Plus, Download, UserPlus,
} from "lucide-react";
import { cn } from "@/lib/cn";

const secteurOptions = [
  { label: "Tous secteurs", value: "" },
  { label: "Banque & Finance", value: "Banque & Finance" },
  { label: "Énergie & Pétrole", value: "Énergie & Pétrole" },
  { label: "Télécommunications", value: "Télécommunications" },
  { label: "Agro-industrie", value: "Agro-industrie" },
  { label: "Services publics", value: "Services publics" },
  { label: "Distribution automobile", value: "Distribution automobile" },
];

const typeOptions = [
  { label: "Tous types", value: "" },
  { label: "Clients", value: "client" },
  { label: "Prospects", value: "prospect" },
];

function ClientCard({ c }: { c: Client }) {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar prenom={c.nom.split(" ")[0] ?? c.nom} nom={c.nom.split(" ").slice(1).join(" ") || c.nom} size="md" />
          <div>
            <p className="font-semibold text-sm text-[color:var(--color-foreground)]">{c.nom}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{c.secteur}</p>
          </div>
        </div>
        <Badge className={cn("text-xs shrink-0", statutCrmColors[c.statutCrm])}>
          {c.type === "prospect" ? "Prospect" : "Client"}
        </Badge>
      </div>

      {c.caAnnuel > 0 && (
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp size={12} className="text-[color:var(--color-primary)]" />
          <span className="text-xs font-semibold text-[color:var(--color-primary)]">
            CA : {formatMontantCom(c.caAnnuel)}
          </span>
        </div>
      )}

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Users size={11} />
          <span>{c.contact}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <MapPin size={11} />
          <span>{c.ville}, {c.pays}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Building2 size={11} />
          <span className="text-[color:var(--color-primary)] font-medium">{c.filiale}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[color:var(--color-border)]">
        <div className="flex items-center gap-1.5 text-xs text-[color:var(--color-muted)]">
          <Star size={11} className="text-[color:var(--color-accent)]" />
          <span>{c.nbOpportunites} opportunité{c.nbOpportunites > 1 ? "s" : ""}</span>
        </div>
        <span className="text-xs text-[color:var(--color-muted)]">{c.commercial}</span>
      </div>
    </div>
  );
}

function ClientRow({ c }: { c: Client }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <Avatar prenom={c.nom.split(" ")[0] ?? c.nom} nom={c.nom.split(" ").slice(1).join(" ") || c.nom} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)]">{c.nom}</p>
        <p className="text-xs text-[color:var(--color-muted)]">{c.secteur}</p>
      </div>
      <Badge className={cn("text-xs w-24 justify-center shrink-0", c.type === "client" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700")}>
        {c.type === "client" ? "Client" : "Prospect"}
      </Badge>
      <div className="hidden md:block w-32 text-right">
        {c.caAnnuel > 0 ? (
          <span className="text-sm font-semibold text-[color:var(--color-primary)]">{formatMontantCom(c.caAnnuel)}</span>
        ) : (
          <span className="text-xs text-[color:var(--color-muted)]">—</span>
        )}
      </div>
      <div className="hidden lg:block w-36 text-xs text-[color:var(--color-muted)]">
        <p>{c.contact}</p>
        <p>{c.ville}</p>
      </div>
      <div className="hidden xl:block w-36 text-xs text-[color:var(--color-primary)] font-medium">{c.filiale}</div>
      <Badge className={cn("shrink-0 text-xs hidden sm:flex", statutCrmColors[c.statutCrm])}>
        {statutCrmLabels[c.statutCrm]}
      </Badge>
      <div className="flex items-center gap-1 shrink-0">
        <a href={`mailto:${c.email}`} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title={c.email}>
          <Mail size={13} />
        </a>
        <a href={`tel:${c.telephone}`} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors" title={c.telephone}>
          <Phone size={13} />
        </a>
        <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors">
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [secteur, setSecteur] = useState("");
  const [type, setType] = useState("");
  const [view, setView] = useState<"grid" | "list">("list");

  const totalClients = clients.filter((c) => c.type === "client").length;
  const totalProspects = clients.filter((c) => c.type === "prospect").length;
  const caTotal = clients.reduce((s, c) => s + c.caAnnuel, 0);
  const prospects_chauds = clients.filter((c) => c.statutCrm === "chaud").length;

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.nom.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.secteur.toLowerCase().includes(q);
    const matchSecteur = !secteur || c.secteur === secteur;
    const matchType = !type || c.type === type;
    return matchSearch && matchSecteur && matchType;
  });

  return (
    <ERPLayout title="Commercial — Clients & Prospects">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Clients & Prospects"
          subtitle="CRM — Gestion des relations commerciales"
          icon={Users}
          actions={
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <UserPlus size={14} />
                Nouveau contact
              </button>
            </>
          }
          tabs={[
            { label: "Tous", value: "" },
            { label: "Clients", value: "client" },
            { label: "Prospects", value: "prospect" },
          ]}
          activeTab={type}
          onTabChange={setType}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Clients actifs" value={String(totalClients)} icon={Building2} color="green" />
          <KpiCard title="Prospects" value={String(totalProspects)} icon={UserPlus} color="blue" />
          <KpiCard title="CA annuel total" value={formatMontantCom(caTotal)} icon={TrendingUp} color="gold" highlight />
          <KpiCard title="Prospects chauds" value={String(prospects_chauds)} subtitle="à convertir" icon={Star} color="orange" />
        </div>

        {/* Filtres + vue */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Nom, contact, secteur..." className="w-72" />
          <FilterSelect value={secteur} onChange={setSecteur} options={secteurOptions} />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} contact{filtered.length > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1 border border-[color:var(--color-border)] rounded-lg p-0.5">
            <button
              onClick={() => setView("list")}
              className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", view === "list" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)] hover:bg-gray-100")}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", view === "grid" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)] hover:bg-gray-100")}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => <ClientCard key={c.id} c={c} />)}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="w-8 shrink-0" />
              <div className="flex-1">Nom / Secteur</div>
              <div className="w-24 text-center shrink-0">Type</div>
              <div className="hidden md:block w-32 text-right">CA annuel</div>
              <div className="hidden lg:block w-36">Contact</div>
              <div className="hidden xl:block w-36">Filiale</div>
              <div className="hidden sm:block w-24 text-center">Statut CRM</div>
              <div className="w-24 shrink-0" />
            </div>
            {filtered.map((c) => <ClientRow key={c.id} c={c} />)}
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <Users size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-[color:var(--color-muted)]">Aucun contact trouvé</p>
              </div>
            )}
          </div>
        )}

        {/* Répartition par secteur */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">Répartition par secteur</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {[
              { label: "Banque & Finance", count: clients.filter(c => c.secteur === "Banque & Finance").length, color: "bg-blue-50 text-blue-700" },
              { label: "Énergie & Pétrole", count: clients.filter(c => c.secteur === "Énergie & Pétrole").length, color: "bg-amber-50 text-amber-700" },
              { label: "Télécoms", count: clients.filter(c => c.secteur === "Télécommunications").length, color: "bg-violet-50 text-violet-700" },
              { label: "Agro-industrie", count: clients.filter(c => c.secteur === "Agro-industrie").length, color: "bg-emerald-50 text-emerald-700" },
              { label: "Services publics", count: clients.filter(c => c.secteur === "Services publics").length, color: "bg-cyan-50 text-cyan-700" },
              { label: "Distribution auto", count: clients.filter(c => c.secteur === "Distribution automobile").length, color: "bg-orange-50 text-orange-700" },
            ].map((s) => (
              <div key={s.label} className={cn("rounded-xl p-3 text-center", s.color)}>
                <p className="text-2xl font-bold">{s.count}</p>
                <p className="text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
