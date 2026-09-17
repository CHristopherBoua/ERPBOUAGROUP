"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookOpen, Search, Download, Filter } from "lucide-react";
import { cn } from "@/lib/cn";

type Ecriture = {
  id: string;
  date: string;
  journal: string;
  piece: string;
  libelle: string;
  debit: number;
  credit: number;
};

type Compte = {
  numero: string;
  libelle: string;
  classe: string;
  soldeDebiteur: number;
  soldeCrediteur: number;
  ecritures: Ecriture[];
};

const comptes: Compte[] = [
  {
    numero: "101000",
    libelle: "Capital social",
    classe: "Capitaux propres",
    soldeDebiteur: 0,
    soldeCrediteur: 1_200_000_000,
    ecritures: [
      { id: "E1", date: "2025-01-01", journal: "OD", piece: "APE-2025", libelle: "Reprise balance ouverture", debit: 0, credit: 1_200_000_000 },
    ],
  },
  {
    numero: "411000",
    libelle: "Clients — Ventes de biens et services",
    classe: "Actif circulant",
    soldeDebiteur: 645_000_000,
    soldeCrediteur: 0,
    ecritures: [
      { id: "E2", date: "2025-09-01", journal: "VT", piece: "FA-2025-0892", libelle: "FAC SARL BAMIDELE — Mission conseil", debit: 18_500_000, credit: 0 },
      { id: "E3", date: "2025-09-04", journal: "VT", piece: "FA-2025-0893", libelle: "FAC SA DIGICORP — Maintenance système", debit: 12_300_000, credit: 0 },
      { id: "E4", date: "2025-09-07", journal: "BQ", piece: "REG-0571", libelle: "Règlement SARL BAMIDELE", debit: 0, credit: 18_500_000 },
      { id: "E5", date: "2025-09-10", journal: "VT", piece: "FA-2025-0894", libelle: "FAC SIEEP INDUSTRIE — Fournitures équipement", debit: 95_000_000, credit: 0 },
      { id: "E6", date: "2025-09-12", journal: "VT", piece: "FA-2025-0895", libelle: "FAC COTIVOIRE ENERGY — Formation technique", debit: 7_200_000, credit: 0 },
      { id: "E7", date: "2025-09-15", journal: "BQ", piece: "REG-0585", libelle: "Règlement SIEEP INDUSTRIE partiel", debit: 0, credit: 40_000_000 },
    ],
  },
  {
    numero: "401000",
    libelle: "Fournisseurs — Achats de biens et services",
    classe: "Passif circulant",
    soldeDebiteur: 0,
    soldeCrediteur: 412_000_000,
    ecritures: [
      { id: "E8", date: "2025-09-03", journal: "AC", piece: "FC-0112", libelle: "FAC TRAVISOL SA — Fournitures bureau", debit: 0, credit: 4_800_000 },
      { id: "E9", date: "2025-09-06", journal: "AC", piece: "FC-0113", libelle: "FAC SAGEMCOM — Matériel informatique", debit: 0, credit: 28_500_000 },
      { id: "E10", date: "2025-09-10", journal: "BQ", piece: "PAY-0221", libelle: "Règlement TRAVISOL SA", debit: 4_800_000, credit: 0 },
      { id: "E11", date: "2025-09-14", journal: "AC", piece: "FC-0114", libelle: "FAC TOTAL ENERGIE — Carburant flotte", debit: 0, credit: 3_200_000 },
    ],
  },
  {
    numero: "521000",
    libelle: "Banques locales",
    classe: "Trésorerie",
    soldeDebiteur: 498_000_000,
    soldeCrediteur: 0,
    ecritures: [
      { id: "E12", date: "2025-09-01", journal: "BQ", piece: "RLV-0901", libelle: "Virement reçu MTCI — Marché 2025-047", debit: 125_000_000, credit: 0 },
      { id: "E13", date: "2025-09-07", journal: "BQ", piece: "REG-0571", libelle: "Encaissement SARL BAMIDELE", debit: 18_500_000, credit: 0 },
      { id: "E14", date: "2025-09-10", journal: "BQ", piece: "PAY-0221", libelle: "Règlement TRAVISOL SA", debit: 0, credit: 4_800_000 },
      { id: "E15", date: "2025-09-12", journal: "BQ", piece: "SAL-092025", libelle: "Virements salaires septembre 2025", debit: 0, credit: 287_000_000 },
      { id: "E16", date: "2025-09-15", journal: "BQ", piece: "REG-0585", libelle: "Encaissement SIEEP INDUSTRIE partiel", debit: 40_000_000, credit: 0 },
    ],
  },
  {
    numero: "661000",
    libelle: "Rémunérations du personnel",
    classe: "Charges de personnel",
    soldeDebiteur: 2_584_000_000,
    soldeCrediteur: 0,
    ecritures: [
      { id: "E17", date: "2025-09-12", journal: "BQ", piece: "SAL-092025", libelle: "Salaires bruts — septembre 2025", debit: 287_000_000, credit: 0 },
    ],
  },
];

function fmt(n: number) {
  if (n === 0) return "—";
  return n.toLocaleString("fr-FR");
}

const journaux: Record<string, { label: string; color: string }> = {
  VT: { label: "Ventes", color: "bg-emerald-100 text-emerald-700" },
  AC: { label: "Achats", color: "bg-blue-100 text-blue-700" },
  BQ: { label: "Banque", color: "bg-violet-100 text-violet-700" },
  OD: { label: "Opérations diverses", color: "bg-gray-100 text-gray-600" },
  SAL: { label: "Salaires", color: "bg-amber-100 text-amber-700" },
};

export default function GrandLivrePage() {
  const [search, setSearch] = useState("");
  const [selectedCompte, setSelectedCompte] = useState<string | null>(comptes[1].numero);

  const filtered = comptes.filter(
    c => search === "" || c.numero.includes(search) || c.libelle.toLowerCase().includes(search.toLowerCase())
  );

  const compte = selectedCompte ? comptes.find(c => c.numero === selectedCompte) : null;

  return (
    <ERPLayout title="Finance — Grand Livre">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Grand Livre Comptable"
          subtitle="Détail des écritures par compte — SYSCOHADA Révisé"
          icon={BookOpen}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] hover:bg-gray-50 transition-colors">
              <Download size={14} />
              Exporter
            </button>
          }
        />

        <div className="flex gap-4">
          {/* Liste des comptes */}
          <div className="w-72 shrink-0 space-y-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]" />
              <input
                type="text"
                placeholder="N° ou libellé..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-[color:var(--color-border)] text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] bg-white"
              />
            </div>
            <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
              {filtered.map((c) => (
                <button
                  key={c.numero}
                  onClick={() => setSelectedCompte(c.numero)}
                  className={cn(
                    "w-full flex items-start gap-3 px-3 py-3 border-b border-[color:var(--color-border)] last:border-0 text-left transition-colors hover:bg-gray-50",
                    selectedCompte === c.numero && "bg-[color:var(--color-primary)]/5 border-l-2 border-l-[color:var(--color-primary)]"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-bold font-mono", selectedCompte === c.numero ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-muted)]")}>{c.numero}</p>
                    <p className="text-xs text-[color:var(--color-foreground)] leading-snug mt-0.5 line-clamp-2">{c.libelle}</p>
                    <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{c.classe}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {c.soldeDebiteur > 0 ? (
                      <p className="text-xs font-semibold text-[color:var(--color-primary)]">D {(c.soldeDebiteur / 1e6).toFixed(0)}M</p>
                    ) : (
                      <p className="text-xs font-semibold text-red-500">C {(c.soldeCrediteur / 1e6).toFixed(0)}M</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Détail écritures */}
          <div className="flex-1 min-w-0">
            {compte ? (
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-[color:var(--color-border)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-sm text-[color:var(--color-primary)]">{compte.numero}</p>
                      <p className="font-semibold text-[color:var(--color-foreground)]">{compte.libelle}</p>
                      <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{compte.classe}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[color:var(--color-muted)]">Solde</p>
                      {compte.soldeDebiteur > 0 ? (
                        <p className="text-lg font-bold text-[color:var(--color-primary)]">D {compte.soldeDebiteur.toLocaleString("fr-FR")} FCFA</p>
                      ) : (
                        <p className="text-lg font-bold text-red-500">C {compte.soldeCrediteur.toLocaleString("fr-FR")} FCFA</p>
                      )}
                    </div>
                  </div>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Jrnl</th>
                      <th className="px-4 py-2 text-left">Pièce</th>
                      <th className="px-4 py-2 text-left">Libellé</th>
                      <th className="px-4 py-2 text-right">Débit</th>
                      <th className="px-4 py-2 text-right">Crédit</th>
                      <th className="px-4 py-2 text-right">Solde cumulé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compte.ecritures.reduce<{ rows: React.ReactNode[]; cumul: number }>((acc, e) => {
                      const cumul = acc.cumul + e.debit - e.credit;
                      acc.rows.push(
                        <tr key={e.id} className="border-b border-[color:var(--color-border)] hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5 text-xs text-[color:var(--color-muted)] whitespace-nowrap">{e.date}</td>
                          <td className="px-4 py-2.5">
                            <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", journaux[e.journal]?.color ?? "bg-gray-100 text-gray-600")}>
                              {e.journal}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-xs font-mono text-[color:var(--color-muted)] whitespace-nowrap">{e.piece}</td>
                          <td className="px-4 py-2.5 text-sm text-[color:var(--color-foreground)]">{e.libelle}</td>
                          <td className="px-4 py-2.5 text-right text-sm text-[color:var(--color-primary)] font-medium">{fmt(e.debit)}</td>
                          <td className="px-4 py-2.5 text-right text-sm text-red-500 font-medium">{fmt(e.credit)}</td>
                          <td className={cn("px-4 py-2.5 text-right text-sm font-semibold", cumul >= 0 ? "text-[color:var(--color-primary)]" : "text-red-500")}>
                            {cumul >= 0 ? "D " : "C "}{Math.abs(cumul).toLocaleString("fr-FR")}
                          </td>
                        </tr>
                      );
                      acc.cumul = cumul;
                      return acc;
                    }, { rows: [], cumul: 0 }).rows}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t-2 border-[color:var(--color-border)]">
                      <td colSpan={4} className="px-4 py-2 text-xs font-bold text-[color:var(--color-muted)] uppercase">Totaux</td>
                      <td className="px-4 py-2 text-right text-sm font-bold text-[color:var(--color-primary)]">
                        {compte.ecritures.reduce((s, e) => s + e.debit, 0).toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-2 text-right text-sm font-bold text-red-500">
                        {compte.ecritures.reduce((s, e) => s + e.credit, 0).toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-2 text-right text-sm font-bold text-[color:var(--color-foreground)]">
                        {compte.soldeDebiteur > 0 ? "D " : "C "}
                        {Math.max(compte.soldeDebiteur, compte.soldeCrediteur).toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] flex items-center justify-center h-64 text-[color:var(--color-muted)] text-sm">
                Sélectionner un compte pour afficher le détail
              </div>
            )}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
