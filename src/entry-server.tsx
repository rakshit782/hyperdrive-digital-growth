import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { AppContent, AppProviders } from './App';
import { publicRoutes } from './prerenderRoutes';
import { setServerCaseStudies } from './lib/caseStudiesSnapshot';
import type { CaseStudy } from './hooks/useCaseStudies';

export { publicRoutes };
export { CASE_STUDIES_API_URL, caseStudiesHeaders } from './lib/api';
export { parseCaseStudyList } from './hooks/useCaseStudies';
export { detailPageTitle, detailPageDescription } from './content/caseStudiesCopy';

export function render(url: string, caseStudies: CaseStudy[] = []) {
  setServerCaseStudies(caseStudies);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <AppProviders>
          <StaticRouter location={url}>
            <AppContent />
          </StaticRouter>
        </AppProviders>
      </HelmetProvider>
    </StrictMode>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()].join(
        '\n'
      )
    : '';

  return { html, head };
}
