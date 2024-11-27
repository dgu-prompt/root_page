import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";

type ControlEmptyViewProps = {
  query: string;
};

export default function ControlEmptyView({ query }: ControlEmptyViewProps) {
  return (
    <EmptyState
      description="맞춤법을 확인하거나 새로운 검색을 시도하십시오."
      icon={<SearchX />}
      title={`'${query}'에 대한 결과 없음`}
    />
  );
}
