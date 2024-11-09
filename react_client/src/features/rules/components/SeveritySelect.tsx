import { useState } from "react";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const mockSeverities = [
  { id: "low", name: "Low" },
  { id: "medium", name: "Medium" },
  { id: "high", name: "High" },
  { id: "critical", name: "Critical" },
];

const serverities = createListCollection({
  items: mockSeverities,
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
});

function SeveritySelect() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <SelectRoot
      collection={serverities}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <SelectLabel>Severity</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select severity" />
      </SelectTrigger>
      <SelectContent>
        {serverities.items.map((severity) => (
          <SelectItem item={severity} key={severity.id}>
            {severity.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export default SeveritySelect;
