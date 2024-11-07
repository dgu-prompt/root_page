import { Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ControlStatusBadge = ({ status }: { status: "PASSED" | "FAILED" }) => {
  const { t } = useTranslation();

  // 상태에 따라 다국어로 변환된 텍스트 사용
  const formattedStatus =
    status === "PASSED" ? t("statusPassed") : t("statusFailed");
  const colorPalette = status === "FAILED" ? "red" : "green";

  return <Badge colorPalette={colorPalette}>{formattedStatus}</Badge>;
};

export default ControlStatusBadge;
