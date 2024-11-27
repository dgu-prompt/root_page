import { ControlMetadata } from "../types/typesV2";

export const mockControlMetadata: ControlMetadata[] = [
  {
    controlId: "ACM.1",
    title:
      "Imported and ACM-issued certificates should be renewed after a specified time period",
    description:
      "This control checks whether an AWS Certificate Manager (ACM) certificate is renewed within the specified time period. It checks both imported certificates and certificates provided by ACM. The control fails if the certificate isn't renewed within the specified time period. Unless you provide a custom parameter value for the renewal period, Security Hub uses a default value of 30 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ACM.1/remediation",
    severity: "medium",
  },
  {
    controlId: "APIGateway.1",
    title:
      "API Gateway REST and WebSocket API execution logging should be enabled",
    description:
      "This control checks whether all stages of an Amazon API Gateway REST or WebSocket API have logging enabled. The control fails if the 'loggingLevel' isn't 'ERROR' or 'INFO' for all stages of the API. Unless you provide custom parameter values to indicate that a specific log type should be enabled, Security Hub produces a passed finding if the logging level is either 'ERROR' or 'INFO'.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.1/remediation",
    severity: "medium",
  },
  {
    controlId: "APIGateway.2",
    title:
      "API Gateway REST API stages should be configured to use SSL certificates for backend authentication",
    description:
      "This control checks whether Amazon API Gateway REST API stages have SSL certificates configured that backend systems can use to authenticate that incoming requests are from the API Gateway.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.2/remediation",
    severity: "medium",
  },
  {
    controlId: "APIGateway.3",
    title: "API Gateway REST API stages should have AWS X-Ray tracing enabled",
    description:
      "This control checks whether AWS X-Ray active tracing is enabled for your Amazon API Gateway REST API stages.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.3/remediation",
    severity: "low",
  },
  {
    controlId: "APIGateway.4",
    title: "API Gateway should be associated with a WAF Web ACL",
    description:
      "This control checks to see if an API Gateway stage is using an AWS WAF Web ACL. This control fails if an AWS WAF Web ACL is not attached to a REST API Gateway stage.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.4/remediation",
    severity: "medium",
  },
  {
    controlId: "APIGateway.5",
    title: "API Gateway REST API cache data should be encrypted at rest",
    description:
      "This control checks whether all methods in Amazon API Gateway REST API stages that have cache enabled are encrypted. The control fails if any method in API Gateway REST API stage is configured to cache and the cache is not encrypted.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.5/remediation",
    severity: "medium",
  },
  {
    controlId: "APIGateway.8",
    title: "API Gateway routes should specify an authorization type",
    description:
      "This control checks if Amazon API Gateway routes have an authorization type. The control fails if the API Gateway route doesn't have any authorization type. Optionally, you can provide a custom parameter value if you want the control to pass only if the route uses the authorization type specified in the 'authorizationType' parameter.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.8/remediation",
    severity: "medium",
  },
  {
    controlId: "APIGateway.9",
    title: "Access logging should be configured for API Gateway V2 Stages",
    description:
      "This control checks if Amazon API Gateway V2 stages have access logging configured. This control fails if access log settings aren\u2019t defined.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/APIGateway.9/remediation",
    severity: "medium",
  },
  {
    controlId: "Account.1",
    title:
      "Security contact information should be provided for an AWS account.",
    description:
      "This control checks if an Amazon Web Services (AWS) account has security contact information. The control fails if security contact information is not provided for the account.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Account.1/remediation",
    severity: "medium",
  },
  {
    controlId: "Account.2",
    title: "AWS account should be part of an AWS Organizations organization",
    description:
      "This control checks if an AWS account is part of an AWS Organizations organization. The control fails if the account is not part of an organization.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Account.2/remediation",
    severity: "high",
  },
  {
    controlId: "AppSync.5",
    title: "AWS AppSync GraphQL APIs should not be authenticated with API keys",
    description:
      "This control checks whether your application uses an API key to interact with an AWS AppSync GraphQL API. The control fails if an AWS AppSync GraphQL API is authenticated with an API key.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/AppSync.5/remediation",
    severity: "high",
  },
  {
    controlId: "AutoScaling.1",
    title:
      "Auto scaling groups associated with a Classic Load Balancer should use load balancer health checks",
    description:
      "This control checks whether an Amazon EC2 Auto Scaling group that is associated with a load balancer uses Elastic Load Balancing (ELB) health checks. The control fails if the Auto Scaling group doesn't use ELB health checks.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/AutoScaling.1/remediation",
    severity: "low",
  },
  {
    controlId: "AutoScaling.2",
    title:
      "Amazon EC2 Auto Scaling group should cover multiple Availability Zones",
    description:
      "This control checks whether an Amazon EC2 Auto Scaling group spans at least the specified number of Availability Zones (AZs). The control fails if an Auto Scaling group doesn't span at least the specified number of AZs. Unless you provide a custom parameter value for the minimum number of AZs, Security Hub uses a default value of two AZs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/AutoScaling.2/remediation",
    severity: "medium",
  },
  {
    controlId: "AutoScaling.3",
    title:
      "Auto Scaling group launch configurations should configure EC2 instances to require Instance Metadata Service Version 2 (IMDSv2)",
    description:
      "This control checks whether IMDSv2 is enabled on all instances launched by Amazon EC2 Auto Scaling groups. The control fails if the Instance Metadata Service (IMDS) version isn't included in the launch configuration or is configured as token optional, which is a setting that allows either IMDSv1 or IMDSv2.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/AutoScaling.3/remediation",
    severity: "high",
  },
  {
    controlId: "AutoScaling.6",
    title:
      "Auto Scaling groups should use multiple instance types in multiple Availability Zones",
    description:
      "This control checks whether an Amazon EC2 Auto Scaling group uses multiple instance types. This control fails if the Amazon EC2 Auto Scaling group has only one instance type defined.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/AutoScaling.6/remediation",
    severity: "medium",
  },
  {
    controlId: "AutoScaling.9",
    title: "EC2 Auto Scaling groups should use EC2 launch templates",
    description:
      "This control checks whether an Amazon EC2 Auto Scaling group is created from an EC2 launch template. This control fails if an Amazon EC2 Auto Scaling group is not created with a launch template or if a launch template is not specified in a mixed instances policy.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/AutoScaling.9/remediation",
    severity: "medium",
  },
  {
    controlId: "Autoscaling.5",
    title:
      "Amazon EC2 instances launched using Auto Scaling group launch configurations should not have Public IP addresses",
    description:
      "This control checks whether Amazon EC2 Auto Scaling groups have public IP addresses enabled using launch configurations.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Autoscaling.5/remediation",
    severity: "high",
  },
  {
    controlId: "Backup.1",
    title: "AWS Backup recovery points should be encrypted at rest",
    description:
      "This control checks if an AWS Backup recovery point is encrypted at rest. The control fails if the recovery point isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Backup.1/remediation",
    severity: "medium",
  },
  {
    controlId: "CloudTrail.1",
    title:
      "CloudTrail should be enabled and configured with at least one multi-Region trail that includes read and write management events",
    description:
      "This AWS control checks that there is at least one multi-region AWS CloudTrail trail includes read and write management events.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudTrail.1/remediation",
    severity: "high",
  },
  {
    controlId: "CloudTrail.2",
    title: "CloudTrail should have encryption at-rest enabled",
    description:
      "This AWS control checks whether AWS CloudTrail is configured to use the server side encryption (SSE) AWS Key Management Service (AWS KMS) customer master key (CMK) encryption. The check will pass if the KmsKeyId is defined.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudTrail.2/remediation",
    severity: "medium",
  },
  {
    controlId: "CloudTrail.4",
    title: "CloudTrail log file validation should be enabled",
    description:
      "This AWS control checks whether CloudTrail log file validation is enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudTrail.4/remediation",
    severity: "low",
  },
  {
    controlId: "CloudTrail.5",
    title: "CloudTrail trails should be integrated with Amazon CloudWatch Logs",
    description:
      "This AWS control checks whether AWS CloudTrail trails are configured to send logs to Amazon CloudWatch Logs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudTrail.5/remediation",
    severity: "low",
  },
  {
    controlId: "CloudWatch.15",
    title:
      "CloudWatch Alarms should have an action configured for the alarm state",
    description:
      "This control checks whether an Amazon CloudWatch alarm has at least one action configured for the 'ALARM' state. The control fails if the alarm doesn't have an action configured for the 'ALARM' state. Optionally, you can include custom parameter values to also require alarm actions for the 'INSUFFICIENT_DATA' or 'OK' states.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudWatch.15/remediation",
    severity: "high",
  },
  {
    controlId: "CloudWatch.16",
    title: "CloudWatch log groups should be retained for at least 1 year",
    description:
      "This control checks whether an Amazon CloudWatch log group has a retention period of at least the specified number of days. The control fails if the retention period is less than the specified number. Unless you provide a custom parameter value for the retention period, Security Hub uses a default value of 365 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudWatch.16/remediation",
    severity: "medium",
  },
  {
    controlId: "CloudWatch.17",
    title: "CloudWatch alarm actions should be enabled",
    description:
      "This control evaluates if CloudWatch alarm actions are enabled. The control fails if the alarm action is in the disabled state.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CloudWatch.17/remediation",
    severity: "high",
  },
  {
    controlId: "CodeBuild.1",
    title:
      "CodeBuild Bitbucket source repository URLs should not contain sensitive credentials",
    description:
      "This control checks whether an AWS CodeBuild project Bitbucket source repository URL contains personal access tokens or a user name and password. The control fails if the Bitbucket source repository URL contains personal access tokens or a user name and password.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CodeBuild.1/remediation",
    severity: "critical",
  },
  {
    controlId: "CodeBuild.2",
    title:
      "CodeBuild project environment variables should not contain clear text credentials",
    description:
      "This AWS control checks whether the project contains environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CodeBuild.2/remediation",
    severity: "critical",
  },
  {
    controlId: "CodeBuild.3",
    title: "CodeBuild S3 logs should be encrypted",
    description:
      "This control checks if Amazon S3 logs for an AWS CodeBuild project are encrypted. The control fails if encryption is deactivated for S3 Logs for a CodeBuild project.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CodeBuild.3/remediation",
    severity: "low",
  },
  {
    controlId: "CodeBuild.4",
    title: "CodeBuild project environments should have a logging configuration",
    description:
      "This control checks whether a CodeBuild project environment has at least one log option enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/CodeBuild.4/remediation",
    severity: "medium",
  },
  {
    controlId: "Config.1",
    title:
      "AWS Config should be enabled and use the service-linked role for resource recording",
    description:
      "This control checks whether AWS Config is enabled in your account in the current AWS Region, records all resources that correspond to controls that are enabled in the current Region, and uses the service-linked AWS Config role.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Config.1/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.1",
    title:
      "Database Migration Service replication instances should not be public",
    description:
      "This AWS control checks whether AWS Database Migration Service replication instances are public by examining the PubliclyAccessible field value.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.1/remediation",
    severity: "critical",
  },
  {
    controlId: "DMS.10",
    title:
      "DMS endpoints for Neptune databases should have IAM authorization enabled",
    description:
      "This control checks whether an AWS DMS endpoint for an Amazon Neptune database is configured with IAM authorization. The control fails if the DMS endpoint doesn't have IAM authorization enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.10/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.11",
    title:
      "DMS endpoints for MongoDB should have an authentication mechanism enabled",
    description:
      "This control checks whether an AWS DMS endpoint for MongoDB is configured with an authentication mechanism. The control fails if an authentication type isn't set for the endpoint.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.11/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.12",
    title: "DMS endpoints for Redis should have TLS enabled",
    description:
      "This control checks whether an AWS DMS endpoint for Redis OSS is configured with a TLS connection. The control fails if the endpoint doesn't have TLS enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.12/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.6",
    title:
      "DMS replication instances should have automatic minor version upgrade enabled",
    description:
      "This control checks if automatic minor version upgrade is enabled for an AWS DMS replication instance. The control fails if automatic minor version upgrade isn't enabled for a DMS replication instance.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.6/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.7",
    title:
      "DMS replication tasks for the target database should have logging enabled",
    description:
      "This control checks whether logging is enabled with the minimum severity level of LOGGER_SEVERITY_DEFAULT for DMS replication task events TARGET_APPLY and TARGET_LOAD. The control fails if logging isn't enabled for these events or if the minimum severity level is less than LOGGER_SEVERITY_DEFAULT.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.7/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.8",
    title:
      "DMS replication tasks for the source database should have logging enabled",
    description:
      "The control checks whether logging is enabled with the minimum severity level of LOGGER_SEVERITY_DEFAULT for DMS replication task events SOURCE_CAPTURE and SOURCE_UNLOAD. The control fails if logging isn't enabled for these events of the source database or if the minimum severity level is less than LOGGER_SEVERITY_DEFAULT.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.8/remediation",
    severity: "medium",
  },
  {
    controlId: "DMS.9",
    title: "DMS endpoints should use SSL",
    description:
      "This control checks whether an AWS DMS endpoint uses an SSL connection. The control fails if the endpoint doesn't use SSL.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DMS.9/remediation",
    severity: "medium",
  },
  {
    controlId: "DataFirehose.1",
    title: "Firehose delivery streams should be encrypted at rest",
    description:
      "This control checks whether an Amazon Data Firehose delivery stream is encrypted at rest with server-side encryption. This control fails if the delivery stream is not encrypted at rest with server-side encryption.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DataFirehose.1/remediation",
    severity: "medium",
  },
  {
    controlId: "DocumentDB.1",
    title: "Amazon DocumentDB clusters should be encrypted at rest",
    description:
      "This control checks whether an Amazon DocumentDB cluster is encrypted at rest. The control fails if an Amazon DocumentDB cluster isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DocumentDB.1/remediation",
    severity: "medium",
  },
  {
    controlId: "DocumentDB.2",
    title: "Amazon DocumentDB clusters should have automated backups enabled",
    description:
      "This control checks whether an Amazon DocumentDB cluster has a backup retention period greater than or equal to the specified time frame. The control fails if the backup retention period is less than the specified time frame. Unless you provide a custom parameter value for the backup retention period, Security Hub uses a default value of 7 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DocumentDB.2/remediation",
    severity: "medium",
  },
  {
    controlId: "DocumentDB.3",
    title: "Amazon DocumentDB manual cluster snapshots should not be public",
    description:
      "This control checks whether an Amazon DocumentDB manual snapshot is public. The control fails if the manual snapshot is public.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DocumentDB.3/remediation",
    severity: "critical",
  },
  {
    controlId: "DocumentDB.4",
    title:
      "Amazon DocumentDB clusters should publish audit logs to CloudWatch Logs",
    description:
      "This control checks whether a DocumentDB cluster publishes audit logs to Amazon CloudWatch Logs. The control fails if a DocumentDB cluster doesn't publish audit logs to CloudWatch Logs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DocumentDB.4/remediation",
    severity: "medium",
  },
  {
    controlId: "DocumentDB.5",
    title: "Amazon DocumentDB clusters should have deletion protection enabled",
    description:
      "This control checks if an Amazon Document DB cluster has deletion protection enabled. This control fails if the cluster doesn't have deletion protection enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DocumentDB.5/remediation",
    severity: "medium",
  },
  {
    controlId: "DynamoDB.1",
    title: "DynamoDB tables should automatically scale capacity with demand",
    description:
      "This control checks whether an Amazon DynamoDB table can scale its read and write capacity as needed. The control fails if the table doesn't use on-demand capacity mode or provisioned mode with auto scaling configured. By default, this control only requires that one of these modes be configured, without regard to specific levels of read or write capacity. Optionally, you can provide custom parameter values to require specific levels of read and write capacity.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DynamoDB.1/remediation",
    severity: "medium",
  },
  {
    controlId: "DynamoDB.2",
    title: "DynamoDB tables should have point-in-time recovery enabled",
    description:
      "This control checks whether point-in-time recovery (PITR) is enabled for a DynamoDB table.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DynamoDB.2/remediation",
    severity: "medium",
  },
  {
    controlId: "DynamoDB.4",
    title: "DynamoDB tables should be present in a backup plan",
    description:
      "This control evaluates whether an Amazon DynamoDB table in 'ACTIVE' state is covered by a backup plan. The control fails if the DynamoDB table isn\u2019t covered by a backup plan. If you set the backupVaultLockCheck parameter equal to true, the control passes only if the DynamoDB table is backed up in an AWS Backup locked vault.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DynamoDB.4/remediation",
    severity: "medium",
  },
  {
    controlId: "DynamoDB.6",
    title: "DynamoDB tables should have deletion protection enabled",
    description:
      "This control checks whether an Amazon DynamoDB table has deletion protection enabled. The control fails if a DynamoDB table doesn't have deletion protection enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/DynamoDB.6/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.1",
    title: "EBS snapshots should not be publicly restorable",
    description:
      "This AWS control checks whether Amazon Elastic Block Store snapshots are not publicly restorable.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.1/remediation",
    severity: "critical",
  },
  {
    controlId: "EC2.10",
    title:
      "Amazon EC2 should be configured to use VPC endpoints that are created for the Amazon EC2 service",
    description:
      "This control checks whether a service endpoint for Amazon EC2 is created for each VPC. The control fails if a VPC does not have a VPC endpoint created for the Amazon EC2 service.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.10/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.12",
    title: "Unused EC2 EIPs should be removed",
    description:
      "This AWS control will assist you maintain an accurate asset inventory of EIPs by checking wheather Elastic IP addresses that are allocated to a VPC are attached to EC2 instances or in-use elastic network interfaces (ENIs).",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.12/remediation",
    severity: "low",
  },
  {
    controlId: "EC2.13",
    title: "Security groups should not allow ingress from 0.0.0.0/0 to port 22",
    description:
      "This control checks whether an Amazon EC2 security group allows ingress from \u20180.0.0.0/0\u2019 or \u2018::/0\u2019 to port 22. The control fails if the security group allows ingress from \u20180.0.0.0/0\u2019 or \u2018::/0\u2019 to port 22.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.13/remediation",
    severity: "high",
  },
  {
    controlId: "EC2.15",
    title: "EC2 subnets should not automatically assign public IP addresses",
    description:
      "This control checks if the assignment of public IPs in Amazon Virtual Private Cloud (VPC) subnets have the MapPublicIpOnLaunch set to FALSE. The control will pass if the flag is set to FALSE.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.15/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.16",
    title: "Unused Network Access Control Lists should be removed",
    description:
      "This control checks to see if there are any NACLs (Network Access Control List) that are unused. The control will check the item configuration of the resource AWS::EC2::NetworkAcl and determine the relationships of the NACL.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.16/remediation",
    severity: "low",
  },
  {
    controlId: "EC2.17",
    title: "EC2 instances should not use multiple ENIs",
    description:
      "This control checks to see if Amazon EC2 instance uses multiple ENI/EFA. This control will pass if single network adapters is used.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.17/remediation",
    severity: "low",
  },
  {
    controlId: "EC2.18",
    title:
      "Security groups should only allow unrestricted incoming traffic for authorized ports",
    description:
      "This control checks whether an Amazon EC2 security group permits unrestricted incoming traffic from unauthorized ports. The control status is determined as follows: If you use the default value for 'authorizedTcpPorts', the control fails if the security group permits unrestricted incoming traffic from any port other than ports 80 and 443; If you provide custom values for 'authorizedTcpPorts' or 'authorizedUdpPorts', the control fails if the security group permits unrestricted incoming traffic from any unlisted port; If no parameter is used, the control fails for any security group that has an unrestricted inbound traffic rule.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.18/remediation",
    severity: "high",
  },
  {
    controlId: "EC2.19",
    title:
      "Security groups should not allow unrestricted access to ports with high risk",
    description:
      "This control checks whether unrestricted incoming traffic for an Amazon EC2 security group is accessible to the specified ports [3389, 20, 23, 110, 143, 3306, 8080, 1433, 9200, 9300, 25, 445, 135, 21, 1434, 4333, 5432, 5500, 5601, 22, 3000, 5000, 8088, 8888] that are considered to be high risk. This control fails if any of the rules in a security group allow ingress traffic from '0.0.0.0/0' or '::/0' to those ports.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.19/remediation",
    severity: "critical",
  },
  {
    controlId: "EC2.2",
    title:
      "VPC default security groups should not allow inbound or outbound traffic",
    description:
      "This AWS control checks that the default security group of a VPC does not allow inbound or outbound traffic.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.2/remediation",
    severity: "high",
  },
  {
    controlId: "EC2.20",
    title:
      "Both VPN tunnels for an AWS Site-to-Site VPN connection should be up",
    description:
      "This control checks that both VPN tunnels provided by AWS Site-to-Site VPN are in UP status. The control fails if one or both tunnels are in DOWN status.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.20/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.21",
    title:
      "Network ACLs should not allow ingress from 0.0.0.0/0 to port 22 or port 3389",
    description:
      "This control checks whether a network access control list (NACL) allows unrestricted access to the default ports for SSH/RDP ingress traffic. The rule fails if a NACL inbound entry allows a source CIDR block of '0.0.0.0/0' or '::/0' for ports 22 or 3389",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.21/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.23",
    title:
      "EC2 Transit Gateways should not automatically accept VPC attachment requests",
    description:
      "This control checks if EC2 Transit Gateways are automatically accepting shared VPC attachments requests. This control will fail for a Transit Gateway that automatically accept shared VPC attachment requests.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.23/remediation",
    severity: "high",
  },
  {
    controlId: "EC2.25",
    title:
      "EC2 launch templates should not assign public IPs to network interfaces",
    description:
      "This control checks if Amazon EC2 launch templates are configured to assign public IP addresses to network interfaces upon launch. The control fails if an EC2 launch template is configured to assign a public IP address to network interfaces or if there is at least one network interface that has a public IP address.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.25/remediation",
    severity: "high",
  },
  {
    controlId: "EC2.28",
    title: "EBS volumes should be in a backup plan",
    description:
      "This control evaluates if an Amazon EBS volume in 'in-use' state is covered by a backup plan. The control fails if an EBS volume isn\u2019t covered by a backup plan. If you set the 'backupVaultLockCheck' parameter equal to 'true', the control passes only if the EBS volume is backed up in an AWS Backup locked vault.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.28/remediation",
    severity: "low",
  },
  {
    controlId: "EC2.3",
    title: "Attached EBS volumes should be encrypted at-rest",
    description:
      "This AWS control checks whether the EBS volumes that are in an attached state are encrypted.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.3/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.4",
    title:
      "Stopped EC2 instances should be removed after a specified time period",
    description:
      "This control checks whether an Amazon EC2 instance has been stopped for longer than the allowed number of days. The control fails if an EC2 instance is stopped for longer than the maximum allowed time period. Unless you provide a custom parameter value for the maximum allowed time period, Security Hub uses a default value of 30 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.4/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.51",
    title:
      "EC2 Client VPN Endpoints should have client connection logging enabled",
    description:
      "This control checks if an AWS Client VPN endpoint has client connection logging enabled. The control fails if the endpoint doesn't have client connection logging enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.51/remediation",
    severity: "low",
  },
  {
    controlId: "EC2.6",
    title: "VPC flow logging should be enabled in all VPCs",
    description:
      "This control checks whether Amazon Virtual Private Cloud flow logs are found and enabled for Amazon VPCs. The traffic type is set to 'Reject'.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.6/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.7",
    title: "EBS default encryption should be enabled",
    description:
      "This control checks whether Amazon Elastic Block Store (EBS) encryption is enabled by default. The control fails if EBS default encryption is not enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.7/remediation",
    severity: "medium",
  },
  {
    controlId: "EC2.8",
    title:
      "EC2 instances should use Instance Metadata Service Version 2 (IMDSv2)",
    description:
      "This control checks whether your Amazon Elastic Compute Cloud (Amazon EC2) instance metadata version is configured with Instance Metadata Service Version 2 (IMDSv2). The control passes if HttpTokens is set to required for IMDSv2. The control fails if HttpTokens is set to optional.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.8/remediation",
    severity: "high",
  },
  {
    controlId: "EC2.9",
    title: "EC2 instances should not have a public IPv4 address",
    description:
      "This control checks whether EC2 instances have a public IP address. The control fails if the publicIp field is present in the EC2 instance configuration item. This control applies to IPv4 addresses only.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EC2.9/remediation",
    severity: "high",
  },
  {
    controlId: "ECR.1",
    title: "ECR private repositories should have image scanning configured",
    description:
      "This control checks whether a private ECR repository has image scanning configured. This control fails if a private ECR repository doesn\u2019t have image scanning configured.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECR.1/remediation",
    severity: "high",
  },
  {
    controlId: "ECR.2",
    title: "ECR private repositories should have tag immutability configured",
    description:
      "This control checks whether a private ECR repository has tag immutability configured. This control fails if a private ECR repository has tag immutability disabled. This rule passes if tag immutability is configured and has the value IMMUTABLE",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECR.2/remediation",
    severity: "medium",
  },
  {
    controlId: "ECR.3",
    title:
      "ECR repositories should have at least one lifecycle policy configured",
    description:
      "This control checks whether an ECR repository has at least one lifecycle policy configured. This control fails if an ECR repository does not have any lifecycle policies configured.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECR.3/remediation",
    severity: "medium",
  },
  {
    controlId: "ECS.1",
    title:
      "Amazon ECS task definitions should have secure networking modes and user definitions.",
    description:
      'This control checks if an Amazon ECS Task Definition with host networking mode has "privileged" or "user" container definitions. The control fails with host network mode and container definitions are privileged=false or empty and user=root or empty.',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.1/remediation",
    severity: "high",
  },
  {
    controlId: "ECS.10",
    title:
      "ECS Fargate services should run on the latest Fargate platform version",
    description:
      "This control checks if ECS Fargate services is running the latest Fargate platform version. This control fails if the platform version is not latest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.10/remediation",
    severity: "medium",
  },
  {
    controlId: "ECS.12",
    title: "ECS clusters should use Container Insights",
    description:
      "This control checks if ECS clusters use Container Insights. This control fails if Container Insights are not set up for a cluster.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.12/remediation",
    severity: "medium",
  },
  {
    controlId: "ECS.2",
    title:
      "ECS services should not have public IP addresses assigned to them automatically",
    description:
      "This control checks whether ECS services are configured to automatically assign public IP addresses. This control fails if AssignPublicIP is ENABLED.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.2/remediation",
    severity: "high",
  },
  {
    controlId: "ECS.3",
    title: "ECS task definitions should not share the host's process namespace",
    description:
      "This control checks if Amazon ECS task definitions are configured to share a host's process namespace with its containers. This control fails if the task definition shares the host's process namespace with the containers running on it",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.3/remediation",
    severity: "high",
  },
  {
    controlId: "ECS.4",
    title: "ECS containers should run as non-privileged",
    description:
      "This control checks if the privileged parameter in the container definition of Amazon ECS task definitions is set to 'true'. This control fails if this parameter is equal to 'true'.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.4/remediation",
    severity: "high",
  },
  {
    controlId: "ECS.5",
    title:
      "ECS containers should be limited to read-only access to root filesystems",
    description:
      "This control checks if ECS containers are limited to read-only access to mounted root filesystems. This control fails if the ReadonlyRootFilesystem parameter in the container definition of ECS task definitions is set to \u2018false\u2019.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.5/remediation",
    severity: "high",
  },
  {
    controlId: "ECS.8",
    title: "Secrets should not be passed as container environment variables",
    description:
      "This control checks if the key value of any variables in the \u2018environment\u2019 parameter of container definitions includes - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,  or ECS_ENGINE_AUTH_DATA.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.8/remediation",
    severity: "high",
  },
  {
    controlId: "ECS.9",
    title: "ECS task definitions should have a logging configuration",
    description:
      "This control checks if the latest active Amazon ECS task definition has a logging configuration specified. The control fails if the task definition doesn't have the logConfiguration property defined or if the value for logDriver is null in at least one container definition.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ECS.9/remediation",
    severity: "high",
  },
  {
    controlId: "EFS.1",
    title:
      "Elastic File System should be configured to encrypt file data at-rest using AWS KMS",
    description:
      "This AWS control checks whether Amazon Elastic File System (Amazon EFS) is configured to encrypt the file data using AWS Key Management Service (AWS KMS). The check will fail if the encrypted key is set to false on DescribeFileSystems or if the KmsKeyId key on DescribeFileSystems does not match the KmsKeyId parameter.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EFS.1/remediation",
    severity: "medium",
  },
  {
    controlId: "EFS.2",
    title: "Amazon EFS volumes should be in backup plans",
    description:
      "This control checks whether Amazon Elastic File System (Amazon EFS) file systems are added to the backup plans in AWS Backup. The control fails if EFS file systems are not included in the backup plans.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EFS.2/remediation",
    severity: "medium",
  },
  {
    controlId: "EFS.3",
    title: "EFS access points should enforce a root directory",
    description:
      "This control checks if Amazon Elastic File System (Amazon EFS) access points are configured to enforce a root directory. This control fails if the value of 'Path' is set to '/' (default root directory of the file system).",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EFS.3/remediation",
    severity: "medium",
  },
  {
    controlId: "EFS.4",
    title: "EFS access points should enforce a user identity",
    description:
      "This control checks whether Amazon Elastic File System (Amazon EFS) access points are configured to enforce a user identity. This control fails if \u2018PosixUser\u2019 is not defined under \u2018configuration\u2019 or if parameters are provided and there is no match in the corresponding parameter.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EFS.4/remediation",
    severity: "medium",
  },
  {
    controlId: "EKS.1",
    title: "EKS cluster endpoints should not be publicly accessible",
    description:
      "This control checks whether an Amazon EKS cluster endpoint is publicly accessible. The control fails if an EKS cluster has an endpoint that is publicly accessible.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EKS.1/remediation",
    severity: "high",
  },
  {
    controlId: "EKS.2",
    title: "EKS clusters should run on a supported Kubernetes version",
    description:
      "This control checks whether an EKS cluster is running on a supported Kubernetes version. The control fails if the EKS cluster is running on an unsupported version.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EKS.2/remediation",
    severity: "high",
  },
  {
    controlId: "EKS.3",
    title: "EKS clusters should use encrypted Kubernetes secrets",
    description:
      "This control checks whether an Amazon EKS cluster uses encrypted Kubernetes secrets. The control fails if the cluster's Kubernetes secrets aren't encrypted.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EKS.3/remediation",
    severity: "medium",
  },
  {
    controlId: "EKS.8",
    title: "EKS clusters should have audit logging enabled",
    description:
      "This control checks whether an Amazon EKS cluster has audit logging enabled. The control fails if audit logging isn't enabled for the cluster.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EKS.8/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.1",
    title:
      "Application Load Balancer should be configured to redirect all HTTP requests to HTTPS",
    description:
      "This AWS control checks whether HTTP to HTTPS redirection is configured on all HTTP listeners of Application Load Balancers. The control will fail if one or more HTTP listeners of Application Load Balancers do not have HTTP to HTTPS redirection configured.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.1/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.10",
    title: "Classic Load Balancer should span multiple Availability Zones",
    description:
      "This control checks whether a Classic Load Balancer has been configured to span at least the specified number of Availability Zones (AZs). The control fails if the Classic Load Balancer does not span at least the specified number of AZs. Unless you provide a custom parameter value for the minimum number of AZs, Security Hub uses a default value of two AZs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.10/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.12",
    title:
      "Application Load Balancer should be configured with defensive or strictest desync mitigation mode",
    description:
      "This control checks whether the Application Load Balancer is configured with defensive or strictest de-sync mitigation mode. This control fails if the Application Load Balancer is not configured with defensive or strictest desync mitigation mode.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.12/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.13",
    title:
      "Application, Network and Gateway Load Balancers should span multiple Availability Zones",
    description:
      "This control checks whether an Elastic Load Balancer V2 (Application, Network, or Gateway Load Balancer) has registered instances from at least the specified number of Availability Zones (AZs). The control fails if an Elastic Load Balancer V2 doesn't have instances registered in at least the specified number of AZs. Unless you provide a custom parameter value for the minimum number of AZs, Security Hub uses a default value of two AZs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.13/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.14",
    title:
      "Classic Load Balancer should be configured with defensive or strictest desync mitigation mode",
    description:
      "This control checks whether the Classic Load Balancer is configured with defensive or strictest desync mitigation mode. This control will fail if the Classic Load Balancer is not configured with defensive or strictest desync mitigation mode.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.14/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.16",
    title:
      "Application Load Balancers should be associated with an AWS WAF web ACL",
    description:
      "This control checks whether Application Load Balancers are associated with an AWS WAF web ACL. The control fails if the Enabled field for the WAF configuration is set to false.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.16/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.2",
    title:
      "Classic Load Balancers with SSL/HTTPS listeners should use a certificate provided by AWS Certificate Manager",
    description:
      "This control checks whether a Classic Load Balancer uses HTTPS/SSL certificates provided by AWS Certificate Manager. The control fails if a Classic Load Balancer that is configured with an HTTPS/SSL listener does not use a certificate provided by AWS Certificate Manager.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.2/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.3",
    title:
      "Classic Load Balancer listeners should be configured with HTTPS or TLS termination",
    description:
      "This control checks whether your Classic Load Balancer listeners are configured with HTTPS or TLS protocol for front-end (client to load balancer) connections. The control is applicable if a Classic Load Balancer has listeners. If your Classic Load Balancer does not have a listener configured, then the control does not report any findings.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.3/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.4",
    title:
      "Application load balancer should be configured to drop http headers",
    description:
      "This control evaluates AWS Application Load Balancers (ALB) to ensure they are configured to drop invalid http headers. By default, ALBs are not configured to drop invalid http header values. This control evaluates all ALBs fails if the attribute value of routing.http.drop_invalid_header_fields.enabled is set to false.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.4/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.5",
    title: "Application and Classic Load Balancers logging should be enabled",
    description:
      "This control checks whether the Application Load Balancer and the Classic Load Balancer have logging enabled. The control fails if the access_logs.s3.enabled is false.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.5/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.6",
    title: "Application Load Balancer deletion protection should be enabled",
    description:
      "This control checks whether Application, Gateway, and Network Load Balancers have deletion protection enabled. The control fails if deletion protection is disabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.6/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.7",
    title: "Classic Load Balancers should have connection draining enabled",
    description:
      "This control checks whether AWS Classic Load Balancers have connection draining enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.7/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.8",
    title:
      "Classic Load Balancers with SSL listeners should use a predefined security policy that has strong configuration",
    description:
      "This control checks whether your Classic Load Balancer SSL listeners use the predefined policy ELBSecurityPolicy-TLS-1-2-2017-01. The control fails if the Classic Load Balancer SSL listeners do not use the predefined policy ELBSecurityPolicy-TLS-1-2-2017-01.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.8/remediation",
    severity: "medium",
  },
  {
    controlId: "ELB.9",
    title:
      "Classic Load Balancers should have cross-zone load balancing enabled",
    description:
      "This control checks whether cross-zone load balancing is enabled for Classic Load Balancers. This control fails if cross-zone load balancing is not enabled for a Classic Load Balancer.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ELB.9/remediation",
    severity: "medium",
  },
  {
    controlId: "EMR.1",
    title:
      "Amazon Elastic MapReduce cluster master nodes should not have public IP addresses",
    description:
      "This control checks whether primary nodes on EMR clusters have public IP addresses.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EMR.1/remediation",
    severity: "high",
  },
  {
    controlId: "EMR.2",
    title: "Amazon EMR block public access setting should be enabled",
    description:
      "This control checks whether your account is configured with Amazon EMR block public access. The control fails if the block public access setting is not enabled or if any port other than 22 is allowed.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EMR.2/remediation",
    severity: "critical",
  },
  {
    controlId: "ES.1",
    title: "Elasticsearch domains should have encryption at-rest enabled",
    description:
      "This AWS control checks whether Elasticsearch domains have encryption at rest configuration enabled. This check fails if the EncryptionAtRestOptions field is not enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.1/remediation",
    severity: "medium",
  },
  {
    controlId: "ES.2",
    title: "Elasticsearch domains should not be publicly accessible",
    description:
      "This control checks whether an Elasticsearch domain is publicly accessible. The control fails if an Elasticsearch domain is publicly accessible. It does not evaluate the VPC subnet routing configuration to determine public access.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.2/remediation",
    severity: "critical",
  },
  {
    controlId: "ES.3",
    title: "Elasticsearch domains should encrypt data sent between nodes",
    description:
      "This control checks whether Elasticsearch domains have node-to-node encryption enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.3/remediation",
    severity: "medium",
  },
  {
    controlId: "ES.4",
    title:
      "Elasticsearch domain error logging to CloudWatch Logs should be enabled",
    description:
      "This control checks whether Elasticsearch domains are configured to send error logs to CloudWatch Logs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.4/remediation",
    severity: "medium",
  },
  {
    controlId: "ES.5",
    title: "Elasticsearch domains should have audit logging enabled",
    description:
      "This control checks whether Elasticsearch domains have audit logging enabled. This control fails if an Elasticsearch domain does not have audit logging enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.5/remediation",
    severity: "medium",
  },
  {
    controlId: "ES.6",
    title: "Elasticsearch domains should have at least three data nodes",
    description:
      "This control checks whether Elasticsearch domains are configured with at least three data nodes and zoneAwarenessEnabled is true.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.6/remediation",
    severity: "medium",
  },
  {
    controlId: "ES.7",
    title:
      "Elasticsearch domains should be configured with at least three dedicated master nodes",
    description:
      "This control checks whether Elasticsearch domains are configured with at least three dedicated master nodes. This control fails if dedicatedMasterEnabled is not true.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.7/remediation",
    severity: "medium",
  },
  {
    controlId: "ES.8",
    title:
      "Connections to Elasticsearch domains should be encrypted using the latest TLS security policy",
    description:
      "This controls checks whether connections to an Elasticsearch domain are using the latest TLS security policy. The control fails if the Elasticsearch domain isn't using the latest supported policy or if HTTPs isn't enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ES.8/remediation",
    severity: "medium",
  },
  {
    controlId: "ElastiCache.1",
    title: "ElastiCache Redis clusters should have automatic backup enabled",
    description:
      "This control evaluates whether an Amazon ElastiCache (Redis OSS) cluster has automatic backups enabled. The control fails if the 'SnapshotRetentionLimit' for the Redis OSS cluster is less than the specified time period. Unless you provide a custom parameter value for the snapshot retention period, Security Hub uses a default value of 1 day.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.1/remediation",
    severity: "high",
  },
  {
    controlId: "ElastiCache.2",
    title:
      "ElastiCache for Redis cache clusters should have auto minor version upgrades enabled",
    description:
      "This control evaluates whether ElastiCache (Redis OSS) automatically applies minor version upgrades to a cache cluster. The control fails if ElastiCache (Redis OSS) cache clusters don't have minor version upgrades automatically applied.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.2/remediation",
    severity: "high",
  },
  {
    controlId: "ElastiCache.3",
    title:
      "ElastiCache replication groups should have automatic failover enabled",
    description:
      "This control checks whether an ElastiCache replication group has automatic failover enabled. The control fails if automatic failover isn't enabled for an ElastiCache replication group.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.3/remediation",
    severity: "medium",
  },
  {
    controlId: "ElastiCache.4",
    title:
      "ElastiCache replication groups should have encryption-at-rest enabled",
    description:
      "This control checks whether an ElastiCache replication group is encrypted at rest. The control fails if an ElastiCache replication group isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.4/remediation",
    severity: "medium",
  },
  {
    controlId: "ElastiCache.5",
    title:
      "ElastiCache replication groups should have encryption-in-transit enabled",
    description:
      "This control checks whether an ElastiCache replication group is encrypted in transit. The control fails if an ElastiCache replication group isn't encrypted in transit.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.5/remediation",
    severity: "medium",
  },
  {
    controlId: "ElastiCache.6",
    title:
      "ElastiCache replication groups of earlier Redis versions should have Redis AUTH enabled",
    description:
      "This control checks whether an ElastiCache (Redis OSS) replication group has Redis OSS AUTH enabled. The control fails if the Redis OSS version of the replication group nodes is below 6.0 and 'AuthToken' isn't in use.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.6/remediation",
    severity: "medium",
  },
  {
    controlId: "ElastiCache.7",
    title: "ElastiCache clusters should not use the default subnet group",
    description:
      "This control checks whether an ElastiCache cluster is configured with a custom subnet group. The control fails if 'CacheSubnetGroupName' for an ElastiCache cluster has the value 'default'.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElastiCache.7/remediation",
    severity: "high",
  },
  {
    controlId: "ElasticBeanstalk.1",
    title:
      "Elastic Beanstalk environments should have enhanced health reporting enabled",
    description:
      "This control checks whether enhanced health reporting is enabled for your AWS Elastic Beanstalk environments.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElasticBeanstalk.1/remediation",
    severity: "low",
  },
  {
    controlId: "ElasticBeanstalk.2",
    title: "Elastic Beanstalk managed platform updates should be enabled",
    description:
      "This control checks whether managed platform updates are enabled for an Elastic Beanstalk environment. The control fails if no managed platform updates are enabled. By default, the control passes if any type of platform update is enabled. Optionally, you can provide a custom parameter value to require a specific update level.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ElasticBeanstalk.2/remediation",
    severity: "high",
  },
  {
    controlId: "EventBridge.3",
    title:
      "EventBridge custom event buses should have a resource-based policy attached",
    description:
      "This control checks if an Amazon EventBridge custom event bus has a resource policy attached. This control fails if the custom event bus doesn't have a resource policy.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EventBridge.3/remediation",
    severity: "low",
  },
  {
    controlId: "EventBridge.4",
    title: "EventBridge global endpoints should have event replication enabled",
    description:
      "This control checks if event replication is enabled for an Amazon EventBridge global endpoint. The control fails if event replication isn't enabled for a global endpoint.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/EventBridge.4/remediation",
    severity: "medium",
  },
  {
    controlId: "FSx.1",
    title:
      "FSx OpenZFS file systems should be configured to copy tags to backups and volumes",
    description:
      "This control checks if an Amazon FSx for OpenZFS file system is configured to copy tags to backups and volumes. The control fails if the OpenZFS file system isn't configured to copy tags to backups and volumes.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/FSx.1/remediation",
    severity: "low",
  },
  {
    controlId: "FSx.2",
    title:
      "FSx for Lustre file systems should be configured to copy tags to backups",
    description:
      "This control checks whether an Amazon FSx for Lustre file system is configured to copy tags to backups. This control fails if the Lustre file system isn't configured to copy tags to backups.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/FSx.2/remediation",
    severity: "low",
  },
  {
    controlId: "GuardDuty.1",
    title: "GuardDuty should be enabled",
    description:
      "This AWS control checks whether Amazon GuardDuty is enabled in your AWS account and region.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/GuardDuty.1/remediation",
    severity: "high",
  },
  {
    controlId: "IAM.1",
    title: 'IAM policies should not allow full "*" administrative privileges',
    description:
      'This AWS control checks whether the default version of AWS Identity and Access Management (IAM) policies (also known as customer managed policies) do not have administrator access with a statement that has "Effect": "Allow" with "Action": "*" over "Resource": "*". It only checks for the Customer Managed Policies that you created, but not inline and AWS Managed Policies.',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.1/remediation",
    severity: "high",
  },
  {
    controlId: "IAM.19",
    title: "MFA should be enabled for all IAM users",
    description:
      "This AWS control checks whether the AWS Identity and Access Management users have multi-factor authentication (MFA) enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.19/remediation",
    severity: "medium",
  },
  {
    controlId: "IAM.2",
    title: "IAM users should not have IAM policies attached",
    description:
      "This AWS control checks that none of your IAM users have policies attached. Instead, IAM users must inherit permissions from IAM groups or roles.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.2/remediation",
    severity: "low",
  },
  {
    controlId: "IAM.21",
    title:
      "IAM customer managed policies that you create should not allow wildcard actions for services",
    description:
      'This control checks whether the IAM identity-based custom policies have Allow statements that grant permissions for all actions on a service. The control fails if any policy statement includes "Effect": "Allow" with "Action": "Service:*".',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.21/remediation",
    severity: "low",
  },
  {
    controlId: "IAM.3",
    title: "IAM users' access keys should be rotated every 90 days or less",
    description:
      "This AWS control checks whether the active access keys are rotated within 90 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.3/remediation",
    severity: "medium",
  },
  {
    controlId: "IAM.4",
    title: "IAM root user access key should not exist",
    description:
      "This AWS control checks whether the root user access key is available.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.4/remediation",
    severity: "critical",
  },
  {
    controlId: "IAM.5",
    title:
      "MFA should be enabled for all IAM users that have a console password",
    description:
      "This AWS control checks whether AWS Multi-Factor Authentication (MFA) is enabled for all AWS Identity and Access Management (IAM) users that use a console password.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.5/remediation",
    severity: "medium",
  },
  {
    controlId: "IAM.6",
    title: "Hardware MFA should be enabled for the root user",
    description:
      "This AWS control checks whether your AWS account is enabled to use a hardware multi-factor authentication (MFA) device to sign in with root user credentials.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.6/remediation",
    severity: "critical",
  },
  {
    controlId: "IAM.7",
    title: "Password policies for IAM users should have strong configurations",
    description:
      "This control checks whether the account password policy for IAM users uses strong configurations. The control fails if the password policy doesn't use strong configurations. Unless you provide custom parameter values, Security Hub uses the default values mentioned in the preceding table. The 'PasswordReusePrevention' and 'MaxPasswordAge' parameters have no default value, so if you exclude these parameters, Security Hub ignores number of password rotations and password age when evaluating this control.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.7/remediation",
    severity: "medium",
  },
  {
    controlId: "IAM.8",
    title: "Unused IAM user credentials should be removed",
    description:
      "This control checks whether your IAM users have passwords or active access keys that were not used within the previous 90 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.8/remediation",
    severity: "medium",
  },
  {
    controlId: "IAM.9",
    title: "MFA should be enabled for the root user",
    description:
      "This AWS control checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root user credentials.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/IAM.9/remediation",
    severity: "critical",
  },
  {
    controlId: "KMS.1",
    title:
      "IAM customer managed policies should not allow decryption actions on all KMS keys",
    description:
      "Checks whether the default version of IAM customer managed policies allow principals to use the AWS Key Management Service (KMS) decryption actions on all resources. This control fails if kms:Decrypt or kms:ReEncryptFrom actions are allowed on all KMS keys. The control evaluates both attached and unattached customer managed policies. It does not check inline policies or AWS managed policies.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/KMS.1/remediation",
    severity: "medium",
  },
  {
    controlId: "KMS.2",
    title:
      "IAM principals should not have IAM inline policies that allow decryption actions on all KMS keys",
    description:
      "Checks whether the inline policies embedded in your IAM principals (Role/User/Group) allow the AWS Key Management Service (KMS) decryption actions on all KMS keys. This control fails if kms:Decrypt or kms:ReEncryptFrom actions are allowed on all KMS keys in an inline policy.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/KMS.2/remediation",
    severity: "medium",
  },
  {
    controlId: "KMS.3",
    title: "AWS KMS keys should not be deleted unintentionally",
    description:
      "This control checks whether AWS Key Management Service (KMS) customer managed keys (CMK) are scheduled for deletion. The control fails if a KMS CMK is scheduled for deletion.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/KMS.3/remediation",
    severity: "critical",
  },
  {
    controlId: "KMS.4",
    title: "AWS KMS key rotation should be enabled",
    description:
      "This AWS control checks that key rotation is enabled for each AWS KMS key. It does not check KMS keys that have imported key material.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/KMS.4/remediation",
    severity: "medium",
  },
  {
    controlId: "Kinesis.1",
    title: "Kinesis streams should be encrypted at rest",
    description:
      "This control checks if Kinesis streams are encrypted at rest with server-side encryption. This control fails if a Kinesis stream is not encrypted at rest with server-side encryption.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Kinesis.1/remediation",
    severity: "medium",
  },
  {
    controlId: "Lambda.1",
    title: "Lambda function policies should prohibit public access",
    description:
      "This control checks whether the AWS Lambda function policy attached to the Lambda resource prohibits public access. If the Lambda function policy allows public access, the control fails.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Lambda.1/remediation",
    severity: "critical",
  },
  {
    controlId: "Lambda.2",
    title: "Lambda functions should use supported runtimes",
    description:
      "This control checks whether Lambda function runtime settings match the expected values set for the supported runtimes in each language. The control fails if a Lambda function doesn't use a supported runtime.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Lambda.2/remediation",
    severity: "medium",
  },
  {
    controlId: "Lambda.3",
    title: "Lambda functions should be in a VPC",
    description:
      "This AWS control checks whether a Lambda function is in a VPC.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Lambda.3/remediation",
    severity: "low",
  },
  {
    controlId: "Lambda.5",
    title:
      "VPC Lambda functions should operate in more than one Availability Zone",
    description:
      "This control checks if an AWS Lambda function that connects to a virtual private cloud (VPC) operates in at least the specified number of Availability Zone (AZs). The control fails if the function doesn't operate in at least the specified number of AZs. Unless you provide a custom parameter value for the minimum number of AZs, Security Hub uses a default value of two AZs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Lambda.5/remediation",
    severity: "medium",
  },
  {
    controlId: "MQ.2",
    title: "ActiveMQ brokers should stream audit logs to CloudWatch",
    description:
      "This control checks whether an Amazon MQ ActiveMQ broker streams audit logs to Amazon CloudWatch Logs. The control fails if the broker doesn't stream audit logs to CloudWatch Logs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/MQ.2/remediation",
    severity: "medium",
  },
  {
    controlId: "MQ.3",
    title:
      "Amazon MQ brokers should have automatic minor version upgrade enabled",
    description:
      "This control checks whether an Amazon MQ broker has automatic minor version upgrade enabled. The control fails if the broker doesn't have automatic minor version upgrade enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/MQ.3/remediation",
    severity: "low",
  },
  {
    controlId: "MQ.5",
    title: "ActiveMQ brokers should use active/standby deployment mode",
    description:
      "This control checks whether the deployment mode for an Amazon MQ ActiveMQ broker is set to active/standby. The control fails if a single-instance broker (enabled by default) is set as the deployment mode.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/MQ.5/remediation",
    severity: "low",
  },
  {
    controlId: "MQ.6",
    title: "RabbitMQ brokers should use cluster deployment mode",
    description:
      "This control checks whether the deployment mode for an Amazon MQ RabbitMQ broker is set to cluster deployment. This control fails if a single-instance broker (enabled by default) is set as the deployment mode.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/MQ.6/remediation",
    severity: "low",
  },
  {
    controlId: "MSK.1",
    title: "MSK clusters should be encrypted in transit among broker nodes",
    description:
      "This controls checks if a MSK cluster allows encryption in transit using HTTPS(TLS) among the broker nodes of the cluster. The control fails if plain text communication is enabled for in cluster broker node connection.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/MSK.1/remediation",
    severity: "medium",
  },
  {
    controlId: "MSK.2",
    title: "Enhanced monitoring should be configured for MSK Clusters",
    description:
      'This control checks whether an Amazon MSK cluster has enhanced monitoring configured, specified by a monitoring level of at least "PER_TOPIC_PER_BROKER". The control fails if the monitoring level for the cluster is set to "DEFAULT" or "PER_BROKER".',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/MSK.2/remediation",
    severity: "low",
  },
  {
    controlId: "Macie.1",
    title: "Macie should be enabled",
    description:
      "This control checks whether Amazon Macie is enabled for an account. The control fails if Macie isn't enabled for the account.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Macie.1/remediation",
    severity: "medium",
  },
  {
    controlId: "Macie.2",
    title: "Macie automated sensitive data discovery should be enabled",
    description:
      "This control checks whether automated sensitive data discovery is enabled for an Amazon Macie administrator account. The control fails if automated sensitive data discovery isn't enabled for a Macie administrator account. The control doesn't generate a finding for member accounts.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Macie.2/remediation",
    severity: "high",
  },
  {
    controlId: "Neptune.1",
    title: "Neptune DB clusters should be encrypted at rest",
    description:
      "This control checks whether a Neptune DB cluster is encrypted at rest. The control fails if a Neptune DB cluster isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.1/remediation",
    severity: "medium",
  },
  {
    controlId: "Neptune.2",
    title: "Neptune DB clusters should publish audit logs to CloudWatch Logs",
    description:
      "This control checks whether a Neptune DB cluster publishes audit logs to Amazon CloudWatch Logs. The control fails if a Neptune DB cluster doesn't publish audit logs to CloudWatch Logs. `EnableCloudWatchLogsExport` should be set to Audit.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.2/remediation",
    severity: "medium",
  },
  {
    controlId: "Neptune.3",
    title: "Neptune DB cluster snapshots should not be public",
    description:
      "This control checks whether a Neptune manual DB cluster snapshot is public. The control fails if a Neptune manual DB cluster snapshot is public.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.3/remediation",
    severity: "critical",
  },
  {
    controlId: "Neptune.4",
    title: "Neptune DB clusters should have deletion protection enabled",
    description:
      "This control checks if a Neptune DB cluster has deletion protection enabled. The control fails if a Neptune DB cluster doesn't have deletion protection enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.4/remediation",
    severity: "low",
  },
  {
    controlId: "Neptune.5",
    title: "Neptune DB clusters should have automated backups enabled",
    description:
      "This control checks whether a Neptune DB cluster has automated backups enabled, and a backup retention period greater than or equal to the specified time frame. The control fails if backups aren't enabled for the Neptune DB cluster, or if the retention period is less than the specified time frame. Unless you provide a custom parameter value for the backup retention period, Security Hub uses a default value of 7 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.5/remediation",
    severity: "medium",
  },
  {
    controlId: "Neptune.6",
    title: "Neptune DB cluster snapshots should be encrypted at rest",
    description:
      "This control checks whether a Neptune DB cluster snapshot is encrypted at rest. The control fails if a Neptune DB cluster isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.6/remediation",
    severity: "medium",
  },
  {
    controlId: "Neptune.7",
    title:
      "Neptune DB clusters should have IAM database authentication enabled",
    description:
      "This control checks if a Neptune DB cluster has IAM database authentication enabled. The control fails if IAM database authentication isn't enabled for a Neptune DB cluster.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.7/remediation",
    severity: "medium",
  },
  {
    controlId: "Neptune.8",
    title: "Neptune DB clusters should be configured to copy tags to snapshots",
    description:
      "This control checks if a Neptune DB cluster is configured to copy all tags to snapshots when the snapshots are created. The control fails if a Neptune DB cluster isn't configured to copy tags to snapshots.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.8/remediation",
    severity: "low",
  },
  {
    controlId: "Neptune.9",
    title:
      "Neptune DB Clusters should be configured for multiple Availability Zones",
    description:
      "This control checks if an Amazon Neptune DB cluster has read-replica instances in multiple Availability Zones (AZs). The control fails if the cluster is deployed in only one AZ.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Neptune.9/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.1",
    title:
      "Network Firewall firewalls should be deployed across multiple Availability Zones",
    description:
      "This control evaluates whether a firewall managed through AWS Network Firewall is deployed across multiple Availability Zones (AZs). The control fails if a firewall is deployed in only one AZ.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.1/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.2",
    title: "Network Firewall logging should be enabled",
    description:
      "This control checks whether logging is enabled for an AWS Network Firewall firewall. The control fails if logging isn't enabled for at least one log type or if the logging destination doesn't exist.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.2/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.3",
    title:
      "Network Firewall policies should have at least one rule group associated",
    description:
      "This control checks whether a Network Firewall policy has any stateful or stateless rule groups associated. This control fails if stateless or stateful rule groups are not assigned.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.3/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.4",
    title:
      "The default stateless action for Network Firewall policies should be drop or forward for full packets",
    description:
      "This control checks whether the default stateless action for full packets for a Network Firewall policy is drop or forward. The control passes if Drop or Forward is selected, and fails if Pass is selected.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.4/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.5",
    title:
      "The default stateless action for Network Firewall policies should be drop or forward for fragmented packets",
    description:
      "This control checks whether the default stateless action for fragmented packets for a Network Firewall policy is drop or forward. The control passes if Drop or Forward is selected, and fails if Pass is selected.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.5/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.6",
    title: "Stateless network firewall rule group should not be empty",
    description:
      "This control checks if a Stateless Network Firewall Rule Group contains rules. The rule will fail if there are no rules in a Stateless Network Firewall Rule Group.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.6/remediation",
    severity: "medium",
  },
  {
    controlId: "NetworkFirewall.9",
    title: "Network Firewall firewalls should have deletion protection enabled",
    description:
      "This control checks whether an AWS Network Firewall firewall has deletion protection enabled. The control fails if deletion protection isn't enabled for a firewall.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/NetworkFirewall.9/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.1",
    title: "OpenSearch domains should have encryption at rest enabled",
    description:
      "This control checks whether Amazon OpenSearch domains have encryption-at-rest configuration enabled. The check fails if encryption at rest is not enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.1/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.10",
    title:
      "OpenSearch Domains should have the latest software update installed",
    description:
      "This control checks whether an Amazon OpenSearch Service domain has the latest software update installed. The control fails if a software update is available but not installed for the domain.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.10/remediation",
    severity: "low",
  },
  {
    controlId: "Opensearch.11",
    title:
      "OpenSearch domains should have at least three dedicated primary nodes",
    description:
      "This control checks whether an Amazon OpenSearch domain is configured with at least three dedicated primary nodes. This control fails if the domain has fewer than three dedicated primary nodes.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.11/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.2",
    title: "OpenSearch domains should not be publicly accessible",
    description:
      "This control checks whether an OpenSearch domain is publicly accessible. The control fails if an OpenSearch domain is publicly accessible. It does not evaluate the VPC subnet routing configuration to determine public access.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.2/remediation",
    severity: "critical",
  },
  {
    controlId: "Opensearch.3",
    title: "OpenSearch domains should encrypt data sent between nodes",
    description:
      "This control checks whether Amazon OpenSearch domains have node-to-node encryption enabled. This control fails if node-to-node encryption is disabled on the domain.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.3/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.4",
    title:
      "OpenSearch domain error logging to CloudWatch Logs should be enabled",
    description:
      "This control checks whether Amazon OpenSearch domains are configured to send error logs to CloudWatch Logs. This control fails if error logging to CloudWatch is not enabled for a domain.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.4/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.5",
    title: "OpenSearch domains should have audit logging enabled",
    description:
      "This control checks whether Amazon OpenSearch Service domains have audit logging enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.5/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.6",
    title: "OpenSearch domains should have at least three data nodes",
    description:
      'This control checks whether Amazon OpenSearch Service domains are configured with at least three data nodes and "zoneAwarenessEnabled" is true.',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.6/remediation",
    severity: "medium",
  },
  {
    controlId: "Opensearch.7",
    title: "OpenSearch domains should have fine-grained access control enabled",
    description:
      "This control checks whether Amazon OpenSearch domains have fine-grained access control enabled. This control fails if the fine-grained access control is not enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.7/remediation",
    severity: "high",
  },
  {
    controlId: "Opensearch.8",
    title:
      "Connections to OpenSearch domains should be encrypted using the latest TLS security policy",
    description:
      "This controls checks whether connections to an Amazon OpenSearch Service domain are using the latest TLS security policy. The control fails if the OpenSearch domain isn't using the latest supported policy or if HTTPs isn't enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Opensearch.8/remediation",
    severity: "medium",
  },
  {
    controlId: "PCA.1",
    title: "AWS Private CA root certificate authority should be disabled",
    description:
      "This control checks if AWS Private CA has a root certificate authority (CA) that is disabled. This control fails if the root CA is enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/PCA.1/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.1",
    title: "RDS snapshot should be private",
    description:
      "This AWS control checks if Amazon Relational Database Service (Amazon RDS) snapshots are public.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.1/remediation",
    severity: "critical",
  },
  {
    controlId: "RDS.10",
    title: "IAM authentication should be configured for RDS instances",
    description:
      "This control checks whether an RDS DB instance has IAM database authentication enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.10/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.11",
    title: "RDS instances should have automatic backups enabled",
    description:
      "This control checks whether an Amazon Relational Database Service instance has automated backups enabled, and a backup retention period greater than or equal to the specified time frame. Read replicas are excluded from evaluation. The control fails if backups aren't enabled for the instance, or if the retention period is less than the specified time frame. Unless you provide a custom parameter value for the backup retention period, Security Hub uses a default value of 7 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.11/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.12",
    title: "IAM authentication should be configured for RDS clusters",
    description:
      "This control checks if an RDS DB cluster has IAM database authentication enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.12/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.13",
    title: "RDS automatic minor version upgrades should be enabled",
    description:
      "This control checks if automatic minor version upgrades are enabled for the Amazon RDS database instance.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.13/remediation",
    severity: "high",
  },
  {
    controlId: "RDS.14",
    title: "Amazon Aurora clusters should have backtracking enabled",
    description:
      "This control checks whether an Amazon Aurora cluster has backtracking enabled. The control fails if the cluster doesn't have backtracking enabled. If you provide a custom value for the 'BacktrackWindowInHours' parameter, the control passes only if the cluster is backtracked for the specified length of time.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.14/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.15",
    title:
      "RDS DB clusters should be configured for multiple Availability Zones",
    description:
      "This control checks if Amazon RDS DB clusters are configured with multiple Availability Zones.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.15/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.16",
    title: "RDS DB clusters should be configured to copy tags to snapshots",
    description:
      "This control checks whether RDS DB clusters are configured to copy all tags to snapshots when the snapshots are created.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.16/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.17",
    title: "RDS DB instances should be configured to copy tags to snapshots",
    description:
      "This control checks whether RDS DB instances are configured to copy all tags to snapshots when the snapshots are created.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.17/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.18",
    title: "RDS instances should be deployed in a VPC",
    description:
      "This control checks whether an RDS instance is deployed in a VPC (EC2-VPC).",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.18/remediation",
    severity: "high",
  },
  {
    controlId: "RDS.19",
    title:
      "Existing RDS event notification subscriptions should be configured for critical cluster events",
    description:
      'This control checks whether an Amazon RDS Event subscription for RDS clusters is configured to notify on event categories of both "maintenance" and "failure".',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.19/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.2",
    title:
      "RDS DB Instances should prohibit public access, as determined by the PubliclyAccessible configuration",
    description:
      "This AWS control checks whether RDS instances are publicly accessible by evaluating the publiclyAccessible field in the instance configuration item.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.2/remediation",
    severity: "critical",
  },
  {
    controlId: "RDS.20",
    title:
      "Existing RDS event notification subscriptions should be configured for critical database instance events",
    description:
      'This control checks whether an Amazon RDS Event subscription for RDS instances is configured to notify on event categories of both "maintenance", "configuration change", and "failure".',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.20/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.21",
    title:
      "An RDS event notifications subscription should be configured for critical database parameter group events",
    description:
      'This control checks whether an Amazon RDS Event subscription for RDS parameter groups is configured to notify on event category of "configuration change".',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.21/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.22",
    title:
      "An RDS event notifications subscription should be configured for critical database security group events",
    description:
      'This control checks whether an Amazon RDS Event subscription for RDS security groups is configured to notify on event categories of both "configuration change" and "failure".',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.22/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.23",
    title: "RDS instances should not use a database engine default port",
    description:
      "This control checks whether RDS instances use the default port of that database engine.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.23/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.24",
    title: "RDS Database Clusters should use a custom administrator username",
    description:
      "This control checks whether an RDS database cluster has changed the admin username from its default value. This rule will fail if the admin username is set to the default value.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.24/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.25",
    title: "RDS database instances should use a custom administrator username",
    description:
      "This control checks whether an Amazon Relational Database Service (Amazon RDS) database instance has changed the admin username from its default value. This rule will only run on RDS database instances. The rule will fail if the admin username is set to the default value.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.25/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.26",
    title: "RDS DB instances should be protected by a backup plan",
    description:
      "This control evaluates if Amazon RDS DB instances are covered by a backup plan. This control fails if an RDS DB instance isn't covered by a backup plan. If you provide a custom value for the 'backupVaultLockCheck' parameter, the control passes only if the instance is backed up in an AWS Backup locked vault.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.26/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.27",
    title: "RDS DB clusters should be encrypted at rest",
    description:
      "This control checks if an RDS DB cluster is encrypted at rest. The control fails if an RDS DB cluster isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.27/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.3",
    title: "RDS DB instances should have encryption at-rest enabled",
    description:
      "This AWS control checks whether storage encryption is enabled for your RDS DB instances.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.3/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.34",
    title:
      "Aurora MySQL DB clusters should publish audit logs to CloudWatch Logs",
    description:
      "This control checks whether an Amazon Aurora MySQL DB cluster is configured to publish audit logs to Amazon CloudWatch Logs. The control fails if the cluster isn\u2019t configured to publish audit logs to CloudWatch Logs.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.34/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.35",
    title:
      "RDS DB clusters should have automatic minor version upgrade enabled",
    description:
      "This control checks if automatic minor version upgrade is enabled for an Amazon RDS database cluster. This control fails if automatic minor version upgrade isn't enabled for an RDS cluster.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.35/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.4",
    title:
      "RDS cluster snapshots and database snapshots should be encrypted at rest",
    description:
      "This control checks whether Amazon RDS cluster snapshots and database snapshots are encrypted.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.4/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.5",
    title:
      "RDS DB instances should be configured with multiple Availability Zones",
    description:
      "This control checks whether high availability is enabled for your RDS DB instances.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.5/remediation",
    severity: "medium",
  },
  {
    controlId: "RDS.6",
    title: "Enhanced monitoring should be configured for RDS DB instances",
    description:
      "This control checks whether enhanced monitoring is enabled for an Amazon Relational Database Service (Amazon RDS) DB instance. The control fails if enhanced monitoring isn't enabled for the instance. If you provide a custom value for the 'monitoringInterval' parameter, the control passes only if enhanced monitoring metrics are collected for the instance at the specified interval.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.6/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.7",
    title: "RDS clusters should have deletion protection enabled",
    description:
      "This control checks whether RDS clusters have deletion protection enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.7/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.8",
    title: "RDS DB instances should have deletion protection enabled",
    description:
      "This control checks whether RDS DB instances have deletion protection enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.8/remediation",
    severity: "low",
  },
  {
    controlId: "RDS.9",
    title: "Database logging should be enabled",
    description:
      "This control checks whether an Amazon RDS DB instance is configured to publish the following logs to Amazon CloudWatch Logs. The control fails if the instance isn\u2019t configured to publish the following logs to CloudWatch Logs: Oracle: (Alert, Audit, Trace, Listener), PostgreSQL: (Postgresql, Upgrade), MySQL: (Audit, Error, General, SlowQuery), MariaDB: (Audit, Error, General, SlowQuery), SQL Server: (Error, Agent), Aurora: (Audit, Error, General, SlowQuery), Aurora-MySQL: (Audit, Error, General, SlowQuery), Aurora-PostgreSQL: (Postgresql).",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/RDS.9/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.1",
    title: "Amazon Redshift clusters should prohibit public access",
    description:
      "This control checks whether Amazon Redshift clusters are publicly accessible. It evaluates the publiclyAccessible field in the cluster configuration item.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.1/remediation",
    severity: "critical",
  },
  {
    controlId: "Redshift.10",
    title: "Redshift clusters should be encrypted at rest",
    description:
      "This control checks if an Amazon Redshift cluster is encrypted at rest. The control fails if a Redshift cluster isn't encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.10/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.2",
    title:
      "Connections to Amazon Redshift clusters should be encrypted in transit",
    description:
      "This control checks whether connections to Amazon Redshift clusters are required to use encryption in transit. The check fails if the Amazon Redshift cluster parameter require_SSL is not set to 1.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.2/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.3",
    title: "Amazon Redshift clusters should have automatic snapshots enabled",
    description:
      "This control checks whether an Amazon Redshift cluster has automated snapshots enabled, and a retention period greater than or equal to the specified time frame. The control fails if automated snapshots aren't enabled for the cluster, or if the retention period is less than the specified time frame. Unless you provide a custom parameter value for the retention period, Security Hub uses a default value of 7 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.3/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.4",
    title: "Amazon Redshift clusters should have audit logging enabled",
    description:
      "This control checks whether an Amazon Redshift cluster has audit logging enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.4/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.6",
    title:
      "Amazon Redshift should have automatic upgrades to major versions enabled",
    description:
      "This control checks whether an Amazon Redshift cluster is configured with automatic upgrades to major versions.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.6/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.7",
    title: "Redshift clusters should use enhanced VPC routing",
    description:
      "This control checks whether a Redshift cluster has EnhancedVpcRouting enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.7/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.8",
    title: "Amazon Redshift clusters should not use the default Admin username",
    description:
      "This control checks whether a Redshift cluster has changed the Admin username from its default value. This control will fail if the admin username for a Redshift cluster is set to 'awsuser'.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.8/remediation",
    severity: "medium",
  },
  {
    controlId: "Redshift.9",
    title: "Redshift clusters should not use the default database name",
    description:
      "This control checks whether a Redshift cluster has changed the database name from its default value. This control will fail if the database name for a Redshift cluster is set to \u201cdev\u201d",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Redshift.9/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.1",
    title: "S3 Block Public Access setting should be enabled",
    description:
      "This control checks whether the preceding Amazon S3 block public access settings are configured at the account level for an S3 general purpose bucket. The control fails if one or more of the block public access settings are set to false.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.1/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.10",
    title:
      "S3 buckets with versioning enabled should have lifecycle policies configured",
    description:
      "This control checks whether an Amazon S3 general purpose versioned bucket has a Lifecycle configuration. The control fails if the bucket doesn't have a Lifecycle configuration.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.10/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.11",
    title: "S3 buckets should have event notifications enabled",
    description:
      "This control checks whether S3 Event Notifications are enabled on an Amazon S3 general purpose bucket. The control fails if S3 Event Notifications are not enabled on a bucket. If you provide custom values for the 'eventTypes' parameter, the control passes only if event notifications are enabled for the specified types of events.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.11/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.12",
    title:
      "S3 access control lists (ACLs) should not be used to manage user access to buckets",
    description:
      "This control checks whether an Amazon S3 general purpose bucket provides user permissions with an access control list (ACL). The control fails if an ACL is configured for managing user access on the bucket.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.12/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.13",
    title: "S3 buckets should have lifecycle policies configured",
    description:
      "This control checks whether an Amazon S3 general purpose bucket has a Lifecycle configuration. The control fails if the bucket doesn't have a Lifecycle configuration. You can provide custom values for one or more if the preceding parameters, the control passes only if the policy includes the specified storage class, deletion time, and transition time.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.13/remediation",
    severity: "low",
  },
  {
    controlId: "S3.14",
    title: "S3 buckets should have versioning enabled",
    description:
      "This control checks whether an Amazon S3 general purpose bucket has versioning enabled. The control fails if versioning is suspended for the bucket.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.14/remediation",
    severity: "low",
  },
  {
    controlId: "S3.15",
    title: "S3 buckets should be configured to use Object Lock",
    description:
      "This control checks whether an Amazon S3 general purpose bucket has Object Lock enabled. The control fails if Object Lock isn\u2019t enabled for the bucket. If you provide a custom value for the 'mode' parameter, the control passes only if S3 Object Lock uses the specified retention mode.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.15/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.17",
    title: "S3 buckets should be encrypted at rest with AWS KMS keys",
    description:
      "This control checks whether an Amazon S3 general purpose bucket is encrypted with an AWS KMS key (SSE-KMS or DSSE-KMS). The control fails if the bucket is encrypted with default encryption (SSE-S3).",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.17/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.19",
    title: "S3 Access points should have public access block settings enabled",
    description:
      "This control checks whether an Amazon S3 access point has block public access settings enabled. The control fails if block public access settings aren't enabled for the access point.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.19/remediation",
    severity: "critical",
  },
  {
    controlId: "S3.2",
    title: "S3 buckets should prohibit public read access",
    description:
      "This control checks whether an Amazon S3 general purpose bucket permits public read access. It evaluates the block public access settings, the bucket policy, and the bucket access control list (ACL). The control fails if the bucket permits public read access.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.2/remediation",
    severity: "critical",
  },
  {
    controlId: "S3.20",
    title: "Ensure MFA Delete is enabled on S3 buckets",
    description:
      "This control checks if multi-factor authentication (MFA) delete is enabled on an Amazon S3 general purpose bucket. The control fails if MFA delete isn't enabled on the bucket.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.20/remediation",
    severity: "low",
  },
  {
    controlId: "S3.3",
    title: "S3 buckets should prohibit public write access",
    description:
      "This control checks whether an Amazon S3 general purpose bucket permits public write access. It evaluates the block public access settings, the bucket policy, and the bucket access control list (ACL). The control fails if the bucket permits public write access.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.3/remediation",
    severity: "critical",
  },
  {
    controlId: "S3.5",
    title: "S3 buckets should require requests to use Secure Socket Layer",
    description:
      "This control checks whether an Amazon S3 general purpose bucket has a policy that requires requests to use SSL. The control fails if the bucket policy doesn't require requests to use SSL.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.5/remediation",
    severity: "medium",
  },
  {
    controlId: "S3.6",
    title:
      "S3 permissions granted to other AWS accounts in bucket policies should be restricted",
    description:
      "This control checks whether an Amazon S3 general purpose bucket policy prevents principals from other AWS accounts from performing denied actions on resources in the S3 bucket. The control fails if the bucket policy allows one or more of the preceding actions for a principal in another AWS account.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.6/remediation",
    severity: "high",
  },
  {
    controlId: "S3.7",
    title: "S3 buckets should have cross-region replication enabled",
    description:
      "This control checks whether an Amazon S3 general purpose bucket has cross-Region replication enabled. The control fails if the bucket doesn't have cross-Region replication enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.7/remediation",
    severity: "low",
  },
  {
    controlId: "S3.8",
    title:
      "S3 Block Public Access setting should be enabled at the bucket-level",
    description:
      "This control checks whether an Amazon S3 general purpose bucket blocks public access at the bucket level. The control fails if any of the following settings are set to false: ignorePublicAcls, blockPublicPolicy, blockPublicAcls, restrictPublicBuckets.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.8/remediation",
    severity: "high",
  },
  {
    controlId: "S3.9",
    title: "S3 bucket server access logging should be enabled",
    description:
      "This control checks whether server access logging is enabled for an Amazon S3 general purpose bucket. The control fails if server access logging isn't enabled. When logging is enabled, Amazon S3 delivers access logs for a source bucket to a chosen target bucket. The target bucket must be in the same AWS Region as the source bucket and must not have a default retention period configured. The target logging bucket does not need to have server access logging enabled, and you should suppress findings for this bucket.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/S3.9/remediation",
    severity: "medium",
  },
  {
    controlId: "SNS.1",
    title: "SNS topics should be encrypted at-rest using AWS KMS",
    description:
      "This control checks whether an SNS topic is encrypted at rest using AWS KMS. The controls fails if an SNS topic doesn't use a KMS key for server-side encryption (SSE).",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SNS.1/remediation",
    severity: "medium",
  },
  {
    controlId: "SQS.1",
    title: "Amazon SQS queues should be encrypted at rest",
    description:
      "This control checks whether Amazon SQS queues are encrypted at rest.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SQS.1/remediation",
    severity: "medium",
  },
  {
    controlId: "SSM.1",
    title: "EC2 instances should be managed by AWS Systems Manager",
    description:
      "This AWS control checks whether the Amazon EC2 instances in your account are managed by AWS Systems Manager.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SSM.1/remediation",
    severity: "medium",
  },
  {
    controlId: "SSM.2",
    title:
      "EC2 instances managed by Systems Manager should have a patch compliance status of COMPLIANT after a patch installation",
    description:
      "This AWS control checks whether the compliance status of the Amazon EC2 Systems Manager patch compliance is COMPLIANT or NON_COMPLIANT after the patch installation on the instance. It only checks instances that are managed by AWS Systems Manager Patch Manager.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SSM.2/remediation",
    severity: "high",
  },
  {
    controlId: "SSM.3",
    title:
      "EC2 instances managed by Systems Manager should have an association compliance status of COMPLIANT",
    description:
      "This AWS control checks whether the status of the AWS Systems Manager association compliance is COMPLIANT or NON_COMPLIANT after the association is executed on an instance.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SSM.3/remediation",
    severity: "low",
  },
  {
    controlId: "SSM.4",
    title: "SSM documents should not be public",
    description:
      'This control checks whether AWS Systems Manager documents that the account owns are public. This control fails if SSM documents that have "Self" as the owner are public.',
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SSM.4/remediation",
    severity: "critical",
  },
  {
    controlId: "SageMaker.1",
    title:
      "Amazon SageMaker notebook instances should not have direct internet access",
    description:
      "This AWS control checks whether direct internet access is disabled for an Amazon SageMaker notebook instance by examining the DirectInternetAccess field is disabled for an Amazon SageMaker notebook instance.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SageMaker.1/remediation",
    severity: "high",
  },
  {
    controlId: "SageMaker.2",
    title: "SageMaker notebook instances should be launched in a custom VPC",
    description:
      "This control checks if an Amazon SageMaker notebook instance is launched within a custom VPC. The control fails if a SageMaker notebook instance is not launched within a custom VPC.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SageMaker.2/remediation",
    severity: "high",
  },
  {
    controlId: "SageMaker.3",
    title: "Users should not have root access to SageMaker notebook instances",
    description:
      "This control checks whether root access is turned off for Amazon SageMaker notebook instances. The control fails if root access is turned on for a SageMaker notebook instance.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SageMaker.3/remediation",
    severity: "high",
  },
  {
    controlId: "SageMaker.4",
    title:
      "SageMaker endpoint production variants should have an initial instance count greater than 1",
    description:
      "This control checks whether production variants of an Amazon SageMaker endpoint have an initial instance count greater than 1. The control fails if the endpoint's production variants have only 1 initial instance.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SageMaker.4/remediation",
    severity: "medium",
  },
  {
    controlId: "SecretsManager.1",
    title: "Secrets Manager secrets should have automatic rotation enabled",
    description:
      "This control checks whether a secret stored in AWS Secrets Manager is configured with automatic rotation. The control fails if the secret isn't configured with automatic rotation. If you provide a custom value for the 'maximumAllowedRotationFrequency' parameter, the control passes only if the secret is automatically rotated within the specified window of time.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SecretsManager.1/remediation",
    severity: "medium",
  },
  {
    controlId: "SecretsManager.2",
    title:
      "Secrets Manager secrets configured with automatic rotation should rotate successfully",
    description:
      "This control checks whether an AWS Secrets Manager secret rotated successfully based on the rotation schedule. The control fails if RotationOccurringAsScheduled is false. The control does not evaluate secrets that do not have rotation configured.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SecretsManager.2/remediation",
    severity: "medium",
  },
  {
    controlId: "SecretsManager.3",
    title: "Remove unused Secrets Manager secrets",
    description:
      "This control checks whether an AWS Secrets Manager secret has been accessed within the specified time frame. The control fails if a secret is unused beyond the specified time frame. Unless you provide a custom parameter value for the access period, Security Hub uses a default value of 90 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SecretsManager.3/remediation",
    severity: "medium",
  },
  {
    controlId: "SecretsManager.4",
    title:
      "Secrets Manager secrets should be rotated within a specified number of days",
    description:
      "This control checks whether an AWS Secrets Manager secret is rotated at least once within the specified time frame. The control fails if a secret isn't rotated at least this frequently. Unless you provide a custom parameter value for the rotation period, Security Hub uses a default value of 90 days.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/SecretsManager.4/remediation",
    severity: "medium",
  },
  {
    controlId: "ServiceCatalog.1",
    title:
      "Service Catalog portfolios should be shared within an AWS organization only",
    description:
      "This control checks whether AWS Service Catalog shares portfolios within an organization when the integration with AWS Organizations is enabled. The control fails if portfolios aren't shared within an organization.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/ServiceCatalog.1/remediation",
    severity: "high",
  },
  {
    controlId: "Transfer.2",
    title:
      "Transfer Family servers should not use FTP protocol for endpoint connection",
    description:
      "This control checks whether an AWS Transfer Family server uses a protocol other than FTP for endpoint connection. The control fails if the server uses FTP protocol for a client to connect to the server's endpoint.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/Transfer.2/remediation",
    severity: "medium",
  },
  {
    controlId: "WAF.10",
    title: "AWS WAF web ACLs should have at least one rule or rule group",
    description:
      "This control checks whether a WAFV2 web ACL contains at least one WAF rule or WAF rule group. The control fails if a web ACL does not contain any WAF rule or rule group.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/WAF.10/remediation",
    severity: "medium",
  },
  {
    controlId: "WAF.11",
    title: "AWS WAF web ACL logging should be enabled",
    description:
      "This control checks whether logging is enabled for an AWS WAFV2 web ACL. This control fails if logging is not enabled for the web ACL.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/WAF.11/remediation",
    severity: "low",
  },
  {
    controlId: "WAF.12",
    title: "AWS WAF rules should have CloudWatch metrics enabled",
    description:
      "This control checks whether an AWS WAF rule or rule group has CloudWatch metrics enabled. This control fails if the rule or rule group does not have CloudWatch metrics enabled.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/WAF.12/remediation",
    severity: "medium",
  },
  {
    controlId: "WAF.2",
    title: "AWS WAF Classic Regional rules should have at least one condition",
    description:
      "This control checks whether a WAF Regional rule has at least one condition. The control fails if no conditions are present within a rule.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/WAF.2/remediation",
    severity: "medium",
  },
  {
    controlId: "WAF.3",
    title: "AWS WAF Classic Regional rule groups should have at least one rule",
    description:
      "This control checks whether a WAF Regional rule group has at least one rule. The control fails if no rules are present within a rule group.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/WAF.3/remediation",
    severity: "medium",
  },
  {
    controlId: "WAF.4",
    title:
      "AWS WAF Classic Regional web ACLs should have at least one rule or rule group",
    description:
      "This control checks whether a WAF Regional web ACL contains any WAF rules or WAF rule groups. This control fails if a web ACL does not contain any WAF rules or rule groups.",
    remediationUrl:
      "https://docs.aws.amazon.com/console/securityhub/WAF.4/remediation",
    severity: "medium",
  },
];
