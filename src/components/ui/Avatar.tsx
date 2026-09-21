import { cn } from "@/lib/cn";

type AvatarProps = {
  prenom: string;
  nom: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const colorPalette = [
  "bg-[#DC5E13]",
  "bg-[#1565C0]",
  "bg-[#D4A017]",
  "bg-[#6A1B9A]",
  "bg-[#00695C]",
  "bg-[#C62828]",
  "bg-[#4527A0]",
  "bg-[#E65100]",
];

function getColor(nom: string) {
  let hash = 0;
  for (const c of nom) hash = (hash * 31 + c.charCodeAt(0)) % colorPalette.length;
  return colorPalette[Math.abs(hash)];
}

export function Avatar({ prenom, nom, size = "md", className }: AvatarProps) {
  const initiales = `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase();
  const bg = getColor(nom);
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold shrink-0",
        sizeMap[size],
        bg,
        className
      )}
    >
      {initiales}
    </div>
  );
}
