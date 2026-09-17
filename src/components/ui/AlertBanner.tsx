import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/cn";

type AlertLevel = "info" | "warning" | "danger" | "success";

export type Alert = {
  id: string;
  level: AlertLevel;
  title: string;
  description?: string;
  time?: string;
};

const styles: Record<AlertLevel, { bg: string; border: string; icon: string; Icon: typeof Info }> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    Icon: Info,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    Icon: AlertTriangle,
  },
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    Icon: XCircle,
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    Icon: CheckCircle,
  },
};

export function AlertItem({ alert, onDismiss }: { alert: Alert; onDismiss?: (id: string) => void }) {
  const s = styles[alert.level];
  const { Icon } = s;

  return (
    <div className={cn("flex items-start gap-3 p-3 rounded-lg border", s.bg, s.border)}>
      <Icon size={16} className={cn("mt-0.5 shrink-0", s.icon)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[color:var(--color-foreground)]">{alert.title}</p>
        {alert.description && (
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{alert.description}</p>
        )}
        {alert.time && (
          <p className="text-xs text-[color:var(--color-muted)] mt-1 opacity-60">{alert.time}</p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(alert.id)}
          className="shrink-0 text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] p-0.5 rounded transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export function AlertList({ alerts, onDismiss }: { alerts: Alert[]; onDismiss?: (id: string) => void }) {
  if (alerts.length === 0) return null;
  return (
    <div className="space-y-2">
      {alerts.map((a) => (
        <AlertItem key={a.id} alert={a} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
