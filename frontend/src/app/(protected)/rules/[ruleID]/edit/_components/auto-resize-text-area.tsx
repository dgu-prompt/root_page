import { chakra, useRecipe } from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize";

const StyledAutoResize = chakra(AutoResize);

interface AutoResizeTextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AutoResizeTextArea({
  value,
  onChange,
}: AutoResizeTextAreaProps) {
  const recipe = useRecipe({ key: "textarea" });
  const styles = recipe({ variant: "subtle" });
  return (
    <StyledAutoResize
      css={styles}
      fontFamily="monospace"
      lineHeight="inherit"
      minHeight="initial"
      onChange={onChange}
      overflow="hidden"
      placeholder="This textarea will autoresize as you type"
      resize="none"
      value={value}
    />
  );
}
