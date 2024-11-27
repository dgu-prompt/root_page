import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
} from "@remix-run/react";
import { Provider } from "@/components/ui/provider";
import { getSession } from "./shared/services/sessions";

import styles from "./shared/styles/shared.css?url";
import { RegionProvider } from "@/contexts/RegionContext";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  if (process.env.NODE_ENV === "development") {
    return [
      { title: "SecurityCircle DEV" },
      { name: "description", content: "Welcome to SecurityCircle!" },
    ];
  }

  return [
    { title: "SecurityCircle" },
    { name: "description", content: "Welcome to SecurityCircle!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const currentUrl = new URL(request.url);
  if (currentUrl.pathname === "/login") {
    return null;
  }

  if (!session.has("userId")) {
    return redirect("/login");
  }

  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider>
      <RegionProvider>
        <Outlet />
      </RegionProvider>
    </Provider>
  );
}
