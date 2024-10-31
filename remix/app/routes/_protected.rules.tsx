import { useLocation } from "@remix-run/react";

export default function Index() {
  const location = useLocation();

  return (
    <>
      <div>{location.pathname}</div>
    </>
  );
}
