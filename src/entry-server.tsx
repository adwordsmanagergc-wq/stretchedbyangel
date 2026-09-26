import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppRoutes from "@/App";
import { HeadProvider, renderHeadTags, type HeadData } from "@/seo/head";

export { ALL_ROUTES } from "@/seo/routes";

export function render(url: string) {
  const collector: { head?: HeadData } = {};
  const html = renderToString(
    <StrictMode>
      <HeadProvider collector={collector}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HeadProvider>
    </StrictMode>
  );
  if (!collector.head) throw new Error(`No usePageHead() call rendered for ${url}`);
  return { html, head: collector.head, headTags: renderHeadTags(collector.head) };
}
