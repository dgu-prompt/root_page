import { Flex, Icon, Text } from "@chakra-ui/react";
import {
  CircleCheck,
  CircleDashed,
  CircleEllipsis,
  CircleMinus,
  CircleX,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { ComplianceStatus } from "../types/controls-types";

type ComplianceStatusConfig = {
  color: string;
  icon: React.ElementType;
  label: string;
};

function getDefaultComplianceStatusConfig(
  t: (key: string) => string
): Record<ComplianceStatus, ComplianceStatusConfig> {
  return {
    PASSED: {
      color: "fg.success",
      icon: CircleCheck,
      label: t("controls.fields.complianceStatus.values.passed"),
    },
    FAILED: {
      color: "fg.error",
      icon: CircleX,
      label: t("controls.fields.complianceStatus.values.failed"),
    },
    NO_DATA: {
      color: "fg.muted",
      icon: CircleEllipsis,
      label: t("controls.fields.complianceStatus.values.noData"),
    },
    UNKNOWN: {
      color: "fg.muted",
      icon: CircleDashed,
      label: t("controls.fields.complianceStatus.values.unknown"),
    },
    DISABLED: {
      color: "fg.muted",
      icon: CircleMinus,
      label: t("controls.fields.complianceStatus.values.disabled"),
    },
  };
}

type ComplianceStatusProps = {
  status: ComplianceStatus;
};

export default function ComplianceStatusIndicator(
  props: ComplianceStatusProps
) {
  const { status } = props;
  const { t } = useTranslation();

  const config = getDefaultComplianceStatusConfig(t)[status];
  const StatusIcon = config.icon;

  return (
    <Flex align="center" gap="1">
      <Icon color={config.color}>
        <StatusIcon />
      </Icon>
      <Text color={config.color}>{config.label}</Text>
    </Flex>
  );
}
