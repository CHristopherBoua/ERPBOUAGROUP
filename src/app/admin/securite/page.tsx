"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Shield, Users, Lock, Eye, Plus, Edit, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

type Role = {
  id: string;
  nom: string;
  description: string;
  nbUtilisateurs: number;
  modules: string[];
  niveau: "admin" | "manager" | "user" | "readonly";
};

type Utilisateur = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  role: string;
  filiale: string;
  statut: "actif" | "inactif" | "suspendu";
  dernierAcces: string;
  mfa: boolean;
};

const roles: Role[] = [
  { id: "R1", nom: "Super Administrateur", description: "Accès total à toutes les fonctionnalités", nbUtilisateurs: 2, modules: ["Tous les modules"], niveau: "admin" },
  { id: "R2", nom: "Directeur Général", description: "Lecture/écriture — tous modules, toutes filiales", nbUtilisateurs: 1, modules: ["Dashboard", "RH", "Finance", "Commercial", "Admin"], niveau: "admin" },
  { id: "R3", nom: "DG Filiale", description: "Accès complet à sa filiale uniquement", nbUtilisateurs: 5, modules: ["Dashboard", "RH", "Finance", "Commercial"], niveau: "manager" },
  { id: "R4", nom: "Responsable RH", description: "Gestion complète des ressources humaines", nbUtilisateurs: 3, modules: ["RH", "Dashboard"], niveau: "manager" },
  { id: "R5", nom: "Responsable Finance", description: "Accès complet Finance & Comptabilité", nbUtilisateurs: 4, modules: ["Finance", "Dashboard"], niveau: "manager" },
  { id: "R6", nom: "Commercial", description: "CRM, Pipeline, Devis & Commandes", nbUtilisateurs: 8, modules: ["Commercial", "Dashboard"], niveau: "user" },
  { id: "R7", nom: "Employé", description: "Accès lecture — fiche personnelle, congés", nbUtilisateurs: 947, modules: ["Mon espace"], niveau: "readonly" },
];

const utilisateurs: Utilisateur[] = [
  { id: "U1", prenom: "Directeur", nom: "KONÉ", email: "dg@bouagroup.com", role: "Directeur Général", filiale: "BOUA Group", statut: "actif", dernierAcces: "2026-09-17T09:14:00", mfa: true },
  { id: "U2", prenom: "Admin", nom: "SYSTÈME", email: "admin@bouagroup.com", role: "Super Administrateur", filiale: "BOUA Group", statut: "actif", dernierAcces: "2026-09-17T08:00:00", mfa: true },
  { id: "U3", prenom: "Adjoua", nom: "KOFFI", email: "a.koffi@bouagroup.com", role: "Commercial", filiale: "Distribution", statut: "actif", dernierAcces: "2026-09-17T08:55:00", mfa: false },
  { id: "U4", prenom: "Boubacar", nom: "SIDIBÉ", email: "b.sidibe@bouagroup.com", role: "Commercial", filiale: "Stratégie & Influence", statut: "actif", dernierAcces: "2026-09-16T17:30:00", mfa: true },
  { id: "U5", prenom: "Fatou", nom: "BAMBA", email: "f.bamba@bouagroup.com", role: "Responsable RH", filiale: "BOUA Group", statut: "actif", dernierAcces: "2026-09-17T09:01:00", mfa: true },
  { id: "U6", prenom: "Ancien", nom: "EMPLOYÉ", email: "ancien@bouagroup.com", role: "Employé", filiale: "Distribution", statut: "inactif", dernierAcces: "2026-06-10T10:00:00", mfa: false },
];

const statutColors = {
  actif: "bg-emerald-100 text-emerald-700",
  inactif: "bg-gray-100 text-gray-500",
  suspendu: "bg-red-100 text-red-500",
};

const niveauColors = {
  admin: "bg-red-100 text-red-700",
  manager: "bg-violet-100 text-violet-700",
  user: "bg-blue-100 text-blue-700",
  readonly: "bg-gray-100 text-gray-500",
};

export default function SecuritePage() {
  const [activeTab, setActiveTab] = useState("roles");

  const actifs = utilisateurs.filter(u => u.statut === "actif").length;
  const sansMfa = utilisateurs.filter(u => u.statut === "actif" && !u.mfa).length;
  const inactifs = utilisateurs.filter(u => u.statut === "inactif").length;

  return (
    <ERPLayout title="Admin — Sécurité & Accès">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Sécurité & Gestion des accès"
          subtitle="Rôles, permissions et utilisateurs"
          icon={Shield}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
              <Plus size={14} />
              Nouvel utilisateur
            </button>
          }
          tabs={[
            { label: "Rôles & Permissions", value: "roles" },
            { label: "Utilisateurs", value: "utilisateurs" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Utilisateurs actifs" value={String(actifs)} icon={Users} color="green" />
          <KpiCard title="Rôles définis" value={String(roles.length)} icon={Shield} color="blue" />
          <KpiCard title="Sans MFA activé" value={String(sansMfa)} subtitle="comptes à risque" icon={AlertTriangle} color={sansMfa > 0 ? "red" : "green"} />
          <KpiCard title="Comptes inactifs" value={String(inactifs)} subtitle="à désactiver" icon={Lock} color="orange" />
        </div>

        {activeTab === "roles" ? (
          <div className="space-y-3">
            {roles.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Shield size={16} className="text-[color:var(--color-muted)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm text-[color:var(--color-foreground)]">{r.nom}</p>
                        <Badge className={cn("text-xs", niveauColors[r.niveau])}>{r.niveau}</Badge>
                      </div>
                      <p className="text-xs text-[color:var(--color-muted)] mb-2">{r.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {r.modules.map((m) => (
                          <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-[color:var(--color-foreground)]">{r.nbUtilisateurs}</p>
                      <p className="text-xs text-[color:var(--color-muted)]">utilisateur{r.nbUtilisateurs > 1 ? "s" : ""}</p>
                    </div>
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
              <div className="w-8 shrink-0" />
              <div className="flex-1">Utilisateur</div>
              <div className="hidden md:block w-36">Rôle</div>
              <div className="hidden lg:block w-32">Filiale</div>
              <div className="hidden lg:block w-36 text-center">Dernier accès</div>
              <div className="hidden xl:block w-16 text-center">MFA</div>
              <div className="w-20 text-center">Statut</div>
              <div className="w-16 shrink-0" />
            </div>
            {utilisateurs.map((u) => {
              const date = new Date(u.dernierAcces);
              const jours = Math.round((new Date("2026-09-17").getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={u.id} className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 hover:bg-gray-50 transition-colors">
                  <Avatar prenom={u.prenom} nom={u.nom} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[color:var(--color-foreground)]">{u.prenom} {u.nom}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{u.email}</p>
                  </div>
                  <div className="hidden md:block w-36 text-xs text-[color:var(--color-foreground)] truncate">{u.role}</div>
                  <div className="hidden lg:block w-32 text-xs text-[color:var(--color-primary)] truncate">{u.filiale}</div>
                  <div className="hidden lg:block w-36 text-center text-xs text-[color:var(--color-muted)]">
                    {jours === 0 ? "Aujourd'hui" : jours === 1 ? "Hier" : `Il y a ${jours}j`}
                  </div>
                  <div className="hidden xl:block w-16 text-center">
                    {u.mfa ? (
                      <CheckCircle size={14} className="mx-auto text-emerald-500" />
                    ) : (
                      <AlertTriangle size={14} className="mx-auto text-amber-500" />
                    )}
                  </div>
                  <div className="w-20 text-center">
                    <Badge className={cn("text-xs", statutColors[u.statut])}>
                      {u.statut === "actif" ? "Actif" : u.statut === "inactif" ? "Inactif" : "Suspendu"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 w-16 justify-end shrink-0">
                    <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)]">
                      <Eye size={13} />
                    </button>
                    <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)]">
                      <Edit size={13} />
                    </button>
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
