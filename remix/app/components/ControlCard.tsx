import { Card, HStack } from "@chakra-ui/react";
import { useState } from "react";
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
import ControlStatusBadge from "./ControlStatusBadge";
import SeverityBadge from "./SeverityBadge";
import { useTranslation } from "react-i18next";

type ControlCardProps = {
  SecurityControlId: string;
  Title: string;
  Description: string;
  SeverityRating: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  SecurityControlStatus: "ENABLED" | "DISABLED";
  controlStatus: "PASSED" | "FAILED";
  failedChecks: string;
};

const ControlCard = ({
  SecurityControlId,
  Title,
  Description,
  SeverityRating,
  SecurityControlStatus,
  controlStatus,
  failedChecks,
}: ControlCardProps) => {
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
          <Card.Title>{SecurityControlId}</Card.Title>
          <Switch checked={checked} />
        </HStack>
        <Card.Description>
          {Title}
          <HoverCardRoot>
            <HoverCardTrigger>
              <Button
                size="2xs"
                variant="plain"
                aria-label={t("infoButtonLabel")}
              >
                <LuInfo />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <HoverCardArrow />
              {t("descriptionLabel")}: {Description}
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
            value={<ControlStatusBadge status={controlStatus} />}
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
            value={failedChecks}
          />
        </DataListRoot>
      </Card.Body>
    </Card.Root>
  );
};

export default ControlCard;
