import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { Card, SimpleGrid, Text } from "@chakra-ui/react";

import type { ComplianceStatus, ControlFull, Severity } from "../types/typesV2";

import ComplianceStatusIndicator from "./compliance-status-indicator";
import ControlStatusSwitch from "./control-status-switch";
import SeverityBadge from "./severity-badge";

// ControlCardHeader
interface ControlCardHeaderProps {
  control: ControlFull;
}

const ControlCardHeader = (props: ControlCardHeaderProps) => {
  const { control } = props;

  return (
    <SimpleGrid columnGap="6" gridTemplateColumns="1fr auto" rowGap="2">
      <Card.Title>
        {control.controlId}
        {control.controlStatus === "disabled" && (
          <Text as="span" color="fg.muted" fontSize="sm" ms="1">
            (비활성화됨)
          </Text>
        )}
      </Card.Title>
      <ControlStatusSwitch
        controlId={control.controlId}
        controlStatus={control.controlStatus}
      />
      <Text>{control.title}</Text>
    </SimpleGrid>
  );
};

// ControlCardBody
interface ControlCardBodyProps {
  control: {
    severity: Severity;
    complianceStatus: ComplianceStatus;
    failedChecks: number;
    totalChecks: number;
  };
}

enum ControlCardKeys {
  severity = "severity",
  complianceStatus = "complianceStatus",
  failedChecks = "failedChecks",
}

type ControlCardConfig = Record<
  ControlCardKeys,
  {
    label: string;
    value: (control: ControlCardBodyProps["control"]) => React.ReactNode;
  }
>;

const getDefaultControlCardConfig = (): ControlCardConfig => {
  return {
    severity: {
      label: "심각도",
      value: (control) => <SeverityBadge severity={control.severity} />,
    },
    complianceStatus: {
      label: "규정 준수 상태",
      value: (control) => (
        <ComplianceStatusIndicator status={control.complianceStatus} />
      ),
    },
    failedChecks: {
      label: "실패한 검사",
      value: (control) => (
        <>
          {control.failedChecks} / {control.totalChecks}
        </>
      ),
    },
  };
};

const ControlCardBody = (props: ControlCardBodyProps) => {
  const { control } = props;

  const config = getDefaultControlCardConfig();

  return (
    <DataListRoot orientation="horizontal">
      {Object.entries(config).map(([key, { label, value }]) => (
        <DataListItem grow key={key} label={label} value={value(control)} />
      ))}
    </DataListRoot>
  );
};

// ControlCardView
interface ControlCardViewProps {
  control: ControlFull;
}

export const ControlCardView = (props: ControlCardViewProps) => {
  const { control } = props;

  return (
    <Card.Root height="full" size={{ base: "sm", md: "md" }}>
      <Card.Header flex="1">
        <ControlCardHeader control={control} />
      </Card.Header>
      <Card.Body flex="0">
        <ControlCardBody control={control} />
      </Card.Body>
    </Card.Root>
  );
};
