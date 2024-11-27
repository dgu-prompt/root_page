import { Center, Spinner } from "@chakra-ui/react";

import type { ControlFull } from "../types/typesV2";

import ControlEmptyView from "./control-empty-view";
import ControlGridView from "./control-grid-view";
import ControlTableView from "./control-table-view";
import { ControlGridSkeletonView } from "./control-grid-skeleton";

type ContentProps = {
  isSearching: boolean;
  isGridView: boolean;
  controls: ControlFull[];
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
