import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  canShowReviewsBadge,
  reviewSourceLabel,
  reviewsBadgeAriaLabel,
  useSiteSettings,
  type SiteSettings,
} from "@/hooks/useSiteSettings";

export function ReviewsBadge({
  settings,
  className,
}: {
  settings: SiteSettings;
  className?: string;
}) {
  if (!canShowReviewsBadge(settings)) return null;

  const score = settings.rating_value.toFixed(1);
  const source = reviewSourceLabel(settings.review_source_url);
  const noun = settings.review_count === 1 ? "review" : "reviews";

  return (
    <a
      href={settings.review_source_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={reviewsBadgeAriaLabel(settings)}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1",
        "min-h-11 -my-3 text-sm font-medium text-gray-800 hover:text-gray-950",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700",
        className,
      )}
    >
      <Star className="h-4 w-4 shrink-0 fill-yellow-500 text-yellow-600" aria-hidden="true" />
      <span>
        {score} from {settings.review_count} {source} {noun}
      </span>
    </a>
  );
}

/** Client-only homepage badge. First render is always null so prerender and hydration match. */
export function HomepageReviewsBadge({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const query = useSiteSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !query.isSuccess || !query.data) return null;
  return <ReviewsBadge settings={query.data} className={className} />;
}
