// routes/rules/$alertType/$awsRegion.tsx

import { Card } from "@chakra-ui/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import AssigneeList from "@features/rules/components/AssigneeList";
import type { AssigneeDetails } from "@features/rules/services/rules";
import { getAssignees } from "@features/rules/services/rules";

// Loader to fetch assignees
export const loader: LoaderFunction = async ({ params }) => {
  const { awsRegion } = params;
  if (!awsRegion) throw new Error("Invalid parameters");

  const assignees: AssigneeDetails[] = await getAssignees("jira", awsRegion);
  return json({ assignees });
};

export default function AssigneeListPage() {
  const { assignees } = useLoaderData<{ assignees: AssigneeDetails[] }>();
  const { t } = useTranslation();

  // AWS 리전 이름 가져오기
  const regionName = assignees[0]?.awsRegion
    ? t(`awsRegions.${assignees[0].awsRegion}`)
    : "N/A";

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>
          {t("assigneeList.title", { region: regionName })}
        </Card.Title>
        <Card.Description>
          {t("assigneeList.description", { region: regionName })}
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <AssigneeList assignees={assignees} />
      </Card.Body>
    </Card.Root>
  );
}
