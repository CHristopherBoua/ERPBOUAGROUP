export type Pointage = {
  id: string;
  employeId: string;
  employeNom: string;
  filiale: string;
  site: string;
  date: string;
  entree: string | null;
  sortie: string | null;
  heuresTravaillees: number;
  heuresSup: number;
  retard: number;
  mode: "Badgeuse" | "Mobile GPS" | "Web" | "Biométrie";
  statut: "valide" | "en_cours" | "absent" | "conge" | "contestation";
};

export const pointages: Pointage[] = [
  { id: "P001", employeId: "2", employeNom: "Aminata DIALLO", filiale: "BOUA Group", site: "Abidjan HQ", date: "2026-09-17", entree: "07:52", sortie: "17:15", heuresTravaillees: 9.38, heuresSup: 1.38, retard: 0, mode: "Badgeuse", statut: "valide" },
  { id: "P002", employeId: "3", employeNom: "Serge KONAN", filiale: "BOUA Group", site: "Abidjan HQ", date: "2026-09-17", entree: "08:22", sortie: "17:00", heuresTravaillees: 8.63, heuresSup: 0.63, retard: 22, mode: "Badgeuse", statut: "valide" },
  { id: "P003", employeId: "4", employeNom: "Marie KONÉ", filiale: "Fintech", site: "Plateau", date: "2026-09-17", entree: null, sortie: null, heuresTravaillees: 0, heuresSup: 0, retard: 0, mode: "Web", statut: "conge" },
  { id: "P004", employeId: "5", employeNom: "Mamadou COULIBALY", filiale: "Industrie", site: "Zone Industrielle", date: "2026-09-17", entree: "06:45", sortie: "15:00", heuresTravaillees: 8.25, heuresSup: 0.25, retard: 0, mode: "Biométrie", statut: "valide" },
  { id: "P005", employeId: "7", employeNom: "Jean-Pierre ASSI", filiale: "Technologies", site: "Abidjan HQ", date: "2026-09-17", entree: "09:05", sortie: "18:30", heuresTravaillees: 9.42, heuresSup: 1.42, retard: 5, mode: "Mobile GPS", statut: "valide" },
  { id: "P006", employeId: "8", employeNom: "Fatou TRAORÉ", filiale: "BOUA Group", site: "Abidjan HQ", date: "2026-09-17", entree: null, sortie: null, heuresTravaillees: 0, heuresSup: 0, retard: 0, mode: "Web", statut: "absent" },
  { id: "P007", employeId: "9", employeNom: "Hervé BOGUI", filiale: "BOUA Group", site: "Abidjan HQ", date: "2026-09-17", entree: "08:00", sortie: null, heuresTravaillees: 0, heuresSup: 0, retard: 0, mode: "Badgeuse", statut: "en_cours" },
  { id: "P008", employeId: "10", employeNom: "Boubacar FOFANA", filiale: "Industrie", site: "San Pedro", date: "2026-09-17", entree: "06:00", sortie: "14:00", heuresTravaillees: 8, heuresSup: 0, retard: 0, mode: "Mobile GPS", statut: "valide" },
  { id: "P009", employeId: "11", employeNom: "Adèle ASSOUAN", filiale: "Fintech", site: "Plateau", date: "2026-09-17", entree: "08:10", sortie: "17:20", heuresTravaillees: 9.17, heuresSup: 1.17, retard: 10, mode: "Mobile GPS", statut: "contestation" },
  { id: "P010", employeId: "12", employeNom: "Thierry GNAGNE", filiale: "Distribution", site: "Abidjan HQ", date: "2026-09-17", entree: null, sortie: null, heuresTravaillees: 0, heuresSup: 0, retard: 0, mode: "Web", statut: "absent" },
];

export const statutPointageColors: Record<Pointage["statut"], string> = {
  valide: "bg-emerald-100 text-emerald-700",
  en_cours: "bg-blue-100 text-blue-700",
  absent: "bg-red-100 text-red-700",
  conge: "bg-amber-100 text-amber-700",
  contestation: "bg-orange-100 text-orange-700",
};

export const statutPointageLabels: Record<Pointage["statut"], string> = {
  valide: "Validé",
  en_cours: "En cours",
  absent: "Absent",
  conge: "Congé",
  contestation: "Contestation",
};
