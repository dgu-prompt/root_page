export type Control = {
  SecurityControlId: string;
  Title: string;
  Description: string;
  SeverityRating: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFORMATIONAL";
  SecurityControlStatus: "ENABLED" | "DISABLED";
  controlStatus: "PASSED" | "FAILED";
  failedChecks: number;
  totalChecks: number;
  assignee: string;
};

export type ControlDataByRegion = {
  [region: string]: Control[];
};
