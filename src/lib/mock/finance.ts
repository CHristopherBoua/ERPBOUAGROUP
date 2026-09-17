export type Transaction = {
  id: string;
  date: string;
  libelle: string;
  tiers: string;
  compte: string;
  journal: "Achats" | "Ventes" | "Banque" | "Caisse" | "OD" | "Paie";
  debit: number;
  credit: number;
  devise: string;
  filiale: string;
  statut: "valide" | "en_attente" | "rapproche" | "annule";
  reference: string;
};

export const transactions: Transaction[] = [
  { id: "T001", date: "2026-09-17", libelle: "Paiement facture SONATEL", tiers: "SONATEL", compte: "401100", journal: "Banque", debit: 0, credit: 4500000, devise: "FCFA", filiale: "Distribution", statut: "rapproche", reference: "VIR-2026-0921" },
  { id: "T002", date: "2026-09-17", libelle: "Achat fournitures bureau", tiers: "SDTM", compte: "606100", journal: "Achats", debit: 185000, credit: 0, devise: "FCFA", filiale: "BOUA Group", statut: "valide", reference: "FAC-SDTM-0432" },
  { id: "T003", date: "2026-09-16", libelle: "Prestation conseil BSIC Groupe", tiers: "BSIC Groupe", compte: "701100", journal: "Ventes", debit: 0, credit: 45000000, devise: "FCFA", filiale: "Stratégie & Influence", statut: "en_attente", reference: "INV-2026-0821" },
  { id: "T004", date: "2026-09-16", libelle: "Salaires Septembre 2026", tiers: "Personnel", compte: "641100", journal: "Paie", debit: 487500000, credit: 0, devise: "FCFA", filiale: "BOUA Group", statut: "valide", reference: "PAIE-2026-09" },
  { id: "T005", date: "2026-09-15", libelle: "Loyer siège social Oct", tiers: "SCI Abidjan Immo", compte: "613100", journal: "Banque", debit: 12000000, credit: 0, devise: "FCFA", filiale: "BOUA Group", statut: "rapproche", reference: "VIR-2026-0918" },
  { id: "T006", date: "2026-09-15", libelle: "Vente équipements industriels", tiers: "PETROCI", compte: "701200", journal: "Ventes", debit: 0, credit: 128000000, devise: "FCFA", filiale: "Distribution", statut: "valide", reference: "INV-2026-0818" },
  { id: "T007", date: "2026-09-14", libelle: "Remboursement note de frais", tiers: "Kouassi ATTA", compte: "471000", journal: "Caisse", debit: 250000, credit: 0, devise: "FCFA", filiale: "BOUA Group", statut: "valide", reference: "NDF-2026-0140" },
  { id: "T008", date: "2026-09-14", libelle: "Maintenance parc informatique", tiers: "IT SOLUTIONS CI", compte: "615100", journal: "Achats", debit: 3200000, credit: 0, devise: "FCFA", filiale: "Technologies & Digital", statut: "en_attente", reference: "FAC-ITSOL-0211" },
  { id: "T009", date: "2026-09-13", libelle: "Commission agents commerciaux", tiers: "Agents Externes", compte: "622100", journal: "OD", debit: 8700000, credit: 0, devise: "FCFA", filiale: "Distribution", statut: "valide", reference: "OD-2026-0089" },
  { id: "T010", date: "2026-09-13", libelle: "Abonnement SaaS Microsoft 365", tiers: "Microsoft Ireland", compte: "626100", journal: "Banque", debit: 1450000, credit: 0, devise: "FCFA", filiale: "BOUA Group", statut: "rapproche", reference: "VIR-2026-0914" },
  { id: "T011", date: "2026-09-12", libelle: "Collecte mobile money Oct", tiers: "Orange Money CI", compte: "512200", journal: "Banque", debit: 0, credit: 22000000, devise: "FCFA", filiale: "Fintech", statut: "valide", reference: "VIR-2026-0912" },
  { id: "T012", date: "2026-09-11", libelle: "Formation management externe", tiers: "HEC Paris Executive", compte: "631100", journal: "Banque", debit: 5500000, credit: 0, devise: "FCFA", filiale: "BOUA Group", statut: "valide", reference: "VIR-2026-0909" },
];

export const statutTxColors: Record<Transaction["statut"], string> = {
  valide: "bg-emerald-100 text-emerald-700",
  en_attente: "bg-amber-100 text-amber-700",
  rapproche: "bg-blue-100 text-blue-700",
  annule: "bg-gray-100 text-gray-500",
};

export const statutTxLabels: Record<Transaction["statut"], string> = {
  valide: "Validé",
  en_attente: "En attente",
  rapproche: "Rapproché",
  annule: "Annulé",
};

// ---- BUDGETS ----
export type LigneBudget = {
  id: string;
  categorie: string;
  poste: string;
  filiale: string;
  departement: string;
  budgetInitial: number;
  budgetRevise: number;
  engage: number;
  realise: number;
  devise: string;
};

export const budgets: LigneBudget[] = [
  { id: "B001", categorie: "Charges de personnel", poste: "Salaires & Charges", filiale: "BOUA Group", departement: "RH", budgetInitial: 6000000000, budgetRevise: 6200000000, engage: 5800000000, realise: 4875000000, devise: "FCFA" },
  { id: "B002", categorie: "Charges de personnel", poste: "Formations", filiale: "BOUA Group", departement: "RH", budgetInitial: 120000000, budgetRevise: 120000000, engage: 95000000, realise: 66000000, devise: "FCFA" },
  { id: "B003", categorie: "Frais généraux", poste: "Loyers & Charges locatives", filiale: "BOUA Group", departement: "Admin", budgetInitial: 200000000, budgetRevise: 200000000, engage: 180000000, realise: 144000000, devise: "FCFA" },
  { id: "B004", categorie: "Frais généraux", poste: "Informatique & Télécoms", filiale: "Technologies & Digital", departement: "IT", budgetInitial: 350000000, budgetRevise: 380000000, engage: 390000000, realise: 312000000, devise: "FCFA" },
  { id: "B005", categorie: "Marketing & Commercial", poste: "Publicité & Communication", filiale: "Stratégie & Influence", departement: "Marketing", budgetInitial: 150000000, budgetRevise: 150000000, engage: 168000000, realise: 134400000, devise: "FCFA" },
  { id: "B006", categorie: "Marketing & Commercial", poste: "Commissions agents", filiale: "Distribution", departement: "Ventes", budgetInitial: 95000000, budgetRevise: 95000000, engage: 78000000, realise: 69000000, devise: "FCFA" },
  { id: "B007", categorie: "Opérations industrielles", poste: "Matières premières", filiale: "Industrie", departement: "Production", budgetInitial: 800000000, budgetRevise: 850000000, engage: 720000000, realise: 612000000, devise: "FCFA" },
  { id: "B008", categorie: "Opérations industrielles", poste: "Maintenance équipements", filiale: "Industrie", departement: "Technique", budgetInitial: 120000000, budgetRevise: 120000000, engage: 98000000, realise: 76500000, devise: "FCFA" },
  { id: "B009", categorie: "Finance & Fiscal", poste: "Honoraires juridiques", filiale: "BOUA Group", departement: "Finance", budgetInitial: 45000000, budgetRevise: 45000000, engage: 38000000, realise: 30000000, devise: "FCFA" },
  { id: "B010", categorie: "Finance & Fiscal", poste: "Frais bancaires", filiale: "BOUA Group", departement: "Finance", budgetInitial: 28000000, budgetRevise: 28000000, engage: 22000000, realise: 17400000, devise: "FCFA" },
];

// ---- FACTURES ----
export type Facture = {
  id: string;
  numero: string;
  date: string;
  echeance: string;
  client: string;
  description: string;
  montantHT: number;
  tva: number;
  montantTTC: number;
  devise: string;
  filiale: string;
  statut: "brouillon" | "envoyee" | "partiellement_payee" | "payee" | "en_retard" | "annulee";
  soldeRestant: number;
};

export const factures: Facture[] = [
  { id: "F001", numero: "INV-2026-0821", date: "2026-09-10", echeance: "2026-10-10", client: "BSIC Groupe", description: "Mission conseil stratégique Q3", montantHT: 37500000, tva: 7500000, montantTTC: 45000000, devise: "FCFA", filiale: "Stratégie & Influence", statut: "envoyee", soldeRestant: 45000000 },
  { id: "F002", numero: "INV-2026-0818", date: "2026-09-05", echeance: "2026-10-05", client: "PETROCI", description: "Fourniture pompes centrifuges x12", montantHT: 106666667, tva: 21333333, montantTTC: 128000000, devise: "FCFA", filiale: "Distribution", statut: "payee", soldeRestant: 0 },
  { id: "F003", numero: "INV-2026-0809", date: "2026-08-20", echeance: "2026-09-20", client: "SGBCI", description: "Développement plateforme mobile banking", montantHT: 62500000, tva: 12500000, montantTTC: 75000000, devise: "FCFA", filiale: "Fintech", statut: "en_retard", soldeRestant: 75000000 },
  { id: "F004", numero: "INV-2026-0801", date: "2026-08-01", echeance: "2026-09-01", client: "Orange CI", description: "Formation équipes techniques Q2", montantHT: 12500000, tva: 2500000, montantTTC: 15000000, devise: "FCFA", filiale: "Technologies & Digital", statut: "payee", soldeRestant: 0 },
  { id: "F005", numero: "INV-2026-0795", date: "2026-07-15", echeance: "2026-08-15", client: "SIFCA", description: "Maintenance industrielle mensuelle", montantHT: 8333333, tva: 1666667, montantTTC: 10000000, devise: "FCFA", filiale: "Industrie", statut: "partiellement_payee", soldeRestant: 4000000 },
  { id: "F006", numero: "INV-2026-0830", date: "2026-09-15", echeance: "2026-10-15", client: "NSIA Banque", description: "Audit & conseil digital transformation", montantHT: 25000000, tva: 5000000, montantTTC: 30000000, devise: "FCFA", filiale: "Stratégie & Influence", statut: "brouillon", soldeRestant: 30000000 },
  { id: "F007", numero: "INV-2026-0822", date: "2026-09-12", echeance: "2026-10-12", client: "Ecobank CI", description: "Intégration API Fintech Open Banking", montantHT: 41666667, tva: 8333333, montantTTC: 50000000, devise: "FCFA", filiale: "Fintech", statut: "envoyee", soldeRestant: 50000000 },
];

export const statutFactureColors: Record<Facture["statut"], string> = {
  brouillon: "bg-gray-100 text-gray-600",
  envoyee: "bg-blue-100 text-blue-700",
  partiellement_payee: "bg-amber-100 text-amber-700",
  payee: "bg-emerald-100 text-emerald-700",
  en_retard: "bg-red-100 text-red-700",
  annulee: "bg-gray-100 text-gray-400",
};

export const statutFactureLabels: Record<Facture["statut"], string> = {
  brouillon: "Brouillon",
  envoyee: "Envoyée",
  partiellement_payee: "Partiel",
  payee: "Payée",
  en_retard: "En retard",
  annulee: "Annulée",
};

export function formatMontant(n: number, devise = "FCFA"): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)} Mrd ${devise}`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} M ${devise}`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} K ${devise}`;
  return `${n.toLocaleString("fr-FR")} ${devise}`;
}
