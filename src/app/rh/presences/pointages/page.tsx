"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar, FilterSelect } from "@/components/ui/SearchBar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import {
  pointages,
  statutPointageColors,
  statutPointageLabels,
  type Pointage,
} from "@/lib/mock/pointages";
import { Clock, Users, AlertTriangle, CheckCircle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

const modeIcons: Record<Pointage["mode"], string> = {
  Badgeuse: "🏢",
  "Mobile GPS": "📱",
  Web: "💻",
  Biométrie: "👆",
};

function PointageRow({ p }: { p: Pointage }) {
  const parts = p.employeNom.split(" ");
  const prenom = parts[0] ?? "";
  const nom = parts.slice(1).join(" ");

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
      <Avatar prenom={prenom} nom={nom} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)]">{p.employeNom}</p>
        <p className="text-xs text-[color:var(--color-muted)]">{p.filiale} · {p.site}</p>
      </div>
      <div className="hidden md:flex items-center gap-3 w-48">
        <div className="text-center">
          <p className="text-xs text-[color:var(--color-muted)]">Entrée</p>
          <p className={cn("text-sm font-semibold", p.entree ? "text-[color:var(--color-foreground)]" : "text-gray-300")}>
            {p.entree ?? "—"}
          </p>
          {p.retard > 0 && (
            <p className="text-xs text-red-500">+{p.retard}min</p>
          )}
        </div>
        <div className="text-[color:var(--color-border)]">→</div>
        <div className="text-center">
          <p className="text-xs text-[color:var(--color-muted)]">Sortie</p>
          <p className={cn("text-sm font-semibold", p.sortie ? "text-[color:var(--color-foreground)]" : "text-gray-300")}>
            {p.sortie ?? "—"}
          </p>
        </div>
      </div>
      <div className="hidden lg:block w-24 text-center">
        {p.heuresTravaillees > 0 ? (
          <div>
            <p className="text-sm font-bold text-[color:var(--color-foreground)]">
              {p.heuresTravaillees.toFixed(1)}h
            </p>
            {p.heuresSup > 0 && (
              <p className="text-xs text-[color:var(--color-accent)]">+{p.heuresSup.toFixed(1)}h sup</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-300">—</p>
        )}
      </div>
      <div className="hidden xl:block w-24 text-xs text-[color:var(--color-muted)]">
        <span className="mr-1">{modeIcons[p.mode]}</span>
        {p.mode}
      </div>
      <Badge className={cn("shrink-0 w-28 justify-center", statutPointageColors[p.statut])}>
        {statutPointageLabels[p.statut]}
      </Badge>
      {p.statut === "contestation" && (
        <button className="text-xs text-orange-600 hover:underline shrink-0">Traiter</button>
      )}
    </div>
  );
}

export default function PointagesPage() {
  const [search, setSearch] = useState("");
  const [filialeFilter, setFilialeFilter] = useState("");
  const [date, setDate] = useState("2026-09-17");

  const presents = pointages.filter((p) => p.statut === "valide" || p.statut === "en_cours").length;
  const absents = pointages.filter((p) => p.statut === "absent").length;
  const conges = pointages.filter((p) => p.statut === "conge").length;
  const contestations = pointages.filter((p) => p.statut === "contestation").length;
  const totalHS = pointages.reduce((s, p) => s + p.heuresSup, 0);

  const filtered = pointages.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.employeNom.toLowerCase().includes(q);
    const matchFiliale = !filialeFilter || p.filiale === filialeFilter;
    return matchSearch && matchFiliale;
  });

  return (
    <ERPLayout title="RH — Présences & Pointages">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Présences & Pointages"
          subtitle="Suivi en temps réel des entrées et sorties"
          icon={Clock}
          actions={
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm bg-white outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
              />
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Export
              </button>
              <button className="p-2 rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <RefreshCw size={15} />
              </button>
            </div>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <KpiCard title="Présents" value={String(presents)} icon={CheckCircle} color="green" />
          <KpiCard title="Absents" value={String(absents)} icon={Users} color="red" />
          <KpiCard title="En congé" value={String(conges)} icon={Clock} color="orange" />
          <KpiCard title="Contestations" value={String(contestations)} icon={AlertTriangle} color="orange" />
          <KpiCard title="Heures sup." value={`${totalHS.toFixed(1)}h`} subtitle="Total journée" icon={Clock} color="blue" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Rechercher par employé..."
            className="w-60"
          />
          <FilterSelect
            value={filialeFilter}
            onChange={setFilialeFilter}
            options={[
              { label: "Toutes filiales", value: "" },
              { label: "BOUA Group", value: "BOUA Group" },
              { label: "Fintech", value: "Fintech" },
              { label: "Industrie", value: "Industrie" },
              { label: "Technologies", value: "Technologies" },
              { label: "Distribution", value: "Distribution" },
            ]}
          />
          <span className="text-sm text-[color:var(--color-muted)] ml-auto">
            {filtered.length} enregistrement{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
            <div className="w-7 shrink-0" />
            <div className="flex-1">Employé</div>
            <div className="hidden md:block w-48">Horaires</div>
            <div className="hidden lg:block w-24 text-center">Durée</div>
            <div className="hidden xl:block w-24">Mode</div>
            <div className="w-28">Statut</div>
            <div className="w-12" />
          </div>
          {filtered.map((p) => (
            <PointageRow key={p.id} p={p} />
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[color:var(--color-muted)]">
              Aucun pointage trouvé
            </div>
          )}
        </div>

        {/* Résumé par filiale */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="font-semibold text-sm text-[color:var(--color-foreground)] mb-3">
            Synthèse par filiale
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { filiale: "BOUA Group", total: 4, presents: 3 },
              { filiale: "Fintech", total: 2, presents: 1 },
              { filiale: "Industrie", total: 2, presents: 2 },
              { filiale: "Technologies", total: 1, presents: 1 },
              { filiale: "Distribution", total: 1, presents: 0 },
            ].map((f) => (
              <div
                key={f.filiale}
                className="p-3 rounded-lg border border-[color:var(--color-border)] text-center"
              >
                <p className="text-xs font-medium text-[color:var(--color-foreground)] mb-1 truncate">{f.filiale}</p>
                <p className="text-xl font-bold text-[color:var(--color-primary)]">{f.presents}</p>
                <p className="text-xs text-[color:var(--color-muted)]">sur {f.total}</p>
                <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[color:var(--color-primary)] rounded-full"
                    style={{ width: `${(f.presents / f.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
