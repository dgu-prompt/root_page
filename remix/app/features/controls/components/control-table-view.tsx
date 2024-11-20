import { Box, Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import type { ControlAggregate } from "../types/controls-types";

import ComplianceStatusIndicator from "./compliance-status-indicator";
import ControlStatusSwitch from "./control-status-switch";
import JiraAssigneeNameIndicator from "./jira-assignee-name-indicator";
import SeverityBadge from "./severity-badge";

// ControlTableHeader
function ControlTableHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Table.ColumnHeader></Table.ColumnHeader>
      <Table.ColumnHeader>
        {t("controls.fields.controlId.label")}
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        {t("controls.fields.title.label")}
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        {t("controls.fields.severity.label")}
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        {t("controls.fields.complianceStatus.label")}
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        {t("controls.fields.failedChecks.label")}
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        {t("controls.fields.jiraAssigneeName.label")}
      </Table.ColumnHeader>
    </>
  );
}

// ControlTableBody
type ControlTableBodyProps = {
  controls: ControlAggregate[];
};

function ControlTableBody(props: ControlTableBodyProps) {
  const { controls } = props;
  const { t } = useTranslation();

  return (
    <>
      {controls.map((control) => (
        <Table.Row key={control.controlId}>
          <Table.Cell width="0">
            <ControlStatusSwitch
              controlId={control.controlId}
              controlStatus={control.controlStatus}
            />
          </Table.Cell>
          <Table.Cell maxWidth="xs">{control.controlId}</Table.Cell>
          <Table.Cell maxWidth="sm">{control.title}</Table.Cell>
          <Table.Cell maxWidth="xs">
            <SeverityBadge severity={control.severity} />
          </Table.Cell>
          <Table.Cell maxWidth="xs">
            <ComplianceStatusIndicator status={control.complianceStatus} />
          </Table.Cell>
          <Table.Cell maxWidth="xs">
            {t("controls.fields.failedChecks.value", {
              failed: control.failedChecks,
              total: control.totalChecks,
            })}
          </Table.Cell>
          <Table.Cell maxWidth="xs">
            <JiraAssigneeNameIndicator
              jiraAssigneeName={control.jiraAssigneeName}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
}

// ControlTableView
type ControlTableViewProps = {
  controls: ControlAggregate[];
};

export default function ControlTableView(props: ControlTableViewProps) {
  const { controls } = props;

  return (
    <Box bg="bg" borderColor="border" borderWidth="1px" rounded="md">
      <Table.Root>
        <Table.Header>
          <ControlTableHeader />
        </Table.Header>
        <Table.Body>
          <ControlTableBody controls={controls} />
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
