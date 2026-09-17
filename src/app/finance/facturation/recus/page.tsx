"use client";

import { useState } from "react";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import {
  Receipt, Download, Search, Printer, CheckCircle,
  Clock, AlertTriangle, Eye, Plus,
} from "lucide-react";
import { cn } from "@/lib/cn";

type ModeReglement = "virement" | "cheque" | "especes" | "mobile_money" | "compensation";
type StatutRecu = "valide" | "en_attente" | "annule";

type Recu = {
  id: string;
  numero: string;
  dateEmission: string;
  dateReglement: string;
  client: string;
  refFacture: string;
  montantHT: number;
  tva: number;
  montantTTC: number;
  modeReglement: ModeReglement;
  reference: string;
  statut: StatutRecu;
  filiale: string;
  emetteur: string;
};

const recus: Recu[] = [
  {
    id: "R001", numero: "REC-2026-0089", dateEmission: "2026-09-15", dateReglement: "2026-09-15",
    client: "SARL BAMIDELE", refFacture: "FA-2025-0892", montantHT: 15_677_966, tva: 2_822_034, montantTTC: 18_500_000,
    modeReglement: "virement", reference: "VIR-2026-09-0571", statut: "valide", filiale: "Stratégie & Influence", emetteur: "Adjoua KOFFI",
  },
  {
    id: "R002", numero: "REC-2026-0090", dateEmission: "2026-09-16", dateReglement: "2026-09-14",
    client: "SIEEP INDUSTRIE", refFacture: "FA-2025-0894", montantHT: 33_898_305, tva: 6_101_695, montantTTC: 40_000_000,
    modeReglement: "virement", reference: "VIR-2026-09-0585", statut: "valide", filiale: "Distribution", emetteur: "Yao ASSI",
  },
  {
    id: "R003", numero: "REC-2026-0091", dateEmission: "2026-09-16", dateReglement: "2026-09-16",
    client: "COTIVOIRE ENERGY", refFacture: "FA-2025-0895", montantHT: 6_101_695, tva: 1_098_305, montantTTC: 7_200_000,
    modeReglement: "cheque", reference: "CHQ-0023451", statut: "en_attente", filiale: "Stratégie & Influence", emetteur: "Boubacar SIDIBÉ",
  },
  {
    id: "R004", numero: "REC-2026-0088", dateEmission: "2026-09-12", dateReglement: "2026-09-12",
    client: "DIGICORP SA", refFacture: "FA-2025-0890", montantHT: 42_372_881, tva: 7_627_119, montantTTC: 50_000_000,
    modeReglement: "virement", reference: "VIR-2026-09-0560", statut: "valide", filiale: "Technologies & Transformation Digitale", emetteur: "Khadija OUATTARA",
  },
  {
    id: "R005", numero: "REC-2026-0087", dateEmission: "2026-09-10", dateReglement: "2026-09-10",
    client: "AGRO INVEST CI", refFacture: "FA-2025-0887", montantHT: 84_745_762, tva: 15_254_238, montantTTC: 100_000_000,
    modeReglement: "mobile_money", reference: "MTN-CI-892341", statut: "valide", filiale: "Fintech", emetteur: "Fatou BAMBA",
  },
  {
    id: "R006", numero: "REC-2026-0086", dateEmission: "2026-09-08", dateReglement: "2026-09-06",
    client: "MTCI — Marchés publics", refFacture: "FA-2025-0881", montantHT: 105_932_203, tva: 19_067_797, montantTTC: 125_000_000,
    modeReglement: "virement", reference: "VIR-2026-09-0540", statut: "valide", filiale: "Industrie", emetteur: "Mamadou COULIBALY",
  },
  {
    id: "R007", numero: "REC-2026-0085", dateEmission: "2026-09-05", dateReglement: "2026-09-03",
    client: "NOVA CONSULTING", refFacture: "FA-2025-0876", montantHT: 12_711_864, tva: 2_288_136, montantTTC: 15_000_000,
    modeReglement: "especes", reference: "ESP-0091", statut: "annule", filiale: "Stratégie & Influence", emetteur: "Adjoua KOFFI",
  },
  {
    id: "R008", numero: "REC-2026-0084", dateEmission: "2026-09-03", dateReglement: "2026-09-03",
    client: "PHARMA DISTRIBUTION OUEST", refFacture: "FA-2025-0873", montantHT: 59_322_034, tva: 10_677_966, montantTTC: 70_000_000,
    modeReglement: "cheque", reference: "CHQ-0023380", statut: "valide", filiale: "Distribution", emetteur: "Yao ASSI",
  },
];

const modeLabels: Record<ModeReglement, { label: string; emoji: string; color: string }> = {
  virement: { label: "Virement bancaire", emoji: "🏦", color: "bg-blue-100 text-blue-700" },
  cheque: { label: "Chèque", emoji: "📄", color: "bg-violet-100 text-violet-700" },
  especes: { label: "Espèces", emoji: "💵", color: "bg-emerald-100 text-emerald-700" },
  mobile_money: { label: "Mobile Money", emoji: "📱", color: "bg-amber-100 text-amber-700" },
  compensation: { label: "Compensation", emoji: "🔄", color: "bg-gray-100 text-gray-600" },
};

const statutConfig: Record<StatutRecu, { label: string; color: string; icon: React.ElementType }> = {
  valide: { label: "Validé", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  en_attente: { label: "En attente", color: "bg-amber-100 text-amber-700", icon: Clock },
  annule: { label: "Annulé", color: "bg-red-100 text-red-500", icon: AlertTriangle },
};

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

export default function RecusPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("tous");
  const [selectedRecu, setSelectedRecu] = useState<Recu | null>(null);

  const valides = recus.filter(r => r.statut === "valide");
  const enAttente = recus.filter(r => r.statut === "en_attente");

  const totalEncaisse = valides.reduce((s, r) => s + r.montantTTC, 0);
  const totalEnAttente = enAttente.reduce((s, r) => s + r.montantTTC, 0);
  const totalTVA = valides.reduce((s, r) => s + r.tva, 0);

  const tabs = [
    { label: "Tous", value: "tous" },
    { label: `Validés (${valides.length})`, value: "valide" },
    { label: `En attente (${enAttente.length})`, value: "en_attente" },
    { label: "Annulés", value: "annule" },
  ];

  const displayed = recus
    .filter(r => activeTab === "tous" || r.statut === activeTab)
    .filter(r =>
      search === "" ||
      r.numero.toLowerCase().includes(search.toLowerCase()) ||
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.refFacture.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ERPLayout title="Finance — Reçus de paiement">
      <div className="max-w-[1400px] space-y-5">
        <PageHeader
          title="Reçus de paiement"
          subtitle="Justificatifs d'encaissement émis aux clients"
          icon={Receipt}
          actions={
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] hover:bg-gray-50 transition-colors">
                <Download size={14} />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                <Plus size={14} />
                Nouveau reçu
              </button>
            </div>
          }
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Encaissé (validé)" value={`${(totalEncaisse / 1e6).toFixed(1)} M FCFA`} subtitle={`${valides.length} reçus`} icon={CheckCircle} color="green" highlight />
          <KpiCard title="En attente confirmation" value={`${(totalEnAttente / 1e6).toFixed(1)} M FCFA`} subtitle={`${enAttente.length} reçus`} icon={Clock} color="orange" />
          <KpiCard title="TVA collectée" value={`${(totalTVA / 1e6).toFixed(1)} M FCFA`} subtitle="sur reçus validés" icon={Receipt} color="blue" />
          <KpiCard title="Total reçus émis" value={String(recus.length)} subtitle="ce mois — sept. 2026" icon={Receipt} color="gold" />
        </div>

        <div className="flex gap-4">
          {/* Liste principale */}
          <div className={cn("flex-1 min-w-0 space-y-3", selectedRecu && "hidden xl:block")}>
            {/* Barre de recherche */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]" />
              <input
                type="text"
                placeholder="Rechercher par n° reçu, client, facture..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-[color:var(--color-border)] text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] bg-white"
              />
            </div>

            <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden">
              {/* En-tête tableau */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-muted)] uppercase tracking-wider">
                <div className="w-36 shrink-0">N° Reçu</div>
                <div className="flex-1">Client</div>
                <div className="hidden md:block w-32">Réf. facture</div>
                <div className="hidden lg:block w-28">Mode règlt.</div>
                <div className="hidden lg:block w-24 text-center">Date</div>
                <div className="w-32 text-right">Montant TTC</div>
                <div className="w-24 text-center">Statut</div>
                <div className="w-20 shrink-0" />
              </div>

              {displayed.length === 0 ? (
                <div className="py-12 text-center text-sm text-[color:var(--color-muted)]">
                  Aucun reçu trouvé
                </div>
              ) : (
                displayed.map((r) => {
                  const cfg = statutConfig[r.statut];
                  const modeCfg = modeLabels[r.modeReglement];
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRecu(selectedRecu?.id === r.id ? null : r)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] last:border-0 cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedRecu?.id === r.id && "bg-[color:var(--color-primary)]/5 border-l-2 border-l-[color:var(--color-primary)]"
                      )}
                    >
                      <div className="w-36 shrink-0">
                        <p className="text-xs font-mono font-semibold text-[color:var(--color-primary)]">{r.numero}</p>
                        <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{r.filiale}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">{r.client}</p>
                        <p className="text-xs text-[color:var(--color-muted)]">par {r.emetteur}</p>
                      </div>
                      <div className="hidden md:block w-32 text-xs font-mono text-[color:var(--color-muted)]">{r.refFacture}</div>
                      <div className="hidden lg:block w-28">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", modeCfg.color)}>
                          {modeCfg.emoji} {r.modeReglement === "virement" ? "Virement" : r.modeReglement === "cheque" ? "Chèque" : r.modeReglement === "mobile_money" ? "Mobile" : r.modeReglement === "especes" ? "Espèces" : "Compens."}
                        </span>
                      </div>
                      <div className="hidden lg:block w-24 text-center text-xs text-[color:var(--color-muted)]">{r.dateEmission}</div>
                      <div className="w-32 text-right">
                        <p className="text-sm font-bold text-[color:var(--color-foreground)]">{fmt(r.montantTTC)}</p>
                        <p className="text-xs text-[color:var(--color-muted)]">FCFA</p>
                      </div>
                      <div className="w-24 text-center">
                        <Badge className={cn("text-xs", cfg.color)}>{cfg.label}</Badge>
                      </div>
                      <div className="flex items-center gap-1 w-20 justify-end shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedRecu(r); }}
                          className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors"
                          title="Voir le reçu"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors"
                          title="Imprimer"
                        >
                          <Printer size={13} />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-[color:var(--color-muted)] transition-colors"
                          title="Télécharger PDF"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Aperçu reçu */}
          {selectedRecu && (
            <div className="w-96 shrink-0">
              <div className="bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden sticky top-4">
                {/* En-tête aperçu */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-[color:var(--color-border)]">
                  <p className="text-sm font-semibold text-[color:var(--color-foreground)]">Aperçu reçu</p>
                  <button
                    onClick={() => setSelectedRecu(null)}
                    className="text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] transition-colors"
                  >
                    Fermer
                  </button>
                </div>

                {/* Corps du reçu — style papier */}
                <div className="p-5">
                  {/* Header reçu */}
                  <div className="text-center mb-6 pb-4 border-b border-dashed border-gray-300">
                    <p className="text-xs font-bold text-[color:var(--color-muted)] uppercase tracking-widest mb-1">BOUA Group</p>
                    <p className="text-lg font-bold text-[color:var(--color-foreground)]">REÇU DE PAIEMENT</p>
                    <p className="font-mono text-sm font-bold text-[color:var(--color-primary)] mt-1">{selectedRecu.numero}</p>
                    <Badge className={cn("mt-2 text-xs", statutConfig[selectedRecu.statut].color)}>
                      {statutConfig[selectedRecu.statut].label}
                    </Badge>
                  </div>

                  {/* Infos */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Date d&apos;émission</span>
                      <span className="font-medium">{selectedRecu.dateEmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Date de règlement</span>
                      <span className="font-medium">{selectedRecu.dateReglement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Client</span>
                      <span className="font-semibold text-right max-w-[180px] text-xs leading-snug">{selectedRecu.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Réf. facture</span>
                      <span className="font-mono text-xs">{selectedRecu.refFacture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Mode règlement</span>
                      <span className="font-medium">
                        {modeLabels[selectedRecu.modeReglement].emoji} {modeLabels[selectedRecu.modeReglement].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Référence</span>
                      <span className="font-mono text-xs">{selectedRecu.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Filiale</span>
                      <span className="text-xs text-[color:var(--color-primary)]">{selectedRecu.filiale}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[color:var(--color-muted)]">Émis par</span>
                      <span className="font-medium text-xs">{selectedRecu.emetteur}</span>
                    </div>
                  </div>

                  {/* Montants */}
                  <div className="mt-4 pt-4 border-t border-dashed border-gray-300 space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[color:var(--color-muted)]">Montant HT</span>
                      <span>{fmt(selectedRecu.montantHT)} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[color:var(--color-muted)]">TVA (18%)</span>
                      <span>{fmt(selectedRecu.tva)} FCFA</span>
                    </div>
                    <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t border-gray-200">
                      <span className="text-[color:var(--color-foreground)]">TOTAL TTC</span>
                      <span className="text-[color:var(--color-primary)]">{fmt(selectedRecu.montantTTC)} FCFA</span>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="mt-5 pt-4 border-t border-dashed border-gray-300">
                    <div className="flex justify-between text-xs text-[color:var(--color-muted)]">
                      <div className="text-center">
                        <div className="w-28 h-12 border border-dashed border-gray-300 rounded mb-1" />
                        <p>Cachet & Signature</p>
                        <p className="font-medium mt-0.5">BOUA Group</p>
                      </div>
                      <div className="text-center">
                        <div className="w-28 h-12 border border-dashed border-gray-300 rounded mb-1" />
                        <p>Signature client</p>
                        <p className="font-medium mt-0.5">{selectedRecu.client.split(" ").slice(0, 2).join(" ")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 px-4 py-3 border-t border-[color:var(--color-border)] bg-gray-50">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[color:var(--color-border)] text-sm text-[color:var(--color-foreground)] hover:bg-white transition-colors">
                    <Printer size={13} />
                    Imprimer
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[color:var(--color-primary)] text-white text-sm font-medium hover:bg-[color:var(--color-primary-light)] transition-colors">
                    <Download size={13} />
                    Télécharger PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ERPLayout>
  );
}
