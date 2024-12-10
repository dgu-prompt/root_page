"use client";

import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRuleEdit } from "../_contexts/rule-edit-context";
import ControlSelectBody from "./control-select-body";

export default function AddControlDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ruleData, setRuleData } = useRuleEdit();
  const [addedControlIds, setAddedControlIds] = useState<string[]>([]);

  function handleSave() {
    setRuleData((prev) => {
      const uniqueControlIds = new Set([
        ...prev.controlIds,
        ...addedControlIds,
      ]);
      return {
        ...prev,
        controlIds: Array.from(uniqueControlIds),
      };
    });

    setAddedControlIds([]);
  }

  return (
    <DialogRoot
      size="lg"
      scrollBehavior="inside"
      lazyMount
      onExitComplete={() => setAddedControlIds([])}
      closeOnInteractOutside={false}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>제어 추가</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ControlSelectBody
            region={ruleData.region}
            addedControlIds={addedControlIds}
            setAddedControlIds={setAddedControlIds}
          />
        </DialogBody>
        <DialogFooter>
          <Text me="4">{addedControlIds.length}개 제어 선택됨</Text>
          <DialogActionTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button onClick={handleSave}>저장</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
