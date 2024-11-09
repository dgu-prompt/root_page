import {
  CheckboxGroup,
  Fieldset,
  HStack,
  Input,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "~/components/ui/checkbox";
import { Field } from "~/components/ui/field";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "~/components/ui/radio-card";
import { Switch } from "~/components/ui/switch";

import ConfigAlertJira from "./ConfigAlertJira";
import ConfigAlertSlack from "./ConfigAlertSlack";

function AlertConfiguration() {
  const { t } = useTranslation();

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
    <VStack align="start" gap={6}>
      <Switch
        checked={aggregationSchedule}
        onChange={() => setAggregationSchedule(!aggregationSchedule)}
      >
        {t("aggregationSchedule")}
      </Switch>

      <Field
        helperText={
          reAlertTime === 0
            ? t("alertWarning")
            : t("alertInfo", { minutes: reAlertTime })
        }
        label={t("reAlertTime")}
      >
        <Input
          placeholder={t("enterReAlertTime")}
          readOnly
          type="number"
          value={reAlertTime}
        />
      </Field>

      <Fieldset.Root invalid={!isFormValid}>
        <CheckboxGroup>
          <Fieldset.Legend fontSize="sm" mb="2">
            {t("selectAlertDestinations")}
          </Fieldset.Legend>
          <Fieldset.Content>
            <RadioCardRoot>
              <RadioCardLabel />
              <HStack align="stretch">
                <RadioCardItem
                  description={t("jiraDescription")}
                  key="jira"
                  label={t("jira")}
                  value="jira"
                />
                <RadioCardItem
                  description={t("slackDescription")}
                  key="slack"
                  label={t("slack")}
                  value="slack"
                />
              </HStack>
            </RadioCardRoot>
          </Fieldset.Content>
        </CheckboxGroup>
        <Fieldset.ErrorText>{t("selectAtLeastOneAlert")}</Fieldset.ErrorText>
      </Fieldset.Root>
    </VStack>
  );
}

export default AlertConfiguration;
