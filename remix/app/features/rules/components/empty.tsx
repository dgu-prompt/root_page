import { EmptyState } from "@/components/ui/empty-state";
import { Center } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { HiOutlineClipboardList } from "react-icons/hi";


export default function RulesIndex() {
  const { t } = useTranslation();

  return (
    <Center>
      <EmptyState
        description={t(
          "rules.emptyStateDescription",
          "좌측 사이드바에서 AWS 리전을 선택하여 목록을 불러오세요."
        )}
        icon={<HiOutlineClipboardList />}
        title={t("rules.title", "알림 규칙 관리")}
      />
    </Center>
  );
}
