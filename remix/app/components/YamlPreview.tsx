import { ClipboardIconButton, ClipboardRoot } from "~/components/ui/clipboard";
import AutoResizeTextArea from "./AutoResizeTextArea";
import { Card } from "@chakra-ui/react";

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
          value={content}
          onChange={undefined}
        ></AutoResizeTextArea>
        <ClipboardRoot value={content} position="absolute" top="2" right="2">
          <ClipboardIconButton />
        </ClipboardRoot>
      </Card.Body>
    </Card.Root>
  );
};

export default YamlPreview;
