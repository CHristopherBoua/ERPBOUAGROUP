"use client";

import { ERPLayout } from "@/components/layout/ERPLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { employes, statutColors, statutLabels } from "@/lib/mock/employes";
import { Building2, ChevronDown, ChevronRight, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type OrgNode = {
  id: string;
  prenom: string;
  nom: string;
  poste: string;
  filiale: string;
  statut: string;
  departement: string;
  reports: OrgNode[];
};

function buildTree(): OrgNode[] {
  const nodeMap = new Map<string, OrgNode>();
  for (const e of employes) {
    nodeMap.set(e.id, {
      id: e.id,
      prenom: e.prenom,
      nom: e.nom,
      poste: e.poste,
      filiale: e.filiale,
      statut: e.statut,
      departement: e.departement,
      reports: [],
    });
  }
  const roots: OrgNode[] = [];
  for (const e of employes) {
    const node = nodeMap.get(e.id)!;
    if (e.managerId && nodeMap.has(e.managerId)) {
      nodeMap.get(e.managerId)!.reports.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

function OrgCard({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasReports = node.reports.length > 0;
  const statut = node.statut as keyof typeof statutColors;

  return (
    <div className="flex flex-col items-center">
      {/* Carte */}
      <div
        className={cn(
          "relative bg-white border-2 rounded-xl p-3 w-44 shadow-sm transition-all",
          depth === 0
            ? "border-[color:var(--color-primary)] shadow-[color:var(--color-primary)]/10 shadow-lg"
            : "border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] hover:shadow-md",
          "cursor-default"
        )}
      >
        <div className="flex flex-col items-center text-center gap-1.5">
          <Avatar prenom={node.prenom} nom={node.nom} size="md" />
          <div>
            <p className="text-xs font-bold text-[color:var(--color-foreground)] leading-tight">
              {node.prenom} {node.nom}
            </p>
            <p className="text-xs text-[color:var(--color-muted)] mt-0.5 leading-tight">{node.poste}</p>
            <p className="text-xs text-[color:var(--color-primary)] mt-0.5 font-medium truncate max-w-[140px]">
              {node.filiale}
            </p>
          </div>
          <Badge className={cn("text-xs", statutColors[statut])}>
            {statutLabels[statut]}
          </Badge>
        </div>

        {hasReports && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[color:var(--color-primary)] text-white flex items-center justify-center shadow-sm z-10"
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
        )}
      </div>

      {/* Enfants */}
      {hasReports && expanded && (
        <div className="flex flex-col items-center mt-6">
          {/* Ligne verticale depuis parent */}
          <div className="w-px h-3 bg-[color:var(--color-border)]" />
          {/* Ligne horizontale */}
          <div className="relative flex items-start gap-6 pt-0">
            {node.reports.length > 1 && (
              <div
                className="absolute top-0 left-[50%] h-px bg-[color:var(--color-border)]"
                style={{
                  left: `calc(50% - (${node.reports.length - 1} * 88px))`,
                  width: `${(node.reports.length - 1) * 176}px`,
                }}
              />
            )}
            {node.reports.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-4 bg-[color:var(--color-border)]" />
                <OrgCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrganigrammePage() {
  const tree = buildTree();

  return (
    <ERPLayout title="RH — Organigramme">
      <div className="max-w-[1600px] space-y-5">
        <PageHeader
          title="Organigramme BOUA Group"
          subtitle={`${employes.length} employés · Hiérarchie interactive`}
          icon={Building2}
          actions={
            <div className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
              <Users size={14} />
              <span>{employes.length} collaborateurs</span>
            </div>
          }
          tabs={[
            { label: "Liste", value: "liste" },
            { label: "Organigramme", value: "organigramme" },
          ]}
          activeTab="organigramme"
          onTabChange={(v) => {
            if (v === "liste") window.location.href = "/rh/employes";
          }}
        />

        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-6 overflow-auto">
          <div className="flex flex-col items-center min-w-max pb-8">
            {tree.map((root) => (
              <OrgCard key={root.id} node={root} depth={0} />
            ))}
          </div>
        </div>

        {/* Légende */}
        <div className="bg-white rounded-xl border border-[color:var(--color-border)] p-4">
          <h3 className="text-sm font-semibold text-[color:var(--color-foreground)] mb-3">Légende</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(statutColors).map(([key, cls]) => (
              <div key={key} className="flex items-center gap-2">
                <Badge className={cls}>{statutLabels[key as keyof typeof statutLabels]}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ERPLayout>
  );
}
