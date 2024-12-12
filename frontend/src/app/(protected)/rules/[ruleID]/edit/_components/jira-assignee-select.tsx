"use client";

import type { JiraAssigneeInfo, JiraRule } from "rule";
import React, { useState, useEffect, useMemo } from "react";
import { HStack, createListCollection } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@/components/ui/select";
import { useRuleEdit } from "../_contexts/rule-edit-context";

export default function JiraAssigneeSelect() {
  const { ruleData, setRuleData } = useRuleEdit();
  const [members, setMembers] = useState<JiraAssigneeInfo[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/jira/users`
      );
      const users = await response.json();
      setMembers(users);
    }

    fetchMembers();
  }, []);

  const memberCollection = useMemo(() => {
    return createListCollection({
      items: members,
      itemToString: (item) => item.assigneeName,
      itemToValue: (item) => item.assigneeEmail,
    });
  }, [members]);

  const selectedMember = useMemo(() => {
    return members.find(
      (member) => member.assigneeEmail === (ruleData as JiraRule).assignee
    );
  }, [members, ruleData]);

  const handleSelect = (value: string[]) => {
    const [assignee] = value;
    setRuleData({ ...ruleData, assignee: assignee } as JiraRule);
  };

  return (
    <SelectRoot
      collection={memberCollection}
      width="sm"
      defaultValue={[(ruleData as JiraRule).assignee]}
      positioning={{ sameWidth: true }}
      onValueChange={(details) => handleSelect(details.value)}
    >
      <SelectLabel>담당자</SelectLabel>
      <SelectTrigger>
        {selectedMember ? (
          <HStack>
            <Avatar
              name={selectedMember.assigneeName}
              src={selectedMember.avatarUrl}
              size="xs"
            />
            {selectedMember.assigneeName}
          </HStack>
        ) : (
          "담당자 없음"
        )}
      </SelectTrigger>
      <SelectContent portalled={false}>
        {members.map((item) => (
          <SelectItem
            item={item}
            key={item.assigneeEmail}
            justifyContent="flex-start"
          >
            <Avatar name={item.assigneeName} src={item.avatarUrl} size="xs" />
            {item.assigneeName}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
