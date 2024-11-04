import { Card, HStack } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "~/components/ui/data-list";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import ControlStatusBadge from "./ControlStatusBadge";
import { LuInfo } from "react-icons/lu";
import SeverityBadge from "./SeverityBadge";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";

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
  const [checked] = useState(SecurityControlStatus === "ENABLED");

  return (
    <Card.Root
      size={{
        base: "sm",
        md: "md",
        lg: "lg",
      }}
      h="full"
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
              <Button size="2xs" variant="plain">
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
            key={"Control status"}
            label={"Control status"}
            value={<ControlStatusBadge status={controlStatus} />}
            grow
          />
          <DataListItem
            key={"Severity"}
            label={"Severity"}
            value={<SeverityBadge severity={SeverityRating} />}
            grow
          />
          <DataListItem
            key={"Failed Checks"}
            label={"Failed Checks"}
            value={failedChecks}
            grow
          />
        </DataListRoot>
      </Card.Body>
    </Card.Root>
  );
};

export default ControlCard;
