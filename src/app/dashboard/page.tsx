"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { KpiCard } from "@/components/ui/KpiCard";
import { AlertList, type Alert } from "@/components/ui/AlertBanner";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TresorerieChart } from "@/components/dashboard/TresorerieChart";
import { RHStats } from "@/components/dashboard/RHStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { FilialeSummary } from "@/components/dashboard/FilialeSummary";
import {
  DollarSign,
  Wallet,
  Users,
  Package,
  AlertTriangle,
  Ticket,
  TrendingUp,
} from "lucide-react";

const initialAlerts: Alert[] = [
  {
    id: "1",
    level: "danger",
    title: "Stock critique : Pompes centrifuges (Industrie)",
    description: "Quantité disponible : 3 unités — seuil minimum : 10",
    time: "Il y a 1h",
  },
  {
    id: "2",
    level: "warning",
    title: "Dépassement budgétaire — Département Marketing",
    description: "Budget engagé à 112% pour Septembre 2026",
    time: "Il y a 2h",
  },
  {
    id: "3",
    level: "warning",
    title: "14 demandes de congés en attente de validation",
    description: "Délai maximum 48h dépassé pour 6 demandes",
    time: "Il y a 3h",
  },
  {
    id: "4",
    level: "info",
    title: "Déclaration CNSS — échéance le 25 septembre",
    description: "Rappel : 8 jours restants pour soumettre la DAS",
    time: "",
  },
];

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  function dismissAlert(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <ERPLayout title="Tableau de bord — Vue DG">
      <div className="space-y-6 max-w-[1600px]">

        {/* Alertes */}
        {alerts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={15} className="text-amber-500" />
              <h2 className="text-sm font-semibold text-[color:var(--color-foreground)]">
                Alertes ({alerts.length})
              </h2>
            </div>
            <AlertList alerts={alerts} onDismiss={dismissAlert} />
          </div>
        )}

        {/* KPIs principaux */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <KpiCard
            title="CA Global (mois)"
            value="2,475M"
            subtitle="FCFA"
            trend={8.4}
            trendLabel="vs mois précédent"
            icon={TrendingUp}
            color="green"
            highlight
          />
          <KpiCard
            title="Trésorerie nette"
            value="3,842M"
            subtitle="FCFA toutes filiales"
            trend={2.1}
            icon={Wallet}
            color="gold"
          />
          <KpiCard
            title="Effectif total"
            value="970"
            subtitle="Employés actifs"
            trend={1.3}
            trendLabel="vs mois précédent"
            icon={Users}
            color="blue"
          />
          <KpiCard
            title="Taux de présence"
            value="87%"
            subtitle="Moyenne inter-filiales"
            trend={-0.8}
            icon={Users}
            color="green"
          />
          <KpiCard
            title="Stock critique"
            value="7"
            subtitle="Références en alerte"
            icon={Package}
            color="red"
          />
          <KpiCard
            title="Tickets IT ouverts"
            value="23"
            subtitle="dont 5 prioritaires"
            icon={Ticket}
            color="orange"
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <RHStats />
          </div>
        </div>

        {/* Trésorerie + Activité + Filiales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <TresorerieChart />
          <RecentActivity />
          <FilialeSummary />
        </div>

        {/* Tâches rapides */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[color:var(--color-foreground)]">
              Actions rapides
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Nouvelle facture", icon: DollarSign, href: "/finance/facturation/new" },
              { label: "Valider congés", icon: Users, href: "/rh/conges", badge: "14" },
              { label: "Bon de commande", icon: Package, href: "/commercial/devis/new" },
              { label: "Rapport financier", icon: TrendingUp, href: "/finance/etats" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] hover:bg-[#F0F7F0] transition-all text-center relative"
                >
                  {action.badge && (
                    <span className="absolute top-2 right-2 bg-[color:var(--color-accent)] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px]">
                      {action.badge}
                    </span>
                  )}
                  <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                    <Icon size={18} className="text-[color:var(--color-primary)]" />
                  </div>
                  <span className="text-xs font-medium text-[color:var(--color-foreground)]">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
