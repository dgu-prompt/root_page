import { GridItem, SimpleGrid } from "@chakra-ui/react";

import type { ControlFull } from "../types/typesV2";

import { ControlCardView } from "./control-card-view";
import { ControlCardSkeletonView } from "./control-grid-skeleton";

// ControlGridView
type ControlGridCardViewProps = {
  controls: ControlFull[];
  isLoading: boolean;
};

export default function ControlGridView(props: ControlGridCardViewProps) {
  const { controls, isLoading } = props;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="2">
      {controls.map((control) => (
        <GridItem key={control.controlId}>
          {isLoading ? (
            <ControlCardSkeletonView />
          ) : (
            <ControlCardView control={control} />
          )}
        </GridItem>
      ))}
    </SimpleGrid>
  );
}
