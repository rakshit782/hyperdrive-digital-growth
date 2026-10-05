import type { CaseStudy } from "@/hooks/useCaseStudies";

export function brandInitials(brand: string): string {
  const parts = brand.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

export function moreCaseStudies(rows: CaseStudy[], current: CaseStudy): CaseStudy[] {
  const others = rows.filter((study) => study.slug !== current.slug);
  const same = others.filter((study) => study.channel === current.channel);
  const rest = others.filter((study) => study.channel !== current.channel);
  return [...same, ...rest].slice(0, 3);
}
