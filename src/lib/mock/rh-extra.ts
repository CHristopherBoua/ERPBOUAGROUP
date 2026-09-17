// ─── Recrutement ───────────────────────────────────────────────────────────
export type StatutPoste = "ouvert" | "en_cours" | "pourvu" | "suspendu";
export type StatutCandidat = "nouveau" | "cv_selectionne" | "entretien_rh" | "entretien_tech" | "offre" | "retenu" | "refuse";

export type Poste = {
  id: string;
  titre: string;
  filiale: string;
  departement: string;
  type: "CDI" | "CDD" | "Stage" | "Consultant";
  lieu: string;
  dateOuverture: string;
  dateCloture?: string;
  statut: StatutPoste;
  nbCandidatures: number;
  responsable: string;
  salaire?: string;
};

export type Candidat = {
  id: string;
  posteId: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  datePostulation: string;
  statut: StatutCandidat;
  source: string;
  note?: number;
};

export const postes: Poste[] = [
  { id: "P001", titre: "Développeur Fullstack Senior", filiale: "Technologies & Digital", departement: "Ingénierie", type: "CDI", lieu: "Abidjan", dateOuverture: "2026-08-01", statut: "en_cours", nbCandidatures: 28, responsable: "DG Tech", salaire: "800K – 1.2M FCFA" },
  { id: "P002", titre: "Analyste Fintech / Mobile Money", filiale: "Fintech", departement: "Produits", type: "CDI", lieu: "Abidjan", dateOuverture: "2026-08-15", statut: "en_cours", nbCandidatures: 19, responsable: "DG Fintech", salaire: "700K – 950K FCFA" },
  { id: "P003", titre: "Ingénieur Maintenance Industrielle", filiale: "Industrie", departement: "Opérations", type: "CDI", lieu: "Abidjan / Terrain", dateOuverture: "2026-09-01", statut: "ouvert", nbCandidatures: 12, responsable: "DG Industrie", salaire: "600K – 850K FCFA" },
  { id: "P004", titre: "Chargé(e) de Clientèle B2B", filiale: "Stratégie & Influence", departement: "Commercial", type: "CDI", lieu: "Abidjan", dateOuverture: "2026-09-05", statut: "ouvert", nbCandidatures: 34, responsable: "Adjoua KOFFI", salaire: "450K – 650K FCFA" },
  { id: "P005", titre: "Contrôleur de Gestion Groupe", filiale: "BOUA Group", departement: "Finance", type: "CDI", lieu: "Abidjan", dateOuverture: "2026-07-20", dateCloture: "2026-09-20", statut: "en_cours", nbCandidatures: 15, responsable: "DG Finance", salaire: "900K – 1.3M FCFA" },
  { id: "P006", titre: "Stagiaire Data Analyst", filiale: "Technologies & Digital", departement: "Data", type: "Stage", lieu: "Abidjan", dateOuverture: "2026-09-10", statut: "ouvert", nbCandidatures: 47, responsable: "DG Tech", salaire: "150K FCFA" },
  { id: "P007", titre: "Responsable Supply Chain", filiale: "Distribution", departement: "Logistique", type: "CDI", lieu: "Abidjan", dateOuverture: "2026-06-10", dateCloture: "2026-08-31", statut: "pourvu", nbCandidatures: 22, responsable: "DG Distribution" },
];

export const candidats: Candidat[] = [
  { id: "CAN001", posteId: "P001", nom: "KOUAMÉ", prenom: "Aya", email: "a.kouame@email.com", telephone: "+225 07 00 11 22", datePostulation: "2026-08-05", statut: "entretien_tech", source: "LinkedIn", note: 4 },
  { id: "CAN002", posteId: "P001", nom: "BAMBA", prenom: "Seydou", email: "s.bamba@email.com", telephone: "+225 07 22 33 44", datePostulation: "2026-08-08", statut: "offre", source: "Référence interne", note: 5 },
  { id: "CAN003", posteId: "P002", nom: "TRAORÉ", prenom: "Minata", email: "m.traore@email.com", telephone: "+225 07 44 55 66", datePostulation: "2026-08-20", statut: "entretien_rh", source: "Site carrières", note: 3 },
  { id: "CAN004", posteId: "P002", nom: "DIALLO", prenom: "Cheikh", email: "c.diallo@email.com", telephone: "+225 07 55 66 77", datePostulation: "2026-08-22", statut: "cv_selectionne", source: "JobartCI", note: 4 },
  { id: "CAN005", posteId: "P005", nom: "COULIBALY", prenom: "Astou", email: "a.coulibaly@email.com", telephone: "+225 07 66 77 88", datePostulation: "2026-07-25", statut: "entretien_tech", source: "Cabinet RH", note: 5 },
  { id: "CAN006", posteId: "P004", nom: "KEITA", prenom: "Ibrahim", email: "i.keita@email.com", telephone: "+225 07 77 88 99", datePostulation: "2026-09-06", statut: "nouveau", source: "LinkedIn", note: undefined },
];

export const statutPosteColors: Record<StatutPoste, string> = {
  ouvert: "bg-emerald-100 text-emerald-700",
  en_cours: "bg-blue-100 text-blue-700",
  pourvu: "bg-gray-100 text-gray-500",
  suspendu: "bg-amber-100 text-amber-700",
};
export const statutPosteLabels: Record<StatutPoste, string> = {
  ouvert: "Ouvert",
  en_cours: "En cours",
  pourvu: "Pourvu",
  suspendu: "Suspendu",
};

export const statutCandidatColors: Record<StatutCandidat, string> = {
  nouveau: "bg-gray-100 text-gray-500",
  cv_selectionne: "bg-blue-100 text-blue-700",
  entretien_rh: "bg-violet-100 text-violet-700",
  entretien_tech: "bg-amber-100 text-amber-700",
  offre: "bg-orange-100 text-orange-700",
  retenu: "bg-emerald-100 text-emerald-700",
  refuse: "bg-red-100 text-red-500",
};
export const statutCandidatLabels: Record<StatutCandidat, string> = {
  nouveau: "Nouveau",
  cv_selectionne: "CV sélectionné",
  entretien_rh: "Entretien RH",
  entretien_tech: "Entretien Tech",
  offre: "Offre envoyée",
  retenu: "Retenu",
  refuse: "Refusé",
};

// ─── Bulletins de paie ─────────────────────────────────────────────────────
export type StatutBulletin = "brouillon" | "valide" | "envoye" | "archive";

export type BulletinPaie = {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  filiale: string;
  poste: string;
  periode: string;
  salaireBrut: number;
  cotisations: number;
  salaireNet: number;
  statut: StatutBulletin;
};

export const bulletins: BulletinPaie[] = [
  { id: "BP001", matricule: "EMP-001", nom: "KONÉ", prenom: "Directeur", filiale: "BOUA Group", poste: "Directeur Général", periode: "Septembre 2026", salaireBrut: 4500000, cotisations: 540000, salaireNet: 3960000, statut: "valide" },
  { id: "BP002", matricule: "EMP-002", nom: "KOFFI", prenom: "Adjoua", filiale: "Distribution", poste: "Resp. Commercial", periode: "Septembre 2026", salaireBrut: 1850000, cotisations: 222000, salaireNet: 1628000, statut: "envoye" },
  { id: "BP003", matricule: "EMP-003", nom: "SIDIBÉ", prenom: "Boubacar", filiale: "Stratégie & Influence", poste: "Consultant Senior", periode: "Septembre 2026", salaireBrut: 2100000, cotisations: 252000, salaireNet: 1848000, statut: "envoye" },
  { id: "BP004", matricule: "EMP-004", nom: "TRAORÉ", prenom: "Seydou", filiale: "Industrie", poste: "Ingénieur Prod.", periode: "Septembre 2026", salaireBrut: 1200000, cotisations: 144000, salaireNet: 1056000, statut: "valide" },
  { id: "BP005", matricule: "EMP-005", nom: "COULIBALY", prenom: "Mariam", filiale: "Fintech", poste: "Dev. Mobile", periode: "Septembre 2026", salaireBrut: 1450000, cotisations: 174000, salaireNet: 1276000, statut: "brouillon" },
  { id: "BP006", matricule: "EMP-006", nom: "DIARRA", prenom: "Awa", filiale: "Technologies & Digital", poste: "Chef de Projet", periode: "Septembre 2026", salaireBrut: 1750000, cotisations: 210000, salaireNet: 1540000, statut: "valide" },
  { id: "BP007", matricule: "EMP-007", nom: "BAMBA", prenom: "Fatou", filiale: "BOUA Group", poste: "RH Manager", periode: "Septembre 2026", salaireBrut: 1600000, cotisations: 192000, salaireNet: 1408000, statut: "envoye" },
  { id: "BP008", matricule: "EMP-008", nom: "TOURÉ", prenom: "Amara", filiale: "Distribution", poste: "Logisticien", periode: "Septembre 2026", salaireBrut: 980000, cotisations: 117600, salaireNet: 862400, statut: "brouillon" },
];

export const statutBulletinColors: Record<StatutBulletin, string> = {
  brouillon: "bg-gray-100 text-gray-500",
  valide: "bg-amber-100 text-amber-700",
  envoye: "bg-emerald-100 text-emerald-700",
  archive: "bg-blue-100 text-blue-600",
};
export const statutBulletinLabels: Record<StatutBulletin, string> = {
  brouillon: "Brouillon",
  valide: "Validé",
  envoye: "Envoyé",
  archive: "Archivé",
};

// ─── Formations ────────────────────────────────────────────────────────────
export type StatutFormation = "planifiee" | "en_cours" | "terminee" | "annulee";

export type Formation = {
  id: string;
  titre: string;
  categorie: string;
  formateur: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
  dureeJours: number;
  nbParticipants: number;
  maxParticipants: number;
  cout: number;
  filiale: string;
  statut: StatutFormation;
  certifiante: boolean;
};

export const formations: Formation[] = [
  { id: "F001", titre: "Leadership & Management d'équipe", categorie: "Management", formateur: "HEC Paris Executive", lieu: "Abidjan – Hôtel Ivoire", dateDebut: "2026-09-22", dateFin: "2026-09-25", dureeJours: 4, nbParticipants: 18, maxParticipants: 20, cout: 12000000, filiale: "BOUA Group", statut: "planifiee", certifiante: false },
  { id: "F002", titre: "Cybersécurité — ISO 27001", categorie: "Technique", formateur: "IT SOLUTIONS CI", lieu: "Présentiel Abidjan", dateDebut: "2026-09-15", dateFin: "2026-09-19", dureeJours: 5, nbParticipants: 12, maxParticipants: 15, cout: 8500000, filiale: "Technologies & Digital", statut: "en_cours", certifiante: true },
  { id: "F003", titre: "Réglementation UEMOA — Fintech", categorie: "Conformité", formateur: "BCEAO Formation", lieu: "En ligne", dateDebut: "2026-09-01", dateFin: "2026-09-05", dureeJours: 5, nbParticipants: 8, maxParticipants: 10, cout: 4200000, filiale: "Fintech", statut: "terminee", certifiante: true },
  { id: "F004", titre: "Excel Avancé & Power BI", categorie: "Outils bureautiques", formateur: "Microsoft Partner CI", lieu: "Présentiel Abidjan", dateDebut: "2026-08-25", dateFin: "2026-08-27", dureeJours: 3, nbParticipants: 24, maxParticipants: 24, cout: 3600000, filiale: "BOUA Group", statut: "terminee", certifiante: false },
  { id: "F005", titre: "Maintenance préventive équipements", categorie: "Technique", formateur: "Formateur interne", lieu: "Usine Abidjan-Nord", dateDebut: "2026-10-06", dateFin: "2026-10-08", dureeJours: 3, nbParticipants: 6, maxParticipants: 12, cout: 1200000, filiale: "Industrie", statut: "planifiee", certifiante: false },
  { id: "F006", titre: "Techniques de vente consultative", categorie: "Commercial", formateur: "Sales Academy CI", lieu: "Abidjan", dateDebut: "2026-10-13", dateFin: "2026-10-14", dureeJours: 2, nbParticipants: 0, maxParticipants: 15, cout: 2800000, filiale: "Distribution", statut: "planifiee", certifiante: false },
];

export const statutFormationColors: Record<StatutFormation, string> = {
  planifiee: "bg-blue-100 text-blue-700",
  en_cours: "bg-amber-100 text-amber-700",
  terminee: "bg-emerald-100 text-emerald-700",
  annulee: "bg-red-100 text-red-500",
};
export const statutFormationLabels: Record<StatutFormation, string> = {
  planifiee: "Planifiée",
  en_cours: "En cours",
  terminee: "Terminée",
  annulee: "Annulée",
};

// ─── Évaluations ───────────────────────────────────────────────────────────
export type StatutEval = "planifie" | "en_cours" | "finalise" | "valide";

export type Evaluation = {
  id: string;
  employe: string;
  matricule: string;
  filiale: string;
  poste: string;
  evaluateur: string;
  periode: string;
  dateEval: string;
  statut: StatutEval;
  noteGlobale: number;
  noteObjectifs: number;
  noteCompetences: number;
  noteComportement: number;
  commentaire: string;
  promotion: boolean;
};

export const evaluations: Evaluation[] = [
  { id: "EV001", employe: "Adjoua KOFFI", matricule: "EMP-002", filiale: "Distribution", poste: "Resp. Commercial", evaluateur: "DG Distribution", periode: "S1 2026", dateEval: "2026-07-10", statut: "valide", noteGlobale: 4.5, noteObjectifs: 4.8, noteCompetences: 4.2, noteComportement: 4.5, commentaire: "Excellente performance commerciale, dépasse régulièrement ses objectifs.", promotion: true },
  { id: "EV002", employe: "Boubacar SIDIBÉ", matricule: "EMP-003", filiale: "Stratégie & Influence", poste: "Consultant Senior", evaluateur: "DG Stratégie", periode: "S1 2026", dateEval: "2026-07-12", statut: "valide", noteGlobale: 4.2, noteObjectifs: 4.0, noteCompetences: 4.5, noteComportement: 4.2, commentaire: "Très bon niveau technique. A mené plusieurs missions stratégiques avec succès.", promotion: false },
  { id: "EV003", employe: "Seydou TRAORÉ", matricule: "EMP-004", filiale: "Industrie", poste: "Ingénieur Prod.", evaluateur: "DG Industrie", periode: "S1 2026", dateEval: "2026-07-15", statut: "valide", noteGlobale: 3.8, noteObjectifs: 3.5, noteCompetences: 4.0, noteComportement: 4.0, commentaire: "Bonne maîtrise technique. Des progrès attendus sur la gestion des délais.", promotion: false },
  { id: "EV004", employe: "Mariam COULIBALY", matricule: "EMP-005", filiale: "Fintech", poste: "Dev. Mobile", evaluateur: "DG Fintech", periode: "S1 2026", dateEval: "2026-07-18", statut: "finalise", noteGlobale: 4.6, noteObjectifs: 4.8, noteCompetences: 4.5, noteComportement: 4.5, commentaire: "Développeuse exceptionnelle. Livrables de haute qualité, toujours dans les délais.", promotion: true },
  { id: "EV005", employe: "Awa DIARRA", matricule: "EMP-006", filiale: "Technologies & Digital", poste: "Chef de Projet", evaluateur: "DG Tech", periode: "S1 2026", dateEval: "2026-07-20", statut: "valide", noteGlobale: 4.0, noteObjectifs: 3.8, noteCompetences: 4.2, noteComportement: 4.0, commentaire: "Bonne coordination des équipes. Gestion efficace des projets transverses.", promotion: false },
  { id: "EV006", employe: "Amara TOURÉ", matricule: "EMP-008", filiale: "Distribution", poste: "Logisticien", evaluateur: "DG Distribution", periode: "S1 2026", dateEval: "2026-09-10", statut: "en_cours", noteGlobale: 0, noteObjectifs: 0, noteCompetences: 0, noteComportement: 0, commentaire: "", promotion: false },
];

export const statutEvalColors: Record<StatutEval, string> = {
  planifie: "bg-gray-100 text-gray-500",
  en_cours: "bg-blue-100 text-blue-700",
  finalise: "bg-amber-100 text-amber-700",
  valide: "bg-emerald-100 text-emerald-700",
};
export const statutEvalLabels: Record<StatutEval, string> = {
  planifie: "Planifié",
  en_cours: "En cours",
  finalise: "Finalisé",
  valide: "Validé",
};
