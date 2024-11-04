import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import { LuInfo } from "react-icons/lu";

const InfoHoverCard = ({ info }: { info: string }) => (
  <HoverCardRoot>
    <HoverCardTrigger>
      <Button size="2xs" variant="plain">
        <LuInfo />
      </Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <HoverCardArrow />
      {info}
    </HoverCardContent>
  </HoverCardRoot>
);

export default InfoHoverCard;
