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

const mockAssignees = [
  { id: "assignee_1", name: "Alice Johnson" },
  { id: "assignee_2", name: "Bob Smith" },
  { id: "assignee_3", name: "Catherine Lee" },
  { id: "assignee_4", name: "David Kim" },
  { id: "assignee_5", name: "Emma Brown" },
  { id: "assignee_6", name: "Frank Wilson" },
  { id: "assignee_7", name: "Grace Davis" },
  { id: "assignee_8", name: "Henry Martinez" },
  { id: "assignee_9", name: "Ivy Robinson" },
  { id: "assignee_10", name: "Jack Garcia" },
  { id: "assignee_11", name: "Katie Lewis" },
  { id: "assignee_12", name: "Liam Walker" },
  { id: "assignee_13", name: "Mia Hall" },
  { id: "assignee_14", name: "Noah Young" },
  { id: "assignee_15", name: "Olivia King" },
  { id: "assignee_16", name: "Paul Wright" },
  { id: "assignee_17", name: "Quinn Scott" },
  { id: "assignee_18", name: "Ryan Green" },
  { id: "assignee_19", name: "Sophia Adams" },
  { id: "assignee_20", name: "Tom Baker" },
  { id: "assignee_21", name: "Uma Gonzalez" },
  { id: "assignee_22", name: "Victor Harris" },
  { id: "assignee_23", name: "Wendy Clark" },
  { id: "assignee_24", name: "Xander Ramirez" },
  { id: "assignee_25", name: "Yara Torres" },
  { id: "assignee_26", name: "Zane Brooks" },
];

const assignees = createListCollection({
  items: mockAssignees,
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
});

function AssigneeSelector() {
  const [selectedAssignee, setSelectedAssignee] = useState<string[]>([]);

  return (
    <SelectRoot
      collection={assignees}
      value={selectedAssignee}
      onValueChange={(e) => setSelectedAssignee(e.value)}
    >
      <SelectLabel>Assignee</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select assignee" />
      </SelectTrigger>
      <SelectContent>
        {assignees.items.map((assignee) => (
          <SelectItem item={assignee} key={assignee.id}>
            {assignee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export default AssigneeSelector;
