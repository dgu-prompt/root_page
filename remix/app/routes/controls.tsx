import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Table,
} from "@chakra-ui/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { EmptyState } from "~/components/ui/empty-state";
import { InputGroup } from "~/components/ui/input-group";
import { Switch } from "~/components/ui/switch";

import RegionSelect from "~/components/aws/general/RegionSelect";
import ControlCard from "~/components/controls/ControlCard";
import ControlStatusBadge from "~/components/controls/ControlStatusBadge";
import SeverityBadge from "~/components/controls/SeverityBadge";
import controlsData from "~/data/controlsData";
import type { Control, ControlDataByRegion } from "~/types/control";

const controlDataByRegion: ControlDataByRegion = controlsData;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const region = url.searchParams.get("region") || "ap-southeast-2";
  const query = url.searchParams.get("q") || "";
  const statusFilter = url.searchParams.get("status") || "ALL"; // 'ALL', 'ENABLED', 'DISABLED' 필터 적용

  // 선택된 리전의 데이터 가져오기
  let filteredControls = controlDataByRegion[region] || [];

  // 검색어 필터링
  if (query) {
    filteredControls = filteredControls.filter((control) =>
      control.Title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // 상태 필터링 적용
  if (statusFilter !== "ALL") {
    filteredControls = filteredControls.filter(
      (control) => control.SecurityControlStatus === statusFilter
    );
  }

  return json({ controls: filteredControls, query, region, statusFilter });
};

const Controls = () => {
  const { t } = useTranslation();

  const { controls, query } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const [isGridView, setIsGridView] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("ap-southeast-2");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const searchField = document.getElementById("q") as HTMLInputElement;
    if (searchField) {
      searchField.value = query || "";
    }
  }, [query]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트 렌더링이 완료될 때까지 기다림

  return (
    <Container pt="16">
      <Flex
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mb="4"
      >
        <Heading mb="8" size="2xl">
          {t("controlsHeading")}
        </Heading>
        <Flex align="center" gap="4" w={{ base: "full", md: "md" }}>
          <RegionSelect
            onRegionChange={setSelectedRegion}
            selectedRegion={selectedRegion}
          />
          <Switch
            checked={isGridView}
            // display={{ base: "none" }}
            onCheckedChange={() => setIsGridView(!isGridView)}
          >
            {/* {t("toggleViewLabel")} */}
          </Switch>
        </Flex>
      </Flex>

      {/* Search */}
      <Form id="search-form" role="search">
        <InputGroup flex="1" mb="4" mt="6" startElement={<LuSearch />} w="full">
          <Input
            aria-label="Search controls"
            className={isSearching ? "loading" : ""}
            defaultValue={query}
            id="q"
            name="q"
            onChange={(event) => {
              const isFirstSearch = query === "";
              submit(event.target.form, { replace: !isFirstSearch });
            }}
            placeholder={t("searchControlsPlaceholder")}
            type="search"
          />
        </InputGroup>
        <div aria-hidden hidden={!isSearching}></div>
      </Form>
      {isSearching ? (
        <Spinner size="xl" />
      ) : (
        <>
          {isGridView ? (
            <GridView controls={controls} query={query} />
          ) : (
            <TableView controls={controls} query={query} />
          )}
        </>
      )}
    </Container>
  );
};

function GridView({ controls, query }: { controls: Control[]; query: string }) {
  return (
    <>
      {controls.length ? (
        <Grid
          gap="3"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
        >
          {controls.map((control) => (
            <GridItem key={control.SecurityControlId}>
              <ControlCard
                Description={control.Description}
                SecurityControlId={control.SecurityControlId}
                SecurityControlStatus={control.SecurityControlStatus}
                SeverityRating={control.SeverityRating}
                Title={control.Title}
                assignee={control.assignee}
                controlStatus={control.controlStatus}
                failedChecks={control.failedChecks}
                totalChecks={control.totalChecks}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <EmptyView query={query} />
      )}
    </>
  );
}

function TableView({
  controls,
  query,
}: {
  controls: Control[];
  query: string;
}) {
  const { t } = useTranslation();

  return (
    <>
      {controls.length ? (
        <Box overflowX="scroll">
          {controls && controls.length > 0 && (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader></Table.ColumnHeader>
                  <Table.ColumnHeader>{t("id")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("title")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("controlStatus")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("severity")}</Table.ColumnHeader>
                  <Table.ColumnHeader>
                    {t("failedChecksLabel")}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {controls.map((control) => (
                  <Table.Row key={control.SecurityControlId}>
                    <Table.Cell>
                      <Switch
                        checked={control.SecurityControlStatus === "ENABLED"}
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
      ) : (
        <EmptyView query={query} />
      )}
    </>
  );
}

function EmptyView({ query }: { query: string }) {
  const { t } = useTranslation();

  return (
    <EmptyState
      description={t("emptyControlsDescription")}
      icon={<HiOutlineSearchCircle />}
      title={t("emptyControlsTitle", { query })}
    />
  );
}

export default Controls;
