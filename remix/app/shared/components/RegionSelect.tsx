import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const RegionSelect = ({
  selectedRegion = "ap-northeast-2",
  onRegionChange,
}: {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}) => {
  const { t } = useTranslation();

  // 다국어 지원이 가능한 리전 목록 생성
  const regions = createListCollection({
    items: [
      { label: t("awsRegions.us-east-1"), value: "us-east-1" },
      { label: t("awsRegions.us-west-2"), value: "us-west-2" },
      { label: t("awsRegions.eu-central-1"), value: "eu-central-1" },
      { label: t("awsRegions.ap-northeast-2"), value: "ap-northeast-2" },
    ],
  });

  return (
    <SelectRoot
      collection={regions}
      defaultValue={[selectedRegion]}
      onValueChange={(e) => onRegionChange(e.value as unknown as string)}
    >
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent>
        {regions.items.map((region) => (
          <SelectItem item={region} key={region.value}>
            {region.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default RegionSelect;
