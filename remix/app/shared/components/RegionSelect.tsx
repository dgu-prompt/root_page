import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useRegion } from "@/contexts/RegionContext";
import { ValueChangeDetails } from "node_modules/@chakra-ui/react/dist/types/components/select/namespace";

export default function RegionSelect() {
  const { region, setRegion } = useRegion();

  const regions = createListCollection({
    items: [
      { label: "미국 동부(버지니아 북부)", value: "us-east-1" },
      { label: "미국 서부(오레곤)", value: "us-west-2" },
      { label: "유럽(프랑크푸르트)", value: "eu-central-1" },
      { label: "아시아 태평양(서울)", value: "ap-northeast-2" },
    ],
  });

  function handleRegionChange(details: ValueChangeDetails) {
    const [currentRegion] = details.value;
    setRegion(currentRegion);
    console.log("Region changed to", currentRegion);
  }

  return (
    <SelectRoot
      collection={regions}
      defaultValue={[region]}
      onValueChange={handleRegionChange}
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
}
