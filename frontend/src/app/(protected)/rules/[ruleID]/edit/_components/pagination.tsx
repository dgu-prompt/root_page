import { Center, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  handlePageChange,
}: {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  handlePageChange: (details: { page: number }) => void;
}) {
  if (totalCount <= pageSize) {
    return null;
  }

  return (
    <Center mt="8">
      <PaginationRoot
        count={totalCount}
        defaultPage={1}
        onPageChange={handlePageChange}
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
