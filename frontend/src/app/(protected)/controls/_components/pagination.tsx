"use client";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Center, HStack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
};

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  if (totalCount <= pageSize) {
    return null;
  }

  const handlePageChange = (details: { page: number }) => {
    const params = new URLSearchParams(searchParams);
    if (details.page) {
      params.set("page", details.page.toString());
    } else {
      params.delete("page");
    }
    router.replace(`?${params.toString()}`);
  };

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
