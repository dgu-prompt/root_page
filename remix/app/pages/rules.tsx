// routes/alerts/index.tsx

import { Button } from "@/components/ui/button";
import {
  Box,
  Card,
  Container,
  Flex,
  GridItem,
  Heading,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getAwsRegions } from "@features/rules/services/rules";
import type { AlertType, RegionData } from "@features/rules/services/types";

// Loader to fetch AWS regions
export const loader: LoaderFunction = async () => {
  const awsRegions: RegionData = await getAwsRegions();
  return json({ awsRegions });
};

type SidebarProps = {
  alertTypes: AlertType[];
  awsRegions: RegionData;
  availableRegionsByAlertType: { [key in AlertType]: string[] };
};

function Sidebar({
  alertTypes,
  awsRegions,
  availableRegionsByAlertType,
}: SidebarProps) {
  const { t } = useTranslation();
  const params = useParams();

  return (
    <Card.Root as="nav">
      <Card.Body gap="8">
        {alertTypes.map((alertType, index) => (
          <React.Fragment key={alertType}>
            <Box>
              <Card.Title mb="4">{t(`alertTypes.${alertType}`)}</Card.Title>
              <Flex direction="column">
                {awsRegions
                  .filter((awsRegion) =>
                    availableRegionsByAlertType[alertType]?.includes(awsRegion)
                  )
                  .map((awsRegion) => {
                    const isSelectedRegion =
                      params.alertType === alertType &&
                      params.awsRegion === awsRegion;

                    return (
                      <Button
                        _hover={{
                          bg: isSelectedRegion ? "blue.200" : "gray.100",
                        }}
                        asChild
                        bg={isSelectedRegion ? "blue.100" : "transparent"}
                        key={awsRegion}
                        variant="ghost"
                      >
                        <Link to={`/rules/${alertType}/regions/${awsRegion}`}>
                          <Flex justifyContent="space-between" width="full">
                            <Text>{t(`awsRegions.${awsRegion}`)}</Text>
                            <Text color="fg.subtle">{awsRegion}</Text>
                          </Flex>
                        </Link>
                      </Button>
                    );
                  })}
              </Flex>
            </Box>
            {index < alertTypes.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </Card.Body>
    </Card.Root>
  );
}

// Rules Page
export default function Rules() {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();
  const alertTypes: AlertType[] = ["jira", "slack"];
  const { awsRegions } = useLoaderData<{ awsRegions: RegionData }>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Container pt="16">
      <Heading mb="8" size="2xl">
        {t("rulesPage.heading")}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Sidebar
            alertTypes={alertTypes}
            availableRegionsByAlertType={{
              jira: ["ap-northeast-2"],
              slack: [],
            }}
            awsRegions={awsRegions}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Outlet />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}
