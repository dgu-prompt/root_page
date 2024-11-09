import { Box } from "@chakra-ui/react";
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
  useMatches,
} from "@remix-run/react";
import { Provider } from "~/components/ui/provider";

import { getSession } from "./sessions";
import "./i18n";

import Footer from "~/components/layout/Footer";
import Nav from "~/components/layout/Navbar";
import styles from "~/styles/shared.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider>{children}</Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const matches = useMatches();
  const isAuthRoute = matches.some((match) => match.id === "routes/_auth");

  if (isAuthRoute) {
    return <Outlet />;
  }

  return (
    <>
      <Nav />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
