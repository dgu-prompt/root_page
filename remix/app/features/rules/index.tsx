import {
  Box,
  Card,
  Container,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { useRegion } from "@/contexts/RegionContext";

import RegionSelectList from "@features/rules/components/RegionSelectList";
import { fetchAvailableRegions } from "@features/rules/services/fetchAvailableRegions";
import fetchRulesList from "@features/rules/services/fetchRulesList";
import { useClientStatus } from "@/hooks/useClientStatus";
import { Rule } from "./services/types";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Plus, SquarePen, Trash } from "lucide-react";
import RuleTypeBadge from "./components/RuleTypeBadge";
import { getRegionName } from "@/services/getRegionName";

export async function loader() {
  const availableRegions = await fetchAvailableRegions();
  if (!Array.isArray(availableRegions)) {
    throw new Error("Invalid data: availableRegions is not an array");
  }
  return Response.json({ availableRegions });
}

export default function Rules() {
  const isClient = useClientStatus();

  const data = useLoaderData<typeof loader>();
  const availableRegions = data.availableRegions;

  if (!isClient) return null;

  return (
    <Container pt={{ base: "8", md: "10", lg: "12" }}>
      <Heading mb="8" size="3xl">
        알림 규칙 관리
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <GridItem colSpan={1}>
          <RegionSelectSidebar availableRegions={availableRegions} />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <RulesList />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}

interface SidebarProps {
  availableRegions: string[];
}

function RegionSelectSidebar({ availableRegions }: SidebarProps) {
  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }} variant="elevated">
      <Card.Body gap="4">
        <Card.Title>AWS 리전 선택</Card.Title>
        <RegionSelectList regions={availableRegions} />
      </Card.Body>
    </Card.Root>
  );
}

function RulesList() {
  const { region } = useRegion();

  const [rules, setRules] = useState<Rule[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadRules() {
      try {
        setLoading(true);
        const rules = await fetchRulesList(region);
        setRules(rules);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to load rules", err);
      } finally {
        setLoading(false);
      }
    }

    if (region) {
      loadRules();
    }
  }, [rules, region]);

  const regionName = getRegionName(region);

  if (!rules) return <Text>Rules Not Found</Text>;

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Flex justify="space-between" gap="4">
          <Box>
            <Card.Title>{regionName} 규칙 목록</Card.Title>
            <Card.Description>
              {regionName}의 제어에 적용되는 {rules.length}개의 규칙이 있습니다.
            </Card.Description>
          </Box>
          <MenuRoot positioning={{ placement: "bottom-end" }}>
            <MenuTrigger asChild>
              <Button size="sm">
                <Icon>
                  <Plus />
                </Icon>
                <Text>새 규칙</Text>
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem asChild value="naruto">
                <Link to="/rules/new">새 Jira 규칙</Link>
              </MenuItem>
              <MenuItem asChild value="one-piece">
                <a
                  href="https://www.crunchyroll.com/one-piece"
                  target="_blank"
                  rel="noreferrer"
                >
                  새 Slack 규칙
                </a>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Flex>
      </Card.Header>
      <Card.Body>
        {rules.map((rule) => (
          <Flex
            key={rule.id}
            alignItems="center"
            justifyContent="space-between"
            py="4"
            borderBottomWidth="1px"
          >
            <Flex
              direction="column"
              align="baseline"
              gap="1"
              justify="space-between"
            >
              <HStack>
                <RuleTypeBadge type={rule.type} />
                <Text fontWeight="medium">{rule.name}</Text>
              </HStack>
            </Flex>
            <HStack>
              <Text fontSize="sm" color="fg.muted">
                {rule.filename}
              </Text>
              <MenuRoot positioning={{ placement: "bottom-end" }}>
                <MenuTrigger asChild>
                  <IconButton variant="ghost" size="sm">
                    <Ellipsis />
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem asChild value="edit">
                    <Link
                      to={{
                        pathname: `/rules/${rule.id}/edit`,
                        search: `?region=${region}`,
                      }}
                    >
                      <Icon>
                        <SquarePen />
                      </Icon>
                      <Text>편집</Text>
                    </Link>
                  </MenuItem>
                  <MenuItem value="delete">
                    <Icon>
                      <Trash />
                    </Icon>
                    <Text>삭제</Text>
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            </HStack>
          </Flex>
        ))}
      </Card.Body>
    </Card.Root>
  );
}
