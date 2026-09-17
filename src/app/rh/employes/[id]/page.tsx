"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { StatBar } from "@/components/ui/StatBar";
import { getEmployeById, statutLabels, statutColors } from "@/lib/mock/employes";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  FileText,
  Clock,
  Star,
  GraduationCap,
  Edit,
  Download,
} from "lucide-react";

export default function EmployeDetailPage({ params }: PageProps<"/rh/employes/[id]">) {
  const { id } = use(params);
  const emp = getEmployeById(id);
  if (!emp) notFound();

  const anciennete = Math.floor(
    (new Date("2026-09-17").getTime() - new Date(emp.dateEmbauche).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <ERPLayout title={`${emp.prenom} ${emp.nom} — Fiche employé`}>
      <div className="max-w-5xl space-y-5">
        {/* Retour */}
        <Link
          href="/rh/employes"
          className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] transition-colors"
        >
          <ArrowLeft size={15} />
          Retour à la liste
        </Link>

        {/* En-tête fiche */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar prenom={emp.prenom} nom={emp.nom} size="xl" />
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-[color:var(--color-foreground)]">
                    {emp.prenom} {emp.nom}
                  </h1>
                  <Badge className={statutColors[emp.statut]}>
                    {statutLabels[emp.statut]}
                  </Badge>
                </div>
                <p className="text-[color:var(--color-muted)] mt-1">{emp.poste}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="flex items-center gap-1.5 text-sm text-[color:var(--color-muted)]">
                    <Building2 size={13} />
                    {emp.filiale}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-[color:var(--color-muted)]">
                    <Briefcase size={13} />
                    {emp.departement}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-[color:var(--color-muted)]">
                    <MapPin size={13} />
                    {emp.site}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-mono bg-gray-100 text-[color:var(--color-muted)] px-2 py-0.5 rounded">
                    {emp.matricule}
                  </span>
                  <span className="text-xs bg-[#E8F5E9] text-[color:var(--color-primary)] px-2 py-0.5 rounded font-medium">
                    {emp.typeContrat}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-muted)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Attestation
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Edit size={14} />
                Modifier
              </button>
            </div>
          </div>

          {/* Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[color:var(--color-border)]">
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                <Mail size={14} className="text-[color:var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-[color:var(--color-muted)]">Email</p>
                <p className="font-medium text-[color:var(--color-foreground)] truncate max-w-[180px]">
                  {emp.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                <Phone size={14} className="text-[color:var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-[color:var(--color-muted)]">Téléphone</p>
                <p className="font-medium text-[color:var(--color-foreground)]">{emp.telephone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                <Calendar size={14} className="text-[color:var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-[color:var(--color-muted)]">Embauche</p>
                <p className="font-medium text-[color:var(--color-foreground)]">
                  {new Date(emp.dateEmbauche).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  <span className="text-[color:var(--color-muted)] font-normal ml-1">
                    ({anciennete} an{anciennete > 1 ? "s" : ""})
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de détails */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Salaire */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FFF8E1] flex items-center justify-center">
                <FileText size={14} className="text-[color:var(--color-accent)]" />
              </div>
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">Rémunération</h3>
            </div>
            <p className="text-2xl font-bold text-[color:var(--color-foreground)]">
              {emp.salaire.toLocaleString("fr-FR")}
            </p>
            <p className="text-sm text-[color:var(--color-muted)]">{emp.devise} / mois brut</p>
            <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[color:var(--color-muted)]">Net estimé</span>
                <span className="font-medium">{Math.round(emp.salaire * 0.78).toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[color:var(--color-muted)]">Charges patronales</span>
                <span className="font-medium">{Math.round(emp.salaire * 0.22).toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[color:var(--color-muted)]">Coût total employeur</span>
                <span className="font-semibold text-[color:var(--color-foreground)]">
                  {Math.round(emp.salaire * 1.32).toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
          </div>

          {/* Congés */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                <Calendar size={14} className="text-[color:var(--color-primary)]" />
              </div>
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">Congés & Absences</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-[color:var(--color-muted)] mb-1">
                  <span>Congés pris</span>
                  <span className="font-semibold text-[color:var(--color-foreground)]">
                    {emp.congesPris} / {emp.soldeConge} jours
                  </span>
                </div>
                <StatBar value={emp.congesPris} max={emp.soldeConge} />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { label: "Acquis", val: emp.soldeConge, color: "text-emerald-600" },
                  { label: "Pris", val: emp.congesPris, color: "text-amber-600" },
                  { label: "Restant", val: emp.soldeConge - emp.congesPris, color: "text-blue-600" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`text-lg font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Star size={14} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">Performance</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Taux de présence", value: 94, color: "#1B5E20" },
                { label: "Objectifs atteints", value: 78, color: "#D4A017" },
                { label: "Score évaluation", value: 85, color: "#1565C0" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[color:var(--color-muted)]">{m.label}</span>
                    <span className="font-semibold" style={{ color: m.color }}>{m.value}%</span>
                  </div>
                  <StatBar value={m.value} max={100} color={m.color} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents & historique */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-[color:var(--color-muted)]" />
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">Documents</h3>
              <button className="ml-auto text-xs text-[color:var(--color-primary)] hover:underline">Ajouter</button>
            </div>
            <div className="space-y-2">
              {[
                { name: "Contrat de travail CDI", date: emp.dateEmbauche, type: "PDF" },
                { name: "Pièce d'identité", date: "2024-01-10", type: "PDF" },
                { name: "Diplôme de niveau", date: "2024-01-10", type: "PDF" },
                { name: "Attestation médicale", date: "2025-04-15", type: "PDF" },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center">
                      <FileText size={12} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[color:var(--color-foreground)]">{doc.name}</p>
                      <p className="text-xs text-[color:var(--color-muted)]">
                        {new Date(doc.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-[color:var(--color-primary)] hover:underline">
                    Voir
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-[color:var(--color-muted)]" />
              <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">Historique de carrière</h3>
            </div>
            <div className="relative pl-5">
              <div className="absolute left-1.5 top-2 bottom-2 w-px bg-[color:var(--color-border)]" />
              {[
                { date: emp.dateEmbauche, label: "Embauche", detail: `${emp.poste} — ${emp.filiale}` },
                {
                  date: new Date(new Date(emp.dateEmbauche).setFullYear(new Date(emp.dateEmbauche).getFullYear() + 2)).toISOString().split("T")[0],
                  label: "Promotion",
                  detail: "Responsable de département",
                },
                { date: "2025-01-01", label: "Augmentation salariale", detail: "+8% — évaluation annuelle" },
                { date: "2026-01-01", label: "Augmentation salariale", detail: "+5% — évaluation annuelle" },
              ].map((h, i) => (
                <div key={i} className="relative flex gap-3 mb-4 last:mb-0">
                  <div className="absolute -left-5 mt-0.5 w-3 h-3 rounded-full bg-white border-2 border-[color:var(--color-primary)]" />
                  <div>
                    <p className="text-xs text-[color:var(--color-muted)]">
                      {new Date(h.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </p>
                    <p className="text-sm font-medium text-[color:var(--color-foreground)]">{h.label}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">{h.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formations */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-[color:var(--color-muted)]" />
            <h3 className="font-semibold text-sm text-[color:var(--color-foreground)]">
              Formations & Certifications
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { nom: "Management stratégique", org: "HEC Paris", date: "2023-06", statut: "Certifié", valide: true },
              { nom: "Leadership & Communication", org: "Internal", date: "2024-03", statut: "Certifié", valide: true },
              { nom: "Digital Transformation", org: "MIT Online", date: "2026-12", statut: "En cours", valide: false },
            ].map((f) => (
              <div
                key={f.nom}
                className="flex items-start gap-3 p-3 rounded-lg border border-[color:var(--color-border)]"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <GraduationCap size={14} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[color:var(--color-foreground)]">{f.nom}</p>
                  <p className="text-xs text-[color:var(--color-muted)]">{f.org}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Badge
                      className={
                        f.valide ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      }
                    >
                      {f.statut}
                    </Badge>
                    <span className="text-xs text-[color:var(--color-muted)]">{f.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
