import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  DialogHeader,
  Flex,
  Heading,
  Table,
} from "@chakra-ui/react";
import { HiClipboardList } from "react-icons/hi";
import { LuTrash2 } from "react-icons/lu";

import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockRules } from "../MockRules";

type Rule = {
  id: string;
  name: string;
  description: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "enabled" | "disabled";
  lastModified: string;
  notifications: string[];
};

const RuleEmptyState = () => (
  <EmptyState
    icon={<HiClipboardList />}
    title="No rules available"
    description="Create your first rule to start managing alerts."
  >
    <Button colorPalette="cyan">Create New Rule</Button>
  </EmptyState>
);

type RuleListProps = {
  rules: Rule[];
  selectedRules: string[];
  onToggleSelect: (ruleId: string) => void;
  onToggleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RuleList: React.FC<RuleListProps> = ({
  rules,
  selectedRules,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const isIndeterminate =
    selectedRules.length > 0 && selectedRules.length < rules.length;

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading size="3xl">Alert Rules Management</Heading>
        <Button colorPalette="cyan" mb={4} alignSelf="flex-start">
          Create New Rule
        </Button>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox
                aria-label="Select all rows"
                checked={selectedRules.length === rules.length}
                isIndeterminate={isIndeterminate}
                onCheckedChange={onToggleSelectAll}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Severity</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rules.map((rule) => (
            <Table.Row key={rule.id}>
              <Table.Cell>
                <Checkbox
                  aria-label={`Select ${rule.name}`}
                  checked={selectedRules.includes(rule.id)}
                  onCheckedChange={() => onToggleSelect(rule.id)}
                />
              </Table.Cell>
              <Table.Cell>
                <Link to={rule.id}>{rule.name}</Link>
              </Table.Cell>
              <Table.Cell>{rule.description}</Table.Cell>
              <Table.Cell>{rule.severity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <ActionBarRoot open={selectedRules.length > 0}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selectedRules.length} rule(s) selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />

          <DialogRoot
            role="alertdialog"
            placement="center"
            closeOnInteractOutside
          >
            <DialogTrigger asChild>
              <Button variant="surface" colorPalette="red" size="sm">
                <LuTrash2 />
                Delete Selected
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete projects</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>
                  Are you sure you want to delete {selectedRules.length}{" "}
                  rule(s)?
                </DialogDescription>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette="red">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  );
};

// Rules 컴포넌트 (이벤트 핸들러 포함)
const Rules = () => {
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [rules] = useState(mockRules);

  // 개별 선택 핸들러
  const handleToggleSelect = (ruleId: string) => {
    setSelectedRules((prevSelected) =>
      prevSelected.includes(ruleId)
        ? prevSelected.filter((id) => id !== ruleId)
        : [...prevSelected, ruleId]
    );
  };

  // 전체 선택 핸들러
  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRules(e.target.checked ? rules.map((rule) => rule.id) : []);
  };

  return (
    <Container>
      <Flex direction="column" gap={4} px="4">
        {rules.length > 0 ? (
          <RuleList
            rules={rules}
            selectedRules={selectedRules}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
          />
        ) : (
          <RuleEmptyState />
        )}
      </Flex>
    </Container>
  );
};

export default Rules;
