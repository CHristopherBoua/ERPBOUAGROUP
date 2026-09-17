import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  tabs?: { label: string; value: string; badge?: string }[];
  activeTab?: string;
  onTabChange?: (v: string) => void;
};

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  actions,
  tabs,
  activeTab,
  onTabChange,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-[color:var(--color-primary)] flex items-center justify-center shrink-0">
              <Icon size={18} className="text-white" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-[color:var(--color-foreground)]">{title}</h2>
            {subtitle && (
              <p className="text-sm text-[color:var(--color-muted)] mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {tabs && tabs.length > 0 && (
        <div className="flex gap-1 border-b border-[color:var(--color-border)]">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange?.(tab.value)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.value
                  ? "border-[color:var(--color-primary)] text-[color:var(--color-primary)]"
                  : "border-transparent text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)]"
              )}
            >
              {tab.label}
              {tab.badge && (
                <span className="bg-[color:var(--color-accent)] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
