
import { Button } from "@/components/ui/button";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Info } from "lucide-react";

const InfoHoverCard = ({ info }: { info: string }) => (
  <HoverCardRoot>
    <HoverCardTrigger>
      <Button size="2xs" variant="plain">
        <Info />
      </Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <HoverCardArrow />
      {info}
    </HoverCardContent>
  </HoverCardRoot>
);

export default InfoHoverCard;
