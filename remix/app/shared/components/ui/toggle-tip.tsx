import { IconButton, Popover as ChakraPopover, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

export interface ToggleTipProps extends ChakraPopover.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content?: React.ReactNode;
}

export const ToggleTip = forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const {
      showArrow,
      children,
      portalled = true,
      content,
      portalRef,
      ...rest
    } = props;

    return (
      <ChakraPopover.Root
        {...rest}
        positioning={{ ...rest.positioning, gutter: 4 }}
      >
        <ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
        <Portal container={portalRef} disabled={!portalled}>
          <ChakraPopover.Positioner>
            <ChakraPopover.Content
              px="2"
              py="1"
              ref={ref}
              rounded="sm"
              textStyle="xs"
              width="auto"
            >
              {showArrow && (
                <ChakraPopover.Arrow>
                  <ChakraPopover.ArrowTip />
                </ChakraPopover.Arrow>
              )}
              {content}
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Portal>
      </ChakraPopover.Root>
    );
  },
);

export const InfoTip = (props: Partial<ToggleTipProps>) => {
  const { children, ...rest } = props;
  return (
    <ToggleTip content={children} {...rest}>
      <IconButton aria-label="info" size="2xs" variant="ghost">
        <HiOutlineInformationCircle />
      </IconButton>
    </ToggleTip>
  );
};
