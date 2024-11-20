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
            route("/", "pages/dashboard.tsx"), { index: true };
            route("rules", "pages/rules.tsx", () => {
              route("", "features/rules/components/empty.tsx", { index: true });
              route("jira/regions/:awsRegion", "pages/jira-rules.tsx");
            });
            route(
              "alerts/jira/regions/:awsRegion/assignees/:assigneeId/edit",
              "pages/jira-rule-edit.tsx"
            );
            route("controls", "pages/controls.tsx");
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
