import { Center, Spinner } from "@chakra-ui/react";

import type { ControlFull } from "control";

import ControlEmptyView from "./control-empty-view";
import ControlGridView from "./control-grid-view";
import ControlTableView from "./control-table-view";
// import { ControlGridSkeletonView } from "./control-grid-skeleton";

type ContentProps = {
  isGridView: boolean;
  controls: ControlFull[];
  query: string;
};

export default function ControlView({
  isGridView,
  controls,
  query,
}: ContentProps) {
  // if (isSearching) {
  //   if (isGridView) {
  //     return <ControlGridSkeletonView />;
  //   } else {
  //     return (
  //       <Center flex="1">
  //         <Spinner size="xl" />
  //       </Center>
  //     );
  //   }
  // }

  if (!controls.length) {
    return <ControlEmptyView query={query} />;
  }

  return isGridView ? (
    <ControlGridView controls={controls} />
  ) : (
    <ControlTableView controls={controls} />
  );
}
