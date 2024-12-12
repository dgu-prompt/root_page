"use client";

import type { ControlWithStatus } from "control";
import React, { useEffect, useState } from "react";
import { CircleMinus, Plus } from "lucide-react";
import {
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  IconButton,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import SeverityBadge from "../../../../_components/severity-badge";
import { useRuleEdit } from "../_contexts/rule-edit-context";
import AddControlDialog from "./add-control-dialog";

export default function ControlConfigSection() {
  const { ruleData, setRuleData } = useRuleEdit();
  const [controlData, setControlData] = useState<ControlWithStatus[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.log(
        "fetching from: ",
        `${process.env.NEXT_PUBLIC_API_HOST}/control/details`
      );

      const queryString = new URLSearchParams({
        controlIds: JSON.stringify(ruleData.controlIds),
      }).toString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/control/details?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 }, // 캐싱과 재검증 설정
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
      }

      const controlData = await response.json();
      console.log(controlData);
      setControlData(controlData.controls);
    }

    if (!!ruleData.controlIds && ruleData.controlIds.length > 0) fetchData();
  }, [ruleData]);

  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Card.Title>제어 항목 설정</Card.Title>
            <Card.Description>
              규칙에 적용할 제어 항목을 선택하세요. 현재 {ruleData.region}{" "}
              리전에 있는 제어 항목을 보고 있습니다.
            </Card.Description>
          </Stack>
          <AddControlDialog>
            <Button variant="outline" size="sm">
              제어 항목 추가
            </Button>
          </AddControlDialog>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Box>
          {ruleData.controlIds.map((controlId) => {
            // controlData에서 해당 controlId에 해당하는 데이터 찾기
            const control = controlData.find(
              (ctrl) => ctrl.controlId === controlId
            );

            return (
              <React.Fragment key={controlId}>
                <Separator />
                <Flex align="center" justify="space-between" py="4">
                  <Flex
                    direction="column"
                    align="baseline"
                    gap="1"
                    justify="space-between"
                  >
                    <HStack>
                      {control?.controlStatus?.toLowerCase() === "enabled" ? (
                        <Text fontWeight="medium">{controlId}</Text>
                      ) : (
                        <Text fontWeight="medium" color="fg.muted">
                          {controlId} (비활성화됨)
                        </Text>
                      )}
                      {control && <SeverityBadge severity={control.severity} />}
                    </HStack>
                    {control ? (
                      <Text fontSize="sm" color="fg.muted">
                        {control.title}
                      </Text>
                    ) : (
                      <Text fontSize="sm" color="fg.muted">
                        데이터를 찾을 수 없습니다.
                      </Text>
                    )}
                  </Flex>
                  <IconButton
                    onClick={() => {
                      setRuleData((prev) => ({
                        ...prev,
                        controlIds: prev.controlIds.filter(
                          (id) => id !== controlId
                        ),
                      }));
                    }}
                    variant="ghost"
                    size="sm"
                    colorPalette="red"
                  >
                    <CircleMinus />
                  </IconButton>
                </Flex>
              </React.Fragment>
            );
          })}
          <Separator />
          <AddControlDialog>
            <Button
              variant="ghost"
              px="0"
              width="full"
              py="7"
              justifyContent="start"
              rounded="none"
            >
              <Icon>
                <Plus />
              </Icon>
              <Text>제어 항목 추가</Text>
            </Button>
          </AddControlDialog>
          <Separator />
        </Box>
      </Card.Body>
      <Card.Footer>
        <Card.Description>
          {ruleData.controlIds.length}개의 제어 항목 추가됨
        </Card.Description>
      </Card.Footer>
    </Card.Root>
  );
}
