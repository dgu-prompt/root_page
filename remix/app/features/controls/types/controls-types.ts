export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ControlStatus = "ENABLED" | "DISABLED";

export type ComplianceStatus =
  | "PASSED"
  | "FAILED"
  | "NO_DATA"
  | "UNKNOWN"
  | "DISABLED";

export type ControlMetadata = {
  controlId: string;
  title: string;
  description: string;
  remediationUrl?: string;
  severity: Severity;
};

export type ControlComplianceResult = {
  controlId: string;
  controlStatus: ControlStatus;
  complianceStatus: ComplianceStatus;
  failedChecks: number;
  totalChecks: number;
};

export type AssignedJiraAssignee = {
  controlId: string;
  jiraAssigneeId: string | null;
  jiraAssigneeName?: string;
};

export type ControlAggregate = ControlMetadata &
  ControlComplianceResult &
  AssignedJiraAssignee;

export type RegionalControlComplianceResult = Record<
  string,
  ControlComplianceResult[]
>;

export type RegionalAssignedJiraAssignee = Record<
  string,
  AssignedJiraAssignee[]
>;

export type RegionalControlAggregate = Record<string, ControlAggregate[]>;

export type ToggleControlStatusPayload = {
  controlId: string;
  newControlStatus: "ENABLED" | "DISABLED";
};

export type ToggleControlStatusOk = {
  ok: true;
  updatedControlId?: string;
};

export type ToggleControlStatusError = {
  ok: false;
  errorMessage: string;
};

export type ToggleControlStatusResponse =
  | ToggleControlStatusOk
  | ToggleControlStatusError;

export type ToggleControlStatusFunction = (
  payload: ToggleControlStatusPayload
) => Promise<ToggleControlStatusResponse>;
