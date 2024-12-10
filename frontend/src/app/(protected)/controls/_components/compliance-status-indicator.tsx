import { Flex, Icon, Text } from "@chakra-ui/react";
import {
  CircleCheck,
  CircleDashed,
  CircleEllipsis,
  CircleMinus,
  CircleX,
} from "lucide-react";

import { ComplianceStatus } from "../types/typesV2";

interface ComplianceStatusConfig {
  color: string;
  icon: React.ElementType;
  label: string;
}

function getDefaultComplianceStatusConfig(): Record<
  ComplianceStatus,
  ComplianceStatusConfig
> {
  return {
    passed: {
      color: "fg.success",
      icon: CircleCheck,
      label: "통과",
    },
    failed: {
      color: "fg.error",
      icon: CircleX,
      label: "실패",
    },
    no_data: {
      color: "fg.muted",
      icon: CircleEllipsis,
      label: "데이터 없음",
    },
    unknown: {
      color: "fg.muted",
      icon: CircleDashed,
      label: "알 수 없음",
    },
    disabled: {
      color: "fg.muted",
      icon: CircleMinus,
      label: "비활성화됨",
    },
  };
}

interface ComplianceStatusProps {
  status: ComplianceStatus;
}

export default function ComplianceStatusIndicator({
  status,
}: ComplianceStatusProps) {
  const config = getDefaultComplianceStatusConfig()[status.toLowerCase()];
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
