"use client";

import { Menu, Bell, Search, ChevronDown, Globe } from "lucide-react";
import { useState } from "react";

type TopbarProps = {
  onMenuClick: () => void;
  title: string;
};

export function Topbar({ onMenuClick, title }: TopbarProps) {
  const [lang, setLang] = useState<"FR" | "EN">("FR");

  return (
    <header className="h-14 bg-white border-b border-[color:var(--color-border)] flex items-center px-4 gap-3 shrink-0">
      {/* Menu burger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Titre de page */}
      <h1 className="font-semibold text-[color:var(--color-foreground)] text-sm lg:text-base truncate">
        {title}
      </h1>

      <div className="flex-1" />

      {/* Barre de recherche — desktop uniquement */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 w-56">
        <Search size={14} className="text-[color:var(--color-muted)] shrink-0" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="bg-transparent text-sm outline-none flex-1 text-[color:var(--color-foreground)] placeholder:text-[color:var(--color-muted)]"
        />
      </div>

      {/* Filiale active */}
      <button className="hidden sm:flex items-center gap-1.5 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] bg-gray-100 rounded-lg px-3 py-1.5 transition-colors">
        <span className="font-medium">Toutes filiales</span>
        <ChevronDown size={13} />
      </button>

      {/* Langue */}
      <button
        onClick={() => setLang((l) => (l === "FR" ? "EN" : "FR"))}
        className="flex items-center gap-1 text-xs font-semibold text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe size={15} />
        <span>{lang}</span>
      </button>

      {/* Notifications */}
      <button className="relative text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
        <Bell size={18} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-[color:var(--color-accent)] rounded-full" />
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-[color:var(--color-primary)] flex items-center justify-center text-white text-xs font-bold cursor-pointer">
        DG
      </div>
    </header>
  );
}
