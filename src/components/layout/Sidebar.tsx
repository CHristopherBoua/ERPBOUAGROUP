"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { navigation, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/cn";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function NavItemRow({
  item,
  depth = 0,
}: {
  item: NavItem;
  depth?: number;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            "text-[color:var(--color-sidebar-text)] hover:bg-[color:var(--color-sidebar-hover)] hover:text-white",
            isActive && "bg-[color:var(--color-sidebar-hover)] text-white",
            depth > 0 && "pl-8"
          )}
        >
          <Icon size={16} className="shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <span className="bg-[color:var(--color-accent)] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
          {expanded ? (
            <ChevronDown size={14} className="shrink-0 opacity-60" />
          ) : (
            <ChevronRight size={14} className="shrink-0 opacity-60" />
          )}
        </button>
        {expanded && (
          <div className="mt-0.5 ml-2 border-l border-[color:var(--color-primary)] pl-2 space-y-0.5">
            {item.children!.map((child) => (
              <NavItemRow key={child.href} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        "text-[color:var(--color-sidebar-text)] hover:bg-[color:var(--color-sidebar-hover)] hover:text-white",
        isActive && "bg-[color:var(--color-accent)] text-white font-medium",
        depth > 0 && "pl-8"
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="bg-[color:var(--color-accent)] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-30 flex flex-col",
          "bg-[color:var(--color-sidebar-bg)] transition-transform duration-300",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[color:var(--color-primary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-28 h-8 flex items-center">
              <Image
                src="/logo-boua.svg"
                alt="BOUA Group"
                width={112}
                height={32}
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-[color:var(--color-sidebar-text)] hover:text-white p-1 rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              {section.title && (
                <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-sidebar-text)] opacity-50 px-3 mb-2">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItemRow key={item.href} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer utilisateur */}
        <div className="px-4 py-3 border-t border-[color:var(--color-primary)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[color:var(--color-primary-light)] flex items-center justify-center text-white text-xs font-bold">
              DG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Directeur Général</p>
              <p className="text-[color:var(--color-sidebar-text)] text-xs truncate opacity-70">admin@bouagroup.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
