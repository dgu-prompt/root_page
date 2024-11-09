import { Card, HStack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuInfo } from "react-icons/lu";
import { Button } from "~/components/ui/button";
import { DataListItem, DataListRoot } from "~/components/ui/data-list";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Switch } from "~/components/ui/switch";

import ControlStatus from "./ControlStatus";
import SeverityBadge from "./SeverityBadge";

import type { Control } from "~/types/control";

const ControlCard = ({
  SecurityControlId,
  Title,
  Description,
  SeverityRating,
  SecurityControlStatus,
  controlStatus,
  failedChecks,
  totalChecks,
  assignee,
}: Control) => {
  const { t } = useTranslation();
  const [checked] = useState(SecurityControlStatus === "ENABLED");

  return (
    <Card.Root
      h="full"
      size={{
        base: "sm",
        md: "md",
        lg: "lg",
      }}
    >
      <Card.Header>
        <HStack justify="space-between">
          <Card.Title>
            <Link to="/rules/Sample%20Rule%201/edit">{SecurityControlId}</Link>
          </Card.Title>
          <Switch checked={checked} />
        </HStack>
        <Card.Description>
          {Title}
          <HoverCardRoot>
            <HoverCardTrigger>
              <Button
                aria-label={t("infoButtonLabel")}
                size="2xs"
                variant="plain"
              >
                <LuInfo />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <HoverCardArrow />
              {Description}
            </HoverCardContent>
          </HoverCardRoot>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <DataListRoot orientation="horizontal">
          <DataListItem
            grow
            key={"Control status"}
            label={t("controlStatusLabel")}
            value={<ControlStatus status={controlStatus} />}
          />
          <DataListItem
            grow
            key={"Severity"}
            label={t("severityLabel")}
            value={<SeverityBadge severity={SeverityRating} />}
          />
          <DataListItem
            grow
            key={"Failed Checks"}
            label={t("failedChecksLabel")}
            value={t("failedChecksValue", {
              failed: failedChecks,
              total: totalChecks,
            })}
          />
          <DataListItem
            grow
            key={"Assignee"}
            label={t("assigneeLabel")}
            value={assignee}
          />
        </DataListRoot>
      </Card.Body>
    </Card.Root>
  );
};

export default ControlCard;
