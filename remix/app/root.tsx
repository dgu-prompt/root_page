import { withEmotionCache } from "@emotion/react";
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
import { ThemeProvider } from "next-themes";

import { ChakraProvider } from "./shared/components/chakra-provider";
import { useInjectStyles } from "./shared/utils/emotion/emotion-client";
import { getSession } from "./shared/services/sessions";
import "./shared/utils/i18n";

import styles from "./shared/styles/shared.css?url";

interface LayoutProps extends React.PropsWithChildren {}

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

export const Layout = withEmotionCache((props: LayoutProps, cache) => {
  const { children } = props;

  useInjectStyles(cache);

  return (
    <html lang="en">
      <head suppressHydrationWarning>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <meta
          content="emotion-insertion-point"
          name="emotion-insertion-point"
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
});

// // ErrorBoundary 컴포넌트
// export function ErrorBoundary() {
//   const error = useRouteError();

//   // Response 객체가 throw된 경우 처리
//   if (isRouteErrorResponse(error)) {
//     return (
//       <Center bg="bg.muted" flex="1">
//         <Card.Root size="lg" variant="elevated" width="sm">
//           <Card.Body gap="2">
//             <Card.Title>
//               {error.status} {error.statusText}
//             </Card.Title>
//             <Card.Description>{error.data}</Card.Description>
//           </Card.Body>
//           <Card.Footer>
//             <Button onClick={() => (window.location.href = "/")}>
//               <Link to="/">Go back home</Link>
//             </Button>
//           </Card.Footer>
//         </Card.Root>
//       </Center>
//     );
//   }

//   // React Error가 발생한 경우 처리
//   return (
//     <>
//       <Center bg="bg.muted" flex="1">
//         <Card.Root size="lg" variant="elevated">
//           <Card.Header>
//             <Card.Title>Something went wrong</Card.Title>
//             <Card.Description>
//               {error.message || "An unexpected error occurred."}
//             </Card.Description>
//           </Card.Header>
//           <Card.Footer>
//             <Button asChild>
//               <Link to="/">Go back home</Link>
//             </Button>
//           </Card.Footer>
//         </Card.Root>
//       </Center>
//     </>
//   );
// }

export default function App() {
  return (
    <ChakraProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Outlet />
      </ThemeProvider>
    </ChakraProvider>
  );
}
