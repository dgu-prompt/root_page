import { Box, Table } from "@chakra-ui/react";

import type { ControlAggregate } from "../types/controls-types";

import ComplianceStatusIndicator from "./compliance-status-indicator";
import ControlStatusSwitch from "./control-status-switch";
import SeverityBadge from "./severity-badge";

// ControlTableHeader
function ControlTableHeader() {
  return (
    <>
      <Table.ColumnHeader></Table.ColumnHeader>
      <Table.ColumnHeader>ID</Table.ColumnHeader>
      <Table.ColumnHeader>제목</Table.ColumnHeader>
      <Table.ColumnHeader>심각도</Table.ColumnHeader>
      <Table.ColumnHeader>규정 준수 상태</Table.ColumnHeader>
      <Table.ColumnHeader>실패한 검사</Table.ColumnHeader>
    </>
  );
}

// ControlTableBody
type ControlTableBodyProps = {
  controls: ControlAggregate[];
};

function ControlTableBody(props: ControlTableBodyProps) {
  const { controls } = props;

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
            {control.failedChecks} / {control.totalChecks}
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
