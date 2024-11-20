import { Field } from "@/components/ui/field";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { HStack, Input, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ConfigGeneral = () => {
  const { t } = useTranslation();

  return (
    <VStack align="start" gap={6}>
      {/* num_events */}
      <Field
        helperText={t("configGeneral.numEventsHelperText")}
        label={t("configGeneral.numEventsLabel")}
      >
        <Input placeholder="1" value="1" />
      </Field>

      {/* timeframe */}
      <Field
        helperText={t("configGeneral.timeframeHelperText")}
        label={t("configGeneral.timeframeLabel")}
      >
        <Input mb="2" placeholder="4" value="4" />
        <RadioGroup defaultValue="hours">
          <HStack gap="6">
            <Radio value="minutes">
              {t("configGeneral.timeframeOptions.minutes")}
            </Radio>
            <Radio value="hours">
              {t("configGeneral.timeframeOptions.hours")}
            </Radio>
            <Radio value="days">
              {t("configGeneral.timeframeOptions.days")}
            </Radio>
          </HStack>
        </RadioGroup>
      </Field>
    </VStack>
  );
};

export default ConfigGeneral;
