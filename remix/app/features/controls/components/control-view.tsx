import { Center, Spinner } from "@chakra-ui/react";

import type { ControlAggregate } from "../types/controls-types";

import ControlEmptyView from "./control-empty-view";
import ControlGridView from "./control-grid-view";
import ControlTableView from "./control-table-view";
import { ControlGridSkeletonView } from "./control-grid-skeleton";

type ContentProps = {
  isSearching: boolean;
  isGridView: boolean;
  controls: ControlAggregate[];
  query: string;
};

export default function ControlView(props: ContentProps) {
  const { isSearching, isGridView, controls, query } = props;

  if (isSearching) {
    if (isGridView) {
      return <ControlGridSkeletonView />;
    } else {
      return (
        <Center flex="1">
          <Spinner size="xl" />
        </Center>
      );
    }
  }

  if (!controls.length) {
    return <ControlEmptyView query={query} />;
  }

  return isGridView ? (
    <ControlGridView controls={controls} isLoading={isSearching} />
  ) : (
    <ControlTableView controls={controls} />
  );
}
