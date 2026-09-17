import {
  LayoutDashboard,
  Users,
  DollarSign,
  ShoppingCart,
  Factory,
  Wrench,
  Shield,
  Settings,
  Building2,
  TrendingUp,
  Clock,
  CalendarDays,
  Banknote,
  UserPlus,
  GraduationCap,
  Star,
  FileText,
  Receipt,
  PiggyBank,
  BarChart3,
  Landmark,
  Package,
  Tag,
  Truck,
  Award,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    title: "",
    items: [
      {
        label: "Tableau de bord",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Ressources Humaines",
    items: [
      {
        label: "Employés",
        href: "/rh/employes",
        icon: Users,
        children: [
          { label: "Liste des employés", href: "/rh/employes", icon: Users },
          { label: "Organigramme", href: "/rh/organigramme", icon: Building2 },
          { label: "Recrutement", href: "/rh/recrutement", icon: UserPlus },
        ],
      },
      {
        label: "Présences",
        href: "/rh/presences",
        icon: Clock,
        children: [
          { label: "Pointages", href: "/rh/presences/pointages", icon: Clock },
          { label: "Planning", href: "/rh/presences/planning", icon: CalendarDays },
        ],
      },
      {
        label: "Congés & Absences",
        href: "/rh/conges",
        icon: CalendarDays,
        badge: "3",
      },
      {
        label: "Paie",
        href: "/rh/paie",
        icon: Banknote,
        children: [
          { label: "Bulletins de paie", href: "/rh/paie/bulletins", icon: FileText },
          { label: "Déclarations", href: "/rh/paie/declarations", icon: Receipt },
        ],
      },
      {
        label: "Formations",
        href: "/rh/formations",
        icon: GraduationCap,
      },
      {
        label: "Évaluations",
        href: "/rh/evaluations",
        icon: Star,
      },
    ],
  },
  {
    title: "Finance & Comptabilité",
    items: [
      {
        label: "Tableau de trésorerie",
        href: "/finance/tresorerie",
        icon: TrendingUp,
      },
      {
        label: "Transactions",
        href: "/finance/transactions",
        icon: DollarSign,
      },
      {
        label: "Budgets",
        href: "/finance/budgets",
        icon: PiggyBank,
      },
      {
        label: "Facturation",
        href: "/finance/facturation",
        icon: Receipt,
        children: [
          { label: "Factures clients", href: "/finance/facturation/clients", icon: FileText },
          { label: "Reçus de paiement", href: "/finance/facturation/recus", icon: Receipt },
          { label: "Notes de frais", href: "/finance/facturation/frais", icon: Receipt },
        ],
      },
      {
        label: "États financiers",
        href: "/finance/etats",
        icon: BarChart3,
        children: [
          { label: "Compte de résultat", href: "/finance/etats/resultat", icon: BarChart3 },
          { label: "Bilan", href: "/finance/etats/bilan", icon: Landmark },
          { label: "Grand Livre", href: "/finance/etats/grand-livre", icon: FileText },
        ],
      },
    ],
  },
  {
    title: "Commercial & CRM",
    items: [
      {
        label: "Clients & Prospects",
        href: "/commercial/clients",
        icon: Users,
      },
      {
        label: "Pipeline commercial",
        href: "/commercial/pipeline",
        icon: TrendingUp,
      },
      {
        label: "Devis & Commandes",
        href: "/commercial/devis",
        icon: ShoppingCart,
      },
      {
        label: "Catalogue produits",
        href: "/commercial/catalogue",
        icon: Package,
        children: [
          { label: "Produits", href: "/commercial/catalogue/produits", icon: Tag },
          { label: "Catégories", href: "/commercial/catalogue/categories", icon: Boxes },
          { label: "Livraisons", href: "/commercial/catalogue/livraisons", icon: Truck },
        ],
      },
      {
        label: "Commissions",
        href: "/commercial/commissions",
        icon: Award,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        label: "Filiales & Structure",
        href: "/admin/filiales",
        icon: Building2,
      },
      {
        label: "Sécurité & Accès",
        href: "/admin/securite",
        icon: Shield,
      },
      {
        label: "Paramètres",
        href: "/admin/parametres",
        icon: Settings,
      },
    ],
  },
];
