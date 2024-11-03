import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/components/ui/select";
import { createListCollection } from "@chakra-ui/react";

const regions = createListCollection({
  items: [
    { label: "us-east-1", value: "us-east-1" },
    { label: "us-west-2", value: "us-west-2" },
    { label: "eu-central-1", value: "eu-central-1" },
    { label: "ap-southeast-2", value: "ap-southeast-2" },
  ],
});

type RegionSelectProps = {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
};

const RegionSelect = ({
  selectedRegion,
  onRegionChange,
}: RegionSelectProps) => (
  <SelectRoot
    collection={regions}
    defaultValue={[selectedRegion]}
    onValueChange={(e) => onRegionChange(e.value as unknown as string)}
  >
    <SelectLabel>AWS 리전 선택</SelectLabel>
    <SelectTrigger>
      <SelectValueText placeholder="AWS 리전 선택" />
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

export default RegionSelect;
