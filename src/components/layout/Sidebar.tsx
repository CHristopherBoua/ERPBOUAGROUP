import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  CircleDollarSign, 
  Briefcase, 
  Wrench, 
  ShoppingCart, 
  Truck, 
  ShieldAlert, 
  MonitorSmartphone, 
  FileText, 
  BarChart3, 
  Settings 
} from "lucide-react";

const navItems = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Ressources Humaines", href: "/hrm", icon: Users },
  { name: "Finance & Compta", href: "/finance", icon: CircleDollarSign },
  { name: "Commercial & Ventes", href: "/crm", icon: Briefcase },
  { name: "Technique & Chantiers", href: "/logistics", icon: Wrench },
  { name: "Achats & Stocks", href: "/procurement", icon: ShoppingCart },
  { name: "Parc Matériel", href: "/assets", icon: Truck },
  { name: "QHSE", href: "/qhse", icon: ShieldAlert },
  { name: "IT & Support", href: "/it", icon: MonitorSmartphone },
  { name: "Gouvernance", href: "/governance", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Administration", href: "/admin", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary text-primary-foreground h-full flex flex-col shadow-xl">
      <div className="h-16 flex items-center justify-center border-b border-primary-foreground/10 px-4">
        <h1 className="text-xl font-bold tracking-tight">BOUA GROUP</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary-foreground/10 transition-colors text-sm font-medium"
                >
                  <Icon className="w-5 h-5 opacity-80" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-primary-foreground/10 text-xs text-primary-foreground/60 text-center">
        © 2026 BOUA GROUP ERP
      </div>
    </aside>
  );
}
