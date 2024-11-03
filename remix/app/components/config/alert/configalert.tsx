import { CheckboxGroup, Fieldset, Input, Tabs } from "@chakra-ui/react";
import { Checkbox } from "~/components/ui/checkbox";
import ConfigAlertJira from "./configalertjira";
import ConfigAlertSlack from "./configalertslack";
import { Field } from "~/components/ui/field";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";

function AlertConfiguration() {
  // const toast = useToast();

  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [reAlertTime] = useState<number>(5);
  const [aggregationSchedule, setAggregationSchedule] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleAlertChange = (value: string, isChecked: boolean) => {
    const newSelectedAlerts = isChecked
      ? [...selectedAlerts, value]
      : selectedAlerts.filter((alert) => alert !== value);

    setSelectedAlerts(newSelectedAlerts);
    setIsFormValid(newSelectedAlerts.length > 0);
  };

  return (
    <>
      <Switch
        checked={aggregationSchedule}
        onChange={() => setAggregationSchedule(!aggregationSchedule)}
      >
        Aggregation Schedule
      </Switch>

      <Field
        label="Re-alert Time (minutes)"
        helperText={
          reAlertTime === 0
            ? "WARNING: Alerts will trigger every time without limit."
            : `Alerts will trigger, at most, every ${reAlertTime} minute(s) to prevent flooding.`
        }
      >
        <Input
          type="number"
          value={reAlertTime}
          placeholder="Enter re-alert time"
          readOnly
        />
      </Field>

      <Fieldset.Root invalid={!isFormValid}>
        <CheckboxGroup>
          <Fieldset.Legend fontSize="sm" mb="2">
            Select Alert Destinations
          </Fieldset.Legend>
          <Fieldset.Content>
            <Checkbox
              value="slack"
              checked={selectedAlerts.includes("slack")}
              onCheckedChange={(e) =>
                handleAlertChange("slack", e.checked === true)
              }
            >
              Slack
            </Checkbox>
            <Checkbox
              value="jira"
              checked={selectedAlerts.includes("jira")}
              onCheckedChange={(e) =>
                handleAlertChange("jira", e.checked === true)
              }
            >
              Jira
            </Checkbox>
          </Fieldset.Content>
        </CheckboxGroup>
        <Fieldset.ErrorText>
          You must select at least one alert destination.
        </Fieldset.ErrorText>
      </Fieldset.Root>

      {selectedAlerts.length > 0 && (
        <Tabs.Root mt={4} variant="enclosed">
          <Tabs.List>
            {selectedAlerts.includes("slack") && (
              <Tabs.Trigger value="slack">Slack</Tabs.Trigger>
            )}
            {selectedAlerts.includes("jira") && (
              <Tabs.Trigger value="jira">Jira</Tabs.Trigger>
            )}
          </Tabs.List>

          {selectedAlerts.includes("slack") && (
            <Tabs.Content value="slack">
              <ConfigAlertSlack />
            </Tabs.Content>
          )}
          {selectedAlerts.includes("jira") && (
            <Tabs.Content value="jira">
              <ConfigAlertJira />
            </Tabs.Content>
          )}
        </Tabs.Root>
      )}
    </>
  );
}

export default AlertConfiguration;
