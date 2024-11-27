import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "shared/layouts/app-layout.tsx", () => {
            route("/", "features/dashboard/index.tsx"), { index: true };
            route("rules", "features/rules/index.tsx");
            route("rules/:ruleId/edit", "features/RuleEdit/index.tsx");
            route("controls", "features/controls/index.tsx");
          });

          route("/login", "shared/layouts/auth-layout.tsx", () => {
            route("", "pages/login.tsx", { index: true });
          });
          route("logout", "pages/logout.tsx");
        });
      },
    }),
    tsconfigPaths(),
  ],
});
