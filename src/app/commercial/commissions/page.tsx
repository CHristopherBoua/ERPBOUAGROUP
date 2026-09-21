"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { StatBar } from "@/components/ui/StatBar";
import {
  commissions, statutCommissionColors, statutCommissionLabels, formatMontantCom, type Commission,
} from "@/lib/mock/commercial";
import {
  Award, TrendingUp, DollarSign, Target, CheckCircle, ChevronDown,
  BarChart3, Download,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

const periodeOptions = [
  { label: "Toutes périodes", value: "" },
  { label: "Septembre 2026", value: "Septembre 2026" },
  { label: "Août 2026", value: "Août 2026" },
];

const chartData = [
  { commercial: "A. KOFFI", sep_ca: 285, sep_obj: 250, aou_ca: 242, aou_obj: 250 },
  { commercial: "B. SIDIBÉ", sep_ca: 710, sep_obj: 650, aou_ca: 680, aou_obj: 650 },
  { commercial: "S. TRAORÉ", sep_ca: 195, sep_obj: 220, aou_ca: 188, aou_obj: 220 },
];

function tauxAtteinte(c: Commission): number {
  return c.caObjectif > 0 ? Math.round((c.caRealise / c.caObjectif) * 100) : 0;
}

function CommissionCard({ c }: { c: Commission }) {
  const taux = tauxAtteinte(c);
  const depassement = taux > 100;
  return (
    <div className={cn(
      "bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow",
      depassement ? "border-[color:var(--color-accent)]" : "border-[color:var(--color-border)]"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar prenom={c.commercial.split(" ")[0] ?? c.commercial} nom={c.commercial.split(" ").slice(1).join(" ") || c.commercial} size="md" />
          <div>
            <p className="font-semibold text-sm text-[color:var(--color-foreground)]">{c.commercial}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{c.filiale}</p>
          </div>
        </div>
        <Badge className={cn("text-xs", statutCommissionColors[c.statut])}>
          {statutCommissionLabels[c.statut]}
        </Badge>
      </div>

      <p className="text-xs text-[color:var(--color-muted)] mb-3">{c.periode}</p>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs">
          <span className="text-[color:var(--color-muted)]">CA réalisé</span>
          <span className={cn("font-semibold", depassement ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-foreground)]")}>
            {formatMontantCom(c.caRealise)}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[color:var(--color-muted)]">Objectif</span>
          <span className="text-[color:var(--color-muted)]">{formatMontantCom(c.caObjectif)}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[color:var(--color-muted)]">Atteinte</span>
          <span className={cn("font-bold", taux >= 100 ? "text-[color:var(--color-primary)]" : taux >= 80 ? "text-amber-600" : "text-red-500")}>
            {taux}%
          </span>
        </div>
        <StatBar
          value={c.caRealise}
          max={c.caObjectif}
          color={taux >= 100 ? "#DC5E13" : taux >= 80 ? "#D4A017" : "#EF5350"}
        />
      </div>

      <div className="pt-3 border-t border-[color:var(--color-border)] flex items-center justify-between">
        <div>
          <p className="text-xs text-[color:var(--color-muted)]">Commission ({c.taux}%)</p>
          <p className="text-base font-bold text-[color:var(--color-accent)]">{formatMontantCom(c.montant)}</p>
        </div>
        {depassement && (
          <span className="text-xs font-medium text-[color:var(--color-primary)] bg-[#E8F5E9] px-2 py-1 rounded-lg">
            Objectif dépassé !
          </span>
        )}
      </div>
    </div>
  );
}

export default function CommissionsPage() {
  const [periode, setPeriode] = useState("Septembre 2026");
  const [activeTab, setActiveTab] = useState("apercu");

  const filtered = commissions.filter((c) => !periode || c.periode === periode);
  const totalCommissions = filtered.reduce((s, c) => s + c.montant, 0);
  const totalCA = filtered.reduce((s, c) => s + c.caRealise, 0);
  const totalObjectif = filtered.reduce((s, c) => s + c.caObjectif, 0);
  const paiees = filtered.filter((c) => c.statut === "payee").length;

  return (
    <ERPLayout title="Commercial — Commissions">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Commissions commerciales"
          subtitle="Suivi des performances et rémunérations variables"
          icon={Award}
          actions={
            <>
              <div className="relative">
                <select
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-[color:var(--color-border)] text-sm bg-white outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] text-[color:var(--color-foreground)]"
                >
                  {periodeOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label || "Toutes périodes"}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] pointer-events-none" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Exporter
              </button>
            </>
          }
          tabs={[
            { label: "Aperçu", value: "apercu" },
            { label: "Détails", value: "details" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="CA total réalisé" value={formatMontantCom(totalCA)} icon={TrendingUp} color="green" trend={Math.round((totalCA / totalObjectif) * 100)} trendLabel="vs objectif" />
          <KpiCard title="Objectif total" value={formatMontantCom(totalObjectif)} icon={Target} color="blue" />
          <KpiCard title="Commissions dues" value={formatMontantCom(totalCommissions)} icon={DollarSign} color="gold" highlight />
          <KpiCard title="Payées ce mois" value={String(paiees)} subtitle={`sur ${filtered.length} lignes`} icon={CheckCircle} color="green" />
        </div>

        {activeTab === "apercu" ? (
          <>
            {/* Cartes commerciaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((c) => <CommissionCard key={c.id} c={c} />)}
            </div>

            {/* Graphique comparatif */}
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={15} className="text-[color:var(--color-primary)]" />
                <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">CA réalisé vs Objectif — Deux derniers mois</h3>
              </div>
              <p className="text-xs text-[color:var(--color-muted)] mb-4">Millions FCFA</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData} barGap={4} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                  <XAxis dataKey="commercial" tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#6B7B6B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
                  <Tooltip
                    contentStyle={{ background: "white", border: "1px solid #E2E8E2", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v, n) => [
                      `${Number(v)}M FCFA`,
                      n === "sep_ca" ? "CA Sept." : n === "sep_obj" ? "Obj. Sept." : n === "aou_ca" ? "CA Août" : "Obj. Août",
                    ]}
                  />
                  <Legend
                    iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                    formatter={(v) => v === "sep_ca" ? "CA Sept." : v === "sep_obj" ? "Obj. Sept." : v === "aou_ca" ? "CA Août" : "Obj. Août"}
                  />
                  <Bar dataKey="sep_ca" fill="#DC5E13" radius={[3, 3, 0, 0]} maxBarSize={18} />
                  <Bar dataKey="sep_obj" fill="#FFD0B0" radius={[3, 3, 0, 0]} maxBarSize={18} />
                  <Bar dataKey="aou_ca" fill="#D4A017" radius={[3, 3, 0, 0]} maxBarSize={18} />
                  <Bar dataKey="aou_obj" fill="#FFE082" radius={[3, 3, 0, 0]} maxBarSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          /* Vue détaillée tableau */
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto] gap-0 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="w-10" />
              <div>Commercial / Filiale</div>
              <div className="w-24 text-center">Période</div>
              <div className="hidden md:block w-32 text-right">CA réalisé</div>
              <div className="hidden md:block w-32 text-right">Objectif</div>
              <div className="hidden lg:block w-16 text-center">Taux</div>
              <div className="hidden lg:block w-28 text-right">Commission</div>
              <div className="w-24 text-center">Statut</div>
            </div>
            {commissions.map((c) => {
              const t = tauxAtteinte(c);
              return (
                <div key={c.id} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto] gap-0 items-center px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="w-10">
                    <Avatar prenom={c.commercial.split(" ")[0] ?? c.commercial} nom={c.commercial.split(" ").slice(1).join(" ") || c.commercial} size="sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[color:var(--color-foreground)]">{c.commercial}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{c.filiale}</p>
                  </div>
                  <div className="w-24 text-center text-xs text-[color:var(--color-muted)]">{c.periode}</div>
                  <div className="hidden md:block w-32 text-right">
                    <span className={cn("text-sm font-semibold", t >= 100 ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-foreground)]")}>
                      {formatMontantCom(c.caRealise)}
                    </span>
                  </div>
                  <div className="hidden md:block w-32 text-right text-sm text-[color:var(--color-muted)]">
                    {formatMontantCom(c.caObjectif)}
                  </div>
                  <div className="hidden lg:block w-16 text-center">
                    <span className={cn("text-sm font-bold", t >= 100 ? "text-[color:var(--color-primary)]" : t >= 80 ? "text-amber-600" : "text-red-500")}>
                      {t}%
                    </span>
                  </div>
                  <div className="hidden lg:block w-28 text-right">
                    <span className="text-sm font-bold text-[color:var(--color-accent)]">{formatMontantCom(c.montant)}</span>
                    <p className="text-xs text-[color:var(--color-muted)]">Taux : {c.taux}%</p>
                  </div>
                  <div className="w-24 text-center">
                    <Badge className={cn("text-xs", statutCommissionColors[c.statut])}>
                      {statutCommissionLabels[c.statut]}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ERPLayout>
  );
}
