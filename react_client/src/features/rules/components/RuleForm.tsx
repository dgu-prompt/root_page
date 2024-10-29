import React, { useState } from "react";
import { Box, Fieldset, Input, Textarea, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import SeveritySelect from "./SeveritySelect";

interface RuleFormProps {
  ruleData?: {
    name: string;
    description: string;
    severity: string;
    status: string;
    notifications: string[];
  };
  onSubmit: (formData: any) => void;
}

function RuleForm({ ruleData, onSubmit }: RuleFormProps) {
  const [name, setName] = useState(ruleData?.name || "");
  const [description, setDescription] = useState(ruleData?.description || "");
  const [severity, setSeverity] = useState(ruleData?.severity || "MEDIUM");
  const [status, setStatus] = useState(ruleData?.status === "enabled" || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      severity,
      status: status ? "enabled" : "disabled",
    });
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Stack spacing={4}>
          <Field label="Name">
            <Input
              placeholder="Rule Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Box>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <SeveritySelect value={severity} onChange={setSeverity} />
          <Box display="flex" alignItems="center">
            <Switch
              checked={status}
              onCheckedChange={() => setStatus(!status)}
            />
            <Box ml={2}>Enabled</Box>
          </Box>
        </Stack>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
}

export default RuleForm;
