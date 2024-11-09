import { createListCollection } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/components/ui/select";

const RegionSelect = ({
  selectedRegion = "ap-southeast-2",
  onRegionChange,
}: {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}) => {
  const { t } = useTranslation();

  // 다국어 지원이 가능한 리전 목록 생성
  const regions = createListCollection({
    items: [
      { label: t("regionUsEast1"), value: "us-east-1" },
      { label: t("regionUsWest2"), value: "us-west-2" },
      { label: t("regionEuCentral1"), value: "eu-central-1" },
      { label: t("regionApSoutheast2"), value: "ap-southeast-2" },
    ],
  });

  return (
    <SelectRoot
      collection={regions}
      defaultValue={[selectedRegion]}
      onValueChange={(e) => onRegionChange(e.value as unknown as string)}
    >
      <SelectLabel>{t("regionSelectLabel")}</SelectLabel>
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
