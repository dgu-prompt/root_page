import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "@/components/ui/stat";
import { Status } from "@/components/ui/status";
import {
  AspectRatio,
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  SimpleGrid,
  StatUpIndicator,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuExternalLink } from "react-icons/lu";

import RegionSelect from "@/components/RegionSelect";
import SecurityHubIcon from "@/images/Arch_AWS-Security-Hub_64@5x.png";
import FindingsChart from "@features/dashboard/FindingsChart";

export default function Index() {
  const { t } = useTranslation();

  return (
    <Container pt="16">
      <Heading mb="8" size="2xl">
        {t("dashboardTitle")}
      </Heading>

      <Heading mb="4">
        <Link href="#">
          {t("securityHubTitle")} <LuExternalLink />
        </Link>
      </Heading>

      <RegionSelect
        onRegionChange={() => {}}
        selectedRegion={"ap-northeast-2"}
      />
      <SimpleGrid columns={{ base: 3, md: 6, lg: 6 }} gap="3" mb="10" mt="3">
        <GridItem colSpan={2}>
          <Card.Root height="full" variant="elevated">
            <Card.Body gap="2">
              <Avatar
                name="Security Hub"
                shape="rounded"
                size="lg"
                src={SecurityHubIcon}
              />
              <Card.Title mt="2">AWS Security Hub</Card.Title>
              <Card.Description></Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button>Go</Button>
            </Card.Footer>
          </Card.Root>
        </GridItem>

        <GridItem colSpan={2}>
          <Card.Root height="full" size="lg" variant="elevated">
            <Card.Body>
              <StatRoot>
                <StatLabel>{t("securityScoreLabel")}</StatLabel>
                <StatValueText>77%</StatValueText>
                <StatHelpText mb="2">
                  {t("controlsPassed", { passed: 198, total: 258 })}
                </StatHelpText>
                <ProgressRoot value={77}>
                  <ProgressBar />
                </ProgressRoot>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={2}> </GridItem>

        <GridItem colSpan={2}>
          <Card.Root height="full" size="lg" variant="elevated">
            <Card.Header>
              <Card.Title>{t("findingsByRegion")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataListRoot orientation="horizontal">
                <DataListItem
                  grow
                  key="Critical"
                  label={
                    <Status colorPalette="purple">
                      {t("severityCritical")}
                    </Status>
                  }
                  value={123}
                />
                <DataListItem
                  grow
                  key="High"
                  label={
                    <Status colorPalette="red">{t("severityHigh")}</Status>
                  }
                  value={155}
                />
                <DataListItem
                  grow
                  key="Medium"
                  label={
                    <Status colorPalette="orange">{t("severityMedium")}</Status>
                  }
                  value={583}
                />
                <DataListItem
                  grow
                  key="Low"
                  label={
                    <Status colorPalette="yellow">{t("severityLow")}</Status>
                  }
                  value={83}
                />
              </DataListRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={4} rowSpan={2}>
          <Card.Root variant="elevated">
            <Card.Body>
              <AspectRatio ratio={2 / 1}>
                <FindingsChart />
              </AspectRatio>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </SimpleGrid>

      <Heading mb="4">
        <Link href="#">
          {t("jiraTitle")} <LuExternalLink />
        </Link>
      </Heading>

      <Grid
        gap="3"
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        templateRows="repeat(1, 1fr)"
      >
        <GridItem>
          <Card.Root height="full" size="lg" variant="elevated">
            <Card.Body>
              <StatRoot>
                <StatLabel>{t("openCriticalTicketsLabel")}</StatLabel>
                <StatValueText>12</StatValueText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>

        <GridItem>
          <Card.Root height="full" size="lg" variant="elevated">
            <Card.Body>
              <StatRoot>
                <StatLabel>{t("newTicketsLabel")}</StatLabel>
                <StatValueText>10</StatValueText>
                <StatHelpText>{t("newTicketsTimeFrame")}</StatHelpText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>

        <GridItem colSpan={2}>
          <Card.Root height="full" size="lg" variant="elevated">
            <Card.Header>
              <Card.Title>{t("ticketsByStatus")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataListRoot orientation="horizontal">
                <DataListItem
                  grow
                  key="Open Issues"
                  label={t("openIssuesLabel")}
                  value={25}
                />
                <DataListItem
                  grow
                  key="Closed Issues"
                  label={t("closedIssuesLabel")}
                  value={74}
                />
                <DataListItem
                  grow
                  key="In Progress Issues"
                  label={t("inProgressIssuesLabel")}
                  value={4}
                />
              </DataListRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>

        <GridItem>
          <Card.Root height="full" size="lg" variant="elevated">
            <Card.Body>
              <StatRoot>
                <StatLabel>{t("issueResolutionRate")}</StatLabel>
                <StatValueText>92%</StatValueText>
                <StatHelpText>
                  <StatUpIndicator /> 5% {t("increase")}
                </StatHelpText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>
    </Container>
  );
}
