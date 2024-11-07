import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";

import ControlCard from "~/components/ControlCard";
import ControlStatusBadge from "~/components/ControlStatusBadge";
import RegionSelect from "~/components/RegionSelect";
import SeverityBadge from "~/components/SeverityBadge";
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
  const { t } = useTranslation();
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

  if (!isMounted) return null;

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
        {t("controlsHeading")}
      </Heading>

      <Stack gap="4">
        <RegionSelect
          onRegionChange={setSelectedRegion}
          selectedRegion={selectedRegion}
        />
        <Switch
          checked={isGridView}
          display={{ base: "none" }}
          label={t("toggleViewLabel")}
          onCheckedChange={() => setIsGridView(!isGridView)}
        />

        {isGridView ? (
          <Grid
            gap="3"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
          >
            {securityControls.map((control) => (
              <GridItem key={control.SecurityControlId}>
                <ControlCard
                  Description={control.Description}
                  SecurityControlId={control.SecurityControlId}
                  SecurityControlStatus={control.SecurityControlStatus}
                  SeverityRating={control.SeverityRating}
                  Title={control.Title}
                  controlStatus={"FAILED"}
                  failedChecks={"0 of 1"}
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
                    <Table.ColumnHeader>{t("id")}</Table.ColumnHeader>
                    <Table.ColumnHeader>{t("title")}</Table.ColumnHeader>
                    <Table.ColumnHeader>
                      {t("controlStatus")}
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>{t("severity")}</Table.ColumnHeader>
                    <Table.ColumnHeader>{t("failedChecks")}</Table.ColumnHeader>
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
            disabled={Object.keys(modifiedControls).length === 0}
            onClick={handleSaveChanges}
          >
            {t("saveChangesButton")}
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};

export default SecurityControlsList;
