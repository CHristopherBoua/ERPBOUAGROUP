export type Employe = {
  id: string;
  matricule: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  poste: string;
  departement: string;
  filiale: string;
  statut: "actif" | "conge" | "absent" | "formation" | "suspendu";
  dateEmbauche: string;
  salaire: number;
  devise: string;
  managerId: string | null;
  site: string;
  typeContrat: "CDI" | "CDD" | "Stage" | "Prestataire";
  avatar?: string;
  soldeConge: number;
  congesPris: number;
};

export const employes: Employe[] = [
  {
    id: "1", matricule: "BG-001", prenom: "Kouassi", nom: "ATTA",
    email: "k.atta@bouagroup.com", telephone: "+225 07 00 00 01",
    poste: "Directeur Général", departement: "Direction", filiale: "BOUA Group",
    statut: "actif", dateEmbauche: "2018-01-15", salaire: 4500000, devise: "FCFA",
    managerId: null, site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 30, congesPris: 5,
  },
  {
    id: "2", matricule: "BG-012", prenom: "Aminata", nom: "DIALLO",
    email: "a.diallo@bouagroup.com", telephone: "+225 07 00 00 02",
    poste: "DRH Groupe", departement: "Ressources Humaines", filiale: "BOUA Group",
    statut: "actif", dateEmbauche: "2019-03-01", salaire: 2800000, devise: "FCFA",
    managerId: "1", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 28, congesPris: 12,
  },
  {
    id: "3", matricule: "BG-023", prenom: "Serge", nom: "KONAN",
    email: "s.konan@bouagroup.com", telephone: "+225 07 00 00 03",
    poste: "DAF Groupe", departement: "Finance", filiale: "BOUA Group",
    statut: "actif", dateEmbauche: "2019-06-15", salaire: 3100000, devise: "FCFA",
    managerId: "1", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 28, congesPris: 8,
  },
  {
    id: "4", matricule: "FT-001", prenom: "Marie", nom: "KONÉ",
    email: "m.kone@bouafintech.com", telephone: "+225 07 00 00 04",
    poste: "Directrice Fintech", departement: "Direction", filiale: "Fintech",
    statut: "conge", dateEmbauche: "2020-01-10", salaire: 2600000, devise: "FCFA",
    managerId: "1", site: "Abidjan — Plateau", typeContrat: "CDI",
    soldeConge: 26, congesPris: 15,
  },
  {
    id: "5", matricule: "IND-001", prenom: "Mamadou", nom: "COULIBALY",
    email: "m.coulibaly@bouaindustrie.com", telephone: "+225 07 00 00 05",
    poste: "Directeur Industrie", departement: "Direction", filiale: "Industrie",
    statut: "actif", dateEmbauche: "2018-09-01", salaire: 2900000, devise: "FCFA",
    managerId: "1", site: "Abidjan — Zone Industrielle", typeContrat: "CDI",
    soldeConge: 30, congesPris: 7,
  },
  {
    id: "6", matricule: "STRAT-001", prenom: "Isabelle", nom: "YAO",
    email: "i.yao@bouastrategie.com", telephone: "+225 07 00 00 06",
    poste: "Directrice Stratégie", departement: "Direction", filiale: "Stratégie & Influence",
    statut: "actif", dateEmbauche: "2019-11-15", salaire: 2700000, devise: "FCFA",
    managerId: "1", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 28, congesPris: 10,
  },
  {
    id: "7", matricule: "TECH-001", prenom: "Jean-Pierre", nom: "ASSI",
    email: "jp.assi@bouatech.com", telephone: "+225 07 00 00 07",
    poste: "CTO", departement: "Technologie", filiale: "Technologies & Digital",
    statut: "actif", dateEmbauche: "2020-04-01", salaire: 3200000, devise: "FCFA",
    managerId: "1", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 28, congesPris: 4,
  },
  {
    id: "8", matricule: "BG-045", prenom: "Fatou", nom: "TRAORÉ",
    email: "f.traore@bouagroup.com", telephone: "+225 07 00 00 08",
    poste: "Responsable Paie", departement: "Ressources Humaines", filiale: "BOUA Group",
    statut: "actif", dateEmbauche: "2021-02-15", salaire: 1200000, devise: "FCFA",
    managerId: "2", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 25, congesPris: 3,
  },
  {
    id: "9", matricule: "BG-067", prenom: "Hervé", nom: "BOGUI",
    email: "h.bogui@bouagroup.com", telephone: "+225 07 00 00 09",
    poste: "Chargé de recrutement", departement: "Ressources Humaines", filiale: "BOUA Group",
    statut: "formation", dateEmbauche: "2022-07-01", salaire: 850000, devise: "FCFA",
    managerId: "2", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 22, congesPris: 0,
  },
  {
    id: "10", matricule: "IND-023", prenom: "Boubacar", nom: "FOFANA",
    email: "b.fofana@bouaindustrie.com", telephone: "+225 07 00 00 10",
    poste: "Chef de chantier", departement: "Opérations", filiale: "Industrie",
    statut: "actif", dateEmbauche: "2020-08-20", salaire: 950000, devise: "FCFA",
    managerId: "5", site: "San Pedro — Chantier A", typeContrat: "CDI",
    soldeConge: 24, congesPris: 6,
  },
  {
    id: "11", matricule: "FT-015", prenom: "Adèle", nom: "ASSOUAN",
    email: "a.assouan@bouafintech.com", telephone: "+225 07 00 00 11",
    poste: "Développeuse Mobile", departement: "Développement", filiale: "Fintech",
    statut: "actif", dateEmbauche: "2021-09-01", salaire: 980000, devise: "FCFA",
    managerId: "4", site: "Abidjan — Plateau", typeContrat: "CDI",
    soldeConge: 25, congesPris: 2,
  },
  {
    id: "12", matricule: "DIST-007", prenom: "Thierry", nom: "GNAGNE",
    email: "t.gnagne@bouadist.com", telephone: "+225 07 00 00 12",
    poste: "Responsable Commercial", departement: "Ventes", filiale: "Distribution",
    statut: "absent", dateEmbauche: "2021-03-15", salaire: 1100000, devise: "FCFA",
    managerId: "1", site: "Abidjan — HQ", typeContrat: "CDI",
    soldeConge: 25, congesPris: 8,
  },
];

export function getEmployeById(id: string) {
  return employes.find((e) => e.id === id);
}

export const statutLabels: Record<Employe["statut"], string> = {
  actif: "Actif",
  conge: "En congé",
  absent: "Absent",
  formation: "En formation",
  suspendu: "Suspendu",
};

export const statutColors: Record<Employe["statut"], string> = {
  actif: "bg-emerald-100 text-emerald-700",
  conge: "bg-amber-100 text-amber-700",
  absent: "bg-red-100 text-red-700",
  formation: "bg-blue-100 text-blue-700",
  suspendu: "bg-gray-100 text-gray-600",
};
