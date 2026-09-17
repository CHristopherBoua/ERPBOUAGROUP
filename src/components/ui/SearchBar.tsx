"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
};

export function SearchBar({ placeholder = "Rechercher...", value, onChange, className }: SearchBarProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search size={15} className="absolute left-3 text-[color:var(--color-muted)] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 rounded-lg border border-[color:var(--color-border)] bg-white text-sm text-[color:var(--color-foreground)] placeholder:text-[color:var(--color-muted)] outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-shadow"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2.5 text-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)] transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

type FilterSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  className?: string;
};

export function FilterSelect({ value, onChange, options, className }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "py-2 px-3 rounded-lg border border-[color:var(--color-border)] bg-white text-sm text-[color:var(--color-foreground)] outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] transition-shadow cursor-pointer",
        className
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
