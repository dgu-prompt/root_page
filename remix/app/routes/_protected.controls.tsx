import {
  Box,
  Flex,
  Heading,
  Stack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import RegionSelect from "~/components/RegionSelect";
import { Switch } from "~/components/ui/switch";

type SecurityControl = {
  SecurityControlId: string;
  Title: string;
  Description: string;
  SeverityRating: string;
  SecurityControlStatus: string;
};

type RegionData = {
  [key: string]: SecurityControl[];
};

const regionData: RegionData = {
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
      SecurityControlId: "7",
      Title: "CloudFront 보안 설정 강화",
      Description: "CloudFront에 대한 보안 설정을 강화합니다.",
      SeverityRating: "MEDIUM",
      SecurityControlStatus: "ENABLED",
    },
    {
      SecurityControlId: "8",
      Title: "Lambda 함수 권한 검토",
      Description: "Lambda 함수의 권한 설정을 검토합니다.",
      SeverityRating: "HIGH",
      SecurityControlStatus: "DISABLED",
    },
    // 추가 항목...
  ],
};

const SecurityControlsList = () => {
  const [selectedRegion, setSelectedRegion] = useState("us-east-1");
  const [securityControls, setSecurityControls] = useState<SecurityControl[]>(
    regionData["us-east-1"] || []
  );
  const [modifiedControls, setModifiedControls] = useState<{
    [key: string]: boolean;
  }>({});
  const [isListView, setIsListView] = useState(true);

  useEffect(() => {
    if (regionData[selectedRegion]) {
      setSecurityControls(regionData[selectedRegion]);
    } else {
      setSecurityControls([]);
    }
  }, [selectedRegion]);

  const handleStatusChange = (id: string, status: boolean) => {
    setModifiedControls((prev) => ({ ...prev, [id]: status }));
  };

  const handleSaveChanges = () => {
    console.log("변경 사항 저장:", modifiedControls);
    setModifiedControls({});
  };

  return (
    <>
      <Heading mb="4">Security Hub 제어 항목 관리</Heading>
      <Stack gap="4">
        <RegionSelect
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
        <Switch
          checked={isListView}
          onCheckedChange={() => setIsListView(!isListView)}
          label="리스트 / 카드 뷰 전환"
        />

        {isListView ? (
          <VStack gap="4">
            {securityControls.map((control) => (
              <Box
                key={control.SecurityControlId}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                w="full"
                bg="bg"
              >
                <Text fontWeight="bold" fontSize="lg">
                  {control.Title}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {control.Description}
                </Text>
                <Text fontSize="sm" fontWeight="semibold" mt="2">
                  심각도: {control.SeverityRating}
                </Text>
                <Flex justify="space-between" align="center" mt="3">
                  <Text fontSize="sm" color="gray.700">
                    상태
                  </Text>
                  <Switch
                    checked={
                      modifiedControls[control.SecurityControlId] !== undefined
                        ? modifiedControls[control.SecurityControlId]
                        : control.SecurityControlStatus === "ENABLED"
                    }
                    onCheckedChange={(e) =>
                      handleStatusChange(control.SecurityControlId, e.checked)
                    }
                  />
                </Flex>
              </Box>
            ))}
          </VStack>
        ) : (
          <Box overflowX="auto">
            {securityControls && securityControls.length > 0 && (
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>제목</Table.ColumnHeader>
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader>심각도</Table.ColumnHeader>
                    <Table.ColumnHeader>상태</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {securityControls.map((control) => (
                    <Table.Row key={control.SecurityControlId}>
                      <Table.Cell>{control.Title}</Table.Cell>
                      <Table.Cell>{control.Description}</Table.Cell>
                      <Table.Cell>{control.SeverityRating}</Table.Cell>
                      <Table.Cell>
                        <Switch
                          checked={
                            modifiedControls[control.SecurityControlId] !==
                            undefined
                              ? modifiedControls[control.SecurityControlId]
                              : control.SecurityControlStatus === "ENABLED"
                          }
                          onCheckedChange={(e) =>
                            handleStatusChange(
                              control.SecurityControlId,
                              e.checked
                            )
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </Box>
        )}
        <Flex justify="flex-end">
          <Button
            colorScheme="teal"
            onClick={handleSaveChanges}
            disabled={Object.keys(modifiedControls).length === 0}
          >
            변경 사항 저장
          </Button>
        </Flex>
      </Stack>
    </>
  );
};

export default SecurityControlsList;
