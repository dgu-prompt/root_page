import {
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  StatUpIndicator,
} from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "~/components/ui/data-list";
import { ProgressBar, ProgressRoot } from "~/components/ui/progress";
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "~/components/ui/stat";
import { LuExternalLink } from "react-icons/lu";
import RegionSelect from "~/components/RegionSelect";
import { Status } from "~/components/ui/status";

export default function Index() {
  return (
    <Container pt="16">
      <Heading mb="8" size="2xl">
        Dashboard
      </Heading>

      <Heading mb="4">
        <Link href="#">
          Security Hub <LuExternalLink />
        </Link>
      </Heading>

      <RegionSelect
        selectedRegion={"ap-southeast-2"}
        onRegionChange={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Grid
        mt="3"
        mb="10"
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        templateRows="repeat(1, 1fr)"
        gap="3"
      >
        <GridItem colSpan={2}>
          <Card.Root
            size={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
            variant="elevated"
            h="full"
          >
            <Card.Body>
              <StatRoot>
                <StatLabel>Security score</StatLabel>
                <StatValueText>77%</StatValueText>
                <StatHelpText mb="2">198 of 258 controls passed</StatHelpText>
                <ProgressRoot value={77}>
                  <ProgressBar />
                </ProgressRoot>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={2}>
          <Card.Root
            size={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
            variant="elevated"
            h="full"
          >
            <Card.Header>
              <Card.Title>Findings by Region</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataListRoot orientation="horizontal">
                <DataListItem
                  key={"Critical"}
                  label={<Status colorPalette="purple">Critical</Status>}
                  value={123}
                  grow
                />
                <DataListItem
                  key={"High"}
                  label={<Status colorPalette="red">High</Status>}
                  value={155}
                  grow
                />
                <DataListItem
                  key={"Medium"}
                  label={<Status colorPalette="orange">Medium</Status>}
                  value={583}
                  grow
                />
                <DataListItem
                  key={"Low"}
                  label={<Status colorPalette="yellow">Low</Status>}
                  value={83}
                  grow
                />
              </DataListRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>

      <Heading mb="4">
        <Link href="#">
          Jira <LuExternalLink />
        </Link>
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        templateRows="repeat(1, 1fr)"
        gap="3"
      >
        <GridItem>
          <Card.Root
            size={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
            variant="elevated"
            h="full"
          >
            <Card.Body>
              <StatRoot>
                <StatLabel>Open Tickets with Critical Severity</StatLabel>
                <StatValueText>12</StatValueText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem>
          <Card.Root
            size={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
            variant="elevated"
            h="full"
          >
            <Card.Body>
              <StatRoot>
                <StatLabel>New Tickets</StatLabel>
                <StatValueText>10</StatValueText>
                <StatHelpText>since last 7 days</StatHelpText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem colSpan={2}>
          <Card.Root
            size={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
            variant="elevated"
            h="full"
          >
            <Card.Header>
              <Card.Title>Tickets by Status</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataListRoot orientation="horizontal">
                <DataListItem
                  key={"Open Issues"}
                  label={"Open Issues"}
                  value={25}
                  grow
                />
                <DataListItem
                  key={"Closed Issues"}
                  label={"Closed Issues"}
                  value={74}
                  grow
                />
                <DataListItem
                  key={"In Progress Issues"}
                  label={"In Progress Issues"}
                  value={4}
                  grow
                />
              </DataListRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
        <GridItem>
          <Card.Root
            size={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
            variant="elevated"
            h="full"
          >
            <Card.Body>
              <StatRoot>
                <StatLabel>Issue Resolution Rate</StatLabel>
                <StatValueText>92%</StatValueText>
                <StatHelpText>
                  <StatUpIndicator /> 5% 증가
                </StatHelpText>
              </StatRoot>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </Grid>
    </Container>
  );
}
