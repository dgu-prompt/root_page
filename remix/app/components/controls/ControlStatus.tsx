import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuCheckCircle, LuXCircle } from "react-icons/lu";

const ControlStatus = ({ status }: { status: "PASSED" | "FAILED" }) => {
  const { t } = useTranslation();

  const isPassed = status === "PASSED";
  const statusText = isPassed ? t("statusPassed") : t("statusFailed");
  const statusColor = isPassed ? "green" : "red";
  const StatusIcon = isPassed ? LuCheckCircle : LuXCircle;

  return (
    <Flex align="center" gap="1.5">
      <StatusIcon color={statusColor} />
      <Text color={statusColor}>{statusText}</Text>
    </Flex>
  );
};

export default ControlStatus;
