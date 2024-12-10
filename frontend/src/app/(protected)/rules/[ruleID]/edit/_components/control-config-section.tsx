"use client";

import type { ControlWithStatus } from "control";
import React, { useState } from "react";
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

  // 정보 가져오기
  const [controlWithStatusData, setControlWithStatusData] = useState<
    ControlWithStatus[]
  >([]);

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
          <Separator />
          {ruleData.controlIds.map((controlId) => (
            <Box key={controlId}>{controlId}</Box>
          ))}
          {controlWithStatusData.map((control, index) => (
            <React.Fragment key={control.controlId}>
              {index !== 0 && <Separator />}
              <Flex align="center" justify="space-between" py="4">
                <Flex
                  direction="column"
                  align="baseline"
                  gap="1"
                  justify="space-between"
                >
                  <HStack>
                    {control.controlStatus.toLowerCase() === "enabled" ? (
                      <Text fontWeight="medium">{control.controlId}</Text>
                    ) : (
                      <Text fontWeight="medium" color="fg.muted">
                        {control.controlId} (비활성화됨)
                      </Text>
                    )}
                    <SeverityBadge severity={control.severity} />
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">
                    {control.title}
                  </Text>
                </Flex>
                <IconButton
                  onClick={() => {
                    setRuleData((prev) => ({
                      ...prev,
                      controlIds: prev.controlIds.filter(
                        (id) => id !== control.controlId
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
          ))}
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
