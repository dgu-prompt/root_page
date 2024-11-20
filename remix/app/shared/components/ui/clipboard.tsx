import type { ButtonProps, InputProps } from "@chakra-ui/react";
import {
  Button,
  Clipboard as ChakraClipboard,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuCheck, LuClipboard, LuLink } from "react-icons/lu";

const ClipboardIcon = forwardRef<
  HTMLDivElement,
  ChakraClipboard.IndicatorProps
>(function ClipboardIcon(props, ref) {
  return (
    <ChakraClipboard.Indicator copied={<LuCheck />} {...props} ref={ref}>
      <LuClipboard />
    </ChakraClipboard.Indicator>
  );
});

const ClipboardCopyText = forwardRef<
  HTMLDivElement,
  ChakraClipboard.IndicatorProps
>(function ClipboardCopyText(props, ref) {
  return (
    <ChakraClipboard.Indicator copied="Copied" {...props} ref={ref}>
      Copy
    </ChakraClipboard.Indicator>
  );
});

export const ClipboardLabel = forwardRef<
  HTMLLabelElement,
  ChakraClipboard.LabelProps
>(function ClipboardLabel(props, ref) {
  return (
    <ChakraClipboard.Label
      display="inline-block"
      fontWeight="medium"
      mb="1"
      textStyle="sm"
      {...props}
      ref={ref}
    />
  );
});

export const ClipboardButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardButton(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <Button ref={ref} size="sm" variant="surface" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText />
        </Button>
      </ChakraClipboard.Trigger>
    );
  },
);

export const ClipboardLink = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardLink(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <Button
          alignItems="center"
          display="inline-flex"
          gap="2"
          ref={ref}
          size="xs"
          unstyled
          variant="plain"
          {...props}
        >
          <LuLink />
          <ClipboardCopyText />
        </Button>
      </ChakraClipboard.Trigger>
    );
  },
);

export const ClipboardIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardIconButton(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <IconButton ref={ref} size="xs" variant="subtle" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText srOnly />
        </IconButton>
      </ChakraClipboard.Trigger>
    );
  },
);

export const ClipboardInput = forwardRef<HTMLInputElement, InputProps>(
  function ClipboardInputElement(props, ref) {
    return (
      <ChakraClipboard.Input asChild>
        <Input ref={ref} {...props} />
      </ChakraClipboard.Input>
    );
  },
);

export const ClipboardRoot = ChakraClipboard.Root;
