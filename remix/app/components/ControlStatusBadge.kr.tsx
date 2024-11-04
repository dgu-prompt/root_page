import { Badge } from "@chakra-ui/react";

const ControlStatusBadge = ({ status }: { status: "PASSED" | "FAILED" }) => {
  const formattedStatus = status === "PASSED" ? "성공" : "실패";
  const colorScheme = status === "FAILED" ? "red" : "green";

  return <Badge colorPalette={colorScheme}>{formattedStatus}</Badge>;
};

export default ControlStatusBadge;
