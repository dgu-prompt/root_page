import type { RegionalControlComplianceResult } from "../types/controls-types";
import { createSecurityControlDetailWithDefaults } from "../utils/control-data-merger";

import { mockControlMetadata } from "./mockControlMetadata";
import { mockRegionalControlAssignee } from "./mock-regional-control-assignee";

export const mockRegionalControlComplianceResult: RegionalControlComplianceResult =
  {
    "ap-northeast-2": [
      {
        controlId: "ACM.1",
        controlStatus: "enabled",
        complianceStatus: "passed",
        failedChecks: 0,
        totalChecks: 10,
      },
      {
        controlId: "APIGateway.1",
        controlStatus: "enabled",
        complianceStatus: "failed",
        failedChecks: 5,
        totalChecks: 5,
      },
      {
        controlId: "APIGateway.2",
        controlStatus: "disabled",
        complianceStatus: "disabled",
        failedChecks: 0,
        totalChecks: 0,
      },
    ],
    "us-east-1": [
      {
        controlId: "ACM.1",
        controlStatus: "enabled",
        complianceStatus: "passed",
        failedChecks: 0,
        totalChecks: 10,
      },
      {
        controlId: "APIGateway.1",
        controlStatus: "enabled",
        complianceStatus: "failed",
        failedChecks: 5,
        totalChecks: 5,
      },
    ],
  };

export const mockSecurityControlJiraAssigneeDetailByRegion =
  createSecurityControlDetailWithDefaults(
    mockControlMetadata,
    mockRegionalControlComplianceResult,
    mockRegionalControlAssignee
  );
