import { mockRegionalControlAssignee } from "../../controls/data/mock-regional-control-assignee";

import type { RegionData } from "./types";

import { RegionalControlAssignee } from "@features/controls/services/control-aggregates.service";
import { JiraRuleData } from "@features/rule-edit/JiraRuleData";

export interface AssigneeDetails {
  assigneeId: string;
  assigneeName: string;
  hasRuleFile: boolean;
  awsRegion: string;
}

// Mock Data
const mockAwsRegions: RegionData = [
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "af-south-1",
  "ap-east-1",
  "ap-south-2",
  "ap-southeast-3",
  "ap-southeast-5",
  "ap-southeast-4",
  "ap-south-1",
  "ap-northeast-3",
  "ap-northeast-2",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-northeast-1",
  "ca-central-1",
  "ca-west-1",
  "eu-central-1",
  "eu-west-1",
  "eu-west-2",
  "eu-south-1",
  "eu-west-3",
  "eu-south-2",
  "eu-north-1",
  "eu-central-2",
  "il-central-1",
  "me-south-1",
  "me-central-1",
  "sa-east-1",
];

export const generateMockAssignees = (
  jiraData: RegionalControlAssignee
): AssigneeDetails[] => {
  const assigneesMap: { [assigneeId: string]: AssigneeDetails } = {};

  Object.entries(jiraData).forEach(([region, controls]) => {
    controls.forEach((control) => {
      if (control.jiraAssigneeId) {
        // Assignee가 이미 등록되어 있지 않다면 추가
        if (!assigneesMap[control.jiraAssigneeId]) {
          assigneesMap[control.jiraAssigneeId] = {
            assigneeId: control.jiraAssigneeId,
            assigneeName: control.jiraAssigneeName || "Unknown",
            hasRuleFile: Math.random() < 0.5, // 랜덤하게 true/false 지정
            awsRegion: region,
          };
        }
      }
    });
  });

  return Object.values(assigneesMap);
};

const mockAssigneeDetails: AssigneeDetails[] = generateMockAssignees(
  mockRegionalControlAssignee
);

// Mock functions
export async function getAwsRegions(): Promise<RegionData> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockAwsRegions), 200)
  ); // Simulating API delay
}

export async function getAssignees(
  alertType: string,
  awsRegion: string
): Promise<AssigneeDetails[]> {
  return new Promise((resolve) => {
    const filteredAssignees = mockAssigneeDetails.filter(
      (assignee) => assignee.awsRegion === awsRegion
    );
    setTimeout(() => resolve(filteredAssignees), 200); // Simulating API delay
  });
}

/**
 * Fetch mock assignee details by ID.
 * This function retrieves the details of a specific assignee by their ID.
 *
 * @param assigneeId - The ID of the assignee to fetch.
 * @returns A Promise resolving to the details of the assignee.
 * @throws An error if the assignee is not found.
 */
export const fetchAssigneeDetails = async (
  assigneeId: string
): Promise<AssigneeDetails> => {
  console.log(`Fetching assignee details for ID: ${assigneeId}`);

  // Simulate a delay to mimic an API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find the assignee in the mock data
  const assignee = mockAssigneeDetails.find(
    (detail) => detail.assigneeId === assigneeId
  );

  if (assignee) {
    return assignee;
  }

  // Throw an error if the assignee is not found
  throw new Error(`Assignee with ID ${assigneeId} not found.`);
};

export const generateYamlPreview = async (
  jiraRuleData: JiraRuleData
): Promise<string> => {
  // Simulate a delay for async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      const yaml = `
# YAML Configuration for Jira Alert Rule
awsRegion: ${jiraRuleData.awsRegion}
alertType: ${jiraRuleData.alertType}
jiraAssignee: ${jiraRuleData.jiraAssignee}
AddedSecurityControlIds:
${jiraRuleData.modifiedSecurityControlIds.added.map((id) => `  - ${id}`).join("\n")}
RemovedSecurityControlIds:
${jiraRuleData.modifiedSecurityControlIds.removed.map((id) => `  - ${id}`).join("\n")}
alertSubject: |
  ${jiraRuleData.alertSubject}
alertText: |
  ${jiraRuleData.alertText}
`;

      resolve(yaml.trim());
    }, 500); // Simulated delay
  });
};
