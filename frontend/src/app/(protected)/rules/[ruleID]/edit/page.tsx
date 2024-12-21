import { Metadata } from "next";
import { Heading } from "@chakra-ui/react";
import ClientRuleEdit from "./_components/client-rule-edit";
import PageHeading from "@/app/(protected)/_components/page-heading";

export const metadata: Metadata = {
  title: "알림 규칙 편집",
  description: "Edit your rules here",
};

export default async function Page({
  params,
}: {
  params: Promise<{ ruleID: string }>;
}) {
  const { ruleID } = await params;

  const data = await fetch(`${process.env.API_HOST}/api/read_yaml`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      alertType: "jira",
      region: "ap-northeast-2",
      id: ruleID,
    }),
  });

  const ruleData = await data.json();

  return (
    <>
      <PageHeading>{ruleData.name}</PageHeading>
      <ClientRuleEdit initialRuleData={ruleData} />
    </>
  );
}
