import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import ControlCard from "~/components/ControlCard.kr";
import ControlStatusBadge from "~/components/ControlStatusBadge.kr";
import RegionSelect from "~/components/RegionSelect.kr";
import SeverityBadge from "~/components/SeverityBadge.kr";
import { Switch } from "~/components/ui/switch";
import controlsData from "~/data/controlsData";

type ControlCardProps = {
  SecurityControlId: string;
  Title: string;
  Description: string;
  SeverityRating: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  SecurityControlStatus: "ENABLED" | "DISABLED";
  controlStatus: "PASSED" | "FAILED";
  failedChecks: string;
};

type RegionData = {
  [key: string]: ControlCardProps[];
};

const regionData: RegionData = controlsData;

const SecurityControlsList = () => {
  const [selectedRegion, setSelectedRegion] = useState("ap-southeast-2");
  const [securityControls, setSecurityControls] = useState<ControlCardProps[]>(
    regionData["us-east-1"] || []
  );
  const [modifiedControls, setModifiedControls] = useState<{
    [key: string]: boolean;
  }>({});
  const [isGridView, setIsGridView] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (regionData[selectedRegion]) {
      setSecurityControls(regionData[selectedRegion]);
    } else {
      setSecurityControls([]);
    }
  }, [selectedRegion]);

  if (!isMounted) return null; // 클라이언트 렌더링이 완료될 때까지 기다림

  const handleStatusChange = (id: string, status: boolean) => {
    setModifiedControls((prev) => ({ ...prev, [id]: status }));
  };

  const handleSaveChanges = () => {
    console.log("변경 사항 저장:", modifiedControls);
    setModifiedControls({});
  };

  return (
    <Container pt="16">
      <Heading mb="8" size="2xl">
        제어 항목 관리
      </Heading>

      <Stack gap="4">
        <RegionSelect
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
        <Switch
          checked={isGridView}
          onCheckedChange={() => setIsGridView(!isGridView)}
          label="리스트 / 카드 뷰 전환"
          display={{ base: "none" }}
        />

        {isGridView ? (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap="3"
          >
            {securityControls.map((control) => (
              <GridItem key={control.SecurityControlId}>
                <ControlCard
                  SecurityControlId={control.SecurityControlId}
                  Title={control.Title}
                  Description={control.Description}
                  SeverityRating={control.SeverityRating}
                  SecurityControlStatus={control.SecurityControlStatus}
                  controlStatus={"FAILED"}
                  failedChecks={"0 / 1"}
                />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Box overflowX="scroll">
            {securityControls && securityControls.length > 0 && (
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader></Table.ColumnHeader>
                    <Table.ColumnHeader>ID</Table.ColumnHeader>
                    <Table.ColumnHeader>Title</Table.ColumnHeader>
                    <Table.ColumnHeader>Control Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Severity</Table.ColumnHeader>
                    <Table.ColumnHeader>Failed Checks</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {securityControls.map((control) => (
                    <Table.Row key={control.SecurityControlId}>
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
                          size="sm"
                        />
                      </Table.Cell>
                      <Table.Cell fontWeight="semibold">
                        {control.SecurityControlId}
                      </Table.Cell>
                      <Table.Cell>{control.Title}</Table.Cell>
                      <Table.Cell>
                        <ControlStatusBadge status="FAILED" />
                      </Table.Cell>
                      <Table.Cell>
                        <SeverityBadge severity={control.SeverityRating} />
                      </Table.Cell>
                      <Table.Cell>0 of 1</Table.Cell>
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
    </Container>
  );
};

export default SecurityControlsList;
