import type {
  ControlMetadata,
  RegionalAssignedJiraAssignee,
  RegionalControlAggregate,
  RegionalControlComplianceResult,
} from "../types/controls-types";

export const createSecurityControlDetailWithDefaults = (
  definitions: ControlMetadata[],
  statusData: RegionalControlComplianceResult,
  assigneeData: RegionalAssignedJiraAssignee
): RegionalControlAggregate => {
  const result: RegionalControlAggregate = {};

  // 활성화된 리전을 statusData에서 추출
  const activeRegions = Object.keys(statusData);

  activeRegions.forEach((region) => {
    // 해당 리전의 status 및 assignee 데이터
    const statusList = statusData[region] || [];
    const assigneeList = assigneeData[region] || [];

    // 모든 definition에 대해 병합
    result[region] = definitions.map((definition) => {
      const status = statusList.find(
        (s) => s.controlId === definition.controlId
      );
      const assignee = assigneeList.find(
        (a) => a.controlId === definition.controlId
      );

      // 기본값 포함 병합
      return {
        ...definition,
        controlStatus: status?.controlStatus ?? "DISABLED",
        complianceStatus: status?.complianceStatus ?? "UNKNOWN",
        failedChecks: status?.failedChecks ?? 0,
        totalChecks: status?.totalChecks ?? 0,
        jiraAssigneeId: assignee?.jiraAssigneeId ?? null,
        jiraAssigneeName: assignee?.jiraAssigneeName ?? "",
      };
    });
  });

  return result;
};
