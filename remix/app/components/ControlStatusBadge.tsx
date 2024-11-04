import { Badge } from "@chakra-ui/react";

const ControlStatusBadge = ({ status }: { status: "PASSED" | "FAILED" }) => {
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  const colorScheme = status === "FAILED" ? "red" : "green";

  return <Badge colorPalette={colorScheme}>{formattedStatus}</Badge>;
};

export default ControlStatusBadge;
