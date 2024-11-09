"use client";

import { chakra, useRecipe } from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize";

const StyledAutoResize = chakra(AutoResize);

const AutoResizeTextArea = ({ value, onChange }) => {
  const recipe = useRecipe({ key: "textarea" });
  const styles = recipe({ variant: "subtle" });
  return (
    <StyledAutoResize
      css={styles}
      fontFamily="monospace"
      lineHeight="inherit"
      minH="initial"
      onChange={onChange}
      overflow="hidden"
      placeholder="This textarea will autoresize as you type"
      resize="none"
      value={value}
    />
  );
};

export default AutoResizeTextArea;
