export type TypeContact = "client" | "prospect";
export type StatutPipeline = "actif" | "inactif" | "perdu" | "chaud";
export type EtapePipeline = "prospection" | "qualification" | "proposition" | "negociation" | "closing" | "gagne" | "perdu";
export type StatutDevis = "brouillon" | "envoye" | "accepte" | "refuse" | "expire";
export type StatutCommission = "en_cours" | "validee" | "payee";

export type Client = {
  id: string;
  nom: string;
  type: TypeContact;
  secteur: string;
  filiale: string;
  caAnnuel: number;
  statutCrm: StatutPipeline;
  contact: string;
  email: string;
  telephone: string;
  ville: string;
  pays: string;
  dateCreation: string;
  commercial: string;
  nbOpportunites: number;
};

export type Opportunite = {
  id: string;
  titre: string;
  client: string;
  valeur: number;
  probabilite: number;
  etape: EtapePipeline;
  filiale: string;
  commercial: string;
  dateCreation: string;
  dateCloturePrevue: string;
  description: string;
};

export type LigneDevis = {
  designation: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
};

export type Devis = {
  id: string;
  numero: string;
  client: string;
  date: string;
  dateValidite: string;
  montantHT: number;
  tva: number;
  montantTTC: number;
  statut: StatutDevis;
  commercial: string;
  filiale: string;
  objet: string;
};

export type Produit = {
  id: string;
  reference: string;
  nom: string;
  categorie: string;
  prixUnitaire: number;
  unite: string;
  stock: number;
  filiale: string;
  actif: boolean;
  description: string;
};

export type Commission = {
  id: string;
  commercial: string;
  filiale: string;
  periode: string;
  caRealise: number;
  caObjectif: number;
  taux: number;
  montant: number;
  statut: StatutCommission;
  avatar?: string;
};

export const clients: Client[] = [
  { id: "C001", nom: "SGBCI", type: "client", secteur: "Banque & Finance", filiale: "Fintech", caAnnuel: 285000000, statutCrm: "actif", contact: "Konan DIALLO", email: "k.diallo@sgbci.ci", telephone: "+225 27 20 30 40 50", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2024-03-15", commercial: "Adjoua KOFFI", nbOpportunites: 3 },
  { id: "C002", nom: "PETROCI", type: "client", secteur: "Énergie & Pétrole", filiale: "Distribution", caAnnuel: 540000000, statutCrm: "actif", contact: "Amara TOURÉ", email: "a.toure@petroci.ci", telephone: "+225 27 21 50 60 70", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2023-07-20", commercial: "Boubacar SIDIBÉ", nbOpportunites: 5 },
  { id: "C003", nom: "Orange CI", type: "client", secteur: "Télécommunications", filiale: "Technologies & Digital", caAnnuel: 175000000, statutCrm: "actif", contact: "Mariam COULIBALY", email: "m.coulibaly@orange.ci", telephone: "+225 27 22 10 20 30", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2024-01-10", commercial: "Adjoua KOFFI", nbOpportunites: 2 },
  { id: "C004", nom: "SIFCA Groupe", type: "client", secteur: "Agro-industrie", filiale: "Industrie", caAnnuel: 320000000, statutCrm: "actif", contact: "Jean-Paul GNAORÉ", email: "jp.gnaore@sifca.ci", telephone: "+225 27 24 70 80 90", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2023-11-05", commercial: "Seydou TRAORÉ", nbOpportunites: 4 },
  { id: "C005", nom: "BSIC Groupe", type: "client", secteur: "Banque & Finance", filiale: "Stratégie & Influence", caAnnuel: 95000000, statutCrm: "actif", contact: "Fatou BAMBA", email: "f.bamba@bsic.ci", telephone: "+225 27 20 11 22 33", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2024-05-18", commercial: "Boubacar SIDIBÉ", nbOpportunites: 1 },
  { id: "C006", nom: "MTN Côte d'Ivoire", type: "prospect", secteur: "Télécommunications", filiale: "Fintech", caAnnuel: 0, statutCrm: "chaud", contact: "Ibrahim KEITA", email: "i.keita@mtn.ci", telephone: "+225 27 23 40 50 60", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2026-07-12", commercial: "Adjoua KOFFI", nbOpportunites: 2 },
  { id: "C007", nom: "SUCAF CI", type: "prospect", secteur: "Agro-industrie", filiale: "Industrie", caAnnuel: 0, statutCrm: "chaud", contact: "Awa DIARRA", email: "a.diarra@sucaf.ci", telephone: "+225 27 25 60 70 80", ville: "Yamoussoukro", pays: "Côte d'Ivoire", dateCreation: "2026-08-03", commercial: "Seydou TRAORÉ", nbOpportunites: 1 },
  { id: "C008", nom: "Bank of Africa", type: "prospect", secteur: "Banque & Finance", filiale: "Fintech", caAnnuel: 0, statutCrm: "actif", contact: "Cheikh NDIAYE", email: "c.ndiaye@boacigroup.com", telephone: "+225 27 20 88 99 10", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2026-06-22", commercial: "Boubacar SIDIBÉ", nbOpportunites: 3 },
  { id: "C009", nom: "SODECI", type: "client", secteur: "Services publics", filiale: "Distribution", caAnnuel: 62000000, statutCrm: "actif", contact: "Paul ZÉRÉDOU", email: "p.zeredou@sodeci.ci", telephone: "+225 27 21 60 70 80", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2024-09-01", commercial: "Seydou TRAORÉ", nbOpportunites: 2 },
  { id: "C010", nom: "Moov Africa CI", type: "prospect", secteur: "Télécommunications", filiale: "Fintech", caAnnuel: 0, statutCrm: "inactif", contact: "Rokia SANOGO", email: "r.sanogo@moov.ci", telephone: "+225 27 27 10 20 30", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2026-04-15", commercial: "Adjoua KOFFI", nbOpportunites: 0 },
  { id: "C011", nom: "CFAO Motors", type: "client", secteur: "Distribution automobile", filiale: "Distribution", caAnnuel: 145000000, statutCrm: "actif", contact: "Lamine DIOUF", email: "l.diouf@cfaomotors.ci", telephone: "+225 27 20 44 55 66", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2023-05-20", commercial: "Boubacar SIDIBÉ", nbOpportunites: 2 },
  { id: "C012", nom: "Ecobank CI", type: "prospect", secteur: "Banque & Finance", filiale: "Fintech", caAnnuel: 0, statutCrm: "chaud", contact: "Minata KOUYATÉ", email: "m.kouyate@ecobank.com", telephone: "+225 27 20 66 77 88", ville: "Abidjan", pays: "Côte d'Ivoire", dateCreation: "2026-09-01", commercial: "Adjoua KOFFI", nbOpportunites: 2 },
];

export const opportunites: Opportunite[] = [
  { id: "O001", titre: "Déploiement plateforme mobile banking v2", client: "MTN Côte d'Ivoire", valeur: 180000000, probabilite: 75, etape: "negociation", filiale: "Fintech", commercial: "Adjoua KOFFI", dateCreation: "2026-07-20", dateCloturePrevue: "2026-10-30", description: "Extension de la plateforme mobile banking existante" },
  { id: "O002", titre: "Fourniture 50 pompes centrifuges 2027", client: "PETROCI", valeur: 320000000, probabilite: 60, etape: "proposition", filiale: "Distribution", commercial: "Boubacar SIDIBÉ", dateCreation: "2026-08-05", dateCloturePrevue: "2026-11-15", description: "Contrat annuel de fourniture équipements industriels" },
  { id: "O003", titre: "Conseil transformation numérique", client: "Bank of Africa", valeur: 95000000, probabilite: 40, etape: "qualification", filiale: "Stratégie & Influence", commercial: "Boubacar SIDIBÉ", dateCreation: "2026-08-15", dateCloturePrevue: "2026-12-01", description: "Programme de transformation digitale 18 mois" },
  { id: "O004", titre: "ERP gestion sucrière intégrée", client: "SUCAF CI", valeur: 145000000, probabilite: 55, etape: "proposition", filiale: "Technologies & Digital", commercial: "Seydou TRAORÉ", dateCreation: "2026-08-20", dateCloturePrevue: "2026-11-30", description: "Intégration ERP chaîne de production sucrière" },
  { id: "O005", titre: "Audit stratégique & plan de croissance", client: "Ecobank CI", valeur: 62000000, probabilite: 80, etape: "negociation", filiale: "Stratégie & Influence", commercial: "Adjoua KOFFI", dateCreation: "2026-09-02", dateCloturePrevue: "2026-10-15", description: "Audit stratégique filiales Afrique de l'Ouest" },
  { id: "O006", titre: "Maintenance industrielle annuelle", client: "SIFCA Groupe", valeur: 88000000, probabilite: 90, etape: "closing", filiale: "Industrie", commercial: "Seydou TRAORÉ", dateCreation: "2026-09-05", dateCloturePrevue: "2026-10-01", description: "Renouvellement contrat maintenance usines" },
  { id: "O007", titre: "Formation équipes IT avancée", client: "Orange CI", valeur: 28000000, probabilite: 85, etape: "closing", filiale: "Technologies & Digital", commercial: "Adjoua KOFFI", dateCreation: "2026-09-08", dateCloturePrevue: "2026-09-30", description: "Programme formation cybersécurité 60 collaborateurs" },
  { id: "O008", titre: "Prospection réseau fintech Sénégal", client: "Bank of Africa", valeur: 0, probabilite: 15, etape: "prospection", filiale: "Fintech", commercial: "Boubacar SIDIBÉ", dateCreation: "2026-09-10", dateCloturePrevue: "2027-02-28", description: "Extension services fintech marché sénégalais" },
  { id: "O009", titre: "Équipements réfrigération industrielle", client: "SODECI", valeur: 42000000, probabilite: 50, etape: "qualification", filiale: "Distribution", commercial: "Seydou TRAORÉ", dateCreation: "2026-08-28", dateCloturePrevue: "2026-11-20", description: "Fourniture groupes froid et maintenance" },
  { id: "O010", titre: "Veille concurrentielle sectorielle", client: "BSIC Groupe", valeur: 18000000, probabilite: 70, etape: "proposition", filiale: "Stratégie & Influence", commercial: "Boubacar SIDIBÉ", dateCreation: "2026-09-12", dateCloturePrevue: "2026-10-25", description: "Rapport veille marché bancaire UEMOA" },
];

export const devis: Devis[] = [
  { id: "DV001", numero: "DV-2026-0087", client: "MTN Côte d'Ivoire", date: "2026-09-10", dateValidite: "2026-10-10", montantHT: 152542373, tva: 27457627, montantTTC: 180000000, statut: "envoye", commercial: "Adjoua KOFFI", filiale: "Fintech", objet: "Déploiement plateforme mobile banking v2" },
  { id: "DV002", numero: "DV-2026-0086", client: "PETROCI", date: "2026-09-05", dateValidite: "2026-10-05", montantHT: 271186441, tva: 48813559, montantTTC: 320000000, statut: "envoye", commercial: "Boubacar SIDIBÉ", filiale: "Distribution", objet: "Fourniture 50 pompes centrifuges 2027" },
  { id: "DV003", numero: "DV-2026-0084", client: "SIFCA Groupe", date: "2026-09-08", dateValidite: "2026-09-28", montantHT: 74576271, tva: 13423729, montantTTC: 88000000, statut: "accepte", commercial: "Seydou TRAORÉ", filiale: "Industrie", objet: "Renouvellement contrat maintenance usines" },
  { id: "DV004", numero: "DV-2026-0083", client: "Orange CI", date: "2026-09-06", dateValidite: "2026-09-26", montantHT: 23728814, tva: 4271186, montantTTC: 28000000, statut: "accepte", commercial: "Adjoua KOFFI", filiale: "Technologies & Digital", objet: "Formation équipes IT cybersécurité" },
  { id: "DV005", numero: "DV-2026-0081", client: "Bank of Africa", date: "2026-08-28", dateValidite: "2026-09-27", montantHT: 80508475, tva: 14491525, montantTTC: 95000000, statut: "envoye", commercial: "Boubacar SIDIBÉ", filiale: "Stratégie & Influence", objet: "Conseil transformation numérique" },
  { id: "DV006", numero: "DV-2026-0078", client: "SUCAF CI", date: "2026-08-20", dateValidite: "2026-09-19", montantHT: 122881356, tva: 22118644, montantTTC: 145000000, statut: "expire", commercial: "Seydou TRAORÉ", filiale: "Technologies & Digital", objet: "ERP gestion sucrière intégrée" },
  { id: "DV007", numero: "DV-2026-0090", client: "Ecobank CI", date: "2026-09-15", dateValidite: "2026-10-15", montantHT: 52542373, tva: 9457627, montantTTC: 62000000, statut: "brouillon", commercial: "Adjoua KOFFI", filiale: "Stratégie & Influence", objet: "Audit stratégique & plan de croissance" },
  { id: "DV008", numero: "DV-2026-0076", client: "CFAO Motors", date: "2026-08-10", dateValidite: "2026-09-09", montantHT: 38135593, tva: 6864407, montantTTC: 45000000, statut: "refuse", commercial: "Boubacar SIDIBÉ", filiale: "Distribution", objet: "Logistique et traçabilité véhicules" },
];

export const produits: Produit[] = [
  { id: "P001", reference: "IND-PMP-001", nom: "Pompe centrifuge 50L/s", categorie: "Équipements industriels", prixUnitaire: 6400000, unite: "unité", stock: 24, filiale: "Distribution", actif: true, description: "Pompe centrifuge haute pression, débit 50L/s, INOX" },
  { id: "P002", reference: "IND-GRP-002", nom: "Groupe frigorifique 20kW", categorie: "Équipements industriels", prixUnitaire: 12800000, unite: "unité", stock: 8, filiale: "Distribution", actif: true, description: "Groupe froid industriel 20kW, R410A, IP55" },
  { id: "P003", reference: "IND-GEN-003", nom: "Générateur 500 kVA", categorie: "Équipements industriels", prixUnitaire: 48000000, unite: "unité", stock: 3, filiale: "Distribution", actif: true, description: "Groupe électrogène industriel 500 kVA, diesel" },
  { id: "P004", reference: "TECH-FRM-001", nom: "Formation cybersécurité (30 pers.)", categorie: "Formation & Conseil", prixUnitaire: 4800000, unite: "session", stock: 999, filiale: "Technologies & Digital", actif: true, description: "Programme 5 jours, certifiant, en présentiel" },
  { id: "P005", reference: "TECH-AUD-001", nom: "Audit infrastructure SI", categorie: "Formation & Conseil", prixUnitaire: 18000000, unite: "prestation", stock: 999, filiale: "Technologies & Digital", actif: true, description: "Audit complet infrastructure IT + rapport détaillé" },
  { id: "P006", reference: "TECH-DEV-001", nom: "Développement application mobile", categorie: "Développement logiciel", prixUnitaire: 35000000, unite: "projet", stock: 999, filiale: "Technologies & Digital", actif: true, description: "App iOS + Android, UX/UI inclus, 3 mois" },
  { id: "P007", reference: "FIN-MBA-001", nom: "Module Mobile Banking API", categorie: "Fintech Solutions", prixUnitaire: 25000000, unite: "licence/an", stock: 999, filiale: "Fintech", actif: true, description: "Intégration API mobile banking, support 12 mois" },
  { id: "P008", reference: "FIN-KYC-001", nom: "Solution KYC Numérique", categorie: "Fintech Solutions", prixUnitaire: 18500000, unite: "licence/an", stock: 999, filiale: "Fintech", actif: true, description: "Vérification d'identité biométrique, conformité UEMOA" },
  { id: "P009", reference: "STR-CON-001", nom: "Conseil stratégique (journée)", categorie: "Conseil & Stratégie", prixUnitaire: 2500000, unite: "jour", stock: 999, filiale: "Stratégie & Influence", actif: true, description: "Accompagnement Directeur Senior, dossier inclus" },
  { id: "P010", reference: "STR-VEL-001", nom: "Rapport de veille sectorielle", categorie: "Conseil & Stratégie", prixUnitaire: 8500000, unite: "rapport", stock: 999, filiale: "Stratégie & Influence", actif: true, description: "Analyse marché, concurrence, recommandations" },
  { id: "P011", reference: "IND-MAI-001", nom: "Contrat maintenance annuelle", categorie: "Maintenance industrielle", prixUnitaire: 22000000, unite: "contrat/an", stock: 999, filiale: "Industrie", actif: true, description: "Maintenance préventive + curative, astreinte 24h" },
  { id: "P012", reference: "IND-SPA-001", nom: "Pièces de rechange catalogue", categorie: "Maintenance industrielle", prixUnitaire: 850000, unite: "lot", stock: 145, filiale: "Industrie", actif: true, description: "Catalogue pièces détachées équipements Industrie" },
];

export const commissions: Commission[] = [
  { id: "CM001", commercial: "Adjoua KOFFI", filiale: "Fintech / Tech", periode: "Septembre 2026", caRealise: 285000000, caObjectif: 250000000, taux: 3.5, montant: 9975000, statut: "en_cours" },
  { id: "CM002", commercial: "Boubacar SIDIBÉ", filiale: "Distribution / Stratégie", periode: "Septembre 2026", caRealise: 710000000, caObjectif: 650000000, taux: 2.8, montant: 19880000, statut: "en_cours" },
  { id: "CM003", commercial: "Seydou TRAORÉ", filiale: "Industrie / Distribution", periode: "Septembre 2026", caRealise: 195000000, caObjectif: 220000000, taux: 3.0, montant: 5850000, statut: "en_cours" },
  { id: "CM004", commercial: "Adjoua KOFFI", filiale: "Fintech / Tech", periode: "Août 2026", caRealise: 242000000, caObjectif: 250000000, taux: 3.5, montant: 8470000, statut: "validee" },
  { id: "CM005", commercial: "Boubacar SIDIBÉ", filiale: "Distribution / Stratégie", periode: "Août 2026", caRealise: 680000000, caObjectif: 650000000, taux: 2.8, montant: 19040000, statut: "payee" },
  { id: "CM006", commercial: "Seydou TRAORÉ", filiale: "Industrie / Distribution", periode: "Août 2026", caRealise: 188000000, caObjectif: 220000000, taux: 3.0, montant: 5640000, statut: "payee" },
];

export const statutCrmColors: Record<StatutPipeline, string> = {
  actif: "bg-emerald-100 text-emerald-700",
  chaud: "bg-amber-100 text-amber-700",
  inactif: "bg-gray-100 text-gray-500",
  perdu: "bg-red-100 text-red-600",
};
export const statutCrmLabels: Record<StatutPipeline, string> = {
  actif: "Client actif",
  chaud: "Prospect chaud",
  inactif: "Inactif",
  perdu: "Perdu",
};

export const etapeColors: Record<EtapePipeline, string> = {
  prospection: "bg-gray-100 text-gray-600",
  qualification: "bg-blue-100 text-blue-700",
  proposition: "bg-violet-100 text-violet-700",
  negociation: "bg-amber-100 text-amber-700",
  closing: "bg-orange-100 text-orange-700",
  gagne: "bg-emerald-100 text-emerald-700",
  perdu: "bg-red-100 text-red-600",
};
export const etapeLabels: Record<EtapePipeline, string> = {
  prospection: "Prospection",
  qualification: "Qualification",
  proposition: "Proposition",
  negociation: "Négociation",
  closing: "Closing",
  gagne: "Gagné",
  perdu: "Perdu",
};

export const statutDevisColors: Record<StatutDevis, string> = {
  brouillon: "bg-gray-100 text-gray-500",
  envoye: "bg-blue-100 text-blue-700",
  accepte: "bg-emerald-100 text-emerald-700",
  refuse: "bg-red-100 text-red-600",
  expire: "bg-amber-100 text-amber-700",
};
export const statutDevisLabels: Record<StatutDevis, string> = {
  brouillon: "Brouillon",
  envoye: "Envoyé",
  accepte: "Accepté",
  refuse: "Refusé",
  expire: "Expiré",
};

export const statutCommissionColors: Record<StatutCommission, string> = {
  en_cours: "bg-blue-100 text-blue-700",
  validee: "bg-amber-100 text-amber-700",
  payee: "bg-emerald-100 text-emerald-700",
};
export const statutCommissionLabels: Record<StatutCommission, string> = {
  en_cours: "En cours",
  validee: "Validée",
  payee: "Payée",
};

export function formatMontantCom(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} Mrd FCFA`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} M FCFA`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)} K FCFA`;
  return `${n.toLocaleString("fr-FR")} FCFA`;
}
