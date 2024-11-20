import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { Card, SimpleGrid, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import type {
  ComplianceStatus,
  ControlAggregate,
  Severity,
} from "../types/controls-types";

import ComplianceStatusIndicator from "./compliance-status-indicator";
import ControlStatusSwitch from "./control-status-switch";
import JiraAssigneeNameIndicator from "./jira-assignee-name-indicator";
import SeverityBadge from "./severity-badge";

// ControlCardHeader
type ControlCardHeaderProps = {
  control: ControlAggregate;
};

const ControlCardHeader = (props: ControlCardHeaderProps) => {
  const { control } = props;

  return (
    <SimpleGrid columnGap="6" gridTemplateColumns="1fr auto" rowGap="2">
      <Card.Title>{control.controlId}</Card.Title>
      <ControlStatusSwitch
        controlId={control.controlId}
        controlStatus={control.controlStatus}
      />
      <Text>{control.title}</Text>
    </SimpleGrid>
  );
};

// ControlCardBody
type ControlCardBodyProps = {
  control: {
    severity: Severity;
    complianceStatus: ComplianceStatus;
    failedChecks: number;
    totalChecks: number;
    jiraAssigneeName?: string;
  };
};

enum ControlCardKeys {
  severity = "severity",
  complianceStatus = "complianceStatus",
  failedChecks = "failedChecks",
  jiraAssigneeName = "jiraAssigneeName",
}

type ControlCardConfig = Record<
  ControlCardKeys,
  {
    label: string;
    value: (control: ControlCardBodyProps["control"]) => React.ReactNode;
  }
>;

const getDefaultControlCardConfig = (
  t: (key: string, options?: Record<string, unknown>) => string
): ControlCardConfig => {
  return {
    severity: {
      label: t("controls.fields.severity.label"),
      value: (control) => <SeverityBadge severity={control.severity} />,
    },
    complianceStatus: {
      label: t("controls.fields.complianceStatus.label"),
      value: (control) => (
        <ComplianceStatusIndicator status={control.complianceStatus} />
      ),
    },
    failedChecks: {
      label: t("controls.fields.failedChecks.label"),
      value: (control) =>
        t("controls.fields.failedChecks.value", {
          failed: control.failedChecks,
          total: control.totalChecks,
        }),
    },
    jiraAssigneeName: {
      label: t("controls.fields.jiraAssigneeName.label"),
      value: (control) => (
        <JiraAssigneeNameIndicator
          jiraAssigneeName={control.jiraAssigneeName}
        />
      ),
    },
  };
};

const ControlCardBody = (props: ControlCardBodyProps) => {
  const { control } = props;
  const { t } = useTranslation();

  const config = getDefaultControlCardConfig(t);

  return (
    <DataListRoot orientation="horizontal">
      {Object.entries(config).map(([key, { label, value }]) => (
        <DataListItem grow key={key} label={label} value={value(control)} />
      ))}
    </DataListRoot>
  );
};

// ControlCardView
type ControlCardViewProps = {
  control: ControlAggregate;
};

export const ControlCardView = (props: ControlCardViewProps) => {
  const { control } = props;

  return (
    <Card.Root height="full" size={{ base: "sm", md: "md" }}>
      <Card.Header flex="1">
        <ControlCardHeader control={control} />
      </Card.Header>
      <Card.Body>
        <ControlCardBody control={control} />
      </Card.Body>
    </Card.Root>
  );
};
