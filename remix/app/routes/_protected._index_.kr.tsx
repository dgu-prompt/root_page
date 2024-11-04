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
import RegionSelect from "~/components/RegionSelect.kr";
import { Status } from "~/components/ui/status";

export default function Index() {
  return (
    <Container pt="16">
      <Heading mb="8" size="2xl">
        대시보드
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
                <StatLabel>보안 점수</StatLabel>
                <StatValueText>77%</StatValueText>
                <StatHelpText mb="2">198 / 258 제어 통과</StatHelpText>
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
              <Card.Title>리전별 분석 결과</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataListRoot orientation="horizontal">
                <DataListItem
                  key={"Critical"}
                  label={<Status colorPalette="purple">매우 중요</Status>}
                  value={123}
                  grow
                />
                <DataListItem
                  key={"High"}
                  label={<Status colorPalette="red">높음</Status>}
                  value={155}
                  grow
                />
                <DataListItem
                  key={"Medium"}
                  label={<Status colorPalette="orange">보통</Status>}
                  value={583}
                  grow
                />
                <DataListItem
                  key={"Low"}
                  label={<Status colorPalette="yellow">낮음</Status>}
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
                <StatLabel>매우 중요 항목 중 열린 티켓</StatLabel>
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
                <StatLabel>새 티켓</StatLabel>
                <StatValueText>10</StatValueText>
                <StatHelpText>최근 7일 동안</StatHelpText>
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
              <Card.Title>상태별 티켓</Card.Title>
            </Card.Header>
            <Card.Body>
              <DataListRoot orientation="horizontal">
                <DataListItem
                  key={"Open Issues"}
                  label={"열린 이슈"}
                  value={25}
                  grow
                />
                <DataListItem
                  key={"Closed Issues"}
                  label={"해결된 이슈"}
                  value={74}
                  grow
                />
                <DataListItem
                  key={"In Progress Issues"}
                  label={"진행 중인 이슈"}
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
                <StatLabel>이슈 해결 비율</StatLabel>
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
