"use client";

import React, { useEffect, useState } from "react";
import { GridItem, HStack, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { DataListRoot, DataListItem } from "@/components/ui/data-list";
import WidgetLg from "./widget-lg";

export default function UnresolvedTicketsByAssigneeWidget() {
  const [members, setMembers] = useState([]);
  const [topUnresolvedAssignees, setTopUnresolvedAssignees] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/jira/users`,
        {
          next: { revalidate: 60 }, // 캐싱과 재검증 설정
          cache: "force-cache",
        }
      );
      const users = await response.json();
      console.log("Jira Members", users);
      setMembers(users);
    }

    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 }, // 캐싱과 재검증 설정
          cache: "force-cache",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const topUnresolved = processAssigneeData(data);
      console.log("topUnresolved:", topUnresolved);
      setTopUnresolvedAssignees(topUnresolved);
    }

    fetchMembers();
    fetchData();
  }, []);

  const processAssigneeData = (data) => {
    const unresolvedTickets = Object.entries(data.assignee_resolution_rate)
      .filter(([assignee]) => assignee !== "Unassigned") // Unassigned 제외
      .map(([assignee, stats]) => ({
        name: assignee,
        unresolved: stats.total - stats.resolved,
      }));

    return unresolvedTickets
      .sort((a, b) => b.unresolved - a.unresolved)
      .slice(0, 3);
  };

  const getAvatarUrl = (name) => {
    const member = members.find((m) => m.assigneeName === name);
    return member ? member.avatarUrl : undefined;
  };

  return (
    <WidgetLg
      title="담당자별 미해결 티켓"
      description="미해결 티켓을 담당자별로 분류하여 표시합니다."
    >
      <DataListRoot orientation="horizontal" size={{ base: "md", md: "lg" }}>
        {topUnresolvedAssignees.map((assignee) => (
          <DataListItem
            grow
            key={assignee.name}
            label={
              <HStack gap="4">
                <Avatar
                  name={assignee.name}
                  src={getAvatarUrl(assignee.name)}
                  size="sm"
                />
                <Text>{assignee.name}</Text>
              </HStack>
            }
            value={assignee.unresolved}
          />
        ))}
      </DataListRoot>
    </WidgetLg>
  );
}
