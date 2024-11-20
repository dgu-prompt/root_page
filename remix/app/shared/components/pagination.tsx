import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Center, HStack } from "@chakra-ui/react";

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (details: { page: number }) => void;
};

export default function Pagination(props: PaginationProps) {
  const { totalCount, currentPage, pageSize, onPageChange } = props;

  if (totalCount <= pageSize) {
    return null;
  }

  return (
    <Center mt="8">
      <PaginationRoot
        count={totalCount}
        defaultPage={1}
        onPageChange={onPageChange}
        page={currentPage}
        pageSize={pageSize}
        variant="solid"
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Center>
  );
}
