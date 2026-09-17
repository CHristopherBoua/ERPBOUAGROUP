export type DemandeConge = {
  id: string;
  employeId: string;
  employeNom: string;
  employePoste: string;
  filiale: string;
  type: "Annuel" | "Maladie" | "Maternité" | "Paternité" | "Sans solde" | "Formation" | "RTT";
  dateDebut: string;
  dateFin: string;
  jours: number;
  statut: "en_attente" | "approuve" | "refuse" | "annule";
  motif: string;
  managerId: string;
  dateDemandeY: string;
};

export const demandesConge: DemandeConge[] = [
  {
    id: "C001", employeId: "4", employeNom: "Marie KONÉ", employePoste: "Directrice Fintech",
    filiale: "Fintech", type: "Annuel", dateDebut: "2026-09-20", dateFin: "2026-10-05",
    jours: 15, statut: "approuve", motif: "Congé annuel", managerId: "1",
    dateDemandeY: "2026-09-10",
  },
  {
    id: "C002", employeId: "11", employeNom: "Adèle ASSOUAN", employePoste: "Développeuse Mobile",
    filiale: "Fintech", type: "Annuel", dateDebut: "2026-09-25", dateFin: "2026-10-10",
    jours: 12, statut: "en_attente", motif: "Congé annuel restant", managerId: "4",
    dateDemandeY: "2026-09-12",
  },
  {
    id: "C003", employeId: "9", employeNom: "Hervé BOGUI", employePoste: "Chargé de recrutement",
    filiale: "BOUA Group", type: "Formation", dateDebut: "2026-09-15", dateFin: "2026-09-19",
    jours: 5, statut: "approuve", motif: "Formation SIRH — Abidjan", managerId: "2",
    dateDemandeY: "2026-09-05",
  },
  {
    id: "C004", employeId: "8", employeNom: "Fatou TRAORÉ", employePoste: "Responsable Paie",
    filiale: "BOUA Group", type: "Maladie", dateDebut: "2026-09-18", dateFin: "2026-09-20",
    jours: 3, statut: "en_attente", motif: "Arrêt maladie", managerId: "2",
    dateDemandeY: "2026-09-17",
  },
  {
    id: "C005", employeId: "10", employeNom: "Boubacar FOFANA", employePoste: "Chef de chantier",
    filiale: "Industrie", type: "Annuel", dateDebut: "2026-10-01", dateFin: "2026-10-14",
    jours: 10, statut: "en_attente", motif: "Congé planifié Q4", managerId: "5",
    dateDemandeY: "2026-09-15",
  },
  {
    id: "C006", employeId: "12", employeNom: "Thierry GNAGNE", employePoste: "Responsable Commercial",
    filiale: "Distribution", type: "Maladie", dateDebut: "2026-09-16", dateFin: "2026-09-18",
    jours: 3, statut: "refuse", motif: "Arrêt maladie", managerId: "1",
    dateDemandeY: "2026-09-14",
  },
  {
    id: "C007", employeId: "6", employeNom: "Isabelle YAO", employePoste: "Directrice Stratégie",
    filiale: "Stratégie & Influence", type: "RTT", dateDebut: "2026-10-20", dateFin: "2026-10-22",
    jours: 3, statut: "en_attente", motif: "RTT cumulé", managerId: "1",
    dateDemandeY: "2026-09-16",
  },
  {
    id: "C008", employeId: "7", employeNom: "Jean-Pierre ASSI", employePoste: "CTO",
    filiale: "Technologies & Digital", type: "Annuel", dateDebut: "2026-11-01", dateFin: "2026-11-15",
    jours: 14, statut: "en_attente", motif: "Congé familial", managerId: "1",
    dateDemandeY: "2026-09-16",
  },
];

export const statutCongeLabels: Record<DemandeConge["statut"], string> = {
  en_attente: "En attente",
  approuve: "Approuvé",
  refuse: "Refusé",
  annule: "Annulé",
};

export const statutCongeColors: Record<DemandeConge["statut"], string> = {
  en_attente: "bg-amber-100 text-amber-700",
  approuve: "bg-emerald-100 text-emerald-700",
  refuse: "bg-red-100 text-red-700",
  annule: "bg-gray-100 text-gray-500",
};
