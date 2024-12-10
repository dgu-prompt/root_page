declare module "control" {
  export type Severity = "low" | "medium" | "high" | "critical";

  export type ControlStatus = "enabled" | "disabled";

  export type ComplianceStatus =
    | "passed"
    | "failed"
    | "no_data"
    | "unknown"
    | "disabled";

  // 변하지 않는 메타데이터
  export interface ControlMetadata {
    controlId: string;
    title: string;
    description: string;
    remediationUrl?: string;
    severity: Severity;
  }

  // 상태 데이터
  export interface ControlStatusData {
    controlId: string;
    controlStatus: ControlStatus;
  }

  // 컴플라이언스 결과
  export interface ControlComplianceResult {
    controlId: string;
    complianceStatus: ComplianceStatus;
    failedChecks: number;
    totalChecks: number;
  }

  // 메타데이터 + 상태 정보
  export type ControlWithStatus = ControlMetadata & ControlStatusData;

  // 메타데이터 + 상태 정보 + 컴플라이언스 결과
  export type ControlFull = ControlWithStatus & ControlComplianceResult;

  export interface ControlFilters {
    searchQuery?: string;
    severity?: Severity | null;
    controlStatus?: "enabled" | "disabled" | null;
    complianceStatus?:
      | "passed"
      | "failed"
      | "no_data"
      | "unknown"
      | "disabled"
      | null;
  }
}
