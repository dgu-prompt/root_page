"use client";

import { chakra, useRecipe } from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize";

const StyledAutoResize = chakra(AutoResize);

const AutoResizeTextArea = ({ value, onChange }) => {
  const recipe = useRecipe({ key: "textarea" });
  const styles = recipe({ variant: "subtle" });
  return (
    <StyledAutoResize
      value={value}
      onChange={onChange}
      placeholder="This textarea will autoresize as you type"
      minH="initial"
      resize="none"
      overflow="hidden"
      lineHeight="inherit"
      fontFamily="monospace"
      css={styles}
    />
  );
};

export default AutoResizeTextArea;
