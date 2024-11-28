import React, { createContext, useContext, useState } from "react";
import { Rule } from "@features/RuleEdit/services/types";

interface Rules {
  rules: Rule[];
  addRule: () => string;
  editRule: (updatedRule: Rule) => void;
}

// Context 생성
export const RuleContext = createContext<Rules | null>(null);

// 커스텀 훅으로 Context 사용
export function useRules() {
  const rules = useContext(RuleContext);
  if (!rules) {
    throw new Error("useRules must be used within a Provider");
  }
  return rules;
}

export const mockRuleData: Rule[] = [
  {
    id: "rule-1",
    name: "Rule 1",
    filename: "rule-1.yaml",
    alertType: "jira",
    alertSubject: "Rule 1",
    alertText: "This is rule 1",
    region: "us-east-1",
    controlIds: ["EC2.1"],
    project: "VT",
    assignee: "mandar2n09@gmail.com",
  },
  {
    id: "rule-2",
    name: "Rule 2",
    filename: "rule-2.yaml",
    alertType: "jira",
    alertSubject: "Rule 2",
    alertText: "This is rule 2",
    region: "us-west-1",
    controlIds: ["EC2.2"],
    project: "VT",
    assignee: "glagudvlf821@gmail.com",
  },
  {
    id: "rule-3",
    name: "Rule 3",
    filename: "rule-3.yaml",
    alertType: "slack",
    alertText: "This is rule 3",
    region: "us-west-1",
    controlIds: ["EC2.3"],
    slack_webhook_url:
      "https://hooks.slack.com/services/EXAMPLE/THIS/WONT-WORK",
  },
  {
    id: "rule-4",
    name: "Rule 4",
    filename: "rule-4.yaml",
    alertType: "jira",
    alertSubject: "Rule 4",
    alertText: "This is rule 4",
    region: "ap-northeast-2",
    controlIds: ["EC2.19", "RDS.2", "IAM.6", "IAM.9", "S3.2"],
    project: "VT",
    assignee: "mandar2n09@gmail.com",
  },
  {
    id: "rule-5",
    name: "Rule 5",
    filename: "rule-5.yaml",
    alertType: "jira",
    alertSubject: "Rule 5",
    alertText: "This is rule 5",
    region: "ap-northeast-2",
    controlIds: ["EC2.5"],
    project: "VT",
    assignee: "daeyong.jeong.18@gmail.com",
  },
  {
    id: "rule-6",
    name: "Rule 6",
    filename: "rule-6.yaml",
    alertType: "jira",
    alertSubject: "Rule 6",
    alertText: "This is rule 6",
    region: "ap-northeast-2",
    controlIds: ["EC2.6"],
    project: "VT",
    assignee: "daeyong.jeong.18@gmail.com",
  },
];

// TODO 아래 코드 타입오류때문에 root.tsx에 정의해놓음 나중에 삭제해야함

// // Provider 컴포넌트 생성
// export const RuleProvider: React.FC = ({ children }) => {
//   // 초기값으로 mockRuleData 사용
//   const [rules, setRules] = useState<Rule[]>(mockRuleData);

//   // 규칙 추가 함수
//   const addRule = (newRule: Rule) => {
//     const newRuleWithId = {
//       ...newRule,
//       id: `rule-${rules.length + 1}`, // 새로운 고유 ID 생성
//     };
//     setRules((prevRules) => [...prevRules, newRuleWithId]);
//   };

//   return (
//     <RuleContext.Provider value={{ rules, addRule }}>
//       {children}
//     </RuleContext.Provider>
//   );
// };
