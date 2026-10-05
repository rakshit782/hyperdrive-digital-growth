import type { CaseStudy } from "@/hooks/useCaseStudies";
import { CaseStudyCard, CaseStudyCardSkeleton } from "@/components/case-studies/CaseStudyCard";

export function CaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studies.map((study) => (
        <li key={study.id || study.slug} className="h-full">
          <CaseStudyCard study={study} />
        </li>
      ))}
    </ul>
  );
}

export function CaseStudySkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <CaseStudyCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
