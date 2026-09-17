import { FileText, UserCheck, AlertTriangle, DollarSign, Package, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Activity = {
  id: string;
  type: "facture" | "conge" | "alerte" | "paiement" | "stock";
  title: string;
  description: string;
  time: string;
  filiale: string;
};

const typeMap: Record<
  Activity["type"],
  { Icon: LucideIcon; bg: string; text: string }
> = {
  facture: { Icon: FileText, bg: "bg-blue-100", text: "text-blue-600" },
  conge: { Icon: UserCheck, bg: "bg-green-100", text: "text-green-600" },
  alerte: { Icon: AlertTriangle, bg: "bg-amber-100", text: "text-amber-600" },
  paiement: { Icon: DollarSign, bg: "bg-emerald-100", text: "text-emerald-700" },
  stock: { Icon: Package, bg: "bg-red-100", text: "text-red-600" },
};

const activities: Activity[] = [
  {
    id: "1",
    type: "paiement",
    title: "Virement reçu — SONATEL",
    description: "Facture #INV-2024-0821 réglée",
    time: "Il y a 12 min",
    filiale: "Distribution",
  },
  {
    id: "2",
    type: "conge",
    title: "Congé validé — Marie Koné",
    description: "15 jours à partir du 20/09",
    time: "Il y a 38 min",
    filiale: "RH · Fintech",
  },
  {
    id: "3",
    type: "alerte",
    title: "Stock critique — Pompes centrifuges",
    description: "Quantité : 3 / Min : 10",
    time: "Il y a 1h",
    filiale: "Industrie",
  },
  {
    id: "4",
    type: "facture",
    title: "Devis envoyé — BSIC Groupe",
    description: "Prestation conseil — 45M FCFA",
    time: "Il y a 2h",
    filiale: "Stratégie",
  },
  {
    id: "5",
    type: "paiement",
    title: "Salaires virés — Sept 2026",
    description: "970 bulletins traités",
    time: "Il y a 3h",
    filiale: "Paie",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[color:var(--color-foreground)]">Activité récente</h3>
        <button className="text-xs text-[color:var(--color-primary)] hover:underline font-medium">
          Voir tout
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((a) => {
          const { Icon, bg, text } = typeMap[a.type];
          return (
            <div key={a.id} className="flex items-start gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", bg)}>
                <Icon size={15} className={text} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[color:var(--color-foreground)] truncate">
                  {a.title}
                </p>
                <p className="text-xs text-[color:var(--color-muted)] truncate">{a.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[color:var(--color-muted)] opacity-60">{a.time}</span>
                  <span className="text-xs text-[color:var(--color-primary)] bg-[#E8F5E9] px-1.5 py-0.5 rounded-full">
                    {a.filiale}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
