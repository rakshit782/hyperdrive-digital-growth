import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '@/utils/visitorTracker';

export function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track visitor on route change
    const timer = setTimeout(() => {
      trackVisitor();
    }, 1000); // Delay to avoid tracking too frequently

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
