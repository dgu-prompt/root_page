import type { RegionalControlComplianceResult } from "../types/controls-types";
import { createSecurityControlDetailWithDefaults } from "../utils/control-data-merger";

import { controlMetadata } from "./control-metadata";
import { mockRegionalControlAssignee } from "./mock-regional-control-assignee";

export const mockRegionalControlComplianceResult: RegionalControlComplianceResult =
  {
    "ap-northeast-2": [
      {
        controlId: "ACM.1",
        controlStatus: "ENABLED",
        complianceStatus: "PASSED",
        failedChecks: 0,
        totalChecks: 10,
      },
      {
        controlId: "APIGateway.1",
        controlStatus: "ENABLED",
        complianceStatus: "FAILED",
        failedChecks: 5,
        totalChecks: 5,
      },
      {
        controlId: "APIGateway.2",
        controlStatus: "DISABLED",
        complianceStatus: "DISABLED",
        failedChecks: 0,
        totalChecks: 0,
      },
    ],
    "us-east-1": [
      {
        controlId: "ACM.1",
        controlStatus: "ENABLED",
        complianceStatus: "PASSED",
        failedChecks: 0,
        totalChecks: 10,
      },
      {
        controlId: "APIGateway.1",
        controlStatus: "ENABLED",
        complianceStatus: "FAILED",
        failedChecks: 5,
        totalChecks: 5,
      },
    ],
  };

export const mockSecurityControlJiraAssigneeDetailByRegion =
  createSecurityControlDetailWithDefaults(
    controlMetadata,
    mockRegionalControlComplianceResult,
    mockRegionalControlAssignee
  );
