import { Dispatch, SetStateAction } from "react";

export interface JiraRuleData {
  awsRegion: string;
  alertType: "jira" | "slack";
  jiraAssignee: string;
  modifiedSecurityControlIds: {
    added: string[];
    removed: string[];
    modified: string[];
  };
  alertSubject: string;
  alertText: string;
  yamlPreview: string;
}

export interface JiraRuleProps {
  jiraRuleData: JiraRuleData;
  setJiraRuleData: Dispatch<SetStateAction<JiraRuleData>>;
}
