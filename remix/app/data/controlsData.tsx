// list_security_control_definitions 함수에서 받아옴
// "SecurityControlId": "AutoScaling.1",
// "Title": "Auto scaling groups associated with a load balancer should use ELB health checks",
// "Description": "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks. The control fails if the Auto Scaling group doesn't use ELB health checks.",
// "RemediationUrl": "https://docs.aws.amazon.com/console/securityhub/AutoScaling.1/remediation",
// "SeverityRating": "LOW",
// "CurrentRegionAvailability": "AVAILABLE", -> 사용 안했는데 해야할듯?
// "CustomizableProperties": [] -> 사용 안함

// + FailedChecks ( 9 of 16 ) 이부분도 받아와야하는데 어딘지 모르겠음

// 데이터 보내줄때 페이지네이션 해서 보내줘야하는데
// All, Enabled, Disabled로 필터해서 보내줘야할듯

const controlsData = {
  "us-east-1": [
    {
      SecurityControlId: "1",
      Title: "S3 버킷 공개 액세스 제한",
      Description: "S3 버킷에 대한 공개 액세스를 제한합니다.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "2",
      Title: "EC2 인스턴스 보안 그룹 설정 검토",
      Description: "EC2 인스턴스의 보안 그룹을 검토합니다.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
    },
    {
      SecurityControlId: "9",
      Title: "EC2 인스턴스 보안 그룹 설정 검토",
      Description: "EC2 인스턴스의 보안 그룹을 검토합니다.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
    },
    // 추가 항목...
  ],
  "us-west-2": [
    {
      SecurityControlId: "3",
      Title: "IAM 사용자 MFA 활성화",
      Description: "IAM 사용자를 위한 다중 인증을 활성화합니다.",
      SeverityRating: "CRITICAL",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "4",
      Title: "RDS 인스턴스 보안 그룹 검토",
      Description: "RDS 인스턴스의 보안 그룹 설정을 검토합니다.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "DISABLED",
    },
    // 추가 항목...
  ],
  "eu-central-1": [
    {
      SecurityControlId: "5",
      Title: "VPC 흐름 로그 활성화",
      Description: "VPC 흐름 로그를 활성화합니다.",
      SeverityRating: "LOW",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "6",
      Title: "CloudTrail 로그 활성화",
      Description: "CloudTrail을 통한 로그 모니터링을 활성화합니다.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "DISABLED",
    },
    // 추가 항목...
  ],
  "ap-southeast-2": [
    {
      SecurityControlId: "ACM.1",
      Title:
        "Imported and ACM-issued certificates should be renewed after a specified time period",
      Description:
        "This control checks whether an AWS Certificate Manager (ACM) certificate is renewed within the specified time period. It checks both imported certificates and certificates provided by ACM. The control fails if the certificate isn't renewed within the specified time period. Unless you provide a custom parameter value for the renewal period, Security Hub uses a default value of 30 days.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/ACM.1/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
    },
    {
      SecurityControlId: "APIGateway.1",
      Title:
        "API Gateway REST and WebSocket API execution logging should be enabled",
      Description:
        "This control checks whether all stages of an Amazon API Gateway REST or WebSocket API have logging enabled. The control fails if the 'loggingLevel' isn't 'ERROR' or 'INFO' for all stages of the API. Unless you provide custom parameter values to indicate that a specific log type should be enabled, Security Hub produces a passed finding if the logging level is either 'ERROR' or 'INFO'.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.1/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "APIGateway.2",
      Title:
        "API Gateway REST API stages should be configured to use SSL certificates for backend authentication",
      Description:
        "This control checks whether Amazon API Gateway REST API stages have SSL certificates configured that backend systems can use to authenticate that incoming requests are from the API Gateway.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.2/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "APIGateway.3",
      Title:
        "API Gateway REST API stages should have AWS X-Ray tracing enabled",
      Description:
        "This control checks whether AWS X-Ray active tracing is enabled for your Amazon API Gateway REST API stages.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.3/remediation",
      SeverityRating: "LOW",
      SecurityControlStatus: "DISABLED",
    },
    {
      SecurityControlId: "APIGateway.4",
      Title: "API Gateway should be associated with a WAF Web ACL",
      Description:
        "This control checks to see if an API Gateway stage is using an AWS WAF Web ACL. This control fails if an AWS WAF Web ACL is not attached to a REST API Gateway stage.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.4/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "APIGateway.5",
      Title: "API Gateway REST API cache data should be encrypted at rest",
      Description:
        "This control checks whether all methods in Amazon API Gateway REST API stages that have cache enabled are encrypted. The control fails if any method in API Gateway REST API stage is configured to cache and the cache is not encrypted.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.5/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "APIGateway.8",
      Title: "API Gateway routes should specify an authorization type",
      Description:
        "This control checks if Amazon API Gateway routes have an authorization type. The control fails if the API Gateway route doesn't have any authorization type. Optionally, you can provide a custom parameter value if you want the control to pass only if the route uses the authorization type specified in the 'authorizationType' parameter.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.8/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "APIGateway.9",
      Title: "Access logging should be configured for API Gateway V2 Stages",
      Description:
        "This control checks if Amazon API Gateway V2 stages have access logging configured. This control fails if access log settings aren’t defined.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/APIGateway.9/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
    },
    {
      SecurityControlId: "Account.1",
      Title:
        "Security contact information should be provided for an AWS account.",
      Description:
        "This control checks if an Amazon Web Services (AWS) account has security contact information. The control fails if security contact information is not provided for the account.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/Account.1/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "Account.2",
      Title: "AWS account should be part of an AWS Organizations organization",
      Description:
        "This control checks if an AWS account is part of an AWS Organizations organization. The control fails if the account is not part of an organization.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/Account.2/remediation",
      SeverityRating: "HIGH",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "AppSync.5",
      Title:
        "AWS AppSync GraphQL APIs should not be authenticated with API keys",
      Description:
        "This control checks whether your application uses an API key to interact with an AWS AppSync GraphQL API. The control fails if an AWS AppSync GraphQL API is authenticated with an API key.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/AppSync.5/remediation",
      SeverityRating: "HIGH",
      SecurityControlStatus: "DISABLED",
    },
    {
      SecurityControlId: "AutoScaling.1",
      Title:
        "Auto scaling groups associated with a load balancer should use ELB health checks",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks. The control fails if the Auto Scaling group doesn't use ELB health checks.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/AutoScaling.1/remediation",
      SeverityRating: "LOW",
      SecurityControlStatus: "DISABLED",
    },
    {
      SecurityControlId: "AutoScaling.2",
      Title:
        "Amazon EC2 Auto Scaling group should cover multiple Availability Zones",
      Description:
        "This control checks whether an Amazon EC2 Auto Scaling group spans at least the specified number of Availability Zones (AZs). The control fails if an Auto Scaling group doesn't span at least the specified number of AZs. Unless you provide a custom parameter value for the minimum number of AZs, Security Hub uses a default value of two AZs.",
      RemediationUrl:
        "https://docs.aws.amazon.com/console/securityhub/AutoScaling.2/remediation",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "DISABLED",
    },
  ],
};

export default controlsData;
