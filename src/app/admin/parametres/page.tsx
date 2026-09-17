"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Settings, Globe, Bell, Database, Palette, Save, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Section = {
  key: string;
  label: string;
  icon: React.ElementType;
  description: string;
};

const sections: Section[] = [
  { key: "general", label: "Général", icon: Settings, description: "Nom, devise, langue, fuseau horaire" },
  { key: "notifications", label: "Notifications", icon: Bell, description: "Alertes email, push, seuils" },
  { key: "integrations", label: "Intégrations", icon: Globe, description: "API, webhooks, services externes" },
  { key: "sauvegarde", label: "Sauvegarde & Données", icon: Database, description: "Exports, purges, rétention" },
  { key: "apparence", label: "Apparence", icon: Palette, description: "Thème, couleurs, logo" },
];

type Toggle = { label: string; description: string; enabled: boolean };

export default function ParametresPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    nomEntreprise: "BOUA Group",
    devise: "XOF",
    langue: "fr",
    fuseauHoraire: "Africa/Abidjan",
    exerciceFiscal: "janvier",
    formatDate: "DD/MM/YYYY",
  });

  const [notifToggles, setNotifToggles] = useState<Toggle[]>([
    { label: "Alertes de dépassement de budget", description: "Notification quand un budget est dépassé de plus de 10%", enabled: true },
    { label: "Nouvelles candidatures reçues", description: "Email au responsable RH pour chaque candidature", enabled: true },
    { label: "Devis en attente de validation", description: "Rappel J+2 pour les devis non signés", enabled: true },
    { label: "Rapport hebdomadaire automatique", description: "Synthèse DG chaque lundi 8h00", enabled: false },
    { label: "Alertes déclarations sociales", description: "Rappel 7 jours avant l'échéance CNPS/ITS", enabled: true },
    { label: "Connexions suspectes", description: "Alerte si connexion depuis une nouvelle adresse IP", enabled: true },
  ]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <ERPLayout title="Admin — Paramètres système">
      <div className="max-w-[1200px] space-y-5">
        <PageHeader
          title="Paramètres système"
          subtitle="Configuration générale de la plateforme ERP"
          icon={Settings}
          actions={
            <button
              onClick={handleSave}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-light)]"
              )}
            >
              <Save size={14} />
              {saved ? "Enregistré !" : "Enregistrer"}
            </button>
          }
        />

        <div className="flex gap-5">
          {/* Sidebar navigation */}
          <div className="w-56 shrink-0 space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors text-sm",
                    activeSection === s.key
                      ? "bg-[color:var(--color-primary)] text-white"
                      : "text-[color:var(--color-foreground)] hover:bg-gray-100"
                  )}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            {activeSection === "general" && (
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-5">
                <h3 className="font-semibold text-[color:var(--color-foreground)] mb-4">Paramètres généraux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "nomEntreprise", label: "Nom de l'entreprise", type: "text" },
                    { key: "devise", label: "Devise principale", type: "select", options: [{ value: "XOF", label: "XOF — Franc CFA (BCEAO)" }, { value: "USD", label: "USD — Dollar américain" }, { value: "EUR", label: "EUR — Euro" }] },
                    { key: "langue", label: "Langue d'interface", type: "select", options: [{ value: "fr", label: "Français" }, { value: "en", label: "English" }] },
                    { key: "fuseauHoraire", label: "Fuseau horaire", type: "select", options: [{ value: "Africa/Abidjan", label: "Africa/Abidjan (UTC+0)" }, { value: "Africa/Dakar", label: "Africa/Dakar (UTC+0)" }, { value: "Africa/Lagos", label: "Africa/Lagos (UTC+1)" }] },
                    { key: "exerciceFiscal", label: "Début exercice fiscal", type: "select", options: [{ value: "janvier", label: "Janvier" }, { value: "avril", label: "Avril" }, { value: "juillet", label: "Juillet" }, { value: "octobre", label: "Octobre" }] },
                    { key: "formatDate", label: "Format de date", type: "select", options: [{ value: "DD/MM/YYYY", label: "DD/MM/YYYY" }, { value: "MM/DD/YYYY", label: "MM/DD/YYYY" }, { value: "YYYY-MM-DD", label: "YYYY-MM-DD" }] },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-[color:var(--color-muted)] mb-1.5">{field.label}</label>
                      {field.type === "text" ? (
                        <input
                          type="text"
                          value={general[field.key as keyof typeof general]}
                          onChange={(e) => setGeneral(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-shadow bg-white"
                        />
                      ) : (
                        <select
                          value={general[field.key as keyof typeof general]}
                          onChange={(e) => setGeneral(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-shadow bg-white"
                        >
                          {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-5">
                <h3 className="font-semibold text-[color:var(--color-foreground)] mb-4">Notifications & Alertes</h3>
                <div className="space-y-3">
                  {notifToggles.map((t, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-[color:var(--color-border)] last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[color:var(--color-foreground)]">{t.label}</p>
                        <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{t.description}</p>
                      </div>
                      <button
                        onClick={() => setNotifToggles(prev => prev.map((item, idx) => idx === i ? { ...item, enabled: !item.enabled } : item))}
                        className={cn(
                          "relative inline-flex w-11 h-6 shrink-0 rounded-full transition-colors duration-200",
                          t.enabled ? "bg-[color:var(--color-primary)]" : "bg-gray-200"
                        )}
                      >
                        <span className={cn(
                          "inline-block w-5 h-5 mt-0.5 rounded-full bg-white shadow-sm transform transition-transform duration-200",
                          t.enabled ? "translate-x-5.5" : "translate-x-0.5"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeSection === "integrations" || activeSection === "sauvegarde" || activeSection === "apparence") && (
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-5">
                <h3 className="font-semibold text-[color:var(--color-foreground)] mb-2">
                  {sections.find(s => s.key === activeSection)?.label}
                </h3>
                <p className="text-sm text-[color:var(--color-muted)] mb-6">{sections.find(s => s.key === activeSection)?.description}</p>
                <div className="space-y-2">
                  {activeSection === "integrations" && [
                    "API REST — Générer une clé API",
                    "Webhooks — Configurer les endpoints sortants",
                    "Rapports comptables — Synchronisation logiciel tiers",
                    "SSO — Authentification unique entreprise",
                  ].map((item) => (
                    <button key={item} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[color:var(--color-border)] hover:bg-gray-50 transition-colors text-left">
                      <span className="text-sm text-[color:var(--color-foreground)]">{item}</span>
                      <ChevronRight size={14} className="text-[color:var(--color-muted)]" />
                    </button>
                  ))}
                  {activeSection === "sauvegarde" && [
                    "Exporter toutes les données (JSON / CSV)",
                    "Planifier une sauvegarde automatique",
                    "Rétention des données — configurer la durée",
                    "Purger les données archivées",
                  ].map((item) => (
                    <button key={item} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[color:var(--color-border)] hover:bg-gray-50 transition-colors text-left">
                      <span className="text-sm text-[color:var(--color-foreground)]">{item}</span>
                      <ChevronRight size={14} className="text-[color:var(--color-muted)]" />
                    </button>
                  ))}
                  {activeSection === "apparence" && [
                    "Thème clair / sombre / automatique",
                    "Changer le logo de l'application",
                    "Couleurs primaires personnalisées",
                    "Police et taille de texte",
                  ].map((item) => (
                    <button key={item} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[color:var(--color-border)] hover:bg-gray-50 transition-colors text-left">
                      <span className="text-sm text-[color:var(--color-foreground)]">{item}</span>
                      <ChevronRight size={14} className="text-[color:var(--color-muted)]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
