import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard";
import { Card } from "@chakra-ui/react";

import AutoResizeTextArea from "./auto-resize-text-area";

type YamlPreviewProps = {
  content: string;
};

const YamlPreview = ({ content }: YamlPreviewProps) => {
  return (
    <Card.Root
      size={{
        base: "sm",
        md: "md",
        lg: "lg",
      }}
      variant="subtle"
    >
      <Card.Body>
        <AutoResizeTextArea
          onChange={undefined}
          value={content}
        ></AutoResizeTextArea>
        <ClipboardRoot position="absolute" right="2" top="2" value={content}>
          <ClipboardIconButton />
        </ClipboardRoot>
      </Card.Body>
    </Card.Root>
  );
};

export default YamlPreview;
