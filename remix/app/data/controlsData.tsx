// list_security_control_definitions 함수에서 받아옴
// "SecurityControlId": "AutoScaling.1",
// "Title": "Auto scaling groups associated with a load balancer should use ELB health checks",
// "Description": "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks. The control fails if the Auto Scaling group doesn't use ELB health checks.",
// "RemediationUrl": "https://docs.aws.amazon.com/console/securityhub/AutoScaling.1/remediation",
// "SeverityRating": "LOW",
// "CurrentRegionAvailability": "AVAILABLE", -> 사용 안했는데 해야할듯?
// "CustomizableProperties": [] -> 사용 안함

import { ControlDataByRegion } from "~/types/control";

// + FailedChecks ( 9 of 16 ) 이부분도 받아와야하는데 어딘지 모르겠음

// 데이터 보내줄때 페이지네이션 해서 보내줘야하는데
// All, Enabled, Disabled로 필터해서 보내줘야할듯

const controlsData: ControlDataByRegion = {
  "us-east-1": [
    {
      SecurityControlId: "ACM.1",
      Title:
        "Imported and ACM-issued certificates should be renewed after a specified time period",
      Description:
        "This control checks whether an AWS Certificate Manager (ACM) certificate is renewed within the specified time period. It checks both imported certificates and certificates provided by ACM. The control fails if the certificate isn't renewed within the specified time period. Unless you provide a custom parameter value for the renewal period, Security Hub uses a default value of 30 days.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
      controlStatus: "FAILED",
      failedChecks: 5,
      totalChecks: 10,
      assignee: "john.doe",
    },
    {
      SecurityControlId: "APIGateway.1",
      Title:
        "API Gateway REST and WebSocket API execution logging should be enabled",
      Description:
        "This control checks whether all stages of an Amazon API Gateway REST or WebSocket API have logging enabled. The control fails if the 'loggingLevel' isn't 'ERROR' or 'INFO' for all stages of the API.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "ENABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 20,
      assignee: "jane.smith",
    },
    {
      SecurityControlId: "APIGateway.2",
      Title:
        "API Gateway REST API stages should be configured to use SSL certificates for backend authentication",
      Description:
        "This control checks whether Amazon API Gateway REST API stages have SSL certificates configured that backend systems can use to authenticate that incoming requests are from the API Gateway.",
      SeverityRating: "CRITICAL",
      SecurityControlStatus: "ENABLED",
      controlStatus: "FAILED",
      failedChecks: 10,
      totalChecks: 12,
      assignee: "mark.taylor",
    },
    {
      SecurityControlId: "AutoScaling.1",
      Title:
        "Auto scaling groups associated with a load balancer should use ELB health checks",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks.",
      SeverityRating: "LOW",
      SecurityControlStatus: "DISABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 5,
      assignee: "lisa.wang",
    },
    {
      SecurityControlId: "AutoScaling.2",
      Title:
        "Amazon EC2 Auto Scaling group should cover multiple Availability Zones",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group spans at least the specified number of Availability Zones (AZs).",
      SeverityRating: "INFORMATIONAL",
      SecurityControlStatus: "ENABLED",
      controlStatus: "FAILED",
      failedChecks: 3,
      totalChecks: 3,
      assignee: "amy.choi",
    },
    {
      SecurityControlId: "Account.1",
      Title:
        "Security contact information should be provided for an AWS account",
      Description:
        "This control checks if an Amazon Web Services (AWS) account has security contact information.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 15,
      assignee: "george.kim",
    },
  ],
  "eu-central-1": [
    {
      SecurityControlId: "ACM.1",
      Title:
        "Imported and ACM-issued certificates should be renewed after a specified time period",
      Description:
        "This control checks whether an AWS Certificate Manager (ACM) certificate is renewed within the specified time period. It checks both imported certificates and certificates provided by ACM. The control fails if the certificate isn't renewed within the specified time period. Unless you provide a custom parameter value for the renewal period, Security Hub uses a default value of 30 days.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
      controlStatus: "FAILED",
      failedChecks: 5,
      totalChecks: 10,
      assignee: "john.doe",
    },
    {
      SecurityControlId: "APIGateway.1",
      Title:
        "API Gateway REST and WebSocket API execution logging should be enabled",
      Description:
        "This control checks whether all stages of an Amazon API Gateway REST or WebSocket API have logging enabled. The control fails if the 'loggingLevel' isn't 'ERROR' or 'INFO' for all stages of the API.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "ENABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 20,
      assignee: "jane.smith",
    },
    {
      SecurityControlId: "APIGateway.2",
      Title:
        "API Gateway REST API stages should be configured to use SSL certificates for backend authentication",
      Description:
        "This control checks whether Amazon API Gateway REST API stages have SSL certificates configured that backend systems can use to authenticate that incoming requests are from the API Gateway.",
      SeverityRating: "CRITICAL",
      SecurityControlStatus: "ENABLED",
      controlStatus: "FAILED",
      failedChecks: 10,
      totalChecks: 12,
      assignee: "mark.taylor",
    },
    {
      SecurityControlId: "AutoScaling.1",
      Title:
        "Auto scaling groups associated with a load balancer should use ELB health checks",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks.",
      SeverityRating: "LOW",
      SecurityControlStatus: "DISABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 5,
      assignee: "lisa.wang",
    },
    {
      SecurityControlId: "AutoScaling.2",
      Title:
        "Amazon EC2 Auto Scaling group should cover multiple Availability Zones",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group spans at least the specified number of Availability Zones (AZs).",
      SeverityRating: "INFORMATIONAL",
      SecurityControlStatus: "ENABLED",
      controlStatus: "FAILED",
      failedChecks: 3,
      totalChecks: 3,
      assignee: "amy.choi",
    },
    {
      SecurityControlId: "Account.1",
      Title:
        "Security contact information should be provided for an AWS account",
      Description:
        "This control checks if an Amazon Web Services (AWS) account has security contact information.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 15,
      assignee: "george.kim",
    },
  ],
  "ap-southeast-2": [
    {
      SecurityControlId: "ACM.1",
      Title:
        "Imported and ACM-issued certificates should be renewed after a specified time period",
      Description:
        "This control checks whether an AWS Certificate Manager (ACM) certificate is renewed within the specified time period. It checks both imported certificates and certificates provided by ACM. The control fails if the certificate isn't renewed within the specified time period. Unless you provide a custom parameter value for the renewal period, Security Hub uses a default value of 30 days.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
      controlStatus: "FAILED",
      failedChecks: 5,
      totalChecks: 10,
      assignee: "john.doe",
    },
    {
      SecurityControlId: "APIGateway.1",
      Title:
        "API Gateway REST and WebSocket API execution logging should be enabled",
      Description:
        "This control checks whether all stages of an Amazon API Gateway REST or WebSocket API have logging enabled. The control fails if the 'loggingLevel' isn't 'ERROR' or 'INFO' for all stages of the API.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "ENABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 20,
      assignee: "jane.smith",
    },
    {
      SecurityControlId: "APIGateway.2",
      Title:
        "API Gateway REST API stages should be configured to use SSL certificates for backend authentication",
      Description:
        "This control checks whether Amazon API Gateway REST API stages have SSL certificates configured that backend systems can use to authenticate that incoming requests are from the API Gateway.",
      SeverityRating: "CRITICAL",
      SecurityControlStatus: "ENABLED",
      controlStatus: "FAILED",
      failedChecks: 10,
      totalChecks: 12,
      assignee: "mark.taylor",
    },
    {
      SecurityControlId: "AutoScaling.1",
      Title:
        "Auto scaling groups associated with a load balancer should use ELB health checks",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks.",
      SeverityRating: "LOW",
      SecurityControlStatus: "DISABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 5,
      assignee: "lisa.wang",
    },
    {
      SecurityControlId: "AutoScaling.2",
      Title:
        "Amazon EC2 Auto Scaling group should cover multiple Availability Zones",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group spans at least the specified number of Availability Zones (AZs).",
      SeverityRating: "INFORMATIONAL",
      SecurityControlStatus: "ENABLED",
      controlStatus: "FAILED",
      failedChecks: 3,
      totalChecks: 3,
      assignee: "amy.choi",
    },
    {
      SecurityControlId: "Account.1",
      Title:
        "Security contact information should be provided for an AWS account",
      Description:
        "This control checks if an Amazon Web Services (AWS) account has security contact information.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
      controlStatus: "PASSED",
      failedChecks: 0,
      totalChecks: 15,
      assignee: "george.kim",
    },
  ],
};

export default controlsData;
