declare module "dashboard" {
  export interface SecurityScore {
    score: number;
    passed: number;
    total: number;
  }

  export interface ControlStatus {
    passed: number;
    failed: number;
    disabled: number;
  }

  export interface FailedChecks {
    failed: number;
    total: number;
  }
}
