import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";

type ControlEmptyViewProps = {
  query: string;
};

export default function ControlEmptyView({ query }: ControlEmptyViewProps) {
  const { t } = useTranslation();

  return (
    <EmptyState
      description={t("emptyState.description")}
      icon={<SearchX />}
      title={t("emptyState.title", { query })}
    />
  );
}
